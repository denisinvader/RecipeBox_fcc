const React = require('react');
const Button = require('../Button/index')

require('./style.scss');

var RecipeFormConfirm = React.createClass({
  submit: function (e) {
    this.props.onSubmit();

    e.preventDefault();
  },
  cancel: function (e) {
    this.props.onCancel();
  },

  render: function () {
    return (
      <form onSubmit={this.submit} onReset={this.cancel} className="recipe-form">
        <header className="recipe-form__header">{this.props.title}</header>

        <div className="recipe-form__delete-text">{this.props.text}</div>

        <footer className="recipe-form__footer">
          <Button type="submit" color="red">Delete</Button>
          <Button type="reset" color="teal">Cancel</Button>
        </footer>
      </form>
    );
  }
});

RecipeFormConfirm.propTypes = {
  title: React.PropTypes.string,
  text: React.PropTypes.string,
  onSubmit: React.PropTypes.func,
  onCancel: React.PropTypes.func
};

RecipeFormConfirm.defaultProps = {
  title: 'Confirm',
  text: 'Are you sure?',
  onSubmit: () => {},
  onCancel: () => {}
};

module.exports = RecipeFormConfirm;