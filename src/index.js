//Clean up and create different modules
//Rename variables
//Allow for different to do collections to be added


//IN PROGRESS
//Trying to change the listed cards based on the selected project
//renderProjects - 
//addProjects
//renderToDo - Needs to render the correseponsing cards based on the project selected

//Project saving needs to happen when 
    //changing projects,
    //creating new projects


//Global Variables
let stagingProject = "Default";

//Factory Function
const projects = [];
const projectsFactory = (title, toDoList) => {
    return {title, toDoList}
}
let toDoListArray = [];
const toDoListFactory = (title, description, priority, dueDate) => {
    return {title, description, priority, dueDate}
};

//TEST
const testToDo = toDoListFactory("Title", "Description", "Priority", "Due Date")
toDoListArray.push(testToDo);
const testProject = projectsFactory("VLCEHH", toDoListArray);
projects.push(testProject);


//Render Projects

const renderProjects = (function() {
    const sideMenu = document.getElementById("projects");
    sideMenu.innerHTML = "";
    for(project in projects) {
        const thisProject = document.createElement("li");
        thisProject.innerHTML = projects[project].title;
        sideMenu.append(thisProject);
    }

    // //TESTING
    // if(stagingProject === "Default") {
    // }else {
    //     const stagedProject = document.createElement("li");
    //     stagedProject.innerHTML = stagingProject;
    //     sideMenu.append(stagedProject);
    // }
    
    const addProjectDiv = document.createElement("div");
    addProjectDiv.setAttribute("id", "addProjectForm");

    const inputProject = document.createElement("input");
    inputProject.setAttribute("type", "text");
    inputProject.setAttribute("value", "");
    inputProject.setAttribute("id", "newProjectName");

    const submitInput = document.createElement("input");
    submitInput.setAttribute("type", "submit");
    submitInput.setAttribute("value", "+");
    submitInput.addEventListener("click", addProject);

    addProjectDiv.append(inputProject, submitInput);

    sideMenu.append(addProjectDiv);
});

//Add Project
//Maybe need a staging string to hold onto before switching or adding project


//YOU ARE WORKING ON THE PROBLELM WITH ADDING PROJECTS!!!!!!!!
//
//
// 
// 

const addProject = (function() {
    //Save the cards
    const addedProject = projectsFactory(stagingProject, toDoListArray);
    projects.push(addedProject);

    //TEST
    console.log(projects);
    
    //Stage the new project
    toDoListArray = [];
    stagingProject = document.getElementById("newProjectName").value;

    renderToDo();
    renderProjects();
})




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
    renderProjects();
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