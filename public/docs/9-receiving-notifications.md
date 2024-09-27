# Notification method

To receive a notification, you just need to implement a notification decorated method within the class of the element where you want to receive the message.

**my-scene-state.ts**
```
import {
  Notification,
  SceneState,
  SceneStateInterface
} from '@khanonjs/engine'

@SceneState()
export class MySceneState extends SceneStateInterface {
  @Notification({
    message: 'event-message'
  })
  myNotification() {
    // Message received, do something!
  }
}
```

Notification methods can be implemented in [App](https://khanonjs.com/api-docs/modules/decorators_app.html), [Scene](https://khanonjs.com/api-docs/modules/decorators_scene.html), [SceneState](https://khanonjs.com/api-docs/modules/decorators_scene_scene_state.html), [Camera](https://khanonjs.com/api-docs/modules/decorators_camera.html), [Actor](https://khanonjs.com/api-docs/modules/decorators_actor.html), [ActorState](https://khanonjs.com/api-docs/modules/decorators_actor_actor_state.html), and [Particle](https://khanonjs.com/api-docs/modules/decorators_particle.html) interfaces.

# Decorator properties

Notification decorator properties are defined in the [NotificationProps](https://khanonjs.com/api-docs/interfaces/decorators_notification.NotificationProps.html) interface.

The message to trigger the notification method is defined in the [`message`](https://khanonjs.com/api-docs/interfaces/decorators_notification.NotificationProps.html#message) property.