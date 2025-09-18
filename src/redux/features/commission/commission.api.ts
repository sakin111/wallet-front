import { baseApi } from "@/redux/baseApi";
import type { CommissionFilter, PaginatedResponse, Commission } from "@/Types";

export const commissionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyCommission: builder.query<Commission[], void>({
      query: () => ({
        url: "/commissions/my-commissions",
      }),
      providesTags: ["COMMISSION"],
    }),

    allCommissions: builder.query<PaginatedResponse<Commission>, CommissionFilter>({
      query: (filters) => ({
        url: "/commissions/all-commissions",
        method: "GET",
        params: filters,
      }),
      providesTags: ["COMMISSION"],
    }),
  }),
});

export const { useGetMyCommissionQuery, useAllCommissionsQuery } = commissionApi;
