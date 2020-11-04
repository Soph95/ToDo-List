 document.querySelector("#addItem").addEventListener("click", function() {
  let name = document.querySelector("#name").value;
  let description = document.querySelector("#description").value;
  let assignedTo = document.querySelector("#assignedTo").value;
  let dueDate = document.querySelector("#dueDate").value;
  let status = document.querySelector("#status").value;

  
  // let dueDate = new Date(); 
  // let options = {weekday :"long", month :"short", day:"numeric"}; 
  // duedate = dueDate.toLocaleDateString("en-US", options); 
  


    let passed = validateTaskForm(name, description, assignedTo, dueDate, status);
    if(passed == true){
      taskManager.addTask(name, description, assignedTo, dueDate, status);
    }

    document.querySelector("#form").reset();
    
    //console.log(name)
});

document.addEventListener("click", function(event) {
  let clicked = event.target;
 taskManager.deleteTask(clicked)
}); 

function validateTaskForm(name, description, assignedTo, dueDate, status) {
  let validDes = false; 
  let validName = false; 
  let validAssigned = false; 
  let validDue = false; 
  let validStatus = false; 
  let passed = false; 

  if (name && name.length > 8) { 
    validName = true; 
  } else {
   document.querySelector("#errorName").textContent = "Enter valid name";
  }
  if (description && description.length > 20) {
    validDes = true; 
  } else {
  document.querySelector("#errorDescription").textContent = "Enter valid description";
 } 
 if (assignedTo && assignedTo.length > 8) {
     validAssigned = true; 
 } else {
  document.querySelector("#errorAssigned").textContent = "Enter valid name";
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
 if (validName == true && validDes == true && validAssigned == true 
  && validDue == true && validStatus == true) {
      passed = true; 
 }

 return passed;
 
};



class TaskManager {
  constructor(array) {
    this.taskArray = array;
  } 
    getAllTask() {

    }
    getTasksWithStatus() {

    }

    addTask(name, description, assignedTo, dueDate, status) {
      this.taskArray.push({ 
        "Name": name, 
        "Description": description, 
        "AssignedTo": assignedTo,
        "DueDate": dueDate,
        "Status": status,
        "TaskID": `${taskManager.taskArray.length < 1 ? 1: taskManager.taskArray.length+1}`
      });

      //store this array in local memory 
      localStorage.setItem("tasks", JSON.stringify(taskManager.taskArray));
       return taskManager.taskArray;
      //console.log(this.taskArray);
      let currentTask = this.taskArray[this.taskArray.length-1];
      //console.log(currentTask);
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
      <button id="delete" job=deleteCard type="button" class="btn btn-primary">Delete</button>
    </div>
    </div>`

    let listItems = `<a href="#" class="list-group-item list-group-item-action" id="${currentTask.TaskID}">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">${currentTask.AssignedTo}</h5>
        <small>${currentTask.DueDate}</small>
      </div>
      <p class="mb-1">${currentTask.Status}</p> 
      </a>`

    let cardHolder = document.querySelector("#cardHolder");
    let list = document.querySelector(".list"); 
    let position = "beforeend"; 
    cardHolder.insertAdjacentHTML(position, cards);
    list.insertAdjacentHTML(position, listItems); 

  }


    deleteTask(clicked) {
      
  let parent = clicked.parentNode.parentNode.attributes.id.value; 
    for (let i = 0; i < this.taskArray.length; i++) {
         if (this.taskArray[i].TaskID == parent) {
          this.taskArray.splice(i,1); 
          clicked.parentNode.parentNode.parentNode.removeChild(clicked.parentNode.parentNode)

         }
        }

       
        let deleteLists = document.querySelectorAll("a"); 
    for (let i = 0; i < deleteLists.length; i++) {
      if (deleteLists[i].attributes.id.value == parent) {
        deleteLists[i].remove(); 
  }

 }
  

    }
    
    
    updateTask() {

    }
    assignTask() {

    }
  
  
  };

  let array = []; 
  let taskManager = new TaskManager(array); 
  
  let data = localStorage.getItem("tasks");

if(data){
    taskManager.taskArray = JSON.parse(data);
    populatePage(taskManager.taskArray)
} else {
  taskManager.taskArray = [];
}


function populatePage(array){
    for(let i=0; i < array.length; i++){
        taskManager.addTask(array[i]);
    }
}
 
  
  
     
  //  //let clicked = event.target.id;

  //  if (clicked == "delete") {
  //   for (let i = 0; i < this.taskArray.length; i++) {
  //          let start = document.querySelectorAll(".start");
  //         let startid = start[i].attributes.id.value;
  //          //console.log(start)
              //console.log(startid)
  //      if (this.taskArray[i].TaskID  == startid) {
  //              this.taskArray.splice(i,1); 
  //              start.parentNode.removeChild(start); 
       
  //        }
  //      }