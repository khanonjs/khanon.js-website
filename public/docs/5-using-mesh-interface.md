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

A mesh counts with many transform properties and methods, all of them shortcuts to the actual babylon mesh properties. You can find them in the [mesh interface](https://khanonjs.com/api-docs/classes/decorators_mesh.MeshInterface.html) documentation.

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
  }) myMesh: MeshConstructor

  onStart() {
    const mesh = this.spawn.mesh(this.myMesh)
    mesh.position.x = 50
    mesh.position.y = 100
  }
}
```

# Decorator properties

Mesh decorator properties are defined in the [MeshProps](https://khanonjs.com/api-docs/interfaces/decorators_mesh.MeshProps.html) interface.

Use [`url`](https://khanonjs.com/api-docs/interfaces/decorators_mesh.MeshProps.html#url) to define the path to the image file to load for this mesh. If [`url`](https://khanonjs.com/api-docs/interfaces/decorators_mesh.MeshProps.html#url) is not defined, a blank texture is created and a exclusive [Babylon MeshManager](https://doc.babylonjs.com/typedoc/classes/BABYLON.MeshManager) is assigned to the mesh.

The [`.glb`](https://en.wikipedia.org/wiki/GlTF) animations are defined in the [`animations`](https://khanonjs.com/api-docs/interfaces/decorators_mesh.MeshProps.html#animations) property. An animation won't be accessible if it is not defined in this property, even if it exists in the [`.glb`](https://en.wikipedia.org/wiki/GlTF) file.

If the property [`cached`](https://khanonjs.com/api-docs/interfaces/decorators_mesh.MeshProps.html#cached) is *true*, the image is kept in memory and it is not  removed on scene change. In this way, if two or more scenes are sharing the same mesh, Khanon.js won't remove it and the loading process will be faster. To remove all cached images use the [`KJS.clearCache`](https://khanonjs.com/api-docs/functions/kjs.KJS.clearCache.html) method.

# Animated meshes

If the image is a meshesheet to generate animated meshes, you need to indicate the number of frames in the [`numFrames`](https://khanonjs.com/api-docs/interfaces/decorators_mesh.MeshProps.html#numFrames) decorator property. **At the moment the only supported format of meshesheets is equal size for every frame along the meshesheet, no matter how many columns and rows it has.**

Decorator properties [`width`](https://khanonjs.com/api-docs/interfaces/decorators_mesh.MeshProps.html#width) and [`height`](https://khanonjs.com/api-docs/interfaces/decorators_mesh.MeshProps.html#height) represent the frame size.

The animations are defined in the [`animations`](https://khanonjs.com/api-docs/interfaces/decorators_mesh.MeshProps.html#animations) decorator property. It is an array of [MeshAnimation](https://khanonjs.com/api-docs/interfaces/decorators_mesh.MeshAnimation.html) objects. Each animation has a unique [`id`](https://khanonjs.com/api-docs/interfaces/decorators_mesh.MeshAnimation.html#id), and optionals [`frameStart`](https://khanonjs.com/api-docs/interfaces/decorators_mesh.MeshAnimation.html#frameStart), [`frameEnd`](https://khanonjs.com/api-docs/interfaces/decorators_mesh.MeshAnimation.html#frameEnd), [`delay`](https://khanonjs.com/api-docs/interfaces/decorators_mesh.MeshAnimation.html#delay) and [`loop`](https://khanonjs.com/api-docs/interfaces/decorators_mesh.MeshAnimation.html#loop). Animations can be added manually as well using [addAnimation](https://khanonjs.com/api-docs/classes/decorators_mesh.MeshInterface.html#addAnimation).

[`keyFrames`](https://khanonjs.com/api-docs/interfaces/decorators_mesh.MeshAnimation.html#keyFrames) is used to generate events when the animation reach one or more frames. Subscribe to the key frame events trought the [subscribeToKeyframe](https://khanonjs.com/api-docs/classes/decorators_mesh.MeshInterface.html#subscribeToKeyframe) method. Use [clearKeyframeSubscriptions](https://khanonjs.com/api-docs/classes/decorators_mesh.MeshInterface.html#clearKeyframeSubscriptions) to clear all key frame subscriptions.

To play an animation call the [playAnimation](https://khanonjs.com/api-docs/classes/decorators_mesh.MeshInterface.html#playAnimation) method indicating the `id`. You can override the [`loop`](https://khanonjs.com/api-docs/classes/decorators_mesh.MeshInterface.html#playAnimation) animation property, and define a callback for each animaton end in the [`completed`](https://khanonjs.com/api-docs/classes/decorators_mesh.MeshInterface.html#playAnimation) parameter.

Call [stopAnimation](https://khanonjs.com/api-docs/classes/decorators_mesh.MeshInterface.html#stopAnimation) to stop the animation.

**animated-mesh.ts**
```
@Mesh({
  url: './assets/character-meshesheet.png',
  width: 50,
  height: 80,
  numFrames: 20,
  animations: [{
    id: 'actor-walk', frameStart: 0, frameEnd: 9, delay: 100, loop: true,
    keyFrames: [{
      id: 'floor-contact-walk',
      frames: [2, 4, 6, 8]
    }]
  }, {
    id: 'actor-run', frameStart: 10, frameEnd: 19, delay: 100, loop: true,
    keyFrames: [{
      id: 'floor-contact-run',
      frames: [13, 16]
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

If you want to manipulate a mesh texture and draw directly in it, you might create a blank texture mesh leaving the [`url`](https://khanonjs.com/api-docs/interfaces/decorators_mesh.MeshProps.html#url) decorator prop undefined.

That means the mesh generates a new texture per mesh spawn, allowing you to draw in each one of them without interferences.

Draw texts using the [drawText](https://khanonjs.com/api-docs/classes/decorators_mesh.MeshInterface.html#drawText) method, or grab the texture from `babylon.meshManager.texture` and manipulate it by yourself.

**blank-mesh.ts**
```
@Mesh({
  width: 100,
  height: 100
})
export class MyMesh extends MeshInterface {
  onSpawn() {
    this.drawText('Hello Khanon.js!', {
      fontName: 'my-css-font-name',
      fontSize: 20,
      textColor: '#ffffff'
    })

    // or...

    const texture = this.babylon.meshManager.texture
    // Draw on it!
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