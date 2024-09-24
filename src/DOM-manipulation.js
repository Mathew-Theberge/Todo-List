import {allTasksArray} from "./task-logic.js"
import { createFolderObj, allFoldersArray} from "./folder-logic.js"
import { toggleTaskCompletion, deleteCard, deleteFolder} from "./eventListener-logic.js"

export const newTaskBtn = document.querySelector(".newTaskBtn")
export const newTaskModal = document.querySelector("#newTaskModal")
export const newTaskForm = document.querySelector("#newTaskForm")
export const content = document.querySelector("#content")
export const allTasksBtn = document.querySelector(".allTasksBtn")
export const newProjectModal = document.querySelector("#newProjectModal")
export const newProjectForm = document.querySelector("#newProjectForm")
export const taskCancelBtn = document.querySelector(".taskCancelBtn")
export const projectCancelBtn = document.querySelector(".projectCancelBtn")
export const newProjectBtn = document.querySelector(".newProjectBtn")
export const sidebar = document.querySelector("#sidebar")
export const completedBtn = document.querySelector(".completedBtn")
export const projectName = document.querySelector(".projectName")
export const folders = document.querySelector(".folders")
export const tasks = document.querySelector(".tasks")
export const projectFolder = document.querySelector("#projectFolder")


export function displayCompletedFolder() {
    tasks.replaceChildren()
    const filteredTasks = allTasksArray.filter((taskCard) => {
        if (true === taskCard.isCompleted) {return taskCard}
    })
    filteredTasks.forEach((task) => renderTaskObj(task))
    projectName.textContent = "Completed"
}

export function displayAllTasksFolder() {
    tasks.replaceChildren()
    allTasksArray.forEach((task) => {
        if (task.folder !== "Completed" && task.isCompleted === false) {renderTaskObj(task)}
    })
    projectName.textContent = "All Tasks"
}

export function displayCurrentFolder(folderName) {
    tasks.replaceChildren()
    const filteredTasks = allTasksArray.filter((taskCard) => {
        if (folderName === taskCard.folder && taskCard.isCompleted === false) {return taskCard}
    })
    filteredTasks.forEach((task) => renderTaskObj(task))
    projectName.textContent = folderName
}

export function updateDisplay() {
    displayCurrentFolder(allTasksArray[allTasksArray.length - 1].folder)
}


export function renderTaskObj(task) {

    const taskCard = document.createElement("div")
    const radio = document.createElement("input")
    const name = document.createElement("div")
    const description = document.createElement("div")
    const dueDate = document.createElement("div")
    const deleteBtn = document.createElement("button")
    const container = document.createElement("div")

    taskCard.classList.add("taskCard")
    radio.setAttribute("type", "radio")
    name.textContent = task.name
    description.textContent = task.description
    dueDate.textContent = task.dueDate
    deleteBtn.textContent = "X"
    container.classList.add("container")

    switch (task.priority) {
        case "low":
            taskCard.classList.add("low")
            break
        case "moderate":
            taskCard.classList.add("moderate")
            break
        case "high":
            taskCard.classList.add("high")
            break
    }

    container.append(name, description, dueDate)
    taskCard.append(radio, container, deleteBtn)
    tasks.append(taskCard)

    // event listeners

    radio.addEventListener("click", () => {
        toggleTaskCompletion(task)
    })

    deleteBtn.addEventListener("click", () => {
        deleteCard(task)
    })

}

export function renderFolderBtns(manualCallback = false) {

    folders.replaceChildren()
    projectFolder.replaceChildren()
    if (manualCallback === false) {createFolderObj()}
    allFoldersArray.forEach( (folder) => {
        const container = document.createElement("div")
        const projectBtn = document.createElement("button")
        const deleteBtn = document.createElement("button")
        const folderOption = document.createElement("option")
    
        projectBtn.textContent = folder.name
        deleteBtn.textContent = "X"
        const removedSpaces = folder.name.replace(/ /g, "")
        projectBtn.classList.add(removedSpaces)
        folderOption.textContent = folder.name
        folderOption.setAttribute("value", folder.name)
    
        container.append(projectBtn, deleteBtn)
        folders.append(container)
        projectFolder.append(folderOption)
        displayCurrentFolder(folder.name)

        // event listeners

        projectBtn.addEventListener("click", () => {
            displayCurrentFolder(folder.name)
        })

        deleteBtn.addEventListener("click", () => {
            if (allFoldersArray.length > 1) {
                deleteFolder(folder.name)
                container.remove()
                folderOption.remove()
            }
        })
    })

}

export function closeModalOnOutsideClick(e, modal, form) {
    const dialogDimensions = modal.getBoundingClientRect()
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
    exitModal(modal, form)
    }
}

export function exitModal(modal, form) {
    modal.close()
    form.reset()
}


