import { displayCurrentFolder, projectName, displayCompletedFolder, displayAllTasksFolder, updateDisplay,} from "./DOM-manipulation"
import { allFoldersArray } from "./folder-logic.js"
import { updateStorage } from "./index.js"
import { allTasksArray, updateTaskIds } from "./task-logic.js"

export function toggleTaskCompletion(object, taskCard, radioBtn) {
    if (object.isCompleted === true) {
        object.isCompleted = false
        radioBtn.setAttribute("disabled", "disabled")
        addFastFadeAnimation(taskCard, displayCompletedFolder)
    } else {
        object.isCompleted = true
        if (projectName.textContent === "All Tasks") {
            addFadeAnimation(taskCard, displayAllTasksFolder)
        } else {
            addFadeAnimation(taskCard, displayCurrentFolder, object.folder)
        }
    }
    updateStorage()
}

function addFadeAnimation(taskCard, func, arg = null) {
        taskCard.classList.add("hidden600")
        document.body.style.pointerEvents = "none"
        setTimeout(() => {
            func(arg)
            document.body.style.pointerEvents = "auto"
        }, 600)
}

function addFastFadeAnimation(taskCard, func, arg = null) {
    taskCard.classList.add("hidden250")
    document.body.style.pointerEvents = "none"
    setTimeout(() => {
        func(arg)
        document.body.style.pointerEvents = "auto"
    }, 250)
}

export function deleteCard(object, taskCard) {


    allTasksArray.splice(object.id, 1)
    updateTaskIds()
    if (object.isCompleted === true) {
        addFastFadeAnimation(taskCard, displayCompletedFolder)
    } else if (projectName.textContent === "All Tasks") {
        addFastFadeAnimation(taskCard, displayAllTasksFolder)
    } else {
        addFastFadeAnimation(taskCard, displayCurrentFolder, object.folder)
    }
    updateStorage()
}

export function deleteFolder(folderName) {
    const filteredFoldersArray = allFoldersArray.filter(folder => folder.name !== folderName)
    allFoldersArray.length = 0
    filteredFoldersArray.forEach((item) => allFoldersArray.push(item))

    const filteredTasksArray = allTasksArray.filter(task => task.folder !== folderName)
    allTasksArray.length = 0
    filteredTasksArray.forEach((item) => allTasksArray.push(item))
    updateTaskIds()
    if (projectName.textContent === "Completed") {
        displayCompletedFolder()
    } else if (projectName.textContent === "All Tasks") {
        displayAllTasksFolder()
    } else {
        displayCurrentFolder(allFoldersArray[allFoldersArray.length -1].name)
    }
    updateStorage()
}