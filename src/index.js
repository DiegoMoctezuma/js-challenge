document.addEventListener("DOMContentLoaded", () => {
	loadData();
});

const $app = document.getElementById("app");
const API = "https://api.escuelajs.co/api/v1/products";
let minId = 5;
let maxId = 15;
let $observe;

const getData = async () => {
	try {
		let res = await fetch(API);
		const data = await res.json();
		printCard(data);
	} catch (error) {
		console.log(error);
	}
};

const printCard = (data) => {
	const filter = data.filter((item) => item.id >= minId && item.id < maxId);
	const cards = document.querySelector("#items");
	const templateCard = document.querySelector("#templateCard");
	const fragment = document.createDocumentFragment();

	filter.forEach((item) => {
		const clone = templateCard.content.cloneNode(true);
		clone.querySelector("#cardImg").setAttribute("src", item.images[0]);
		clone.querySelector("#cardName").textContent = item.title;
		clone.querySelector("#cardPrice span").textContent = item.price;
		clone.querySelector("#cardId").textContent = item.id;

		fragment.appendChild(clone);
	});

	cards.appendChild(fragment);

	if (maxId < 200) {
		if ($observe) {
			intersectionObserver.unobserve($observe);
		}

		const cardsEnPantalla = document.querySelectorAll(".Items .Card");
		$observe = cardsEnPantalla[cardsEnPantalla.length - 1];
		intersectionObserver.observe($observe);
	}
};

const loadData = () => {
	getData();
};

const intersectionObserver = new IntersectionObserver(
	(entries) => {
		entries.forEach((ent) => {
			if (ent.isIntersecting) {
				maxId += 10;
				minId += 10;
				getData();
			}
		});
	},
	{
		rootMargin: "0px 0px 100% 0px",
		threshold: 1.0,
	}
);
