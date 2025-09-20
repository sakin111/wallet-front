import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Percent, User, TrendingUp, AlertCircle, RefreshCw } from "lucide-react";
import { useGetMyCommissionQuery, useSystemCommissionQuery } from "@/redux/features/commission/commission.api";
import { TourWrapper } from "../TourWrapper";
import type { JSX } from "react";
import type { Commission } from "@/Types";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";







// Helper types
type PerformanceLevel = "Excellent" | "Good" | "Fair" | "Poor";
type TierLevel = "High" | "Medium" | "Low";
type UserStatus = "ACTIVE" | "INACTIVE" | "PENDING" | "SUSPENDED";

export default function MyCommission(): JSX.Element {
  const { data, isLoading, isError, refetch } = useGetMyCommissionQuery(undefined);
  const {data : system} = useSystemCommissionQuery(undefined)

  const systemRate = system?.data?.commissionRate

  dayjs.extend(utc);
dayjs.extend(timezone);
  // Type-safe data extraction using your Commission interface
const commissionData: Commission | null =
  Array.isArray(data?.data) ? data.data[0] : data?.data ?? null;

      

  // Extract user information with fallback to direct fields
  const userName: string = commissionData?.user?.name || commissionData?.name || "Unknown User";
  const userEmail: string = commissionData?.user?.email || commissionData?.email || "No email";

  const totalCommission: number = commissionData?.totalCommission || 0;
  const commissionRate: number = systemRate || 0;

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[500px]">
            <div className="text-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-pulse mx-auto"></div>
                <RefreshCw className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin w-8 h-8 text-blue-600" />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-semibold text-gray-800">Loading Commission Data</p>
                <p className="text-sm text-gray-600">Please wait while we fetch your information...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[500px]">
            <Card className="max-w-md w-full shadow-xl border-0 bg-white">
              <CardContent className="text-center p-8">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-red-600 mb-3">
                  Failed to Load Commission Data
                </h3>
                <p className="text-gray-600 mb-6">
                  We couldn't retrieve your commission information. Please try again.
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
        </div>
      </div>
    );
  }

  // No data state
  if (!commissionData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[500px]">
            <Card className="max-w-md w-full shadow-xl border-0 bg-white">
              <CardContent className="text-center p-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <User className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  No Commission Data Available
                </h3>
                <p className="text-gray-600 mb-6">
                  You don't have any commission data yet. Start earning to see your stats here.
                </p>
                <button
                  onClick={() => refetch()}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Helper functions
  const getPerformanceLevel = (commission: number, rate: number): PerformanceLevel => {
    if (commission > 50 && rate > 0.1) return "Excellent";
    if (commission > 30 && rate > 0.05) return "Good";
    if (commission > 20) return "Fair";
    return "Poor";
  };

  const getTierLevel = (commission: number): TierLevel => {
    if (commission > 50) return "High";
    if (commission > 20) return "Medium";
    return "Low";
  };

  const getUserStatus = (commission: number): UserStatus => {
    // Since we don't have status in Commission interface, derive from data
    if (commission > 0) return "ACTIVE";
    return "INACTIVE";
  };

  const getStatusColor = (status: UserStatus): string => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-500 text-white hover:bg-green-600";
      case "INACTIVE":
        return "bg-gray-500 text-white hover:bg-gray-600";
      case "SUSPENDED":
        return "bg-red-500 text-white hover:bg-red-600";
      case "PENDING":
        return "bg-yellow-500 text-white hover:bg-yellow-600";
      default:
        return "bg-gray-500 text-white hover:bg-gray-600";
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };



const formatDate = (dateString: string): string => {

  return dayjs(dateString).tz("Asia/Dhaka").format("DD MMM, YYYY");
};



  // Component data
  const performanceLevel: PerformanceLevel = getPerformanceLevel(totalCommission, commissionRate);
  const tierLevel: TierLevel = getTierLevel(totalCommission);
  const userStatus: UserStatus = getUserStatus(totalCommission);

  const steps = [
    { 
      target: '[data-tour="commission"]', 
      content: "This is your agent commission dashboard where you can track your earnings and performance." 
    },
  ];

  return (
    <TourWrapper steps={steps} tourId="commission-tour" autoStart={true} delay={500}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-4 px-4 sm:px-6 lg:px-8" data-tour="commission">
        <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8">
          
          {/* Page Header */}
          <div className="text-center lg:text-left space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Commission Dashboard
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0">
              Track your earnings, performance metrics, and commission statistics
            </p>
          </div>

          {/* Agent Profile Card */}
          <Card className="overflow-hidden shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white p-4 sm:p-6 lg:p-8 relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16"></div>
              
              <div className="relative z-10 flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
                <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                    <User className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-white truncate">
                      {userName}
                    </CardTitle>
                    <CardDescription className="text-blue-100 text-sm sm:text-base truncate">
                      {userEmail}
                    </CardDescription>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 flex-shrink-0">
                  <Badge
                    className={`capitalize px-3 py-1 text-xs sm:text-sm font-medium ${getStatusColor(userStatus)}`}
                  >
                    {userStatus.toLowerCase()}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className="bg-white/20 text-white border-white/30 px-3 py-1 text-xs sm:text-sm font-medium"
                  >
                    Agent
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-4 sm:p-6 lg:p-8">
              {/* Main Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 lg:mb-8">
                
                {/* Total Commission */}
                <div className="group">
                  <Card className="h-full border-2 border-transparent hover:border-green-200 transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-br from-green-50 to-emerald-50">
                    <CardContent className="p-4 sm:p-6 text-center">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-green-200 transition-all duration-300 group-hover:scale-110">
                        <DollarSign className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-green-600" />
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">Total Commission</p>
                      <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-700 mb-1">
                        ${formatCurrency(totalCommission)}
                      </p>
                      <p className="text-xs text-gray-500">Lifetime earnings</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Commission Rate */}
                <div className="group">
                  <Card className="h-full border-2 border-transparent hover:border-purple-200 transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-br from-purple-50 to-indigo-50">
                    <CardContent className="p-4 sm:p-6 text-center">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-purple-200 transition-all duration-300 group-hover:scale-110">
                        <Percent className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-purple-600" />
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">Commission Rate</p>
                      <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-700 mb-1">
                        {systemRate}%
                      </p>
                      <p className="text-xs text-gray-500">Current rate</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Performance Indicator */}
                <div className="group sm:col-span-2 lg:col-span-1">
                  <Card className="h-full border-2 border-transparent hover:border-blue-200 transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-br from-blue-50 to-cyan-50">
                    <CardContent className="p-4 sm:p-6 text-center">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-blue-200 transition-all duration-300 group-hover:scale-110">
                        <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-blue-600" />
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">Performance</p>
                      <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-700 mb-1">
                        {performanceLevel}
                      </p>
                      <p className="text-xs text-gray-500">Current level</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-inner">
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-gray-600" />
                  Quick Statistics
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  <div className="text-center space-y-1">
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
                      Agent
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium">Role</p>
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 capitalize">
                      {userStatus.toLowerCase()}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium">Status</p>
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
                      {tierLevel}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium">Tier</p>
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
                      {formatDate(commissionData.createdAt)}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium">Since</p>
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