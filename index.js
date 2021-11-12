$(document).ready(() => {
  getUsers()
  handleClick()
})

const getUsers = () => {
  fetch('https://jsonplaceholder.typicode.com/users/')
  .then(response => response.json())
  .then(json =>
    renderUsers(json))
}

const renderUsers = (json) => {
  json.map((user) => {
    $('.users').append(`
      <button
        id=${user.id}
        class="user">${user.name}</br>
      </button>`)
  })
}

const handleClick = () => {
  fetch('https://jsonplaceholder.typicode.com/posts/')
  .then(response => response.json())
  .then(json =>
    console.log(json))
}
