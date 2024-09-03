# What is Khanon.js?

As the title sais, Khanon.js is a game engine extending Babylon.js, although it could also be considered a framework.

Babylon.js is the most powerful graphical engine for web browsers. If you don't know what Babylon.js is, please take a view to its [documentation](https://babylonjs.com/). To work with Khanon.js it is required to have some minimal knowledges of how Babylon.js works.

So.. what's the job of Khanon.js?

Khanon.js brings a layer between Babylon.js and the final code, adding lifecycle to different objects as Secnes, Sprites, Meshes or Particles. It also brings common features that any video game could require like assets management between scenes, actors, notifications, scene maps, and many other things that will make the game development easier and enjoyable.

All those features can be added to your project easily throught class decorators, making the code clean and reusable.

# How's the deal between Khanon.js and Babylon.js?

In some cases Khanon.js works with its own implementation, like the case of Actors. Actors are logical elements that interact between themselves, the scene, and/or the player. An actor could be the main charactar of the game, a NPC, a fire that's spreading particles, or whatever. This element is fully provided by Khanon.js, so it doesn't have any relation with Babylon.js.

In other cases the Khanon.js object wraps an existing Babylon.js object, like Scenes, Sprites, Meshes or Particles.

In the case of Babylon.js wrapped objects, apart of the extended features Khanon.js brings, you will have fully access to the Babylon object, being able to modify whatever you need.

Khanon.js has been designed not to relying in Babylon objects properties. That means in most of cases you will be able to modify whatever you need in the Babylon object with the confidence that the code will flow as expected.

To access the wrapped and related Babylon objects within the Khanon.js instances you'll find the accessor `babylon` (E.g *khanonSprite.babylon.sprite*)