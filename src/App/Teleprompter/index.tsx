import React, {useState} from 'react'
import useWindowScrollPosition from '@rehooks/window-scroll-position'
import Scroll from 'react-scroll'
import screenfull from 'screenfull'

import styles from './App.module.css'
import HeaderBar from './HeaderBar'
import TeleprompterText from './TeleprompterText'


export default function() {
  const [text, setText] = useState('')
  const [textSize, setTextSize] = useState(.5)
  const [scrollSpeed, setScrollSpeed] = useState(.5)
  const [flipX, setFlipX] = useState(false)
  const [numVisibleLines, setNumVisibleLines] = useState(0)

  const scrollPosition = useWindowScrollPosition()

  const scrollToBottom = () => {
    const lineScrollDurationMs = 8000 * (1 - scrollSpeed) + 192

    Scroll.animateScroll.scrollToBottom({
      duration: lineScrollDurationMs * numVisibleLines,
      isDynamic: true,
      offset: scrollPosition,
      smooth: 'linear'
    })
  }

  const requestFullScreen = async () => {
    if (screenfull.isEnabled) {
      await screenfull.request()
    }
  }

  return <div className={styles.app}>
    <HeaderBar text={text} textSize={textSize} speed={scrollSpeed} flipX={flipX} onTextChange={setText}
               onTextSizeChange={setTextSize} onSpeedChange={setScrollSpeed} onFlipXChange={setFlipX}
               onStartRequest={scrollToBottom} onFullscreenRequest={requestFullScreen}/>
    <TeleprompterText
      text={text}
      fontSize={`${(10 * textSize) + 2}em`}
      flipX={flipX}
      onNumVisibleLinesChange={setNumVisibleLines}/>
  </div>
}
