import "./profile.css";
import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";
import { useState } from "react";

const Profile = ({ studentData, onTagUpdate, onTagDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // calculate and return average grade
  const getAverageGrade = (grades) => {
    let gradeSum = 0;

    // sum all grades
    for (let i = 0; i < studentData.grades.length; i++) {
      gradeSum += parseInt(studentData.grades[i]);
    }

    // divide grade sum by length of grades
    const gradeAverage = gradeSum / studentData.grades.length;
    return gradeAverage;
  };

  return (
    <div className="profile">
      <img className="profilePic" src={studentData.pic} alt="profile pic" />
      <div className="profileText">
        <div className="profileHeader">
          <h1 className="profileName">
            {studentData.firstName} {studentData.lastName}
          </h1>
          <button
            className="btnExpand"
            onClick={() => {
              // toggle expanded details
              setIsExpanded(!isExpanded);
            }}
          >
            {
              // show appropriate icon for button
              isExpanded ? <FaMinus /> : <FaPlus />
            }
          </button>
        </div>
        <div className="profileDetails">
          <p>Email: {studentData.email}</p>
          <p>Company: {studentData.company}</p>
          <p>Skill: {studentData.skill}</p>
          <p>Average: {getAverageGrade(studentData.grades)}%</p>
          {
            // show expanded details if button is clicked
            isExpanded && (
              <div className="profileExpandedDetails">
                {studentData.grades.map((grade, index) => {
                  // add 1 to index for better user readability (one-based index)
                  const testGrade = `Test ${index + 1}:       ${grade}%`;
                  return <p key={index}>{testGrade}</p>;
                })}
              </div>
            )
          }
          <div className="profileTags">
            {
              // if student data contains tags
              studentData.tags.length > 0 &&
                studentData.tags.map((tag, index) => {
                  return (
                    <p key={index} className="tag">
                      {tag}
                      <button className="btnDeleteTag">
                        <FaTimes
                          onClick={() => onTagDelete(tag, studentData.id)}
                        />
                      </button>
                    </p>
                  );
                })
            }
          </div>
          <input
            className="inputAddTag"
            type="text"
            placeholder="Add a tag"
            onKeyPress={(e) => {
              // if tag input value is not blank
              if (e.target.value.trim().length !== 0)
                onTagUpdate(e, studentData.id);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
