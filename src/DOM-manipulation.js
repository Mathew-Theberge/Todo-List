import {createTaskObj} from "./create-new-task"

export const newTaskBtn = document.querySelector(".newTaskBtn")
export const newTaskModal = document.querySelector("#newTaskModal")
export const newTaskForm = document.querySelector("#newTaskForm")
export const content = document.querySelector("#content")

export function renderTaskObj(e) {
    e.preventDefault()
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

    container.append(name, description, dueDate)
    taskCard.append(radio, container, deleteBtn)
    content.append(taskCard)

    newTaskModal.close()
    newTaskForm.reset()
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

