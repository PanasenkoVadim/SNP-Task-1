import IMask from "imask"
import { validation } from "./utils/validation"

export function initForm() {
	const form = document.querySelector(".js-form")
	initMasks()
	setMinDate()
	validation(form, sendForm)
}

async function sendForm(form) {
	try {
		const url = form.action
		const formData = new FormData(form)
		const data = Object.fromEntries(formData)

		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})

		if (!response.ok) {
			throw new Error(response.status)
		}

		alert("Форма отправлена")
	} catch (e) {
		alert("Ошибка отправки формы: " + e.message)
	}
}

function initMasks() {
	const maskedFields = document.querySelectorAll("[data-mask]")
	maskedFields.forEach(field => {
		const mask = field.dataset.mask
		IMask(field, { mask })
	})
}

function setMinDate() {
	const dateInput = document.querySelector('.js-dateFrom')
	const today = new Date().toISOString().split('T')[0]
	dateInput.min = today
}