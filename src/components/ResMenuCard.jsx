import React, { useState } from "react";
import ResMenuCardDetail from "./ResMenuCardDetail";

function ResMenuCard({ data, resInfo }) {
  let value = false;

  if (data["@type"]) {
    value = true;
  }
  const [isOpen, setIsOpen] = useState(value);

  function handleToggleDropDown() {
    setIsOpen((prev) => !prev);
  }

  if (data.itemCards) {
    const { title, itemCards } = data;
    const itemCardsLen = itemCards.length;
    return (
      <>
        <div className=" my-3">
          <div className=" flex justify-between">
            <h2 className={"font-bold text-" + (data["@type"] ? "xl" : "base")}>
              {title} ({itemCards.length})
            </h2>
            <i
              className={
                "text-xl cursor-pointer fi fi-rs-angle-small-" +
                (isOpen ? "up" : "down")
              }
              onClick={handleToggleDropDown}
            ></i>
          </div>

          {isOpen && (
            <div className="my-3">
              {itemCards.map((data, i) => (
                <ResMenuCardDetail
                  data={data}
                  resInfo={resInfo}
                  key={i}
                  index={i}
                  itemCardsLen={itemCardsLen}
                />
              ))}
            </div>
          )}
        </div>

        <hr className={"my-4 border-" + (data["@type"] ? "8" : "2")} />
      </>
    );
  } else {
    const { title, categories } = data;
    return (
      <div>
        <h2 className="font-bold text-xl">{title}</h2>
        {categories.map((data, i) => (
          <ResMenuCard data={data} resInfo={resInfo} key={i} />
        ))}
      </div>
    );
  }
}

export default ResMenuCard;
