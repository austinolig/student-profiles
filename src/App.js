import "./app.css";
import { useState, useEffect } from "react";
import Profile from "./components/Profile";

//REWORK
//1. IN PLACE STUDENT DATA UPDATING??
//2. SEARCH VALIDATION (all queries must pass)

function App() {
  // state variable storing student profiles
  const [test, setTest] = useState([
    { name: "a", bang: "ya" },
    { name: "b", bang: "yas" },
  ]);
  const [studentData, setStudentData] = useState([]);
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
    // data.students.map((profile) => ({ ...profile, ...{ tags: [] } }));
    // update state
    setStudentData(
      data.students.map((profile) => ({ ...profile, ...{ tags: [] } }))
    ); // ADD EMPTY TAGS
    // setStudentDataFiltered(
    //   data.students.map((profile) => ({ ...profile, ...{ tags: [] } }))
    // );
  };

  const filterProfilesByName = (filter) => {
    let searchQuery = filter //e.target.value
      .toLowerCase()
      .split(" ")
      .filter((value) => value !== "");
    console.log("Queries: ", searchQuery);

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
      //console.log(searchQuery);
      return fullName.toLowerCase().includes(searchQuery[0]);
    });
    console.log(studentDataFiltered);
    console.log(studentData);
    if (searchQuery[0] === undefined) {
      setStudentDataFiltered(null);
    } else {
      setStudentDataFiltered(searchResults);
    }
  };

  const filterProfilesByTag = (filter) => {
    let searchQuery = filter //e.target.value
      .toLowerCase()
      .split(" ")
      .filter((value) => value !== "");
    console.log("Queries: ", searchQuery[0]);

    const searchResults = studentData.filter((student) => {
      return student.tags.some((tag) => {
        return tag.includes(searchQuery[0]);
      });
    });

    // student.tags.includes(searchQuery)
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
    //console.log(searchQuery);
    //});
    console.log("res", searchResults);
    //console.log(studentDataFiltered);
    //console.log(studentData);
    if (searchQuery[0] === undefined) {
      setStudentDataFiltered(null);
    } else {
      setStudentDataFiltered(searchResults);
    }
  };

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

      // const newData =
      // const newDataFiltered = filterData(studentDataFiltered);

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
          className="inputSearchName"
          type="text"
          placeholder="Search by name"
          onChange={(event) => filterProfilesByName(event.target.value)}
        />
        <input
          className="inputSearchTag"
          type="text"
          placeholder="Search by tag"
          onChange={(event) => filterProfilesByTag(event.target.value)}
        />
      </div>
      <div className="studentProfiles">
        {studentDataFiltered !== null // && studentDataFiltered !== undefined // && studentDataFiltered.length > 0
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
