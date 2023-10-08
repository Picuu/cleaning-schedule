// GET THE CURRENT MONTH
const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
const currentMonthNumber = new Date().getMonth()
const currentMonth = months[currentMonthNumber]
const mesActual = document.getElementById("mes")
mesActual.innerText = currentMonth

const monthsButtonText = document.getElementById("monthsButtonText")
monthsButtonText.innerText = currentMonth


// SHOW MONTHS MENU
const monthsMenu = document.getElementById("monthsMenu")
const showMonthsMenu = (id) => {
    monthsMenu.classList.toggle("displayed")
    // const monthsListHeight = monthsMenu.offsetHeight
    // monthsMenu.style.transform = `translateY(${monthsListHeight + 4}px)`
}


// APPEND ALL THE MONTHS TO monthsList
const monthsList = document.getElementById("monthsList")
const appendMonths = () => {
    for (const month of months) {
        const li = document.createElement("li")
        li.classList.add("months-list__item")
        li.innerText = month
        monthsList.appendChild(li)
    }
}
appendMonths()


// REPLACE monthsButtonText WITH THE CLICKED MONTH OF THE MENU
const monthsListChilds = monthsList.childNodes
for (const monthsListItem of monthsListChilds) {
    monthsListItem.addEventListener("click", (element) => {
        const clickedMonth = monthsListItem.innerText
        monthsButtonText.innerText = clickedMonth
        mesActual.innerText = clickedMonth
        showMonthsMenu()
        newTasks()
    })
}


// PUT RANDOM TASKS TO THE HOUSE GUESTS
const tasksColumns = document.getElementsByClassName("task")

const newTasks = () => {
    const tasks = ["Limpiar el baño grande", "Limpiar el baño pequeño", "Pasar la aspiradora", "Fregar el suelo"]
    
    const alreadyGivenTask = []
    for (const element of tasksColumns) {
        let task
        do {
            task = Math.floor(Math.random() * tasks.length)
        } while (alreadyGivenTask.includes(task))
        
        element.innerText = tasks[task]
        alreadyGivenTask.push(task)  
    }
}
newTasks()


// CLEAR THE TASKS
const clearTasks = () => {
    for (const element of tasksColumns) {
        element.innerText = ""
    }
}


// TOGGLE ACTIVE CLASS WHEN A CHECKBOX IS CLICKED
const checkboxClicked = (person) => {
    const taskListRow = document.getElementById(person)
    taskListRow.classList.toggle("active")
}
