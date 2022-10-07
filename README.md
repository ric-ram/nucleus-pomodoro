# Nucleus Pomodoro

![Example screenshot](./images/screenshot-nucleus.png)

> A pomodoro timer with fully customizable settings while allowing it's users' to create projects with tasks associated to them.

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)
- [Features](#features)
- [Status](#status)
- [Inspiration](#inspiration)
- [Contact](#contact)

## General info

This project aims to help the user increase their productivity by allowing them to focus on a single task at a time using the Pomodoro technique. For more information on the Pomodoro technique, please read the following article by [Todoist](https://todoist.com/productivity-methods/pomodoro-technique).

## Technologies

- ReactJS
- Auth0
- SASS
- Bootstrap

## Setup

Clone the repository:

~~~linux
git clone https://github.com/ric-ram/nucleus-pomodoro.git
cd nucleus-pomodoro
~~~

Install dependencies:

~~~linux
npm install
~~~

To run the app:

~~~linux
npm start
~~~

It runs the app in development mode.

Open <http://localhost:3000> to view it in the browser.

The page will reload if you make edits.

You will also see any lint errors in the console.

## Features

Current features:

- Fully customizable timer
- Sign in/Sign Up & account management
- Project/Task creation & management

To-do list:

- [ ] Implement a modal to warn users of possible bugs during the staging phase.
- [ ] Fix bugs:
  - [ ] Fix empty page after project creation
  - [ ] Disable task focus after being completed
  - [ ] Fix automatic refresh and logout when the database is updated
- [ ] Add Pomodoro count for each task
- [ ] Add hover behavior for buttons for a better UX
- [ ] Do more extensive testing

## Status

Currently, the project is in the _staging_ phase. As seen in the segment before, there are still some bugs to fix and more features to implement. Therefore, I'll be updating the project in the following months.

## Inspiration

The inspiration for this project came from the [nesto](https://nesto.cc/) Pomodoro app. It's an app I've used while going through my tasks, including developing this project. I decided to create my own due to some of the features I find necessary for my workflow still being under development or only available to premium users.

## Contact

Created by [Ricardo Ramos](https://github.com/ric-ram/) - feel free to contact me via email at r.[ramos@ricardoframos.com](mailto:ramos@ricardoframos.com)
