let darkMode = localStorage.getItem("darkmode")

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