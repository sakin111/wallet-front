import { baseApi } from "@/redux/baseApi";
import type { CommissionFilter } from "@/Types";




export const commissionApi = baseApi.injectEndpoints({


  endpoints: (builder) => ({

    getMyCommission: builder.query<any, void>({
      query: () => ({
        url: "/commissions/my-commissions"
      }),
      providesTags: [],
    }),
    allCommissions: builder.query<any, CommissionFilter>({
      query: (filters) => ({
        url: "/commissions/all-commissions",
        method: "GET",
        params: filters,
      }),
      providesTags: ["COMMISSION"],
    }),



  }),

})




export const {
  useGetMyCommissionQuery,
  useAllCommissionsQuery

} = commissionApi;