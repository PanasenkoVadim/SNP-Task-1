import IMask from "imask"
import { validation } from "./utils/validation"
import { Calendar } from "vanilla-calendar-pro"

export function initForm() {
	const form = document.querySelector(".js-form")

	initMasks()
	validation(form, formCallback)
	initResetBtn(form)
	initVanillaCalendar()
}

function initVanillaCalendar() {
	const calendars = document.querySelectorAll(".js-calendar")
	const today = new Date().toISOString().split('T')[0]
	calendars.forEach(c => {
		const calendar = new Calendar(c, {
			inputMode: true,
			locale: 'ru-RU',
			positionToInput: 'auto',
			displayDateMin: today,
			selectedTheme: 'light',
			onChangeToInput(self) {
				if (!self.context.inputElement) return
				if (self.context.selectedDates[0]) {
					const date = new Date(self.context.selectedDates[0])
					const day = String(date.getDate()).padStart(2, '0')
					const month = String(date.getMonth() + 1).padStart(2, '0')
					const year = date.getFullYear()

					self.context.inputElement.value = `${day}.${month}.${year}`

					self.hide()
				} else {
					self.context.inputElement.value = ''
				}
			},
		})
		calendar.init()

	})
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