export default function setAssignmentMark(status, assignmentMark) {
  if (status === "pending") {
    return "Not reviewed yet";
  } else if (status === "published" && assignmentMark) {
    return assignmentMark;
  } else if (!status && !assignmentMark) {
    return "Not Submit ";
  }
}
