//I considered using React.js but thought the size of the
//app didnt wanrrant such a powerful framework. jQuery it is!

//I wanted to make sure to call getUsers() right off the bat to display the user
//names from the first API /users path and then called the click event handler
//to associate them with their corresponding posts via the 2nd API call to
//the /posts path.

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

//Loop through user id's to append them to the DOM as buttons.
const renderUsers = (json) => {
  json.map((user) => {
    $('.users').append(`
      <button
        id=${user.id}
        class="user">${user.name}</br>
      </button>`)
  })
}

//This function makes the 2nd API call to the '/posts' path, comparing the
//e.target.id to the correspoding userId endpoint filtering through using an
//'if' conditional (I considered both the .filter() and .indexOf() methods
//but opted for a good 'ol fasioned 'if' conditional because the data was so
//simple and didn't require anything much more powerful). After the data is
//sorted and matched I then simply displayed it by appending it again to the
//DOM. Lastly, I used the .remove() method to clear the DOM every time a new user
//was clicked, requiring a new API call.

const clearDOM = () => {
  $('button').on('click', () => {
    $('.posts').remove()
  })
}

const handleClick = () => {
  fetch('https://jsonplaceholder.typicode.com/posts/')
  .then(response => response.json())
  .then(json => (json.forEach((post) => {
    $('.user').on('click',(e) => {
      //$('.post').remove()
      // clearDOM()
      let targetId = +e.target.id
      if(post.userId === targetId) {
        $('.post').remove()
        $('.posts').append(`
          <div class="post-container">
            <ul>
              <li
                id=${post.userId}
                class="post">
                </br>${post.body.charAt(0).toUpperCase() + post.body.slice(1)}.
                </br>
              </li>
            </ul>
          </div>`)
      }
    })
  })))
}
