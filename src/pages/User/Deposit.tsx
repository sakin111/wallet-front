

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
import { Loader2 } from "lucide-react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Paginate } from "@/utils/Paginate";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function Deposit() {
  const [page, setPage] = useState(1);

  // ✅ Use the stateful page instead of hardcoding 1
  const { data, isLoading } = useMyDepositsQuery({ page, limit: 5 });
  console.log(data, "this is from deposit");

  // ✅ Handle nested response properly
  const deposits = Array.isArray(data?.data?.data) ? data.data.data : [];
  const meta = data?.data?.meta;

  console.log(deposits, "parsed deposits");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin w-6 h-6 text-muted-foreground" />
      </div>
    );
  }

  const totalDeposited = deposits.reduce(
    (acc: number, d: any) => acc + (d.amount || 0),
    0
  );

  return (
    <Card className="max-w-4xl mx-auto shadow-lg">
      <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        <CardTitle className="text-lg font-semibold">Deposit History</CardTitle>
        <p className="font-medium text-gray-700">
          Total Deposited:{" "}
          <span className="text-green-600">{totalDeposited} ৳</span>
        </p>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table className="min-w-full">
          <TableCaption>
            {deposits.length === 0
              ? "No deposits found"
              : "Your deposit transactions"}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Date & Time</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deposits.map((deposit: any) => (
              <TableRow
                key={deposit._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell>
                  {dayjs(deposit.createdAt)
                    .tz("Asia/Dhaka")
                    .format("DD MMM YYYY, HH:mm")}
                </TableCell>
                <TableCell className="font-semibold text-gray-800">
                  {deposit.amount} ৳
                </TableCell>
                <TableCell>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      deposit.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : deposit.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {deposit.status.charAt(0).toUpperCase() +
                      deposit.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell className="font-semibold text-gray-800">
                  {deposit._id}
                </TableCell>
                <TableCell className="font-semibold text-gray-800">
                  {deposit.type}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      {/* ✅ Hook up pagination */}
      <Paginate meta={meta} onPageChange={setPage} />
    </Card>
  );
}
