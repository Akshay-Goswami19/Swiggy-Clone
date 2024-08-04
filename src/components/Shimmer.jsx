import React from "react";

function Shimmer() {
  return (
    <div className="w-full">
      <div className="w-full h-96 bg-blue-950 flex flex-col items-center justify-center text-white">
        <div className="relative">
          <img
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/burger_wapg9y"
            alt=""
            className="w-10 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
          />
          <p className="p-8 mt-2 loader"></p>
        </div>
        <div className="">
          <p className="text-2xl">Looking for great food near you...</p>
        </div>
      </div>

      <div className="w-[80%]  md:w-[70%] mx-auto flex flex-wrap gap-6 mt-10">
        {Array(12)
          .fill()
          .map((data,i) => (
            <div
              key={i}
              className="bg-gray-200 h-36 w-52 animate rounded"
            ></div>
          ))}
      </div>
    </div>
  );
}

export default Shimmer;

export function MenuShimmer() {
  return (
    <div className="w-[93%] md:w-1/2  mx-auto">
      <div className="w-full h-48 rounded-xl animate bg-gray-200 "></div>
 
      <div className="w-full flex justify-between mt-8">
        <div className="w-[45%] h-10 animate bg-gray-200 rounded"></div>
        <div className="w-[45%] h-10 animate bg-gray-200 rounded"></div>
      </div>

      {Array(12)
        .fill()
        .map((data,i) => (
          <div key={i} className="w-full flex justify-between mt-10">
            <div className="w-[55%] flex flex-col gap-4">
              <div className="w-[100%] h-5 animate bg-gray-200 rounded"></div>
              <div className="w-[50%] h-5 animate bg-gray-200 rounded"></div>
              <div className="w-[25%] h-5 animate bg-gray-200 rounded"></div>
            </div>

            <div className="w-[30%] animate bg-gray-200 rounded-2xl h-32"></div>
          </div>
        ))}
    </div>
  );
}
