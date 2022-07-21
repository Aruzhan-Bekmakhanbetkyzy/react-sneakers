function Drawer() {
    return (
    <div style={{ display: 'none' }} className="overlay">  
        <div className="drawer">
            <h2 className="d-flex justify-between mb-30">Shopping Cart <img className="cu-p" src="/img/btn-remove.svg" alt="Remove"></img></h2>

            <div className="items">
                <div className="cartItem d-flex align-center mb-20">
                    <div 
                    style={{ backgroundImage: 'url(/img/sneakers/1.jpg)' }} 
                    className="cartItemImg"></div>
                        <div className="mr-20 flex">
                            <p className="mb-5">Men's Sneakers Nike Blazer Mid Suede</p>
                            <b>219.99$</b>
                        </div>
                    <img className="removeBtn" src="/img/btn-remove.svg" alt="Remove"></img>
                </div>

                <div className="cartItem d-flex align-center">
                    <div 
                    style={{ backgroundImage: 'url(/img/sneakers/1.jpg)' }} 
                    className="cartItemImg"></div>
                        <div className="mr-20 flex">
                            <p className="mb-5">Men's Sneakers Nike Blazer Mid Suede</p>
                            <b>219.99$</b>
                        </div>
                    <img className="removeBtn" src="/img/btn-remove.svg" alt="Remove"></img>
                </div>
            </div>

            <div className="cartTotalBlock">
                <ul>
                    <li>
                        <span>Total:</span>
                        <div></div>
                        <b>390.7$</b>
                    </li>
                    <li>
                        <span>Tax 5%</span>
                        <div></div>
                        <b>19.52$</b>
                    </li>
                </ul>
                <button className="greenButton">Checkout <img src="/img/arrow.svg" alt="Arrow"></img></button>
            </div>
        </div>
    </div>  
    );
}

export default Drawer;