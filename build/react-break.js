'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _breakjs = require('breakjs');

var _breakjs2 = _interopRequireDefault(_breakjs);

var Break = _react2['default'].createClass({
  displayName: 'Break',

  propTypes: {
    breakpoints: _react2['default'].PropTypes.object.isRequired,
    children: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.node), _react2['default'].PropTypes.node]),
    query: _react2['default'].PropTypes.shape({
      method: _react2['default'].PropTypes.string.isRequired,
      breakpoint: _react2['default'].PropTypes.string.isRequired
    })
  },

  getInitialState: function getInitialState() {
    return { layout: (0, _breakjs2['default'])(this.props.breakpoints) };
  },

  componentDidMount: function componentDidMount() {
    this.onBreakpointsChange();
  },

  componentWillUnmount: function componentWillUnmount() {
    this.state.layout.removeChangeListener(this.onLayoutChange);
  },

  onBreakpointsChange: function onBreakpointsChange() {
    this.setState({ layout: (0, _breakjs2['default'])(this.props.breakpoints) });
    this.state.layout.removeChangeListener(this.onLayoutChange);
    this.state.layout.addChangeListener(this.onLayoutChange);
  },

  onLayoutChange: function onLayoutChange() {
    if (this.isMounted()) {
      this.forceUpdate();
    }
  },

  render: function render() {
    var _props = this.props;
    var children = _props.children;
    var query = _props.query;
    var layout = this.state.layout;

    var method = layout[query.method];
    var breakpoint = query.breakpoint;

    var renderChildren = _react2['default'].Children.count(children) > 1 || typeof children === 'string' ? _react2['default'].createElement(
      'div',
      null,
      children
    ) : children;

    return method(breakpoint) ? renderChildren : null;
  }
});

var layoutGenerator = function componentGenerator(breakpoints) {
  return function createComponent(method, breakpoint) {
    return _react2['default'].createClass({
      propTypes: {
        children: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.node), _react2['default'].PropTypes.node])
      },

      render: function render() {
        var children = this.props.children;

        return children ? _react2['default'].createElement(
          Break,
          { breakpoints: breakpoints, query: { method: method, breakpoint: breakpoint } },
          children
        ) : null;
      }
    });
  };
};

/* eslint-disable no-console */
var breakComponentGenerator = function generator(breakpoints) {
  console.warn('Warning: "breakComponentGenerator" was renamed to ' + '"layoutGenerator" in versions >=0.3.0 and will be deprecated on some ' + 'future version.');

  return layoutGenerator(breakpoints);
};
/* eslint-enable no-console */

exports.layoutGenerator = layoutGenerator;
exports.breakComponentGenerator = breakComponentGenerator;
exports['default'] = Break;