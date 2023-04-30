const toDoForm = document.getElementById("todo-form");
const toDoInpute = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

const TODOKEY = "todos";

let toDos = []; // todo 저장할 배열생성

function saveTodos() {
  localStorage.setItem(TODOKEY, JSON.stringify(toDos));
} //로컬스토리지에 키와 문자열로 변환된 배열 저장

function deleteToDo(event) {
  const li = event.target.parentElement; //삭제할 대상은  상위태그이다.
  li.remove(); // 삭제
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveTodos();
}

function paintToDo(newTodo) {
  const li = document.createElement("li"); // 리스트생성
  li.id = newTodo.id;
  const span = document.createElement("span"); // 스팬 생성
  span.innerText = newTodo.text; // 적용받은 값 을 스팬에 innerText로 넣기
  const button = document.createElement("button");
  button.innerText = "❌";
  button.addEventListener("click", deleteToDo);
  li.appendChild(span); //  리스트 안에 넣기
  li.appendChild(button);
  toDoList.appendChild(li); // 리스트를  ul에 넣기
}

function handleSubmit(event) {
  event.preventDefault(); // 디폴트로 새로고침 막기
  const newTodo = toDoInpute.value; // 입력값 저장
  toDoInpute.value = ""; // 입력창 비우기
  const newTOdoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTOdoObj); //배열에 뉴투두 밀어넣게
  paintToDo(newTOdoObj); // paintodo 함수에 입력값 적용
  saveTodos(); //실행
}

toDoForm.addEventListener("submit", handleSubmit);

const savedTodos = localStorage.getItem(TODOKEY); //저장된 배열을 가저오는 변수선언

if (savedTodos !== null) {
  //변수에 값이 저장되있으면
  const parseTodo = JSON.parse(savedTodos); // 문자열된 배열을 숫자형으로변형해서 변수에 저장
  toDos = parseTodo; //빈 배열에 저장했던 값 옮기기
  parseTodo.forEach(paintToDo); //숫자로 변형된 값을다 찍어내기
}
