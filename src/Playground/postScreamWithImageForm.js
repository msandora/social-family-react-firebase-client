import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";
// MUI Stuff
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// Icons
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
// Redux stuff
import { connect } from "react-redux";
import { postScream, clearErrors } from "../../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme,
  formControl: {
    width: "100%",
  },
  submitButton: {
    position: "relative",
    float: "right",
    marginTop: 10,
  },
  actionIcon: {
    marginRight: 0,
  },
});

class PostScream extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      body: "",
      title: "",
      //the three imaegs you want to attach
      selectedFileOne: null,
      selectedFileTwo: null,
      selectedFileThree: null,
      errors: {},
    };
  }

  //this handles the state change for the images
  fileChangedHandlerOne = (event) => {
    this.setState({ selectedFileOne: event.target.files[0] });
    console.log(this.state.selectedFileOne);
    console.log(Array.from(event.target.files));
  };

  fileChangedHandlerTwo = (event) => {
    this.setState({ selectedFileTwo: event.target.files[0] });
    console.log(this.state.selectedFileTwo);
    console.log(Array.from(event.target.files));
  };
  fileChangedHandlerThree = (event) => {
    this.setState({ selectedFileThree: event.target.files[0] });
    console.log(this.state.selectedFileThree);
    console.log(Array.from(event.target.files));
  };

  //--END

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: "", open: false, errors: {} });
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    // console.log(this.state);

    //you have to add craete an instance of formData and append all inputs and files to the formData
    const screamData = new FormData();

    if (this.state.selectedFiles !== null) {
      screamData.append(
        "image",
        this.state.selectedFileOne,
        this.state.selectedFileOne.name
      );
    }
    if (this.state.selectedFileTwo !== null) {
      screamData.append(
        "file",
        this.state.selectedFileTwo,
        this.state.selectedFileTwo.name
      );
    }
    if (this.state.selectedFileThree !== null) {
      screamData.append(
        "imageThree",
        this.state.selectedFileThree,
        this.state.selectedFileThree.name
      );
    }

    //console.log(Array.from(this.state.selectedFiles));
    screamData.append("body", this.state.body);

    this.props.postScream(screamData);
  };

  render() {
    const { errors } = this.state;
    const isMobile = window.innerWidth <= 500;
    const {
      classes,
      UI: { loading },
    } = this.props;
    return (
      <Fragment>
        <List>
          <ListItem button onClick={this.handleOpen} className={classes.action}>
            <ListItemIcon className={classes.actionIcon}>
              <AddIcon color='primary' />
            </ListItemIcon>
            <ListItemText primary='Post Something' />
          </ListItem>
        </List>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullScreen={isMobile}
        >
          <MyButton
            tip='Close'
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle> Create a post </DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <FormControl className={classes.formControl}>
                <TextField
                  name='body'
                  type='text'
                  label='Say Something...'
                  multiline
                  rows='3'
                  placeholder='What is on your mind?'
                  error={errors.body ? true : false}
                  helperText={errors.body}
                  className={classes.textField}
                  onChange={this.handleChange}
                  fullWidth
                />
              </FormControl>

              <FormControl className={classes.formControl}>
              <Button variant="contained" component="label">
                Upload File
                <input
                    type="file"
                    style={{ display: "none" }}
                />
                </Button>
              </FormControl>

{/*i don't know how to add image input in material UI //so just do
that and apply the onChange function as follows /* for Image one
onChange= fileChangedHandlerOne * */ /* for Image one onChange=
fileChangedHandlerTwo * */ /* for Image two onChange=
fileChangedHandlerThree * */}
              <Button
                type='submit'
                variant='contained'
                color='primary'
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { postScream, clearErrors })(
  withStyles(styles)(PostScream)
);
