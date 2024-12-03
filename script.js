// 주요 DOM 요소 선택
const todoInput = document.getElementById("todo-input"); // 입력 필드
const addButton = document.getElementById("add-btn"); // 추가 버튼
const todoList = document.getElementById("todo-list"); // To-Do 목록

// 항목 추가 기능
addButton.addEventListener("click", () => {
  const taskText = todoInput.value.trim(); // 입력값 가져오기 (공백 제거)

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  // 새 li 요소 생성
  const newTask = document.createElement("li");
  newTask.textContent = taskText;

  // 삭제 버튼 추가
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "삭제";
  deleteButton.style.marginLeft = "10px";
  deleteButton.style.padding = "5px";
  deleteButton.style.border = "none";
  deleteButton.style.backgroundColor = "#e74c3c";
  deleteButton.style.color = "white";
  deleteButton.style.borderRadius = "3px";
  deleteButton.style.cursor = "pointer";

  // 삭제 버튼 클릭 시 항목 삭제
  deleteButton.addEventListener("click", () => {
    todoList.removeChild(newTask);
  });

  // li 요소에 삭제 버튼 추가
  newTask.appendChild(deleteButton);

  // To-Do 목록에 새 항목 추가
  todoList.appendChild(newTask);

  // 입력 필드 초기화
  todoInput.value = "";
});
