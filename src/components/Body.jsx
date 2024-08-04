import React from "react";
import OnYourMind from "./OnYourMind";
import RestaurantChain from "./RestaurantChain";
import OnlineFoodDelivery from "./OnlineFoodDelivery";
import { useSelector } from "react-redux";
import Shimmer from "./Shimmer";
import useRestaurantData from "../Hooks/useRestaurantData";

function Body() {
  const [
    OnYourMindData,
    RestaurantChainData,
    ResChainTitle,
    OnlineFoodTitle,
    errorPageData,
  ] = useRestaurantData();
  const filterVal = useSelector((state) => state.filterSlice.filterVal);

  const filteredData = RestaurantChainData?.filter((item) => {
    if (!filterVal) {
      return true;
    }

    switch (filterVal) {
      case "Ratings 4.0+":
        return item?.info?.avgRating > 4;
      case "Offers":
        return item?.info?.aggregatedDiscountInfoV3?.header;
      case "Rs. 300-Rs. 600":
        return (
          item?.info?.costForTwo.slice(1, 4) >= "300" &&
          item?.info?.costForTwo.slice(1, 4) <= "600"
        );
      case "Less than Rs. 300":
        return item?.info?.costForTwo.slice(1, 4) < "300";
      default:
        return true;
    }
  });

  if (errorPageData) {
    if (
      errorPageData?.communication ||
      errorPageData?.cards[0]?.card?.card?.id === "swiggy_not_present"
    ) {
      return (
        <div className="w-full text-center h-[90.7vh] flex flex-col justify-center items-center  ">
          <img
            className="w-56 h-56"
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png"
            alt=""
          />
          <h1 className="font-bold text-xl mt-16 tracking-tight">
            Location Unserviceable
          </h1>
          <p className="mt-3 text-slate-500 w-80 font-medium">
            We don't have any services here till now. Try changing location.
          </p>
        </div>
      );
    }
  }

  return (
    <div className="w-full z-20">
      {RestaurantChainData?.length ? (
        <div className="w-[80%] md:w-[60%] mx-auto mt-4 overflow-hidden">
          {OnYourMindData?.length ? (
            <>
              <OnYourMind data={OnYourMindData} />
              <hr className=" mt-10 border" />
            </>
          ) : (
            ""
          )}
          <RestaurantChain data={RestaurantChainData} title={ResChainTitle} />

          <hr className=" mt-10 border" />

          <OnlineFoodDelivery
            data={filterVal ? filteredData : RestaurantChainData}
            title={OnlineFoodTitle}
          />
        </div>
      ) : (
        <Shimmer />
      )}
    </div>
  );
}

export default Body;
