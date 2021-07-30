import "./profile.css";

const Profile = ({ studentData }) => {
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
    <div className="profile">
      <img className="profilePic" src={studentData.pic} alt="profile pic" />
      <div>
        <div className="profileHeader">
          <h1 className="profileName">
            {studentData.firstName} {studentData.lastName}
          </h1>
          <button>+</button>
        </div>
        <div className="profileDetails">
          <p>Email: {studentData.email}</p>
          <p>Company: {studentData.company}</p>
          <p>Skill: {studentData.skill}</p>
          <p>Average: {getAverageGrade(studentData.grades)}%</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
