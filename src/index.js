const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK'];

function getShoppingCart(ids, productsList) {
	const cartList = productsList.filter(product => ids.indexOf(product.id) > -1);
	const products = cartList.map(product => {
		return { 
			name: product.name,
			category: product.category
		};
	});
	const categories = [...new Set(cartList.map(product => product.category))];
	const promotion = promotions[categories.length-1];
	const totalRegularPrice = cartList.reduce((acc, current) => acc + current.regularPrice, 0);
	const totalPrice = (cartList.reduce((acc, current) => {
		let price = current.regularPrice;
		current.promotions.forEach(p => {
			if (p.looks.indexOf(promotion) > -1) {
				price = p.price;
			}
		});
		return acc + price;

	}, 0)).toFixed(2);
	const discountValue = (totalRegularPrice - totalPrice).toFixed(2);
	const discount = `${((discountValue * 100) / totalRegularPrice).toFixed(2)}%`;

	return {
		products,
		promotion,
		totalPrice,
		discountValue,
		discount,
	};
}

module.exports = { getShoppingCart };
