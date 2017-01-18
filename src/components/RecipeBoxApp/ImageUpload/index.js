const React = require('react');

const Button = require('../Button/index');

require('./style.scss');

var ImageUpload = React.createClass({
  uploadImage: function (e) {
    let input = e.target;
    const component = this;

    if (input.files && input.files[0] && input.files[0].type.match('image')) {
      var reader = new FileReader();

      reader.onload = function (e) {
        component.props.onUpload(e.target.result);
      }

      reader.readAsDataURL(input.files[0]);
    }
  },

  cancel: function (e) {
    this.props.onUpload('');
  },

  render: function () {
    if (this.props.img.length) {
      return (
        <div className="file-upload file-upload_uploaded">
          <img src={this.props.img} className="file-upload__preview-image" />
          <Button color="teal">
            <label>
              Choose another
              <input type="file" onChange={this.uploadImage} accept="image/*" className="hidden-input" />
            </label>
          </Button>
          <Button color="red" action={this.cancel}>Remove</Button>
        </div>
      );
    } else {
      return (
        <label className="file-upload">
          <div className="file-upload__text">Choose a file</div>
          <input type="file" onChange={this.uploadImage} accept="image/*" className="hidden-input" />
        </label>
      );
    }
  }
});

ImageUpload.propTypes = {
  onUpload: React.PropTypes.func.required,
  img: React.PropTypes.string
};

ImageUpload.defaultProps = {
  onUpload: () => {},
  img: ''
};

module.exports = ImageUpload;