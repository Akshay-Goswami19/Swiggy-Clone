import React, { useState } from "react";
import SliderBtn from "./SliderBtn";

function OnYourMind({ data = [] }) {
  const [value, setValue] = useState(0);

  function handleArrowPrev() {
    value <= 0 ? "" : setValue((prev) => prev - 40);
  }

  function handleArrowNext() {
    value >= 240 ? "" : setValue((prev) => prev + 40);
  }

  return (
    <div className=" mt-14">
      <div className="flex justify-between ">
        <h1 className=" text-2xl font-bold">What's on your mind? </h1>

        <SliderBtn
          maxVal={240}
          handleArrowNext={handleArrowNext}
          handleArrowPrev={handleArrowPrev}
          value={value}
        />
      </div>

      <div
        style={{ translate: `-${value}%` }}
        className={"flex mt-2 duration-500 gap-3"}
      >
        {data.map((item, i) => (
          <img
            key={i}
            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029853/${item.imageId}`}
            alt=""
            className="min-w-32 "
          />
        ))}
      </div>
    </div>
  );
}

export default OnYourMind;
