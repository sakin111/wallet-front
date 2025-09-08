import { baseApi } from "@/redux/baseApi";

export const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    wallet: builder.query({
      query: (userInfo) => ({
        url: "/wallet/me",
        method: "GET",
        data: userInfo,
      }),
    }),
    // send: builder.mutation({
    //   query: (payload) => ({
    //     url: "/transaction/send",
    //     method: "POST",
    //     data: payload,
    //   }),
    //   invalidatesTags: ["TRANSACTION"],
    // }),
    // register: builder.mutation({
    //   query: (userInfo) => ({
    //     url: "/user/register",
    //     method: "POST",
    //     data: userInfo,
    //   }),
    // }),


    // userInfo: builder.query({
    //   query: () => ({
    //     url: "/user/me",
    //     method: "GET",
    //   }),
    //   providesTags: ["USER"],
    // }),
  }),
});

export const {useWalletQuery} = walletApi