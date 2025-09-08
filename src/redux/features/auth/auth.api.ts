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


  }),
});



export const {
  useRegisterMutation,
  useLoginMutation,
  useUserInfoQuery,
  useLogoutMutation,
  useUpdateUserProfileMutation,
  useResetPasswordMutation
} = authApi;