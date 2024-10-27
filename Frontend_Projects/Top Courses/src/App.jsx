import Navbar from "./components/Navbar";
import Filter from "./components/Filter";
import Courses from "./components/Courses";
import Loading from "./components/Loading";
import React from "react";
import { apiUrl, filterData } from "./data";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
function App() {
  const [courses, setCourses] = useState(null);
  const [filterId, setId] = useState(1);
  const [catgory, setCatgory] = useState(filterData[0].title);
  function filterHandler(id, title) {
    setId(id);
    setCatgory(title);
  }
  useEffect(() => {
    const fetchData = async function () {
      try {
        const data = await fetch(apiUrl);
        let res = await data.json();
        res = res.data;

        setCourses(res);
      } catch (error) {
        console.log("data not found");
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    console.log(catgory);
    console.log(filterId);
  }, [catgory]);
  return (
    <div className=" flex flex-col items-center  m-0 p-0 bg-slate-600 w-[100%] h-full min-h-[100vh] overflow-x-hidden-hidden">
      <ToastContainer></ToastContainer>
      <Navbar></Navbar>
      <Filter
        data={filterData}
        filterId={filterId}
        filterHandler={filterHandler}
      ></Filter>
      <div className="flex justify-center items-center my-3 w-[80%] h-[100%]">
        {courses ? (
          <Courses courses={courses} catgory={catgory}></Courses>
        ) : (
          <Loading></Loading>
        )}
      </div>
    </div>
  );
}
export default App;
