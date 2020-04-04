const state = {
  todos: [],
  dones: []
}

const setState = (object) => {
  state = { ...state, ...object };
}

const statePush = (item, array) => {
  state[array] = [...state[array], item];
}

statePush('Levi', 'todos')
console.log(state)