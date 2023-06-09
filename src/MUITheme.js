import { createTheme } from '@mui/material/styles';

const MUITheme = createTheme({
    components: {
        MuiPickersArrowSwitcher: {
          styleOverrides: {
            button: {
              color: "white"
            }
          }
        },
        MuiOutlinedInput: {
            styleOverrides: {
              root: {
                color: '#fff',
                backgroundColor: 'black',
                border: '1px solid #343941',
                borderRadius: '6px',
                marginLeft: '0px',
                "& .MuiOutlinedInput-notchedOutline": {
                  border: 'none',
                }
              },
              
            }
          },
        MuiDatePicker: {
            defaultProps: {
              OpenPickerButtonProps: {
                sx: {
                  color: '#47aa42'
                }
              }
            },
          },
        MuiPickersCalendarHeader: {
          styleOverrides: {
            labelContainer: {
              fontSize: "initial",
              color: "white"
            },
            root: {
              backgroundColor: "#161B22"
            }
          }
        }
      },
    breakpoints: {
        values: {
          xs: 0,
          sm: 576,
          md: 768,
          lg: 992,
          xl: 1200,
          xx: 1400,
        },
      },
    
    palette: {
      type: 'dark',
      action: {
        disabledBackground: 'grey',
        disabled: 'darkgrey'
      },
      primary: {
        main: '#0261C8',
        light: '#013978', 
        dark: '#452B75',
        contrastText: '#000',
        success: 'green',
      },
      secondary: {
        main: '#a6a7aa',
      },
      background: {
        default: '#010409',
        paper: '#161B22',
      },
      text: {
        primary: '#E7E7E7',
        secondary: '#E7E7E7',
        disabled: 'rgba(148,148,148,0.5)',
      },
    },
  });

  export default MUITheme