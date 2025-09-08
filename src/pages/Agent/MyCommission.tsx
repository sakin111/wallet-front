
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { DollarSign, Percent, User } from "lucide-react";
import { useGetMyCommissionQuery } from "@/redux/features/commission/commission.api";

export default function MyCommission() {
  const { data, isLoading, isError } = useGetMyCommissionQuery();

  if (isLoading)
    return <p className="text-center py-20 text-lg font-medium animate-pulse">Loading...</p>;
  if (isError)
    return (
      <p className="text-center py-20 text-red-600 font-semibold">
        Failed to load commission
      </p>
    );

  const { user, totalCommission, effectiveRate } = data.data;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-8">
      {/* Hero Agent Info */}
      <Card className="bg-gradient-to-r from-teal-200 to-blue-100 shadow-lg rounded-lg">
        <CardHeader className="flex flex-col md:flex-row md:justify-between items-start md:items-center">
          <div className="flex items-center space-x-4">
            <User className="w-10 h-10 text-blue-600" />
            <div>
              <CardTitle className="text-xl md:text-2xl font-semibold">{user.name}</CardTitle>
              <CardDescription className="text-gray-700">{user.email}</CardDescription>
            </div>
          </div>
          <Badge
            variant={user.status === "ACTIVE" ? "default" : "outline"}
            className="capitalize mt-3 md:mt-0"
          >
            {user.status}
          </Badge>
        </CardHeader>

        <CardContent className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

          <div className="flex flex-col items-center p-4 border rounded-lg shadow-sm hover:shadow-md transition w-full">
            <DollarSign className="w-6 h-6 text-green-600 mb-2" />
            <p className="text-sm font-medium">Total Commission</p>
            <p className="text-xl font-bold">{totalCommission.toFixed(3)}</p>
          </div>


          <div className="flex flex-col items-center p-4 border rounded-lg shadow-sm hover:shadow-md transition w-full">
            <Percent className="w-6 h-6 text-purple-600 mb-2" />
            <p className="text-sm font-medium">Effective Rate</p>
            <p className="text-xl font-bold">{(effectiveRate * 100).toFixed(2)}%</p>
          </div>


          <div className="flex flex-col items-center p-4 border rounded-lg shadow-sm hover:shadow-md transition w-full">
            <p className="text-sm font-medium">Role</p>
            <p className="text-xl font-bold">{user.role}</p>
          </div>
        </CardContent>
      </Card>


    </div>
  );
}
