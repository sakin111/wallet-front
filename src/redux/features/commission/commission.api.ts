import { baseApi } from "@/redux/baseApi";
import type { CommissionFilter, PaginatedResponse, Commission } from "@/Types";

export const commissionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
  getMyCommission: builder.query<PaginatedResponse<Commission>, void>({
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
// system commission

systemCommission: builder.query({
  query: () =>({
    url:"system/commission-rate",
    method:"GET"
  })
})




  }),
});

export const { useGetMyCommissionQuery, useAllCommissionsQuery, useSystemCommissionQuery } = commissionApi;
