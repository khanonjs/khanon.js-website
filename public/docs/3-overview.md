# Scene overview
A *Scene* is one of the main pieces of a video game. **It describes the environment where the actors cohexist and where the player plays its role**. It is **composed by many different elements**, depending of the kind of game. **For example**, in a **2D horizontal scroll game**, a Scene is composed by one or more backgrounds, a foreground with which the actors interact, dynamic elements like doors, ramps or traps (those are also actors), and different effects and particles; In a **3D isometric game**, the scene is composed by the ground, 3D elements like mountains, houses or trees, floor effects for grass and water, some cloud effects between the ground and the camera, and dynamic elements.

# Babylon object
*Khanon.js* [***Scene***](https://khanonjs.com/api-docs/modules/decorators_scene.html) is a wrapper of a *Babylon.js Scene*. When a class is decorated by [***Scene decorator***](https://khanonjs.com/api-docs/functions/decorators_scene.Scene.html), it creates a *Babylon Scene* and adds functionalities to it like ***lifecycle***, ***spawning*** and ***removing*** elements, ***assets management capabilities***, and **many others** that will be described in this section.

Every ***Babylon object* is freely accessible from the [`babylon`](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#babylon) accessor**. From there you can **get the *Babylon.js Scene* instance and modify whatever you need. The code flow shouldn't be affected always you don't remove anything previously created by Khanon.js, like textures, sprites or meshes.**

**Use Khanon.js to create and destroy elements. For the rest feel free to modify whatever you need in the scene.**

# Scene Maps
To facilitate the job of **composing the Scene**, Khanon.js **provides different kind of *Scene Maps***. A *Scene Map* is a decorated class that defines the composition of a *Scene*. From the simpler **[Sprite](https://khanonjs.com/api-docs/modules/decorators_sprite_map.html) or [Mesh](https://khanonjs.com/api-docs/modules/decorators_mesh_map.html) maps of *first* Khanon.js version**, to complex compositions like **horizontal/vertical scroll maps, isometric maps, 3D FPS maps, and many more that will come in *further versions* of Khanon.js**. Each one with its own way of definition, implementation, and interactions.

# Scene States
Aside from the visual aspect, **the scene also controls what to do based on each event or notification received**. From the beginning, to its development, to its end, just like a story, the scene state controls what's coming up after every relevant event. Within a state it is possible to spawn or destroy *Actors*, play a *Scene Action*, end the scene and change of screen, etc.

To deal with it, Khanon.js implements the [***Scene States***](https://khanonjs.com/api-docs/modules/decorators_scene_scene_state.html) decorator. A ***Scene State*** can be summarized in a bunch of **logical decisions** that will be made **based** on **events or notifications**. It also **configures** how the ***Scene*** will be at the **state starting**, and what to do if the **state ends**.

Only one state is running at the same time. Some examples of scene states: ***SceneStateIntro, SceneStateStartStage, SceneStatePlayGame, SceneStatePlayerWin, SceneStateLeaveStage***.

# Camera
The [***Camera***](https://khanonjs.com/api-docs/modules/decorators_camera.html) is defined by its own class implementation, and it is usually selected by the *Scene State*. Each state can demand a different camera depending on the Scene moment.

# Scene Actions
Defined by their own class implementation, [***Scene Actions***](https://khanonjs.com/api-docs/modules/decorators_scene_scene_action.html) are executed on the scene **provoking different effects**. For example, an action could display rain, another could make actors bigger, another could show a visual event in the background, etc.

**Many actions can be executed at the same time**, and like other Khanon.js objects, they have their own **lifecycle** and **logic**. Just **pay attention they don't collide**.

