# What is Khanon.js?

Khanon.js is a game engine extending Babylon.js, although it could also be considered a framework.

Babylon.js is a powerful graphical engine for web browsers, it is open source and it is in constant development and maintenance. If you don't know what Babylon.js is capable to do, please take a look to the [Babylon.js website](https://babylonjs.com/).

So.. what's the job of Khanon.js?

Khanon.js adds a layer between Babylon.js and the logic of your game, adding lifecycle to different objects like scenes, sprites, meshes or particles; and common features that any video game could require like assets management between scenes, actors, states, notifications, scene maps, and many others that will make the game development easier and enjoyable.

Khanon.js doesn’t pretend to substitute any of the Babylon.js features. Instead, its job is widening what Babylon.js offers, adding new features and functionalities. It also presents some alternatives like the [Logger](https://khanonjs.com/api-docs/classes/modules_logger.Logger.html) class, which is slightly different.

Khanon.js is being designed to create video games, but it can be used to create any kind of interactive and multimedia application.

# What about the code?

Khanon.js is a [typescript](https://www.typescriptlang.org/) engine focused on allowing a modular and easily scalable architecture.

All the above mentioned features are easily implemented to your project by class, method, and property decorators, making the code clean and reusable.

For instance you can create an action which consist in rendering rain over the scene. This action would be implemented by a [SceneAction](https://khanonjs.com/api-docs/modules/decorators_scene_scene_action.html) decorated class, and could be used from any of the scenes. Same for actors, states, actions, and many others.

Khanon.js is an instanceless framework (as many others like Angular, Nest, or React), meaning you don't have to care for the instance management. Khanon.js will do that job for you, creating and destroying instances on demand.

# How's the deal between Khanon.js and Babylon.js?

In some cases Khanon.js works with its own implementation, like the case of actors. Actors are logical elements that interact with other actors, the scene, and/or the player. An actor could be the main charactar of the game, a NPC, a fire throwing particles, or whatever that has some logic. This element is fully provided by Khanon.js, so it doesn't have a direct relation with any Babylon object.

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

When I firstly began working with Babylon.js to build my personal website, years ago, I started developing a small engine that could be helpful to build future projects. One of my principles is trying to make my code as reusable as possible; that will save time to do many other things in life. Although Babylon.js is a huge and very complete engine, shortly I found out many other features could be added to simplify the development process.

So, as expected, instead working on my personal webpage, I ended up working on a game engine.

The change came with typescript improvements, decorators, and a constant development of Babylon.js. After learning how decorators work and understanding how powerful they are, I decided to start this project with two ideas in mind: make a deeper learning of typescript; but over everything helping developers to work in their games by freeing them from the mechanical and boring tasks behind a video game, letting them focus in the game design.

**Khanon.js wants the user to focus in the game design. That's the main goal of this project.**