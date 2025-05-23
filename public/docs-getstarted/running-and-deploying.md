# Project content

As described [here](http://localhost:3000/getstarted/project-structure), a Khanon.js project is composed by `root files`, `public` and `src` folders.

You are free to create your own building system, but Khanon.js includes its own system through the CLI to help you with that task.

# CLI

To use the building system, you need to install the [CLI](https://www.npmjs.com/package/@khanonjs/cli) package globally:

`npm install @khanonjs/cli -g`

# Running and building the project

To run and build the project add these scripts to your `package.json`:

**package.json**
```
"scripts": {
  "start": "khanon --start-dev",
  "start:prod": "khanon --start-prod",
  "build": "khanon --build-dev",
  "build:prod": "khanon --build-prod"
},
```

Running the project opens the browser.

In both running and building the project, a `dist` folder is created with the files of the project including the minimized `app.js` bundle of the code. You need to run this bundle from the `index.html`.

These tasks are already done if you create the project from the CLI running the create project command:

`khanon -c`

# Deploying your project

To deploy your project, you just need to build it and copy the content of `dist` to your server.