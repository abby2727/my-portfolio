const navbar = document.querySelector('.navbar');
const scrollUpButton = document.querySelector('.scroll-up-btn');

window.addEventListener('scroll', function () {
	if (window.scrollY > 50) {
		navbar.classList.add('sticky');
	} else {
		navbar.classList.remove('sticky');
	}

	if (this.window.scrollY > 500) {
		scrollUpButton.classList.add('show');
	} else {
		scrollUpButton.classList.remove('show');
	}
});

const scrollUpBtns = document.querySelectorAll('.scroll-up-btn');
const menuBtns = document.querySelectorAll('.menu-btn');
const socialElements = document.querySelectorAll('.navbar .social');
const menuElements = document.querySelectorAll('.navbar .menu');
const menuIcon = document.querySelectorAll('.menu-btn i');

scrollUpBtns.forEach((scrollUpBtn) => {
	scrollUpBtn.addEventListener('click', function () {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});

		document.documentElement.style.scrollBehavior = 'auto';

		setTimeout(() => {
			document.documentElement.style.scrollBehavior = 'smooth';
		}, 100);
	});
});

menuBtns.forEach((menuBtn) => {
	menuBtn.addEventListener('click', function () {
		socialElements.forEach((element) => {
			element.classList.toggle('active');
		});

		menuElements.forEach((element) => {
			element.classList.toggle('active');
		});

		menuIcon.forEach((icon) => {
			icon.classList.toggle('active');
		});
	});
});

// * Random Quote Generator
// * Powered by Quotable

document.addEventListener('DOMContentLoaded', () => {
	const quote = document.querySelector('blockquote p');
	const cite = document.querySelector('blockquote cite');

	const updateQuote = async () => {
		try {
			const response = await fetch('https://api.quotable.io/random');
			const data = await response.json();

			if (response.ok) {
				quote.textContent = data.content;
				cite.textContent = data.author;
			} else {
				quote.textContent = 'An error occured';
			}
		} catch (error) {
			console.error(error);
		}
	};

	// Call updateQuote function once when page loads
	updateQuote();
});
