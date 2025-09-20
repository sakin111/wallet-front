/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2, AlertCircle } from "lucide-react";
import { Paginate } from "@/utils/Paginate";

import type { Meta, TransactionFilter } from "@/Types";
import { Search } from "../Search";
import { useAllTransactionFilterQuery } from "@/redux/features/transaction/transaction.api";

export default function AllTransaction() {

  const [filters, setFilters] = useState<TransactionFilter>({
    page: "1",
    limit: "10",
    searchTerm: "",
    type: "",
    sort: "-createdAt",
  });


  const {
    data,
    isLoading,
    error,
    refetch,
  } = useAllTransactionFilterQuery(filters);

  console.log(data);

  const users = data?.data || [];

  console.log(users);
  const meta: Meta = data?.meta;


  const handleSearch = (value: string): void => {
    setFilters((prev) => ({ ...prev, searchTerm: value, page: "1" }));
  };

  type TransactionType = "ALL" | "CASH_IN" | "CASH_OUT" | "SEND";
  const handleTypeFilter = (value: TransactionType): void => {
    setFilters((prev: TransactionFilter) => ({
      ...prev,
      type: value === "ALL" ? "" : value,
      page: "1",
    }));
  };

  const handlePageChange = (page: number): void => {
    setFilters((prev) => ({ ...prev, page: page.toString() }));
  };

  const clearFilters = () => {
    setFilters({
      page: "1",
      limit: "10",
      searchTerm: "",
      type: "",
      sort: "-createdAt",
    });
  };

  // ✅ Loading state
  if (isLoading) {
    return (
      <Card className="mt-6">
        <CardContent className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Loading transactions...</p>
        </CardContent>
      </Card>
    );
  }

  // ✅ Error state
  if (error) {
    return (
      <Card className="mt-6">
        <CardContent className="text-center py-16">
          <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-red-600 mb-3">
            Failed to Load
          </h3>
          <Button onClick={() => refetch()}>Try Again</Button>
        </CardContent>
      </Card>
    );
  }

  // ✅ UI
  return (
    <div className="space-y-6 mt-6">
      <Card>
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>

          <div className="flex flex-col sm:flex-row gap-3">
            <Search
              value={filters.searchTerm}
              onChange={handleSearch}
              placeholder="Search by name or email..."
              className="flex-1"
            />

            <Select
              onValueChange={handleTypeFilter}
              value={filters.type || "ALL"}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Types</SelectItem>
                <SelectItem value="CASH_IN">Cash In</SelectItem>
                <SelectItem value="CASH_OUT">Cash Out</SelectItem>
                <SelectItem value="SEND">Send</SelectItem>
              </SelectContent>
            </Select>

            {(filters.searchTerm || filters.type) && (
              <Button onClick={clearFilters} variant="outline">
                Clear
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent>
          {users.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No transactions found</p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Transactions</TableHead>
                      <TableHead>Total Volume</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Role</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user: any) => (
                      <TableRow key={user._id}>
                        <TableCell>
                          <p className="text-sm text-gray-500">
                            {user?.from?.email ||
                              user?.to?.email ||
                              "No Email"}
                          </p>
                        </TableCell>
                        <TableCell>{user.type}</TableCell>
                        <TableCell>
                          ${user.amount?.toLocaleString() || "0"}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              user.status === "ACTIVE"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {user?.from?.role ||
                              user?.to?.role ||
                              "No Role"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Cards */}
              <div className="block md:hidden space-y-4">
                {users.map((user: any) => (
                  <Card key={user._id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">{user?.from?.name || user?.to?.name}</p>
                          <p className="text-sm text-gray-500">
                            {user?.from?.email || user?.to?.email}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Badge
                            variant={
                              user.status === "ACTIVE"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {user.status}
                          </Badge>
                          <Badge variant="outline">
                            {user?.from?.role || user?.to?.role}
                          </Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <p className="text-lg font-bold">
                            {user.type}
                          </p>
                          <p className="text-xs text-gray-500">Type</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold">
                            ${user.amount?.toLocaleString() || "0"}
                          </p>
                          <p className="text-xs text-gray-500">Amount</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}

          {meta && users.length > 0 && (
            <div className="mt-6 flex justify-center">
              <Paginate meta={meta} onPageChange={handlePageChange} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
