import { AiOutlineLoading3Quarters } from "react-icons/ai";
function Loading() {
  return (
    <div className="flex flex-col place-content-center h-[100px] mt-[20%]">
      <AiOutlineLoading3Quarters className=" animate-spin duration-200 font-bold text-[50px] ml-4" />
      <div className="text-[25px] text-white">Loading</div>
    </div>
  );
}
export default Loading;
