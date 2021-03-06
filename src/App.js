import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';
import * as firebase from 'firebase';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			products: [],
			loading: true,
		};
		this.db = firebase.firestore();	
	}

	componentDidMount() {
		this.db
			.collection('products')
			.onSnapshot((snapshot) => {
				console.log(snapshot);

				const products = snapshot.docs.map((doc) => {
					const data = doc.data();
					data['id'] = doc.id;
					return data;
				});

				this.setState({
					products,
					loading: false,
				});
			});
	}
	handleIncreaseQuantity = (product) => {
		const { products } = this.state;
		const index = products.indexOf(product);

		const docRef = this.db.collection('products').doc(products[index].id)
		docRef
		.update({
			qty: products[index].qty +1
		})
		.then(() => {
			console.log('update Successfully')
		})
		.catch(error => {
			console.log('Error:', error)
		})
		// products[index].qty += 1;

		// this.setState({
		// 	products,
		// });
	};
	handleDecreaseQuantity = (product) => {
		console.log('Heyy please inc the qty of ', product);
		const { products } = this.state;
		const index = products.indexOf(product);

		if (products[index].qty === 0) {
			return;
		}
		// products[index].qty -= 1;

		// this.setState({
		// 	products,
		// });
		const docRef = this.db.collection('products').doc(products[index].id)
		docRef
		.update({
			qty: products[index].qty -1
		})
		.then(() => {
			console.log('update Successfully')
		})
		.catch(error => {
			console.log('Error:', error)
		})
	};
	handleDeleteProduct = (id) => {
		const { products } = this.state;

		const docRef = this.db.collection('products').doc(id)
		docRef
		.delete()
		.then(() => {
			console.log('Item Deleted Successfully')
		})
		.catch(error => {
			console.log('Error:', error)
		})

	};

	getCartCount = () => {
		const { products } = this.state;

		let count = 0;

		products.forEach((product) => {
			count += product.qty;
		});

		return count;
	};

	getCartTotal = () => {
		const { products } = this.state;
		let cartTotal = 0;
		products.map((product) => {
			cartTotal = cartTotal + product.qty * product.price;
		});

		return cartTotal;
	};
	addProduct = () => {
		this.db
		.collection('products')
		.add({
			img: '',
			price: 900,
			qty: 3499,
			title: 'Washing Machine'
		})
		.then((docRef)=> {
			console.log('Product has been added :',docRef)
		})
		.catch(error => {
			console.log('Error:', error)
		})
	}
	render() {
		const { products, loading } = this.state;
		return (
			<div className="App">
				<Navbar count={this.getCartCount()} />
				{/* <button style={{padding:10, margin:10}} onClick={this.addProduct}>Add Product</button> */}
				<Cart
					products={products}
					onIncreaseQuantity={this.handleIncreaseQuantity}
					onDecreaseQuantity={this.handleDecreaseQuantity}
					onDeleteProduct={this.handleDeleteProduct}
				/>
				{loading && <h1>Data Loading...</h1>}
				<div> Total : {this.getCartTotal}</div>
			</div>
		);
	}
}

export default App;
