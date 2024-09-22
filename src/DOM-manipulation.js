import {createTaskObj} from "./create-new-task.js"
import { createProjectObj, displayCurrentProject, setCurrentProject} from "./project-logic.js"

export const newTaskBtn = document.querySelector(".newTaskBtn")
export const newTaskModal = document.querySelector("#newTaskModal")
export const newTaskForm = document.querySelector("#newTaskForm")
export const content = document.querySelector("#content")
export const allTasksBtn = document.querySelector(".allTasksBtn")
export const allTasksElement = document.querySelector(".allTasks")
export const newProjectModal = document.querySelector("#newProjectModal")
export const newProjectForm = document.querySelector("#newProjectForm")
export const taskCancelBtn = document.querySelector(".taskCancelBtn")
export const projectCancelBtn = document.querySelector(".projectCancelBtn")
export const newProjectBtn = document.querySelector(".newProjectBtn")
export const sidebar = document.querySelector("#sidebar")

export function exitModal(modal, form) {
    modal.close()
    form.reset()
}

export function renderTaskObj(e, project) {
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
    const clone = taskCard.cloneNode(true)
    allTasksElement.append(clone)
    if (project.currentProject !== allTasksElement) {
        project.currentProject.append(taskCard)
    }

    // event listeners for the interactive parts of the task

    deleteBtn.addEventListener("click", () => {
        clone.remove()
        taskCard.remove()
    })
    clone.addEventListener("click",() => {
        clone.remove()
        taskCard.remove()
    })

    exitModal(newTaskModal, newTaskForm)
}

export function renderProjectBtns(e) {
    e.preventDefault()
    const project = createProjectObj()

    const container = document.createElement("div")
    const projectBtn = document.createElement("button")
    const deleteBtn = document.createElement("button")
    const projectElement = document.createElement("div")

    projectBtn.textContent = project.name
    deleteBtn.textContent = "X"
    projectElement.classList.add(`${project.name}`)

    container.append(projectBtn, deleteBtn)
    sidebar.append(container)
    content.append(projectElement)

    // event listener logic

    deleteBtn.addEventListener("click", () => {
        container.remove()

        // this code is here to make sure if a project list is deleted
        // all of the todos / tasks that belong to that project
        // also get deleted in the all Tasks folder
        const projectElementChildren = Array.from(projectElement.children)
        const allTasksElementChildren = Array.from(allTasksElement.children)
        projectElementChildren.forEach( (element) => {
            allTasksElementChildren.forEach((element2) => {
                if(element.isEqualNode(element2)) {
                    element2.remove()
                }
            })
        })

        projectElement.remove()
    })

    projectBtn.addEventListener("click", () => {
        setCurrentProject(projectElement)
        displayCurrentProject(projectElement)
    })

    exitModal(newProjectModal, newProjectForm)
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


