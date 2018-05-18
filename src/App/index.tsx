import React, {ChangeEvent, Component} from 'react'
import screenfull from 'screenfull'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import {Button, FormControlLabel, Switch, TextField, Theme} from '@material-ui/core'
import {Description, FastForward, Fullscreen, SwapHoriz, TextFields} from '@material-ui/icons'

import styles from './App.module.css'
import TextScroller from './TextScroller'
import Slider from '@material-ui/core/Slider'
import AppBar from '@material-ui/core/AppBar'
import Grid from '@material-ui/core/Grid'
import withTheme from '@material-ui/core/styles/withTheme'

interface AppState {
  text: string,
  fontSize: number,
  scrollSpeed: number,
  flipX: boolean
}

interface AppProps {
  theme: Theme
}

class App extends Component<AppProps, AppState> {
  public state: AppState = {
    text: '',
    fontSize: .5,
    scrollSpeed: .5,
    flipX: false
  }

  private readonly refTextScroller: React.RefObject<TextScroller> = React.createRef()

  onFullScreenButtonClick = () => {
    if (screenfull.isEnabled) {
      screenfull.request()
    }
  }

  onStartButtonClick = () => this.refTextScroller.current?.scroll()

  onTextInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    this.setState({text: event.currentTarget.value})
  }

  onFontSizeInputChange = (event: ChangeEvent<{}>, value: number | number[]) => {
    this.setState({fontSize: value as number})
  }

  onSpeedInputChange = (event: ChangeEvent<{}>, value: number | number[]) => {
    this.setState({scrollSpeed: value as number})
  }

  onFlipXSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({flipX: event.currentTarget.checked})
  }

  render() {
    const {theme} = this.props
    const {text, fontSize, scrollSpeed, flipX} = this.state

    return <div className={styles.app}>
      <header>
        <AppBar position='fixed' style={{background: theme.palette.background.default}}>
          <Grid container spacing={4} justify='center' alignItems='center'>
            <Grid item>
              <FormControlLabel
                control={
                  <TextField
                    placeholder='Enter script.'
                    value={text}
                    onChange={this.onTextInputChange}/>
                }
                label={<Description/>}/>
            </Grid>
            <Grid item>
              <FormControlLabel
                className={styles.sliderControl}
                control={<Slider min={0} max={1} step={0.01} value={scrollSpeed} onChange={this.onSpeedInputChange}
                                 style={{width: '8em'}}/>}
                label={<FastForward/>}/>
            </Grid>
            <Grid item>
              <FormControlLabel
                control={<Slider min={0} max={1} step={0.01} value={fontSize} onChange={this.onFontSizeInputChange}
                                 style={{width: '8em'}}/>}
                label={<TextFields style={{transform: 'scaleX(-1)'}}/>}/>
            </Grid>
            <Grid item>
              <FormControlLabel
                control={<Switch onChange={this.onFlipXSwitchChange}/>}
                label={<SwapHoriz/>}/>
            </Grid>
            <Grid item>
              <Button onClick={this.onStartButtonClick} variant='outlined'>Start</Button>
            </Grid>
            <Grid item>
              <Button onClick={this.onFullScreenButtonClick} variant='outlined'><Fullscreen/></Button>
            </Grid>
            <Grid item>
              <a className={styles.githubLink}
                 href='https://github.com/kevinhwang/teleprompter'
                 target='_blank'
                 rel='noopener noreferrer'>
                <FontAwesomeIcon icon={faGithub}/>
              </a>
            </Grid>
          </Grid>
        </AppBar>
      </header>
      <TextScroller
        ref={this.refTextScroller}
        text={text}
        fontSize={`${(10 * fontSize) + 2}em`}
        flipX={flipX}
        scrollDurationLine={8000 * (1 - scrollSpeed) + 192}/>
    </div>
  }
}

export default withTheme(App)
