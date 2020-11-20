//Get values of user inputs
let name, description, assignedTo, dueDate, status, passed;

function getValues() {
  name = document.querySelector("#name").value;
  description = document.querySelector("#description").value;
  assignedTo = document.querySelector("#assignedTo").value;
  dueDate = document.querySelector("#dueDate").value;
  status = document.querySelector("#status").value;
  passed = validateTaskForm(name, description, assignedTo, dueDate, status);
}

document.querySelector("#addItem").addEventListener("click", function () {
  getValues();

  if (passed) {
    taskManager.createTaskObject(
      name,
      description,
      assignedTo,
      dueDate,
      status
    );
  }

  document.querySelector("#form").reset();
});

//Define what button was clicked
document.addEventListener("click", function (event) {
  let button = event.target.nodeName == "BUTTON";
  if (button) {
    let clicked = event.target;
    let buttonJobId = clicked.attributes.jobId.value;
    if (buttonJobId == "delete") {
      taskManager.deleteTask(clicked);
    } else if (buttonJobId == "update") {
      taskManager.updateTask(clicked);
    }
  }
});

//Validate user inputs
function validateTaskForm(name, description, assignedTo, dueDate, status) {
  let validDes = false;
  let validName = false;
  let validAssigned = false;
  let validDue = false;
  let validStatus = false;
  let passed = false;

  if (name && name.length > 3) {
    validName = true;
  } else {
    document.querySelector("#errorName").textContent =
      "Enter valid name (must be at least 3 characters)";
  }
  if (description && description.length > 8) {
    validDes = true;
  } else {
    document.querySelector("#errorDescription").textContent =
      "Enter valid description (must be at least 8 characters)";
  }
  if (assignedTo && assignedTo.length > 3) {
    validAssigned = true;
  } else {
    document.querySelector("#errorAssigned").textContent =
      "Enter valid name (must be at least 3 characters)";
  }
  if (dueDate) {
    validDue = true;
  } else {
    document.querySelector("#errorDueDate").textContent = "Enter date";
  }
  if (status) {
    validStatus = true;
  } else {
    document.querySelector("#errorStatus").textContent = "Choose an option";
  }
  if (
    validName == true &&
    validDes == true &&
    validAssigned == true &&
    validDue == true &&
    validStatus == true
  ) {
    passed = true;
  }

  return passed;
}
//Date format function
function formatDate(date) {
  date = new Date(date);
  let dd = date.getDate();
  let mm = date.getMonth();
  let yyyy = date.getFullYear();
  date = `${dd}-${mm + 1}-${yyyy}`;
  return date;
}

class TaskManager {
  constructor() {
    this.taskArray = [];
  }
  getAllTask() {}
  getTasksWithStatus() {}
  //Creating the task objects
  createTaskObject(name, description, assignedTo, dueDate, status) {
    dueDate = formatDate(dueDate);

    this.taskArray.push({
      Name: name,
      Description: description,
      AssignedTo: assignedTo,
      DueDate: dueDate,
      Status: status,
      TaskID: `${
        taskManager.taskArray.length < 1 ? 1 : taskManager.taskArray.length + 1
      }`,
    });

    //store this array in local memory
    localStorage.setItem("tasks", JSON.stringify(taskManager.taskArray));

    //gets the last item added to the array
    let currentTask = this.taskArray[this.taskArray.length - 1];

    this.addTask(currentTask);
  }

  //Generate cards on page
  addTask(currentTask) {
    let cards = `<div class="col-md-4 start" id="${currentTask.TaskID}">
      <div class="card" style="width: 18rem;">
      <div class="card-header">
        Task
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item assigned">Assigned By:<p>${currentTask.Name}</p></li>
        <li class="list-group-item">Description:<p>${currentTask.Description}</p></li>
        <li class="list-group-item">Assigned To:<p>${currentTask.AssignedTo}</p></li>
        <li class="list-group-item">Due date:<p>${currentTask.DueDate}</p></li>
        <li class="list-group-item">Status:<p>${currentTask.Status}</p></li>
      </ul>
      <div class= "btns-container">
      <button jobId="delete" type="button" class="btn btn-dark deletebtn">Delete</button>
      <a href="#form"><button jobId="update" type="button" class="btn btn-dark updatebtn">Update</button></a>
      </div>
    </div>
    </div>`;

    let listItems = `<a href="#" class="list-group-item list-group-item-action allLists" id="${currentTask.TaskID}">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">${currentTask.AssignedTo}</h5>
        <small>${currentTask.DueDate}</small>
      </div>
      <p class="mb-1">${currentTask.Status}</p>
      </a>`;

    let cardHolder = document.querySelector("#cardHolder");
    let list = document.querySelector(".list");
    let position = "beforeend";
    cardHolder.insertAdjacentHTML(position, cards);
    list.insertAdjacentHTML(position, listItems);
  }
  //Deleting cards
  deleteTask(clicked) {
    let parent = clicked.parentNode.parentNode.parentNode.attributes.id.value;
    for (let i = 0; i < this.taskArray.length; i++) {
      if (this.taskArray[i].TaskID == parent) {
        this.taskArray.splice(i, 1);
        localStorage.setItem("tasks", JSON.stringify(taskManager.taskArray));
        clicked.parentNode.parentNode.parentNode.parentNode.removeChild(
          clicked.parentNode.parentNode.parentNode
        );
      }
    }

    let listOfTasks = document.querySelectorAll(".allLists");
    for (let i = 0; i < listOfTasks.length; i++) {
      if (listOfTasks[i].attributes.id.value == parent) {
        listOfTasks[i].remove();
      }
    }
  }
  //Updating cards
  updateTask(clicked) {
    let task = {};
    let updateTaskId =
      clicked.parentNode.parentNode.parentNode.parentNode.attributes.id.value;
    for (let i = 0; i < this.taskArray.length; i++) {
      if (this.taskArray[i].TaskID == updateTaskId) {
        task = this.taskArray[i];
      }
    }

    document.querySelector("#name").value = task.Name;
    document.querySelector("#description").value = task.Description;
    document.querySelector("#assignedTo").value = task.AssignedTo;
    document.querySelector("#status").value = task.Status;
    document.querySelector(
      "#addItem"
    ).outerHTML = `<button id="save" type="button" class="btn btn-dark">Save</button>`;

    document.querySelector("#save").addEventListener("click", function () {
      getValues();

      if (passed) {
        dueDate = formatDate(dueDate);

        task.Name = name;
        task.Description = description;
        task.AssignedTo = assignedTo;
        task.DueDate = dueDate;
        task.Status = status;

        localStorage.setItem("tasks", JSON.stringify(taskManager.taskArray));
        location.reload();
      }
    });
  }
}

let taskManager = new TaskManager();

let data = localStorage.getItem("tasks");
if (data) {
  taskManager.taskArray = JSON.parse(data);
  populatePage(taskManager.taskArray);
} else {
  taskManager.taskArray = [];
}

function populatePage(array) {
  for (let i = 0; i < array.length; i++) {
    taskManager.addTask(array[i]);
  }
}
