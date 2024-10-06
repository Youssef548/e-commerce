import { apiSlice } from "./apiSlice";
import { AUTH_URL, USERS_URL } from "../constants";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
        headers: {
          Authorization: `Bearer ${data.token}`,
        }
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useProfileMutation } =
  usersApiSlice;
