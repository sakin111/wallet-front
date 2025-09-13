import { baseApi } from "@/redux/baseApi";
import type {UserProfile } from "@/Types";





export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["USER"],
    }),
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo,
      }),
    }),


    userInfo: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

 updateUserProfile: builder.mutation<
      { data: UserProfile }, 
      { id: string; body: Partial<UserProfile> } 
    >({
      query: ({ id, body }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        data: body
      }),
      invalidatesTags: ["USER"],
    }),



     resetPassword: builder.mutation<
      { message: string },
      { oldPassword: string; newPassword: string }
    >({
      query: ({ oldPassword, newPassword }) => ({
        url: "/auth/reset-password",
        method: "PATCH",
        data: { oldPassword, newPassword },
      }),
    }),

    // admin endpoints

allUsers: builder.query({
  query: () => ({
    url: "/admin/users",
    method: "GET",
  }),
  providesTags: ["USER"], 
}),

    approveAgent: builder.mutation({
      query: (id: string) => ({
        url: `/admin/agents/${id}/approve`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),

    suspendAgent: builder.mutation({
      query: (id: string) => ({
        url: `/admin/agents/${id}/suspend`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),


      AdminInfo: builder.query({
      query: () => ({
        url: "/admin/adminProfile",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

     updateAdminProfile: builder.mutation<
      { data: UserProfile }, 
      { id: string; body: Partial<UserProfile> } 
    >({
      query: ({ id, body }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        data: body
      }),
      invalidatesTags: ["USER"],
    }),

  }),
});



export const {
  useRegisterMutation,
  useLoginMutation,
  useUserInfoQuery,
  useLogoutMutation,
  useUpdateUserProfileMutation,
  useResetPasswordMutation,
  useAllUsersQuery,
  useApproveAgentMutation,
  useSuspendAgentMutation,
  useAdminInfoQuery,
  useUpdateAdminProfileMutation
} = authApi;