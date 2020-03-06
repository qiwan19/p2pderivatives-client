import React from 'react'
import MainLayout from './'
import { MuiThemeProvider } from '@material-ui/core'
import theme from '../../theme'

export default {
  title: 'Components/Organisms/MainLayout',
  parameters: {
    backgrounds: [{ name: 'p2pd', value: '#303855' }],
  },
}

export const mainLayout = () => (
  <MuiThemeProvider theme={theme}>
    <div style={{ height: 1366, width: 768, display: 'flex' }}>
      <MainLayout>
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <p>TEST CONTENT</p>
        </div>
      </MainLayout>
    </div>
  </MuiThemeProvider>
)