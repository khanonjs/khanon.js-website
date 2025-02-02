# Spawning meshes

Meshes are spawned using the [MeshContrustor](https://khanonjs.com/api-docs/types/decorators_mesh.MeshConstructor.html) regardless they have been created by a decorated class or property. When the mesh is spawned, a new instance is created and stored in a container from where it will be managed. Once a mesh is spawned Khanon.js will return its instance giving you the possibility to manage and manipulate it.

Meshes can be spawned by two different elements: [Actors](https://khanonjs.com/api-docs/modules/decorators_actor.html) and [Scenes](https://khanonjs.com/api-docs/modules/decorators_scene.html).

# Using meshes in actors

In the case of [Actors](https://khanonjs.com/api-docs/modules/decorators_actor.html), meshes can be used to compose their [body](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#body) or [nodes](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#getNode). If you want to use a mesh in an actor, use the [setBody](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#setBody) or the [addNode](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#addNode) methods. They assign a mesh to the actor and return the spawned [MeshInsatnce](https://khanonjs.com/api-docs/classes/decorators_mesh.MeshInterface.html). Note in both cases of decorated class and property, the [MeshContrustor](https://khanonjs.com/api-docs/types/decorators_mesh.MeshConstructor.html) is used in the same way. The actor will remove the mesh instances once they are no longer used.

**my-actor.ts**
```
import {
  ActorInterface,
  Mesh,
  MeshConstructor,
  MeshInterface
} from '@khanonjs/engine'

export class MyActor extends ActorInterface<MeshInterface> {
  @Mesh({
    url: './assets/dog-body.glb',
    animations: [
      { id: 'Walk', loop: true },
      { id: 'Run', loop: true }
    ]
  }) MeshBody: MeshConstructor

  @Mesh({
    url: './assets/dog-head.glb',
    animations: [
      { id: 'Bark', loop: true }
    ]
  }) MeshHead: MeshConstructor

  onSpawn() {
    const meshBody = this.setBody(this.MeshBody)
    const meshHead = this.addNode(this.MeshHead, 'head')
  }
}
```

# Using meshes in scenes

You can generate meshes in the scene and manipulate them yourself. To spawn a new mesh use the [scene.spawn.mesh](https://khanonjs.com/api-docs/classes/decorators_scene.SceneSpawn.html#mesh) method. This method returns the instance [MeshInterface](https://khanonjs.com/api-docs/classes/decorators_mesh.MeshInterface.html), which you can store in a variable and work with it.

You can also spawn *n* number of meshes using the [scene.spawn.mesh](https://khanonjs.com/api-docs/classes/decorators_scene.SceneSpawn.html#mesh) *counter* property. Combine it with *alternativeOnSpawn* to configure each new mesh instance.

Meshes are removed on scene unload, but you can also remove them manually using [scene.remove.mesh](https://khanonjs.com/api-docs/classes/decorators_scene.SceneRemove.html#mesh) or the mesh [destroy](https://khanonjs.com/api-docs/classes/decorators_mesh.MeshInterface.html#destroy) method.

[spawn](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#spawn) and [remove](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#remove) objects are also available in scene states.

**my-scene.ts**
```
import {
  Mesh,
  MeshConstructor,
  MeshInterface,
  Scene,
  SceneInterface
} from '@khanonjs/engine'

@Scene()
export class MyScene extends SceneInterface {
  characterMesh: MeshInterface

  @Mesh({
    url: './assets/character.glb',
    animations: [
      { id: 'Walk', loop: true },
      { id: 'Run', loop: true },
      { id: 'Greet', loop: false }
    ]
  }) MeshCharacter: MeshConstructor

  onStart() {
    this.characterMesh = this.spawn.mesh(this.MeshCharacter)

    // Place the character and and play the Walk animation
    this.characterMesh.position.x = 100
    this.characterMesh.position.y = 200
    this.characterMesh.playAnimation('Walk')
  }

  onLoopUpdate(delta: number) {
    // Move the character
    this.characterMesh.position.x += 1 * delta
  }
}
```