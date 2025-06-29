# Project structure

The base Khanon.js project consists of the `package.json` file, a `src` folder, and a `public` folder. Installing more dependencies is your free decision. Khanon.js brings everything you need to develop a fully interactive application.

Creating a new project is complex enough as to have to explain the whole process step by step.

You can find a working blank project [here](https://github.com/khanonjs/khanon.js-tutorials/tree/main/01-blank-project).

# Package dependencies

Currently, the production version of Khanon.js avoids any kind of dependency. This helps to have a clean and lightweight bundle. The only needed dependency for production version are Babylon.js packages.

Therefore the only packages you need to add to your dependencies in the package.json are: `@babylonjs/core`, `@babylonjs/gui` and `@khanonjs/engine`.

The development version needs more dependencies for the babylon debugging tools `@babylonjs/inspector` and some `webpack` packages. Feel free to add prettier or the linter of your convenience. In a coming future khanonjs-cli will do that job for you.

# Src folder

The src folder contains all the source code files. Commonly the main file of this folder is `app.ts`, which contains the app class that starts the application. From there, the source code tree starts growing up from other source files and folders. These source files are bundled in a single file running the `npm run build` script; `app.js` is created and placed in the `dist` folder beside the rest of the public files.

# Public folder

The `public` folder contains all the neccesary files to run the Web Application. The main file here is `index.html`, which has a div container that Khanon.js will use to create a canvas for Babylon.

## HTML structure

In the body of the HTML it is just needed `<div id="khanonjs"></div>`. Khanon.js uses that id by default to create the canvas, although you can change it from the app decorator [props](https://khanonjs.com/api-docs/interfaces/decorators_app.AppProps.html#htmlCanvasContainerId).

You can place that div within any other div to add a background to your application, and nest it under other containers such an error page container that is hidden by default and you can show in case there's some app critical error (check [onError](https://khanonjs.com/api-docs/classes/decorators_app.AppInterface.html#onError) method).

## Assets folder

The assets folder placed into public is meant to contain all the app assets such images, sounds, fonts, etc.

# Dist folder

The `dist` folder makes reference to the distributable files. Once the project has been built, all the files from public folder are copied to the `dist` folder, besides the `app.js` bundle. All these files contained inside `dist` folder are the ones you can deploy in your server.