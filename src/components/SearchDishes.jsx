import React from "react";
import AddToCartBtn from "./AddToCartBtn";
import { useDispatch, useSelector } from "react-redux";
import { toggleIsDiffRes } from "../redux/toggleSlice";
import { clearCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";

function SearchDishes({
  data: {
    card: {
      card: {
        info,
        restaurant: { info: resInfo },
      },
    },
  },
}) {
  const isDiffRes = useSelector((state) => state.toggleSlice.isDiffRes);
  const dispatch = useDispatch();

  function handleResetCart() {
    dispatch(clearCart());
    dispatch(toggleIsDiffRes());
  }
  function handleIsDiffRes() {
    dispatch(toggleIsDiffRes());
  }

  const { imageId, isVeg = 0, name, price } = info;

  const {
    name: resName,
    avgRating,
    id: resId,
    cuisines,
    sla: { slaString },
  } = resInfo;
  const vegIconUrl =
    "https://www.pikpng.com/pngl/m/210-2108039_veg-logo-png-veg-symbol-clipart.png";
  const nonvegIconUrl =
    "https://e7.pngegg.com/pngimages/344/498/png-clipart-computer-icons-computer-software-light-non-veg-food-angle-rectangle.png";
  return (
    <>
      <div className="bg-white py-4 px-3 rounded-3xl">
        <Link to={`/restaurantmenu/${resId}`}>
          <div className="flex justify-between items-center opacity-60 text-sm">
            <div>
              <p className=" font-bold">By {resName}</p>
              <p className="flex items-center">
                <i className="fi fi-ss-star mt-1 mr-1"></i>
                <span>
                  {avgRating} . {slaString}
                </span>
              </p>
            </div>
            <i className="fi fi-rr-arrow-small-right text-3xl"></i>
          </div>
        </Link>

        <hr className="my-4 border-dotted border-black/40 " />

        <div className=" flex justify-between gap-[10%] mb-5">
          <div className=" w-[45%]">
            <img
              src={isVeg ? vegIconUrl : nonvegIconUrl}
              alt=""
              className="w-5"
            />
            <div className="max-w-[99%] font-bold text-xl">{name}</div>
            <p className="font-bold">
              <span className="text-orange-500">₹</span>
              {price / 100}
            </p>
          </div>
          <div className=" w-[45%] h-36 relative">
            <img
              src={
                "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,c_fit/" +
                imageId
              }
              alt=""
              className="w-full h-full object-cover rounded-2xl"
            />
            <AddToCartBtn
              info={info}
              resInfo={resInfo}
              handleIsDiffRes={handleIsDiffRes}
            />
          </div>
        </div>
      </div>

      <>
        {isDiffRes && (
          <div
            className={
              "left-1/2 -translate-x-1/2 fixed w-[80%] md:w-[40%] sm:w-[50%] border-2  bg-white p-6 z-50 " +
              (isDiffRes ? " bottom-6 " : " -bottom-[10rem]")
            }
          >
            <p className="font-medium text-lg mb-2">Items already in cart</p>
            <p className="opacity-80 text-sm w-full">
              Your cart contains items from other restaurant. Would you like to
              reset your cart for adding items from this restaurant?
            </p>
            <div className="mt-6 w-[95%] space-x-[4%]">
              <button
                onClick={handleIsDiffRes}
                className="w-[48%] p-2 border-2 border-green-600 text-green-600 font-medium"
              >
                No
              </button>
              <button
                onClick={handleResetCart}
                className="w-[48%] p-2  border-2 border-green-600  bg-green-600 text-white font-medium"
              >
                YES, START AFRESH
              </button>
            </div>
          </div>
        )}
      </>
    </>
  );
}

export default SearchDishes;
