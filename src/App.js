import { useReducer, useRef } from "react";

import Header from "./components/Header";
import Meals from "./components/Meals";

import { CartContextProvider } from "./store/CartContext";

import Modal from "./components/UI/Modal";

const initialState = {
	items: [],
};

const reducer = (state, action) => {
	switch (action.type) {
		case "ADD_ITEM":
			const existingItemIndex = state.items.findIndex(
				(cartItem) => cartItem.id === action.item.id
			);

			if (existingItemIndex !== -1) {
				const updatedItems = [...state.items];
				updatedItems[existingItemIndex] = {
					...updatedItems[existingItemIndex],
					quantity: updatedItems[existingItemIndex].quantity + 1,
				};

				return { ...state, items: updatedItems };
			} else {
				const newItem = { ...action.item, quantity: 1 };

				return {
					...state,
					items: [...state.items, newItem],
				};
			}
		case "REMOVE_ITEM":
			const updatedItemsAfterRemoval = state.items
				.map((item) =>
					item.id === action.id
						? { ...item, quantity: item.quantity - action.amount }
						: item
				)
				.filter((item) => item.quantity > 0);
			return { ...state, items: updatedItemsAfterRemoval };
		case "CLEAR_ITEMS":
			return { ...state, items: [] };
		default:
			return state;
	}
};

const App = () => {
	const [cartState, dispatchCartAction] = useReducer(reducer, initialState);

	const addItemToCartHandler = (item) => {
		dispatchCartAction({ type: "ADD_ITEM", item });
		console.log(cartState.items);
	};
	const removeItemFromCartHandler = (id, amount = 1) => {
		dispatchCartAction({ type: "REMOVE_ITEM", id, amount });
	};

	const clearCartHandler = () => {
		dispatchCartAction({ type: "CLEAR_ITEMS" });
	};

	const cartContextValue = {
		items: cartState.items,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
		clearItems: clearCartHandler,
	};

	const modalRef = useRef();

	const closeModal = () => {
		if (modalRef.current) {
			modalRef.current.close();
		}
	};

	const checkoutHandler = () => {
		dispatchCartAction({ type: "CLEAR_ITEMS" });
		alert("Checkout successful!");
		closeModal();
	};

	const openModal = () => {
		if (modalRef.current) {
			modalRef.current.showModal();
		}
	};

	return (
		<CartContextProvider value={cartContextValue}>
			<Modal
				ref={modalRef}
				onCloseModal={closeModal}
				onCheckout={checkoutHandler}
			></Modal>

			<Header onModalOpen={openModal} />
			<main>
				<Meals addItemToCart={addItemToCartHandler} />
			</main>
		</CartContextProvider>
	);
};

export default App;