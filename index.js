const monthsNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
const tasks = ["Limpiar el baño grande", "Limpiar el baño pequeño", "Pasar la aspiradora", "Fregar el suelo"]

// GET THE CURRENT MONTH
const currentMonthNumber = new Date().getMonth()
const currentMonthName = monthsNames[currentMonthNumber]

const currentMonthElement = document.getElementById("mes")
const currentMonthButtonText = document.getElementById("monthsButtonText")

const updateMonthTextElements = (monthName) => {
    currentMonthElement.innerText = monthName
    currentMonthButtonText.innerText = monthName
}
updateMonthTextElements(currentMonthName)


// APPEND ALL THE MONTHS TO monthsList
const monthsList = document.getElementById("monthsList")

const appendMonths = () => {
    for (const month of monthsNames) {
        const li = document.createElement("li")
        li.classList.add("months-list__item")
        li.innerText = month
        li.value = month.toLowerCase()
        monthsList.appendChild(li)
    }
}
appendMonths()


// SHOW MONTHS MENU
const showMonthsMenu = () => {
    const monthsMenu = document.getElementById("monthsMenu")
    monthsMenu.classList.toggle("displayed")
}


// TOGGLE ACTIVE CLASS WHEN A CHECKBOX IS CLICKED
const checkboxClicked = (listRow) => {
    const taskListRow = document.getElementById(listRow)
    taskListRow.classList.toggle("active")
}


// CLEAR THE TASKS
const taskElements = document.getElementsByClassName("task")

const clearTasks = () => {
    for (const element of taskElements) {
        element.innerText = ""
    }
}


// PUT RANDOM TASKS TO THE HOUSE GUESTS
const newTasks = () => {
    const alreadyGivenTask = []
    for (const element of taskElements) {
        let task
        do {
            task = Math.floor(Math.random() * tasks.length)
        } while (alreadyGivenTask.includes(task))
        
        element.innerText = tasks[task]
        alreadyGivenTask.push(task)  
    }
}
newTasks()


const getXmlDocument = async () => {
    const res = await fetch("./tasks.xml")
    const xmlString = await res.text()
    const xmlDocument = new DOMParser().parseFromString(xmlString, "text/xml")
    return xmlDocument
}

const getTasksNumbers = (xmlDocument, selectedMonth) => {
    const month = xmlDocument.getElementById(selectedMonth)
    const monthTasks = month.children
    let taskNumbers = []
    for (const monthTask of monthTasks) {
        const taskNumber = monthTask.textContent
        taskNumbers.push(taskNumber)
    }
    return taskNumbers
}

const updateTasks = async (selectedMonth) => {
    selectedMonth = selectedMonth.toLowerCase()
    const xmlDocument = await getXmlDocument()
    const taskNumbers = getTasksNumbers(xmlDocument, selectedMonth)
    const userTasks = document.getElementsByClassName("task")
    for (let i=0; i<4; i++) {
        userTasks[i].innerText = tasks[taskNumbers[i]]
    }
}

// REPLACE monthsButtonText WITH THE CLICKED MONTH OF THE MENU
const monthsListChilds = monthsList.childNodes

for (const monthsListItem of monthsListChilds) {
    monthsListItem.addEventListener("click", async (element) => {
        let clickedMonth = monthsListItem.innerText

        updateMonthTextElements(clickedMonth)
        showMonthsMenu()
        
        updateTasks(clickedMonth)
    })
}
updateTasks(currentMonthName)
