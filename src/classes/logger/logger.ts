/**
 * Logger class for Node.js services.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { LoggerLevels } from './logger-levels'
import { LoggerProperties } from './logger-properties'

export class Logger {
  private static properties: LoggerProperties = {
    level: LoggerLevels.DEBUG
  }

  static setProperties(properties: LoggerProperties) {
    Object.assign(Logger.properties, properties)
  }

  static error(msg: string, ...params: any[]): void {
    if (Logger.properties.level >= LoggerLevels.ERROR) {
      console.error(Logger.msgParams(msg, params))
    }
  }

  static warn(msg: string, ...params: any[]): void {
    if (Logger.properties.level >= LoggerLevels.WARNING) {
      console.warn(Logger.msgParams(msg, params))
    }
  }

  static info(msg: string, ...params: any[]): void {
    if (Logger.properties.level >= LoggerLevels.INFO) {
      console.log(Logger.msgParams(msg, params))
    }
  }

  static debug(msg: string, ...params: any[]): void {
    if (Logger.properties.level >= LoggerLevels.DEBUG) {
      console.debug(Logger.msgParams(msg, params))
    }
  }

  /**
   * Return a string from unknown data type
   */
  static strFromData(data?: any): string {
    return data
      ? (data instanceof Error
        ? data.message
        : (typeof data === 'object'
          ? JSON.stringify(data)
          : data))
      : ''
  }

  private static msgParams(msg: string, params: any[]): string {
    params.forEach(param => {
      msg += ' ' + param
    })
    return msg
  }
}
