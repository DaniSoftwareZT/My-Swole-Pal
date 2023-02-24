import { createApi, fetchBaseQuery } from "reduxjs/toolkit/query/react";

export const Api = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_API_API_HOST,
		prepareHeaders: (headers, { getState }) => {
			const selector = Api.endpoints.getToken.select();
			const { data: tokenData } = selector(getState());
			if (tokenData && tokenData.access_token) {
				headers.set("Authorization", `Bearer ${tokenData.access_token}`);
			}
			return headers;
		},
	}),
	tagTypes: ["Account"],
	endpoints: (builder) => ({
		createAccounts: builder.mutation({
			query: (data) => ({
				url: "accounts",
				body: data,
				method: "POST",
				credentials: "include",
			}),
			invalidataeTags: ["Account"],
		}),
	}),
});

export const { UseCreateAccountsMutation } = Api;
