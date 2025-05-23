# Notify handler

Use the [Notify](https://khanonjs.com/api-docs/modules/kjs.KJS.Notify.html) handler to [send](https://khanonjs.com/api-docs/functions/kjs.KJS.Notify.send.html) messages globally. Read more in the [notifications](http://localhost:3000/getstarted/notifications-overview) page.
```
import { KJS } from '@khanonjs/engine'

example() {
  KJS.Notify.send(message, receivers, ...args)
}
```
