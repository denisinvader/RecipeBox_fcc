const React = require('react');

const RecipesListItem = React.createClass({
  clickHandler: function (e) {
    this.props.onClick(this.props.index);
  },

  render: function () {
    const backgroundImage = `url(${this.props.data.img})`;

    return (
      <div className="recipes-list__item recipe-preview" onClick={this.clickHandler}>
        <div className="recipe-preview__img" style={{backgroundImage: backgroundImage}}>
        </div>
        <div className="recipe-preview__name">{this.props.data.name}</div>
      </div>
    );
  }
});

module.exports = RecipesListItem;