# Spawning actors

Actors are spawned from scenes or scene states using the [ActorContrustor](https://khanonjs.com/api-docs/types/decorators_actor.ActorConstructor.html). When an actor is spawned, the scene stores it and the spawn method returns it. Use [Scene spawn](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#spawn) object to spawn actors calling the [scene.spawn.actor](https://khanonjs.com/api-docs/classes/decorators_scene.SceneSpawn.html#actor) method.

Actors can be spawned from scene states as well. [SceneState spawn](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#spawn) is just a shortcut to the [Scene spawn](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#spawn) object, in both cases the actor belongs to the same scene container.

You can also spawn *n* number of actors using the [scene.spawn.actor](https://khanonjs.com/api-docs/classes/decorators_scene.SceneSpawn.html#actor) *counter* property. Combine it with *alternativeOnSpawn* to configure each new actor instance.

To remove actors use the [Scene remove](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#remove) or [SceneState remove](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#remove) objects calling the [remove.actor](https://khanonjs.com/api-docs/classes/decorators_scene.SceneRemove.html#actor) method; or use the actor instance [destroy](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#destroy) method.

**my-scene-state.ts**
```
import * as BABYLON from '@babylonjs/core'
import {
  Actor,
  ActorInterface,
  Scene,
  SceneStateInterface,
  SpriteInterface
} from '@khanonjs/engine'

@Actor()
export class MyActor extends ActorInterface<SpriteInterface> {
  // ...
}

@Scene({
  actors: [MyActor] // The actors used by this scene are defined in the decorator prop 'actors'
})
export class MySceneState extends SceneStateInterface {
  myActor: ActorInterface

  onStart() {
    this.myActor = this.spawn.actor(MyActor)
    actor.transform.position = new BABYLON.Vector3(200, 0, 0)
  }

  onEnd() {
    // These are equivalent
    this.myActor.destroy()
    this.remove.actor(this.myActor)
  }
}
```