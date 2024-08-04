import { useDispatch, useSelector } from "react-redux";
import AddToCartBtn from "./AddToCartBtn";
import { useState } from "react";
import { toggleIsDiffRes } from "../redux/toggleSlice";
import { clearCart } from "../redux/cartSlice";

function ResMenuCardDetail({
  data: {
    card: { info },
  },
  resInfo,
  index,
  itemCardsLen,
}) {
  const {
    description = "",
    name,
    imageId,
    defaultPrice,
    price,
    itemAttribute,
    ratings: {
      aggregatedRating: { rating, ratingCountV2 },
    },
  } = info;

  const vegIconUrl =
    "https://www.pikpng.com/pngl/m/210-2108039_veg-logo-png-veg-symbol-clipart.png";
  const nonvegIconUrl =
    "https://e7.pngegg.com/pngimages/344/498/png-clipart-computer-icons-computer-software-light-non-veg-food-angle-rectangle.png";

  const dispatch = useDispatch();

  const isDiffRes = useSelector((state) => state.toggleSlice.isDiffRes);

  function handleIsDiffRes() {
    dispatch(toggleIsDiffRes());
  }

  function handleResetCart() {
    dispatch(clearCart());
    dispatch(toggleIsDiffRes());
  }

  const [ismore, setIsMore] = useState(false);
  let trimDescription = description.substring(0, 101) + "...";
  return (
    <>
      <div className="flex sm:flex-row flex-col relative justify-center items-center sm:justify-between gap-3  mt-5 mb-10">
        <div className="w-full sm:w-[65%]">
          <img
            src={
              itemAttribute?.vegClassifier
                ? itemAttribute.vegClassifier === "VEG"
                  ? vegIconUrl
                  : nonvegIconUrl
                : ""
            }
            alt=""
            className=" w-5 "
          />
          <p className="font-bold text-lg">{name}</p>

          <p className="font-bold">
            <span className="text-orange-500">₹</span>
            {(defaultPrice || price) / 100}
          </p>
          {rating ? (
            <div className="flex my-2 font-medium items-center">
              <i
                className={
                  "mt-1 fi fi-ss-star " +
                  (rating >= 3 ? "text-green-700" : "text-yellow-400")
                }
              ></i>
              <p
                className={
                  "" + (rating >= 3 ? "text-green-800" : "text-yellow-500")
                }
              >
                {rating}
              </p>
              <p className=" text-slate-500">({ratingCountV2})</p>
            </div>
          ) : (
            ""
          )}

          <div className="mt-2 ">
            <span className="leading-4 font-medium text-slate-500">
              {ismore ? description : trimDescription}
            </span>
            {description.length > 101 ? (
              <span>
                <button
                  className="text-blue-700 ml-1"
                  onClick={() => setIsMore(!ismore)}
                >
                  {ismore ? "less" : "more"}
                </button>
              </span>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className=" w-40 h-36 relative ">
          <img
            src={
              "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,c_fit/" +
              imageId
            }
            alt=""
            className="w-full h-full rounded-2xl"
          />
          <AddToCartBtn
            info={info}
            resInfo={resInfo}
            handleIsDiffRes={handleIsDiffRes}
          />
        </div>
      </div>

      {index >= itemCardsLen - 1 ? "" : <hr className="my-4 border" />}

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
  );
}

export default ResMenuCardDetail;
