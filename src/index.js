const $app = document.getElementById("app");
const API = "https://api.escuelajs.co/api/v1/products";

const getData = async () => {
	try {
		let res = await fetch(API);
		const data = await res.json();
		printCard(data);
	} catch (error) {
		console.log(error);
	}
};
