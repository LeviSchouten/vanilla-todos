class TodoList {
  constructor() {

    this.state = {
      todo: ['dishes', 'homework', 'cook', 'naar buiten'],
      done: ['make bed'],
    }
  }

  setState(object) {
    this.state = { ...this.state, ...object };
    this.render()
  }

  generateTodoItem(item, key) {
    return `<li><h3 data-key="${key}">${item}</h3></li>`;
  }

  generateDoneItem(item, key) {
    return `<li class='done'><h3 data-key="${key}">${item}</h3><button>X</button></li>`;
  }

  generateTodoList() {
    let html = '<ul>';
    this.state.todo.forEach((todo, index) => (
      html += this.generateTodoItem(todo, index)
    ))
    this.state.done.forEach((done, index) => (
      html += this.generateDoneItem(done, index)
    ))
    html += '</ul>';
    return html;
  }

  itemToggle(item) {
    if (item.parentNode.classList.contains('done') || item.classList.contains('done')) {
      const newItem = this.state.done.splice(item.dataset.key, 1);
      const newTodo = [newItem, ...this.state.todo];
      return this.setState({ todo: newTodo });
    }
    const newItem = this.state.todo.splice(item.dataset.key, 1);
    const newDone = [newItem, ...this.state.done];
    this.setState({ done: newDone });
  }

  addClickEventsToItem() {
    const li = document.querySelectorAll('li');
    li.forEach(item => item
      .addEventListener('click', event => (
        this.itemToggle(event.target)
      )))
  }

  addTodoItem(item) {
    const newTodo = [item, ...this.state.todo];
    this.setState({ todo: newTodo });
  }

  render() {
    const div = document.querySelector('.todos')
    div.innerHTML = 'Todo:';
    div.innerHTML += this.generateTodoList()
    this.addClickEventsToItem()
  }

}

const button = document.querySelector('.submit-button');
const input = document.querySelector('.todo-title');
button.addEventListener('click', (event) => {
  event.preventDefault();
  todoList.addTodoItem(input.value);
})

const todoList = new TodoList();
console.log(todoList.render())
