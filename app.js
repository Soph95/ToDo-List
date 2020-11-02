document.querySelector("#addItem").addEventListener("click", function() {
    let name = document.querySelector("#name").value;
    let description = document.querySelector("#description").value;
    let assignedTo = document.querySelector("#assignedTo").value;
    let dueDate = document.querySelector("#dueDate").value;
    let status = document.querySelector("#status").value;

  
    let validDes = false; 
    let validName = false; 
    let validAssigned = false; 
    let validDue = false; 
    let validStatus = false; 
    let passed = false; 

        if(name && name.length > 8) { 
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
       if (validName, validDes, validAssigned, validDue, validStatus == true) {
            passed = true; 
       };
    });

    let row = document.querySelector(".row");
    //make json next 
    let task = {
        name: name, 
        description: description, 
        assignedTo: assignedTo,
        dueDate: dueDate,
        status: status
    }

    let cards = `<div class="col-md-4">
    <div class="card" style="width: 18rem;">
    <div class="card-header">
      Task
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item assigned">Assigned To:<p>${name}</p></li>
      <li class="list-group-item">Assigned By:<p>${description}</p></li>
      <li class="list-group-item">Due date:<p>${assignedTo}</p></li>
      <li class="list-group-item">Status:<p>${dueDate}</p></li>
      <li class="list-group-item">Description:<p>${status}</p></li>
    </ul>
  </div>
  </div>`
       
       function addTask() {
        task = JSON.stringify(task);
        console.log(task)
        let position = ""
        if (passed == true) {
            row.insertAdjacentHTML(position, cards)
        }

        


        class TaskManager {
            constructor() {}
                taskArray = []; 
                getAllTask() {}
                getTasksWithStatus() {}
                addTask(task) {}
                deleteTask() {}
                updateTask() {}
                assignTask() {}
            }; 


        



    
        
  
    //  TaskManager.taskArray.push(userInput);
    //  console.log(TaskManager.taskArray);
    
    }
  





// if (passed == true) {
//     `<div class="card card1" style="width: 18rem;">
//     <div class="card-header">
//       Task
//     </div>
//     <ul class="list-group list-group-flush">
//       <li class="list-group-item assigned">Assigned To:<p></p></li>
//       <li class="list-group-item">Assigned By:<p></p></li>
//       <li class="list-group-item">Due date:<p></p></li>
//       <li class="list-group-item">Status:<p></p></li>
//       <li class="list-group-item">Description:<p></p></li>
//     </ul>
//   </div>`