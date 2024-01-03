import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          // updating local storage after successfully registration
          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: result?.data?.accessToken,
              user: result?.data?.user,
            })
          );

          // updating redux store (auth) after successfully registration
          dispatch(
            userLoggedIn({
              accessToken: result?.data?.accessToken,
              user: result?.data?.user,
            })
          );
        } catch (error) {
          // console.log(error);
        }
      },
    }),
    login: builder.mutation({
      query: ({ role, data }) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.user?.role === arg.role) {
            // updating local storage after successfully login
            localStorage.setItem(
              "auth",
              JSON.stringify({
                accessToken: result?.data?.accessToken,
                user: result?.data?.user,
              })
            );

            // updating redux store (auth) after successfully login
            dispatch(
              userLoggedIn({
                accessToken: result?.data?.accessToken,
                user: result?.data?.user,
              })
            );
          } else {
            return false;
          }
        } catch (error) {
          // console.log(error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
