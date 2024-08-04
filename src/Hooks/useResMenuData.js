import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function useResMenuData(id) {
  const [resInfo, setResInfo] = useState([]);
  const [menuInfo, setMenuInfo] = useState([]);
  const [discountInfo, setDiscountInfo] = useState([]);
  const [topPicksInfo, setTopPicksInfo] = useState({});
  const { lat, long } = useSelector((state) => state.coordinateSlice);

  async function fetchMenu() {
    let data = await fetch(
      `${import.meta.env.VITE_BASE_URL}/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${long}&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`
    );
    let res = await data.json();
    let resInfo = res?.data?.cards.find((data) =>
      data?.card?.card?.["@type"].includes("food.v2.Restaurant")
    )?.card?.card?.info;

    setResInfo(resInfo);

    let discountInfo = res?.data?.cards?.find((data) =>
      data?.card?.card?.["@type"].includes("widgets.v2.GridWidget")
    )?.card?.card?.gridElements?.infoWithStyle?.offers;

    setDiscountInfo(discountInfo);

    let combinedData = res?.data?.cards?.find((data) => data?.groupedCard)
      ?.groupedCard?.cardGroupMap?.REGULAR?.cards;
    let filterMenuInfo = combinedData?.filter(
      (data) => data?.card?.card?.itemCards || data?.card?.card?.categories
    );
    let topPicks = combinedData?.filter(
      (data) => data?.card?.card?.title == "Top Picks"
    )[0]?.card?.card;

    setTopPicksInfo(topPicks);
    setMenuInfo(filterMenuInfo);
  }

  useEffect(() => {
    fetchMenu();
  }, []);

  return [resInfo, topPicksInfo, menuInfo, discountInfo];
}

export default useResMenuData;
