import React from 'react'

export type TypeReferencedComponentId = string | undefined

export abstract class ReferencedComponent<P = unknown, S = unknown> extends React.Component<P & { id?: string }, S> {
  private _hasChanged = false

  id: TypeReferencedComponentId

  constructor(props) {
    super(props)
    this.id = this.props.id
  }

  get hasChanged(): boolean {
    return this._hasChanged
  }

  setHasChanged(value: boolean) {
    if (value === true) {
      this._hasChanged = true
    } else {
      setTimeout(() => this._hasChanged = false, 1)
    }
  }
}
