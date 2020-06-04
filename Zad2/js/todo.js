const taskInput = document.getElementById("new-task");//Add a new task.
const addButton = document.getElementsByTagName("button")[0];//first button
const incompleteTaskHolder = document.getElementById("incomplete-tasks");//ul of #incomplete-tasks
const completedTasksHolder = document.getElementById("completed-tasks");//completed-tasks

const createNewTaskElement = function (taskString) {

    const listItem = document.createElement("li");
    const checkBox = document.createElement("input");//checkbx
    const label = document.createElement("label");//label
    const editInput = document.createElement("input");//text
    const editButton = document.createElement("button");//edit button
    const deleteButton = document.createElement("button");//delete button

    label.innerText = taskString;

    checkBox.type = "checkbox";
    editInput.type = "text";
    editInput.addEventListener("keydown", function(event) {
        if (event.key === 'Enter') {
            editButton.click();
        }
    });
    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
};


const taskIncomplete = function () {
    console.log("Incomplete Task...");
    const listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
};
const taskCompleted = function () {
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    const listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

};
const addTask = function () {
    if (taskInput.value === "") {
        return;
    }
    //Create a new list item with the text from the #new-task:
    const listItem = createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";

};

const editTask = function () {
    console.log("Edit Task...");
    const listItem = this.parentNode;

    const editInput = listItem.querySelector('input[type=text]');
    const editButton = listItem.querySelector(".edit");
    const label = listItem.querySelector("label");
    const containsClass = listItem.classList.contains("editMode");
    if (containsClass) {
        label.innerText = editInput.value;
        editButton.innerText = "Edit";

    } else {
        editInput.value = label.innerText;
        editButton.innerText = "Save";
    }
    listItem.classList.toggle("editMode");
};


const deleteTask = function () {
    console.log("Delete Task...");
    const listItem = this.parentNode;
    const ul = listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);
};


addButton.onclick = addTask;
taskInput.addEventListener("keydown", function(event) {
    if (event.key === 'Enter') {
        addButton.click();
    }
});

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    console.log("bind list item events");
    const checkBox = taskListItem.querySelector("input[type=checkbox]");
    const editButton = taskListItem.querySelector("button.edit");
    const deleteButton = taskListItem.querySelector("button.delete");

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}

let i;
for (i = 0; i < incompleteTaskHolder.children.length; i++) {
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}