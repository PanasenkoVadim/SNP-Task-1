export function initDynamicHeader() {
	const header = document.querySelector(".js-header")
	const SCROLL_THRESHOLD = 450
	let lastScrollPosition = window.scrollY
	let ticking = false

	const handleScroll = () => {
		const currentScrollPosition = window.scrollY

		if (currentScrollPosition >= 100) {
			header.classList.add("prefixed")
		} else {
			header.classList.remove("prefixed")
			header.classList.remove("upfixed")
			header.classList.remove("fixed")
		}

		if (currentScrollPosition >= SCROLL_THRESHOLD) {
			header.classList.add("fixed")

			if (lastScrollPosition > currentScrollPosition) {
				header.classList.add("upfixed")
			} else {
				header.classList.remove("upfixed")
			}
		} else {
			header.classList.remove("upfixed")
		}

		lastScrollPosition = currentScrollPosition
		ticking = false
	}

	window.addEventListener("scroll", () => {
		if (!ticking) {
			window.requestAnimationFrame(handleScroll)
			ticking = true
		}
	})

	handleScroll()
}
