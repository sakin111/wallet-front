import { baseApi } from "@/redux/baseApi";




export const commissionApi = baseApi.injectEndpoints({

 
  endpoints: (builder) => ({
   
   getMyCommission: builder.query<any, void>({
      query: () => ({
        url: "/commissions/my-commissions"
      }),
      providesTags: [],
    }),
    getAllCommissions: builder.query<any, void>({
      query: () => ({
        url : "/commissions/all-commissions",
      }),   
      providesTags: ["COMMISSION"],
    }),


  }),

})




export const {
useGetMyCommissionQuery,
useGetAllCommissionsQuery

} = commissionApi;