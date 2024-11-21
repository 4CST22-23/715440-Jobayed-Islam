const inputBox = document.getElementsByClassName("input-box")[0];
const submitButton = document.getElementsByClassName("submit-button")[0];
const toDoList = document.getElementsByClassName("to-do-list")[0];
const clearCompletedButton = document.getElementsByClassName(
  "clear-completed-button",
)[0];
const boxUnchecked = "./images/circle-regular.png";
const boxChecked = "./images/circle-check-solid.png";

submitButton.addEventListener("click", () => {
  if (inputBox.value !== "") {
    addItem();
  }
});

inputBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && inputBox.value !== "") {
    addItem();
  }
});

function addItem() {
  let li = document.createElement("li");

  let img = document.createElement("img");
  img.classList.add("checkbox");
  img.src = boxUnchecked;
  li.appendChild(img);

  let label = document.createElement("label");
  label.innerText = inputBox.value;
  label.classList.add("list-label");
  li.appendChild(label);

  let button = document.createElement("button");
  button.classList.add("delete-button");
  button.innerText = "\u00d7";
  li.appendChild(button);

  toDoList.appendChild(li);
  inputBox.value = "";
  saveData();
}

function saveData() {
  localStorage.setItem("toDoData", toDoList.innerHTML);
}

function retriveData() {
  toDoList.innerHTML = localStorage.getItem("toDoData");
}

function toggleCompletedButton() {
  if (document.querySelectorAll(".label-checked").length > 0) {
    if (clearCompletedButton.classList.contains("hidden")) {
      clearCompletedButton.classList.remove("hidden");
    }
  } else {
    clearCompletedButton.classList.add("hidden");
  }
}

function toggleCheckBox(parent) {
  let checkbox = parent.children[0];
  if (checkbox.classList.contains("checked")) {
    checkbox.src = boxUnchecked;
    checkbox.classList.remove("checked");
  } else {
    checkbox.src = boxChecked;
    checkbox.classList.add("checked");
  }
  saveData();
}

function toggleLabel(parent) {
  let label = parent.children[1];
  label.classList.toggle("label-checked");
  toggleCompletedButton();
  saveData();
}

toDoList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-button")) {
    e.target.parentElement.remove();
    toggleCompletedButton();
    saveData();
    return;
  }

  if (e.target.tagName.toLowerCase() === "li") {
    toggleCheckBox(e.target);
    toggleLabel(e.target);
  } else if (e.target.parentElement.tagName.toLowerCase() === "li") {
    toggleCheckBox(e.target.parentElement);
    toggleLabel(e.target.parentElement);
  }
});

toDoList.addEventListener("mousemove", () => {
  if (toDoList.childNodes.length > 0) {
    toDoList.classList.add("custom-scroll");
    setTimeout(() => {
      toDoList.classList.remove("custom-scroll");
    }, 2000);
  }
});

retriveData();

clearCompletedButton.addEventListener("click", () => {
  document.querySelectorAll(".label-checked").forEach((item) => {
    item.parentElement.remove();
  });
  saveData();
});

toggleCompletedButton();

console.log(
  `Made by Jobayed Islam \n4CST-1\nRoll: 715440\nBogura Polytechnic Institute.`,
);
