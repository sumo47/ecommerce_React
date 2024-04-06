import React from 'react'
import CartAmountToggle from './CartAmountToggle'
import FormatPrice from '../Helpers/FormatPrice'
import { FaTrash } from 'react-icons/fa'
import { useGlobalCartProvider } from './context/cartContext'

function CartItem({ id, name, image, color, price, amount }) {

    // when i using removeItem function direct in trash icon , it is automatically invoking again and again 
    //  because of i was providing removeItem function directly in trash icon onClick function

    const { removeItem, decreaseItemInCart, increaseItemInCart } = useGlobalCartProvider()
    // const remove = (id) => () => {
    //     console.log("removing item - " + id)
    //     removeItem(id)
    // }

    // const [amount, setAmount] = useState(1)
    // const setIncrease = () => {
    //     // amount < stock ? setAmount(amount + 1) : setAmount(stock)
    // }
    // const setDecrease = () => {
    //     // amount > 1 ? setAmount(amount - 1) : setAmount(1)
    // }
    return (
        <div className='cart_heading grid grid-five-column'>
            <div className="cart-image--name">
                <div>
                    <figure>
                        <img src={image} alt={id} />
                    </figure>
                </div>
                <div>
                    <p>{name}</p>
                    <div className="color-div">
                        <p>color:</p>
                        <div className="color-style" style={{ backgroundColor: color, color: color }}></div>
                    </div>
                </div>
            </div>
            {/*Price */}
            <div className="cart-hide">
                <p>
                    <FormatPrice price={price} />
                </p>
            </div>
            <div>
                <CartAmountToggle amount={amount} setIncrease={() => increaseItemInCart(id)} setDecrease={() => decreaseItemInCart(id)} />
            </div>
            {/*Subtotal */}

            <div className="cart-hide">
                <p>
                    <FormatPrice price={price * amount} />
                </p>
            </div>
            {/*remove */}
            <div>
                <p><FaTrash className='remove_icon' onClick={() => { removeItem(id) }} /></p>
            </div>

        </div>
    )
}

export default CartItem
