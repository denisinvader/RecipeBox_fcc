const React = require('react');
const RecipesListItem = require('./RecipesListItem');

require('./style.scss');

const RecipesList = React.createClass({
  onItemClickHandler: function (index) {
    this.props.onRecipeClick(index);
  },

  render: function () {
    let resipesList = [];
    const recipes = this.props.data;

    for (let i in recipes)
      resipesList.push(
        <RecipesListItem data={recipes[i]} index={i} onClick={this.onItemClickHandler} />
      );

    return (
      <div className="recipes-list">
        {resipesList}
      </div>
    );
  }
});

module.exports = RecipesList;