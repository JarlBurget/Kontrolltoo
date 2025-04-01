import logo from '../assets/logo.jpg'
import Button from '../components/UI/Button';


const Header = () => {

    const handleCartClick = () => {
        console.log("Cart clicked!");
    };

    return (
        <header id="main-header">
            <div id="title">
                <img src={logo} alt="Logo" />
                <h1>React Food Order App</h1>
            </div>
            <nav>
                <Button textOnly={true} onClick={handleCartClick}>
                    Cart (0)
                </Button>
            </nav>
        </header>
    );
};

export default Header;