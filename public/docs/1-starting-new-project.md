# Project structure

A base Khanon.js project contains a `package.json` file, a `src` folder, and a `public` folder. Installing more dependencies may add some more files to the root folder, but that's the basic structure.

Creating a new project is complex enough as to have to explain the whole process step by step.

You can **find** a working **blank project** [here](https://github.com/khanonjs/khanon.js/tree/main/tutorials/blank-project). **Download** it from this [link](https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/khanonjs/khanon.js/tree/main/tutorials/blank-project).

Download it and start adding your files there. In a coming future Khanon.js will have a ***khanonjs-cli*** utility to generate new projects.

&nbsp;
# Package dependencies

The **production version** of Khanon.js avoids any kind of dependency. This helps to have a clean and lightweight bundle. The only needed dependency for production version is `babylon.js`.

Therefore the only packages you need to add to your *dependencies* in the *package.json* are: `@babylonjs/core`, `@babylonjs/gui` and `@khanonjs/engine`.

The **development version** needs more dependencies for the babylon debugging tools: `@babylonjs/inspector` and some webpack packages. Feel free to add *prettier* of the *linter* of your convenience. In a coming future ***khanonjs-cli*** will do that job for you.

&nbsp;
# Src folder

The ***src*** folder contains all the source code files. Commonly the main file of this folder is ***app.ts***, which contains the *App class* that starts the application. From there, the source code tree starts growing up from other source files and folders. Running `npm run build` these source files are bundled in a single ***app.js*** and placed in the *dist* folder beside the rest of the public files.

&nbsp;
# Public folder

The ***public*** folder contains the files that will be placed in the server to run the Web Application. The main file here is `index.html`, which has a container div that *Khanon.js* will use to create a canvas for *Babylon.js*.

## HTML structure

In the body of the HTML it is just needed `<div id="khanonjs"></div>`. Khanon.js uses that *id* by default to create the canvas, although you can change it from the [*App decorator properties*](https://khanonjs.com/api-docs/interfaces/decorators_app.AppProps.html).

You can place that *div* within any other *div* to add a background to your application, and nest it under other containers (E.g an error page container that is hidden by default and you can display in case there's some app error).

## Assets folder

The ***assets*** folder placed inside the *public* folder is meant to contain all the app assets such images, sounds, fonts, etc.

# Dist folder

The *dist* folder makes reference to the *distributable* files. Once the project has been built, all the files from public folder are copied to the *dist* folder, besides the app *bundle* file ***app.js***. All these files inside *dist* folder are the ones you can deploy in your server.