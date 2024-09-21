import "./style.css"
import {newTaskBtn, newTaskForm, newTaskModal, closeModalOnOutsideClick, renderTaskObj} from "./DOM-manipulation.js"



newTaskBtn.addEventListener("click", () => newTaskModal.showModal())
newTaskModal.addEventListener("click", closeModalOnOutsideClick)

newTaskForm.addEventListener("submit", renderTaskObj)
