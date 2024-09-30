import {
    displayCurrentFolder,
    projectName,
    displayCompletedFolder,
    displayAllTasksFolder,
    editTaskModal,
    editTaskForm,
    editDescription,
    editNameInput,
    editTaskDueDate,
    high,
    moderate,
    low,
} from "./DOM-manipulation";
import { allFoldersArray } from "./folder-logic.js";
import { updateStorage } from "./index.js";
import { allTasksArray, updateTaskIds, Task } from "./task-logic.js";

export function toggleTaskCompletion(object, taskCard) {
    if (object.isCompleted === "true") {
        object.isCompleted = "false";
        addFastFadeAnimation(taskCard, displayCompletedFolder);
    } else {
        object.isCompleted = "true";
        if (projectName.textContent === "All Tasks") {
            addFadeAnimation(taskCard, displayAllTasksFolder);
        } else {
            addFadeAnimation(taskCard, displayCurrentFolder, object.folder);
        }
    }
    updateStorage();
}

function addFadeAnimation(taskCard, func, arg = null) {
    taskCard.classList.add("hidden600");
    document.body.style.pointerEvents = "none";
    setTimeout(() => {
        func(arg);
        document.body.style.pointerEvents = "auto";
    }, 600);
}

function addFastFadeAnimation(taskCard, func, arg = null, deleteObj = null) {
    taskCard.classList.add("hidden250");
    document.body.style.pointerEvents = "none";
    setTimeout(() => {
        func(arg);
        if (deleteObj !== null) {
            deleteObj.remove();
        }
        document.body.style.pointerEvents = "auto";
    }, 250);
}

export function deleteCard(object, taskCard) {
    allTasksArray.splice(object.id, 1);
    updateTaskIds();
    if (object.isCompleted === "true") {
        addFastFadeAnimation(taskCard, displayCompletedFolder);
    } else if (projectName.textContent === "All Tasks") {
        addFastFadeAnimation(taskCard, displayAllTasksFolder);
    } else {
        addFastFadeAnimation(taskCard, displayCurrentFolder, object.folder);
    }
    updateStorage();
}

export function deleteFolder(folderName, container) {
    const filteredFoldersArray = allFoldersArray.filter(
        (folder) => folder.name !== folderName,
    );
    allFoldersArray.length = 0;
    filteredFoldersArray.forEach((item) => allFoldersArray.push(item));

    const filteredTasksArray = allTasksArray.filter(
        (task) => task.folder !== folderName,
    );
    allTasksArray.length = 0;
    filteredTasksArray.forEach((item) => allTasksArray.push(item));
    updateTaskIds();
    if (projectName.textContent === "Completed") {
        addFastFadeAnimation(
            container,
            displayCompletedFolder,
            null,
            container,
        );
    } else if (projectName.textContent === "All Tasks") {
        addFastFadeAnimation(container, displayAllTasksFolder, null, container);
    } else {
        addFastFadeAnimation(
            container,
            displayCurrentFolder,
            allFoldersArray[allFoldersArray.length - 1].name,
            container,
        );
    }
    updateStorage();
}

const isComplete = document.querySelector("#isComplete");
const taskID = document.querySelector("#taskID");

export function editTask(task) {
    editNameInput.setAttribute("value", task.name);
    editDescription.textContent = task.description;
    editTaskDueDate.setAttribute("value", task.dueDate);
    switch (task.priority) {
        case "high":
            high.removeAttribute("selected");
            moderate.removeAttribute("selected");
            low.removeAttribute("selected");
            high.setAttribute("selected", "");
            break;
        case "moderate":
            high.removeAttribute("selected");
            moderate.removeAttribute("selected");
            low.removeAttribute("selected");
            moderate.setAttribute("selected", "");
            break;
        case "low":
            high.removeAttribute("selected");
            moderate.removeAttribute("selected");
            low.removeAttribute("selected");
            low.setAttribute("selected", "");
            break;
    }
    const option = document.querySelectorAll(`option[value="${task.folder}"]`);
    const options = document.querySelectorAll("#changeProjectFolder option");
    options.forEach((option) => option.removeAttribute("selected"));
    option[1].setAttribute("selected", "");
    isComplete.setAttribute("value", task.isCompleted);
    taskID.setAttribute("value", task.id);
    editNameInput.setSelectionRange(
        editNameInput.value.length,
        editNameInput.value.length,
    );
    editTaskModal.showModal();
}

export function updateTaskCard() {
    const formData = new FormData(editTaskForm);
    const formDataObj = Object.fromEntries(formData);
    const task = new Task(
        formDataObj.change_project_folder,
        formDataObj.edit_task_name,
        formDataObj.edit_task_description,
        formDataObj.edit_task_due_date,
        formDataObj.change_task_priority,
        formDataObj.task_id,
        formDataObj.is_complete,
    );
    allTasksArray.splice(task.id, 1, task);
    updateTaskIds();
    updateStorage();
    return task.folder;
}
