import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import NoImg from '../images/no-img.png';
// MUI stuff
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
import EditIcon from '@material-ui/icons/Edit';

const styles = (theme) => ({
  ...theme,
  handle: {
    height: 20,
    backgroundColor: theme.palette.primary.main,
    width: 60,
    margin: '0 auto 7px auto'
  },
  fullLine: {
    height: 15,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: '100%',
    marginBottom: 10
  },
  halfLine: {
    height: 15,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: '50%',
    marginBottom: 10
  }
});

const ProfileSkeleton = (props) => {
  const { classes } = props;
  return (
    <div className={classes.profile}>
      <div className="image-wrapper">
        <img src={NoImg} alt="profile" className="profile-image" />
      </div>
      <hr />
      <div className="profile-details">
        <div className={classes.handle} />
        <hr />
        <div className={classes.fullLine} />
        <div className={classes.fullLine} />
        <hr />
        <LocationOn color="primary" /> <span>Location</span>
        <hr />
        <LinkIcon color="primary" /> https://website.com
        <hr />
        <CalendarToday color="primary" /> Joined date
      </div>
      <Divider />
      <List>
        <ListItem>
          <ListItemIcon><AddAPhotoIcon color="primary"/></ListItemIcon>
          <ListItemText primary="Edit Profile Picture" />
        </ListItem>

        <ListItem>
          <ListItemIcon><EditIcon color="primary"/></ListItemIcon>
          <ListItemText primary="Edit Details" />
        </ListItem>

        <ListItem>
          <ListItemIcon><KeyboardReturn color="primary"/></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );
};

ProfileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileSkeleton);
