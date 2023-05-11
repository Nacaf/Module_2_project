//Manage Task List
class TaskList {
  constructor() {
    window.addEventListener("load", this.addTask);
    document.querySelector(".button").addEventListener("click", this.addTask);
    document.querySelector(".add-task").addEventListener("keyup", (event) => {
      if (event.key === "Enter") this.addTask();
    });

    this.taskListBlock = document.querySelector(".list");
    this.listOfTasks = this.taskListBlock.children;
    this.sortIcon = document.querySelector(".sort");
    this.sortIcon.addEventListener("click", this.sortList);
    this.sorted = false;
  }                                          

  //Add tasks in list
  addTask = () => {
    const task = new Task(this.taskListBlock); //səhifədə qeydə alınmış məlumatları saxlayan obyekt yaradıriq
    this.value = task.value;
    this.taskListBlock.append(this.generateTaskLine(this.value));
    this.taskListBlock.lastElementChild.querySelector(".task").focus(); //sonuncu elemente fokuslaniriq
  };

  generateTaskLine(value) {
    const taskBlock = document.createElement("div");
    const dragPoint = document.createElement("div"); 
    const inputLine = document.createElement("input");
    const cancelTask = document.createElement("div");

    taskBlock.classList.add("input");
    dragPoint.classList.add("drag");
    inputLine.classList.add("task");
    
    inputLine.name = "task";
    inputLine.value = value;
    cancelTask.classList.add("cancel-task");

    cancelTask.addEventListener("click", (event) => this.deleteTaskLine(event));

    taskBlock.append(dragPoint);
    taskBlock.append(inputLine);
    taskBlock.append(cancelTask);

    return taskBlock;
  }

  //Sorted Lists
  sortList = () => {
    this.sortIcon.classList.toggle("sorted");
    let sortedArray = [...this.listOfTasks].sort(callBackSort); //sıralanmış siyahı
    function callBackSort(a, b) {
      //elementləri düzgün çeşidləmək üçün geri çağırış funksiyası
      a = a.children[1].value;
      b = b.children[1].value;
      if (!isNaN(a) && !isNaN(b)) return a - b;
      else return a.localeCompare(b);
    }

    if (this.sorted === true) {
      sortedArray = sortedArray.reverse();
    }
    const sortedList = document.createElement("div");
    sortedList.classList.add("list");
    sortedArray.forEach((element) => sortedList.append(element)); //çeşidlənmiş siyahı list-ə daxil edilir
    this.taskListBlock.replaceWith(sortedList);
    this.taskListBlock = sortedList;
    this.listOfTasks = this.taskListBlock.children;
    this.sorted = !this.sorted;
  };

  //Remove Tasks
  deleteTaskLine = (e) => {
    const element = e.target.parentNode;
    if (element.parentNode.children.length > 1) element.remove();
  };
}
class Task {
  constructor(taskData) {
    this.value = "";
    if (taskData.children.length > 0) {
      this.value = taskData.lastElementChild.value || "";
    }
  }
}

new TaskList();
