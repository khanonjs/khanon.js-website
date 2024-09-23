# Sprite overview

[Sprites](https://khanonjs.com/api-docs/modules/decorators_sprite.html) are two-dimensional images that always face to the camera. They have a single axis of rotation which is perpendicular to the camera. They can be used in scenes, actors and particles.

Sprites, like any other visual element in Babylon.js, are rendered in the 3D space of the environment, meaning they can be moved along the three-dimensional axes. This means you can combine sprites and meshes in the same scene.

# Using sprites

Sprites can be used as a part of the [scene](https://khanonjs.com/api-docs/modules/decorators_scene.html) in different ways. They can compose the background through a tile map, or they can belong to the main scene in the foreground. They can also be used in scene dynamic elements like doors, lights, traps, effects, etc.

Sprites can be used to compose [actors](https://khanonjs.com/api-docs/modules/decorators_actor.html). From the [body](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#body) of the actor, to the attached nodes like for example the arms, legs and head of an actor. Khanon.js brings the possibility to attach different sprites to the same body of an actor, making it possible to build the actor by pieces.

Another way to use sprites is in sprite [particles](https://khanonjs.com/api-docs/modules/decorators_particle.html). Particles emitters will emit sprites that will be moved, scaled and/or rotated along the timeline. You can also animate sprite particles.

# Animated sprites

By default a sprite is a texture created from a single image without frames and animations; but sometimes we want to add animations to that sprite. To do so, different frames of the sprite are contained in the same image, being it possible to create a texture from that image and render just a portion of it, being each portion a different frame of the sprite. In that way it is possible to create animated sprites. This is called spritesheet.

# Render environment

Babylon.js works in a three-dimensional environment regardless you use 3D or 2D elements in the scene.

Even if you opt for purely 2D scenes using only sprites, they will be rendered in a three-dimensional environment, which is actually an advantage.

Something usual in video games is to combine 3D elements and 2D elements, using a fixed horizontal or vertical camera. The camera follows the action just in two-dimensions, but the actual scene is rendered in a 3D environment. Actors, backgrounds, foregrounds, and elements are a combination of 3D meshes and 2D sprites. Since there are sprites that form part of the scene, the game action is bidimensional. This is called 2.5D game.

It is your choice if you want to combine 2D and 3D elements; if you want go for pure 2D scenes; or if you want to go for a 3D video game. They all rely in the same three-dimensional environment.
