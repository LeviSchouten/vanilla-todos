// render function that appends all to dom
// setstate function that changes the state and calls render

class TodoItem {
  constructor(title, description) {
    this.title = title;
    this.description = description;
  }
}


// wrap this all in a class (look in to getters and setters)

const state = {
  todos: [],
  dones: []
}

const handleSubmit = (event) => {
  event.preventDefault()
  const title = document.querySelector('.todo-title');
  const description = document.querySelector('.todo-description');
  state.todos.push(new TodoItem(title.value, description.value));
  title.value = '';
  description.value = '';
  render()
}

const renderList = (array) => (
  array.map((item, index) =>
    `<li data-key=${index}>
    <h2>${item.title}</h2>
    <p>${item.description}</p>
    </data>
    </li>`)
)

const appendList = (array, parent) => {
  parent.innerHTML = '';
  array.forEach(item => { parent.innerHTML += item })
}

const render = () => {
  const todosElement = document.querySelector('.todos');
  appendList(renderList(state.todos), todosElement)
  todosElement.querySelectorAll('li')
    .forEach(item => item.addEventListener('click', (event) => {
      console.log(event.target.key)
    }))
}

window.onload = () => {
  document.querySelector('.submit-button')
    .addEventListener('click', handleSubmit);
}

console.log('🚀');
