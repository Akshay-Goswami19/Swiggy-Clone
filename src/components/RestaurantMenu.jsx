import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { MenuShimmer } from "./Shimmer";
import ResMenuCard from "./ResMenuCard";
import useResMenuData from "../Hooks/useResMenuData";

function RestaurantMenu() {
  let { id } = useParams();
  let mainId = id.split("-").at(-1).slice(4);

  const [resInfo, topPicksInfo, menuInfo, discountInfo] =
    useResMenuData(mainId);

  return (
    <div className="w-full mt-20">
      {menuInfo?.length ? (
        <div className="w-[93%] md:w-1/2  mx-auto mt-8">
          <p className="text-slate-400 text-[11px] font-medium">
            <Link to={"/"}>
              <span className=" hover:text-slate-600">Home</span>
            </Link>
            <span> / {resInfo?.city}</span>
            <span className="text-slate-600"> / {resInfo?.name} </span>
          </p>

          <h1 className="font-bold text-2xl mt-6">{resInfo?.name} </h1>

          <div className=" w-full bg-gradient-to-t from-slate-300 rounded-[2rem]  p-4">
            <div className=" border border-slate-400 bg-white rounded-3xl py-4 ">
              <div className="pl-4 flex gap-1 items-center font-bold">
                <i className=" mt-1 text-green-600 fi fi-sr-circle-star"></i>
                <span>{resInfo?.avgRating}</span>
                <span>({resInfo?.totalRatingsString}) </span>
                <span> . </span>
                <span>{resInfo?.costForTwoMessage} </span>
              </div>

              <p className="pl-4 text-orange-500 font-bold underline text-sm">
                {resInfo?.cuisines?.join(", ")}
              </p>

              <div className="pl-4 flex gap-4 mt-2">
                <div className="flex flex-col w-2 justify-center items-center">
                  <div className=" w-2 h-2 rounded-full bg-slate-300"></div>
                  <div className=" w-[2px] h-6 bg-slate-300"></div>
                  <div className=" w-2 h-2 rounded-full bg-slate-300"></div>
                </div>

                <div className="text-sm ">
                  <span className="font-bold mr-2">Outlet</span>
                  <span className=" text-slate-600">{resInfo?.areaName}</span>
                  <div className="font-bold pt-2">
                    {resInfo?.sla?.slaString?.toLowerCase()}
                  </div>
                </div>
              </div>

              <hr className="mt-4" />

              <div className="pl-4 mt-2 gap-2 flex items-center">
                <i className="text-slate-600 fi fi-rr-biking-mountain mt-1"></i>
                {resInfo?.expectationNotifiers ? (
                  <span className=" text-slate-600">
                    {resInfo?.expectationNotifiers[0]?.enrichedText

                      ?.split("<b>")[1]
                      ?.split("</b>")
                      ?.join("")}
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>

          <div className="">
            <div className="mt-5">
              <h1 className=" text-xl font-bold">Deals for you </h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-2 mt-4 overflow-hidden">
              {discountInfo?.map((offers, i) => {
                return i > 1 ? "" : <Discount key={i} data={offers} />;
              })}
            </div>
          </div>

          <h2 className="text-center w-full mt-8 text-base text-slate-600 font-medium tracking-widest ">
            MENU
          </h2>

          <hr className="mt-3" />

          {topPicksInfo?.carousel && (
            <div>
              <div className="text-center lg:text-start mt-5">
                <h1 className=" text-xl font-bold">Top Picks </h1>
              </div>

              <div className="flex flex-col lg:flex-row items-center gap-3 mt-4 overflow-hidden">
                {topPicksInfo?.carousel.map(
                  (
                    {
                      creativeId,
                      dish: {
                        info: { defaultPrice, price },
                      },
                    },
                    i
                  ) => {
                    return i > 1 ? (
                      ""
                    ) : (
                      <div
                        className="lg:min-w-72 md:w-[70%] w-[65%]  h-72 relative"
                        key={i}
                      >
                        <img
                          className="w-full h-full"
                          src={
                            "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/" +
                            creativeId
                          }
                          alt=""
                        />

                        <div className="font-bold absolute bottom-4 px-6 flex w-full  items-center ">
                          <p className="text-white">
                            ₹{(defaultPrice || price) / 100}
                          </p>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
              <hr className="my-6" />
            </div>
          )}

          <div>
            {menuInfo?.map(({ card: { card } }, i) => (
              <ResMenuCard data={card} resInfo={resInfo} key={i} />
            ))}
          </div>
        </div>
      ) : (
        <MenuShimmer />
      )}
    </div>
  );
}

function Discount({
  data: {
    info: { header, couponCode, offerLogo },
  },
}) {
  return (
    <div className="flex border min-w-[50%] lg:min-w-72 items-center p-3 gap-2 rounded-2xl ">
      <img
        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_56,h_56/${offerLogo}`}
        alt=""
      />

      <div>
        <h2 className="font-bold text-base">{header}</h2>
        <p className="text-sm text-slate-400 font-medium">{couponCode}</p>
      </div>
    </div>
  );
}

export default RestaurantMenu;
