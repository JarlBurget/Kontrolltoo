import logo from "../assets/logo.jpg";
import Button from "./UI/Button";

import { useContext } from "react";
import CartContext from "../store/CartContext";

const Header = ({ onModalOpen }) => {
	const cartCtx = useContext(CartContext);
	const totalItems = cartCtx.items.reduce(
		(total, item) => total + item.quantity,
		0
	);

	return (
		<header id='main-header'>
			<div id='title'>
				<img src={logo} alt='Logo' />
				<h1>React Food Order App</h1>
			</div>
			<nav>
				<Button onClick={onModalOpen} textOnly={true}>
					Cart ({totalItems})
				</Button>
			</nav>
		</header>
	);
};

export default Header;