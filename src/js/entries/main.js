import { initTabs } from "../modules/tabs"
import { ready } from "../modules/utils/ready"

ready(() => {
	initTabs({ defaultIndex: 2 })
})