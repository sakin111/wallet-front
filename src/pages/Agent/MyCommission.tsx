import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Percent, User, TrendingUp } from "lucide-react";
import { useGetMyCommissionQuery } from "@/redux/features/commission/commission.api";
import { TourWrapper } from "../TourWrapper";

export default function MyCommission() {
  const { data, isLoading, isError } = useGetMyCommissionQuery();

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-600">Loading your commission data...</p>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <p className="text-xl font-semibold text-red-600 mb-2">Failed to load commission</p>
          <p className="text-gray-500">Please try refreshing the page</p>
        </div>
      </div>
    );

  const { user, totalCommission, effectiveRate } = data.data;

  const steps = [
    { target: '[data-tour="commission"]', content: "This is your agent commission dashboard" },
  ];

  return (
    <TourWrapper steps={steps} tourId="commission-tour" autoStart={true} delay={500}>
      <div className="min-h-screen bg-gray-50 py-4 px-4 sm:px-6 lg:px-8" data-tour="commission">
        <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8">
          
          {/* Page Header */}
          <div className="text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Commission Dashboard
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Track your earnings and performance metrics
            </p>
          </div>

          {/* Agent Profile Card */}
          <Card className="overflow-hidden shadow-xl border-0 bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 sm:p-6 lg:p-8">
              <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <User className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-white truncate">
                      {user.name}
                    </CardTitle>
                    <CardDescription className="text-blue-100 text-sm sm:text-base truncate">
                      {user.email}
                    </CardDescription>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                  <Badge
                    variant={user.status === "ACTIVE" ? "default" : "outline"}
                    className={`capitalize px-3 py-1 text-xs sm:text-sm font-medium ${
                      user.status === "ACTIVE" 
                        ? "bg-green-500 text-white hover:bg-green-600" 
                        : "bg-white/20 text-white border-white/30"
                    }`}
                  >
                    {user.status}
                  </Badge>
                  <Badge variant="outline" className="bg-white/20 text-white border-white/30 px-3 py-1 text-xs sm:text-sm">
                    {user.role}
                  </Badge>
                </div>
              </div>
            </CardHeader>

         
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                
                {/* Total Commission */}
                <div className="group">
                  <Card className="h-full border-2 border-transparent hover:border-green-200 transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
                    <CardContent className="p-4 sm:p-6 text-center">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-green-200 transition-colors">
                        <DollarSign className="w-6 h-6 sm:w-7 sm:h-7 text-green-600" />
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">Total Commission</p>
                      <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-700 mb-1">
                        ${totalCommission.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500">Lifetime earnings</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Effective Rate */}
                <div className="group">
                  <Card className="h-full border-2 border-transparent hover:border-purple-200 transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-purple-50 to-indigo-50">
                    <CardContent className="p-4 sm:p-6 text-center">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-purple-200 transition-colors">
                        <Percent className="w-6 h-6 sm:w-7 sm:h-7 text-purple-600" />
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">Effective Rate</p>
                      <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-700 mb-1">
                        {(effectiveRate * 100).toFixed(2)}%
                      </p>
                      <p className="text-xs text-gray-500">Commission rate</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Performance Indicator */}
                <div className="group sm:col-span-2 lg:col-span-1">
                  <Card className="h-full border-2 border-transparent hover:border-blue-200 transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
                    <CardContent className="p-4 sm:p-6 text-center">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-blue-200 transition-colors">
                        <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">Performance</p>
                      <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-700 mb-1">
                        {user.status === "ACTIVE" ? "Excellent" : "Good"}
                      </p>
                      <p className="text-xs text-gray-500">Current status</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

         
              <div className="mt-6 lg:mt-8 p-4 sm:p-6 bg-gray-50 rounded-xl">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Quick Stats</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <div className="text-center">
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">{user.role}</p>
                    <p className="text-xs sm:text-sm text-gray-600">Role</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
                      {user.status === "ACTIVE" ? "Active" : "Inactive"}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">Status</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
                      {totalCommission > 1000 ? "High" : totalCommission > 500 ? "Medium" : "Low"}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">Tier</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
                      {(effectiveRate * 100).toFixed(1)}%
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">Rate</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TourWrapper>
  );
}