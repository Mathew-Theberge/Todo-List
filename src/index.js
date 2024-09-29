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
    emptyFolderNewTaskBtn,
    toggleSidebarBtn,
    sidebar,
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

export function formatDate(dateString) {
    const arrayOfMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let newMonth = dateString.slice(5, 7) - 1
    let newDay = dateString.slice(8, 10)
    if (newDay[0] === "0") {
        newDay = newDay.slice(1, 2)
    }

    switch (newDay[newDay.length - 1]) {
        case "1":
            newDay += "st"
            break
        case "2":
            newDay += "nd"
            break
        case "3":
            newDay += "rd"
            break
        default:
            newDay += "th"
    }
    let newYear = dateString.slice(0, 4)
    return `${arrayOfMonths[newMonth]}  ${newDay} ${newYear}`
}

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
editTaskCancelBtn.addEventListener("click", () => {
    const dialogs = document.querySelectorAll("dialog")
    dialogs.forEach((dialog) => {
        dialog.classList.add("dialogClose")
    })
    setTimeout(() => {
        exitModal(editTaskModal, editTaskForm)
        dialogs.forEach((dialog) => {
            dialog.classList.remove("dialogClose")
        })
    }, 300);
})
 
newTaskBtn.addEventListener("click", () => newTaskModal.showModal())
newTaskModal.addEventListener("click", (e) => {
    if (isSelectInputClickedInFirefox === true) {
        isSelectInputClickedInFirefox = false
    } else {
        setTimeout( () => closeModalOnOutsideClick(e, newTaskModal, newTaskForm), 5) 
    }
})
taskCancelBtn.addEventListener("click", () => {
    const dialogs = document.querySelectorAll("dialog")
    dialogs.forEach((dialog) => {
        dialog.classList.add("dialogClose")
    })
    setTimeout(() => {
        exitModal(newTaskModal, newTaskForm)
        dialogs.forEach((dialog) => {
            dialog.classList.remove("dialogClose")
        })
    }, 300);
})

newProjectBtn.addEventListener("click", () => newProjectModal.showModal())
newProjectModal.addEventListener("click", (e) => {
    setTimeout( () => closeModalOnOutsideClick(e, newProjectModal, newProjectForm), 5)
})
projectCancelBtn.addEventListener("click", () => {
    const dialogs = document.querySelectorAll("dialog")
    dialogs.forEach((dialog) => {
        dialog.classList.add("dialogClose")
    })
    setTimeout(() => {
        exitModal(newProjectModal, newProjectForm)
        dialogs.forEach((dialog) => {
            dialog.classList.remove("dialogClose")
        })
    }, 300);
})

emptyFolderNewTaskBtn.addEventListener("click", () => newTaskModal.showModal())



newTaskForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const dialogs = document.querySelectorAll("dialog")
    dialogs.forEach((dialog) => {
        dialog.classList.add("dialogClose")
    })
    setTimeout(() => {
        exitModal(newTaskModal, newTaskForm)
        dialogs.forEach((dialog) => {
            dialog.classList.remove("dialogClose")
        })
    }, 300);
    createTaskObj()
    updateDisplay()
})

newProjectForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const dialogs = document.querySelectorAll("dialog")
    dialogs.forEach((dialog) => {
        dialog.classList.add("dialogClose")
    })
    setTimeout(() => {
        exitModal(newProjectModal, newProjectForm)
        dialogs.forEach((dialog) => {
            dialog.classList.remove("dialogClose")
        })
    }, 300);
    renderFolderBtns()
})

editTaskForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const dialogs = document.querySelectorAll("dialog")
    dialogs.forEach((dialog) => {
        dialog.classList.add("dialogClose")
    })
    setTimeout(() => {
        exitModal(editTaskModal, editTaskForm)
        dialogs.forEach((dialog) => {
            dialog.classList.remove("dialogClose")
        })
    }, 300);
    const folderName = updateTaskCard()
    displayCurrentFolder(folderName)
})

allTasksBtn.addEventListener("click", () => displayAllTasksFolder())

completedBtn.addEventListener("click", () => displayCompletedFolder())

toggleSidebarBtn.addEventListener("click", () => {
    sidebar.classList.toggle("toggleSidebar")
})

