let darkMode = localStorage.getItem("darkmode")
const darkModeSVG = document.querySelector("#Layer_1")
const header = document.querySelector("#header")
const lightBackground1 = document.querySelector("#visual1")
const darkBackground1 = document.querySelector("#visual2")

const darkModeBtn = document.querySelector(".darkModeToggle")

function enableDarkMode() {
    document.body.classList.add("darkmode")
    localStorage.setItem("darkmode", "enabled")
}

function disableDarkMode() {
    document.body.classList.remove("darkmode")
    localStorage.setItem("darkmode", "disabled")
}

if (darkMode === "enabled") {
    enableDarkMode()
}

darkModeBtn.addEventListener("click", () => {
    darkMode = localStorage.getItem("darkmode")
    if (darkMode !== "enabled") {
        enableDarkMode()
    } else {
        disableDarkMode()
    }
})