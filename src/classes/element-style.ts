export interface ElementStyleClassCondition {
  class: string
  classNot?: string
  condition?: boolean
}

export class ElementStyle {
  static getClass(styleModule: object, classes: string[]): string {
    return classes.map(_class => styleModule[_class]).join(' ') + ' '
  }

  static getClassCondition(styleModule: object, classes: ElementStyleClassCondition[]): string {
    return classes.map(_class => (!('condition' in _class) || _class.condition ) ? styleModule[_class.class] : _class.classNot && styleModule[_class.classNot]).join(' ') + ' '
  }
}
