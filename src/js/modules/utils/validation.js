const tel = /^[+] {1}[0-9]{1} [(]{1}[0-9]{3}[)]{1} [0-9]{3}[-]{1}[0-9]{2}[-]{1}[0-9]{2}$/

const emailRegexp =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Zа-яА-Я\-0-9]+\.)+[a-zA-Zа-яА-Я]{2,}))$/

const today = new Date()
today.setHours(0, 0, 0, 0)

const validationMethods = {
	required: {
		validate: (val) => val,
		msg: "Заполните поле"
	},
	phone: {
		validate: (val) => (val && matchStr(tel, val)) || !val,
		msg: "Указанный телефон некорректен"
	},
	email: {
		validate: (val) => emailRegexp.test(val),
		msg: "Указанная почта некорректна"
	},
	minToday: {
		validate: (val) => {
			if (!val) return true

			let date
			if (val.includes('.')) {
				const [day, month, year] = val.split('.').map(Number)
				date = new Date(year, month - 1, day)
			} else {
				date = new Date(val)
			}

			return date >= today
		},
		msg: `Минимальная дата — ${today.toLocaleDateString()}`
	}
}

export function validation(form, callback) {
	if (!form) return

	form.addEventListener("submit", (e) => {
		e.preventDefault()
		const checkbox = form.querySelector(".js-checkbox")
		const fields = Array.from(form.querySelectorAll("input, textarea")).filter((i) => i.dataset.validation)
		const radioGroups = form.querySelectorAll(".js-radioGroup[data-validation=required]")

		fields.forEach(validateField)
		const isFieldsValid = !fields.some(i => i.classList.contains("invalid"))
		const isRadioValid = validateAllRadioGroups(radioGroups)
		const isCheckboxValid = validateCheckbox(checkbox)
		const isAllValid = isFieldsValid && isRadioValid && isCheckboxValid

		if (isAllValid) callback(form)
	})
}

function updateError({ errs, field, errorRow }) {
	if (!errorRow) return
	field.classList.toggle("invalid", Boolean(errs[0]))

	errs[0] ? (errorRow.textContent = errs[0]) : (errorRow.textContent = "")
}

function validateField(field) {
	const methods = field.dataset.validation.split(" ")
	const errs = getErrors(field.value, methods)
	const errorRow = field.nextElementSibling
	updateError({ errs, field, errorRow })
	field.addEventListener("input", onInput)

	function onInput({ target }) {
		const val = target.value
		const errs = getErrors(val, methods)
		if (!errs.length) {
			updateError({ errs, field, errorRow })
			field.removeEventListener("input", onInput)
		}
	}
}

function getErrors(value, methods) {
	let errs = methods.map(method => {
		const valid = validationMethods[method].validate(value)
		return valid ? null : validationMethods[method].msg
	}).filter(Boolean)

	return errs
}

function matchStr(regExp, val) {
	if (val === "") return true

	const match = val.match(regExp)
	if (match && match[0] === val) return true
	return false
}

function validateAllRadioGroups(radioGroups) {
	let isValid = true

	if (!radioGroups) return isValid

	radioGroups.forEach(group => {
		const radioInputs = Array.from(group.querySelectorAll("input[type='radio']"))
		const groupValid = radioInputs.some(r => r.checked)
		if (!groupValid) {
			isValid = false
			const errorRow = group.querySelector(".form__error")
			if (errorRow) errorRow.textContent = validationMethods.required.msg
			radioInputs.forEach(r => r.addEventListener("change", onChange))

			function onChange() {
				errorRow.textContent = ""
				radioInputs.forEach(r => r.removeEventListener("change", onChange))
			}
		}
	})

	return isValid
}

function validateCheckbox(container) {
	const checkbox = container.querySelector("input[type='checkbox']")
	const errorRow = container.nextElementSibling

	const toggleError = () => {
		errorRow.textContent = checkbox.checked ? "" : validationMethods.required.msg
	}

	toggleError()

	if (!checkbox.checked) {
		checkbox.addEventListener("change", toggleError)
	} else {
		checkbox.removeEventListener("change", toggleError)
	}

	return checkbox.checked
}