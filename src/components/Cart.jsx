import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeFromCart } from "../redux/cartSlice";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { toggleLogin } from "../redux/toggleSlice";

function Cart() {
  const cartData = useSelector((state) => state.cartSlice.cartItems);
  const resInfo = useSelector((state) => state.cartSlice.resInfo);
  const userData = useSelector((state) => state.authSlice.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let totalPrice = 0;
  for (let i = 0; i < cartData.length; i++) {
    totalPrice =
      (cartData[i]?.price || cartData[i]?.defaultPrice) / 100 + totalPrice;
  }

  function handleRemoveCart(i) {
    if (cartData.length > 1) {
      let newArr = [...cartData];
      newArr.splice(i, 1);
      dispatch(removeFromCart(newArr));
    } else {
      handleClearCart();
    }
  }

  function handleClearCart() {
    dispatch(clearCart());
  }

  function handlePlaceOrder() {
    if (!userData) {
      toast.error("Please login to order food!");
      dispatch(toggleLogin());
      return true;
    }

    toast.success("Order placed");
  }
  const vegIconUrl =
    "https://www.pikpng.com/pngl/m/210-2108039_veg-logo-png-veg-symbol-clipart.png";
  const nonvegIconUrl =
    "https://e7.pngegg.com/pngimages/344/498/png-clipart-computer-icons-computer-software-light-non-veg-food-angle-rectangle.png";

  if (cartData.length > 0) {
    return (
      <div className="w-full pt-8 ">
        <div className="w-[90%]  sm:w-[50%] mt-3 mx-auto space-y-9 ">
          <Link to={`/restaurantmenu/${resInfo?.id}`}>
            <div className="flex gap-4 mt-10">
              <img
                src={
                  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,c_fit/" +
                  resInfo?.cloudinaryImageId
                }
                alt=""
                className="w-40 h-36 rounded-2xl"
              />
              <div>
                <p className="text-3xl font-bold">{resInfo.name}</p>
                <p>{resInfo.areaName}</p>
              </div>
            </div>

            <hr className="border-4 mt-4 " />
          </Link>

          <div>
            {cartData.map((data, i) => {
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
              } = data;

              return (
                <div key={i}>
                  <div className="flex relative justify-between mt-5 mb-10 gap-2">
                    <div className="w-[65%]">
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
                              (rating >= 3
                                ? "text-green-700"
                                : "text-yellow-400")
                            }
                          ></i>
                          <p
                            className={
                              "" +
                              (rating >= 3
                                ? "text-green-800"
                                : "text-yellow-500")
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
                        <span className=" line-clamp-2 font-medium text-slate-500">
                          {description}
                        </span>
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
                      <button
                        className="absolute px-5 py-[5px] text-lg text-red-600 left-1/2 -translate-x-1/2 font-bold hover:bg-slate-200 -bottom-5 bg-white rounded-lg border border-slate-200 shadow-sm"
                        onClick={handleRemoveCart}
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                  <hr className="border" />
                </div>
              );
            })}
          </div>

          <div>
            <h1>
              {" "}
              Total :{" "}
              <span className="text-xl font-semibold">
                <span className="text-orange-500">₹</span>
                {Math.round(totalPrice)}
              </span>
            </h1>

            <div className="mx-auto w-[95%] xl:w-[40%] ">
              <button
                onClick={handlePlaceOrder}
                className=" text-green-500 px-3 py-2 mt-4 border rounded font-medium hover:bg-slate-200 "
              >
                Place Order
              </button>
              <button
                onClick={handleClearCart}
                className=" text-red-500 px-3 py-2 mt-4 mr-5 border rounded font-medium hover:bg-slate-200 "
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full text-center h-[90.7vh] flex flex-col justify-center items-center  ">
        <img
          className="w-56 h-56 mt-16"
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"
          alt=""
        />
        <h1 className="font-bold text-xl mt-8 tracking-tight">
          Your cart is empty
        </h1>
        <p className="mt-2 text-slate-500 w-80 text-sm">
          You can go to home page to view more restaurants
        </p>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="mt-6 font-bold py-3 px-4 hover:shadow bg-orange-500 text-white"
        >
          SEE RESTAURANTS NEAR YOU
        </button>
      </div>
    );
  }
}

export default Cart;
