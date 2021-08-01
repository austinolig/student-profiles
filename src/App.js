import "./app.css";
import { useState, useEffect } from "react";
import Profile from "./components/Profile";

//REWORK
//1. COMMENTS

function App() {
  // search filters/queries
  const [nameSearchFilter, setNameSearchFilter] = useState("");
  const [tagSearchFilter, setTagSearchFilter] = useState("");
  // state variable storing original student profiles
  const [studentData, setStudentData] = useState([]);
  // state variable storing filtered student profiles
  const [studentDataFiltered, setStudentDataFiltered] = useState([]);

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
    // update state and add tags property
    setStudentData(
      data.students.map((profile) => ({ ...profile, ...{ tags: [] } }))
    );
  };

  // filter student data and re-render
  // on nameSearchFilter updating
  useEffect(() => {
    const searchQueryName = nameSearchFilter
      .toLowerCase()
      .split(" ")
      .filter((value) => value !== "");

    const searchQueryTag = tagSearchFilter
      .toLowerCase()
      .split(" ")
      .filter((value) => value !== "");

    const filterNames = (student) => {
      return searchQueryName.every((query) => {
        const fullName = student.firstName + student.lastName;
        return fullName.toLowerCase().includes(query);
      });
    };

    const filterTags = (student) => {
      return searchQueryTag.every((query) => {
        //const fullName = student.firstName + student.lastName;
        return student.tags.some((tag) => tag.toLowerCase().includes(query));
      });
    };

    const finalResults = studentData.filter(filterNames).filter(filterTags);
    setStudentDataFiltered(finalResults);
  }, [nameSearchFilter, tagSearchFilter, studentData]);

  const submitTag = (e, studentID) => {
    if (e.key === "Enter") {
      const inputTag = e.target.value;

      const filterData = (data) => {
        if (data !== undefined && data !== null) {
          return data.map((student) => {
            if (student.id === studentID) {
              return {
                ...student,
                ...{ tags: [...student.tags, inputTag] },
              };
            } else {
              return { ...student };
            }
          });
        }
      };

      e.target.value = "";
      setStudentData(filterData(studentData));
      setStudentDataFiltered(filterData(studentDataFiltered));
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
          name="searchByName"
          className="inputSearchName"
          type="text"
          placeholder="Search by name"
          autoComplete="off"
          onChange={(e) => setNameSearchFilter(e.target.value)}
        />
        <input
          name="searchByTag"
          className="inputSearchTag"
          type="text"
          placeholder="Search by tag"
          autoComplete="off"
          onChange={(e) => setTagSearchFilter(e.target.value)}
        />
      </div>
      <div className="studentProfiles">
        {nameSearchFilter !== "" || tagSearchFilter !== "" // !== null   //&& studentDataFiltered !== undefined // && studentDataFiltered.length > 0
          ? studentDataFiltered.map((student) => {
              return (
                <Profile
                  key={student.id}
                  studentData={student}
                  addTag={submitTag}
                />
              );
            })
          : studentData.map((student) => {
              return (
                <Profile
                  key={student.id}
                  studentData={student}
                  addTag={submitTag}
                />
              );
            })}
      </div>
    </div>
  );
}

export default App;
