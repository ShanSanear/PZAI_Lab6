//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


//Event handling, uder interaction is what starts the code execution.

const taskInput = document.getElementById("new-task");//Add a new task.
const addButton = document.getElementsByTagName("button")[0];//first button
const incompleteTaskHolder = document.getElementById("incomplete-tasks");//ul of #incomplete-tasks
const completedTasksHolder = document.getElementById("completed-tasks");//completed-tasks


//New task list item
const createNewTaskElement = function (taskString) {

    const listItem = document.createElement("li");

    //input (checkbox)
    const checkBox = document.createElement("input");//checkbx
    //label
    const inputValue = document.createElement("input");//label
    //input (text)
    const editInput = document.createElement("input");//text

    inputValue.textContent = taskString;

    //Each elements, needs appending
    checkBox.type = "checkbox";
    editInput.type = "text";
    inputValue.type = "text";

    listItem.appendChild(checkBox);
    listItem.appendChild(inputValue);
    listItem.appendChild(editInput);
    return listItem;
};


const bindTaskEvents=function(taskListItem, checkBoxEventHandler){
    console.log("bind list item events");
//select ListItems children
    const checkBox = taskListItem.querySelector("input[type=checkbox]");

    checkBox.onchange=checkBoxEventHandler;
};
const taskIncomplete=function(){
    console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incomplete-tasks.
    const listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
};
//Mark task completed
const taskCompleted=function(){
    console.log("Complete Task...");
    //Append the task list item to the #completed-tasks
    const listItem = this.parentNode;
    const ul = listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);
};
const addTask = function () {
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    const listItem = createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";

};

//Edit an existing task.

const editTask = function () {
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    const listItem = this.parentNode;

    const editInput = listItem.querySelector('input[type=text]');
    const label = listItem.querySelector("label");
    const containsClass = listItem.classList.contains("editMode");
    //If class of the parent is .editmode
    if (containsClass) {

        //switch to .editmode
        //label becomes the inputs value.
        label.innerText = editInput.value;
    } else {
        editInput.value = label.innerText;
    }
    listItem.classList.toggle("editMode");
};

//The glue to hold it all together.

//Set the click handler to the addTask function.
addButton.onclick=addTask;

//cycle over incompleteTaskHolder ul list items
let i;
//for each list item
for (i = 0; i<incompleteTaskHolder.children.length; i++){
    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

