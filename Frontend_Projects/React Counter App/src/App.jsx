import { useState } from "react";
function App() {
  const [count, setCount] = useState(0);
  function decrementHandler() {
    setCount(count - 1);
  }
  function incrementHandler() {
    setCount(count + 1);
  }
  function resetHandler() {
    setCount(0);
  }
  return (
    <div className="flex justify-center items-center w-[100vw] h-[100vh] flex-col bg-slate-700 gap-4">
      <div className=" text-blue-500 font-bold text-center">
        Increment & Decrement
      </div>
      <div className="flex bg-white p-2">
        <button
          className="pl-5 pr-5 border-r-2 border-gray-500 text-[25px]"
          onClick={decrementHandler}
        >
          -
        </button>
        <div className="pl-5 pr-5  text-[25px]">{count}</div>
        <button
          className="pl-5 pr-5 border-l-2 border-gray-500 text-[25px]"
          onClick={incrementHandler}
        >
          +
        </button>
      </div>
      <button
        className=" bg-blue-600 text-white pl-2 pr-2 pt-1 pb-1 rounded-sm"
        onClick={resetHandler}
      >
        Reset
      </button>
    </div>
  );
}
export default App;
