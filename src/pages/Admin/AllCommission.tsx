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
  TableCaption,
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
import { Badge } from "@/components/ui/badge";
import { 
  Loader2, 
  Search, 
  Users, 
  DollarSign, 
  Percent,
  Calendar,
  Mail,
  User,
  Filter,
  RefreshCw,
  AlertCircle
} from "lucide-react";
import { useState, type JSX } from "react";
import { Paginate } from "@/utils/Paginate";
import { useAllCommissionsQuery } from "@/redux/features/commission/commission.api";
import type { Commission, CommissionFilter, Meta } from "@/Types";



export default function AllCommission(): JSX.Element {
  const [filters, setFilters] = useState<CommissionFilter>({
    page: "1",
    limit: "5",
    searchTerm: "",
    type: "",
    sort: "-createdAt",
  });

  const { data, isLoading, isFetching, error, refetch } = useAllCommissionsQuery(filters);
  
  // Type-safe data extraction
  const commissions: Commission[] = data?.data|| [];
  const meta: Meta | undefined = data?.meta;
  const totalCommissions = commissions.length;
  const totalAmount = commissions.reduce((sum, c) => sum + (c.totalCommission || 0), 0);

  console.log("Commissions data:", commissions);

  // Event handlers with proper typing
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFilters(prev => ({ ...prev, searchTerm: e.target.value, page: "1" }));
  };

  const handleTypeFilter = (value: string): void => {
    setFilters(prev => ({ ...prev, type: value === "ALL" ? "" : value, page: "1" }));
  };

  const handleSortChange = (value: string): void => {
    setFilters(prev => ({ ...prev, sort: value, page: "1" }));
  };

  const handlePageChange = (page: number): void => {
    setFilters(prev => ({ ...prev, page: page.toString() }));
  };

  const clearFilters = (): void => {
    setFilters({
      page: "1",
      limit: "5",
      searchTerm: "",
      type: "",
      sort: "-createdAt",
    });
  };

  // Helper functions
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const formatPercentage = (rate: number): string => {
    return (rate * 100).toFixed(2);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getUserName = (commission: Commission): string => {
    return commission.user?.name || commission.name || "Unknown User";
  };

  const getUserEmail = (commission: Commission): string => {
    return commission.user?.email || commission.email || "No email";
  };

  const getRateCategory = (rate: number): { label: string; color: string } => {
    const percentage = rate * 100;
    if (percentage >= 10) return { label: "High", color: "bg-red-100 text-red-800" };
    if (percentage >= 5) return { label: "Medium", color: "bg-yellow-100 text-yellow-800" };
    return { label: "Low", color: "bg-green-100 text-green-800" };
  };

  // Loading state
  if (isLoading && commissions.length === 0) {
    return (
      <div className="w-full mt-6">
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="flex items-center justify-center py-16">
            <div className="text-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-pulse mx-auto"></div>
                <RefreshCw className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin w-8 h-8 text-blue-600" />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-semibold text-gray-800">Loading Commissions</p>
                <p className="text-sm text-gray-600">Please wait while we fetch the data...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full mt-6">
        <Card className="shadow-xl border-0 bg-white">
          <CardContent className="text-center p-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-red-600 mb-3">
              Failed to Load Commissions
            </h3>
            <p className="text-gray-600 mb-6">
              We couldn't retrieve the commission data. Please try again.
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
    );
  }

  return (
    <div className="w-full space-y-6 mt-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Agents</p>
                <p className="text-2xl font-bold text-blue-700">{totalCommissions}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-green-100 hover:shadow-xl transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500 rounded-lg">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Commission</p>
                <p className="text-2xl font-bold text-green-700">${formatCurrency(totalAmount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500 rounded-lg">
                <Percent className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Average Rate</p>
                <p className="text-2xl font-bold text-purple-700">
                  {commissions.length > 0 
                    ? formatPercentage(commissions.reduce((sum, c) => sum + c.commissionRate, 0) / commissions.length)
                    : "0.00"
                  }%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table Card */}
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-gray-800">
                  All Commissions
                </CardTitle>
                <p className="text-sm text-gray-600">
                  Manage and view all agent commissions
                </p>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              {/* Search */}
              <div className="relative flex-1 lg:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by name or email..."
                  value={filters.searchTerm}
                  onChange={handleSearch}
                  className="pl-10 bg-white border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              {/* Type Filter */}
              <Select
                onValueChange={handleTypeFilter}
                value={filters.type || "ALL"}
              >
                <SelectTrigger className="w-full sm:w-40 bg-white border-gray-200">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Types</SelectItem>
                  <SelectItem value="cash-in">Cash In</SelectItem>
                  <SelectItem value="cash-out">Cash Out</SelectItem>
                  <SelectItem value="transfer">Transfer</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select
                onValueChange={handleSortChange}
                value={filters.sort}
              >
                <SelectTrigger className="w-full sm:w-40 bg-white border-gray-200">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="-createdAt">Newest First</SelectItem>
                  <SelectItem value="createdAt">Oldest First</SelectItem>
                  <SelectItem value="-totalCommission">Highest Commission</SelectItem>
                  <SelectItem value="totalCommission">Lowest Commission</SelectItem>
                  <SelectItem value="-commissionRate">Highest Rate</SelectItem>
                  <SelectItem value="commissionRate">Lowest Rate</SelectItem>
                </SelectContent>
              </Select>

              {/* Clear Filters */}
              {(filters.searchTerm || filters.type) && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={clearFilters}
                  className="flex-shrink-0"
                  title="Clear all filters"
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {/* Loading overlay */}
          {isFetching && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center">
              <div className="flex items-center gap-2 text-blue-600">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="font-medium">Updating...</span>
              </div>
            </div>
          )}

          {/* Mobile Card View */}
          <div className="lg:hidden">
            {commissions.length === 0 ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No Commissions Found</h3>
                <p className="text-gray-600">Try adjusting your filters or check back later.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {commissions.map((commission: Commission) => {
                  const rateCategory = getRateCategory(commission.commissionRate);
                  return (
                    <div key={commission._id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="space-y-3">
                        {/* User Info */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <User className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-semibold text-gray-900 truncate">
                                {getUserName(commission)}
                              </p>
                              <p className="text-sm text-gray-600 truncate">
                                {getUserEmail(commission)}
                              </p>
                            </div>
                          </div>
                          <Badge className={`text-xs font-medium ${rateCategory.color}`}>
                            {rateCategory.label} Rate
                          </Badge>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 text-center bg-gray-50 rounded-lg p-3">
                          <div>
                            <p className="text-lg font-bold text-green-700">
                              ${formatCurrency(commission.totalCommission)}
                            </p>
                            <p className="text-xs text-gray-600">Total</p>
                          </div>
                          <div>
                            <p className="text-lg font-bold text-purple-700">
                              {formatPercentage(commission.commissionRate)}%
                            </p>
                            <p className="text-xs text-gray-600">Rate</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800">
                              {formatDate(commission.createdAt)}
                            </p>
                            <p className="text-xs text-gray-600">Joined</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block">
            <Table>
              <TableCaption className="text-base py-4">
                {commissions.length === 0 ? (
                  <div className="py-12">
                    <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">No commissions found</p>
                    <p className="text-gray-500 text-sm mt-1">Try adjusting your search or filters</p>
                  </div>
                ) : (
                  `Showing ${commissions.length} of ${meta?.total || commissions.length} commission records`
                )}
              </TableCaption>
              {commissions.length > 0 && (
                <>
                  <TableHeader>
                    <TableRow className="border-b-2 border-gray-100 hover:bg-transparent">
                      <TableHead className="font-semibold text-gray-800 py-4">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Agent
                        </div>
                      </TableHead>
                      <TableHead className="font-semibold text-gray-800">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Email
                        </div>
                      </TableHead>
                      <TableHead className="font-semibold text-gray-800">
                        <div className="flex items-center gap-2">
                          <Percent className="w-4 h-4" />
                          Commission Rate
                        </div>
                      </TableHead>
                      <TableHead className="font-semibold text-gray-800">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          Total Commission
                        </div>
                      </TableHead>
                      <TableHead className="font-semibold text-gray-800">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Date Joined
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {commissions.map((commission: Commission) => {
                      const rateCategory = getRateCategory(commission.commissionRate);
                      return (
                        <TableRow 
                          key={commission._id} 
                          className="border-b border-gray-50 hover:bg-blue-50/50 transition-all duration-200"
                        >
                          <TableCell className="py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <User className="w-4 h-4 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">
                                  {getUserName(commission)}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="py-4">
                            <p className="text-gray-700">
                              {getUserEmail(commission)}
                            </p>
                          </TableCell>
                          <TableCell className="py-4">
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold text-purple-700">
                                {formatPercentage(commission.commissionRate)}%
                              </span>
                              <Badge className={`text-xs ${rateCategory.color}`}>
                                {rateCategory.label}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell className="py-4">
                            <p className="text-lg font-bold text-green-700">
                              ${formatCurrency(commission.totalCommission)}
                            </p>
                          </TableCell>
                          <TableCell className="py-4">
                            <p className="text-gray-700">
                              {formatDate(commission.createdAt)}
                            </p>
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

        {/* Pagination */}
        {meta && commissions.length > 0 && (
          <div className="border-t bg-gray-50/50 px-6 py-4">
            <div className="flex justify-center">
              <Paginate meta={meta} onPageChange={handlePageChange} />
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}