import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import EditDetails from './EditDetails';
import UserDrawerSkeleton from '../../util/UserDrawerSkeleton';
// MUI stuff
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
//Redux
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../../redux/actions/userActions';

const styles = (theme) => ({
  ...theme
});

class UserProfile extends Component {
  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    this.props.uploadImage(formData);
  };
  handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  };
  handleLogout = () => {
    this.props.logoutUser();
  };
  render() {
    const {
      classes,
      user: {
        credentials: { 
          handle, createdAt, imageUrl, 
          firstName, middleName, lastName, 
          bio, website, location 
        },
        loading
      }
    } = this.props;

    let profileMarkup = !loading ? (
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={imageUrl} alt="profile" className="profile-image" />
        </div>
        <hr />
        <div className="profile-details">
          <MuiLink
            component={Link}
            to={`/users/${handle}`}
            color="primary"
            variant="h5"
          >
            @{handle}
          </MuiLink>
          <hr />
          <Typography variant="body1">
          {firstName && <span>{firstName} </span>}
          {middleName && <span>{middleName} </span>}
          {lastName && <span>{lastName}</span>}
          </Typography>
          {bio && <Typography variant="body2">{bio}</Typography>}
          <hr />
          {location && (
            <Fragment>
              <LocationOn color="primary" /> <span>{location}</span>
              <hr />
            </Fragment>
          )}
          {website && (
            <Fragment>
              <LinkIcon color="primary" />
              <a href={website} target="_blank" rel="noopener noreferrer">
                {' '}
                {website}
              </a>
              <hr />
            </Fragment>
          )}
          <CalendarToday color="primary" />{' '}
          <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
        </div>
        <Divider />

        <List>
          <input type="file" id="imageInput" hidden="hidden"
            onChange={this.handleImageChange} />
          <ListItem button onClick={this.handleEditPicture}>
            <ListItemIcon><AddAPhotoIcon color="primary"/></ListItemIcon>
            <ListItemText primary="Edit Profile Picture" />
          </ListItem>

          <EditDetails />

          <ListItem button onClick={this.handleLogout}>
            <ListItemIcon><KeyboardReturn color="primary"/></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </div>
    ) : (
      <UserDrawerSkeleton />
    );

    return profileMarkup;
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = { logoutUser, uploadImage };

UserProfile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(UserProfile));
