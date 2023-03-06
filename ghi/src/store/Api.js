import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearForm } from "./accountSlice";

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
  tagTypes: ["Account", "Exercises", "Workouts"],
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: "/accounts",
        method: "post",
        body: data,
        credentials: "include",
      }),
      providesTags: ["Account"],
      invalidatesTags: (result) => {
        return (result && ["Token"]) || [];
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(clearForm());
        } catch (err) {}
      },
    }),
    logIn: builder.mutation({
      query: (info) => {
        let formData = null;
        if (info instanceof HTMLElement) {
          formData = new FormData(info);
        } else {
          formData = new FormData();
          formData.append("username", info.email);
          formData.append("password", info.password);
        }
        return {
          url: "/token",
          method: "post",
          body: formData,
          credentials: "include",
        };
      },
      providesTags: ["Account"],
      invalidatesTags: (result) => {
        return (result && ["Token"]) || [];
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
        url: "/token",
        method: "delete",
        credentials: "include",
      }),
      invalidatesTags: ["Account", "Token"],
    }),
    getToken: builder.query({
      query: () => ({
        url: "/token",
        credentials: "include",
      }),
      providesTags: ["Token"],
    }),
    getExercises: builder.query({
      query: (params) => {
        let queryString = `/api/exercises`;

        return {
          url: queryString,
          params: params,
        };
      },
      providesTags: (data) => {
        const tags = [{ type: "Exercises", id: "LIST" }];
        if (!data || !data.exercises) return tags;

        const { exercises } = data;
        if (exercises) {
          tags.concat(
            ...exercises.map(({ id }) => ({ type: "Exercises", id }))
          );
        }
        return tags;
      },
    }),
    getWorkouts: builder.query({
      query: () => {
        return {
          method: "get",
          url: "/api/workouts",
          credentials: "include",
        };
      },
      providesTags: (data) => {
        const tags = [{ type: "Workouts", id: "LIST" }];
        if (!data || !data.workouts) return tags;

        const { workouts } = data;
        if (workouts) {
          tags.push(...workouts.map(({ id }) => ({ type: "Workouts", id })));
        }
        return tags;
      },
    }),
    getWorkout: builder.query({
      query: (id) => {
        console.log(id);
        return {
          method: "get",
          url: `/api/workouts/${id}`,
          credentials: "include",
        };
      },
      providesTags: (result, error, id) => {
        return [{ type: "Workouts", id: id }];
      },
    }),
    getWorkoutExercises: builder.query({
      query: (id) => {
        console.log(id);
        return {
          method: "get",
          url: `/api/workouts/${id}/exercises`,
          credentials: "include",
        };
      },
      providesTags: (result, error, id) => {
        return [{ type: "Workouts", id: id }];
      },
    }),
    deleteExercise: builder.mutation({
      query: (params) => {
        return {
        url: `/api/workouts/${params.workout_id}/exercises/${params.exercise_id}`,
        method: "delete",
        credentials: "include",
      }},
      invalidatesTags: ["Exercises", "Workouts"],
    }),
    addExercise: builder.mutation({
      query: ({ workout_id, name, type, muscle, difficulty, equipment, instructions, ...params }) => {
        return {
          url: `/api/workouts/${params.workout_id}/exercises`,
          method: "post",
          body: params,
          credentials: "include",
        }},
      invalidatesTags: ["Exercises", "Workouts"],
    }),
  }),
});

export const {
  useDeleteExerciseMutation,
  useGetWorkoutExercisesQuery,
	useGetExercisesQuery,
	useLazyGetExercisesQuery,
	useGetTokenQuery,
	useLogInMutation,
	useLogOutMutation,
	useSignUpMutation,
	useGetWorkoutsQuery,
	useGetWorkoutQuery,
  useAddExerciseMutation,
} = apiSlice;
