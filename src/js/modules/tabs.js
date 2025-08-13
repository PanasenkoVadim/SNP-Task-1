export function initTabs({ defaultIndex = 0 }) {
	const wrapper = document.querySelector(".js-tabs")

	if (!wrapper) return

	const buttons = wrapper.querySelectorAll(".js-tabsTrigger")
	const content = wrapper.querySelector(".js-tabsContent")
	const items = Array.from(wrapper.querySelectorAll(".js-tabsItem"))

	fixContentHeight(defaultIndex)
	show(defaultIndex)

	buttons.forEach((trigger, index) => {
		trigger.addEventListener("click", () => {
			hideAll()
			show(index)
		})
	})

	window.addEventListener("resize", () => {
		fixContentHeight(items.findIndex(item => item.classList.contains("active")))
	})

	function hideAll() {
		buttons.forEach(item => item.classList.remove("active"))
		items.forEach(item => item.classList.remove("active"))
	}

	function show(index) {
		if (!items[index] || !buttons[index]) return
		items[index].classList.add("active")
		buttons[index].classList.add("active")
		fixContentHeight(index)
	}

	function fixContentHeight(selectedIndex) {
		content.style.height = `${items[selectedIndex].offsetHeight}px`
	}
}