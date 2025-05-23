# What is Khanon.js?

Khanon.js is an open source games framework extending Babylon.js.

Babylon.js is a powerful graphical engine for web browsers, it is open source and it is in constant development. If you don't know what Babylon.js is capable to do, please take a look to the [Babylon.js website](https://babylonjs.com/).

*So.. what's the job of Khanon.js?*

Khanon.js implements a layer between Babylon.js and the logic of your game, appending lifecycle and other features onto a transparent interface above Babylon, letting you to get and modify whatever you need in the Babylon's engine, while also using Khanon.js extended features. Aassets management, states workflow, actors interactions, input mappers, and many others are some extended features that will make the game development smoother.

It is designed to create video games and interactive applications in 2D and 3D environments. It is flexible and modular, allowing you to easily expand your project by modifying and moving back or forward any element you need.

-- *Khanon.js wants the developer to focus in the game design. That's the main goal of this project.* --

# What about the code?

Khanon.js is a [typescript](https://www.typescriptlang.org/) framework focused on enabling a modular and scalable architecture.

All the above mentioned features are implemented to your project by class, method, and property decorators, making the code clean and reusable.

For example, you can create an action which consist in rendering rain over the scene. This action would be implemented by a [SceneAction](https://khanonjs.com/api-docs/modules/decorators_scene_scene_action.html) decorated class, and could be used from any of the scenes. Same for actors, states, particles, and more.

Khanon.js is an instanceless framework (as many others like Angular, Nest, or React), meaning you don't need to care for the instance management. Khanon.js will do that job for you, creating and destroying instances on demand.

It is designed to be used with an [Object-oriented programming (OOP)](https://en.wikipedia.org/wiki/Object-oriented_programming) architecture, allowing the possibility to inherit, mutate, and reuse code.

# How's the deal between Khanon.js and Babylon.js?

Khanon.js doesn’t pretend to substitute any of the Babylon.js features. Instead, its job is widening what Babylon.js offers, adding new features and functionalities.

In some cases Khanon.js works with its own implementation, like the actor decorators. Actors are logical elements that interact with other actors, the scene, and/or the player. An actor could be the main charactar of the game, a NPC, a fire throwing particles, or whatever that has some logic. This element is fully provided by Khanon.js, so it doesn't have a direct relation with any Babylon object.

In other cases, a Khanon.js object wraps another existing Babylon object, such as scenes, sprites, meshes, or particles.

In the case of Babylon wrapped objects, apart of the extended features Khanon.js brings, you will have fully access to the Babylon object, being able to modify whatever you need.

Khanon.js has been designed to not to rely in Babylon properties. That means in most of cases you will be able to modify whatever you need in a Babylon object with confidence that your code will flow as expected.

To access a wrapped or related Babylon object within a Khanon.js instance you'll find the accessor `babylon` (E.g. *khanonSprite.babylon.sprite*).

It is important to note that some Babylon objects have same name than other Khanon.js objects. To avoid collisions between their imports, you may import BABYLON namespace to use Babylon objects.
```
import * as BABYLON from '@babylonjs/core'  // Use BABYLON namespace to avoid collisions with Khanon.js objects
import {
  Scene,
  SceneInterface
} from '@khanonjs/engine'

function example() {
  const babylonScene = new BABYLON.Scene(/* ... */)
}

@Scene()
export class KhanonScene extends SceneInterface {
  // ...
}
```

# Motivation

Searching the web, there are not huge options to choose the desired video games framework to develop a high-end level video game.

Babylon.js offers one of the most powerful graphical engines you'll find out there.

Khanon.js aims to help you in the development process to build high-quality video games based on Babylon.js, while also providing high level programming methods that allow you to focus on game design rather than technical tasks behind-the-scenes.

# Caveats

## Circular dependencies

Khanon.js is not so friend of circular dependencies. Try to keep the imports hierarchy from parents to children. Use upwards callbacks to avoid importing parents from child classes. If you see an error similar to `my-state.ts:3 Uncaught ReferenceError: Cannot access 'MyState' before initialization` this means the code has a circular dependency trying to access an uninitialized state from a child class.

## Private methods

Don't use methods and properties prefixed by underscore within extended Khanon.js classes (e.g: `MyKhanonJsExtendedClass -> _stop()`), that may override private Khanon.js methods or properties. Keep your code clean and avoid underscored prefixed methods.