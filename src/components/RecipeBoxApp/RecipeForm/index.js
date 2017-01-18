const React = require('react');
const Button = require('../Button/index');
const ImageUpload = require('../ImageUpload/index');

require('./style.scss');

const RecipeForm = React.createClass({
  getInitialState: function () {
    return {
      img: this.props.data.img,
      name: this.props.data.name,
      ingridients: this.props.data.ingridients
    }
  },

  componentWillReceiveProps: function (nextProps) {
    this.setState({
      img: nextProps.data.img,
      name: nextProps.data.name,
      ingridients: nextProps.data.ingridients
    });
  },

  changeName: function (e) {
    this.setState({ name: e.target.value });
  },

  changeIngridient: function (e) {
    const input = e.target;
    const index = input.dataset.index;
    let ingridients = this.state.ingridients;

    ingridients[index] = input.value;
    this.setState({ ingridients: ingridients });
  },

  addIngridient: function (e) {
    let newIngridients = this.state.ingridients;
    newIngridients.push('');

    this.setState({ ingridients: newIngridients });

    e.preventDefault();
  },

  uploadImage: function (img) {
    this.setState({ img: img });
  },

  submit: function (e) {
    this.props.onSubmit(this.state);

    this.setState(this.getInitialState());

    e.preventDefault();
  },
  cancel: function (e) {
    this.setState(this.getInitialState());
    this.props.onCancel();
  },

  render: function () {
    let ingridientsInputs = [];

    for (let i in this.state.ingridients) {
      const required = i == 0 ? true : false;

      ingridientsInputs.push(
        <input  type="text"
                className="input-block__input"
                placeholder="Write an ingridient"
                value={this.state.ingridients[i]}
                onChange={this.changeIngridient}
                data-index={i}
                required={required} />
      );
    }

    return (
      <form onSubmit={this.submit} onReset={this.cancel} className="recipe-form">
        <header className="recipe-form__header">{this.props.text}</header>

        <div className="input-block">
          <ImageUpload img={this.state.img} onUpload={this.uploadImage}/>
          <div className="input-block__label">Recipe photo</div>
        </div>

        <label className="input-block">
          <input  type="text"
                  className="input-block__input"
                  placeholder="Write a name"
                  value={this.state.name}
                  onChange={this.changeName}
                  required />
          <div className="input-block__label">Recipe name</div>
        </label>

        <label className="input-block">
          {ingridientsInputs}
          <div className="input-block__label">Ingridients</div>
          <a onClick={this.addIngridient} className="recipe-form__add-btn">Add ingridient</a>
        </label>

        <footer className="recipe-form__footer">
          <Button type="submit" color="teal">Save</Button>
          <Button type="reset" color="red">Cancel</Button>
        </footer>
      </form>
    );
  }
});

RecipeForm.propTypes = {
  data: React.PropTypes.object,
  onSubmit: React.PropTypes.func,
  onCancel: React.PropTypes.func,
  text: React.PropTypes.string
};

RecipeForm.defaultProps = {
  data: {
    img: '',
    name: '',
    ingridients: ['', '']
  },
  text: 'Recipe form',
  onSubmit: () => {},
  onCancel: () => {}
};

module.exports = RecipeForm;
