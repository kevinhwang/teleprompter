import React, {ChangeEvent} from 'react'
import {
  AppBar,
  Button,
  createStyles,
  FormControlLabel,
  Grid,
  Link,
  Slider,
  Switch,
  TextField,
  Theme
} from '@material-ui/core'
import {Description, FastForward, Fullscreen, GitHub, SwapHoriz, TextFields} from '@material-ui/icons'
import {makeStyles} from '@material-ui/core/styles'

interface HeaderBarProps {
  readonly text?: string
  readonly speed?: number
  readonly textSize?: number
  readonly flipX?: boolean
  readonly onTextChange?: {(text: string): void}
  readonly onSpeedChange?: {(speed: number): void}
  readonly onTextSizeChange?: {(textSize: number): void}
  readonly onFlipXChange?: {(flipX: boolean): void}
  readonly onStartRequest?: {(): void}
  readonly onFullscreenRequest?: {(): void}
}

const useStyles = makeStyles(
  (theme: Theme) => createStyles({
    appBar: {
      background: theme.palette.background.default
    },
    githubLink: {
      color: 'white',
      '&:hover': {
        color: 'lightgrey'
      }
    }
  }))

function getInputValue(input: number | number[]): number {
  if (Array.isArray(input)) {
    if (input.length === 1) {
      return input[0]
    }
    throw Error('Array must have exactly one element')
  }
  return input
}

export default function({text = '', speed = .5, textSize = .5, flipX = false, onTextChange, onSpeedChange, onTextSizeChange, onFlipXChange, onStartRequest, onFullscreenRequest}: HeaderBarProps) {
  const styles = useStyles()

  const onTextInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onTextChange?.(event.currentTarget.value)
  const onFontSizeInputChange = (event: ChangeEvent<{}>, value: number | number[]) => onTextSizeChange?.(getInputValue(value))
  const onScrollSpeedInputChange = (event: ChangeEvent<{}>, value: number | number[]) => onSpeedChange?.(getInputValue(value))
  const onFlipXSwitchChange = (event: ChangeEvent<HTMLInputElement>) => onFlipXChange?.(event.currentTarget.checked)

  return <AppBar component='header' position='fixed' className={styles.appBar}>
    <Grid container spacing={4} justify='center' alignItems='center'>
      <Grid item>
        <FormControlLabel control={<TextField placeholder='Enter script.' value={text} onChange={onTextInputChange}/>}
                          label={<Description/>}/>
      </Grid>
      <Grid item>
        <FormControlLabel control={<Slider min={0} max={1} step={0.01} value={speed}
                                           onChange={onScrollSpeedInputChange} style={{width: '8em'}}/>}
                          label={<FastForward/>}/>
      </Grid>
      <Grid item>
        <FormControlLabel
          control={<Slider min={0} max={1} step={0.01} value={textSize} onChange={onFontSizeInputChange}
                           style={{width: '8em'}}/>}
          label={<TextFields style={{transform: 'scaleX(-1)'}}/>}/>
      </Grid>
      <Grid item>
        <FormControlLabel control={<Switch onChange={onFlipXSwitchChange}/>}
                          label={<SwapHoriz/>}/>
      </Grid>
      <Grid item>
        <Button onClick={onStartRequest} variant='outlined'>Start</Button>
      </Grid>
      <Grid item>
        <Button onClick={onFullscreenRequest} variant='outlined'><Fullscreen/></Button>
      </Grid>
      <Grid item>
        <Link
          href='https://github.com/kevinhwang/teleprompter'
          target='_blank'
          rel='noopener noreferrer'
          className={styles.githubLink}>
          <GitHub/>
        </Link>
      </Grid>
    </Grid>
  </AppBar>
}
