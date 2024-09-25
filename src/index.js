import "./style.css"
import "./darkmode.js"
import {allTasksArray, createTaskObj} from "./task-logic.js"
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
    displayAllTasksFolder,
    displayCurrentFolder,
} from "./DOM-manipulation.js"
import { allFoldersArray } from "./folder-logic.js"

const taskDateInput = document.querySelector("#taskDueDate")

const date = new Date()

let day = date.getDate()
let month = "0" + (date.getMonth() + 1)
let year = date.getFullYear()
let currentDate = `${year}-${month}-${day}`

taskDateInput.setAttribute("min", currentDate)

if (localStorage.length === 0) {
    renderFolderBtns(true)
    updateStorage()
    displayCurrentFolder("Default Folder")
} else {
    const deserializedFolder = JSON.parse(localStorage.getItem("folderArray"))
    deserializedFolder.forEach( object => {
        allFoldersArray.push(object)
    })

    const deserializedTasks = JSON.parse(localStorage.getItem("taskArray"))
    deserializedTasks.forEach((object) => {
        allTasksArray.push(object)
    })
    renderFolderBtns(true)
    displayCurrentFolder(allFoldersArray[0].name)
}



export function updateStorage() {
    localStorage.setItem("taskArray", JSON.stringify(allTasksArray))
    localStorage.setItem("folderArray", JSON.stringify(allFoldersArray))
}

 
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
