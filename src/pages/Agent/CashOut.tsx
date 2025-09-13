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
    <Card className="max-w-5xl mx-auto shadow-md">
      <CardContent className="overflow-x-auto">
        {cashOuts.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            {page === 1 ? "No cashOuts found" : "You have reached the end"}
          </div>
        ) : (
          <Table className="min-w-full">
            <TableCaption>Your cash out transactions</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>from</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cashOuts.map((c: IData) => (
                <TableRow key={c._id}>
                  <TableCell>
                    {dayjs(c.createdAt).tz("Asia/Dhaka").format("DD MMM YYYY, HH:mm")}
                  </TableCell>
                  <TableCell className="font-semibold text-gray-800">{c.amount} ৳</TableCell>
                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
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
                  <TableCell className="font-semibold text-gray-800">{c._id}</TableCell>
                  <TableCell className="font-semibold text-gray-800">{c.type}</TableCell>
                  <TableCell className="font-semibold text-gray-800">{c.from?.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>

      {/* ✅ Pagination */}
      {meta && cashOuts.length > 0 && <Paginate meta={meta} onPageChange={setPage} />}
    </Card>
  );
}
