import React from 'react'

import styles from './background.module.scss'

export class Background extends React.Component {
  render() {
    return (
      <>
        <div className={styles['shape']} />
      </>
    )
  }
}
