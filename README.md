# To-Do List React Frontend

## Summary
After reaching the end of the React section of The Odin Project (https://www.theodinproject.com/), I wanted to take an old JavaScript project that I had worked on and update it to use a React frontend and Rails JSON API backend (https://github.com/ayrt-n/to-do-list-api).

The application is a relatively straight forward to-do list web application, which allows users to create, read, update, and delete projects and associated to-do lists. Through the web application, users can view tasks associated with projects, view all tasks for the current day, or view all upcoming tasks. 

The application uses Json Web Token (JWT) and React Context to authenticate and manage user permissions.

This repo is for the React frontend portion of the project.

## Set up
### Using Web Browser

The best way to view the project is live on Github at https://ayrt-n.github.io/to-do-list-client/

Please note that it may take 30-45 seconds for the Heroku dyno to start up if the application has been inactive for awhile.

![homepage](/src/assets/images/hero-main.png)

### Using Local Machine
If you want to run this all locally on your own machine, you will need to clone this repo along with the backend (https://github.com/ayrt-n/to-do-list-api).

Once you have this repo cloned (with the backend set up as per the instructions in the associated README), you can start up the application by running:

```npm start```

And then navigating to http://localhost:3000

## Takeaways
This project provided a solid opportunity to combine everything that I have learned through The Odin Project. Generally, it was a great opportunity to start building full stack web applications which utilized a Rails backend and React frontend to build beautiful, responsive, and interactive user interfaces with a persistent backend API.

From a Frontend/JavaScript/React point of view: in addition to basic react concepts like functional components, states, and props, the project offered the opportunity to use a number of other features to help keep concerns separated, and the code clear, concise, and easy to work with and refactor.

Some React and JavaScript concepts used through the project include:
- React Context to manage user Authentication and Authorization: By setting up an Authorization Context/Provider and placing it at the top level of the application, it made it easy to access and confirm that a user was logged in/valid through all levels of the application.
- localStorage API to persist user session between browser sessions: Once logging in, user information (including JWT token, token expiration time, user_id, and email) was stored in localStorage making it easy to authorize users and access user details. By using localStorage, user login will persist in between browser sessions, helping to improve UX. For safety reasons, it is important to not store any potentially sensitive information in localStorage, as such, only the most basic and necessary user information is included.
- Helper methods to easily work with backend: Through the project I was able to get a healthy amount of experience working with external APIs. To help avoid repeating myself and keep concerns separated, I created a number of services which could be imported and utilized throughout the application (userService, authService, tasksService, etc.) to make it easy for components to make fetch requests and work with external APIs.
- Jest unit testing and mocks: The project provided a lot of experience working with Jest and building unit testing to ensure that components are working throughout the project and through refactors and changes. Having to work with other React components and external APIs also provided good experience using some of the Jest mocking functionality to make sure tests were robust, fast, and avoid having to rely on external APIs. 
