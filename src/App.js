import React from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import AppContext from "./context";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";
import { isEditable } from "@testing-library/user-event/dist/utils";

function App() {
    const [items, setItems] = React.useState([]);
    const [cartItems, setCartItems] = React.useState([]);
    const [favorites, setFavorites] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState("");
    const [cartOpened, setCartOpened] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        async function fetchData() {
            try {
                const [cartResponse, favoritesResponse, itemsResponse] =
                    await Promise.all([
                        axios.get(
                            "https://62da48b69eedb699636a3b8e.mockapi.io/cart"
                        ),
                        axios.get(
                            "https://62da48b69eedb699636a3b8e.mockapi.io/favorites"
                        ),
                        axios.get(
                            "https://62da48b69eedb699636a3b8e.mockapi.io/items"
                        ),
                    ]);

                setIsLoading(false);
                setCartItems(cartResponse.data);
                setFavorites(favoritesResponse.data);
                setItems(itemsResponse.data);
            } catch (error) {
                alert("Data request errors ;(");
                console.error(error);
            }
        }

        fetchData();
    }, []);

    const onAddToCart = async (obj) => {
        // console.log(obj);
        try {
            const findItem = cartItems.find(
                (item) => Number(item.parentId) === Number(obj.id)
            );
            if (findItem) {
                setCartItems((prev) =>
                    prev.filter((item) => Number((item.parentId)) !== (obj.id))
                );
                await axios.delete(
                    `https://62da48b69eedb699636a3b8e.mockapi.io/cart${findItem.id}`
                );
            } else {
                setCartItems((prev) => [...prev, obj]);
                const { data } = await axios.post(
                    "https://62da48b69eedb699636a3b8e.mockapi.io/cart",
                    obj
                );
                setCartItems((prev) => prev.map(item => {
                    if (item.parentId === data.parentId){
                        return {
                            ...item,
                            id: data.id
                        }
                    }
                    return item;
                    // Esli parentId iz masssiva raven tomu parentId kotoroi seichas prishel s backenda, esli ih parentId sovpadayut, zemeni etot item(71,72,73), to est zameni ego, ves obekt. Vozmi ego vse starye dannye, i imenno ego id zemeni ego na tot id, kotoroi prishel s backenda
                }));
            }
        } catch (error) {
            alert("Errors when adding to cart");
            console.error(error);
        }
    };

    const onRemoveItem = (id) => {
        try {
            axios.delete(
                `https://62da48b69eedb699636a3b8e.mockapi.io/cart/${id}`
            );
            setCartItems((prev) =>
                prev.filter((item) => Number(item.id) !== Number(id))
            );
        } catch (error) {
            alert("Errors when deleting from the cart");
            console.error(error);
        }
    };

    const onAddToFavorite = async (obj) => {
        try {
            if (
                favorites.find((favObj) => Number(favObj.id) === Number(obj.id))
            ) {
                axios.delete(
                    `https://62da48b69eedb699636a3b8e.mockapi.io/favorites/${obj.id}`
                );
                setFavorites((prev) =>
                    prev.filter((item) => Number(item.id) !== Number(obj.id))
                );
            } else {
                const { data } = await axios.post(
                    "https://62da48b69eedb699636a3b8e.mockapi.io/favorites",
                    obj
                );
                setFavorites((prev) => [...prev, data]);
            }
        } catch (error) {
            alert("Failed to add to favorites");
            // console.log("Failed to add to favorites");
            console.error(error);
        }
    };

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    };

    const isItemAdded = (id) => {
        return cartItems.some((obj) => Number(obj.parentId) === Number(id));
        // function dolzhyna probegatsya po massivu v cartItems(v massive korzine), i uzhe v massive korzini vytaskivat parentId, i ego iz korzini parentId sveryat ego s tem id kotoroi tebe budet peredavatsya v kartochke. A v kartochke nashem mi peredaem realnyi id tovara.
    };

    return (
        <AppContext.Provider
            value={{
                items,
                cartItems,
                favorites,
                isItemAdded,
                onAddToFavorite,
                onAddToCart,
                setCartOpened,
                setCartItems,
            }}
        >
            <div className="wrapper clear">
                <Drawer
                    items={cartItems}
                    onClose={() => setCartOpened(false)}
                    onRemove={onRemoveItem}
                    opened={cartOpened}
                />
                <Header onClickCart={() => setCartOpened(true)} />
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={
                            <Home
                                items={items}
                                cartItems={cartItems}
                                searchValue={searchValue}
                                setSearchValue={setSearchValue}
                                onChangeSearchInput={onChangeSearchInput}
                                onAddToFavorite={onAddToFavorite}
                                onAddToCart={onAddToCart}
                                isLoading={isLoading}
                            />
                        }
                    />

                    <Route
                        exact
                        path="/favorites"
                        element={<Favorites />}
                    ></Route>
                    <Route exact path="/orders" element={<Orders />}></Route>
                </Routes>
            </div>
        </AppContext.Provider>
    );
}

export default App;
