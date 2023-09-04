import {insertedValues} from "./valuesData.js"
import {render, filterButtons, handleModal, sum} from "./render.js";
import { handleRegisterForm } from "./form.js";

render(insertedValues)
filterButtons()
handleModal()
handleRegisterForm(insertedValues)
sum(insertedValues)