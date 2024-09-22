import "./style.css"
import {
    newTaskBtn,
    newTaskForm,
    newTaskModal,
    closeModalOnOutsideClick,
    renderTaskObj,
    allTasksElement,
    newProjectModal,
    newProjectForm,
    projectCancelBtn,
    taskCancelBtn,
    newProjectBtn,
    exitModal,
} from "./DOM-manipulation.js"

export let currentProject = allTasksElement

newTaskBtn.addEventListener("click", () => newTaskModal.showModal())
newTaskModal.addEventListener("click", (e) => closeModalOnOutsideClick(e, newTaskModal, newTaskForm))
taskCancelBtn.addEventListener("click", () => exitModal(newTaskModal, newTaskForm))

newProjectBtn.addEventListener("click", () => newProjectModal.showModal())
newProjectModal.addEventListener("click", (e) => closeModalOnOutsideClick(e, newProjectModal, newProjectForm))
projectCancelBtn.addEventListener("click", () => exitModal(newProjectModal, newProjectForm))

newTaskForm.addEventListener("submit", (e) => {
    renderTaskObj(e, currentProject)
})
