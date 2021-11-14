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

const handleClick = () => {
  fetch('https://jsonplaceholder.typicode.com/posts/')
  .then(response => response.json())
  .then(json => (json.forEach((e) => {

    $('.users').on('click',(e) => {
      $('.post').remove()
      let targetId = e.target.id


////////////////////////////   !!!IMPORTANT!!!   ///////////////////?///////////

//I have identified what has been causing the "[Violation] 'click'
//handler took XXXXms" console error that was almost doubling in ms beginning
//with the second click on a user. I knew I was coming at this chunk of code
//like a kindergartener...please forgive me.

//Alas, after far too much googling, per usual, I found that a hacky work-around
//was to wrap the inner functions in a setTimeout() without a delay parameter,
//allowing the rest of the code to run without having to wait for the 'hold up'
//function/code to continue to be a roadblock. This, however, can cause
//unpredictable behavior. Upon getting more curious, I first started digging
//into the Network tab in the browser console. Nothing unusual. Checked more
//StackOverflow about the console Violation error -- which, btw, there is A LOT
//of info to find on this particular error.

//So, the setTimeout did exactly as my search predicted and produced
//unpredictable behavior. Instead of the DOM freezing until the code caught
//up -- producing an exponential lag in the render of new posts and
//'click-ability' -- now the functions were being pushed thru too fast while the
//.map() chugged along creating the wrong posts to render with the wrong user.
//Yet, the DOM was mimicking a click event without rendering the matching
//user/post id's the code dictates. More or less, there was a huge traffic jam
//due to my prehistoric 'if' conditional within the .map().

//Another side-effect of this console error was that the .remove() function
//wasn't nearly fast enough to keep up with the data pouring in with the
//timer-less setTimeout(), so the posts continued to append elements
//to the DOM -- the 'post' list gets reeeeeally long, if your wondering.

//Now, it's just how to fix it -- I think I'll go back to the original idea of
//a .filter() and let that magical method take care of the issue. Also, I
//think there's a better way to pass my json object and break apart that click
//handler into smaller functions.

//Anyway, the setTimeout() was immensely helpful in targeting the problem area.
//I should mention part of the debugging process included a change in the
//console violation from a click handler to a set timeout violation instead -
//further indicating that this was, in fact, the problematic code.

////////////////////////////////////////////////////////////////////////////////

      //window.setTimeout(() => {
        json.map((e) => {

          //I thought I'd be able to use a triple/deep equal in this 'if'
          //conditional due to both elements being integers and the same data
          //structure, but for some reeason it will only function properly wirth
          //a shallow, double equals.
          targetId = + targetId
          if(e.userId === targetId) {
            $('.users').append(`
              <div class="post-container">
                <ul>
                  <li
                    id=${e.userId}
                    class="post">
                    </br>${e.body.charAt(0).toUpperCase() + e.body.slice(1)}.
                    </br>
                  </li>
                </ul>
              </div>`)
          }
        })
      //})
    })
  })))
}
