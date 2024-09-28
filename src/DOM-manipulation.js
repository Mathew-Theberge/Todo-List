import {allTasksArray} from "./task-logic.js"
import { createFolderObj, allFoldersArray} from "./folder-logic.js"
import { toggleTaskCompletion, deleteCard, deleteFolder, editTask} from "./eventListener-logic.js"

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
export const editTaskModal = document.querySelector("#editTaskModal")
export const editTaskForm = document.querySelector("#editTaskForm")
export const changeProjectFolder = document.querySelector("#changeProjectFolder")
export const editTaskDueDate = document.querySelector("#editTaskDueDate")
export const editNameInput = document.querySelector("#editTaskName")
export const editDescription = document.querySelector("#editTaskDescription")
export const high = document.querySelector("#high")
export const moderate = document.querySelector("#moderate")
export const low = document.querySelector("#low")
export const editTaskCancelBtn = document.querySelector("#editTaskCancelBtn")
export const emptyFolderNewTaskBtn = document.querySelector(".emptyFolderNewTaskBtn")
export const para = document.querySelector(".para")

export function displayCompletedFolder() {
    tasks.replaceChildren()
    const filteredTasks = allTasksArray.filter((taskCard) => {
        if ("true" === taskCard.isCompleted) {return taskCard}
    })
    filteredTasks.forEach((task) => renderTaskObj(task))
    projectName.textContent = "Completed"
    folders.childNodes.forEach((node) => {
        node.classList.remove("active")
    })
    allTasksBtn.classList.remove("active")
    completedBtn.classList.add("active")
    if (filteredTasks.length === 0) {
        tasks.append(para)
    }
}

export function displayAllTasksFolder() {
    tasks.replaceChildren()
    allTasksArray.forEach((task) => {
        if (task.isCompleted === "false") {renderTaskObj(task)}
    })
    projectName.textContent = "All Tasks"
    folders.childNodes.forEach((node) => {
        node.classList.remove("active")
    })
    completedBtn.classList.remove("active")
    allTasksBtn.classList.add("active")
    if (allTasksArray.every((task) => {
        return task.isCompleted !== "false"
    })) {
        tasks.append(emptyFolderNewTaskBtn)
    }
}

export function displayCurrentFolder(folderName) {
    tasks.replaceChildren()
    const filteredTasks = allTasksArray.filter((taskCard) => {
        if (folderName === taskCard.folder && taskCard.isCompleted === "false") {return taskCard}
    })
    filteredTasks.forEach((task) => renderTaskObj(task))
    projectName.textContent = folderName
    highlightFolder(folderName)
    if (filteredTasks.length === 0) {
        tasks.append(emptyFolderNewTaskBtn)
    }
}

function highlightFolder(folderName) {
    folders.childNodes.forEach((node => {
        if (node.firstChild.textContent === folderName) {
            folders.childNodes.forEach((node) => {
                node.classList.remove("active")
            })
            node.classList.add("active")
            completedBtn.classList.remove("active")
            allTasksBtn.classList.remove("active")
        }
    }))
}


export function updateDisplay() {
    displayCurrentFolder(allTasksArray[allTasksArray.length - 1].folder)
}


export function renderTaskObj(task) {
    const taskCard = document.createElement("div")
    const checkbox = document.createElement("input")
    const name = document.createElement("div")
    const description = document.createElement("div")
    const dueDate = document.createElement("div")
    const deleteBtn = document.createElement("button")
    const container = document.createElement("div")
    const editBtn = document.createElement("button")
    const svgTrashCan = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    const pathTrashCan = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    const svgEdit = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    const pathEdit = document.createElementNS('http://www.w3.org/2000/svg', 'path')

    svgTrashCan.setAttribute("class", "w-6 h-6 text-gray-800 dark:text-white")
    svgTrashCan.setAttribute("aria-hidden", "true")
    svgTrashCan.setAttribute("xmlns", "http://www.w3.org/2000/svg")
    svgTrashCan.setAttribute("width", "24")
    svgTrashCan.setAttribute("height", "24")
    svgTrashCan.setAttribute("fill", "none")
    svgTrashCan.setAttribute("viewbox", "0 0 24 24")

    pathTrashCan.setAttribute("stroke", "currentColor")
    pathTrashCan.setAttribute("stroke-linecap", "round")
    pathTrashCan.setAttribute("stroke-linejoin", "round")
    pathTrashCan.setAttribute("stroke-width", "2")
    pathTrashCan.setAttribute("d", "M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z")

    svgTrashCan.append(pathTrashCan)

    svgEdit.setAttribute("class", "w-6 h-6 text-gray-800 dark:text-white")
    svgEdit.setAttribute("aria-hidden", "true")
    svgEdit.setAttribute("xmlns", "http://www.w3.org/2000/svg")
    svgEdit.setAttribute("width", "24")
    svgEdit.setAttribute("height", "24")
    svgEdit.setAttribute("fill", "none")
    svgEdit.setAttribute("viewbox", "0 0 24 24")

    pathEdit.setAttribute("stroke", "currentColor")
    pathEdit.setAttribute("stroke-linecap", "round")
    pathEdit.setAttribute("stroke-linejoin", "round")
    pathEdit.setAttribute("stroke-width", "2")
    pathEdit.setAttribute("d", "m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z")

    svgEdit.append(pathEdit)


    taskCard.classList.add("taskCard")
    checkbox.setAttribute("type", "checkbox")
    name.textContent = task.name
    description.textContent = task.description
    dueDate.textContent = "Due By " + task.dueDate
    deleteBtn.append(svgTrashCan)
    editBtn.append(svgEdit)
    container.classList.add("container")

    if (task.isCompleted === "true") {
        checkbox.setAttribute("checked", "checked")
    }

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
    taskCard.append(checkbox, container, editBtn, deleteBtn)
    tasks.append(taskCard)

    // event listeners

    checkbox.addEventListener("click", () => {
        toggleTaskCompletion(task, taskCard, checkbox)
    })

    deleteBtn.addEventListener("click", () => {
        deleteCard(task, taskCard)
    })

    editBtn.addEventListener("click", () => {
        if (task.isCompleted !== "true") {
            editTask(task)
        } else {
            alert("Cannot edit completed tasks")
        }
    })
}

export function renderFolderBtns(manualCallback = false) {

    folders.replaceChildren()
    projectFolder.replaceChildren()
    changeProjectFolder.replaceChildren()
    if (manualCallback === false) {createFolderObj()}
    allFoldersArray.forEach( (folder) => {
        const container = document.createElement("div")
        const projectBtn = document.createElement("button")
        const deleteBtn = document.createElement("button")
        const folderOption = document.createElement("option")
        const changeFolderOption = document.createElement("option")
        const svgFolder = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        const pathFolder = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        const svgTrashCan = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        const pathTrashCan = document.createElementNS('http://www.w3.org/2000/svg', 'path')

        svgFolder.setAttribute("class", "w-6 h-6 text-gray-800 dark:text-white")
        svgFolder.setAttribute("aria-hidden", "true")
        svgFolder.setAttribute("xmlns", "http://www.w3.org/2000/svg")
        svgFolder.setAttribute("width", "24")
        svgFolder.setAttribute("height", "24")
        svgFolder.setAttribute("fill", "currentColor")
        svgFolder.setAttribute("viewbox", "0 0 24 24")

        pathFolder.setAttribute("fill-rule", "evenodd")
        pathFolder.setAttribute("d", "M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 .087.586l2.977-7.937A1 1 0 0 1 6 10h12V9a2 2 0 0 0-2-2h-4.532l-1.9-2.28A2 2 0 0 0 8.032 4H4Zm2.693 8H6.5l-3 8H18l3-8H6.693Z")
        pathFolder.setAttribute("clip-rule", "evenodd")
        svgFolder.append(pathFolder)

        svgTrashCan.setAttribute("class", "w-6 h-6 text-gray-800 dark:text-white")
        svgTrashCan.setAttribute("aria-hidden", "true")
        svgTrashCan.setAttribute("xmlns", "http://www.w3.org/2000/svg")
        svgTrashCan.setAttribute("width", "24")
        svgTrashCan.setAttribute("height", "24")
        svgTrashCan.setAttribute("fill", "none")
        svgTrashCan.setAttribute("viewbox", "0 0 24 24")

        pathTrashCan.setAttribute("stroke", "currentColor")
        pathTrashCan.setAttribute("stroke-linecap", "round")
        pathTrashCan.setAttribute("stroke-linejoin", "round")
        pathTrashCan.setAttribute("stroke-width", "2")
        pathTrashCan.setAttribute("d", "M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z")

        svgTrashCan.append(pathTrashCan)

        container.classList.add("folderContainer")
        deleteBtn.append(svgTrashCan)
        projectBtn.append(svgFolder, folder.name)
        const removedSpaces = folder.name.replace(/ /g, "")
        projectBtn.classList.add(removedSpaces)
        folderOption.textContent = folder.name
        
        changeFolderOption.textContent = folder.name
        changeFolderOption.setAttribute("value", folder.name)
        folderOption.setAttribute("value", folder.name)
    
        container.append(projectBtn, deleteBtn)
        folders.append(container)
        projectFolder.append(folderOption)
        changeProjectFolder.append(changeFolderOption)
        displayCurrentFolder(folder.name)

        // event listeners

        projectBtn.addEventListener("click", () => {
            displayCurrentFolder(folder.name)
        })

        deleteBtn.addEventListener("click", () => {
            if (allFoldersArray.length > 1) {
                deleteFolder(folder.name, container)
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


