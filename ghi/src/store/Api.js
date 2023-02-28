import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearForm } from './accountSlice';

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_API_API_HOST,
		prepareHeaders: (headers, { getState }) => {
			const selector = apiSlice.endpoints.getToken.select();
			const { data: tokenData } = selector(getState());
			if (tokenData && tokenData.access_token) {
				headers.set("Authorization", `Bearer ${tokenData.access_token}`);
			}
			return headers;
		},
	}),
	tagTypes: ["Account", "Exercises"],
	endpoints: (builder) => ({
		signUp: builder.mutation({
			query: (data) => ({
			  url: '/accounts',
        method: 'post',
        body: data,
        credentials: 'include',
      }),
			providesTags: ['Account'],
      invalidatesTags: result => {
        return (result && ['Token']) || [];
		},
		async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(clearForm());
        } catch (err) {}
      },
    }),
    logIn: builder.mutation({
      query: info => {
        let formData = null;
        if (info instanceof HTMLElement) {
          formData = new FormData(info);
        } else {
          formData = new FormData();
          formData.append('username', info.email);
          formData.append('password', info.password);
        }
        return {
          url: '/token',
          method: 'post',
          body: formData,
          credentials: 'include',
        };
      },
      providesTags: ['Account'],
      invalidatesTags: result => {
        return (result && ['Token']) || [];
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(clearForm());
        } catch (err) {}
      },
    }),
    logOut: builder.mutation({
      query: () => ({
        url: '/token',
        method: 'delete',
        credentials: 'include',
      }),
      invalidatesTags: ['Account', 'Token'],
    }),
    getToken: builder.query({
      query: () => ({
        url: '/token',
        credentials: 'include',
      }),
      providesTags: ['Token'],
    }),
    getExercise: builder.query({
      query: () => `/api/exercises`,
      providesTags: data => {
        const tags = [{type: 'Exercises', id: 'LIST'}];
        if (!data || !data.exercises) return tags;

        const { exercises } = data;
        if (exercises) {
          tags.concat(...exercises.map(({ id }) => ({type: 'exercises', id})));
        }
        return tags;
      }
    }),
  }),
});

export const {
  useGetExerciseQuery,
  useGetTokenQuery,
  useLogInMutation,
  useLogOutMutation,
  useSignUpMutation,
} = apiSlice;
