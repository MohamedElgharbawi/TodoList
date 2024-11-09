let input = document.querySelector("input");
let btn = document.querySelector("button");
let tasks = document.getElementById("tasks");
function addTask() {
    let val = input.value.trim();
    let spans = document.querySelectorAll("span");
    let flag = true;
    for (let i = 0; i < spans.length; i++) 
        if (spans[i].innerHTML === val) {
        flag = false;
        break;
        }
    if (flag && val) {
        let parent = document.createElement("div");
        parent.className = "task";
        let span = document.createElement("span");
        let button = document.createElement("button");
        span.textContent = val;
        button.innerHTML = `<i class="far fa-trash-alt"></i>`;
        parent.append(span, button);
        tasks.appendChild(parent);
        saveValues();
        setupListeners();
        countTasks();
    }
    input.value = "";
}
btn.onclick = _ => {
    addTask();
};
function setupListeners() {
    let spans = document.querySelectorAll("span");
    spans.forEach(span => {
        span.onclick = _ => {
            span.classList.toggle("completed");
            saveValues();
            let c = document.querySelectorAll(".completed").length;
            completedTasks(c);
        };
    });
    let buttons = document.querySelectorAll("#tasks button");
    buttons.forEach(button => {
        button.onclick = _ => {
          button.parentElement.remove();
            if (button.previousElementSibling.classList.contains("completed"))
                completedTasks(window.localStorage.getItem("complete") , 1);
            
          saveValues();
          countTasks();
        };
    });
}
input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        addTask();
    }
})
function saveValues() {
    window.localStorage.setItem("lists", tasks.innerHTML);
}
function loadValues() {
    tasks.innerHTML = window.localStorage.getItem("lists") ?? "";
    setupListeners();
    countTasks();
    completedTasks(window.localStorage.getItem("complete"));
}
function completedTasks(c , C = 0) {
    let complete = document.querySelector(".complete");
    complete.innerHTML = `The Completed Task Is : ${c - C}`;
    window.localStorage.setItem("complete", c - C);
}
function countTasks() {
    let p = document.querySelector("p");
    p.innerHTML = `The Number Of Tasks Is : ${tasks.children.length}`;
}
loadValues();