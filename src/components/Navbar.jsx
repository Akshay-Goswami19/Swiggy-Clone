import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleLogin, toggleSearchBar } from "../redux/toggleSlice";
import SignInBtn from "./SignInBtn";
import { setLat_Long } from "../redux/coordinateSlice";

function Navbar() {
  let navItems = [
    {
      name: "Search",
      icon: "fi fi-rr-search ",
      path: "/search",
    },

    {
      name: "Sign in",
      icon: "fi fi-rr-user ",
      path: "/signin",
    },

    {
      name: "Cart",
      icon: "fi fi-rr-shopping-cart-add ",
      path: "/cart",
    },
  ];

  const cartData = useSelector((state) => state.cartSlice.cartItems);
  const [searchResultData, setSearchResultData] = useState([]);
  const [address, setAddress] = useState("");
  const visible = useSelector((state) => state.toggleSlice.searchBarToggle);
  const loginVisible = useSelector((state) => state.toggleSlice.loginToggle);
  const userData = useSelector((state) => state.authSlice.userData);
  const dispatch = useDispatch();

  function handleVisibility() {
    dispatch(toggleSearchBar());
    if (visible) {
    }
  }

  function handleLogin() {
    dispatch(toggleLogin());
  }

  async function handleSearchInput(val) {
    if (val == "") return;
    let res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/misc/place-autocomplete?input=${val}`
    );
    let data = await res.json();
    setSearchResultData(data.data);
  }

  async function fetchLatAndLong(place_id) {
    if (place_id == "") return;
    handleVisibility();

    let res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/misc/address-recommend?place_id=${place_id}`
    );
    let data = await res.json();
    let lat = data.data[0].geometry.location.lat;
    let long = data.data[0].geometry.location.lng;

    dispatch(setLat_Long({ lat, long }));

    setAddress(data.data[0].formatted_address);
  }

  return (
    <>
      <div className="w-full ">
        <div
          className={
            " w-full h-full absolute z-40 bg-black/50 " +
            (visible ? " visible" : " invisible")
          }
          onClick={handleVisibility}
        ></div>

        <div
          className={
            "md:w-[40%] w-full flex flex-col items-end bg-white h-full z-50 absolute duration-500" +
            (visible ? " left-0" : " -left-[50rem]")
          }
        >
          <div className=" flex flex-col w-[60%] gap-3 mr-16 mt-6">
            <i
              className="fi fi-sr-cross-small text-3xl w-7 cursor-pointer"
              onClick={handleVisibility}
            ></i>

            <input
              type="text"
              placeholder="Search for area, street name.."
              className="p-3 ml-2 border-2 focus:outline-none focus:shadow-lg "
              onChange={(e) => handleSearchInput(e.target.value)}
            />

            <div className=" ml-6 mt-3 ">
              {searchResultData &&
                searchResultData.map(
                  (
                    {
                      structured_formatting: { main_text, secondary_text },
                      place_id,
                    },
                    index
                  ) => {
                    const islast = index === searchResultData.length - 1;
                    return (
                      <div
                        key={index}
                        onClick={() => fetchLatAndLong(place_id)}
                        className="cursor-pointer mb-3 group flex"
                      >
                        <i className="fi fi-rr-marker mr-3 mt-1"></i>
                        <div>
                          <p className=" group-hover:text-orange-500 font-medium">
                            {main_text}
                          </p>
                          <p className="text-slate-400 text-sm w-full line-clamp-2">
                            {secondary_text}
                          </p>
                          {!islast && (
                            <p className="w-fit">
                              ----------------------------------
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  }
                )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full ">
        <div
          className={
            " w-full h-full absolute z-40 bg-black/50 " +
            (loginVisible ? " visible" : " invisible")
          }
          onClick={handleLogin}
        ></div>

        <div
          className={
            "w-full sm:w-[35%]  bg-white h-full z-50 fixed duration-700" +
            (loginVisible ? " right-0" : " -right-[50rem]")
          }
        >
          <div className="w-[80%] m-7">
            <i
              className="fi fi-sr-cross-small text-3xl w-7 cursor-pointer "
              onClick={handleLogin}
            ></i>

            <div className="mt-1 flex justify-between ml-1">
              <div className="flex flex-col justify-around ">
                <h2 className="text-3xl font-semibold">Login</h2>
                <div className="h-1 bg-black w-7 ml-1"></div>
              </div>

              <div className="w-28 h-28">
                <img
                  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
                  alt=""
                  className="w-full h-full"
                />
              </div>
            </div>

            <SignInBtn />
            <p className="ml-1 mt-1 text-slate-600 text-xs leading-[15px]">
              By clicking on Login, I accept the
              <span className="text-black ">
                {" "}
                Terms & Conditions & Privacy Policy
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className=" w-full shadow-lg flex justify-center fixed z-30 top-0 bg-white ">
          <div className="w-full md:w-[80%] h-14 flex justify-between items-center ">
            <div className="flex justify-center items-center gap-5">
              <Link to={"/"}>
                <div className=" w-16 ">
                  <img
                    src="https://1000logos.net/wp-content/uploads/2021/05/Swiggy-emblem.png"
                    alt=""
                  />
                </div>
              </Link>

              <div
                className="flex gap-3 justify-center items-center cursor-pointer  "
                onClick={handleVisibility}
              >
                <div>
                  <span className="text-sm hover:text-orange-500 hover:border-orange-500  font-bold border-b-2 border-black">
                    Other
                  </span>

                  {address && (
                    <span className="ml-2 text-xs text-slate-500">
                      {address.length > 30
                        ? address.substring(0, 30) + ".."
                        : address}
                    </span>
                  )}
                </div>
                <i className="fi text-2xl fi-rs-angle-small-down mt-[0.35rem] font-bold text-orange-500 "></i>
              </div>
            </div>

            <div>
              <div className="hidden md:flex justify-evenly items-center gap-8 font-semibold text-gray-600">
                {navItems.map((item, i) =>
                  item.name === "Sign in" ? (
                    <div onClick={handleLogin} key={i}>
                      <div className="flex items-center gap-3 hover:text-orange-500 cursor-pointer ">
                        {userData ? (
                          <img src={userData.photo} alt="" className="w-5" />
                        ) : (
                          <i className={`${item.icon} mt-1  `}></i>
                        )}

                        <p>{userData ? userData.name : item.name}</p>
                      </div>
                    </div>
                  ) : (
                    <Link to={item.path} key={i}>
                      <div className="flex items-center gap-3 hover:text-orange-500 cursor-pointer ">
                        <i className={`${item.icon} mt-1  `}></i>

                        <p>
                          {item.name}
                          {item.name === "Cart" && cartData.length > 0 && (
                            <span className="ml-2">{cartData.length}</span>
                          )}
                        </p>
                      </div>
                    </Link>
                  )
                )}
              </div>

              <div className="flex md:hidden  gap-5 font-semibold mr-3">
                {navItems.map((item, i) => (
                  <Link to={item.name === "Sign in" ? "" : item.path} key={i}>
                    <div
                      onClick={item.name === "Sign in" ? handleLogin : () => {}}
                      className="flex items-center gap-3 hover:text-orange-500 cursor-pointer "
                    >
                      <i className={`${item.icon} mt-1 `}></i>

                      {item.name === "Cart" && cartData.length > 0 && (
                        <span>{cartData.length}</span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Navbar;
