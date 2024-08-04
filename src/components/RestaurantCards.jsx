import React from "react";
import { Link } from "react-router-dom";

function RestaurantCards({ data = [] }) {
  return (
    <>
      {data.map(({ info, cta: { link } }, i) => (
        <Link key={i} to={`/restaurantmenu/${link.split("/").at(-1)}`}>
          <div className=" min-w-64  hover:scale-95 duration-200 cursor-pointer">
            <div className="relative h-44">
              <img
                src={`https://media-assets.swiggy.com/swiggy/image/upload/v1674029853/${info.cloudinaryImageId}`}
                alt="Oops Image not found!"
                className=" w-full h-full  object-cover rounded-2xl "
              />
              <div className=" bg-gradient-to-t from-black from-0% to-transparent to-35% w-full h-full top-0  absolute  rounded-xl text-white"></div>
              <div className=" absolute bottom-0 ml-3 mb-1 text-lg font-bold text-white">
                {info?.aggregatedDiscountInfoV3
                  ? info?.aggregatedDiscountInfoV3?.header +
                    " " +
                    info?.aggregatedDiscountInfoV3?.subHeader
                  : ""}
              </div>
            </div>

            <div className=" mt-2 ml-2">
              <h3 className=" text-lg font-bold line-clamp-1 opacity-85">
                {info?.name}
              </h3>
              <p className=" font-bold opacity-85 flex items-center gap-1">
                <i className=" mt-1 text-green-600 fi fi-sr-circle-star"></i>
                <span>{info?.avgRatingString}</span>{" "}
                <span>{info?.sla?.slaString}</span>
              </p>
              <p className=" text-gray-800 font-normal line-clamp-1">
                {info?.cuisines.join(", ")}
              </p>
              <p className=" text-gray-800 font-normal">{info?.areaName}</p>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}

export default RestaurantCards;
