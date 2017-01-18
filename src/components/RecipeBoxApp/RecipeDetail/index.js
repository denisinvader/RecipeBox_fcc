const React = require('react');
const Button = require('../Button/index');

require('./style.scss');

const RecipeDetail = React.createClass({
  edit: function (e) {
    this.props.onEdit();
  },
  delete: function (e) {
    this.props.onDelete();
  },

  render: function () {
    if (this.props.data.hasOwnProperty('name')) {
      const backgroundImage = `url(${this.props.data.img})`;
      let ingridientsList = [];

      for (let ingridient of this.props.data.ingridients) {
        ingridientsList.push(
          <div className="ingridients-list__item">{ingridient}</div>
        );
      }

      return (
        <div className="recipe-detail">
          <button className="recipe-detail__close-btn"
                  onClick={this.props.onClose}
                  title="Close" >&#x274C;</button>
          <div className="recipe-detail__img" style={{backgroundImage: backgroundImage}}></div>

          <div className="recipe-detail__name">{this.props.data.name}</div>

          <div className="recipe-detail__ingridients ingridients-list">{ingridientsList}</div>

          <footer className="recipe-detail__footer">
            <Button action={this.edit} color="teal">Edit</Button>
            <Button action={this.delete} color="red">Delete</Button>
          </footer>
        </div>
      );
    } else {
      return (
        <div className="recipe-detail">
          <div className="recipe-detail__no-items-text">Choose a recipe</div>
        </div>
      );
    }
  }
});

module.exports = RecipeDetail;