# Creating a Scene

To create a new *Scene* firstly you have to create a new class, **apply** the [***Scene***](https://khanonjs.com/api-docs/functions/decorators_scene.Scene.html) **decorator**, and **extend** [***SceneInterface***](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html) to get all properties and methods.

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

As you see, by default a *Scene* doesn't need anything. **You can create an empty scene** and start adding any Babylon element manually, controlling everything by yourself, but that's not what Khanon.js is intended to be.

# Scene props

A full [***SceneProps***](https://khanonjs.com/api-docs/interfaces/decorators_scene.SceneProps.html) decorated class would look like this:
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

Lets see what can we add to the [***SceneProps***](https://khanonjs.com/api-docs/interfaces/decorators_scene.SceneProps.html).

## Scene configuration

You can **fully configure the Babylon Scene** from the decorator props. There are two properties for this purpose:

[***options***](https://khanonjs.com/api-docs/interfaces/decorators_scene.SceneProps.html#options) are the [***Babylon options***](https://doc.babylonjs.com/typedoc/interfaces/BABYLON.SceneOptions).

[***configuration***](https://khanonjs.com/api-docs/interfaces/decorators_scene.SceneProps.html#configuration) are all the ***Babylon Scene*** `accessors` that could be configured on the *Scene* creation. This way you don't have to add that code to the [***onLoad***](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#onLoad) callback, Khanon.js will apply those values for you.

## States and Actions

The [***states***](https://khanonjs.com/api-docs/interfaces/decorators_scene.SceneProps.html#states) property declares the [***States***](https://khanonjs.com/api-docs/modules/decorators_scene_scene_state.html) that will be used by this Scene. [***States***](https://khanonjs.com/api-docs/modules/decorators_scene_scene_state.html) are **logical controllers**. They decide what to do based in events and notifications. Each *Scene* is switched to a single state by definition, being this mandatory.

The [***actions***](https://khanonjs.com/api-docs/interfaces/decorators_scene.SceneProps.html#states) property declares the [***Actions***](https://khanonjs.com/api-docs/modules/decorators_scene_scene_action.html) that will be used by this *Scene*. [***Actions***](https://khanonjs.com/api-docs/modules/decorators_scene_scene_action.html) are **events that can modify the *Scene*** in different ways. Many actions can be running at the same time.

## Cameras and GUIs

Although [***Cameras***](https://khanonjs.com/api-docs/modules/decorators_camera.html) use to be applied from *states*, they are declared in the [***cameras***](https://khanonjs.com/api-docs/interfaces/decorators_scene.SceneProps.html#cameras) property.

Same for [***GUIs***](https://khanonjs.com/api-docs/modules/decorators_gui.html), they use to be displayed from *states*, but they are declared in the [***guis***](https://khanonjs.com/api-docs/interfaces/decorators_scene.SceneProps.html#guis) property.

## Scene Maps

Declared in [***maps***](https://khanonjs.com/api-docs/interfaces/decorators_scene.SceneProps.html#maps) property, *Scene Maps* have two functions in Khanon.js.

**By one side**, they are **visual compositions of the *Scene***. Through a *Scene Map* you will be able to fully compose that layer of the *Scene*.

**By the other side**, they add a logical layer to the Scene, a **layer of interaction between the *Scene* and the *Actors***. Therefore a *Scene Map* could contain dynamic elements that will interact with our *Actors*.

Many **different *Scene Maps* can be used within a *Scene***, there is not restriction about this. You can combine a 2D background with a 3D horizontal scroll view, or however you want to compose your scene.

## Actors, Sprites, Meshes and Particles

[***Actors***](https://khanonjs.com/api-docs/modules/decorators_actor.html), [***Sprites***](https://khanonjs.com/api-docs/modules/decorators_sprite.html), [***Meshes***](https://khanonjs.com/api-docs/modules/decorators_mesh.html) and [***Particles***](https://khanonjs.com/api-docs/modules/decorators_particle.html) are **spawnable elements** that can be added or removed from the *Scene* on demand.

**[*Actors*](https://khanonjs.com/api-docs/modules/decorators_actor.html) are logical elements that interact with the themselves, the *Scene*, and/or the *player***. The *Actors* to be used in this *Scene* are declared in the [***actors***](https://khanonjs.com/api-docs/interfaces/decorators_scene.SceneProps.html#actors) property.

**[*Sprites*](https://khanonjs.com/api-docs/modules/decorators_sprite.html) are 2D textures that always face to the camera**. They can be used for many different purposes like compose an *Actor*, be a part of the *Scene*, or render *Particles*. *Sprites* are delcared in the [***sprites***](https://khanonjs.com/api-docs/interfaces/decorators_scene.SceneProps.html#particles) property.

**[*Meshes*](https://khanonjs.com/api-docs/modules/decorators_mesh.html) are 3D compositions**. Like particles, they can be used to compose an *Actor*, be a part of the *Scene*, or render *Particles*. *Meshes* are delcared in the [***meshes***](https://khanonjs.com/api-docs/interfaces/decorators_scene.SceneProps.html#meshes) property.

**[*Particles*](https://khanonjs.com/api-docs/modules/decorators_particle.html) add effects to the environment**, like the water of a waterfall or a fire throwing flares. *Particles* are declared in the [***particles***](https://khanonjs.com/api-docs/interfaces/decorators_scene.SceneProps.html#particles) property.

**Take in condireration that if an *Actor* or other element has already declared in its decorator the *sprites*, *meshes* or *particles* to use, you don't need to redeclare them in the *Scene*.**

Khanon.js will traverse the whole elements tree of the scene and will load all neccesary assets.

# Load and Unload

abstract load(): LoadingProgress
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

