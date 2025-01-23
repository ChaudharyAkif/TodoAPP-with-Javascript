// for  Toastify
function showofication(msg, type) {
  let bgColor;
  switch (type) {
    case "success":
      bgColor = "linear-gradient(to right,#1D976C,#93F9B9";
      break;
    case "error":
      bgColor = "linear-gradient(to right,#93291e,#ed213a";
      break;
    default:
    bgColor="#000"
  }

  Toastify({
    text: msg,
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: bgColor,
    },
  }).showToast();
}

const setTodosInLocalStorage = (newTodos) => {
  localStorage.setItem("todos", JSON.stringify(newTodos));
};
// for result

const showOutput = (output) => {
  document.getElementById("output").innerHTML = output;
};

// for input value

const getFieldValue = (fieldId) => {
  return document.getElementById(fieldId).value;
};
const setFieldValue = (fieldId, value) => {
  document.getElementById(fieldId).value = value;
};

// emptyinput

const emptyinput = () => {
  document.getElementById("title").value = "";
  document.getElementById("location").value = "";
  document.getElementById("description").value = "";
};

// for  randomid
const Randomid = () => {
  return Math.random().toString(36).slice(2);
};

// username change function
const askuser = () => {
  let userName;
  do {
    userName = prompt("what is your name");
  } while (userName === "" || userName == null);
  let result = userName.slice(1).toLowerCase();
  let firstTwoUpper = userName.charAt(0).toUpperCase();
  let thirthusername = firstTwoUpper + result;
  document.getElementById("username").textContent = thirthusername;
};

// onloadchange username
window.onload = () => {
  setInterval(() => {
    document.getElementById("currentTime").innerHTML = dayjs().format(
      "dddd ,  MMMM ,  DD  ,  YYYY  ,  hh : mm : ss  A"
    );
  }, 1000);
  askuser();
  document.getElementById("year").innerHTML = new Date().getFullYear();
};

// clearoutpur krna k aliya

const clearoutput = () => {
  document.getElementById("output").innerHTML = " ";
};

const handleSubmit = () => {
  event.preventDefault();

  let title = getFieldValue("title"),
    location = getFieldValue("location"),
    description = getFieldValue("description");
  title = title.trim();
  location = location.trim();
  description = description.trim();
  if (title.length < 3) {
    return showofication("please enter your title correctly ", "error");
  }
  if (location.length < 3) {
    return showofication("please enter your  location ", "error");
  }
  if (description.length < 10) {
    return showofication("please enter your  description ", "error");
  }
  let todo = { title, location, description };
  todo.id = Randomid();
  todo.dateCreate = new Date().getTime();
  todo.status = "active";

  const todos = JSON.parse(localStorage.getItem("todo")) || [];
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
  showofication("new todo is succesfully add", "success");
  showtodos();
  emptyinput();
};
const showtodos = () => {
  // clearoutput();

  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  console.log(todos);
  if (!todos.length) {
    showOutput(
      "<h5>HURRAY! No Task are available .Add a task button add your task </h5>"
    );
    return;
  }
  let startingcode = '<div class="table-responsive">  <table class="table">';
  let endingcode = "</table </div>";
  let tableHead =
    '<thead><tr><th ># </th><th scope="col">Title</th><th scope="col">Location</th><th scope="col">Description</th> <th scope="col">Action</th></tr></thead>';
  let tableBody = "";
  for (let i = 0; i < todos.length; i++) {
    let todo = todos[i];
    tableBody += `<tbody>
  <tr>
    <td>${i + 1}</td>
    <td>${todo.title}</td>
    <td>${todo.location}</td>
    <td>${todo.description}</td>
    <td>
      <button class="btn btn-sm btn-info mb-2 mb-md-0 me-0 me-md-1" data-value="${
        todo.id
      }" onclick="editTodo(event)">
        <i data-value="${todo.id}"  class="bi bi-pencil" ></i>
      </button>
    </td>
    <td>
      <button class="btn btn-sm btn-danger" data-value="${
        todo.id
      }" onclick="deleteTodo(event)">
        <i  data-value="${todo.id}"  class="bi bi-trash3" ></i>
      </button>
    </td>
  </tr>
</tbody>`;
  }
  let table =
    startingcode + tableHead + "<tbody>" + tableBody + "</tbody>" + endingcode;
  // document.getElementById("output").innerHTML = table
  showOutput(table);
  // console.log(table)
};

const editTodo = (event) => {
  let todoId = event.target.getAttribute("data-value");
  const todos = JSON.parse(localStorage.getItem("todos"));
  let todo = todos.find((todo) => {
    return todo.id === todoId;
  });

  const { title, location, description } = todo;

  setFieldValue("title", title);
  setFieldValue("location", location);
  setFieldValue("description", description);

  localStorage.setItem("todoForEdit", JSON.stringify(todo));

  document.getElementById("addTaskButton").style.display = "none";
  document.getElementById("UpdateTaskButton").style.display = "block";
};
const handleEdit = () => {
  const todoForEdit = JSON.parse(localStorage.getItem("todoForEdit"));
  let updatedtitle = getFieldValue("title");
  let updatedLocation = getFieldValue("location");
  let updatedDescription = getFieldValue("description");

  const updateTodo = {
    ...todoForEdit,
    title: updatedtitle,
    location: updatedLocation,
    description: updatedDescription,
  };
  updateTodo.dateModified = new Date().getTime();
  const todos = JSON.parse(localStorage.getItem("todos"));

  let todoAfterUpdated = todos.map((todo) => {
    if (todo.id === todoForEdit.id) return updateTodo;
    return todo;
  });
  localStorage.setItem("todos", JSON.stringify(todosAfterUpdated));
  showofication("A todo is succesfully  updated", "success");
  showtodos();
  emptyinput();
  document.getElementById("addTaskButton").style.display = "block";
  document.getElementById("UpdateTaskButton").style.display = "none";
};

const deleteTodo = (event) => {
  let todoId = event.target.getAttribute("data-value");
  const todos = JSON.parse(localStorage.getItem("todos"));

  let todosAfterDelete = todos.filter((todo) => {
    return todo.id !== todoId;
  });
  localStorage.setItem("todos", JSON.stringify(todosAfterDelete));
  showofication("A todo is succesfully  delete", "success");
  showtodos();
};
