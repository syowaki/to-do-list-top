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
var modal = document.getElementById("addToDo");
const addToDoPopup = (function() {

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";

});
const closePopup = (function() {
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
    closePopup();
    renderToDo();
})

//Delete toDo from array
function deleteToDo(event) {
    //Gets position from indexNumber prarameter
    toDoListArray.splice(event.currentTarget.indexNumber, 1);
    renderToDo();
}

const detailsModal = document.getElementById("detailsWindow");
//Expand Project Details
const projectDetails = (function(event) {
    const details = document.getElementById("toDoDetails");
    details.innerHTML = "";

    const selectedToDo = event.currentTarget.indexNumber;
    console.log(toDoListArray[selectedToDo]);
    
    const detailedTitle = document.createElement("h1");
    detailedTitle.innerHTML = toDoListArray[selectedToDo].title;

    const detailedDescription = document.createElement("h3");
    detailedDescription.innerHTML = toDoListArray[selectedToDo].description;

    const detailedClose = document.createElement("span");
    detailedClose.setAttribute("class", "close");
    detailedClose.addEventListener("click", () => detailsModal.style.display = "none")
    detailedClose.innerHTML = "X"

    details.append(detailedTitle, detailedDescription, detailedClose)
    
    detailsModal.style.display = "block";
})


//Render the array
const renderToDo = (function() {
    const cardMenu = document.getElementById("card-menu");
    cardMenu.innerHTML = "";
    let position = 0;
    for (let toDo in toDoListArray) {
        const cardDiv = document.createElement("div");
        cardDiv.setAttribute("class", "card");
        cardDiv.addEventListener("click", projectDetails)
        cardDiv.indexNumber = position;

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

        const divDeleteButton = document.createElement("div")
        divDeleteButton.setAttribute("class", "delete-button-div");
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML  = "Delete";
        deleteButton.addEventListener("click", deleteToDo);

        //Keep track of index number of cards for delete
        deleteButton.indexNumber = position;
        position ++;

        divDeleteButton.append(deleteButton)

        cardButtons.append(priorityButton, dueDateButton, divDeleteButton);
        
        cardDiv.append(cardTitle, cardDescription, cardButtons);

        document.getElementById("card-menu").append(cardDiv);
    }
});

renderToDo();