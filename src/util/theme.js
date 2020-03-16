import { createMuiTheme } from "@material-ui/core";

const defaultTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#33c9dc',
      main: '#00bcd4',
      dark: '#008394',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff6333',
      main: '#ff3d00',
      dark: '#b22a00',
      contrastText: '#fff'
    }
  },
  typography: {
    useNextVariants: true
  },
  form: {
    textAlign: 'center'
  },
  image: {
    margin: '20px auto'
  },
  pageTitle: {
    margin: '10px auto'
  },
  textField: {
    margin: '5px 0'
  },
  button: {
    marginTop: 20,
    position: 'relative'
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10
  },
  progress: {
    position: 'absolute'
  },
  invisibleSeparator: {
    border: 'none',
    margin: 3
  },
  visibleSeparator: {
    width: '100%',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    marginBottom: 10
  },
  // paper: {
  //   border: '1px solid transparent'
  // },
  profile: {
    padding: 15,
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      // '& button': {
      //   position: 'absolute',
      //   top: '0',
      //   right: '0'
      // }
    },
    '& .profile-image': {
      width: 140,
      height: 140,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%'
    },
    '& .profile-details': {
      textAlign: 'center',
      wordBreak: 'initial',
      paddingBottom: 10,
      '& span, svg': {
        verticalAlign: 'middle'
      },
      '& a': {
        color: '#00bcd4'
      }
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0'
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer'
      }
    }
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px'
    }
  },
  closeButton: {
    position: 'absolute',
    top: '3px',
    right: '3px',
    padding: '5px',
    zIndex: 1000
  },
  progressSpinner: {
    position: 'absolute'
  },
  dialogContent: {
    padding: 20
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50
  },
  card: {
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		marginBottom: 10
	},
  cardContent: {
    padding: '8px 16px'
  },
  cardActions: {
    padding: '0 4px'
  }
});

const { breakpoints, typography: { pxToRem } } = defaultTheme;

const theme = {
  ...defaultTheme,
  overrides: {
    MuiTypography: {
      h2: {
        fontSize: pxToRem(60),
        [breakpoints.down("xs")]: {
          fontSize: pxToRem(50),
        }
      },
      h5: {
        color: defaultTheme.palette.primary.main,
        fontSize: pxToRem(24),
        [breakpoints.down("xs")]: {
          fontSize: pxToRem(22),
        }
      }
    }
  }
}

export default theme;
