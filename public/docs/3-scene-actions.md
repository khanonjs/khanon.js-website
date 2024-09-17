# Scene actions overview

[Scene actions](https://khanonjs.com/api-docs/modules/decorators_scene_scene_action.html) are modifiers of the scene. They add effects and act on the scene to generate certain events or behaviours.

For example, an action could be rendering rain over the scene. When this action stats playing, it gets the scene and applies some dynamic textures that will be renderer until the action stops; another action could be modify the camera POV; or applying a post-processing map to make the scene pass from day to night. Any number of dinstinct actions can be playing at the same time, and they can be temporal or permanent.

Actions can be implemented in classes or methods.

When an action is implemented in a class it can be used by any scene compatible with it; while if it has been implemented in a method, it can only be used from the same class where it has been implemented.

# Scene action class decorator

# Scene action method decorator