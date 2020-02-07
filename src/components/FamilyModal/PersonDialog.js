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

import NoImg from '../../images/no-img.png';

// Icons
import CloseIcon from '@material-ui/icons/Close';
import Fab from '@material-ui/core/Fab';

import dayjs from 'dayjs';


const styles = (theme) => ({
  ...theme
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

		const isMobile = window.innerWidth <= 500;

		let currentDate = dayjs().format('MMMM DD, YYYY');
		let birthDate = dayjs(person.dob).format('MMMM DD, YYYY');


	// if(person.parents && person.parents.length && person.parents[0].parentName && person.parents[1].parentName) {
	// 	if(person.firstName === 'Valerie') {
	// 		console.log('person', person);
	// 		let personParents = `${person.firstName} is the child of ${person.parents[0].parentName} and ${person.parents[1].parentName} ${person.lastName}`;
	// 		console.log(personParents);
	// 	}
	// }
		
		return ( 	
			<Fragment>
				<Fab variant="extended" color="primary" 
					onClick={this.handleOpen}
					onTouchStart={this.handleOpen} 
					style={{
						overflow: "hidden",
						minWidth: "45px"
					}}>          
					<img src={NoImg} alt="profile" className="profile-image" 
					style={{
						height: "53px"
					}}/>
				</Fab>
				<Dialog fullWidth={true}
				fullScreen={isMobile}
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
					<DialogTitle id="responsive-dialog-title">{person.firstName} {person.middleName} {person.lastName}</DialogTitle>
					<DialogContent>
							<DialogContentText>
							{(birthDate !== currentDate)
								? <span><b>Birth Date:</b> {dayjs(person.dob).format('MMMM DD, YYYY')}</span> 
								: <span><b>Birth Date:</b> Unknown</span>  
							}		
							</DialogContentText>
							{(person.parents && person.parents.length && person.parents[0].parentName && person.parents[1].parentName) 
								? 
								<DialogContentText>
									<span>{person.firstName} is the child of {person.parents[0].parentName} and {person.parents[1].parentName} 
										{(person.maidenName !== undefined) 
											? <span> {person.maidenName}</span>
											: <span> {person.lastName}</span>
										}			
									</span>
								</DialogContentText> 
								: null
							}	
							{(person.maidenName !== undefined) 
								? 
								<DialogContentText>
									<span><b>Maiden Name:</b> {person.maidenName}</span>
								</DialogContentText>
								: null
							}			
							{(person.bio !== undefined) 
								? 
								<DialogContentText>
									<span><b>Bio:</b> {person.bio}</span>
								</DialogContentText>
								: null
							}		
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