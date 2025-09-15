
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { User, Mail, Edit, Save, X,  FolderPen, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";


import type { UserProfile } from "@/Types";

import { TourWrapper } from "../TourWrapper";
import { useAgentInfoQuery, useUpdateAgentProfileMutation } from "@/redux/features/auth/auth.api";
import { ChangePassword } from "../User/ChangePassword";


const profileSchema = z.object({
  name: z
    .string()
    .min(2, "Name too short (min 2 characters)")
    .max(50, "Name cannot exceed 50 characters").optional(),
  email: z.email("Enter a valid email").optional(),
});
type ProfileFormValues = z.infer<typeof profileSchema>;

export const Profile = () => {
  const { data: user } = useAgentInfoQuery(undefined);
  const [updateProfile] = useUpdateAgentProfileMutation();
  const [isEditing, setIsEditing] = useState(false);

 

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: ""
    },
  });



 if (!user) return null;

  const handleSave = async (values: ProfileFormValues) => {
    try {
      const id = user.data._id;
      const body: Partial<UserProfile> = {};

      if (values.name !== user.data.name) body.name = values.name;
      if (values.email !== user.data.email) body.email = values.email;

      if (Object.keys(body).length === 0) {
        toast.info("No changes detected.");
        setIsEditing(false);
        return;
      }

      await updateProfile({ id, body }).unwrap();
      toast.success("Profile updated successfully.");
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Unable to update profile.");
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role.toUpperCase()) {
      case "ADMIN":
        return "destructive";
      case "AGENT":
        return "secondary";
      default:
        return "default";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-success";
      case "blocked":
        return "text-destructive";
      case "pending":
        return "text-warning";
      default:
        return "text-muted-foreground";
    }
  };

      const steps = [
    { target: '[data-tour="agentProfile"]', content: "Here is an overview of the agent profile " },

  ];


  return (
<TourWrapper steps={steps} tourId="user-profile-tour" autoStart={true}>
      <div className="max-w-4xl mx-auto space-y-6 mt-16">
      {/* Top Profile Card */}
      <Card className="bg-gradient-card shadow-glow border-border" data-tour="agentProfile">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            {/* Avatar */}
            <Avatar className="w-24 h-24 md:w-32 md:h-32 ring-4 ring-primary/20">
              <AvatarImage src="/placeholder.svg" alt={user.data.name} />
              <AvatarFallback className="text-4xl font-bold bg-gradient-primary text-shadow-gray-800">
                {user.data.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-700">
                {user.data.name.toUpperCase()}
              </h1>
              <p className="text-gray-500 mt-1">ID: {user.data._id}</p>
              <p className="text-gray-500 mt-1">Email: {user.data.email}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col space-y-2 ">
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button size="sm" onClick={form.handleSubmit(handleSave)}>
                    <Save className="w-4 h-4 mr-1" />
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      form.reset({
                        name: user.data.name,
                        email: user.data.email,
                      });
                      setIsEditing(false);
                    }}
                  >
                    <X className="w-4 h-4 mr-1" />
                    Cancel
                  </Button>
                </div>
              )}

              <div className="flex items-center space-x-2 mt-2 md:mt-0">
                <Badge
                  variant={getRoleBadgeVariant(user.data.role)}
                  className="capitalize"
                >
                  {user.data.role}
                </Badge>
                <Badge
                  variant="outline"
                  className={cn("capitalize", getStatusColor(user.data.status))}
                >
                  <div
                    className={cn("w-2 h-2 rounded-full mr-1", {
                      "bg-emerald-400": user.data.status === "active",
                      "bg-destructive": user.data.status === "blocked",
                      "bg-warning": user.data.status === "pending",
                    })}
                  />
                  {user.data.status}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

<div className="grid md:grid-cols-2 gap-6">
        {/* Personal Info */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5 text-primary" />
            <span>Edit Profile</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-4">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    {isEditing ? (
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    ) : (
                      <p className="p-3 bg-muted/50 rounded-md">
                       <FolderPen className="w-4 h-4 mr-2 text-muted-foreground" />
                      </p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    {isEditing ? (
                      <FormControl>
                        <Input {...field} type="email" />
                      </FormControl>
                    ) : (
                      <div className="flex items-center p-3 bg-muted/50 rounded-md">
                        <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                       
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
      </Card>
 <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-primary" />
              <span>Security & Preferences</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
      
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
              <div>
                <p className="font-medium">Account Verification</p>
                <p className="text-sm text-muted-foreground">Identity verification status</p>
              </div>
              <Badge variant="success">Verified  {user.data.isVerified}</Badge>
            </div>

            <div className="pt-4 border-t">
               <ChangePassword userId={user.data._id} />
            </div>
          </CardContent>
        </Card>
</div>

    </div>
</TourWrapper>
  );
};
