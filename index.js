
$(document).ready(() => {
  getUsers()
  renderUserPosts()
})

let getUsers = () => {
  fetch('https://jsonplaceholder.typicode.com/users/')
  .then(response => response.json())
  .then(json =>
    renderUsers(json))
}

const renderUserPosts = () => {
  handleClick()
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
  .then(json => (json.forEach((e) => {
    $('.users').on('click',(e) => {
      $('.post').remove()
      const targetId = e.target.id
      json.map((e) => {
        if(e.userId == targetId) {
          $('.users').append(`
            <ul>
              <li
                id=${e.userId}
                class="post">
                </br>${e.body.charAt(0).toUpperCase() + e.body.slice(1)}.</br>
              </li>
            </ul>`)
        }
      })
    })
  })))
}
