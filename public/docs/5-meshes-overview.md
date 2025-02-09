# Mesh overview

A [mesh](https://khanonjs.com/api-docs/modules/decorators_mesh.html) is a 3D model built by vertices, edges and faces. Every face of a mesh is represented by a triangle; consequently the shape of the model is made up by a collection of triangles. Meshes are used to represent 3D objects, characters, and effects.

# Using meshes

 A [scene](https://khanonjs.com/api-docs/modules/decorators_scene.html) can be composed by different types of meshes. The [ground](https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set/ground_hmap) can be a mesh built by a height map, the walls of a room use to be composed by an union of planes, and a cloud can be represented by a semitransparent mesh whose shape's volume is changing frame by frame.

Meshes can also be used to represent and compose [actors](https://khanonjs.com/api-docs/modules/decorators_actor.html). An actor is built by the main [body](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#body), and different nodes attached to it in case it is composed by different pieces. Each one of these pieces is a different mesh with its own logic and animations.

# Animating meshes

By default a mesh is a static shape built by fixed vertices. If we want to add animations to it, 3D world adds the concept of keyframes.

A keyframe defines the position of a vertex in a time scale. For example, a vertex is in position (0, 0, 0) for keyframe 0; the same vertex is in position (1, 1, 1) for keyframe 1. That means the vertex will move from (0, 0, 0) to (1, 1, 1) in the transition from keyframe 0 to 1. Each keyframe is associated to an actual frame (time scale). If keyframe 0 is assigned to the frame 0, keyframe 1 is assigned to the frame 60, and the application is running 60 frames per second, that means the vertex will move from (0, 0 ,0) to (1, 1, 1) in one second. In that way the mesh is animated.

Besides vetices, a mesh can also contain one or more skeletons (armatures), each one composed by bones. Considering each bone's weight and other parameters, a bone transform affects the position of certain groups of vertices. In this case each keyframe contains each bone position, rotation and scale, making it possible to smoothly animate groups of vertices in a single step.

That's the basic concept of how a mesh is animated. Babylon.js has a great tutorial of how to easily create animated characters in [Blender](https://www.blender.org/). You can find this tutorial [here](https://doc.babylonjs.com/features/featuresDeepDive/animation/animatedCharacter).

Once you have the [`glTF`](https://en.wikipedia.org/wiki/GlTF) file of an animated character (or whatever you want to animate), Khanon.js will easily import it to the application as a mesh, having the possibility to use it in an actor's [body](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#setBody) or [node](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#addNode), bringing the possibility to add logic and interacting with it in the [actor](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html) interface. The mesh animations will be previously defined in the mesh decorator [props](https://khanonjs.com/api-docs/interfaces/decorators_mesh.MeshProps.html#animations).

# Materials and textures

The mesh material (or materials) defines how the surface is rendered by the graphic card. This is the way we can apply different properties to the mesh surface to define its appaerance. A material can for example contain a texture that will be drawn over the mesh according to some coordinates; it could also define how the lights affect to the surface, how the colors are reflected in it, and many other variants. Babylon.js has some great tutorials of how [materials](https://doc.babylonjs.com/features/featuresDeepDive/materials/using/materials_introduction/) work and how to apply them.

Usually these materials will be created and applied from the mesh editor (E.g. [Blender](https://www.blender.org/)), and exported together with the mesh in the [`glTF`](https://en.wikipedia.org/wiki/GlTF) file.

# Sahders

In case you want to execute instructions to modify the mesh aspect in real-time, Babylon.js supports [shaders](https://doc.babylonjs.com/features/featuresDeepDive/materials/shaders/). A shaders is a block of code that is executed frame by frame and which is assigned to vertices or surfaces. That's the way graphical cards handle complex 3D effects. Shaders are used through the [ShaderMaterial](https://doc.babylonjs.com/features/featuresDeepDive/materials/shaders/shaderMaterial/) class.

