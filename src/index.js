import "./style.css"
import { displayCurrentProject, setCurrentProject } from "./project-logic.js"
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
    renderProjectBtns,
    allTasksBtn, 
    completedBtn,
    completedBtnElement
} from "./DOM-manipulation.js"

export let currentProjectObj = {currentProject: allTasksElement}

displayCurrentProject(allTasksElement)

allTasksBtn.addEventListener("click", () => {
    setCurrentProject(allTasksElement)
    displayCurrentProject(allTasksElement)
})

completedBtn.addEventListener("click", () => {
    setCurrentProject(completedBtnElement)
    displayCurrentProject(completedBtnElement)
})

newTaskBtn.addEventListener("click", () => {
    if(currentProjectObj.currentProject !== completedBtnElement) {
        newTaskModal.showModal()
    }
})
newTaskModal.addEventListener("click", (e) => closeModalOnOutsideClick(e, newTaskModal, newTaskForm))
taskCancelBtn.addEventListener("click", () => exitModal(newTaskModal, newTaskForm))

newProjectBtn.addEventListener("click", () => newProjectModal.showModal())
newProjectModal.addEventListener("click", (e) => {
    setTimeout( () => closeModalOnOutsideClick(e, newProjectModal, newProjectForm), 5)
})
projectCancelBtn.addEventListener("click", () => exitModal(newProjectModal, newProjectForm))

newTaskForm.addEventListener("submit", (e) => {
    renderTaskObj(e, currentProjectObj)
})

newProjectForm.addEventListener("submit", (e) => {
    renderProjectBtns(e)
})
