import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import {render} from '@testing-library/react'
import App from '.'

test('renders without crashing', () => {
  render(<App/>)
})
