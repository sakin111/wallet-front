import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAllUsersQuery } from "@/redux/features/auth/auth.api";
import { useAllTransactionQuery } from "@/redux/features/transaction/transaction.api";
import {
  Loader2,
  Users,
  BriefcaseBusiness,
  Repeat2,
  Banknote,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { TourWrapper } from "../TourWrapper";

interface User {
  role: string;
}

interface Transaction {
  amount: number;
  createdAt: string;
}

export default function AdminOverview() {
  const { data, isLoading, isError } = useAllUsersQuery(undefined);
  const { data: transactionData } = useAllTransactionQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        Failed to load overview.
      </div>
    );
  }

  const steps = [
    {
      target: '[data-tour="analyticsCount"]',
      content:
        "This is a user or agent total transaction and total user ",
    },
    {
      target: '[data-tour="analyticsGraph"]',
      content: "This Graph shows the total Transaction Trends",
    },
  ];

  const users: User[] = data?.data || [];
  const totalUsers = users.length;
  const totalAgent = users.filter((u) => u.role === "AGENT").length;

  const transactions: Transaction[] = transactionData?.data || [];
  const transactionCount = transactions.length;
  const transactionVolume = transactions.reduce(
    (sum, txn) => sum + txn.amount,
    0
  );

  const transactionByDate: Record<string, number> = {};
  transactions.forEach((txn) => {
    const date = new Date(txn.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    transactionByDate[date] = (transactionByDate[date] || 0) + txn.amount;
  });

  const chartData = Object.entries(transactionByDate).map(([date, value]) => ({
    date,
    value,
  }));

  return (
    <TourWrapper
      tourId="analytics-tour"
      steps={steps}
      autoStart={true}
      delay={500}
    >
      <div className="p-4 space-y-6">
        {/* Stats Cards Section with horizontal scroll on md */}
        <div
          className="
            grid gap-6 sm:grid-cols-2 lg:grid-cols-4
            md:flex md:space-x-4 md:overflow-x-auto md:whitespace-nowrap
            [&::-webkit-scrollbar]:h-2
            [&::-webkit-scrollbar-thumb]:bg-muted-foreground/30
            [&::-webkit-scrollbar-thumb]:rounded-full
          "
          data-tour="analyticsCount"
        >
          <Card className="shadow-sm rounded-2xl md:min-w-[250px]">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-medium">
                Total Users
              </CardTitle>
              <Users className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{totalUsers}</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm rounded-2xl md:min-w-[250px]">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-medium">
                Total Agents
              </CardTitle>
              <BriefcaseBusiness className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{totalAgent}</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm rounded-2xl md:min-w-[250px]">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-medium">
                Transactions
              </CardTitle>
              <Repeat2 className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{transactionCount}</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm rounded-2xl md:min-w-[250px]">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-medium">Volume</CardTitle>
              <Banknote className="h-5 w-5 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                ${transactionVolume.toLocaleString()}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Transaction Trends Graph */}
        <Card className="shadow-sm rounded-2xl" data-tour="analyticsGraph">
          <CardHeader>
            <CardTitle className="text-base font-medium">
              Transaction Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#10B981"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm text-muted-foreground text-center">
                No transaction data available
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </TourWrapper>
  );
}
