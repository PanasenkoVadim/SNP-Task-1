import { debounce } from "./utils/debounce"

export function initTabs({ defaultIndex = 0, activeClass = "active", resizeDelay = 200 } = {}) {
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

	const resizeHandler = debounce(() => fixContentHeight(items.findIndex(item => item.classList.contains(activeClass))), resizeDelay)
	window.addEventListener("resize", resizeHandler)

	function hideAll() {
		buttons.forEach(item => item.classList.remove(activeClass))
		items.forEach(item => item.classList.remove(activeClass))
	}

	function show(index) {
		if (!items[index] || !buttons[index]) return
		items[index].classList.add(activeClass)
		buttons[index].classList.add(activeClass)
		fixContentHeight(index)
	}

	function fixContentHeight(selectedIndex) {
		content.style.height = `${items[selectedIndex].offsetHeight}px`
	}
}