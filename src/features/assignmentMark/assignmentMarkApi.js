import { apiSlice } from "../api/apiSlice";

export const assignmentMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignmentMarks: builder.query({
      query: () => ({
        url: "/assignmentMark",
      }),
      providesTags: ["AssignmentMarks"],
    }),
    getAssignmentMark: builder.query({
      query: (id) => ({
        url: `/assignmentMark/${id}`,
      }),
      providesTags: (result, error, arg) => [
        { type: "AssignmentMark", id: arg },
      ],
    }),

    getAssignmentMarkWithSid: builder.query({
      query: ({ userId, id }) => ({
        url: `/assignmentMark?student_id=${userId}&assignment_id=${id}`,
      }),
      providesTags: (result, error, arg) => [
        { type: "AssignmentMark", id: arg.userId },
      ],
    }),

    addAssignmentMark: builder.mutation({
      query: (data) => ({
        url: `/assignmentMark`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AssignmentMarks"],
    }),
    editAssignmentMark: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignmentMark/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        "AssignmentMarks",
        { type: "AssignmentMark", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetAssignmentMarkQuery,
  useGetAssignmentMarksQuery,
  useEditAssignmentMarkMutation,
  useAddAssignmentMarkMutation,
  useGetAssignmentMarkWithSidQuery,
} = assignmentMarkApi;
