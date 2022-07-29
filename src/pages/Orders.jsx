import axios from "axios";
import React from "react";
import Card from "../components/Card";
import AppContext from "../context";

function Orders() {
    const { onAddToFavorite, onAddToCart } = React.useContext(AppContext);
    const [orders, setOrders] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(
                    "https://62da48b69eedb699636a3b8e.mockapi.io/orders"
                );
                setOrders(data.reduce((prev, obj) => [prev, ...obj.items], []));
                setIsLoading(false);
            } catch (error) {
                alert("Error while requestion orders");
                console.error(error);
            }
        })();
        // sozdali obichnyu aninumnuyu functiyu, pomestil ego v skobki i govoryu JS vyzovi srazu zhe etu functiyu(ozin ozi shakyratyn function)
    }, []);

    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>My Orders</h1>
            </div>

            <div className="d-flex flex-wrap">
                {(isLoading ? [...Array(8)] : orders).map((item, index) => (
                    <Card
                        key={index}
                        loading={isLoading}
                        {...item}
                    />
                ))}
            </div>
        </div>
    );
}

export default Orders;
