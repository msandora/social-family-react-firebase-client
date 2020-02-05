import React, { Component, Fragment } from 'react';
import MyButton from '../../util/MyButton';

// MUI Stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withStyles from '@material-ui/core/styles/withStyles';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
// import { useTheme } from '@material-ui/core/styles';

// Icons
import CloseIcon from '@material-ui/icons/Close';
import Fab from '@material-ui/core/Fab';

import dayjs from 'dayjs';


const styles = (theme) => ({
  ...theme,
  closeButton: {
    position: 'absolute',
    top: '3px',
    right: '3px'
  }
});

class PersonDialog extends Component {
	state = {
		open: false
	};

	handleOpen = () => {
		this.setState({ open: true });
	};
	handleClose = () => {
		this.setState({ open: false });
	};

	render() {
		const { classes, person } = this.props;
		const{ open } = this.state;
		// const theme = useTheme();
		// const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
		let currentDate = dayjs().format('MMMM DD, YYYY');
		let birthDate = dayjs(person.dob).format('MMMM DD, YYYY');
		return ( 
			<Fragment>
				<Fab variant="extended" color="primary" 
					onClick={this.handleOpen}
					onTouchStart={this.handleOpen}>&nbsp;</Fab>
				<Dialog
				// fullScreen={fullScreen}
				open={open}
				onClose={this.handleClose}
				>
					<MyButton
						tip="Close"
						onClick={this.handleClose}
						tipClassName={classes.closeButton}
					>
						<CloseIcon />
					</MyButton>
					<DialogTitle id="responsive-dialog-title">{person.firstName} {person.lastName}</DialogTitle>
					<DialogContent>
							<DialogContentText>
							{(birthDate !== currentDate)
								? <span> Birth Date: {dayjs(person.dob).format('MMMM DD, YYYY')}<br/></span> 
								: <span> Birth Date: Unknown <br/></span>  
							}
							
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<br/><br/>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
							</DialogContentText>
					</DialogContent>
					<DialogActions>
							<Button onClick={this.handleClose} color="primary" autoFocus>Close</Button>
					</DialogActions>
				</Dialog>
			</Fragment>
		);
	}
}


export default withStyles(styles)(PersonDialog);