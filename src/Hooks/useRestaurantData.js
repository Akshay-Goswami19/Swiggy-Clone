import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function useRestaurantData() {
  const [OnYourMindData, setOnYourMindData] = useState([]);
  const [RestaurantChainData, setRestaurantData] = useState([]);
  const [ResChainTitle, setResChainTitle] = useState("");
  const [OnlineFoodTitle, setOnlineFoodTitle] = useState("");
  const [errorPageData, setErrorPageData] = useState("");
  const { lat, long } = useSelector((state) => state.coordinateSlice);

  async function fetchData() {
    let response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/restaurants/list/v5?lat=${lat}&lng=${long}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
    );
    
    let result = await response.json();
    let OnlineFoodResTitle = result?.data?.cards?.find((data) =>
      data?.card?.card?.title?.includes("Restaurants with online food delivery")
    )?.card?.card?.title;

    setOnlineFoodTitle(OnlineFoodResTitle);
    setResChainTitle(
      result?.data?.cards?.find((data) =>
        data?.card?.card?.header?.title?.includes("Top restaurant chains")
      )?.card?.card?.header?.title || OnlineFoodResTitle
    );
    setErrorPageData(result?.data);
    let resData = result?.data?.cards?.find(
      (data) => data?.card?.card?.id == "top_brands_for_you"
    )?.card?.card?.gridElements?.infoWithStyle?.restaurants;

    let resDataMobScreen = result?.data?.cards?.find(
      (data) => data?.card?.card?.id == "restaurant_grid_listing"
    )?.card?.card?.gridElements?.infoWithStyle?.restaurants;

    setRestaurantData(resData || resDataMobScreen);
    let onYourMindData = result?.data?.cards?.find(
      (data) => data?.card?.card?.id == "whats_on_your_mind"
    )?.card?.card?.imageGridCards?.info;
    setOnYourMindData(onYourMindData);
  }

  useEffect(() => {
    fetchData();
  }, [lat, long]);

  return [
    OnYourMindData,
    RestaurantChainData,
    ResChainTitle,
    OnlineFoodTitle,
    errorPageData,
  ];
}

export default useRestaurantData;
