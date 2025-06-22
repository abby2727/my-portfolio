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

// Random Quote Generator (Powered by API-Ninjas)
document.addEventListener('DOMContentLoaded', () => {
	const quote = document.querySelector('blockquote p');
	const cite = document.querySelector('blockquote cite');

	const updateQuote = async () => {
		try {
			const response = await fetch(CONFIG.QUOTES_API_URL, {
				method: 'GET',
				headers: {
					'X-Api-Key': CONFIG.API_NINJAS_API_KEY,
					'Content-Type': 'application/json'
				}
			});

			if (response.ok) {
				const data = await response.json();

				// API-Ninjas returns an array of quotes, we'll take the first one
				if (data && data.length > 0) {
					quote.textContent = data[0].quote;
					cite.textContent = data[0].author;
				} else {
					quote.textContent = 'No quotes available at the moment';
					cite.textContent = '';
				}
			} else {
				const errorText = await response.text();
				console.error('API Error:', response.status, errorText);

				// Handle specific API errors with friendly messages
				if (response.status === 429) {
					// Rate limit exceeded (quota reached)
					quote.textContent =
						"📊 Oops! We've reached our monthly quote limit. Please try again next month or contact the admin for more quotes!";
					cite.textContent = 'API Quota Reached';
				} else if (response.status === 402) {
					quote.textContent =
						"💳 Our quote service quota has been exceeded this month. Don't worry, we'll be back with fresh quotes soon!";
					cite.textContent = 'Service Temporarily Limited';
				} else if (response.status === 401 || response.status === 403) {
					quote.textContent =
						"🔑 There seems to be an authentication issue. We're working on it!";
					cite.textContent = 'Service Issue';
				} else if (response.status >= 500) {
					quote.textContent =
						'⚡ The quote service is temporarily down. Please try again in a few moments!';
					cite.textContent = 'Service Maintenance';
				} else {
					// Generic error
					quote.textContent =
						'😔 Unable to fetch a quote right now. Please try again later!';
					cite.textContent = 'Temporary Issue';
				}
			}
		} catch (error) {
			console.error('Network Error:', error);
			quote.textContent =
				"🌐 Oops! Looks like there's a connection issue. Please check your internet and try again!";
			cite.textContent = 'Connection Problem';
		}
	};

	updateQuote();

	// const refreshButton = document.getElementById('refresh-quote');
	// if (refreshButton) {
	// 	refreshButton.addEventListener('click', () => {
	// 		quote.textContent = 'Loading...';
	// 		cite.textContent = '';
	// 		updateQuote();
	// 	});
	// }
});
