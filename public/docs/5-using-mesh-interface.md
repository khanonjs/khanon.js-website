# Using the class decorator

To implement a mesh using class decorator you need to create a class, apply the [Mesh decorator](https://khanonjs.com/api-docs/functions/decorators_mesh.Mesh.html), and extend
[MeshInterface](https://khanonjs.com/api-docs/classes/decorators_mesh.MeshInterface.html) to gain access to its properties and methods.

**my-mesh.ts**
```
import {
  Mesh,
  MeshInterface
} from '@khanonjs/engine'

@Mesh({
  url: './assets/character.glb',
  animations: [
    { id: 'Walk', loop: true },
    { id: 'Run', loop: true },
    { id: 'Greet', loop: false }
  ]
})
export class MyMesh extends MeshInterface {
  onSpawn() {
    // Invoked on mesh spawn
  }

  onDestroy() {
    // Invoked on mesh destroy
  }
}
```

The [`url`](https://khanonjs.com/api-docs/interfaces/decorators_mesh.MeshProps.html#url) decorator property is optional. In case it is defined, the mesh is loaded from a [`.glb`](https://en.wikipedia.org/wiki/GlTF) file. If not defined no mesh will be loaded, so it can be created manually from the [onSpawn](https://khanonjs.com/api-docs/classes/decorators_mesh.MeshInterface.html#onSpawn) callback, and assigned to the instance using the [setMesh](https://khanonjs.com/api-docs/classes/decorators_mesh.MeshInterface.html#setMesh) method.

Meshes can be used by an actor [body](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#setBody) or [node](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#addNode), a scene map, or a [scene](https://khanonjs.com/api-docs/classes/decorators_scene.SceneSpawn.html#mesh). Every time a mesh is assigned to one of these objects, a new instance of the mesh is spawned. Mesh implements the lifecycle callbacks [onSpawn](https://khanonjs.com/api-docs/classes/decorators_mesh.MeshInterface.html#onSpawn) and [onDestroy](https://khanonjs.com/api-docs/classes/decorators_mesh.MeshInterface.html#onDestroy).

Use the [`babylon`](https://khanonjs.com/api-docs/classes/decorators_mesh.MeshInterface.html#babylon) accessor to access the Babylon objects. It contains the [Babylon Mesh](https://doc.babylonjs.com/typedoc/classes/BABYLON.Mesh), and the [Babylon Scene](https://doc.babylonjs.com/typedoc/classes/BABYLON.Scene) associated to the mesh.

To get the scene where the mesh has been spawned use [`scene`](https://khanonjs.com/api-docs/classes/decorators_mesh.MeshInterface.html#scene) accessor. Note this is not the Babylon scene, instead it is the Khanon.js scene.

A mesh counts with many transform properties and methods, all of them shortcuts to the actual babylon mesh properties. You can find them in the [MeshInterface](https://khanonjs.com/api-docs/classes/decorators_mesh.MeshInterface.html) documentation.

Use [`setEnabled`](https://khanonjs.com/api-docs/classes/decorators_sprite.SpriteInterface.html#setEnabled) to enable or disable the sprite.

# Using the property decorator

If you don't need to use the mesh lifecycle and you don't need to reuse it from different classes, you can create a mesh from a decorated property within the class that is going to use it. A mesh defined in a class property is evaluated to a [MeshConstructor](https://khanonjs.com/api-docs/types/decorators_mesh.MeshConstructor.html) on app start. Property meshes can be created in scenes, scene actions, scene states, actors, actor actions, actor states, and particles.

**mesh-property.ts**
```
import {
  Scene,
  SceneInterface,
  Mesh,
  MeshConstructor
} from '@khanonjs/engine'

@Scene()
export class MyScene extends SceneInterface {
  @Mesh({
    url: './assets/character.glb',
    animations: [
      { id: 'Walk', loop: true },
      { id: 'Run', loop: true },
      { id: 'Greet', loop: false }
    ]
  }) MyMesh: MeshConstructor

  onStart() {
    const mesh = this.spawn.mesh(this.MyMesh)
    mesh.position.x = 50
    mesh.position.y = 100
  }
}
```

# Decorator properties

Mesh decorator properties are defined in the [MeshProps](https://khanonjs.com/api-docs/interfaces/decorators_mesh.MeshProps.html) interface.

[`url`](https://khanonjs.com/api-docs/interfaces/decorators_mesh.MeshProps.html#url) is the path of the [`.glb`](https://en.wikipedia.org/wiki/GlTF) (or [`.gltf`](https://en.wikipedia.org/wiki/GlTF)) file to be loaded. Follow this [tutorial](https://doc.babylonjs.com/features/featuresDeepDive/animation/animatedCharacter) to see how to create a [`.glb`](https://en.wikipedia.org/wiki/GlTF) file. In case [`url`](https://khanonjs.com/api-docs/interfaces/decorators_mesh.MeshProps.html#url) is not defined, no mesh will be loaded. Use [onSpawn](https://khanonjs.com/api-docs/classes/decorators_mesh.MeshInterface.html#onSpawn) callback to create a mesh and assign it to the class through [setMesh](https://khanonjs.com/api-docs/classes/decorators_mesh.MeshInterface.html#setMesh) method.

The [`.glb`](https://en.wikipedia.org/wiki/GlTF) animations are defined in the [`animations`](https://khanonjs.com/api-docs/interfaces/decorators_mesh.MeshProps.html#animations) property. An animation won't be accessible if it is not defined in this property, even if it exists in the [`.glb`](https://en.wikipedia.org/wiki/GlTF) file.

If the property [`cached`](https://khanonjs.com/api-docs/interfaces/decorators_mesh.MeshProps.html#cached) is *true*, the [`.glb`](https://en.wikipedia.org/wiki/GlTF) file is kept in memory and it is not removed on scene change. In this way, if two or more scenes are sharing the same mesh, Khanon.js won't remove it and the loading process will be faster. To remove all cached meshes use the [`KJS.clearCache`](https://khanonjs.com/api-docs/functions/kjs.KJS.clearCache.html) method.

The [`cloneByInstances`](https://khanonjs.com/api-docs/interfaces/decorators_mesh.MeshProps.html#cloneByInstances) property defines whether the mesh is cloned by instances referencing to a parent mesh, or cloned duplicating the mesh. If `false` (default value), the mesh is cloned and a new mesh will be created, bringing the possibility to modify and apply shaders in it not affecting to its siblings. If `true` the mesh is cloned by instance, meaning the actual mesh is parent of all instances cloned from it. Read more [here](https://doc.babylonjs.com/features/featuresDeepDive/mesh/copies/instances).

# Animated meshes

The animations are defined in the [`animations`](https://khanonjs.com/api-docs/interfaces/decorators_mesh.MeshProps.html#animations) decorator property. It is an array of [MeshAnimation](https://khanonjs.com/api-docs/interfaces/decorators_mesh.MeshAnimation.html) objects. Each animation has a unique [`id`](https://khanonjs.com/api-docs/interfaces/decorators_mesh.MeshAnimation.html#id), and optional [`loop`](https://khanonjs.com/api-docs/interfaces/decorators_mesh.MeshAnimation.html#loop). Animations can be added manually as well using [addAnimation](https://khanonjs.com/api-docs/classes/decorators_mesh.MeshInterface.html#addAnimation), for what previously has to be created an [AnimationGroup](https://doc.babylonjs.com/typedoc/classes/BABYLON.AnimationGroup). Read more about animation groups [here](https://doc.babylonjs.com/features/featuresDeepDive/animation/groupAnimations).

[`keyFrames`](https://khanonjs.com/api-docs/interfaces/decorators_mesh.MeshAnimation.html#keyFrames) is used to generate events when the animation reach one or more frames. Subscribe to the key frame events trought the [subscribeToKeyframe](https://khanonjs.com/api-docs/classes/decorators_mesh.MeshInterface.html#subscribeToKeyframe) method. Use [clearKeyframeSubscriptions](https://khanonjs.com/api-docs/classes/decorators_mesh.MeshInterface.html#clearKeyframeSubscriptions) to clear all key frame subscriptions.

To play an animation call the [playAnimation](https://khanonjs.com/api-docs/classes/decorators_mesh.MeshInterface.html#playAnimation) method indicating the [`id`](https://khanonjs.com/api-docs/interfaces/decorators_mesh.MeshAnimation.html#id). You can override and define the [`options`](https://khanonjs.com/api-docs/interfaces/decorators_mesh.MeshAnimationOptions.html) for this animation, and receive a callback for each animaton end in the [`completed`](https://khanonjs.com/api-docs/classes/decorators_mesh.MeshInterface.html#playAnimation) parameter.

Call [stopAnimation](https://khanonjs.com/api-docs/classes/decorators_mesh.MeshInterface.html#stopAnimation) to stop the animation.

**animated-mesh.ts**
```
@Mesh({
  url: './assets/character.glb',
  animations: [{
    id: 'Walk',
    loop: true,
    keyFrames: [{
      id: 'floor-contact-walk',
      frames: [15, 30]
    }]
  }, {
    id: 'Run',
    loop: true,
    keyFrames: [{
      id: 'floor-contact-run',
      frames: [7, 15]
    }]
  }]
})
export class MyMesh extends MeshInterface {
  onSpawn() {
    this.subscribeToKeyframe('floor-contact-walk', () => {
      // Play a low sound on walk floor contact
    })
    this.subscribeToKeyframe('floor-contact-run', () => {
      // Play a loud sound on run floor contact
    })
    this.playAnimation('actor-run', undefined, () => {
      // Play character breath sound on animation complete
    })
  }
}
```

To set a fixed frame use [setFrame](https://khanonjs.com/api-docs/classes/decorators_mesh.MeshInterface.html#setFrame).

# Custom meshes

In case [`url`](https://khanonjs.com/api-docs/interfaces/decorators_mesh.MeshProps.html#url) is not defined in the decorator props, no mesh will be loaded. You can create a mesh and assign it to the class using the [`setMesh`](https://khanonjs.com/api-docs/classes/decorators_mesh.MeshInterface.html#setMesh) method.

**blank-mesh.ts**
```
import * as BABYLON from '@babylonjs/core'
import {
  Mesh,
  MeshInterface
} from '@khanonjs/engine'

@Mesh()
export class MyMesh extends MeshInterface {
  onSpawn() {
    // Create the mesh material
    const flatMaterial = new BABYLON.StandardMaterial('my-mesh-material', this.babylon.scene)
    flatMaterial.disableLighting = true
    flatMaterial.emissiveColor = new BABYLON.Color3(0.13, 0.13, 0.13)

    // Create the mesh
    const meshBjs = BABYLON.MeshBuilder.CreateDisc('my-mesh', { radius: 1125, tessellation: 200 }, this.babylon.scene)
    meshBjs.material = flatMaterial

    // Assign the mesh to this class
    this.setMesh(meshBjs)
  }
}
```

# Callbacks

The [onSpawn](https://khanonjs.com/api-docs/classes/decorators_mesh.MeshInterface.html#onSpawn) calllback is invoked on mesh spawn.

The [onDestroy](https://khanonjs.com/api-docs/classes/decorators_mesh.MeshInterface.html#onDestroy) calllback is invoked on mesh destroy.

## Loop Update

Meshes implement the [onLoopUpdate](https://khanonjs.com/api-docs/classes/decorators_mesh.MeshInterface.html#onLoopUpdate) optional callback. This callback creates an observer to the app loop update, being called every frame. Add logic to this callback to update anything in the mesh.
```
onLoopUpdate(delta: number) {
  // Add logic here
}
```

The [onLoopUpdate](https://khanonjs.com/api-docs/classes/decorators_mesh.MeshInterface.html#onLoopUpdate) callback can be enabled or disabled using the [`loopUpdate`](https://khanonjs.com/api-docs/classes/decorators_mesh.MeshInterface.html#loopUpdate) accessor.

## Canvas Resize

Implement the callback [onCanvasResize](https://khanonjs.com/api-docs/classes/decorators_mesh.MeshInterface.html#onCanvasResize) to receive any new canvas resize.
```
onCanvasResize(size: Rect) {
  // Rearrange layers
}
```