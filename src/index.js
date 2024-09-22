import "./style.css"
import {newTaskBtn, newTaskForm, newTaskModal, closeModalOnOutsideClick, renderTaskObj, allTasksElement} from "./DOM-manipulation.js"

export let currentProject = allTasksElement

newTaskBtn.addEventListener("click", () => newTaskModal.showModal())
newTaskModal.addEventListener("click", closeModalOnOutsideClick)

newTaskForm.addEventListener("submit", (e) => {
    e.preventDefault()
    renderTaskObj(currentProject)
})
