# Actor overview

[Actors](https://khanonjs.com/api-docs/modules/decorators_actor.html) are logical elements that interact with other actors, the scene and/or the player. Actors are fully provided by Khanon.js, thus they don't have a direct relation with Babylon objects, despite their composition, which is made by sprites or meshes.

Actors are often dynamic elements, but they don't necessarily move around the scene. An actor can be a character, but they can also be a scene cloud that has some logic, a light pole, a trap, or anything that has some kind of interaction.

Khanon.js adds this element to simplify the integration of those dynamic elements, providing some specific methods to build their appearance and to implement their logic in the clearer and simpler way possible.

Each actor implements its own logical routines, which are ususally written in the [onLoopUpdate](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#onLoopUpdate) in case you want to update the actor according to the timeline, but can also be implemented in notification methods that will trigger different actions based in events. For example, you can create a notification that is triggered when the actor hits the floor with a certain force. This notification is sent by the physics engine system. You can send that force factor to the notification method of the actor, then play a sound with a certain volume that is based on that floor contact force; or maybe the actor can fall down if the force is too strong. Khanon.js aims to simplify all of these workflows and interactions.

# Actor composition

Actor composition refers to how the actor is built to be displayed on screen.

Actors have a main element of composition which if called [body](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#body). The body of an actor is the main piece to where any other piece will be attached. When you move, scale or rotate an actor, you are doing this to its body.

Once you have assigned the actor's body, you can start adding more nodes to it. Nodes are secondary pieces that are attached to the body in a relative position, rotation and scaling, so they move according to the body's movement.

# Actor type

There are two types of actors: [Sprite actors](https://khanonjs.com/api-docs/modules/decorators_sprite.html) and [Mesh actors](https://khanonjs.com/api-docs/modules/decorators_mesh.html). All their methods and features are the same, the only difference are the type of elements that compose them.

Sprite actors are actors whose body and nodes are composed by 2D sprites.

Mesh actors are actors whose body and nodes are composed by 3D meshes.

Since Babylon render environment is a 3D world regardless sprites or meshes are rendered, both sprite and mesh actors can cohexist in the same scene; but an actor cannot be composed by a mix of sprites and meshes. Actors are fully composed by sprites, or fully composed by meshes.

# Actor States

[Actor States](https://khanonjs.com/api-docs/modules/decorators_actor_actor_state.html) are the logical controllers of the actors. Each state controls the actor behaviour.

Unlike scenes, an actor doesn't need to be running a state if it has a simple logic, but it is recommended if the actor has different behaviours. Each actor state implements its own [onLoopUpdate](https://khanonjs.com/api-docs/classes/decorators_actor_actor_state.ActorStateInterface.html#onLoopUpdate) and notification methods. In that way we have each actor beahviour's logic separated by blocks, making the code granular and reusable. Khanon.js is an [Object-oriented programming (OOP)](https://en.wikipedia.org/wiki/Object-oriented_programming) framework, providing huge possibilities to extend from simple logical states to complex behaviours.

States are intended to be where the actual actor logic is implemented and the actor's actions are executed based on events.

# Actor Actions

[Actor Actions](https://khanonjs.com/api-docs/modules/decorators_actor_actor_action.html) are modifiers of the actors. Actor actions are executed temporal or permanently and they modify actor properties to perform certain actions.

An action can be for example moving the actor forward, making the actor jump, or displaying a glow around it.

Any amount of distinct actions can be running at the same time.

# Particles

You can create a [Particles](https://khanonjs.com/api-docs/modules/decorators_particle.html) emitter and attach it to the actor, starting it based on events just like actions.

Particles can be attached to the actor's [body](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#body) or nodes. That way you can for example attach to an actor's legs node a particle that displays step dust, and start it from a notification triggered when the leg's animation reach the frames stepping over the floor.

Particles can be attached and removed from the actor at any point.