// render function that appends all to dom
// setstate function that changes the state and calls render

class TodoItem {
  constructor(title, description) {
    this.title = title;
    this.description = description;
  }
}

const state = {
  todos: [],
  dones: []
}

const renderTodoList = (array) => (
  array.map((item, index) =>
    `<li>
    <h2 data-key="${index}">${item.title}</h2>
    <p>${item.description}</p>
    </li>`)
)

const renderDoneList = (array) => (
  array.map((item, index) =>
    `<li>
    <h2 data-key="${index}">${item.title}</h2>
    <p>${item.description}</p>
    <button>X</button>
    </li>`)
)

const appendList = (array, parent) => {
  array.forEach(item => { parent.innerHTML += item })
}

const statePush = (item, array) => {
  state[array] = [...state[array], item];
  render()
}

const handleSubmit = (event) => {
  event.preventDefault()
  const title = document.querySelector('.todo-title');
  const description = document.querySelector('.todo-description');
  const item = new TodoItem(title.value, description.value);
  statePush(item, 'todos');
  title.value = '';
  description.value = '';
}

const render = () => {
  const todosElement = document.querySelector('.todos');
  todosElement.innerHTML = '';
  appendList(renderTodoList(state.todos), todosElement);
  todosElement.querySelectorAll('li')
    .forEach(item => item.addEventListener('click', (event) => {
      const index = event.target.dataset.key
      const doneItem = state.todos.splice(index, 1)[0];
      event.target.classList.toggle('done')
      statePush(doneItem, 'dones');
    }))
  appendList(renderDoneList(state.dones), todosElement)
}





// const render = () => {
//   const todosElement = document.querySelector('.todos');
//   appendList(renderTodoList(state.todos), todosElement)
//   todosElement.querySelectorAll('li')
//     .forEach(item => item.addEventListener('click', (event) => {
//       console.log(event.target.dataset.key) // index of item
//     }))
// }

window.onload = () => {
  document.querySelector('.submit-button')
    .addEventListener('click', handleSubmit);
}

// console.log('🚀');

// const setState = (object) => {
//   state = { ...state, ...object };
// }
