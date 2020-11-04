import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#8C2F39'
        },
        secondary: {
            main: '#461220'
        }
    },
    typography: {
        fontFamily: 'Lobster, Arial',
      },
})

const MaterialWrapper = (props) => {
    return (
        <ThemeProvider theme={theme}>
            <div style={{display: 'flex', flexDirection: 'column'}}>{props.children}</div>
        </ThemeProvider>
            
    )
}
 export default MaterialWrapper;