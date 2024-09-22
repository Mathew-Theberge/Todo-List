import {createTaskObj} from "./create-new-task.js"

export const newTaskBtn = document.querySelector(".newTaskBtn")
export const newTaskModal = document.querySelector("#newTaskModal")
export const newTaskForm = document.querySelector("#newTaskForm")
export const content = document.querySelector("#content")
export const allTasksBtn = document.querySelector(".allTasksBtn")
export const allTasksElement = document.querySelector(".allTasks")

function closeModal(modal, form) {
    modal.close()
    form.reset()
}

export function renderTaskObj(project) {
    const taskObj = createTaskObj()

    const taskCard = document.createElement("div")
    const radio = document.createElement("input")
    const name = document.createElement("div")
    const description = document.createElement("div")
    const dueDate = document.createElement("div")
    const deleteBtn = document.createElement("button")
    const container = document.createElement("div")

    taskCard.classList.add("taskCard")
    radio.setAttribute("type", "radio")
    name.textContent = taskObj.name
    description.textContent = taskObj.description
    dueDate.textContent = taskObj.dueDate
    deleteBtn.textContent = "X"
    container.classList.add("container")

    switch (taskObj.priority) {
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

    // event listeners for the interactive parts of the task

    deleteBtn.addEventListener("click", () => taskCard.remove())

    container.append(name, description, dueDate)
    taskCard.append(radio, container, deleteBtn)
    project.append(taskCard)

    closeModal(newTaskModal, newTaskForm)
    console.log(taskObj)
}

export function closeModalOnOutsideClick(e) {
    const dialogDimensions = newTaskModal.getBoundingClientRect()
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
    newTaskModal.close()
    newTaskForm.reset()
    }
}

