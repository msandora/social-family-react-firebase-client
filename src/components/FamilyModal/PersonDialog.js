import React, { Component, Fragment } from 'react';
import MyButton from '../../util/MyButton';

// MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

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

		// if(person.firstName === 'Daniel'){
		// 	console.log(person);
		// 	console.log(person.spouses);
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
					<img src={NoImg} alt="profile" style={{ height: "53px"	}}/>
				</Fab>

				<Dialog 
					fullWidth={true}
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
					<DialogTitle>{person.firstName} {person.middleName} {person.lastName}</DialogTitle>
					<DialogContent>
							<DialogContentText>
							{(birthDate !== currentDate)
								? <span><b>Birth Date:</b> {dayjs(person.dob).format('MMMM DD, YYYY')}</span> 
								: <span><b>Birth Date:</b> Unknown</span>  
							}		
							</DialogContentText>
							{(person.maidenName !== undefined) ? 
								<DialogContentText>
									<span><b>Maiden Name:</b> {person.maidenName}</span>
								</DialogContentText>
								: null
							}			
							<br/>
							{(person.parents && person.parents.length && person.parents[0].parentName) ? 
								<DialogContentText>
									<span>{person.firstName} is the {(person.gender === 'male') ? 'son' : "daughter"} of {person.parents[0].parentName} 
										{(person.parents && person.parents.length > 1 && person.parents[1].parentName) ? 
											' and ' + person.parents[1].parentName
											: null
										}
										{(person.maidenName !== undefined) 
											? <span> {person.maidenName}.</span>
											: <span> {person.lastName}.</span>
										}			
									</span>
								</DialogContentText> 
								: null
							}	
							{(person.siblings && person.siblings.length) 
								? 
								<DialogContentText>
									<span>{(person.gender === 'male') ? 'He' : "She"} has {person.siblings.length} {(person.siblings.length === 1 ? 'sibling': 'siblings')}: </span>
									{person.siblings.map((item, index) => (
										(item.siblingName !== undefined) 
											? 
											<span key={index}>{(index ? ', ' : '') + item.siblingName}</span>
											: null
									))}.
								</DialogContentText> 
								: null
							}	
							{(person.spouses && person.spouses.length && person.spouses[0].spouseName) ? 
								<DialogContentText>
										{person.firstName} {person.spouses[0].type} {person.spouses[0].spouseName}
										{(person.children && person.children.length) ? 
											<span>
												<span> and had {person.children.length} {(person.children.length === 1 ? 'child': 'children')}: </span>
												<span>
												{person.children.map((item, index) => (
													(item.childName !== undefined) 
														? 
														<span key={index}>{(index ? ', ' : '') + item.childName}</span>
														: null
												))}.
												</span>
											</span>
											: null
										}	
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