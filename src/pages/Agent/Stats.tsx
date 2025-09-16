import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, ArrowDownLeft, CreditCard, TrendingUp } from 'lucide-react';
import { useAgentTransactionQuery} from '@/redux/features/transaction/transaction.api';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

import { useWalletQuery } from '@/redux/features/wallet/wallet.api';
import { StatsCard } from '../User/StatsCard';
import { TourWrapper } from '../TourWrapper';
import type { Transaction } from '@/Types';

dayjs.extend(utc);
dayjs.extend(timezone);

const COLORS = ['#2563eb', '#16a34a', '#f97316', '#dc2626'];

export default function Stats() {
  const { data: AgentData, isLoading } = useAgentTransactionQuery(undefined);
  const transactions: Transaction[] = AgentData?.data?.data || [];

// const meta = transactionData?.data?.meta;
  const {data: walletData} = useWalletQuery(undefined)

  // Stats Calculations
const totalSpent = transactions
  .filter((t) => ["SEND", "WITHDRAW", "DEPOSIT"].includes(t.type))
  .reduce((sum, t) => sum + t.amount, 0);

const totalReceived = transactions
  .filter((t) => t.type === "RECEIVE")
  .reduce((sum, t) => sum + t.amount, 0);


  const wallet = walletData?.balance || 0;

  // Transform data for charts
const lineData = transactions.map((t) => ({
  date: dayjs(t.createdAt).tz("Asia/Dhaka").format("DD MMM"),
  amount: t.amount,
}));

const typeSummary: Record<string, number> = {};
transactions.forEach((t) => {
  typeSummary[t.type] = (typeSummary[t.type] || 0) + t.amount;
});

const barData = Object.entries(typeSummary).map(([type, amount]) => ({
  type,
  amount,
}));

const pieData = barData;


  if (isLoading) {
    return <p className="text-center text-gray-500 p-4">Loading dashboard...</p>;
  }

  const steps = [
    { target: '[data-tour="agentStats1"]', content: "Here is an overview of the agent Statistics " },
    { target: '[data-tour="agentStats2"]', content: "Data shows agent line chart for transaction " },
    { target: '[data-tour="agentStats3"]', content: "Data shows agent Bar chart for transaction " },
    { target: '[data-tour="agentStats4"]', content: "Agent  Chart for Transaction ratio" }
  ];

  return (
    <TourWrapper steps={steps} tourId="Agent-tour" autoStart={true} delay={500}>
      <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 md:p-6 max-w-full overflow-hidden" data-tour="agentStats1">
        {/* Stats Overview - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatsCard
            title="Total Spent"
            value={`$${totalSpent.toLocaleString()}`}
            icon={<CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />}
          />
          <StatsCard
            title="Total Received"
            value={`$${totalReceived.toLocaleString()}`}
            icon={<ArrowDownLeft className="w-4 h-4 sm:w-5 sm:h-5 text-success" />}
          />
          <StatsCard
            title="Transactions"
            value={transactions.length}
            icon={<Send className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />}
          />
          <StatsCard
            title="Total Balance"
            value={`$${wallet}`}
            icon={<TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />}
          />
        </div>

        {/* Charts Section - Responsive Layout */}
        <div className="space-y-4 sm:space-y-6">
          {/* Top Charts Row - Stack on mobile, side by side on larger screens */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6" data-tour="agentStats2">
            {/* Line Chart */}
            <Card className="w-full">
              <CardHeader className="pb-2 sm:pb-3">
                <CardTitle className="text-base sm:text-lg">Transaction Trend</CardTitle>
              </CardHeader>
              <CardContent className="h-48 sm:h-64 md:h-72 p-2 sm:p-6">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineData} margin={{ top: 5, right: 10, left: 5, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis 
                      dataKey="date" 
                      fontSize={10}
                      className="sm:text-xs"
                      interval="preserveStartEnd"
                    />
                    <YAxis 
                      fontSize={10}
                      className="sm:text-xs"
                      width={40}
                    />
                    <Tooltip 
                      contentStyle={{
                        fontSize: '12px',
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid #ccc',
                        borderRadius: '4px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="#2563eb" 
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Bar Chart */}
            <Card className="w-full" data-tour="agentStats3">
              <CardHeader className="pb-2 sm:pb-3">
                <CardTitle className="text-base sm:text-lg">Amount by Type</CardTitle>
              </CardHeader>
              <CardContent className="h-48 sm:h-64 md:h-72 p-2 sm:p-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} margin={{ top: 5, right: 10, left: 5, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis 
                      dataKey="type" 
                      fontSize={10}
                      className="sm:text-xs"
                      angle={-45}
                      textAnchor="end"
                      height={50}
                    />
                    <YAxis 
                      fontSize={10}
                      className="sm:text-xs"
                      width={40}
                    />
                    <Tooltip 
                      contentStyle={{
                        fontSize: '12px',
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid #ccc',
                        borderRadius: '4px'
                      }}
                    />
                    <Bar 
                      dataKey="amount" 
                      fill="#16a34a" 
                      radius={[2, 2, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Pie Chart - Full width on all devices */}
          <Card className="w-full" data-tour="agentStats4">
            <CardHeader className="pb-2 sm:pb-3">
              <CardTitle className="text-base sm:text-lg">Transaction Distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-64 sm:h-80 md:h-96 p-2 sm:p-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="amount"
                    nameKey="type"
                    cx="50%"
                    cy="50%"
                    outerRadius="60%"
                    innerRadius="20%"
                    label={({ percent }) => `${((percent ?? 0) * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {pieData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      fontSize: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #ccc',
                      borderRadius: '4px'
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ fontSize: '12px' }}
                    layout="horizontal"
                    align="center"
                    verticalAlign="bottom"
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </TourWrapper>
  );
}