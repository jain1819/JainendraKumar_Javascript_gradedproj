//select all Elements
const todoInput = document.getElementById('todos');
const todoList = document.querySelector('.todo-list');
const addButton = document.querySelector('.add-btn');
const savebutton = document.getElementById('save-btn');
const saveIndex = document.getElementById('save-index');


//EventListeners
addButton.addEventListener('click', addTodo);
savebutton.addEventListener('click', saveTodo);

//An array to store all the to-do lists
let listArray = [];

//Functions:

// Adding items to the todo list
function addTodo() {
    let todoInputVal = todoInput.value;

    if (todoInputVal.trim() !== '') {
        let todo = localStorage.getItem("todo");

        if (todo === null) {
            listArray = [];
        }

        else {
            listArray = JSON.parse(todo);
        }

        listArray.push(todoInputVal.trim());


        localStorage.setItem("todo", JSON.stringify(listArray));
        displayTodoList();
    }
    clearInput();

    
}

//Displaying items from the Array list
function displayTodoList() {
    let todo = localStorage.getItem("todo")
    if (todo === null) {
        listArray = [];
    }

    else {
        listArray = JSON.parse(todo);
    }
    let html = '';
    listArray.forEach((list, i) => {
        html += `
        <div class="list-div row m-1 d-flex justify-content-between" style="padding:0 40px 0 0;">
            <li class="col list-unstyled d-flex align-items-center" style="font-size:18px;">${list}</li>
            <div class="row">
                <div class="col-auto d-flex align-items-center my-2 pr-2">
                <button onclick="editTodo(${i})" class="edit-btn btn-warning btn btn-lg">Edit</button>
                </div>
   
                <div class="col-auto d-flex align-items-center my-2 pr-2">
                    <button onclick="deleteTodo(${i})" class="btn-danger btn btn-lg">Delete</button>
                </div>
            </div>
        </div>`;
    });
    todoList.innerHTML = html;
}

// clear the value from the input box after adding or editing
function clearInput() {
    todoInput.value = '';
}

// Editing the item of the todo list
function editTodo(index) {
    //Setting the index of the array in the hidden input box
    saveIndex.value = index;

    let todo = localStorage.getItem("todo");
    listArray = JSON.parse(todo);
    todoInput.value = listArray[index];

    //Setting the display values of Add & Save buttons
    addButton.style.display = 'none';
    savebutton.style.display = 'block';
}

//Deleting the todo item from the list
function deleteTodo(index) {
    let todo = localStorage.getItem("todo");
    let listArray = JSON.parse(todo);
    listArray.splice(index, 1);
    localStorage.setItem("todo", JSON.stringify(listArray));
    displayTodoList();
}

//Saving the edited item from the list
function saveTodo() {
    let todo = localStorage.getItem("todo");
    let listArray = JSON.parse(todo);

    let index = saveIndex.value;
    listArray[index] = todoInput.value;

    savebutton.style.display = 'none';
    addButton.style.display = 'block';

    localStorage.setItem("todo", JSON.stringify(listArray));

    clearInput();
    displayTodoList();
}