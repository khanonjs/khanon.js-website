# Scene overview

The [scene](https://khanonjs.com/api-docs/modules/decorators_scene.html) describes the environment the action game takes place.

They are composed by different elements, depending of the kind of game. For example, in a 2D horizontal scroll game the scene is composed by one or more backgrounds, the foreground where actors interact, dynamic elements like doors, ramps or traps (those are also actors), and different effects and particles; In a 3D isometric game the scene is composed by the ground, 3D elements like mountains, houses or trees, floor effects for grass and water, some cloud effects between the ground and the camera, and more dynamic elements.

Khanon.js scenes are implemented in a decorated class, where decorator properties declares the elements contained in it.

While the visual composition of the scene is defined by one or more scene maps, the development of logic takes place in the different scene states.

# Babylon object
Khanon.js [Scene](https://khanonjs.com/api-docs/modules/decorators_scene.html) is a wrapper of a [Babylon Scene](https://doc.babylonjs.com/typedoc/classes/BABYLON.Scene). When a class is decorated by [Scene decorator](https://khanonjs.com/api-docs/functions/decorators_scene.Scene.html), it creates a Babylon Scene and adds functionalities like lifecycle, ability to spawn and remove elements, assets management capabilities, and many others that will be described in this section.

Every Babylon object is freely accessible from the [`babylon`](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#babylon) accessor. From there you can get the [Babylon Scene](https://doc.babylonjs.com/typedoc/classes/BABYLON.Scene) instance and modify whatever you need. The code flow shouldn't be affected always you don't remove anything previously created by Khanon.js, like textures, sprites or meshes.

Use Khanon.js to create and destroy elements. For the rest feel free to modify whatever you need in the scene.

# Loading scenes
Scenes can be loaded from [`.babylon`](https://doc.babylonjs.com/setup/support/.babylonFileFormat) or [`glTF`](https://en.wikipedia.org/wiki/GlTF) files using the [`url`](https://www.khanonjs.com/api-docs/interfaces/decorators_scene.SceneProps.html#url) decorator prop. In that way it is possible to build a scene in a 3D graphical editor, and export it to Babylon using any of their [exporters](https://doc.babylonjs.com/features/featuresDeepDive/Exporters/) in case of using a [`.babylon`](https://doc.babylonjs.com/setup/support/.babylonFileFormat) file, or from the native graphical editor exporter to a [`glTF`](https://en.wikipedia.org/wiki/GlTF) file.

# Scene Maps
To facilitate the job of composing the scene, Khanon.js provides different types of scene maps. A scene map is a decorated class that defines the composition of a scene. From the simpler [Sprite](https://khanonjs.com/api-docs/modules/decorators_sprite_map.html) or [Mesh](https://khanonjs.com/api-docs/modules/decorators_mesh_map.html) maps of first Khanon.js version, to complex compositions like horizontal/vertical scroll maps, isometric maps, 3D FPS maps, and many more that will come in further versions. Each one with its own way of definition, implementation, and interactions.

# Scene States
Aside from the visual aspect, the scene also controls what to do based on each event or notification received. From the beginning, to its development, to its end, just like a story, the scene state controls what's coming up after every relevant event. Within a state it is possible to spawn or destroy Actors, play a scene action, end the scene and change of screen, etc.

To deal with it, Khanon.js implements the [Scene States](https://khanonjs.com/api-docs/modules/decorators_scene_scene_state.html) decorator. A scene state can be summarized in a bunch of logical decisions that will be made based on events or notifications. It also configures how the scene will be at the state starting, and what to do if the state ends.

Only one state is running at the same time. Some examples of scene states: *SceneStateIntro*, *SceneStateStartStage*, *SceneStatePlayGame*, *SceneStatePlayerWin*, *SceneStateLeaveStage*.

# Camera
The [Camera](https://khanonjs.com/api-docs/modules/decorators_camera.html) is defined by its own class implementation, and it can be switched by the Scene's or SceneState's [switchCamera](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#switchCamera) method. Each state can demand a different camera depending on events.

# Scene Actions
[Scene Actions](https://khanonjs.com/api-docs/modules/decorators_scene_scene_action.html) are executed on the scene provoking different effects. For example, an action could display rain, another could make actors bigger, another could show a visual event in the background, etc.

Many dinstinct actions can be executed at the same time, and like other Khanon.js objects, they have their own lifecycle and logic. Just pay attention their logic don't collide between themselves.
