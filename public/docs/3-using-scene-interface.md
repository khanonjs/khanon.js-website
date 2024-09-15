# Creating a Scene

To create a new scene firstly you have to create a new class, apply the scene [decorator](https://khanonjs.com/api-docs/functions/decorators_scene.Scene.html), and extend [SceneInterface](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html) to get all properties and methods.

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
...
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
export class MyScene extends SceneInterface {}
...
```

## Scene configuration

You can fully configure the [Babylon Scene](https://doc.babylonjs.com/typedoc/classes/BABYLON.Scene) from the decorator props. There are two properties for this purpose:

[`options`](https://khanonjs.com/api-docs/interfaces/decorators_scene.SceneProps.html#options) are the [Babylon options](https://doc.babylonjs.com/typedoc/interfaces/BABYLON.SceneOptions).

[`configuration`](https://khanonjs.com/api-docs/interfaces/decorators_scene.SceneProps.html#configuration) are all the [Babylon Scene](https://doc.babylonjs.com/typedoc/classes/BABYLON.Scene) accessors that could be configured on the scene creation. This way you don't have to add that code to the [onLoad](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#onLoad) callback, Khanon.js will apply those values for you.

## States and Actions

The [`states`](https://khanonjs.com/api-docs/interfaces/decorators_scene.SceneProps.html#states) property declares the [States](https://khanonjs.com/api-docs/modules/decorators_scene_scene_state.html) that will be used by this scene. [States](https://khanonjs.com/api-docs/modules/decorators_scene_scene_state.html) are logical controllers. They decide what to do based in events and notifications. Each scene is switched to a single state by definition, being this mandatory.

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

abstract load(): [LoadingProgress](https://khanonjs.com/api-docs/modules/modules_hedsdsasdalperkhjghgfjkkghj.html)
abstract unload(): void
onLoaded?(): void
onUnload?(): void
abstract get loaded(): boolean

# Start and Stop

abstract start(state: SceneStateConstructor, stateSetup: any): SceneStateInterface
abstract stop(): void
onStart?(): void
onStop?(): void
abstract get started(): boolean

# Babylon object
abstract get babylon(): Pick<BabylonAccessor, 'scene'>

# Callbacks

onStart?(): void
onStop?(): void
onLoaded?(): void
onUnload?(): void

## Loop Update

## Canvas Resize

# Notifications

