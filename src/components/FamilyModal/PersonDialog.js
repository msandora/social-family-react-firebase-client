import React, { Component, Fragment } from 'react';
import MyButton from '../../util/MyButton';

// MUI Stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

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

	// let siblings = this.props.person.siblings || [] // if there's no items, give empty array
	// let siblingsCount = this.props.person.siblings.length;
	// let betweenSiblings = (siblingsCount === 1 ? '' : siblingsCount - 1 ? ' and ' : ', ');

	// let mySiblings = siblings.map((item, index) => {
	// 	return(
	// 		<span key={index}>{item.siblingName + betweenSiblings}</span>
	// 	)
	// });
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
					<DialogTitle>{this.props.person.firstName} {this.props.person.middleName} {this.props.person.lastName}</DialogTitle>
					<DialogContent>
							<DialogContentText>
							{(birthDate !== currentDate)
								? <span><b>Birth Date:</b> {dayjs(this.props.person.dob).format('MMMM DD, YYYY')}</span> 
								: <span><b>Birth Date:</b> Unknown</span>  
							}		
							</DialogContentText>
							{(this.props.person.parents && this.props.person.parents.length && this.props.person.parents[0].parentName && this.props.person.parents[1].parentName) 
								? 
								<DialogContentText>
									<span>{this.props.person.firstName} is the {(this.props.person.gender === 'male') ? 'son' : "daughter"} of {this.props.person.parents[0].parentName} and {this.props.person.parents[1].parentName} 
										{(person.maidenName !== undefined) 
											? <span> {this.props.person.maidenName}.</span>
											: <span> {this.props.person.lastName}.</span>
										}			
									</span>
								</DialogContentText> 
								: null
							}	
							{(this.props.person.siblings && this.props.person.siblings.length) 
								? 
								<DialogContentText>
									<span>{this.props.person.firstName} has {this.props.person.siblings.length} {(this.props.person.siblings.length === 1 ? 'sibling': 'siblings')}. </span>
		
									{this.props.person.siblings.map((item, index) => (
										(item.siblingName !== undefined) 
											? 
											<span key={index}>{(index ? ', ' : '') + item.siblingName}</span>
											: null
									))}.
								</DialogContentText> 
								: null
							}	

							{(person.maidenName !== undefined) ? 
								<DialogContentText>
									<span><b>Maiden Name:</b> {person.maidenName}</span>
								</DialogContentText>
								: null
							}			
							{(person.bio !== undefined) ? 
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