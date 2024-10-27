import Card from "./Card";
function Courses(props) {
  const courses = props.courses;
  console.log(courses);

  let catgory = props.catgory;
  function getAllcourses() {
    if (catgory === "All") {
      let allCourses = [];
      Object.values(courses).forEach((arr) => {
        arr.forEach((course) => {
          allCourses.push(course);
        });
      });
      return allCourses;
    } else {
      return courses[catgory];
    }
  }

  const allCourses = getAllcourses();

  return (
    <div className="flex flex-wrap gap-4 justify-center w-[60%]">
      {allCourses.map((course) => (
        <Card key={course.id} course={course} />
      ))}{" "}
    </div>
  );
}
export default Courses;
