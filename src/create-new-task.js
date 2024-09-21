import {newTaskForm} from "./DOM-manipulation.js"

class Task {
    static id = 1

    constructor(name, description, dueDate, priority) {
        this.name = name
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
        this.id = Task.id++
    }
  }

 export function createTaskObj() {
    const formData = new FormData(newTaskForm)
	const formDataObj = Object.fromEntries(formData)
    const task = new Task(
        formDataObj.task_name,
        formDataObj.task_description,
        formDataObj.task_due_date,
        formDataObj.task_priority
    )
    return task
  }


