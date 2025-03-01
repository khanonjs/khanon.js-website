# Sending notifications

There are two ways to send notifications:

- Directly through the `notify` method of the element whose which you want to send the notification.

- Sending a notification globally to all elements of the app using the [KJS.Notify.send](https://khanonjs.com/api-docs/functions/kjs.KJS.Notify.send.html) method. Use the *receivers* property to send the message to spefific types of elements using their constructors.

```
import {
  Actor,
  ActorInterface,
  KJS,
  Notification,
  SceneState,
  SceneStateInterface,
  SpriteInterface
} from '@khanonjs/engine'

@Actor()
export class SomeActor extends ActorInterface<SpriteInterface> {
  @Notification({
    message: 'some-message'
  })
  someMessageReceived() {
    // 'some-message' received
  }
}

@SceneState()
export class SomeSceneState extends SceneStateInterface{
  @Notification({
    message: 'some-message'
  })
  someMessageReceived() {
    // 'some-message' received
  }
}

example() {
  // Send the notification globally to all elements
  KJS.Notify.send('some-message')

  // Send the notification globally to those specific elements
  KJS.Notify.send('some-message', [SomeActor, SomeSceneState])

  // Or send the message directly to them
  someActor.notify('some-message')
  someSceneState.notify('some-message')
}
```