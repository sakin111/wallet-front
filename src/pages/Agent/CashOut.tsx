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
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
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

  const cashOuts = Array.isArray(data?.data?.data) ? data.data.data : [];
  const meta = data?.data?.meta;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin w-6 h-6 text-muted-foreground" />
      </div>
    );
  }

  console.log(cashOuts, "parsed cashOuts");

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-full mx-auto shadow-md">
        <CardContent className="p-0">
          {cashOuts.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              {page === 1 ? "No cashOuts found" : "You have reached the end"}
            </div>
          ) : (
            <>
              {/* Desktop and Tablet View */}
              <div className="hidden md:block overflow-x-auto">
                <Table className="min-w-full">
                  <TableCaption>Your cash out transactions</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="whitespace-nowrap">Date & Time</TableHead>
                      <TableHead className="whitespace-nowrap">Amount</TableHead>
                      <TableHead className="whitespace-nowrap">Status</TableHead>
                      <TableHead className="whitespace-nowrap">Transaction ID</TableHead>
                      <TableHead className="whitespace-nowrap">Method</TableHead>
                      <TableHead className="whitespace-nowrap">From</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cashOuts.map((c: IData) => (
                      <TableRow key={c._id}>
                        <TableCell className="whitespace-nowrap">
                          {dayjs(c.createdAt).tz("Asia/Dhaka").format("DD MMM YYYY, HH:mm")}
                        </TableCell>
                        <TableCell className="font-semibold primary whitespace-nowrap">
                          {c.amount} ৳
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                              c.status === "completed"
                                ? "bg-green-100 text-green-700"
                                : c.status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell className="font-semibold primary">
                          <span className="block truncate max-w-32" title={c._id}>
                            {c._id}
                          </span>
                        </TableCell>
                        <TableCell className="font-semibold primary whitespace-nowrap">
                          {c.type}
                        </TableCell>
                        <TableCell className="font-semibold primary">
                          <span className="block truncate max-w-32" title={c.from?.email}>
                            {c.from?.email}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile View - Card Layout */}
              <div className="block md:hidden">
                <div className="p-4">
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    Your cash out transactions
                  </p>
                  <div className="space-y-4">
                    {cashOuts.map((c: IData) => (
                      <div
                        key={c._id}
                        className="border rounded-lg p-4 space-y-3 bg-white"
                      >
                        {/* Date and Amount Row */}
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Date & Time</p>
                            <p className="text-sm">
                              {dayjs(c.createdAt).tz("Asia/Dhaka").format("DD MMM YYYY")}
                            </p>
                            <p className="text-xs text-gray-500">
                              {dayjs(c.createdAt).tz("Asia/Dhaka").format("HH:mm")}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-600">Amount</p>
                            <p className="text-lg font-semibold primary">{c.amount} ৳</p>
                          </div>
                        </div>

                        {/* Status */}
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">Status</p>
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                              c.status === "completed"
                                ? "bg-green-100 text-green-700"
                                : c.status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                          </span>
                        </div>

                        {/* Transaction ID */}
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">Transaction ID</p>
                          <p className="text-sm font-semibold primary break-all">{c._id}</p>
                        </div>

                        {/* Method and From */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Method</p>
                            <p className="text-sm font-semibold primary">{c.type}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">From</p>
                            <p className="text-sm font-semibold primary break-all">
                              {c.from?.email}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </CardContent>

        {/* Pagination */}
        {meta && cashOuts.length > 0 && (
          <div className="px-4 pb-4">
            <Paginate meta={meta} onPageChange={setPage} />
          </div>
        )}
      </Card>
    </div>
  );
}