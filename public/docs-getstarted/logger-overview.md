# Logger module

The [Logger](https://khanonjs.com/api-docs/classes/modules_logger.Logger.html) module allows the user to write different types of logs at runtime in the browser console.

# Using the logger module

To use the logger module import it and log any text.

**logger.ts**
```
import {
  Logger,
  LoggerLevels
} from '@khanonjs/engine'

Logger.level = LoggerLevels.TRACE

Logger.info('Hello World!')
```

## Logger levels

Use [`level`](https://khanonjs.com/api-docs/classes/modules_logger.Logger.html#level) accesor to set or get the logging level output. Check levels in [LoggerLevels](https://khanonjs.com/api-docs/enums/modules_logger.LoggerLevels.html) interface.

## Logger methods

Logs an [error](https://khanonjs.com/api-docs/classes/modules_logger.Logger.html#error) message:
```
Logger.error(msg: string, ...params: any[])
```

Logs a [warning](https://khanonjs.com/api-docs/classes/modules_logger.Logger.html#warn) message:
```
Logger.warn(msg: string, ...params: any[])
```

Logs an [info](https://khanonjs.com/api-docs/classes/modules_logger.Logger.html#info) message. This is the basic log:
```
Logger.info(msg: string, ...params: any[])
```

Logs a [debug](https://khanonjs.com/api-docs/classes/modules_logger.Logger.html#debug) message:
```
Logger.debug(msg: string, ...params: any[])
```

Logs a [debug error](https://khanonjs.com/api-docs/classes/modules_logger.Logger.html#debugError) message that will be only shown in debug mode:
```
Logger.debugError(msg: string, ...params: any[])
```

Logs a [trace](https://khanonjs.com/api-docs/classes/modules_logger.Logger.html#trace) message. Use it to trace the code while you are developing:
```
Logger.trace(msg: string, ...params: any[])
```