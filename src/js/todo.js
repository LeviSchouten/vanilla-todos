class TodoList {
  constructor() {

    this.state = {
      todo: localStorage.getItem('todo')
        ? localStorage.getItem('todo').split(',')
        : [],
      done: localStorage.getItem('done')
        ? localStorage.getItem('done').split(',')
        : [],
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
    return `<li class='done'><h3 data-key="${key}">${item}</h3><p><i class="fas fa-times"></i></p></li>`;
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
    const newDone = [...this.state.done, newItem];
    this.setState({ done: newDone });
  }

  addClickEventsToItem() {
    const li = document.querySelectorAll('li > h3');
    li.forEach(item => item
      .addEventListener('click', event => (
        this.itemToggle(event.target)
      )))
  }

  addCLickEventsToButtons() {
    const buttons = document.querySelectorAll('li > p');
    buttons.forEach(button => button
      .addEventListener('click', (event) => {
        this.state.done.splice(button.parentNode.firstChild.dataset.key, 1);
        this.setState({ todo: this.state.todo })
      }))
  }

  addTodoItem(item) {
    const newTodo = [item, ...this.state.todo];
    this.setState({ todo: newTodo });
  }

  render() {
    localStorage.setItem('todo', this.state.todo)
    localStorage.setItem('done', this.state.done)
    const div = document.querySelector('.todos')
    div.innerHTML = this.generateTodoList()
    this.addClickEventsToItem()
    this.addCLickEventsToButtons()
  }

}

const button = document.querySelector('.submit-button');
const input = document.querySelector('.todo-title');
button.addEventListener('click', (event) => {
  event.preventDefault();
  if (input.value === '') return;
  todoList.addTodoItem(input.value);
  input.value = '';
})

const todoList = new TodoList();
todoList.render()
