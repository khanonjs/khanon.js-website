# Particle overview

A [Particle](https://khanonjs.com/api-docs/modules/decorators_particle.html) system is a technique that simulates graphical effects by emitting a series of particles of different types. One of these types of particles are those emitted through the use of sprites, which can be animated or not. Once a particle (a sprite) is emitted, its properties may change throughout its life cycle, simulating different effects. Thanks to this technique you can simulate a fire throwing flames, a waterfall, magical drops around an object, etc.

# Particle types

Babylon.js implements three types of particles: sprite particles, solid particle system (SPS) which use meshes, and points cloud particle system (PCS). At the moment Khanon.js only implements sprite particles, which are the most commonly used in video games. Read more about Babylon.js particle system [here](https://doc.babylonjs.com/features/featuresDeepDive/particles).

Feel free to implement your own particle system in case you want to use any of the other two types, although Khanon.js will implement them eventually.

# Using particles

Babylon particles are always attached to a particle emitter positioned at some point of the scene.

The particle emitter is the source from where the particles are emitted. It can be attached to an actor, or it can be created and positioned in the scene itself. Usually you'll want to create an actor to attach the particles in case their emitter is a physical object. Once the particle emitter has been created, it can be started or stopped. Some particle emitters stop by theirselves based in some properties, others emit particles until the user stops the emission.