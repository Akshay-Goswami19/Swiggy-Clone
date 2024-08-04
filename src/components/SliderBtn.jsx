import React from "react";

function SliderBtn({ maxVal, handleArrowPrev, handleArrowNext, value }) {
  return (
    <div className="flex gap-2 ">
      <div
        className={
          ` cursor-pointer  rounded-full w-9 h-9 flex justify-center items-center ` +
          (value <= 0 ? "bg-gray-100" : "bg-gray-300")
        }
        onClick={handleArrowPrev}
      >
        <i
          className={
            " text-2xl fi fi-rr-arrow-small-left " +
            (value <= 0 ? "text-gray-400" : "text-black")
          }
        ></i>
      </div>
      <div
        className={
          ` cursor-pointer  rounded-full w-9 h-9 flex justify-center items-center ` +
          (value >= maxVal ? "bg-gray-100" : "bg-gray-300")
        }
        onClick={handleArrowNext}
      >
        <i
          className={
            " text-2xl fi fi-rr-arrow-small-right " +
            (value >= maxVal ? "text-gray-400" : "text-black")
          }
        ></i>
      </div>
    </div>
  );
}

export default SliderBtn;
