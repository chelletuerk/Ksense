//I considered using React.js but thought the size of the
//app didnt wanrrant such a powerful framework. jQuery it is!

//I wanted to make sure to call getUsers() right off the bat to display the user
//names from the first API /users path and then called the click event handler to
//associate them with their corresponding posts via the 2nd API call to the /posts
//path.

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

const handleClick = () => {
  fetch('https://jsonplaceholder.typicode.com/posts/')
  .then(response => response.json())
  .then(json => (json.forEach((e) => {

    $('.users').on('click',(e) => {
      $('.post').remove()
      const targetId = e.target.id
      json.map((e) => {

        //I thought I'd be able to use a deep equal in this 'if' conditional due
        //to both elements being integers and the same data structure, but for
        //some reeason it will only function properly wirth a shallow, double
        //equals.

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
