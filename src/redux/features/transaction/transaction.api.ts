import { baseApi } from "@/redux/baseApi";




export const transactionApi = baseApi.injectEndpoints({

  // user transaction
  endpoints: (builder) => ({
    transaction: builder.query({
      query: (userInfo) => ({
        url: "/transaction/me",
        method: "GET",
        data: userInfo,
      }),
      providesTags: ["TRANSACTION"]
    }),
    send: builder.mutation({
      query: (payload) => ({
        url: "/transaction/send",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["TRANSACTION"],
    }),
    cashIn: builder.mutation({
      query: (payload) => ({
        url: "/transaction/cash-in",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["TRANSACTION"],
    }),

    myDeposits: builder.query<
      { data: any[]; meta: { page: number; limit: number; total: number; totalPages: number } },
      { page?: number; limit?: number }>({
        query: ({ page = 1, limit = 5 }) => ({
          url: `/transaction/me?page=${page}&limit=${limit}`,
          method: "GET",
        }),
        transformResponse: (response: any) => response,
      }),



    withdraw: builder.mutation({
      query: (payload) => ({
        url: "/transaction/withdraw",
        method: "POST",
        data: payload
      }),
      invalidatesTags: ["WALLET", "TRANSACTION"],
    }),

// agent transaction

 AgentTransaction: builder.query({
      query: (userInfo) => ({
        url:"/agent/transactions",
        method: "GET",
        data: userInfo,
      }),
      providesTags: ["TRANSACTION"]
    }),



  }),

})




export const {
  useTransactionQuery,
  useSendMutation,
  useCashInMutation,
  useMyDepositsQuery,
  useWithdrawMutation,
  useAgentTransactionQuery

} = transactionApi;