import React, { useEffect, useState } from "react";
import SearchDishes from "./SearchDishes";
import SearchRestaurant from "./SearchRestaurant";
import { useSelector } from "react-redux";

function Search() {
  const { lat, long } = useSelector((state) => state.coordinateSlice);
  const [searchQuery, setSearchQuery] = useState("");
  const [dishesData, setDishesData] = useState([]);
  const [resData, setResData] = useState([]);
  const filterOptions = ["Dishes", "Restaurant"];
  const [activeBtn, setActiveBtn] = useState("Dishes");

  function handleActiveBtn(filterName) {
    setActiveBtn(activeBtn === filterName ? activeBtn : filterName);
  }

  async function fetchDishesData() {
    let data = await fetch(
      `${import.meta.env.VITE_BASE_URL}/restaurants/search/v3?lat=${lat}&lng=${long}&str=${searchQuery}&trackingId=undefined&submitAction=ENTER&queryUniqueId=cd748ed9-7e10-cc5e-674c-a4ae0a52eefe`
    );
    let res = await data.json();

    let filterData = [];
    filterData =
      res?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards?.filter(
        (data) => data?.card?.card?.info
      );
    setDishesData(filterData);
  }

  async function fetchResData() {
    let data = await fetch(
      `${import.meta.env.VITE_BASE_URL}/restaurants/search/v3?lat=${lat}&lng=${long}&str=${searchQuery}&trackingId=undefined&submitAction=ENTER&queryUniqueId=cd748ed9-7e10-cc5e-674c-a4ae0a52eefe&selectedPLTab=RESTAURANT`
    );
    let res = await data.json();
    setResData(
      res?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards
    );
  }

  useEffect(() => {
    fetchDishesData();
    fetchResData();
  }, [searchQuery]);

  return (
    <div className="w-full pt-14 ">
      <div className="lg:w-[60%] w-[90%] mx-auto pt-4">
        <div className="w-full relative">
          <input
            type="text"
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded p-2 border focus:outline-none pl-4"
            placeholder="Search for restaurant and food"
          />
          <i className="fi fi-rr-search absolute right-3 text-lg top-1/2 -translate-y-1/2 cursor-pointer"></i>
        </div>

        <div className="my-7 flex flex-wrap gap-4">
          {filterOptions.map((filterName, i) => (
            <button
              key={i}
              onClick={() => handleActiveBtn(filterName)}
              className={
                "px-4 py-1 flex gap-1 rounded-full   border border-slate-300 shadow-md " +
                (activeBtn === filterName ? " active" : "")
              }
            >
              <p>{filterName}</p>
            </button>
          ))}
        </div>

        {activeBtn === "Dishes" ? (
          dishesData?.length > 0 ? (
            <div className="grid sm:grid-cols-2 2xl:grid-cols-3 w-full py-5 px-3   bg-slate-100 gap-3">
              {dishesData.map((data, i) => (
                <SearchDishes data={data} key={i} />
              ))}
            </div>
          ) : (
            ""
          )
        ) : resData?.length > 0 ? (
          <div className="grid sm:grid-cols-2 2xl:grid-cols-3 w-full py-5 px-3  bg-slate-100 gap-4">
            {resData.map((data, i) => (
              <SearchRestaurant data={data} key={i} />
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Search;
