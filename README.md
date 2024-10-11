
# Project: React Task Board Application

This project is a task board application built using React, where users can create boards, columns, and cards, and use drag-and-drop functionality to manage tasks between columns.

## Table of Contents
- [Project: React Task Board Application](#project-react-task-board-application)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
  - [Features](#features)
  - [Available Scripts](#available-scripts)
    - [`npm i, if you haven't already.`](#npm-i-if-you-havent-already)
    - [`npm start`](#npm-start)
    - [`npm run build`](#npm-run-build)
  - [Learn More](#learn-more)

## Prerequisites

Before running this project, ensure you have the following installed on your local machine:

- **Node.js**: Download and install Node.js from [https://nodejs.org/](https://nodejs.org/). Node.js includes `npm` (Node Package Manager), which you will use to install dependencies.
  
  To check if Node.js and npm are installed, run the following commands in your terminal:
  ```bash
  node -v
  npm -v
  ```

  You should see version numbers for both.

## Installation

1. **Clone the repository** to your local machine:
   ```bash
   git clone https://github.com/nimgog/Webstep.git
   ```

2. **Navigate into the project directory**:
   ```bash
   cd Webstep
   ```

3. **Install the dependencies**:
   Run the following command to install all the required npm packages:
   ```bash
   npm install
   ```

## Running the Project

Once the dependencies are installed, you can start the app locally:

1. **Start the development server**:
   ```bash
   npm start
   ```

   This will run the app in development mode. The app will be accessible in your browser at:
   ```
   http://localhost:3000
   ```

2. **View and edit the project**:
   The page will automatically reload if you make changes to the code, and you’ll see any linting errors in the console.

## Features

- **Drag-and-Drop Functionality**: Move cards between columns using React DnD.
- **Local Storage**: Save your board, columns, and cards data in the browser using local storage, so your data persists even if you refresh the page.
- **Task Management**: Create, edit, and delete boards, columns, and cards.
- **Editable Descriptions**: Edit card descriptions with inline editing functionality.
  
## Available Scripts

In the project directory, you can run the following commands:

### `npm i, if you haven't already.`
Install dependencies required to run this application.

### `npm start`
Runs the app in development mode and opens [http://localhost:3000](http://localhost:3000) in the browser.The app will reload automatically if you make edits.

### `npm run build`
Builds the app for production into the `build` folder.It bundles React in production mode, optimizing the build for best performance.


## Learn More

To learn more about the tools and libraries used in this project, you can visit the following resources:

- [React Documentation](https://reactjs.org/)
- [Create React App Documentation](https://create-react-app.dev/docs/getting-started/)
- [React DnD Documentation](https://react-dnd.github.io/react-dnd/about)
