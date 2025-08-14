export function initSelect() {
	document.querySelector('.js-select').addEventListener('change', function () {
		if (this.value !== "") {
			this.classList.add('has-value')
		} else {
			this.classList.remove('has-value')
		}
	})
}