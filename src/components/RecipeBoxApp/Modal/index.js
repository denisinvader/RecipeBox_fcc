const React = require('react');

require('./style.scss');

const Modal = React.createClass({
  render: function () {
    return (
      <div  className={'modal ' +
              (this.props.opened ? 'modal_opened' : '')}>
        <button className="modal__close-btn"
                  onClick={this.props.onClose}
                  title="Close" >&#x274C;</button>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Modal;