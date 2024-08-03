const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const progressText = document.getElementById("progress");
const progressFill = document.getElementById("progress-fill");

function addTask() {
  // Check if the input value is empty or just spaces
  if (inputBox.value.trim() === "") {
    alert("You must write something");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);

    // Create a span for the delete (cross) icon
    let span = document.createElement("span");
    span.innerHTML = "\u00D7"; // Unicode for the cross sign
    li.appendChild(span);

    // // Add event listener for the delete action
    // span.onclick = function () {
    //   listContainer.removeChild(li);
    // };
  }
  // Clear the input box
  inputBox.value = "";
  saveData();
  updateProgress();
}

// Add event listener for "Enter" key press
inputBox.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName == "LI") {
      e.target.classList.toggle("checked");
      saveData();
      updateProgress();
    } else if (e.target.tagName == "SPAN") {
      e.target.parentElement.remove();
      saveData();
      updateProgress();
    }
  },
  false
);

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  const savedData = localStorage.getItem("data");
  if (savedData) {
    listContainer.innerHTML = savedData;
  }
  updateProgress();
}

function updateProgress() {
  const tasks = listContainer.getElementsByTagName("li");
  const totalTasks = tasks.length;
  let completedTasks = 0;

  for (let task of tasks) {
    if (task.classList.contains("checked")) {
      completedTasks++;
    }
  }

  const progress = totalTasks === 0 ? 100 : (completedTasks / totalTasks) * 100;
  progressText.textContent = `${progress.toFixed(2)}%`;
  progressFill.style.width = `${progress}%`;

  // Debugging logs
  console.log(`Total tasks: ${totalTasks}`);
  console.log(`Completed tasks: ${completedTasks}`);
  console.log(`Progress: ${progress}%`);
}

// Call showTask to initialize the progress bar
showTask();
