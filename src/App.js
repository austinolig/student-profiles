import "./App.css";
import { useState, useEffect } from "react";
import Student from "./components/Student";

function App() {
  // state variable storing student profiles
  const [studentProfiles, setStudentProfiles] = useState([]);

  // retrieve student data
  const getStudentProfiles = async () => {
    // fetch json data from hatchways API
    const response = await fetch(
      "https://api.hatchways.io/assessment/students",
      {
        method: "GET",
      }
    );
    const data = await response.json();

    // update state
    setStudentProfiles(data.students);
  };

  // after render, get student profiles
  useEffect(() => {
    getStudentProfiles();
  }, []);

  return (
    <div className="app">
      <div className="studentProfiles">
        {studentProfiles.map((student) => {
          return <Student key={student.id} studentData={student} />;
        })}
      </div>
    </div>
  );
}

export default App;
