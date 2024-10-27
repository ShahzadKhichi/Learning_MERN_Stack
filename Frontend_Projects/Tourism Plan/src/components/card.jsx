import { useState } from "react";
function Card(props) {
  const [readMore, setRead] = useState(false);
  let disc = readMore ? props.data.info : props.data.info.substr(0, 200);
  let symbol = readMore ? "Show Less" : "ReadMore";
  function readMoreHandler() {
    setRead(!readMore);
  }
  function remove() {
    props.removeTour(props.data.id);
  }
  return (
    <div className="card flex flex-col shadow-lg border-spacing-1 w-[350px] m-2 p-2 border-2 h-fit transition-all duration-200">
      <img
        src={props.data.image}
        className="image w-[380px] h-[390px] object-cover rounded-sm"
      />
      <div className="details">
        <p className="price text-green-400 font-bold mt-1">
          RS:{" " + props.data.price}
        </p>
        <p className="city font-bold">{props.data.name}</p>
      </div>
      <div className="card-discription">
        <div className="">{disc}</div>
        <span className="read-more text-blue-700" onClick={readMoreHandler}>
          {symbol}
        </span>
      </div>
      <div className="w-[100%] flex justify-center">
        <button
          onClick={remove}
          className=" bg-red-50 text-red-400 w-fit pl-10 pr-10 pt-1 pb-1 text-center cursor-pointer hover:bg-red-500 hover:text-white rounded-md transition-all duration-300"
        >
          Not Interseted
        </button>
      </div>
    </div>
  );
}
export default Card;
