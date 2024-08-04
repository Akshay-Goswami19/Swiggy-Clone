import React, { useState } from "react";
import RestaurantCards from "./RestaurantCards";
import SliderBtn from "./SliderBtn";

function RestaurantChain({ data = [], title }) {
  const [value, setValue] = useState(0);

  function handleArrowPrev() {
    value <= 0 ? "" : setValue((prev) => prev - 40.2);
  }

  function handleArrowNext() {
    value >= 560 ? "" : setValue((prev) => prev + 40.2);
  }

  return (
    <div className=" mt-14">
      <div className="flex justify-between ">
        <h1 className=" text-2xl font-bold">{title} </h1>

        <SliderBtn
          maxVal={560}
          handleArrowNext={handleArrowNext}
          handleArrowPrev={handleArrowPrev}
          value={value}
        />
      </div>

      <div
        style={{ translate: `-${value}%` }}
        className={"flex  mt-2 duration-500 gap-3"}
      >
        <RestaurantCards data={data} />
      </div>
    </div>
  );
}

export default RestaurantChain;
