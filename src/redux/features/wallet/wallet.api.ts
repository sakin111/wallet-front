import { baseApi } from "@/redux/baseApi";

interface Wallet {
data: {
    _id: string;
  user: string;
  balance: number;
  status: "ACTIVE" | "BLOCKED";
  createdAt: string;
  updatedAt: string;
}
}

export const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    wallet: builder.query<Wallet, void>({
      query: () => ({
        url: "/wallet/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

    blockUser: builder.mutation<Wallet, string>({
      query: (userId) => ({
        url: `/wallet/block/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),

    unblockUser: builder.mutation<Wallet, string>({
      query: (userId) => ({
        url: `/wallet/unblock/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),
  }),
});

export const { useWalletQuery, useBlockUserMutation, useUnblockUserMutation } = walletApi;
