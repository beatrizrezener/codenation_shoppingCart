const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK'];
const percentFormatter =  new Intl.NumberFormat('en-IN', { style: 'percent', maximumFractionDigits: 2 });

function getShoppingCart(ids, productsList) {
	const cartList = getCartList(productsList, ids);
	const products = getProducts(cartList);
	const promotion = getPromotion(cartList);
	const totalRegularPrice = getTotalRegularPrice(cartList);
	const totalPrice = getTotalPrice(cartList, promotion);
	const discountValue = (totalRegularPrice - totalPrice).toFixed(2);
	const discount = percentFormatter.format((discountValue / totalRegularPrice));

	return {
		products,
		promotion,
		totalPrice,
		discountValue,
		discount,
	};
}

function getCartList(productsList, ids) {
	return productsList.filter(product => ids.indexOf(product.id) > -1);
}

function getProducts(cartList) {
	return cartList.map(product => {
		return {
			name: product.name,
			category: product.category
		};
	});
}

function getPrice(current, promotion) {
	let price = current.regularPrice;
	current.promotions.forEach(p => {
		if (p.looks.indexOf(promotion) > -1) {
			price = p.price;
		}
	});
	return price;
}
function getPromotion(cartList) {
	const categories = new Set(cartList.map(product => product.category));
	const promotion = promotions[categories.size - 1];
	return promotion;
}

function getTotalRegularPrice(cartList) {
	return cartList.reduce((acc, current) => acc + current.regularPrice, 0);
}

function getTotalPrice(cartList, promotion) {
	return (cartList.reduce((acc, current) => {
		return acc + getPrice(current, promotion);
	}, 0)).toFixed(2);
}

module.exports = { getShoppingCart };
