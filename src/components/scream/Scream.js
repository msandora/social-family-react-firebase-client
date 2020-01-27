import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import DeleteScream from '../../components/scream/DeleteScream';
import ScreamDialog from './ScreamDialog';
import LikeButton from './LikeButton';
//MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
// Icons
import ChatIcon from '@material-ui/icons/Chat';
// Redux
import { connect } from 'react-redux';

const styles = {
	card: {
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		marginBottom: 10
	}
}

class Scream extends Component {
	likedScream = () => {
		if(
			this.props.user.likes && 
			this.props.user.likes.find(
				(like) => like.screamId === this.props.scream.screamId
			)
		)
			return true;
		else return false;
	};
	likeScream = () => {
		this.props.likeScream(this.props.scream.screamId);
	}
	unlikeScream = () => {
		this.props.unlikeScream(this.props.scream.screamId);
	}
	render() { 
		dayjs.extend(relativeTime);
		const {
		  classes,
		  scream: {
				body,
				createdAt,
				userImage,
				userHandle,
				screamId,
				likeCount,
				commentCount
		  },
		  user: {
				authenticated,
				credentials: { handle }
		  }
		} = this.props;

		const deleteButton =
		authenticated && userHandle === handle ? (
			<DeleteScream screamId={screamId} />
		) : null;

		return ( 
			<Card className={classes.card}>
				<CardHeader className={classes.cardHeader}
					avatar={
						<Avatar alt="Profile image" src={userImage} 					
						component={Link}
						to={`/users/${userHandle}`}/>
					}
					action={
						<div>
							{deleteButton}
						</div>
					}
					title={userHandle} 
					subheader={dayjs(createdAt).fromNow()}
					/>

				<CardContent className={classes.content}>
					<Typography variant="body2">{body}</Typography>
				</CardContent>

				<CardActions>
					<LikeButton screamId={screamId} />
					<span>{likeCount} Likes</span>
					<MyButton tip="comments">
						<ChatIcon color="primary" />
					</MyButton>
					<span>{commentCount}</span>
					<ScreamDialog
					screamId={screamId}
					userHandle={userHandle}
					openDialog={this.props.openDialog}
					/>
				</CardActions>
			</Card>
		);
	}
}
 
Scream.propTypes = {
	user: PropTypes.object.isRequired,
	scream: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	openDialog: PropTypes.bool
};

const mapStateToProps = (state) => ({
	user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Scream));