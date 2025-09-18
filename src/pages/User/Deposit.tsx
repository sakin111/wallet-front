"use client";

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
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
  CreditCard,
  Hash,
  Tag,
  TrendingUp,
} from "lucide-react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Paginate } from "@/utils/Paginate";
import type { Deposit, DepositStatus, PaginatedResponse } from "@/Types";

dayjs.extend(utc);
dayjs.extend(timezone);




export default function Deposit() {
  const [page, setPage] = useState(1);


  const { data, isLoading } = useMyDepositsQuery<PaginatedResponse<Deposit>>({
    page,
    limit: 5,
  });

  const deposits: Deposit[] = data?.data ?? [];
  const meta = data?.meta;

  const totalDeposited = deposits.reduce((acc, d) => acc + d.amount, 0);

  const getStatusConfig = (status: DepositStatus) => {
    const config = {
      SUCCESS: {
        icon: <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />,
        color: "bg-green-100 text-green-700 border-green-200",
      },
      PENDING: {
        icon: <Clock className="w-3 h-3 sm:w-4 sm:h-4" />,
        color: "bg-yellow-100 text-yellow-700 border-yellow-200",
      },
      FAILED: {
        icon: <XCircle className="w-3 h-3 sm:w-4 sm:h-4" />,
        color: "bg-red-100 text-red-700 border-red-200",
      },
    } as const;

    return config[status] ?? config.FAILED;
  };

const metaWithTotalPages = meta
  ? { ...meta, totalPages: Math.ceil(meta.total / meta.limit) }
  : undefined;


  const EmptyState = () => (
    <div className="text-center py-12 sm:py-16 px-4">
      <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
        <DollarSign className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
      </div>
      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
        No Deposits Found
      </h3>
      <p className="text-sm sm:text-base text-gray-500 max-w-sm mx-auto">
        Your deposit transactions will appear here once you make your first
        deposit.
      </p>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48 sm:h-64 p-4">
        <div className="text-center space-y-3">
          <Loader2 className="animate-spin w-8 h-8 sm:w-10 sm:h-10 text-primary mx-auto" />
          <p className="text-sm sm:text-base text-gray-500">
            Loading your deposits...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-3 sm:p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
              <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                Deposit History
              </h1>
              <p className="text-sm sm:text-base text-gray-500 mt-1">
                Track all your deposit transactions
              </p>
            </div>
          </div>

          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">
                    Total Deposited
                  </p>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600">
                    {totalDeposited.toLocaleString()} ৳
                  </p>
                </div>
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Card/Table */}
      <Card className="shadow-lg border-0 bg-white overflow-hidden">
        {deposits.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Mobile View */}
            <div className="block lg:hidden">
              <CardContent className="p-0">
                <div className="space-y-3 p-4">
                  {deposits.map((deposit) => (
                    <Card
                      key={deposit._id}
                      className="border border-gray-200 hover:shadow-md transition-all duration-200 hover:border-gray-300"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-green-600" />
                            <span className="text-xl sm:text-2xl font-bold text-gray-900">
                              {deposit.amount.toLocaleString()} ৳
                            </span>
                          </div>
                          <Badge
                            className={`${getStatusConfig(deposit.status).color} flex items-center gap-1 text-xs px-2 py-1`}
                          >
                            {getStatusConfig(deposit.status).icon}
                            {deposit.status.charAt(0).toUpperCase() +
                              deposit.status.slice(1).toLowerCase()}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {dayjs(deposit.createdAt)
                              .tz("Asia/Dhaka")
                              .format("DD MMM YYYY, HH:mm")}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 gap-2 pt-3 border-t border-gray-100">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Tag className="w-3 h-3" />
                              <span>Type</span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {deposit.type}
                            </Badge>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Hash className="w-3 h-3" />
                              <span>Transaction ID</span>
                            </div>
                            <div className="text-xs font-mono bg-gray-50 px-2 py-1 rounded border max-w-24 truncate">
                              {deposit._id.slice(-8)}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </div>

            {/* Desktop View */}
            <div className="hidden lg:block">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table className="min-w-full">
                    <TableCaption className="text-base py-4 bg-gray-50">
                      Showing {deposits.length} of {meta?.total || deposits.length}{" "}
                      transactions
                    </TableCaption>
                    <TableHeader>
                      <TableRow className="bg-gray-50/50">
                        <TableHead className="font-semibold text-gray-700 py-4">
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
                        <TableHead className="font-semibold text-gray-700">
                          Status
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700">
                          <div className="flex items-center gap-2">
                            <Hash className="w-4 h-4" />
                            Transaction ID
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700">
                          <div className="flex items-center gap-2">
                            <Tag className="w-4 h-4" />
                            Type
                          </div>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {deposits.map((deposit) => (
                        <TableRow
                          key={deposit._id}
                          className="hover:bg-gray-50 transition-colors border-b border-gray-100"
                        >
                          <TableCell className="font-medium text-gray-700 py-4">
                            {dayjs(deposit.createdAt)
                              .tz("Asia/Dhaka")
                              .format("DD MMM YYYY, HH:mm")}
                          </TableCell>
                          <TableCell className="font-bold text-gray-900 text-lg">
                            {deposit.amount.toLocaleString()} ৳
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={`${getStatusConfig(deposit.status).color} flex items-center gap-1 w-fit`}
                            >
                              {getStatusConfig(deposit.status).icon}
                              {deposit.status.charAt(0).toUpperCase() +
                                deposit.status.slice(1).toLowerCase()}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="font-mono text-sm bg-gray-50 px-3 py-1 rounded border max-w-48 truncate">
                              {deposit._id}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{deposit.type}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </div>
          </>
        )}

        {/* Pagination */}
        {meta && deposits.length > 0 && (
          <div className="p-4 sm:p-6 border-t border-gray-100 bg-gray-50/50">
            <Paginate meta={metaWithTotalPages} onPageChange={setPage} />
          </div>
        )}
      </Card>
    </div>
  );
}
