import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Calendar, DollarSign, CreditCard, User } from "lucide-react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Paginate } from "@/utils/Paginate";
import { useAgentCashOutQuery } from "@/redux/features/transaction/transaction.api";
import type { IData } from "@/Types";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function CashOut() {
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading } = useAgentCashOutQuery({ page, limit });

  const cashOuts = data?.data ?? [];
  const meta = data?.meta;

  // Calculate summary statistics
  const totalAmount = cashOuts.reduce((sum: number, c: IData) => sum + (c.amount || 0), 0);
  const completedCount = cashOuts.filter((c: IData) => c.status === "completed").length;
  const pendingCount = cashOuts.filter((c: IData) => c.status === "pending").length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-96">
            <div className="text-center">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                <Loader2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-blue-600" />
              </div>
              <p className="text-lg font-medium text-gray-700">Loading your transactions...</p>
              <p className="text-sm text-gray-500 mt-1">Please wait while we fetch your data</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  console.log(cashOuts, "parsed cashOuts");

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "failed":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header Section */}
        <div className="text-center lg:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Cash Out Transactions
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Track and manage your withdrawal history
              </p>
            </div>

          </div>
        </div>

        {/* Summary Cards */}
        {cashOuts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-medium">Total Amount</p>
                    <p className="text-2xl sm:text-3xl font-bold">{totalAmount.toLocaleString()} ৳</p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <DollarSign className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">Total Transactions</p>
                    <p className="text-2xl sm:text-3xl font-bold">{cashOuts.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <CreditCard className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-green-600 text-white">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-emerald-100 text-sm font-medium">Completed</p>
                    <p className="text-2xl sm:text-3xl font-bold">{completedCount}</p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <span className="w-3 h-3 bg-emerald-500 rounded-full"></span>
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-500 to-orange-600 text-white">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-100 text-sm font-medium">Pending</p>
                    <p className="text-2xl sm:text-3xl font-bold">{pendingCount}</p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Content */}
        <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
          <CardHeader className="border-b bg-white/50">
            <CardTitle className="text-lg sm:text-xl font-semibold text-gray-800">
              Transaction History
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {cashOuts.length === 0 ? (
              <div className="text-center py-12 sm:py-16">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                  {page === 1 ? "No transactions found" : "You've reached the end"}
                </h3>
                <p className="text-gray-500 text-sm sm:text-base">
                  {page === 1
                    ? "Your cash out transactions will appear here once you make them"
                    : "No more transactions to display"
                  }
                </p>
              </div>
            ) : (
              <>
                {/* Desktop Table View */}
                <div className="hidden lg:block overflow-x-auto">
                  <Table>
                    <TableCaption className="sr-only">
                      Your cash out transactions
                    </TableCaption>
                    <TableHeader>
                      <TableRow className="bg-gray-50/50">
                        <TableHead className="font-semibold text-gray-700">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Date & Time
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700">
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4" />
                            Amount
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700">Status</TableHead>
                        <TableHead className="font-semibold text-gray-700">Transaction ID</TableHead>
                        <TableHead className="font-semibold text-gray-700">
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4" />
                            Method
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            From
                          </div>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cashOuts.map((c: IData, index: number) => (
                        <TableRow
                          key={c._id}
                          className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50/30"} hover:bg-blue-50/50 transition-colors`}
                        >
                          <TableCell className="font-medium">
                            <div>
                              <p className="font-semibold text-gray-900">
                                {dayjs(c.createdAt).tz("Asia/Dhaka").format("DD MMM YYYY")}
                              </p>
                              <p className="text-sm text-gray-500">
                                {dayjs(c.createdAt).tz("Asia/Dhaka").format("HH:mm")}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="font-bold text-lg text-green-700">
                              {c.amount?.toLocaleString()} ৳
                            </span>
                          </TableCell>
                          <TableCell>
                            <Badge className={`${getStatusColor(c.status)} border`}>
                              {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">
                              {c._id.slice(-8)}...
                            </code>
                          </TableCell>
                          <TableCell>
                            <span className="font-medium text-blue-700">{c.type}</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-gray-700">{c.email}</span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Tablet View */}
                <div className="hidden md:block lg:hidden overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50/50">
                        <TableHead className="font-semibold text-gray-700">Date & Amount</TableHead>
                        <TableHead className="font-semibold text-gray-700">Status & Method</TableHead>
                        <TableHead className="font-semibold text-gray-700">Transaction Details</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cashOuts.map((c: IData, index: number) => (
                        <TableRow
                          key={c._id}
                          className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50/30"} hover:bg-blue-50/50 transition-colors`}
                        >
                          <TableCell>
                            <div>
                              <p className="font-semibold text-gray-900">
                                {dayjs(c.createdAt).tz("Asia/Dhaka").format("DD MMM YYYY")}
                              </p>
                              <p className="text-sm text-gray-500 mb-2">
                                {dayjs(c.createdAt).tz("Asia/Dhaka").format("HH:mm")}
                              </p>
                              <span className="font-bold text-lg text-green-700">
                                {c.amount?.toLocaleString()} ৳
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-2">
                              <Badge className={`${getStatusColor(c.status)} border`}>
                                {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                              </Badge>
                              <p className="font-medium text-blue-700">{c.type}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono block mb-2">
                                {c._id.slice(-8)}...
                              </code>
                              <p className="text-sm text-gray-700">{c.email}</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile Card View */}
                <div className="block md:hidden p-4 sm:p-6">
                  <div className="space-y-4">
                    {cashOuts.map((c: IData) => (
                      <Card key={c._id} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          {/* Header Row */}
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Calendar className="w-4 h-4 text-gray-500" />
                                <p className="font-semibold text-gray-900">
                                  {dayjs(c.createdAt).tz("Asia/Dhaka").format("DD MMM YYYY")}
                                </p>
                              </div>
                              <p className="text-sm text-gray-500 ml-6">
                                {dayjs(c.createdAt).tz("Asia/Dhaka").format("HH:mm")}
                              </p>
                            </div>
                            <Badge className={`${getStatusColor(c.status)} border`}>
                              {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                            </Badge>
                          </div>

                          {/* Amount */}
                          <div className="mb-4">
                            <div className="flex items-center gap-2 mb-1">
                              <DollarSign className="w-4 h-4 text-green-600" />
                              <p className="text-sm font-medium text-gray-600">Amount</p>
                            </div>
                            <p className="font-bold text-2xl text-green-700 ml-6">
                              {c.amount?.toLocaleString()} ৳
                            </p>
                          </div>

                          {/* Method and Transaction ID */}
                          <div className="grid grid-cols-1 gap-4 mb-4">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <CreditCard className="w-4 h-4 text-blue-600" />
                                <p className="text-sm font-medium text-gray-600">Method</p>
                              </div>
                              <p className="font-medium text-blue-700 ml-6">{c.type}</p>
                            </div>

                            <div>
                              <p className="text-sm font-medium text-gray-600 mb-1">Transaction ID</p>
                              <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">
                                {c._id}
                              </code>
                            </div>
                          </div>

                          {/* From */}
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <User className="w-4 h-4 text-gray-600" />
                              <p className="text-sm font-medium text-gray-600">From</p>
                            </div>
                            <p className="text-sm text-gray-700 ml-6 break-all">{c.email}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Pagination */}
        {meta && cashOuts.length > 0 && (
          <div className="flex justify-center">
            <Paginate meta={meta} onPageChange={setPage} />
          </div>
        )}
      </div>
    </div>
  );
}