import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const LIMIT = 5;

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/"
  }),
  endpoints: (builder) => ({
    addActivity: builder.mutation({
      query: (body) => ({
        url: "activity",
        method: "POST",
        body
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const patchResult = dispatch(
            api.util.updateQueryData(
              "getActivityList",
              _,
              (currentCache) => (currentCache = [data, ...currentCache])
            )
          );
        } catch (err) {
          console.error(err);
        }
      }
    }),
    getActivityList: builder.query({
      query: (page) => ({
        url: "activity",
        params: {
          offset: page * LIMIT,
          limit: LIMIT
        },
        method: "GET"
      }),
      // Only have one cache entry because the arg always maps to one string
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        currentCache.push(...newItems);
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      }
    }),
    getActivityByUser: builder.query({
      query: (user) => ({
        url: "activity",
        params: { user },
        method: "GET"
      }),
      // Only have one cache entry because the arg always maps to one string
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      }
    })
  })
});

export const {
  useAddActivityMutation,
  useGetActivityListQuery,
  useGetActivityByUserQuery
} = api;
