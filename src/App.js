import "./app.css";
import { useState, useEffect } from "react";
import Profile from "./components/Profile";

function App() {
  const [nameSearchInput, setNameSearchInput] = useState("");
  const [tagSearchInput, setTagSearchInput] = useState("");
  const [studentData, setStudentData] = useState([]);
  const [studentDataFiltered, setStudentDataFiltered] = useState([]);

  // on initial render, get student data
  useEffect(() => {
    // perform GET request for student data
    // from hatchways API. Parse json response
    // and set studentData state
    const getStudentData = async () => {
      const response = await fetch(
        "https://api.hatchways.io/assessment/students",
        {
          method: "GET",
        }
      );
      const data = await response.json();

      // map student data with tags property
      setStudentData(
        data.students.map((profile) => ({ ...profile, ...{ tags: [] } }))
      );
    };

    getStudentData();
  }, []);

  // filter student data by name and tag
  // when nameSearchInput, tagSearchInput,
  // or studentData state is updated
  useEffect(() => {
    // return search queries for a given
    // search input by name or tag
    const getSearchQueries = (searchInput) => {
      return searchInput
        .trim()
        .toLowerCase()
        .split(" ")
        .filter((value) => value !== "");
    };

    // filter for given student data, by name
    const filterByName = (student) => {
      const nameSearchQueries = getSearchQueries(nameSearchInput);
      return nameSearchQueries.every((query) => {
        const fullName = student.firstName + student.lastName;
        return fullName.toLowerCase().includes(query);
      });
    };

    // filter for given student data, by tag
    const filterByTag = (student) => {
      const tagSearchQueries = getSearchQueries(tagSearchInput);
      return tagSearchQueries.every((query) => {
        return student.tags.some((tag) => tag.toLowerCase().includes(query));
      });
    };

    // apply filters on student data by name and tag
    const filteredStudentData = studentData
      .filter(filterByName)
      .filter(filterByTag);

    setStudentDataFiltered(filteredStudentData);
  }, [nameSearchInput, tagSearchInput, studentData]);

  // update studentData tags with tag input
  // value when enter key is pressed, for
  // corresponding student ID
  const updateTag = (e, studentID) => {
    if (e.key === "Enter") {
      const tagInputValue = e.target.value;
      const updatedStudentData = () => {
        return studentData.map((student) => {
          if (student.id === studentID) {
            return {
              ...student,
              ...{ tags: [...student.tags, tagInputValue] },
            };
          } else {
            return { ...student };
          }
        });
      };
      // clear tag input value
      e.target.value = "";

      setStudentData(updatedStudentData);
    }
  };

  // update studentData tags to delete on
  // button click, for corresponding student ID
  const deleteTag = (tagToDelete, studentID) => {
    const updatedStudentData = () => {
      return studentData.map((student) => {
        if (student.id === studentID) {
          return {
            ...student,
            ...{
              tags: [...student.tags.filter((tag) => tag !== tagToDelete)],
            },
          };
        } else {
          return { ...student };
        }
      });
    };

    setStudentData(updatedStudentData);
  };

  return (
    <div className="app">
      <div className="searchBoxes">
        <input
          name="searchByName"
          className="inputSearchName"
          type="text"
          placeholder="Search by name"
          value={nameSearchInput}
          autoComplete="off"
          onChange={(e) => setNameSearchInput(e.target.value)}
        />
        <input
          name="searchByTag"
          className="inputSearchTag"
          type="text"
          placeholder="Search by tag"
          value={tagSearchInput}
          autoComplete="off"
          onChange={(e) => setTagSearchInput(e.target.value)}
        />
      </div>
      <div className="studentProfiles">
        {
          // show filtered data if name search
          // input or tag search input is not blank
          nameSearchInput !== "" || tagSearchInput !== ""
            ? studentDataFiltered.map((student) => {
                return (
                  <Profile
                    key={student.id}
                    studentData={student}
                    onTagUpdate={updateTag}
                    onTagDelete={deleteTag}
                  />
                );
              })
            : studentData.map((student) => {
                return (
                  <Profile
                    key={student.id}
                    studentData={student}
                    onTagUpdate={updateTag}
                    onTagDelete={deleteTag}
                  />
                );
              })
        }
      </div>
    </div>
  );
}

export default App;
