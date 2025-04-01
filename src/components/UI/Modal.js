import { forwardRef } from "react";

import Button from "./Button";

import { useContext } from "react";
import CartContext from "../../store/CartContext";

const Modal = forwardRef(({ onCloseModal, onCheckout }, ref) => {
    const cartCtx = useContext(CartContext);
    const { items, addItem, removeItem, clearCart } = cartCtx;
    const totalAmount = items
        .reduce((sum, item) => sum + item.price * item.quantity, 0)
        .toFixed(2);

    const handleCheckoutAndClearCart = () => {
        onCheckout(); // Call the parent component's checkout logic
        clearCart();  // Clear the cart in the context
    };

    return (
        <dialog className='modal cart' ref={ref}>
            <h2>Your Cart</h2>

            <ul>
                {items.map((item) => (
                    <li className='cart-item' key={item.id}>
                        <h3>{item.name}</h3>
                        <div className="item-details">
                            <p className="item-quantity">Quantity: {item.quantity}</p>
                            <div className="quantity-controls">
                                <button onClick={() => removeItem(item.id)}>
                                    -
                                </button>
                                <button onClick={() => addItem(item)}>
                                    +
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div className='cart-total'>
                <h3>
                    Total Amount{" "}
                    {new Intl.NumberFormat("et-EE").format(totalAmount)} €
                </h3>
            </div>

            <div className='modal-actions' onClick={onCloseModal}>
                <Button textOnly={true} onClick={onCloseModal}>
                    Close
                </Button>

                <Button textOnly={false} onClick={handleCheckoutAndClearCart}>
                    Checkout
                </Button>
            </div>
        </dialog>
    );
});

export default Modal;