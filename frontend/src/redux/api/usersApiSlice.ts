import { apiSlice } from "./apiSlice";
import { AUTH_URL, USERS_URL } from "../constants";
const userInfo = localStorage.getItem("userInfo");
const token = userInfo ? JSON.parse(userInfo).token : null;

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
        },
      }),
    }),

    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      }),
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),

    getUserDetails: builder.query({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      }),
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),

    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`,
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetUsersQuery,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApiSlice;
