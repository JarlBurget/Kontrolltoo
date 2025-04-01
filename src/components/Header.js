import logo from '../assets/logo.jpg'
import Button from './UI/Button'

import { useContext } from 'react' 
import CartContext from '../store/CartContext'

const Header = ({ onModalOpen}) => {
    const cartctx = useContext(CartContext);
    const totalItems = cartctx.items.reduce((sum, item) => sum + item.quantity, 0);
    console.log(cartctx.items)
    return (
        <div>
            <header id="main-header">
                <div id="title">
                    <img src={logo}/>
                    <h1>React Food Order App</h1>
                    
                </div>
            <nav>
            <Button 
            onClick={onModalOpen}
            textOnly={true}
            >Cart ({cartctx.items.length})
            </Button>

            </nav>
        </header>
        <ul id="meals">
        </ul>
        </div>
    )
}

export default Header