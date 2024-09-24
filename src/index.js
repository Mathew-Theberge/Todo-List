import "./style.css"
import {createTaskObj} from "./task-logic.js"
import {
    newTaskBtn,
    newTaskForm,
    newTaskModal,
    closeModalOnOutsideClick,
    newProjectModal,
    newProjectForm,
    projectCancelBtn,
    taskCancelBtn,
    newProjectBtn,
    exitModal,
    renderFolderBtns,
    allTasksBtn, 
    completedBtn,
    updateDisplay,
    displayCompletedFolder,
    displayAllTasksFolder
} from "./DOM-manipulation.js"

renderFolderBtns(true)


 
newTaskBtn.addEventListener("click", () => newTaskModal.showModal())
newTaskModal.addEventListener("click", (e) => {
    setTimeout( () => closeModalOnOutsideClick(e, newTaskModal, newTaskForm), 5) 
})
taskCancelBtn.addEventListener("click", () => exitModal(newTaskModal, newTaskForm))


newProjectBtn.addEventListener("click", () => newProjectModal.showModal())
newProjectModal.addEventListener("click", (e) => {
    setTimeout( () => closeModalOnOutsideClick(e, newProjectModal, newProjectForm), 5)
})
projectCancelBtn.addEventListener("click", () => exitModal(newProjectModal, newProjectForm))


newTaskForm.addEventListener("submit", (e) => {
    e.preventDefault()
    createTaskObj()
    updateDisplay()
    exitModal(newTaskModal, newTaskForm)
})

newProjectForm.addEventListener("submit", (e) => {
    e.preventDefault()
    renderFolderBtns()
    exitModal(newProjectModal, newProjectForm)
})

allTasksBtn.addEventListener("click", () => displayAllTasksFolder())

completedBtn.addEventListener("click", () => displayCompletedFolder())
