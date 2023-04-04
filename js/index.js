document.addEventListener("DOMContentLoaded", () => {
   // your code here
   let form = document.querySelector('form')
   // When the form is submitted, execute the following code:
   form.addEventListener('submit', (e) => {
    // Preventing the default form submission behavior  
      e.preventDefault()
      searchInput(e.target.search.value)




   })

})

const config = {
   header: {
      "Content-Type": "application/json",
      Accept: "application/vnd.github.v3+json"
   }
}


// Defining the "searchInput" function with an "input" parameter
function searchInput(input) {
    // Fetching data from the GitHub API with the user's input as the search query
   fetch(`https://api.github.com/search/users?q=${input}`)
   // Converting the response to JSON format
      .then(response => response.json())
       // When the data is returned, execute the following code:
      .then(data => {
          // Assigning the "items" property of the returned data to the "name" variable
         let name = data.items
         // Log the "name" variable to the console
         console.log(name)
           // Define the "nameLogin" function
         const nameLogin = () => {
            for (let i = 0; i < name.length; i++) {
                // Finding the <ul> element with an id of "user-list" and assign it to the "userList" variable
               const userList = document.querySelector('#user-list')
               // Creating a new <li> element and assign it to the "li" variable
               const li = document.createElement('li')
               // Setting the HTML content of the <li> element with data from the GitHub API
               li.innerHTML = `<li>${name[i].login}</li><p>${name[i].html_url}<p><img src=${name[i].avatar_url}>`
                // Adding the <li> element to the <ul> element with an id of "user-list"
               userList.appendChild(li)

               li.addEventListener("click", () => {
                  // Fetching data from the GitHub API with the selected user's login as the endpoint
                  fetch(`https://api.github.com/users/${name[i].login}/repos`)
                  // Converting the response to JSON format
                     .then(response => response.json())
                     .then(repos => {
                        console.log(repos)
                        for (let i = 0; i < repos.length; i++) {
                           // Finding the <ul> element with an id of "repos-list" and assign it to the "reposList" variable
                           const reposList = document.querySelector("#repos-list")
                           // Creating a new <li> element and assign it to the "repoLi" variabl
                           const repoLi = document.createElement('li')
                           // Setting the text content of the <li> element with data from the GitHub API
                           repoLi.innerHTML = `${repos[i].name}`
                            // Adding the <li> element to the <ul> element with an id
                           reposList.appendChild(repoLi)

                        }

                     })
               })

            }
         }
         nameLogin()
      })

}
