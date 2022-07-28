import React from "react";
import AppContext from "../context";

const Info = ({ title, imageUrl, description }) => {
    const { setCartOpened } = React.useContext(AppContext);
    return (
        <div className="cartEmpty d-flex align-center justiify-content flex-column flex justify-center">
            <img
                className="mb-20"
                width={120}
                src={imageUrl}
                alt=""
            ></img>
            <h2>{title}</h2>
            <p className="opacity-6">{description}</p>
            <button onClick={() => setCartOpened(false)} className="greenButton">
                <img src="/img/arrow.svg" alt="Arrow"></img>
                Come back
            </button>
        </div>
    );
};

export default Info;