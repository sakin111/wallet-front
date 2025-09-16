import { baseApi } from "@/redux/baseApi";
import type { IData } from "@/Types";




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
      { data: IData; meta: { page: number; limit: number; total: number; totalPages: number } },
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
        url: "/agent/transactions",
        method: "GET",
        data: userInfo,
      }),
      providesTags: ["TRANSACTION"]
    }),

    agentCashOut: builder.query<
      {
        data: IData[];
        meta: { page: number; limit: number; total: number; totalPages: number };
      },
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 5 }) => ({
        url: `/transaction/cashOutHistory?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      transformResponse: (response: any) => response,
    }),


    // admin transaction
    AllTransaction: builder.query({
      query: () => ({
        url: "/admin/transactions",
        method: "GET",
      })
    }),

    allTransactionsFilter: builder.query<any, Record<string, string>>({
      query: (filters) => ({
        url: "/admin/allTransactions",
        method: "GET",
        params: filters,
      }),
      providesTags: ["USER"],
    }),

  }),

})




export const {
  useTransactionQuery,
  useSendMutation,
  useCashInMutation,
  useMyDepositsQuery,
  useWithdrawMutation,
  useAgentTransactionQuery,
  useAgentCashOutQuery,
  useAllTransactionQuery,
  useAllTransactionsFilterQuery

} = transactionApi;