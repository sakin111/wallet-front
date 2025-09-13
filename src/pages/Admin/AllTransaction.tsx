import { useState } from "react";
import { Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useAllTransactionsFilterQuery } from "@/redux/features/transaction/transaction.api";
import { Paginate } from "@/utils/Paginate";
import { Search } from "../Search";

interface TransactionFilter {
  searchTerm: string;
  page: string;
  limit: string;
  type: string;
  sort: string;
}

export default function ManageTransactions() {
  const [filters, setFilters] = useState<TransactionFilter>({
    page: "1",
    limit: "5",
    searchTerm: "",
    type: "",
    sort: "-createdAt",
  });

  const { data, isLoading, isError } = useAllTransactionsFilterQuery(filters);

  const handleSearch = (value: string) => {
    setFilters({ ...filters, searchTerm: value, page: "1" });
  };

  const handleTypeFilter = (value: string) => {
    setFilters({ ...filters, type: value === "ALL" ? "" : value, page: "1" });
  };

  const handleSort = (value: string) => {
    setFilters({ ...filters, sort: value, page: "1" });
  };

  const handlePageChange = (newPage: number) => {
    setFilters({ ...filters, page: newPage.toString() });
  };

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
        Failed to load transactions.
      </div>
    );
  }

  const { data: transactions, meta } = data;

  console.log(data);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">Transactions</h2>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Search */}
        <Search
          value={filters.searchTerm || ""}
          onChange={handleSearch}
          placeholder="Search by user name or email"
          className="flex-1"
        />

        {/* Type filter */}
        <Select onValueChange={handleTypeFilter} value={filters.type || "ALL"}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Filter by Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Types</SelectItem>
            <SelectItem value="SEND">Send</SelectItem>
            <SelectItem value="CASH_IN">Cash In</SelectItem>
            <SelectItem value="CASH_OUT">Cash Out</SelectItem>
          </SelectContent>
        </Select>

    
        <Select onValueChange={handleSort} value={filters.sort}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="-createdAt">Newest First</SelectItem>
            <SelectItem value="createdAt">Oldest First</SelectItem>
            <SelectItem value="totalVolume">Highest Volume</SelectItem>
            <SelectItem value="-totalVolume">Lowest Volume</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Total Transactions</TableHead>
              <TableHead>Transaction Volume</TableHead>
              <TableHead>Transaction Types</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions && transactions.length > 0 ? (
              transactions.map((user: any) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name || "N/A"}</TableCell>
                  <TableCell>{user.email || "N/A"}</TableCell>
                  <TableCell>{user.totalTransactions || 0}</TableCell>
                  <TableCell>
                    ${Number(user.totalVolume || 0).toLocaleString()}
                  </TableCell>
                  <TableCell>

                    {user.transactionsByType && Object.keys(user.transactionsByType).length > 0
                      ? Object.entries(user.transactionsByType)
                          .map(([type, count]) => `${type}: ${count}`)
                          .join(", ")
                      : "N/A"}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No transactions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {meta && (
        <div className="flex justify-center">
          <Paginate meta={meta} onPageChange={handlePageChange} />
        </div>
      )}
    </div>
  );
}