import IMask from "imask"
import { validation } from "./utils/validation"

export function initForm() {
	const form = document.querySelector(".js-form")

	initMasks()
	setMinDate()
	validation(form, formCallback)
	initResetBtn(form)
}

function formCallback(form) {
	const tourBlock = document.getElementById("selectTour")
	tourBlock.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
	form.reset()
}

function initMasks() {
	const maskedFields = document.querySelectorAll("[data-mask]")
	maskedFields.forEach(field => {
		const mask = field.dataset.mask
		const config = { mask }
		if (mask === "+ {7} (000) 000-00-00") {
			config.prepare = function (value, masked) {
				if (!masked.value.length && value.startsWith('8')) {
					return '+7' + value.substring(1)
				}
				return value
			}
		}
		IMask(field, config)
	})
}

function setMinDate() {
	const dateInput = document.querySelector('.js-dateFrom')
	const today = new Date().toISOString().split('T')[0]
	dateInput.min = today
}

function initResetBtn(form) {
	const resetBtn = form.querySelector(".js-formReset")

	resetBtn.addEventListener("click", () => {
		const errorRows = Array.from(form.querySelectorAll(".form__error")).filter(e => e.textContent !== "")
		const invalidFields = form.querySelectorAll(".invalid")

		form.reset()

		if (errorRows.length) errorRows.forEach(error => error.textContent = "")

		if (invalidFields.length) invalidFields.forEach(field => field.classList.remove("invalid"))
	})
}