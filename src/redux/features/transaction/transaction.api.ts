

import { baseApi } from "@/redux/baseApi";
import type { CashOutTransaction, Deposit, PaginatedResponse, RawPaginatedDepositResponse } from "@/Types";



export const transactionApi = baseApi.injectEndpoints({

  // user transaction
  endpoints: (builder) => ({
    transaction: builder.query({
      query: (userInfo) => ({
        url: "/transaction/meStats",
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

    myDeposits: builder.query<PaginatedResponse<Deposit>, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 5 }) => ({
        url: `/transaction/me?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      transformResponse: (response: RawPaginatedDepositResponse): PaginatedResponse<Deposit> => {
        return {
          data: response.data.data,
          meta: response.data.meta
        };
      }
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

agentCashOut: builder.query<PaginatedResponse<CashOutTransaction>, { page?: number; limit?: number }>({
  query: ({ page = 1, limit = 5 }) => ({
    url: `/transaction/cashOutHistory?page=${page}&limit=${limit}`,
    method: "GET"
  }),

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transformResponse: (response: any) => response.data, 
}),




   agentStats: builder.query({
      query: (userInfo) => ({
        url: "/transaction/cashOutHistoryCount",
        method: "GET",
        data: userInfo

      }),
      providesTags: ["TRANSACTION"]
    }),


    // admin transaction
    AllTransaction: builder.query({
      query: () => ({
        url: "/admin/transactions",
        method: "GET",
      })
    }),


    allTransactionFilter: builder.query({
      query: (filters) => ({
        url: '/admin/allTransactions',
        method: 'GET',
        params: filters,
      }),

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
  useAllTransactionFilterQuery,
  useAgentStatsQuery

} = transactionApi;