import classNames from 'classnames'
import React, {PureComponent} from 'react'
import Scroll from 'react-scroll'
import styles from './TextScroller.module.css'

interface TextScrollerProps {
  text: string
  fontSize: string
  flipX: boolean
  width: string
  height: string
  scrollDurationLine: number
}

export default class TextScroller extends PureComponent<TextScrollerProps> {
  static defaultProps = {
    text: '',
    fontSize: 'xx-large',
    flipX: false,
    width: 'auto',
    height: 'auto',
    scrollDurationLine: 1000
  }

  private refDisplayText: React.RefObject<HTMLParagraphElement> = React.createRef()

  scroll = () => {
    const {scrollDurationLine} = this.props
    const displayText = this.refDisplayText.current

    if (displayText != null) {
      const numLines = Array.from(displayText.getClientRects())
        .filter(r => r.y >= 0)
        .length

      const {height} = displayText.getBoundingClientRect()

      Scroll.animateScroll.scrollToBottom({
        duration: scrollDurationLine * numLines,
        isDynamic: true,
        offset: height,
        smooth: 'linear'
      })
    }
  }

  render() {
    const {text, fontSize, flipX, width, height} = this.props

    return <div className={classNames(styles.displayTextContainer, {[styles.flipX]: flipX})}
                style={{width: width, height: height}}>
      <p ref={this.refDisplayText}
         className={styles.displayText}
         style={{fontSize: fontSize}}>
        {text}
      </p>
    </div>
  }
}
