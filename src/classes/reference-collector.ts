import { Logger } from './logger/logger'

/**
 * Collect references on a .tsx
 * Use 'Element ID' to store a unique reference on collector Object
 *
 * IMPORTANT: bind to this same class instance on React component use 'onRef.bind(this.class)'
 */

export class ReferenceCollector {
  private collector = {}

  constructor(private readonly functionOnRef?: (e) => void) {}

  ref<P = any>(key: string): P {
    return this.collector[key]
  }

  onRef(reference) {
    if (!reference) {
      return
    }
    if (!reference.id) {
      Logger.warn('Reference collector - Object must have \'id\' property.')
      Logger.info(reference)
      return
    }
    const key = reference.id
    if (Object.hasOwn(this.collector, key)) {
      this.collector[key] = reference
    } else {
      Object.defineProperty(this.collector, key, { enumerable: true, value: reference, writable: true, configurable: true })
    }
    if (this.functionOnRef) {
      this.functionOnRef(reference)
    }
  }

  clear() {
    this.collector = {}
  }
}
