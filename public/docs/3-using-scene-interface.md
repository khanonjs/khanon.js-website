# Creating a Scene

To create a new scene firstly you have to create a new class, apply the scene [decorator](https://khanonjs.com/api-docs/functions/decorators_scene.Scene.html), and extend [SceneInterface](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html) to gain access to its properties and methods.

**my-scene.ts**
```
import {
  Scene,
  SceneInterface
} from '@khanonjs/engine'

@Scene()
export class MyScene extends SceneInterface {
  onLoad() {
    // Load your Babylon elements here
  }

  onUnload() {
    // Unload your Babylon elements here
  }

  onStart() {
    // Start your code here
  }

  onStop() {
    // Stop your code here
  }
}
```

As you see, by default a scene doesn't need anything. You can create an empty scene and start adding any Babylon element manually, controlling everything by yourself, but that's not what Khanon.js is intended to be.

# Scene props

A decorated class with full [SceneProps](https://khanonjs.com/api-docs/interfaces/decorators_scene.SceneProps.html) would look like this:
```
@Scene({
  options: BABYLON.SceneOptions
  configuration: SceneConfiguration
  guis: GUIConstructor[]
  cameras: CameraConstructor[]
  maps: SceneMapConstructor[]
  states: SceneStateConstructor[]
  actors: ActorConstructor[]
  actions: SceneActionConstructor[]
  sprites: SpriteConstructor[]
  meshes: MeshConstructor[]
  particles: ParticleConstructor[]
})
export class MyScene extends SceneInterface {
  // ...
}
```

## Scene configuration

You can fully configure the [Babylon Scene](https://doc.babylonjs.com/typedoc/classes/BABYLON.Scene) from the decorator props. There are two properties for this purpose:

[`options`](https://khanonjs.com/api-docs/interfaces/decorators_scene.SceneProps.html#options) are the [Babylon options](https://doc.babylonjs.com/typedoc/interfaces/BABYLON.SceneOptions).

[`configuration`](https://khanonjs.com/api-docs/interfaces/decorators_scene.SceneProps.html#configuration) are all the [Babylon Scene](https://doc.babylonjs.com/typedoc/classes/BABYLON.Scene) accessors that could be configured on the scene creation. This way you don't have to add that code to the [onLoad](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#onLoad) callback, Khanon.js will apply those values for you.

## States and Actions

The [`states`](https://khanonjs.com/api-docs/interfaces/decorators_scene.SceneProps.html#states) property declares the [States](https://khanonjs.com/api-docs/modules/decorators_scene_scene_state.html) that will be used by this scene. [States](https://khanonjs.com/api-docs/modules/decorators_scene_scene_state.html) are logical controllers. They decide what to do based in events and notifications. When a scene starts it is switched to a single state by definition, being this mandatory.

The [`actions`](https://khanonjs.com/api-docs/interfaces/decorators_scene.SceneProps.html#states) property declares the [Actions](https://khanonjs.com/api-docs/modules/decorators_scene_scene_action.html) that will be used by this scene. [Actions](https://khanonjs.com/api-docs/modules/decorators_scene_scene_action.html) are events that can modify the scene in different ways. Many actions can be running at the same time.

## Cameras and GUIs

Although [Cameras](https://khanonjs.com/api-docs/modules/decorators_camera.html) use to be applied from states, they are declared in the scene props [`cameras`](https://khanonjs.com/api-docs/interfaces/decorators_scene.SceneProps.html#cameras) property.

Same for [GUIs](https://khanonjs.com/api-docs/modules/decorators_gui.html), they use to be displayed from states, but they are declared in the [`guis`](https://khanonjs.com/api-docs/interfaces/decorators_scene.SceneProps.html#guis) property.

## Scene Maps

Declared in [`maps`](https://khanonjs.com/api-docs/interfaces/decorators_scene.SceneProps.html#maps) property, scene maps have two functions in Khanon.js.

By one side, they are visual compositions of the scene. Through a scene map you will be able to fully compose that layer of the scene.

By the other side, they add a logical layer to the scene, a layer of interaction between the scene and the actors. Therefore a scene map could contain dynamic elements that will interact with our actors.

Many different scene maps can be used within a scene, there is not restriction about this. You can combine a 2D background with a 3D horizontal scroll view, or however you want to compose your scene.

## Actors, Sprites, Meshes and Particles

[Actors](https://khanonjs.com/api-docs/modules/decorators_actor.html), [Sprites](https://khanonjs.com/api-docs/modules/decorators_sprite.html), [Meshes](https://khanonjs.com/api-docs/modules/decorators_mesh.html) and [Particles](https://khanonjs.com/api-docs/modules/decorators_particle.html) are spawnable elements that can be added or removed from the scene at any point.

[Actors](https://khanonjs.com/api-docs/modules/decorators_actor.html) are logical elements that interact with the themselves, the scene, and/or the player. The actors to be used in this scene are declared in the [`actors`](https://khanonjs.com/api-docs/interfaces/decorators_scene.SceneProps.html#actors) property.

[Sprites](https://khanonjs.com/api-docs/modules/decorators_sprite.html) are 2D textures that always face to the camera. They can be used for many different purposes like compose an actor, be a part of the scene, or render particles. Sprites are delcared in the [`sprites`](https://khanonjs.com/api-docs/interfaces/decorators_scene.SceneProps.html#particles) property.

[Meshes](https://khanonjs.com/api-docs/modules/decorators_mesh.html) are 3D compositions. Like particles, they can be used to compose an actor, be a part of the scene, or render particles. Meshes are delcared in the [`meshes`](https://khanonjs.com/api-docs/interfaces/decorators_scene.SceneProps.html#meshes) property.

[Particles](https://khanonjs.com/api-docs/modules/decorators_particle.html) add effects to the environment, like the water of a waterfall or a fire throwing flares. Particles are declared in the [`particles`](https://khanonjs.com/api-docs/interfaces/decorators_scene.SceneProps.html#particles) property.

Take in condireration that if an actor or other element has already declared in its decorator the sprites, meshes or particles to use, you don't need to redeclare them in the scene.

Khanon.js will traverse the whole elements tree of the scene and will load all neccesary assets.

# Load and Unload

To load a scene use the scene method [load](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#load) or the [KJS.Scene.load](https://khanonjs.com/api-docs/functions/kjs.KJS.Scene.load.html) global method. After the loading has been completed, the callback [onLoad](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#onLoad) is invoked.

When a scene is loaded it places all neccesary assets in memory. After that, any actor, sprite, mesh or particle associated to the scene can be spawned.

To unload the scene use the scene method [unload](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#unload) or the [KJS.Scene.unload](https://khanonjs.com/api-docs/functions/kjs.KJS.Scene.unload.html) global method. The [onUnload](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#onUnload) callback is invoked right before the unloading process.

Use the accessor [`loaded`](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#loaded) to know if the scene has been loaded or not.

# Start and Stop

After the scene has been loaded, it can start. Starting the scene means adding it to the [Babylon runRenderLoop](https://doc.babylonjs.com/typedoc/classes/BABYLON.Engine#runRenderLoop) method. From this point the scene starts being rendered on the canvas, the scene logic begins and elements can start being spawned.

To start a scene use the [start](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#start) method or the [KJS.Scene.start](https://khanonjs.com/api-docs/functions/kjs.KJS.Scene.start.html) global method. The start methods require to pass a [SceneState](https://khanonjs.com/api-docs/modules/decorators_scene_scene_state.html) and its [setup](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#setup) object. A scene is always associated to a state that runs the logic. When the scene starts the [onStart](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#onStart) callback is invoked, being this the entrypoint of the scene.

To stop the scene use the [stop](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#stop) method or the [KJS.Scene.stop](https://khanonjs.com/api-docs/functions/kjs.KJS.Scene.stop.html) global method. This takes the scene out of the [Babylon runRenderLoop](https://doc.babylonjs.com/typedoc/classes/BABYLON.Engine#runRenderLoop) method and stops being rendered. All spawned elements are removed and the scene state stops working. Right before the scene stops the [onStop](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#onStop) callback is invoked.

Use the accessor [`started`](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#started) to know if the scene has started or not.

# Babylon object

To access to the [Babylon Scene](https://doc.babylonjs.com/typedoc/classes/BABYLON.Scene) object, use the [`babylon`](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#babylon) accessor. You can use it and modify whatever you need, but remember not to remove any element previously created by Khanon.js

# Callbacks

Apart the previously mentioned [onLoad](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#onLoad), [onUnload](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#onUnload), [onStart](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#onStart) and [onStop](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#onStop) callbacks, a secene can implement the optional callbacks [onLoopUpdate](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#onLoopUpdate) and [onCanvasResize](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#onCanvasResize).

## Loop Update

Every scene can define [onLoopUpdate](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#onLoopUpdate) callback. This callback creates an observer to the app loop update method, being called every frame. Add logic here to check any state or update any element.
```
onLoopUpdate(delta: number) {
  // Add logic here
}
```

The [onLoopUpdate](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#onLoopUpdate) callback can be enabled or disabled using the [`loopUpdate`](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#loopUpdate) accessor.

## Canvas Resize

Define the callback [onCanvasResize](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#onCanvasResize) to receive any new canvas resize.
```
onCanvasResize(size: Rect) {
  // Rearrange layers
}
```

# Notifications

The scene can also receive notifications through the [notify](https://khanonjs.com/api-docs/classes/decorators_app_app_state.AppStateInterface.html#notify) method or the global [KJS.Notify.send](https://khanonjs.com/api-docs/functions/kjs.KJS.Notify.send.html) method. Read more about notifications in the Notifications section.

