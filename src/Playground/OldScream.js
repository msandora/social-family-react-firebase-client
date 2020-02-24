import React, { Component } from './node_modules/react';
import withStyles from './node_modules/@material-ui/core/styles/withStyles';
import { Link } from './node_modules/react-router-dom';
import dayjs from './node_modules/dayjs';
import relativeTime from './node_modules/dayjs/plugin/relativeTime';
import PropTypes from './node_modules/prop-types';
import MyButton from '../../util/MyButton';
import DeleteScream from '../../components/scream/DeleteScream';
import ScreamDialog from './ScreamDialog';
import LikeButton from './LikeButton';

//MUI Stuff
import Card from './node_modules/@material-ui/core/Card';
import CardContent from './node_modules/@material-ui/core/CardContent';
import CardMedia from './node_modules/@material-ui/core/CardMedia';
import Typography from './node_modules/@material-ui/core/Typography';
// Icons
import ChatIcon from './node_modules/@material-ui/icons/Chat';

// Redux
import { connect } from './node_modules/react-redux';

const styles= {
	card: {
		position: 'relative',
		display: 'flex',
		marginBottom: 10
	},
	image:{
		minWidth: 100,
		maxHeight: 100
	},
	content: {
		padding: 25,
		objectFit: 'cover'
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
					<CardMedia
				image={userImage}
				title="Profile image"
				className={classes.image}
				/>
					<CardContent className={classes.content}>
						<Typography
						variant="h5"
						component={Link}
						to={`/users/${userHandle}`}
						color="primary"
						>
						{userHandle}
						</Typography>
						{deleteButton}
						<Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
						<Typography variant="body1">{body}</Typography>
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
					</CardContent>
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