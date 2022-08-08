//to do card should be a div with all the information from object
//add to do which should be an input form
//Factory Function
const toDoListArray = [];
const toDoListFactory = (title, description, priority, dueDate) => {
    return {title, description, priority, dueDate}
};
const testToDo = toDoListFactory("Title", "Description", "Priority", "Due Date")
toDoListArray.push(testToDo);


//Popup
// Get the modal
var modal = document.getElementById("myModal");
const addToDoPopup = (function() {

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";

});
const closeAddToDo = (function() {
    modal.style.display = "none";
});
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
};

//Add toDo to array
const addToDo = (function() {
    const title = document.getElementById("addTitle").value;
    const description = document.getElementById("addDescription").value;
    const priority = document.getElementById("addPriority").value;
    const dueDate = document.getElementById("addDueDate").value;
    const newToDo = toDoListFactory(title, description, priority, dueDate);
    toDoListArray.push(newToDo);
    closeAddToDo();
    renderToDo();
})


//Render the array
const renderToDo = (function() {
    const cardMenu = document.getElementById("card-menu");
    cardMenu.innerHTML = "";
    for (let toDo in toDoListArray) {
        const cardDiv = document.createElement("div");
        cardDiv.setAttribute("class", "card");

        const cardTitle = document.createElement("h4");
        cardTitle.innerHTML = toDoListArray[toDo].title;

        const cardDescription = document.createElement("p");
        cardDescription.innerHTML = toDoListArray[toDo].description;

        const cardButtons = document.createElement("div");
        cardButtons.setAttribute("class", "card-buttons");

        const priorityButton = document.createElement("div");
        priorityButton.setAttribute("class", "priority-button");
        priorityButton.innerHTML = toDoListArray[toDo].priority;

        const dueDateButton = document.createElement("div");
        dueDateButton.setAttribute("class", "due-date-button");
        dueDateButton.innerHTML = toDoListArray[toDo].dueDate;

        cardButtons.append(priorityButton, dueDateButton);
        
        cardDiv.append(cardTitle, cardDescription, cardButtons)

        document.getElementById("card-menu").append(cardDiv);

    }
});

renderToDo();