import data from "./data";
import Tours from "./components/tours";
import { useState } from "react";
function App() {
  let [Data, setData] = useState(data);
  function Refresh() {
    setData(data);
  }
  function removeTour(id) {
    setData(
      Data.filter((tour) => {
        console.log(tour);
        return id != tour.id;
      })
    );
  }

  if (Data.length == 0)
    return (
      <div className="container flex items-center justify-center   h-[100vh]">
        <div className="flex flex-col gap-2">
          <span className="font-bold text-[25px]">No More Tours</span>
          <button
            onClick={Refresh}
            className=" bg-slate-200 text-black font-bold rounded-md cursor-pointer hover:bg-white transition-all duration-200"
          >
            Refresh
          </button>
        </div>
      </div>
    );

  return (
    <div className="container flex flex-col items-center  transition-all duration-200">
      <h1 className="title text-center m-3 p-2 pr-12 pl-12 border-dashed border-blue-800 text-[25px] border-4 rounded-lg w-fit">
        Plan With Shahzad
      </h1>
      <Tours
        data={[...Data]}
        removeTour={removeTour}
        className="transition-all duration-900"
      ></Tours>
    </div>
  );
}
export default App;
