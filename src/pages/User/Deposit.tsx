
import { useState } from "react";
import { useMyDepositsQuery } from "@/redux/features/transaction/transaction.api";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, ArrowUpRight, Calendar, DollarSign, CreditCard, Hash } from "lucide-react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Paginate } from "@/utils/Paginate";
import type { Deposit, DepositStatus, Meta } from "@/Types";

dayjs.extend(utc);
dayjs.extend(timezone);



export default function DepositHistory() {
  const [page, setPage] = useState<number>(1);

  const { 
    data, 
    isLoading, 
    error 
  } = useMyDepositsQuery({ page, limit: 5 });

  const deposits: Deposit[] = data?.data || [];
  const meta: Meta | undefined = data?.meta;

  const totalDeposited: number = deposits.reduce((acc: number, deposit: Deposit) => {
    return acc + (deposit.amount || 0);
  }, 0);

  // Loading state with enhanced spinner
  if (isLoading) {
    return (
      <div className="min-h-[400px] flex flex-col justify-center items-center space-y-4 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl mx-4 lg:mx-0">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-pulse"></div>
          <Loader2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin w-8 h-8 text-blue-600" />
        </div>
        <p className="text-blue-700 font-medium animate-pulse">Loading your deposit history...</p>
      </div>
    );
  }

  // Enhanced error state
  if (error) {
    return (
      <Card className="max-w-6xl mx-4 lg:mx-auto shadow-xl border-0 bg-gradient-to-br from-red-50 to-pink-100">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ArrowUpRight className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-red-800 mb-2">Unable to Load Deposits</h3>
          <p className="text-red-600 mb-4">
            We couldn't retrieve your deposit history. Please check your connection and try again.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            Retry
          </button>
        </CardContent>
      </Card>
    );
  }

  const getStatusConfig = (status: DepositStatus) => {
    switch (status) {
      case "SUCCESS":
      case "completed":
        return {
          variant: "default" as const,
          className: "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200",
          icon: "✓"
        };
      case "PENDING":
      case "pending":
        return {
          variant: "secondary" as const,
          className: "bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200",
          icon: "⏳"
        };
      case "FAILED":
      default:
        return {
          variant: "destructive" as const,
          className: "bg-red-100 text-red-800 hover:bg-red-200 border-red-200",
          icon: "✗"
        };
    }
  };

  const formatStatus = (status: DepositStatus): string => {
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-BD', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="max-w-7xl mx-4 lg:mx-auto space-y-6 mt-16">
      {/* Header Stats Card */}
      <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16"></div>
        <CardHeader className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
            <div>
              <CardTitle className="text-2xl lg:text-3xl font-bold mb-2 flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <DollarSign className="w-6 h-6 lg:w-7 lg:h-7" />
                </div>
                Deposit History
              </CardTitle>
              <p className="text-blue-100 text-sm lg:text-base">
                Track all your deposit transactions in one place
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 lg:p-6 min-w-0 flex-shrink-0">
              <p className="text-blue-100 text-sm font-medium mb-1">Total Deposited</p>
              <p className="text-2xl lg:text-4xl font-bold truncate">
                {formatCurrency(totalDeposited)} ৳
              </p>
              <p className="text-blue-200 text-xs lg:text-sm mt-1">
                {deposits.length} transaction{deposits.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Table Card */}
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-0">
          {/* Mobile Card View */}
          <div className="lg:hidden">
            {deposits.length === 0 ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No Deposits Yet</h3>
                <p className="text-gray-600">Your deposit transactions will appear here once you make them.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {deposits.map((deposit: Deposit) => {
                  const statusConfig = getStatusConfig(deposit.status);
                  return (
                    <div key={deposit._id} className="p-4 hover:bg-gray-50/80 transition-colors duration-200">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {dayjs(deposit.createdAt).tz("Asia/Dhaka").format("DD MMM YYYY")}
                            </p>
                          </div>
                          <p className="text-xs text-gray-500 ml-6">
                            {dayjs(deposit.createdAt).tz("Asia/Dhaka").format("HH:mm")}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0 ml-4">
                          <p className="text-lg font-bold text-gray-900">
                            {formatCurrency(deposit.amount)} ৳
                          </p>
                          <Badge className={`text-xs font-medium ${statusConfig.className} border`}>
                            {statusConfig.icon} {formatStatus(deposit.status)}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-gray-600">
                            <CreditCard className="w-3 h-3" />
                            <span>Type:</span>
                          </div>
                          <span className="font-medium text-gray-900 capitalize">{deposit.type}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Hash className="w-3 h-3" />
                            <span>ID:</span>
                          </div>
                          <span className="font-mono text-gray-700 text-xs truncate max-w-32">
                            {deposit._id}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <Table>
              <TableCaption className="text-base py-4">
                {deposits.length === 0 ? (
                  <div className="py-12">
                    <CreditCard className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">No deposits found</p>
                    <p className="text-gray-500 text-sm mt-1">Your transactions will appear here</p>
                  </div>
                ) : (
                  `Showing ${deposits.length} of ${meta?.total || deposits.length} deposit transactions`
                )}
              </TableCaption>
              {deposits.length > 0 && (
                <>
                  <TableHeader>
                    <TableRow className="border-b-2 border-gray-100 hover:bg-transparent">
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
                      <TableHead className="font-semibold text-gray-800">
                        <div className="flex items-center gap-2">
                          <Hash className="w-4 h-4" />
                          Transaction ID
                        </div>
                      </TableHead>
                      <TableHead className="font-semibold text-gray-800">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4" />
                          Type
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {deposits.map((deposit: Deposit) => {
                      const statusConfig = getStatusConfig(deposit.status);
                      return (
                        <TableRow 
                          key={deposit._id} 
                          className="border-b border-gray-50 hover:bg-blue-50/50 transition-all duration-200 group"
                        >
                          <TableCell className="py-4">
                            <div className="space-y-1">
                              <p className="font-medium text-gray-900">
                                {dayjs(deposit.createdAt).tz("Asia/Dhaka").format("DD MMM YYYY")}
                              </p>
                              <p className="text-sm text-gray-500">
                                {dayjs(deposit.createdAt).tz("Asia/Dhaka").format("HH:mm")}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="py-4">
                            <p className="text-lg font-bold text-gray-900">
                              {formatCurrency(deposit.amount)} ৳
                            </p>
                          </TableCell>
                          <TableCell className="py-4">
                            <Badge className={`font-medium ${statusConfig.className} border`}>
                              {statusConfig.icon} {formatStatus(deposit.status)}
                            </Badge>
                          </TableCell>
                          <TableCell className="py-4">
                            <p className="font-mono text-sm text-gray-700 max-w-32 truncate group-hover:max-w-none group-hover:whitespace-normal transition-all duration-200">
                              {deposit._id}
                            </p>
                          </TableCell>
                          <TableCell className="py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 capitalize">
                              {deposit.type}
                            </span>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </>
              )}
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      {meta && deposits.length > 0 && (
        <div className="flex justify-center py-4">
          <Paginate meta={meta} onPageChange={setPage} />
        </div>
      )}
    </div>
  );
}