const React = require('react');
const Modal = require('./Modal/index');
const RecipeForm = require('./RecipeForm/index');
const RecipeFormConfirm = require('./RecipeFrom/RecipeFormConfirm');
const Button = require('./Button/index');
const RecipesList = require('./RecipesList/index');
const RecipeDetail = require('./RecipeDetail/index');

require('./style.scss');

const LOCALSTORAGE_KEY = '_denisinvader_recipebox_app_fcc';

const RecipeBoxApp = React.createClass({
  getInitialState: function () {
    return {
      data: {
        recipes: this.fetchRecipes()
      },
      currentIndex: -1,
      inDetal: false,
      inAddForm: false,
      inEditForm: false,
      inDeleteForm: false
    }
  },

  fetchRecipes: function () {
    return JSON.parse(window.localStorage.getItem(LOCALSTORAGE_KEY)) || [];
  },
  saveRecipes: function (data) {
    window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));
  },
  addNewRecipe: function (data) {
    let newRecipes = this.state.data.recipes;
    let newRecipe = {};

    newRecipe.name = data.name;
    newRecipe.img = data.img;
    newRecipe.ingridients = [];
    for (let ingridient of data.ingridients)
      if (ingridient.trim().length)
        newRecipe.ingridients.push(ingridient);

    newRecipes.push(newRecipe);

    this.saveRecipes(newRecipes);
    this.setState({
      data: {
        recipes: newRecipes
      },
      inAddForm: false
    });
  },
  editCurrentRecipe: function (data) {
    let newRecipes = this.state.data.recipes;
    let newRecipe = {};

    newRecipe.name = data.name;
    newRecipe.img = data.img;
    newRecipe.ingridients = [];
    for (let ingridient of data.ingridients)
      if (ingridient.trim().length)
        newRecipe.ingridients.push(ingridient);
    newRecipes[this.state.currentIndex] = newRecipe;

    this.saveRecipes(newRecipes);
    this.setState({
      data: {
        recipes: newRecipes
      },
      inEditForm: false
    });
  },
  deleteCurrentRecipe: function () {
    let newRecipes = this.state.data.recipes;
    newRecipes.splice(this.state.currentIndex, 1);

    this.saveRecipes(newRecipes);
    this.setState({
      data: {
        recipes: newRecipes
      },
      inDeleteForm: false,
      inDetal: false,
      currentIndex: -1
    });
  },

  openRecipe: function (index) {
    if (index < 0 || index >= this.state.data.recipes.length)
      return;

    this.setState({
      inDetal: true,
      currentIndex: index
    });
  },

  closeRecipe: function () {
    this.setState({ inDetal: false });
  },

  openAddForm: function () {
    this.setState({ inAddForm: true });
  },
  closeAddForm: function () {
    this.setState({ inAddForm: false });
  },

  openEditForm: function () {
    this.setState({ inEditForm: true });
  },
  closeEditForm: function () {
    this.setState({
      data: { recipes: this.fetchRecipes() },
      inEditForm: false
    });
  },

  openDeleteForm: function () {
    this.setState({ inDeleteForm: true });
  },
  closeDeleteForm: function () {
    this.setState({ inDeleteForm: false });
  },

  render: function () {
    const recipeData = this.state.currentIndex >= 0 ? this.state.data.recipes[this.state.currentIndex] : {};

    const editForm = this.state.currentIndex >= 0 ?
      (<RecipeForm onSubmit={this.editCurrentRecipe} onCancel={this.closeEditForm} data={recipeData} text="Edit a recipe" />) : '';
    const deleteForm = this.state.currentIndex >= 0 ?
      (<RecipeFormConfirm onSubmit={this.deleteCurrentRecipe}
                          onCancel={this.closeDeleteForm}
                          title="Delete a recipe"
                          text={`Delete the "${recipeData.name}" recipe?`} />) : '';

    return (
      <div className="recipe-box-app">
        <div className="recipe-box-app__list">
          <RecipesList data={this.state.data.recipes} onRecipeClick={this.openRecipe} />
          <Button fixed={true} action={this.openAddForm} color="red">+</Button>
        </div>
        <div  className={'recipe-box-app__detail ' +
                (this.state.inDetal ? '' : 'recipe-box-app__detail_hidden')} >
          <RecipeDetail data={recipeData}
                        onClose={this.closeRecipe}
                        onEdit={this.openEditForm}
                        onDelete={this.openDeleteForm} />
        </div>
        <Modal opened={this.state.inAddForm} onClose={this.closeAddForm}>
          <RecipeForm text="Add new recipe" onSubmit={this.addNewRecipe} onCancel={this.closeAddForm} />
        </Modal>
        <Modal opened={this.state.inEditForm} onClose={this.closeEditForm}>
          {editForm}
        </Modal>
        <Modal opened={this.state.inDeleteForm} onClose={this.closeDeleteForm}>
          {deleteForm}
        </Modal>
      </div>
    );
  }
});

module.exports = RecipeBoxApp;