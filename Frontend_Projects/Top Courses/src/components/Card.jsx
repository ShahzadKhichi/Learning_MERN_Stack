import { useState } from "react";
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Card(props) {
  const course = props.course;
  const [liked, setLiked] = useState(false);
  function likeHandler() {
    setLiked(!liked);
    if (!liked) {
      toast.success("Liked ");
    } else {
      toast.warning("Unliked ");
    }
  }

  return (
    <div className=" bg-slate-700 w-[200px] h-[300px] rounded-sm">
      <div className=" relative">
        <img src={course.image.url} className="w-[200px]  -z-1 touch-none" />
        <div className="flex place-content-center absolute right-2 -bottom-[8px] w-[30px] bg-white rounded-full  h-[30px]  "></div>
        {liked ? (
          <FcLike
            onClick={likeHandler}
            className=" absolute right-[10px] -bottom-[5px] text-[25px] transition-all duration-200"
          />
        ) : (
          <FcLikePlaceholder
            onClick={likeHandler}
            className="  absolute right-[10px] -bottom-[5px] text-[25px] transition-all duration-200"
          />
        )}
      </div>
      <div className="mt-2 flex flex-col gap-2 mb-3 text-white mx-2">
        <div className="font-bold text[25px]">{course.title}</div>
        <div>
          {course.description.length <= 80
            ? course.description
            : course.description.substr(0, 80) + "...."}
        </div>
      </div>
    </div>
  );
}
export default Card;
