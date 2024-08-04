import Navbar from "./components/Navbar";
import Body from "./components/Body";
import { Route, Routes } from "react-router-dom";
import RestaurantMenu from "./components/RestaurantMenu";
import Cart from "./components/Cart";
import { useSelector } from "react-redux";
import Search from "./components/Search";

function App() {
  const visible = useSelector((state) => state.toggleSlice.searchBarToggle);
  const loginVisible = useSelector((state) => state.toggleSlice.loginToggle);

  return (
    <div
      className={
        "" + (visible || loginVisible ? " overflow-hidden max-h-screen" : "")
      }
    >
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/" element={<Body />}></Route>
          <Route
            path="/restaurantmenu/:id"
            element={<RestaurantMenu />}
          ></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="*" element={<h1>coming soon...</h1>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
