# Scene decorator
A *Scene* is one of the main pieces of a video game. **It describes the environment where the actors cohexist and where the player plays its role**. It is **composed by many different elements**, depending of the kind of game. **For example**, in a **2D horizontal scroll game**, a Scene is composed by one or more backgrounds, a foreground with which the actors interact, dynamic elements like doors, ramps or traps (those are also actors), and different effects and particles; In a **3D isometric game**, the scene is composed by the ground, 3D elements like mountains, houses or trees, floor effects for grass and water, some cloud effects between the ground and the camera, and dynamic elements.

## Scene Maps
To facilitate the job of **composing the Scene**, Khanon.js **provides different kind of *Scene Maps***. A *Scene Map* is a decorated class that defines the composition of a *Scene*. From the simpler **Tile or Mesh maps of *first* Khanon.js version**, to complex compositions like **horizontal/vertical scroll maps, isometric maps, 3D FPS maps, and many more that will come in *further versions* of Khanon.js**. Each one with its own way of definition, implementation, and interactions.

## Scene States
Apart from the visual
The *Scene* controls

The *Khanon.js* [***Scene***](https://khanonjs.com/api-docs/modules/decorators_scene.html) is a warpper of *Babylon.js Scene*. When a class is decorated by [***Scene decorator***](https://khanonjs.com/api-docs/functions/decorators_scene.Scene.html), it creates a Babylon Scene and adds funcitonalities to it like ***lifecycle***, ***spawning*** and ***removing*** elements, ***assets management capabilities***, and **some others** that will be described in this section.