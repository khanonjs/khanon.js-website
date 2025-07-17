# Installing Khanon.js

Add it to your project from the [NPM](https://www.npmjs.com/package/@khanonjs/engine) repository:

`npm install @khanonjs/engine --save`

## CLI

Install the [CLI](https://www.npmjs.com/package/@khanonjs/cli) globally to *create*, *run* and *build* your project through the command line:

`npm install @khanonjs/cli -g`

# Bundle optimization

Elements are normally imported from the root path. This is done because it is the first *IDE* suggestion, it is also a clean way to import elements.

```
import * as BABYLON from '@babylonjs/core'
import {
  Actor,
  ActorInterface
  Notification,
  Scene,
  SceneInterface
} from '@khanonjs/engine'
```

To optimize bundle it is recommended to import elements through the full path. In this way the bundle builder will be able to perform tree-shaking.
This must be done with Babylon.js and Khanon.js imports.

```
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight'
import { Color4 } from '@babylonjs/core/Maths/math.color'
import {
  Actor,
  ActorInterface
} from '@khanonjs/engine/decorators/actor'
import { Notification } from '@khanonjs/engine/decorators/notification'
import { Scene } from '@khanonjs/engine/decorators/scene'
import { SceneStateInterface } from '@khanonjs/engine/decorators/scene/scene-state'
```

Optimizing the bundle will result in less size and faster loading.

