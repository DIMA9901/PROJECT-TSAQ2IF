(() => {
	const initializeMenuButton = () => {
		const button = document.querySelector('.top-left-btn');
		if (!button) return;

		const menuId = button.getAttribute('aria-controls');
		const menu = menuId ? document.getElementById(menuId) : null;
		if (!menu) return;

		const setMenuOpen = (isOpen) => {
			button.setAttribute('aria-expanded', String(isOpen));
			button.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
			menu.hidden = !isOpen;
			menu.classList.toggle('active', isOpen);
		};

		button.addEventListener('click', () => {
			setMenuOpen(button.getAttribute('aria-expanded') !== 'true');
		});

		menu.addEventListener('click', (event) => {
			if (event.target instanceof Element && event.target.closest('a')) {
				setMenuOpen(false);
			}
		});

		document.addEventListener('click', (event) => {
			if (event.target instanceof Node &&
				!button.contains(event.target) &&
				!menu.contains(event.target)) {
				setMenuOpen(false);
			}
		});

		document.addEventListener('keydown', (event) => {
			if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
				setMenuOpen(false);
				button.focus();
			}
		});
	};

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initializeMenuButton, { once: true });
	} else {
		initializeMenuButton();
	}
})();