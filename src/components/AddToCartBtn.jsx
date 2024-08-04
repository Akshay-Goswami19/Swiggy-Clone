import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import toast from "react-hot-toast";

function AddToCartBtn({ info, resInfo, handleIsDiffRes }) {
  const cartData = useSelector((state) => state.cartSlice.cartItems);
  const dispatch = useDispatch();

  const getResNameFromLocalStore = useSelector(
    (state) => state.cartSlice.resInfo
  );

  function handleAddtoCart() {
    const isAdded = cartData.find((data) => data.id === info.id);
    if (!isAdded) {
      if (
        getResNameFromLocalStore.name === resInfo.name ||
        getResNameFromLocalStore.length === 0
      ) {
        dispatch(addToCart({ info, resInfo }));
        toast.success("Item added to cart");
      } else {
        handleIsDiffRes();
      }
    } else {
      toast.error("This item is already added");
    }
  }

  return (
    <button
      className="absolute px-10 py-[5px] text-lg text-green-600 left-1/2 -translate-x-1/2 font-bold hover:bg-slate-200 -bottom-5 bg-white rounded-lg border border-slate-200 shadow-sm"
      onClick={handleAddtoCart}
    >
      ADD
    </button>
  );
}

export default AddToCartBtn;
