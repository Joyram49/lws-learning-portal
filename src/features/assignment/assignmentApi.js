import { apiSlice } from "../api/apiSlice";

export const assignmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignments: builder.query({
      query: () => ({
        url: "/assignments",
      }),
      providesTags: ["Assignments"],
    }),
    addAssignment: builder.mutation({
      query: (data) => ({
        url: "/assignments",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Assignments"],
    }),
    getAssignment: builder.query({
      query: (id) => ({
        url: `/assignments/${id}`,
      }),
      providesTags: (result, error, arg) => [{ type: "Assignment", id: arg }],
    }),
    getAssignmentWithVideoId: builder.query({
      query: (videoId) => ({
        url: `/assignments?video_id=${videoId}`,
      }),
      providesTags: (result, error, arg) => [{ type: "Assignment", id: arg }],
    }),
    editAssignment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignments/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        "Assignments",
        { type: "Assignment", id: arg.id },
        { type: "Assignment", id: arg?.data?.video_id },
      ],
    }),
    deleteAssignment: builder.mutation({
      query: (id) => ({
        url: `/assignments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Assignments"],
    }),
  }),
});

export const {
  useGetAssignmentQuery,
  useAddAssignmentMutation,
  useGetAssignmentsQuery,
  useEditAssignmentMutation,
  useDeleteAssignmentMutation,
  useGetAssignmentWithVideoIdQuery,
} = assignmentApi;
