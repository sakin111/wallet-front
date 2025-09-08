
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, ArrowDownLeft, CreditCard, TrendingUp } from 'lucide-react';
import { useAgentTransactionQuery, useTransactionQuery } from '@/redux/features/transaction/transaction.api';
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

dayjs.extend(utc);
dayjs.extend(timezone);

const COLORS = ['#2563eb', '#16a34a', '#f97316', '#dc2626'];

export default function Stats() {
  const { data: AgentData, isLoading } = useAgentTransactionQuery(undefined);
  const transactions = AgentData?.data?.data || [];

// const meta = transactionData?.data?.meta;
  const {data: walletData} = useWalletQuery(undefined)

  // Stats Calculations
  const totalSpent = transactions
    .filter((t: any) => t.type === 'SEND' ||  t.type === 'CASH_OUT' || t.type === 'CASH_IN')
    .reduce((sum: number, t: any) => sum + t.amount, 0);

  const totalReceived = transactions
    .filter((t: any) => t.type === 'CASH_IN')
    .reduce((sum: number, t: any) => sum + t.amount, 0);

  const wallet = walletData?.data?.balance

  // Transform data for charts
  const lineData = transactions.map((item: any) => ({
    date: dayjs(item.createdAt).tz('Asia/Dhaka').format('DD MMM'),
    amount: item.amount,
  }));

  const typeSummary: Record<string, number> = {};
  transactions.forEach((item: any) => {
    typeSummary[item.type] = (typeSummary[item.type] || 0) + item.amount;
  });

  const barData = Object.entries(typeSummary).map(([type, amount]) => ({
    type,
    amount,
  }));

  const pieData = barData;

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading dashboard...</p>;
  }

  return (
    <div className="space-y-6 p-6">
      {/* Stats Overview */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Spent"
          value={`$${totalSpent.toLocaleString()}`}
          icon={<CreditCard className="w-5 h-5 text-primary" />}
          
        />
        <StatsCard
          title="Total Received"
          value={`$${totalReceived.toLocaleString()}`}
          icon={<ArrowDownLeft className="w-5 h-5 text-success" />}
        
        />
        <StatsCard
          title="Transactions"
          value={transactions.length}
          icon={<Send className="w-5 h-5 text-accent" />}
        />
        <StatsCard
          title="Total Balance"
          value={`$${wallet}`}
          icon={<TrendingUp className="w-5 h-5 text-primary" />}
          
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#2563eb" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Amount by Type</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#16a34a" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="amount"
                nameKey="type"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
