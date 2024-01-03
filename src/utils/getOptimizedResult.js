export default function getOptimizedResult(assignmentMarks, quizMarks) {
  let usersResult = [];

  // group assnignment mark with same student id
  function groupAssignmentByStudentId(arr) {
    const groupedData = {};

    arr.forEach((item) => {
      const { student_id, student_name, mark, assignment_id } = item;

      if (!groupedData[student_id]) {
        groupedData[student_id] = {
          student_id,
          student_name,
          assignment_id,
          sumOfAssignmentMark: 0,
        };
      }

      groupedData[student_id].sumOfAssignmentMark += mark;
    });
    return Object.values(groupedData);
  }
  const filteredAssignmentMarkResult =
    groupAssignmentByStudentId(assignmentMarks);

  // group quiz mark with same student id
  function groupQuizByStudentId(arr) {
    const groupedData = {};

    arr.forEach((item) => {
      const { student_id, student_name, mark } = item;

      if (!groupedData[student_id]) {
        groupedData[student_id] = {
          student_id,
          student_name,
          sumOfQuizMark: 0,
        };
      }

      groupedData[student_id].sumOfQuizMark += mark;
    });
    return Object.values(groupedData);
  }
  const filteredQuizMarkResult = groupQuizByStudentId(quizMarks);

  function mergeArrays(arrayOne, arrayTwo) {
    const newArray = [];

    // Process arrayTwo
    arrayTwo.forEach(({ student_id, sumOfQuizMark, student_name }) => {
      const assignmentData = arrayOne.find(
        (item) => item.student_id === student_id
      );

      if (assignmentData) {
        newArray.push({
          student_id,
          student_name,
          sumOfQuizMark,
          assignment_id: assignmentData.assignment_id,
          assignmentMark: assignmentData.sumOfAssignmentMark,
          total: sumOfQuizMark + assignmentData.sumOfAssignmentMark,
        });
      } else {
        newArray.push({
          student_id,
          student_name,
          sumOfQuizMark,
          total: sumOfQuizMark,
        });
      }
    });

    // Include students from arrayOne not present in arrayTwo
    arrayOne.forEach(
      ({ student_id, assignment_id, sumOfAssignmentMark, student_name }) => {
        const existingStudent = newArray.find(
          (item) => item.student_id === student_id
        );

        if (!existingStudent) {
          newArray.push({
            student_id,
            student_name,
            assignment_id,
            assignmentMark: sumOfAssignmentMark,
            total: sumOfAssignmentMark,
          });
        }
      }
    );
    // Sort newArray based on total and student_name
    newArray.sort((a, b) => {
      if (b.total !== a.total) {
        return b.total - a.total;
      }
      // If total is the same, sort by student_name
      return a.student_name.localeCompare(b.student_name);
    });

    // Add rank to each object in newArray
    let currentRank = 1;
    let currentTotal = newArray[0].total;

    newArray.forEach((item) => {
      if (item.total !== currentTotal) {
        currentRank++;
        currentTotal = item.total;
      }
      item.rank = currentRank;
    });

    return newArray;
  }

  usersResult = mergeArrays(
    filteredAssignmentMarkResult,
    filteredQuizMarkResult
  );

  return usersResult;
}
