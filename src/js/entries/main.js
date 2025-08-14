import { initForm } from "../modules/form"
import { initSelect } from "../modules/select"
import { initTabs } from "../modules/tabs"
import { ready } from "../modules/utils/ready"

ready(() => {
	initTabs()
	initSelect()
	initForm()
})