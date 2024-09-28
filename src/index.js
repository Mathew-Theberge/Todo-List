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
    editTaskForm,
    editTaskModal,
    editTaskDueDate,
    editTaskCancelBtn,
} from "./DOM-manipulation.js"
import { allFoldersArray } from "./folder-logic.js"
import { updateTaskCard } from "./eventListener-logic.js"

// the below code is to fix a bug in firefox where clicking a select input closes the modal

  let isSelectInputClickedInFirefox


const prioritySelect = document.querySelector("#taskPriority")
const folderSelect = document.querySelector("#projectFolder")
const editFolderSelect = document.querySelector("#changeProjectFolder")
const editPrioritySelect = document.querySelector("#changeTaskPriority")

folderSelect.addEventListener("click", () => {
    isSelectInputClickedInFirefox = true
})

prioritySelect.addEventListener("click", () => {
    isSelectInputClickedInFirefox = true
})

editFolderSelect.addEventListener("click", () => {
    isSelectInputClickedInFirefox = true
})

editPrioritySelect.addEventListener("click", () => {
    isSelectInputClickedInFirefox = true
})

const taskDateInput = document.querySelector("#taskDueDate")

const date = new Date()

let day = date.getDate()
let month = "0" + (date.getMonth() + 1)
let year = date.getFullYear()
let currentDate = `${year}-${month}-${day}`

taskDateInput.setAttribute("min", currentDate)
editTaskDueDate.setAttribute("min", currentDate)

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

editTaskModal.addEventListener("click", (e) => {
    if (isSelectInputClickedInFirefox === true) {
        isSelectInputClickedInFirefox = false
    } else {
        setTimeout( () => closeModalOnOutsideClick(e, editTaskModal, editTaskForm), 5) 
    }
})
editTaskCancelBtn.addEventListener("click", () => exitModal(editTaskModal, editTaskForm))

 
newTaskBtn.addEventListener("click", () => newTaskModal.showModal())
newTaskModal.addEventListener("click", (e) => {
    if (isSelectInputClickedInFirefox === true) {
        isSelectInputClickedInFirefox = false
    } else {
        setTimeout( () => closeModalOnOutsideClick(e, newTaskModal, newTaskForm), 5) 
    }
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

editTaskForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const folderName = updateTaskCard()
    displayCurrentFolder(folderName)
    exitModal(editTaskModal, editTaskForm)
})

allTasksBtn.addEventListener("click", () => displayAllTasksFolder())

completedBtn.addEventListener("click", () => displayCompletedFolder())
