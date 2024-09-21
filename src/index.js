import "./style.css"

const newTaskBtn = document.querySelector(".newTaskBtn")
const newTaskModal = document.querySelector("#newTaskModal")
const newTaskForm = document.querySelector("#newTaskForm")

// main button event listeners

newTaskBtn.addEventListener("click", () => newTaskModal.showModal())

newTaskModal.addEventListener("click", e => {
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
  })

