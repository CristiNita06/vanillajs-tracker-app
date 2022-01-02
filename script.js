//Grabing the HTML FORM
const html_tracker = document.querySelector('#tracker-form');
const html_table = document.querySelector('#task-table');

//Class Task
class Task {
    constructor(task, details, date, code){
        this.task = task;
        this.details = details;
        this.date = date;
        this.code = code;
    }
}

//Class UI

class UI {

    //Displaying items

    static displayTasks (){
        const tasks = Storage.getLocalStorage();
        tasks.forEach( (task) => {
            console.log(task)
            UI.displayRecords(task);
        } )
    }

    static displayRecords(task) {
        
    }

    //Adding a Row
    static addRow () {
        let html_task = document.querySelector('#task').value;
        let html_details = document.querySelector('#details').value;
        let html_date = document.querySelector('#date').value;

        const table = document.querySelector('#task-table');
        const newItem = document.createElement('tr');

        //Checking for the input not to be null / empty
        if (html_task == "" || html_details == "" || html_date == ""){

            UI.alert("Denied");

            return 1;

        } else {
            table.appendChild(newItem);
            let code = Math.floor((Math.random() * 10000) + 1)
            newItem.innerHTML = `<td>${html_task}</td><td>${html_details}</td><td>${html_date}</td><td class="delete bg-danger text-center"><i class="fas fa-trash-alt"></i></td><td id="code"class="d-none">${code}</td>`;
            
            UI.alert("Accepted");
            return 2;
        }

    };

    //Checking to see if the click is on Trash or on the cell
    static deleteRow (target) {
        if (target.classList[0] == "delete"){
            target.parentElement.remove();
            UI.alert("Deleted")
        } else if (target.classList[0] == "fas"){
            target.parentElement.parentElement.remove();
            UI.alert("Deleted")
        }
    };

    static clearFields () {
        document.querySelector('#task').value = "";
        document.querySelector('#details').value = "";
        document.querySelector('#date').value = "";
    };

    static alert(status){
        const newAlert = document.createElement("div");
        const node = document.querySelectorAll('.form-group')[0];
        html_tracker.insertBefore(newAlert, node);
        
        const clearAlert = () => {setTimeout( () => {
            newAlert.remove();
        }, 2000 );}

        if (status == "Denied"){
            
            newAlert.innerHTML = "<h5 class='text-danger'> Please fill in all the fields</h5>";
            clearAlert();

        } else if (status == "Accepted") {

            newAlert.innerHTML = "<h5 class='text-success'>Task added in the tracker</h5>";
            clearAlert();

        } else if (status == "Deleted") {

            newAlert.innerHTML = "<h5 class='text-success'>Task deleted</h5>";
            clearAlert();
        }

    }

};

//Class Local Storage
class Storage {
    
    static getLocalStorage(){
        let task;
        if (localStorage.getItem('Tasks') === null){
            task = [];
        } else {
            task = JSON.parse(localStorage.getItem('Tasks'));
        }
        return task;
    }

    static addToLocalStorage(item){
        const itemList = Storage.getLocalStorage()
        itemList.push(item)
        localStorage.setItem("Tasks", JSON.stringify(itemList));
    }

    
}


document.addEventListener("DOMContentLoaded", UI.displayTasks);

html_tracker.addEventListener('submit', (e) => {
    
    e.preventDefault(); 

    let result = UI.addRow();

    if (result == 1){
        return
    } else if (result == 2) {
        let html_task = document.querySelector('#task').value;
        let html_details = document.querySelector('#details').value;
        let html_date = document.querySelector('#date').value;
        let html_code = document.querySelector('#code').textContent;
        console.log(html_code)
        const item = new Task(html_task, html_details, html_date, html_code);
    
        Storage.addToLocalStorage(item);
    
        UI.clearFields();
    
    }

});


html_table.addEventListener('click', (e) => {
    const target = e.target;

    UI.deleteRow(target);

});


