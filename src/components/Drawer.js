function Drawer({ onClose, onRemove, items = [] }) {
    console.log(items);
    return (
    <div className="overlay">  
        <div className="drawer">
            <h2 className="d-flex justify-between mb-30">Shopping Cart <img onClick={onClose} className="cu-p" src="/img/btn-remove.svg" alt="Remove"></img></h2>

        { items.length > 0 ? (  
        <div>
            <div className="items">
                { items.map((obj) => (
                <div className="cartItem d-flex align-center mb-20">
                    <div 
                    style={{ backgroundImage: `url(${obj.imageUrl})` }} 
                    className="cartItemImg"></div>
                    
                    <div className="mr-20 flex">
                        <p className="mb-5">{obj.title}</p>
                        <b>{obj.price}</b>
                    </div>
                    <img 
                    onClick={() => onRemove(obj.id)} 
                    className="removeBtn" 
                    src="/img/btn-remove.svg" 
                    alt="Remove"></img>
                </div>
            ))}               
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
            ) : (          
               <div className="cartEmpty d-flex align-center justiify-content flex-column flex">
                <img className="mb-20" width={120} height={120} src="/img/empty-cart.jpg" alt=""></img>
                <h2>Cart is empty</h2>
                <p className="opacity-6">Add at least one shoe to place an order</p>
                <button onClick={onClose} className="greenButton">
                    <img src="/img/arrow.svg" alt="Arrow"></img>
                    Come back
                </button>
            </div>
        )}





        </div>
    </div>  
    );
}

export default Drawer;