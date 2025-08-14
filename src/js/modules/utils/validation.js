const tel = /^[+] {1}[0-9]{1} [(]{1}[0-9]{3}[)]{1} [0-9]{3}[-]{1}[0-9]{2}[-]{1}[0-9]{2}$/

const emailRegexp =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Zа-яА-Я\-0-9]+\.)+[a-zA-Zа-яА-Я]{2,}))$/

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
	}
}

export function validation(form, callback) {
	if (!form) return

	form.addEventListener("submit", (e) => {
		e.preventDefault()
		const checkbox = form.querySelector(".js-checkbox")
		const fields = Array.from(form.querySelectorAll("input, textarea")).filter((i) => i.dataset.validation)
		const radioBtns = form.querySelectorAll(".js-radioGroup[data-validation=required]")

		fields.forEach(validateField)
		const isFieldsValid = !fields.some(i => i.classList.contains("invalid"))
		const isRadioValid = radioBtns.length && validateRadio(radioBtns)
		const isAllValid = isFieldsValid && isRadioValid

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
	const errs = checkErrors(field.value, methods)
	const errorRow = field.nextElementSibling
	updateError({ errs, field, errorRow })
	field.addEventListener("input", onInput)

	function onInput({ target }) {
		const val = target.value
		const errs = checkErrors(val, methods)
		if (!errs.length) {
			updateError({ errs, field, errorRow })
			field.removeEventListener("input", onInput)
		}
	}
}

function checkErrors(value, methods) {
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