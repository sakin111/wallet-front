import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Search } from "lucide-react";
import { useState } from "react";
import { Paginate } from "@/utils/Paginate";
import { useAllCommissionsQuery } from "@/redux/features/commission/commission.api";

interface CommissionFilter extends Record<string, string> {
  searchTerm: string; 
  page: string;
  limit: string;
  type: string;
  sort: string;
}

export default function AllCommission() {
  const [filters, setFilters] = useState<CommissionFilter>({
    page: "1",
    limit: "5",
    searchTerm: "",
    type: "",
    sort: "-createdAt",
  });

  const { data, isLoading, isFetching } = useAllCommissionsQuery(filters);
  const commissions = data?.data || [];
  const meta = data?.meta;
  
console.log(commissions);

  // Fixed: Use searchTerm consistently
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, searchTerm: e.target.value, page: "1" });
  };

  const handleTypeFilter = (value: string) => {
    setFilters({ ...filters, type: value === "ALL" ? "" : value, page: "1" });
  };

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page: page.toString() });
  };

  return (
    <Card className="w-full shadow-md mt-6">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <CardTitle className="text-lg font-semibold">
          All Commissions
        </CardTitle>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
     
          <div className="flex w-full sm:w-64 items-center gap-2">
            <Input
              placeholder="Search by user/email"
              value={filters.searchTerm}
              onChange={handleSearch}
            />
            <Button variant="outline" size="icon">
              <Search className="w-4 h-4" />
            </Button>
          </div>


          <Select
            onValueChange={handleTypeFilter}
            value={filters.type || "ALL"}
          >
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Filter by Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Types</SelectItem>
              <SelectItem value="cash-in">Cash In</SelectItem>
              <SelectItem value="cash-out">Cash Out</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>

        {(isLoading || isFetching) && (
          <div className="flex justify-center py-10">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        )}

        {/* Table */}
        {!isLoading && commissions.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Total Commission</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {commissions.map((c: any) => (
                  <TableRow key={c._id}>
                    <TableCell>{c.user?.name || c.name || "N/A"}</TableCell>
                    <TableCell>{c.user?.email || c.email || "N/A"}</TableCell>
                    <TableCell>{c.commissionRate ?? 0}%</TableCell>
                    <TableCell>${(c.totalCommission || 0).toFixed(2)}</TableCell>
                    <TableCell>
                      {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "N/A"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          !isLoading && (
            <p className="text-center text-gray-500 py-6">
              No commissions found.
            </p>
          )
        )}

        {/* Pagination */}
        {meta && (
          <div className="flex justify-center mt-6">
            <Paginate meta={meta} onPageChange={handlePageChange} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}