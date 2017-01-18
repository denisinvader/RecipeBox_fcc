const React = require('react');

require('./style.scss');

var Button = React.createClass({
  componentDidMount: function () {
    if (!this.props.fixed)
      return;

    const container = this.button.parentElement;

    container.addEventListener('scroll', (e) => {
      this.button.style.transform = `translateY(${container.scrollTop}px)`;
    });
  },

  render: function () {
    return (
      <button className={
                'button ' +
                (this.props.fixed ? 'button_fixed ' : '') +
                (this.props.color.length ? `button_${this.props.color}` : '')
              }
              onClick={this.props.action}
              type={this.props.type}
              ref={(button) => {this.button = button}}>
        {this.props.children}
      </button>
    );
  }
});

Button.propTypes = {
  action: React.PropTypes.func,
  fixed: React.PropTypes.bool,
  color: React.PropTypes.string,
  type: React.PropTypes.string
};

Button.defaultProps = {
  action: () => {},
  fixed: false,
  color: '',
  type: 'button'
};

module.exports = Button;
