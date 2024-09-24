import { displayCurrentFolder, projectName, displayCompletedFolder, displayAllTasksFolder, updateDisplay,} from "./DOM-manipulation"
import { allFoldersArray } from "./folder-logic.js"
import { allTasksArray, updateTaskIds } from "./task-logic.js"

export function toggleTaskCompletion(object) {
    if (object.isCompleted === true) {
        object.isCompleted = false
        displayCompletedFolder()
    } else {
        object.isCompleted = true
        if (projectName.textContent === "All Tasks") {
            displayAllTasksFolder()
        } else {
            displayCurrentFolder(object.folder)
        }
    }
}

export function deleteCard(object) {
    allTasksArray.splice(object.id, 1)
    updateTaskIds()
    if (object.isCompleted === true) {
        displayCompletedFolder()
    } else if (projectName.textContent === "All Tasks") {
        displayAllTasksFolder()
    } else {
        displayCurrentFolder(object.folder)
    }
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
        if (allTasksArray.length > 0) {
            updateDisplay()
        } else {
            displayCurrentFolder(allFoldersArray[allFoldersArray.length -1].name)
        }
    }
}