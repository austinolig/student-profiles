const Student = ({ studentData }) => {
  // calculate average grade
  const getAverageGrade = (grades) => {
    let gradeSum = 0,
      gradeAverage = 0;

    // sum all grades
    for (let i = 0; i < studentData.grades.length; i++) {
      gradeSum += parseInt(studentData.grades[i]);
    }

    // divide grade sum by length of grades
    gradeAverage = gradeSum / studentData.grades.length;
    return gradeAverage;
  };

  return (
    <div>
      <img src={studentData.pic} alt="student pic" />
      <h1>
        {studentData.firstName} {studentData.lastName}
      </h1>
      <p>Email: {studentData.email}</p>
      <p>Company: {studentData.company}</p>
      <p>Skill: {studentData.skill}</p>
      <p>Average: {getAverageGrade(studentData.grades)}%</p>
    </div>
  );
};

export default Student;
