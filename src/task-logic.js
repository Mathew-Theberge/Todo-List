import {newTaskForm} from "./DOM-manipulation.js"
import { updateStorage } from "./index.js"

export const allTasksArray = []

export class Task {

    constructor(folder, name, description, dueDate, priority, id, isCompleted) {
        this.folder = folder
        this.name = name
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
        this.id = id
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
        null,
        "false"
    )
    allTasksArray.push(task)
    updateTaskIds()
    updateStorage()
  }

  if (localStorage.length === 0) {
    const defaultTask = new Task("Default Folder", "Create first task", "Use the first menu button to create a new task.", "2025-10-05", "high", 0, "false")
    const darkMode = new Task("Default Folder", "Test Darkmode", "Click the button in the top right to toggle darkmode.", "2025-11-02", "moderate", 1, "false")
    const basicFeatures = new Task("Default Folder", "Test basic features", "You can try creating new projects completeing or deleteing tasks.", "2025-11-24" ,"moderate", 2, "false")
    const taskPriority = new Task("Default Folder", "Learn task priority", "Task cards are color coated based on level of priority.", "2025-12-25", "low", 3, "false")
    allTasksArray.push(defaultTask, darkMode, basicFeatures, taskPriority)
}




