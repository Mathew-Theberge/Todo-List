import {newTaskForm} from "./DOM-manipulation.js"
import { updateStorage } from "./index.js"

export const allTasksArray = []

class Task {

    constructor(folder, name, description, dueDate, priority, isCompleted) {
        this.folder = folder
        this.name = name
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
        this.id = null
        this.isCompleted = isCompleted
    }
  }

  export function updateTaskIds() {
    let number = 0
    allTasksArray.forEach((task) => {
        task.id = number
        number++
    })
  }

 export function createTaskObj() {
    const formData = new FormData(newTaskForm)
	const formDataObj = Object.fromEntries(formData)
    const task = new Task(
        formDataObj.project_folder,
        formDataObj.task_name,
        formDataObj.task_description,
        formDataObj.task_due_date,
        formDataObj.task_priority,
        false
    )
    allTasksArray.push(task)
    updateTaskIds()
    updateStorage()
  }

  if (localStorage.length === 0) {
    const defaultTask = new Task("Default Folder", "Default Name", "A basic description for the task", "2025-10-05", "high", false)
    allTasksArray.push(defaultTask)
}




