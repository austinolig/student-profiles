import "./app.css";
import { useState, useEffect } from "react";
import Profile from "./components/Profile";

function App() {
  // state variable storing student profiles
  const [studentData, setStudentData] = useState([]);
  const [studentDataFiltered, setStudentDataFiltered] = useState(null);

  // retrieve student data
  const getStudentData = async () => {
    // fetch json data from hatchways API
    const response = await fetch(
      "https://api.hatchways.io/assessment/students",
      {
        method: "GET",
      }
    );
    const data = await response.json();

    // update state
    setStudentData(data.students);
  };

  const filterProfilesByName = (e) => {
    let searchQuery = e.target.value.split(" ").filter((value) => value !== "");
    console.log("ok", studentDataFiltered);

    const searchResults = studentData.filter((student) => {
      const fullName = student.firstName + student.lastName;
      //   let isFound = false;
      //   console.log(fullName);
      //   for (let q of searchQuery) {
      //     console.log(q);
      //     if (!fullName.toLowerCase().includes(q)) {
      //       isFound = false;
      //     } else {
      //       isFound = true;
      //     }
      //   }
      //   return isFound;
      // });
      // console.log(searchResults);
      return fullName.toLowerCase().includes(searchQuery[0]);
    });
    console.log(searchQuery[0]);
    if (searchQuery[0] === undefined) {
      setStudentDataFiltered(null);
    } else {
      setStudentDataFiltered(searchResults);
    }
  };

  // after render, get student data
  useEffect(() => {
    getStudentData();
  }, []);

  return (
    <div className="app">
      <div className="searchBoxes">
        <input
          className="inputSearchName"
          type="text"
          placeholder="Search by name"
          onChange={filterProfilesByName}
        />
      </div>
      <div className="studentProfiles">
        {studentDataFiltered !== null // && studentDataFiltered.length > 0
          ? studentDataFiltered.map((student) => {
              return <Profile key={student.id} studentData={student} />;
            })
          : studentData.map((student) => {
              return <Profile key={student.id} studentData={student} />;
            })}
      </div>
    </div>
  );
}

export default App;
