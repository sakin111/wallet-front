
import { useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Ban, CheckCircle } from "lucide-react";
import { useBlockUserMutation, useUnblockUserMutation } from "@/redux/features/wallet/wallet.api";
import { useAllUsersQuery } from "@/redux/features/auth/auth.api";
import type { User } from "@/Types";



export default function AllUsers() {
  const { data: usersData, isLoading, isError } = useAllUsersQuery(undefined)
  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();

  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);

  if (isLoading) return (
    <div className="flex justify-center items-center h-64">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  );

  if (isError || !usersData) return (
    <div className="flex justify-center items-center h-64 text-red-500">
      Failed to load users.
    </div>
  );

  const handleBlock = async (userId: string) => {
    setLoadingUserId(userId);
    try {
      await blockUser(userId).unwrap();
    } catch (err) {
      console.error("Block failed", err);
    } finally {
      setLoadingUserId(null);
    }
  };

  const handleUnblock = async (userId: string) => {
    setLoadingUserId(userId);
    try {
      await unblockUser(userId).unwrap();
    } catch (err) {
      console.error("Unblock failed", err);
    } finally {
      setLoadingUserId(null);
    }
  };

  const users = usersData?.data || [];


  return (
    <Card className="shadow-sm rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Manage Users</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user: User) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  {user.status === "ACTIVE" || user.status === "APPROVED"
                    ? <span className="text-green-600 font-medium">Active</span>
                    : <span className="text-red-600 font-medium">Blocked</span>}
                </TableCell>
                <TableCell className="text-right">
                  {user.status === "ACTIVE" || user.status === "APPROVED" ? (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleBlock(user._id)}
                      disabled={loadingUserId === user._id}
                    >
                      {loadingUserId === user._id
                        ? <Loader2 className="h-4 w-4 animate-spin" />
                        : <>
                            <Ban className="h-4 w-4 mr-1" />
                            Block
                          </>}
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUnblock(user._id)}
                      disabled={loadingUserId === user._id}
                    >
                      {loadingUserId === user._id
                        ? <Loader2 className="h-4 w-4 animate-spin" />
                        : <>
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Unblock
                          </>}
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
