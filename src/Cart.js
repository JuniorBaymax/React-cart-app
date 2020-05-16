import React from 'react';
import CartItem from './CartItem';
import Navbar from './Navbar';

const Cart = (props) => {
	const { products } = props;
	return (
		<div className="cart">
			{products.map((product) => {
				return (
					<CartItem
						product={product}
						key={product.id}
						onIncreaseQuantity={props.onIncreaseQuantity}
						onDecreaseQunatity={props.onDecreaseQunatity}
						onDeleteProduct={props.onDeleteProduct}
					/>
				);
			})}
		</div>
	);
};

export default Cart;
