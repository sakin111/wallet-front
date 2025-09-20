import { useState, type JSX } from "react";
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
import {  Calendar, DollarSign, CreditCard, User, RefreshCw, AlertCircle } from "lucide-react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Paginate } from "@/utils/Paginate";
import { useAgentCashOutQuery } from "@/redux/features/transaction/transaction.api";
import type { CashOutTransaction} from "@/Types";

dayjs.extend(utc);
dayjs.extend(timezone);



export default function CashOut(): JSX.Element {
  const [page, setPage] = useState<number>(1);
  const limit = 5;

  const { data, isLoading, error, refetch } = useAgentCashOutQuery({ page, limit });


console.log("Raw data:", data);


const cashOuts = data?.data ?? [];
const meta = data?.meta;



  // Helper functions
  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case "completed":
      case "success":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "failed":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatStatus = (status: string): string => {
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-BD', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-96">
            <div className="text-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-pulse mx-auto"></div>
                <RefreshCw className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin w-8 h-8 text-blue-600" />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-semibold text-gray-800">Loading Cash Out History</p>
                <p className="text-sm text-gray-600">Please wait while we fetch your transactions...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-96">
            <Card className="max-w-md w-full shadow-xl border-0 bg-white">
              <CardContent className="text-center p-8">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-red-600 mb-3">
                  Failed to Load Cash Out History
                </h3>
                <p className="text-gray-600 mb-6">
                  We couldn't retrieve your transaction history. Please try again.
                </p>
                <button
                  onClick={() => refetch()}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
                >
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  console.log("Cash out transactions:", cashOuts);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Main Content */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <CreditCard className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-gray-800">
                  Transaction History
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  View your cash out transaction details and status
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {cashOuts.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No Cash Out Transactions Found
                </h3>
                <p className="text-gray-500 text-base max-w-md mx-auto">
                  Your cash out transactions will appear here once you make them. 
                  Start by initiating a withdrawal request.
                </p>
              </div>
            ) : (
              <>
                {/* Desktop Table View */}
                <div className="hidden lg:block overflow-x-auto">
                  <Table>
                    <TableCaption className="text-base py-4">
                      Showing {cashOuts.length} of {meta?.total || cashOuts.length} cash out transactions
                    </TableCaption>
                    <TableHeader>
                      <TableRow className="bg-gray-50/50 border-b-2 border-gray-100 hover:bg-transparent">
                        <TableHead className="font-semibold text-gray-800 py-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Date & Time
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-800">
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4" />
                            Amount
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-800">Status</TableHead>
                        <TableHead className="font-semibold text-gray-800">Transaction ID</TableHead>
                        <TableHead className="font-semibold text-gray-800">
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4" />
                            Method
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-800">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Account
                          </div>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cashOuts.map((transaction: CashOutTransaction) => (
                        <TableRow
                          key={transaction._id}
                          className="border-b border-gray-50 hover:bg-blue-50/50 transition-all duration-200"
                        >
                          <TableCell className="py-4">
                            <div className="space-y-1">
                              <p className="font-semibold text-gray-900">
                                {dayjs(transaction.createdAt).tz("Asia/Dhaka").format("DD MMM YYYY")}
                              </p>
                              <p className="text-sm text-gray-500">
                                {dayjs(transaction.createdAt).tz("Asia/Dhaka").format("HH:mm")}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="py-4">
                            <span className="font-bold text-lg text-red-700">
                              -{formatCurrency(transaction.amount)} ৳
                            </span>
                          </TableCell>
                          <TableCell className="py-4">
                            <Badge className={`${getStatusColor(transaction.status)} border font-medium`}>
                              {formatStatus(transaction.status)}
                            </Badge>
                          </TableCell>
                          <TableCell className="py-4">
                            <code className="bg-gray-100 px-3 py-1 rounded text-xs font-mono text-gray-700">
                              {transaction._id.slice(-8)}...
                            </code>
                          </TableCell>
                          <TableCell className="py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                              {transaction.type}
                            </span>
                          </TableCell>
                          <TableCell className="py-4">
                            <span className="text-sm text-gray-700 truncate max-w-32 block">
                              {transaction?.from?.email}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile Card View */}
                <div className="block lg:hidden p-4 sm:p-6">
                  <div className="space-y-4">
                    {cashOuts.map((transaction: CashOutTransaction) => (
                      <Card key={transaction._id} className="border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-200 hover:border-blue-200">
                        <CardContent className="p-4">
                          {/* Header Row */}
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                <p className="font-semibold text-gray-900 truncate">
                                  {dayjs(transaction.createdAt).tz("Asia/Dhaka").format("DD MMM YYYY")}
                                </p>
                              </div>
                              <p className="text-sm text-gray-500 ml-6">
                                {dayjs(transaction.createdAt).tz("Asia/Dhaka").format("HH:mm")}
                              </p>
                            </div>
                            <Badge className={`${getStatusColor(transaction.status)} border font-medium flex-shrink-0`}>
                              {formatStatus(transaction.status)}
                            </Badge>
                          </div>

                          {/* Amount */}
                          <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2">
                              <DollarSign className="w-4 h-4 text-red-600" />
                              <p className="text-sm font-medium text-gray-600">Withdrawal Amount</p>
                            </div>
                            <p className="font-bold text-2xl text-red-700 ml-6">
                              -{formatCurrency(transaction.amount)} ৳
                            </p>
                          </div>

                          {/* Method and Transaction ID */}
                          <div className="space-y-3 mb-4">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <CreditCard className="w-4 h-4 text-blue-600" />
                                <p className="text-sm font-medium text-gray-600">Method</p>
                              </div>
                              <p className="font-medium text-blue-700 ml-6">{transaction.type}</p>
                            </div>

                            <div>
                              <p className="text-sm font-medium text-gray-600 mb-1">Transaction ID</p>
                              <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono text-gray-700 block break-all">
                                {transaction._id}
                              </code>
                            </div>
                          </div>

                          {/* Account */}
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <User className="w-4 h-4 text-gray-600" />
                              <p className="text-sm font-medium text-gray-600">Account</p>
                            </div>
                            <p className="text-sm text-gray-700 ml-6 break-all">{transaction?.from?.email}</p>
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
          <div className="flex justify-center py-4">
            <Paginate meta={meta} onPageChange={setPage} />
          </div>
        )}
      </div>
    </div>
  );
}