import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";
// MUI Stuff
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Input,
} from "@material-ui/core";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// Redux stuff
import { connect } from "react-redux";
import { postRecipe, clearErrors } from "../../redux/actions/dataActions";

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

class PostRecipe extends Component {
  state = {
    open: false,
    recipeTitle: "",
    recipeType: "",
    ingredients: "",
    body: "",
    errors: {},
  };
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
  handleSelectChange(value) {
    this.setState({ recipeType: value });
  }
  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    this.props.postRecipe({
      recipeTitle: this.state.recipeTitle,
      recipeType: this.state.recipeType,
      ingredients: this.state.ingredients,
      body: this.state.body,
    });
  };
  render() {
    const { recipeType, errors } = this.state;
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
            <ListItemText primary='Post a Recipe' />
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
          <DialogTitle>Post a new recipe</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <FormControl className={classes.formControl}>
                <TextField
                  name='recipeTitle'
                  type='text'
                  label='Recipe Name'
                  multiline
                  rows='1'
                  placeholder='Recipe Name'
                  error={errors.recipeTitle ? true : false}
                  helperText={errors.recipeTitle}
                  className={classes.textField}
                  onChange={this.handleChange}
                  fullWidth
                />
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel id='demo-simple-select-label'>Type</InputLabel>
                <Select
                  // labelId="demo-simple-select-label"
                  id='demo-simple-select'
                  value={recipeType}
                  error={errors.recipeType ? true : false}
                  onChange={(event) =>
                    this.handleSelectChange(event.target.value)
                  }
                  input={<Input id='name' />}
                >
                  <MenuItem value='beverages'>Beverages</MenuItem>
                  <MenuItem value='appetizer'>Appetizer</MenuItem>
                  <MenuItem value='entree'>Entree</MenuItem>
                  <MenuItem value='dessert'>Dessert</MenuItem>
                </Select>
              </FormControl>

              <FormControl className={classes.formControl}>
                <TextField
                  name='ingredients'
                  type='text'
                  label='Ingredients'
                  multiline
                  rows='3'
                  placeholder='What do we need?'
                  error={errors.ingredients ? true : false}
                  helperText={errors.ingredients}
                  className={classes.textField}
                  onChange={this.handleChange}
                  fullWidth
                />
              </FormControl>

              <FormControl className={classes.formControl}>
                <TextField
                  name='body'
                  type='text'
                  label='Directions'
                  multiline
                  rows='3'
                  placeholder='Where do we start?'
                  error={errors.body ? true : false}
                  helperText={errors.body}
                  className={classes.textField}
                  onChange={this.handleChange}
                  fullWidth
                />
              </FormControl>
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

PostRecipe.propTypes = {
  postRecipe: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { postRecipe, clearErrors })(
  withStyles(styles)(PostRecipe)
);
