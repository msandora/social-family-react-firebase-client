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
		const currentDate = dayjs().format('MMMM DD, YYYY');
		const birthDate = dayjs(person.dateOfBirth).format('MMMM DD, YYYY');
		// const deathDate = dayjs(person.dateOfDeath).format('MMMM DD, YYYY');

		const renderBirthDate = (birthDate !== currentDate) ? (
			<span><b>Born:</b> {birthDate}</span>
    ) : (
			<span><b>Birth Date:</b> Unknown</span>
		);
    const renderMaidenName = (person.maidenName !== undefined) ? (
			<span><b>Maiden Name:</b> {person.maidenName}</span>
    ) : (
			null
    );			
		const renderParents = (person.parents && person.parents.length && person.parents[0].parentName) ? ( 
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
    ) : (
			null
    );	
    const renderSiblings = (person.siblings && person.siblings.length) ? (
			<span>
				<span>{(person.gender === 'male') ? 'He' : "She"} has {person.siblings.length} {(person.siblings.length === 1 ? 'sibling': 'siblings')}: </span>
				{person.siblings.map((item, index) => (
					(item.siblingName !== undefined) ? 
						<span key={index}>{(index ? ', ' : '') + item.siblingName}</span>
						: null
				))}.
			</span> 
		) : (
			null
    );	
    const renderChildren = (person.children && person.children.length) ? (
			<span>{person.firstName}
			{(person.spouses && person.spouses.length && person.spouses[0].spouseName) ? 
				<span> {person.spouses[0].type} {person.spouses[0].spouseName}
					<span> and had {person.children.length} {(person.children.length === 1 ? 'child': 'children')}: </span>
					{person.children.map((item, index) => (
						(item.childName !== undefined) 
							? 
							<span key={index}>{(index ? ', ' : '') + item.childName}</span>
							: null
					))}.
				</span>
				: (
					<span> had {person.children.length} {(person.children.length === 1 ? 'child': 'children')}: 
						{person.children.map((item, index) => (
							(item.childName !== undefined) 
								? 
								<span key={index}>{(index ? ', ' : '') + item.childName}</span>
								: null
						))}.
					</span>
				)
			}	
			</span> 
    ) : (
			null
    );	
		const renderBio = (person.bio !== undefined) ? (
			<span><b>Bio:</b> {person.bio}</span>
		) : (
			null
		);	
		const renderNickName = (person.nickName !== undefined) ? (
			<span><b>Nickname:</b> {person.nickName}</span>
		) : (
			null
		);	
		const renderSuffix = (person.suffix !== undefined) ? (
			<span>{person.suffix}</span>
		) : (
			null
		);	
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
					<DialogTitle>{person.firstName} {person.middleName} {person.lastName} {renderSuffix}</DialogTitle>
					<DialogContent>
							<DialogContentText>{renderBirthDate}</DialogContentText>
							<DialogContentText>{renderNickName}</DialogContentText>
							<DialogContentText>{renderMaidenName}</DialogContentText>
							<DialogContentText>{renderParents}</DialogContentText>
							<DialogContentText>{renderSiblings}</DialogContentText>
							<DialogContentText>{renderChildren}</DialogContentText>
							<DialogContentText>{renderBio}</DialogContentText>
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