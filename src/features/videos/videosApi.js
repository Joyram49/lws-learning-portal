import { apiSlice } from "../api/apiSlice";

export const videosApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => ({
        url: "/videos",
      }),
      providesTags: ["Videos"],
    }),
    addVideo: builder.mutation({
      query: (data) => ({
        url: `videos`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Videos"],
    }),
    getVideo: builder.query({
      query: (id) => ({
        url: `/videos/${id}`,
      }),
      providesTags: (result, error, arg) => [{ type: "Video", id: arg }],
    }),
    editVideo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/videos/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        "Videos",
        { type: "Video", id: arg.id },
      ],
    }),
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Videos"],
    }),
  }),
});

export const {
  useGetVideosQuery,
  useAddVideoMutation,
  useDeleteVideoMutation,
  useEditVideoMutation,
  useGetVideoQuery,
} = videosApi;
