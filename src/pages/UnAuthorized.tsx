import { Link } from "react-router";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Unauthorized() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4">
      <div className="max-w-md w-full text-center space-y-6">

        <div className="flex justify-center">
          <div className="bg-red-100 text-red-600 p-4 rounded-full">
            <ShieldAlert className="h-12 w-12" />
          </div>
        </div>


        <h1 className="text-3xl font-bold tracking-tight">
          Unauthorized Access
        </h1>

        <p className="text-muted-foreground">
          You don’t have permission to view this page. Please contact the
          administrator or return to the homepage.
        </p>

 
        <div className="flex justify-center">
          <Button asChild>
            <Link to="/">Go Back Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
