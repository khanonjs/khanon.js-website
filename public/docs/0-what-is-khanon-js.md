# What is Khanon.js?

KHANON.JS WANTS THE USER TO FOCUS IN THE GAME DESIGN
----------------------------------------------------

As the title sais, Khanon.js is a game engine extending Babylon.js, although it could also be considered a framework.

Babylon.js is the most powerful graphical engine for web browsers, and it is open source! If you don't know what Babylon.js is, please take a look to the [Babylon.js site](https://babylonjs.com/).

So.. what's the job of Khanon.js?

Khanon.js adds a layer between Babylon.js and the logic of your game, adding lifecycle to different objects as Scenes, Sprites, Meshes or Particles; and common features that any video game could require like assets management between scenes, actors, notifications, scene maps, and many other things that will make the game development easier and enjoyable.

Khanon.js doesn’t pretend to substitute any of the Babylon.js features. Instead, its job is widening what Babylon.js offers, adding new features and functionalities. It also presents some alternatives like the Logger class, which is slightly different.

# What about the code?

Khanon.js is fully developed in [Typescript](https://www.typescriptlang.org/).

All the features mentioned before are easily implemented to your project throught class, method, or property decorators, making the code clean and reusable.

You can for example create an action which consist in rendering rain over the scene. This action would be implemented by a [SceneAction](https://khanonjs.com/api-docs/modules/decorators_scene_scene_action.html) decorated class, and could be used from any of the scenes. Same for actors, states, player events, and many others.

Khanon.js is an instanceless framework (as many others like Angular, Nest or React), meaning you don't have to care for the instance management. Khanon.js will do that job for you, creating and destroying instances on demand.

# How's the deal between Khanon.js and Babylon.js?

In some cases Khanon.js works with its own implementation, like the case of actors. Actors are logical elements that interact between themselves, the scene, and/or the player. An actor could be the main charactar of the game, a NPC, a fire throwing particles, or whatever. This element is fully provided by Khanon.js, so it doesn't have a direct relation with a Babylon.js object.

In other cases the Khanon.js object wraps an existing Babylon object, like Scenes, Sprites, Meshes or Particles.

In the case of Babylon wrapped objects, apart of the extended features Khanon.js brings, you will have fully access to the Babylon object, being able to modify whatever you need.

Khanon.js has been designed to not to rely in Babylon objects properties. That means in most of cases you will be able to modify whatever you need in the Babylon object with the confidence that the code will flow as expected.

To access a wrapped or related Babylon object within a Khanon.js instance you'll find the accessor `babylon` (E.g. someKhanonSprite.babylon.sprite).

# Motivation of this project

When I firstly began working with Babylon.js to build my personal website (years ago), I started developing a small engine that could be helpful to build future projects. One of my principles is trying to make all my code as reusable as possible; that will save me time to do many other things in life. Although Babylon.js is a huge and very complete engine, shortly I found out many other features could be added to simplify the development process.

So, as expected, instead working in my personal webpage, I ended up working in a game engine.

The big change came with Typescript improvements and decorators. After learning how they work and understanding how powerful they are, I decided to start this new project with two thoughts in sight: make a deeper learning of Typecript; and over everything helping new developers to work in their games freeing them from the mechanical and boring work behind a video game, letting them focus in the game design.

**Khanon.js wants the user to focus in the game design. That's the main goal of this project.**