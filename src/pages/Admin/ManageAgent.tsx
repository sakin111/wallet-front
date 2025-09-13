"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  useAllUsersQuery,
  useApproveAgentMutation,
  useSuspendAgentMutation,
} from "@/redux/features/auth/auth.api";

// --- Types ---
interface AgentData {
  _id: string;
  name: string;
  email?: string;
  role: string;
  status: "ACTIVE" | "SUSPENDED" | string;
}

export default function ManageAgents() {
  const {
    data: users,
    isLoading,
    isError,
    refetch,
  } = useAllUsersQuery(undefined);

  const [approveAgent] = useApproveAgentMutation();
  const [suspendAgent] = useSuspendAgentMutation();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Error state
  if (isError || !users) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        Failed to load agents.
      </div>
    );
  }

  const usersData: AgentData[] = users?.data || [];
  const agents = usersData.filter((u) => u.role === "AGENT");

  const handleApprove = async (id: string) => {
    setLoadingId(id);
    try {
      await approveAgent(id).unwrap();
      refetch(); 
    } finally {
      setLoadingId(null);
    }
  };

  const handleSuspend = async (id: string) => {
    setLoadingId(id);
    try {
      await suspendAgent(id).unwrap();
      refetch();
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Manage Agents</h2>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agents.map((agent) => (
              <TableRow key={agent._id}>
                <TableCell className="whitespace-nowrap">
                  {agent.name}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {agent.email}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {agent.status}
                </TableCell>
               <TableCell className="space-x-2">
  {(agent.status === "SUSPENDED" || agent.status === "ACTIVE") && (
    <Button
      size="sm"
      variant="outline"
      disabled={loadingId === agent._id}
      onClick={() => handleApprove(agent._id)}
    >
      {loadingId === agent._id ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        "Approve"
      )}
    </Button>
  )}
  
  {agent.status === "APPROVED" && (
    <Button
      size="sm"
      variant="destructive"
      disabled={loadingId === agent._id}
      onClick={() => handleSuspend(agent._id)}
    >
      {loadingId === agent._id ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        "Suspend"
      )}
    </Button>
  )}
</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {agents.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No agents found.</p>
      )}
    </div>
  );
}
