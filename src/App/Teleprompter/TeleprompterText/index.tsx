import classNames from 'classnames'
import React, {RefObject, useLayoutEffect, useRef} from 'react'
import styles from './TextScroller.module.css'

interface TeleprompterTextProps {
  readonly text?: string
  readonly fontSize?: string
  readonly flipX?: boolean
  readonly width?: string
  readonly height?: string
  readonly onNumVisibleLinesChange?: {(numLines: number): void}
}

export default function({text = '', fontSize = 'xx-large', flipX = false, width = 'auto', height = 'auto', onNumVisibleLinesChange}: TeleprompterTextProps) {
  const displayTextRef: RefObject<HTMLParagraphElement> = useRef(null)

  useLayoutEffect(() => {
    const numLines: number = Array.from(displayTextRef?.current?.getClientRects()!)
      .filter(r => r.y >= 0)
      .length
    onNumVisibleLinesChange?.(numLines)
  })

  return <div className={classNames(styles.displayTextContainer, {[styles.flipX]: flipX})}
              style={{width: width, height: height}}>
    <p className={styles.displayText}
       style={{fontSize: fontSize}}
       ref={displayTextRef}>
      {text}
    </p>
  </div>
}
