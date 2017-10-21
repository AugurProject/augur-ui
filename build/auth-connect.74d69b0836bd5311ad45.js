webpackJsonp([1],{

/***/ 1370:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = parse;
/* harmony export (immutable) */ __webpack_exports__["b"] = stringify;
/**
 * Flips an alphabet into a character lookup table.
 */
function makeCodes (chars) {
  var out = {}
  for (var i = 0; i < chars.length; ++i) {
    out[chars.charAt(i)] = i
  }
  return out
}

function gcd (a, b) {
  return b === 0 ? a : gcd(b, a % b)
}

function parse (string, encoding, opts) {
  if ( opts === void 0 ) opts = {};

  if (encoding.codes == null) {
    encoding.codes = makeCodes(encoding.chars)
  }

  // Count the padding bytes:
  var end = string.length
  while (string.charAt(end - 1) === '=') {
    --end
  }

  // Allocate the output:
  var constructor = opts.out != null ? opts.out : Array
  var out = new constructor(end * encoding.bits / 8 | 0)

  // Parse the data:
  var bits = 0 // Number of bits currently in the buffer
  var buffer = 0 // Bits waiting to be written out, MSB first
  var written = 0 // Next byte to write
  for (var i = 0; i < end; ++i) {
    // Read one character from the string:
    var value = encoding.codes[string.charAt(i)]
    if (value === void 0) {
      throw new SyntaxError('Invalid character ' + string.charAt(i))
    }

    // Append the bits to the buffer:
    bits += encoding.bits
    buffer = buffer << encoding.bits | value

    // Write out some bits if the buffer has a byte's worth:
    if (bits >= 8) {
      bits -= 8
      out[written++] = 0xff & buffer >> bits
    }
  }

  // Verify that we have received just enough bits:
  var leftover = 0xff & buffer << 8 - bits
  if (bits >= encoding.bits || leftover) {
    throw new SyntaxError('Unexpected end of data')
  }

  // Verify padding:
  if (!opts.loose) {
    var maxPad = 8 * encoding.bits / gcd(8, encoding.bits)
    var padding = (string.length - end) * encoding.bits
    if (padding >= maxPad || padding + bits & 7) {
      throw new SyntaxError('Invalid padding')
    }
  }

  return out
}

function stringify (data, encoding, opts) {
  if ( opts === void 0 ) opts = {};

  var out = ''

  var bits = 0 // Number of bits currently in the buffer
  var buffer = 0 // Bits waiting to be written out, MSB first
  var mask = (1 << encoding.bits) - 1
  for (var i = 0; i < data.length; ++i) {
    // Slurp data into the buffer:
    buffer = buffer << 8 | 0xff & data[i]
    bits += 8

    // Write out as much as we can:
    while (bits > encoding.bits) {
      bits -= encoding.bits
      out += encoding.chars[mask & buffer >> bits]
    }
  }

  // Partial character:
  if (bits) {
    out += encoding.chars[mask & buffer << encoding.bits - bits]
  }

  // Add padding characters until we hit a byte boundary:
  while (out.length * encoding.bits & 7) {
    out += '='
  }

  return out
}


/***/ }),

/***/ 1378:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.EXITING = exports.ENTERED = exports.ENTERING = exports.EXITED = exports.UNMOUNTED = undefined;

var _propTypes = __webpack_require__(10);

var PropTypes = _interopRequireWildcard(_propTypes);

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(294);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _PropTypes = __webpack_require__(1379);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UNMOUNTED = exports.UNMOUNTED = 'unmounted';
var EXITED = exports.EXITED = 'exited';
var ENTERING = exports.ENTERING = 'entering';
var ENTERED = exports.ENTERED = 'entered';
var EXITING = exports.EXITING = 'exiting';

/**
 * The Transition component lets you describe a transition from one component
 * state to another _over time_ with a simple declarative API. Most commonly
 * it's used to animate the mounting and unmounting of a component, but can also
 * be used to describe in-place transition states as well.
 *
 * By default the `Transition` component does not alter the behavior of the
 * component it renders, it only tracks "enter" and "exit" states for the components.
 * It's up to you to give meaning and effect to those states. For example we can
 * add styles to a component when it enters or exits:
 *
 * ```jsx
 * import Transition from 'react-transition-group/Transition';
 *
 * const duration = 300;
 *
 * const defaultStyle = {
 *   transition: `opacity ${duration}ms ease-in-out`,
 *   opacity: 0,
 * }
 *
 * const transitionStyles = {
 *   entering: { opacity: 0 },
 *   entered:  { opacity: 1 },
 * };
 *
 * const Fade = ({ in: inProp }) => (
 *   <Transition in={inProp} timeout={duration}>
 *     {(state) => (
 *       <div style={{
 *         ...defaultStyle,
 *         ...transitionStyles[state]
 *       }}>
 *         I'm A fade Transition!
 *       </div>
 *     )}
 *   </Transition>
 * );
 * ```
 *
 * As noted the `Transition` component doesn't _do_ anything by itself to its child component.
 * What it does do is track transition states over time so you can update the
 * component (such as by adding styles or classes) when it changes states.
 *
 * There are 4 main states a Transition can be in:
 *  - `ENTERING`
 *  - `ENTERED`
 *  - `EXITING`
 *  - `EXITED`
 *
 * Transition state is toggled via the `in` prop. When `true` the component begins the
 * "Enter" stage. During this stage, the component will shift from its current transition state,
 * to `'entering'` for the duration of the transition and then to the `'entered'` stage once
 * it's complete. Let's take the following example:
 *
 * ```jsx
 * state= { in: false };
 *
 * toggleEnterState = () => {
 *   this.setState({ in: true });
 * }
 *
 * render() {
 *   return (
 *     <div>
 *       <Transition in={this.state.in} timeout={500} />
 *       <button onClick={this.toggleEnterState}>Click to Enter</button>
 *     </div>
 *   );
 * }
 * ```
 *
 * When the button is clicked the component will shift to the `'entering'` state and
 * stay there for 500ms (the value of `timeout`) when finally switches to `'entered'`.
 *
 * When `in` is `false` the same thing happens except the state moves from `'exiting'` to `'exited'`.
 */

var Transition = function (_React$Component) {
  _inherits(Transition, _React$Component);

  function Transition(props, context) {
    _classCallCheck(this, Transition);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

    var parentGroup = context.transitionGroup;
    // In the context of a TransitionGroup all enters are really appears
    var appear = parentGroup && !parentGroup.isMounting ? props.enter : props.appear;

    var initialStatus = void 0;
    _this.nextStatus = null;

    if (props.in) {
      if (appear) {
        initialStatus = EXITED;
        _this.nextStatus = ENTERING;
      } else {
        initialStatus = ENTERED;
      }
    } else {
      if (props.unmountOnExit || props.mountOnEnter) {
        initialStatus = UNMOUNTED;
      } else {
        initialStatus = EXITED;
      }
    }

    _this.state = { status: initialStatus };

    _this.nextCallback = null;
    return _this;
  }

  Transition.prototype.getChildContext = function getChildContext() {
    return { transitionGroup: null }; // allows for nested Transitions
  };

  Transition.prototype.componentDidMount = function componentDidMount() {
    this.updateStatus(true);
  };

  Transition.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _ref = this.pendingState || this.state,
        status = _ref.status;

    if (nextProps.in) {
      if (status === UNMOUNTED) {
        this.setState({ status: EXITED });
      }
      if (status !== ENTERING && status !== ENTERED) {
        this.nextStatus = ENTERING;
      }
    } else {
      if (status === ENTERING || status === ENTERED) {
        this.nextStatus = EXITING;
      }
    }
  };

  Transition.prototype.componentDidUpdate = function componentDidUpdate() {
    this.updateStatus();
  };

  Transition.prototype.componentWillUnmount = function componentWillUnmount() {
    this.cancelNextCallback();
  };

  Transition.prototype.getTimeouts = function getTimeouts() {
    var timeout = this.props.timeout;

    var exit = void 0,
        enter = void 0,
        appear = void 0;

    exit = enter = appear = timeout;

    if (timeout != null && typeof timeout !== 'number') {
      exit = timeout.exit;
      enter = timeout.enter;
      appear = timeout.appear;
    }
    return { exit: exit, enter: enter, appear: appear };
  };

  Transition.prototype.updateStatus = function updateStatus() {
    var mounting = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var nextStatus = this.nextStatus;

    if (nextStatus !== null) {
      this.nextStatus = null;
      // nextStatus will always be ENTERING or EXITING.
      this.cancelNextCallback();
      var node = _reactDom2.default.findDOMNode(this);

      if (nextStatus === ENTERING) {
        this.performEnter(node, mounting);
      } else {
        this.performExit(node);
      }
    } else if (this.props.unmountOnExit && this.state.status === EXITED) {
      this.setState({ status: UNMOUNTED });
    }
  };

  Transition.prototype.performEnter = function performEnter(node, mounting) {
    var _this2 = this;

    var enter = this.props.enter;

    var appearing = this.context.transitionGroup ? this.context.transitionGroup.isMounting : mounting;

    var timeouts = this.getTimeouts();

    // no enter animation skip right to ENTERED
    // if we are mounting and running this it means appear _must_ be set
    if (!mounting && !enter) {
      this.safeSetState({ status: ENTERED }, function () {
        _this2.props.onEntered(node);
      });
      return;
    }

    this.props.onEnter(node, appearing);

    this.safeSetState({ status: ENTERING }, function () {
      _this2.props.onEntering(node, appearing);

      // FIXME: appear timeout?
      _this2.onTransitionEnd(node, timeouts.enter, function () {
        _this2.safeSetState({ status: ENTERED }, function () {
          _this2.props.onEntered(node, appearing);
        });
      });
    });
  };

  Transition.prototype.performExit = function performExit(node) {
    var _this3 = this;

    var exit = this.props.exit;

    var timeouts = this.getTimeouts();

    // no exit animation skip right to EXITED
    if (!exit) {
      this.safeSetState({ status: EXITED }, function () {
        _this3.props.onExited(node);
      });
      return;
    }
    this.props.onExit(node);

    this.safeSetState({ status: EXITING }, function () {
      _this3.props.onExiting(node);

      _this3.onTransitionEnd(node, timeouts.exit, function () {
        _this3.safeSetState({ status: EXITED }, function () {
          _this3.props.onExited(node);
        });
      });
    });
  };

  Transition.prototype.cancelNextCallback = function cancelNextCallback() {
    if (this.nextCallback !== null) {
      this.nextCallback.cancel();
      this.nextCallback = null;
    }
  };

  Transition.prototype.safeSetState = function safeSetState(nextState, callback) {
    var _this4 = this;

    // We need to track pending updates for instances where a cWRP fires quickly
    // after cDM and before the state flushes, which would double trigger a
    // transition
    this.pendingState = nextState;

    // This shouldn't be necessary, but there are weird race conditions with
    // setState callbacks and unmounting in testing, so always make sure that
    // we can cancel any pending setState callbacks after we unmount.
    callback = this.setNextCallback(callback);
    this.setState(nextState, function () {
      _this4.pendingState = null;
      callback();
    });
  };

  Transition.prototype.setNextCallback = function setNextCallback(callback) {
    var _this5 = this;

    var active = true;

    this.nextCallback = function (event) {
      if (active) {
        active = false;
        _this5.nextCallback = null;

        callback(event);
      }
    };

    this.nextCallback.cancel = function () {
      active = false;
    };

    return this.nextCallback;
  };

  Transition.prototype.onTransitionEnd = function onTransitionEnd(node, timeout, handler) {
    this.setNextCallback(handler);

    if (node) {
      if (this.props.addEndListener) {
        this.props.addEndListener(node, this.nextCallback);
      }
      if (timeout != null) {
        setTimeout(this.nextCallback, timeout);
      }
    } else {
      setTimeout(this.nextCallback, 0);
    }
  };

  Transition.prototype.render = function render() {
    var status = this.state.status;
    if (status === UNMOUNTED) {
      return null;
    }

    var _props = this.props,
        children = _props.children,
        childProps = _objectWithoutProperties(_props, ['children']);
    // filter props for Transtition


    delete childProps.in;
    delete childProps.mountOnEnter;
    delete childProps.unmountOnExit;
    delete childProps.appear;
    delete childProps.enter;
    delete childProps.exit;
    delete childProps.timeout;
    delete childProps.addEndListener;
    delete childProps.onEnter;
    delete childProps.onEntering;
    delete childProps.onEntered;
    delete childProps.onExit;
    delete childProps.onExiting;
    delete childProps.onExited;

    if (typeof children === 'function') {
      return children(status, childProps);
    }

    var child = _react2.default.Children.only(children);
    return _react2.default.cloneElement(child, childProps);
  };

  return Transition;
}(_react2.default.Component);

Transition.contextTypes = {
  transitionGroup: PropTypes.object
};
Transition.childContextTypes = {
  transitionGroup: function transitionGroup() {}
};


Transition.propTypes =  false ? {
  /**
   * A `function` child can be used instead of a React element.
   * This function is called with the current transition status
   * ('entering', 'entered', 'exiting', 'exited', 'unmounted'), which can used
   * to apply context specific props to a component.
   *
   * ```jsx
   * <Transition timeout={150}>
   *   {(status) => (
   *     <MyComponent className={`fade fade-${status}`} />
   *   )}
   * </Transition>
   * ```
   */
  children: PropTypes.oneOfType([PropTypes.func.isRequired, PropTypes.element.isRequired]).isRequired,

  /**
   * Show the component; triggers the enter or exit states
   */
  in: PropTypes.bool,

  /**
   * By default the child component is mounted immediately along with
   * the parent `Transition` component. If you want to "lazy mount" the component on the
   * first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay
   * mounted, even on "exited", unless you also specify `unmountOnExit`.
   */
  mountOnEnter: PropTypes.bool,

  /**
   * By default the child component stays mounted after it reaches the `'exited'` state.
   * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
   */
  unmountOnExit: PropTypes.bool,

  /**
   * Normally a component is not transitioned if it is shown when the `<Transition>` component mounts.
   * If you want to transition on the first mount set `appear` to `true`, and the
   * component will transition in as soon as the `<Transition>` mounts.
   *
   * > Note: there are no specific "appear" states. `appear` only adds an additional `enter` transition.
   */
  appear: PropTypes.bool,

  /**
   * Enable or disable enter transitions.
   */
  enter: PropTypes.bool,

  /**
   * Enable or disable exit transitions.
   */
  exit: PropTypes.bool,

  /**
   * The duration of the transition, in milliseconds.
   * Required unless `addEventListener` is provided
   *
   * You may specify a single timeout for all transitions like: `timeout={500}`,
   * or individually like:
   *
   * ```jsx
   * timeout={{
   *  enter: 300,
   *  exit: 500,
   * }}
   * ```
   *
   * @type {number | { enter?: number, exit?: number }}
   */
  timeout: function timeout(props) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var pt = _PropTypes.timeoutsShape;
    if (!props.addEndListener) pt = pt.isRequired;
    return pt.apply(undefined, [props].concat(args));
  },

  /**
   * Add a custom transition end trigger. Called with the transitioning
   * DOM node and a `done` callback. Allows for more fine grained transition end
   * logic. **Note:** Timeouts are still used as a fallback if provided.
   *
   * ```jsx
   * addEndListener={(node, done) => {
   *   // use the css transitionend event to mark the finish of a transition
   *   node.addEventListener('transitionend', done, false);
   * }}
   * ```
   */
  addEndListener: PropTypes.func,

  /**
   * Callback fired before the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEnter: PropTypes.func,

  /**
   * Callback fired after the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntering: PropTypes.func,

  /**
   * Callback fired after the "entered" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEntered: PropTypes.func,

  /**
   * Callback fired before the "exiting" status is applied.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExit: PropTypes.func,

  /**
   * Callback fired after the "exiting" status is applied.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExiting: PropTypes.func,

  /**
   * Callback fired after the "exited" status is applied.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExited: PropTypes.func
} : {};

// Name the function so it is clearer in the documentation
function noop() {}

Transition.defaultProps = {
  in: false,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  enter: true,
  exit: true,

  onEnter: noop,
  onEntering: noop,
  onEntered: noop,

  onExit: noop,
  onExiting: noop,
  onExited: noop
};

Transition.UNMOUNTED = 0;
Transition.EXITED = 1;
Transition.ENTERING = 2;
Transition.ENTERED = 3;
Transition.EXITING = 4;

exports.default = Transition;

/***/ }),

/***/ 1379:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.classNamesShape = exports.timeoutsShape = undefined;
exports.transitionTimeout = transitionTimeout;

var _propTypes = __webpack_require__(10);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function transitionTimeout(transitionType) {
  var timeoutPropName = 'transition' + transitionType + 'Timeout';
  var enabledPropName = 'transition' + transitionType;

  return function (props) {
    // If the transition is enabled
    if (props[enabledPropName]) {
      // If no timeout duration is provided
      if (props[timeoutPropName] == null) {
        return new Error(timeoutPropName + ' wasn\'t supplied to CSSTransitionGroup: ' + 'this can cause unreliable animations and won\'t be supported in ' + 'a future version of React. See ' + 'https://fb.me/react-animation-transition-group-timeout for more ' + 'information.');

        // If the duration isn't a number
      } else if (typeof props[timeoutPropName] !== 'number') {
        return new Error(timeoutPropName + ' must be a number (in milliseconds)');
      }
    }

    return null;
  };
}

var timeoutsShape = exports.timeoutsShape = _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.shape({
  enter: _propTypes2.default.number,
  exit: _propTypes2.default.number
}).isRequired]);

var classNamesShape = exports.classNamesShape = _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.shape({
  enter: _propTypes2.default.string,
  exit: _propTypes2.default.string,
  active: _propTypes2.default.string
}), _propTypes2.default.shape({
  enter: _propTypes2.default.string,
  enterActive: _propTypes2.default.string,
  exit: _propTypes2.default.string,
  exitActive: _propTypes2.default.string
})]);

/***/ }),

/***/ 1390:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _CSSTransition = __webpack_require__(1424);

var _CSSTransition2 = _interopRequireDefault(_CSSTransition);

var _TransitionGroup = __webpack_require__(1428);

var _TransitionGroup2 = _interopRequireDefault(_TransitionGroup);

var _Transition = __webpack_require__(1378);

var _Transition2 = _interopRequireDefault(_Transition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  Transition: _Transition2.default,
  TransitionGroup: _TransitionGroup2.default,
  CSSTransition: _CSSTransition2.default
};

/***/ }),

/***/ 1424:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = __webpack_require__(10);

var PropTypes = _interopRequireWildcard(_propTypes);

var _addClass = __webpack_require__(1425);

var _addClass2 = _interopRequireDefault(_addClass);

var _removeClass = __webpack_require__(1427);

var _removeClass2 = _interopRequireDefault(_removeClass);

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _Transition = __webpack_require__(1378);

var _Transition2 = _interopRequireDefault(_Transition);

var _PropTypes = __webpack_require__(1379);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var addClass = function addClass(node, classes) {
  return classes && classes.split(' ').forEach(function (c) {
    return (0, _addClass2.default)(node, c);
  });
};
var removeClass = function removeClass(node, classes) {
  return classes && classes.split(' ').forEach(function (c) {
    return (0, _removeClass2.default)(node, c);
  });
};

var propTypes = _extends({}, _Transition2.default.propTypes, {

  /**
   * The animation classNames applied to the component as it enters or exits.
   * A single name can be provided and it will be suffixed for each stage: e.g.
   *
   * `classNames="fade"` applies `fade-enter`, `fade-enter-active`,
   * `fade-exit`, `fade-exit-active`, `fade-appear`, and `fade-appear-active`.
   * Each individual classNames can also be specified independently like:
   *
   * ```js
   * classNames={{
   *  appear: 'my-appear',
   *  appearActive: 'my-active-appear',
   *  enter: 'my-enter',
   *  enterActive: 'my-active-enter',
   *  exit: 'my-exit',
   *  exitActive: 'my-active-exit',
   * }}
   * ```
   *
   * @type {string | {
   *  appear?: string,
   *  appearActive?: string,
   *  enter?: string,
   *  enterActive?: string,
   *  exit?: string,
   *  exitActive?: string,
   * }}
   */
  classNames: _PropTypes.classNamesShape,

  /**
   * A `<Transition>` callback fired immediately after the 'enter' or 'appear' class is
   * applied.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEnter: PropTypes.func,

  /**
   * A `<Transition>` callback fired immediately after the 'enter-active' or
   * 'appear-active' class is applied.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntering: PropTypes.func,

  /**
   * A `<Transition>` callback fired immediately after the 'enter' or
   * 'appear' classes are **removed** from the DOM node.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntered: PropTypes.func,

  /**
   * A `<Transition>` callback fired immediately after the 'exit' class is
   * applied.
   *
   * @type Function(node: HtmlElement)
   */
  onExit: PropTypes.func,

  /**
   * A `<Transition>` callback fired immediately after the 'exit-active' is applied.
   *
   * @type Function(node: HtmlElement
   */
  onExiting: PropTypes.func,

  /**
   * A `<Transition>` callback fired immediately after the 'exit' classes
   * are **removed** from the DOM node.
   *
   * @type Function(node: HtmlElement)
   */
  onExited: PropTypes.func
});

/**
 * A `Transition` component using CSS transitions and animations.
 * It's inspired by the excellent [ng-animate](http://www.nganimate.org/) library.
 *
 * `CSSTransition` applies a pair of class names during the `appear`, `enter`,
 * and `exit` stages of the transition. The first class is applied and then a
 * second "active" class in order to activate the css animation.
 *
 * When the `in` prop is toggled to `true` the Component will get
 * the `example-enter` CSS class and the `example-enter-active` CSS class
 * added in the next tick. This is a convention based on the `classNames` prop.
 *
 * ```js
 * import CSSTransition from 'react-transition-group/CSSTransition';
 *
 * const Fade = ({ children, ...props }) => (
 *  <CSSTransition
 *    {...props}
 *    timeout={500}
 *    classNames="fade"
 *  >
 *   {children}
 *  </CSSTransition>
 * );
 *
 * class FadeInAndOut extends React.Component {
 *   constructor(...args) {
 *     super(...args);
 *     this.state= { show: false }
 *
 *     setInterval(() => {
 *       this.setState({ show: !this.state.show })
 *     }, 5000)
 *   }
 *   render() {
 *     return (
 *       <Fade in={this.state.show}>
 *         <div>Hello world</div>
 *       </Fade>
 *     )
 *   }
 * }
 * ```
 *
 * And the coorresponding CSS for the `<Fade>` component:
 *
 * ```css
 * .fade-enter {
 *   opacity: 0.01;
 * }
 *
 * .fade-enter.fade-enter-active {
 *   opacity: 1;
 *   transition: opacity 500ms ease-in;
 * }
 *
 * .fade-exit {
 *   opacity: 1;
 * }
 *
 * .fade-exit.fade-exit-active {
 *   opacity: 0.01;
 *   transition: opacity 300ms ease-in;
 * }
 * ```
 */

var CSSTransition = function (_React$Component) {
  _inherits(CSSTransition, _React$Component);

  function CSSTransition() {
    var _temp, _this, _ret;

    _classCallCheck(this, CSSTransition);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.onEnter = function (node, appearing) {
      var _this$getClassNames = _this.getClassNames(appearing ? 'appear' : 'enter'),
          className = _this$getClassNames.className;

      _this.removeClasses(node, 'exit');
      addClass(node, className);

      if (_this.props.onEnter) {
        _this.props.onEnter(node);
      }
    }, _this.onEntering = function (node, appearing) {
      var _this$getClassNames2 = _this.getClassNames(appearing ? 'appear' : 'enter'),
          activeClassName = _this$getClassNames2.activeClassName;

      _this.reflowAndAddClass(node, activeClassName);

      if (_this.props.onEntering) {
        _this.props.onEntering(node);
      }
    }, _this.onEntered = function (node, appearing) {
      _this.removeClasses(node, appearing ? 'appear' : 'enter');

      if (_this.props.onEntered) {
        _this.props.onEntered(node);
      }
    }, _this.onExit = function (node) {
      var _this$getClassNames3 = _this.getClassNames('exit'),
          className = _this$getClassNames3.className;

      _this.removeClasses(node, 'appear');
      _this.removeClasses(node, 'enter');
      addClass(node, className);

      if (_this.props.onExit) {
        _this.props.onExit(node);
      }
    }, _this.onExiting = function (node) {
      var _this$getClassNames4 = _this.getClassNames('exit'),
          activeClassName = _this$getClassNames4.activeClassName;

      _this.reflowAndAddClass(node, activeClassName);

      if (_this.props.onExiting) {
        _this.props.onExiting(node);
      }
    }, _this.onExited = function (node) {
      _this.removeClasses(node, 'exit');

      if (_this.props.onExited) {
        _this.props.onExited(node);
      }
    }, _this.getClassNames = function (type) {
      var classNames = _this.props.classNames;


      var className = typeof classNames !== 'string' ? classNames[type] : classNames + '-' + type;

      var activeClassName = typeof classNames !== 'string' ? classNames[type + 'Active'] : className + '-active';

      return { className: className, activeClassName: activeClassName };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  CSSTransition.prototype.removeClasses = function removeClasses(node, type) {
    var _getClassNames = this.getClassNames(type),
        className = _getClassNames.className,
        activeClassName = _getClassNames.activeClassName;

    className && removeClass(node, className);
    activeClassName && removeClass(node, activeClassName);
  };

  CSSTransition.prototype.reflowAndAddClass = function reflowAndAddClass(node, className) {
    // This is for to force a repaint,
    // which is necessary in order to transition styles when adding a class name.
    /* eslint-disable no-unused-expressions */
    node.scrollTop;
    /* eslint-enable no-unused-expressions */
    addClass(node, className);
  };

  CSSTransition.prototype.render = function render() {
    var props = _extends({}, this.props);

    delete props.classNames;

    return _react2.default.createElement(_Transition2.default, _extends({}, props, {
      onEnter: this.onEnter,
      onEntered: this.onEntered,
      onEntering: this.onEntering,
      onExit: this.onExit,
      onExiting: this.onExiting,
      onExited: this.onExited
    }));
  };

  return CSSTransition;
}(_react2.default.Component);

CSSTransition.propTypes =  false ? propTypes : {};

exports.default = CSSTransition;
module.exports = exports['default'];

/***/ }),

/***/ 1425:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addClass;

var _hasClass = __webpack_require__(1426);

var _hasClass2 = _interopRequireDefault(_hasClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addClass(element, className) {
  if (element.classList) element.classList.add(className);else if (!(0, _hasClass2.default)(element)) element.className = element.className + ' ' + className;
}
module.exports = exports['default'];

/***/ }),

/***/ 1426:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hasClass;
function hasClass(element, className) {
  if (element.classList) return !!className && element.classList.contains(className);else return (" " + element.className + " ").indexOf(" " + className + " ") !== -1;
}
module.exports = exports["default"];

/***/ }),

/***/ 1427:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function removeClass(element, className) {
  if (element.classList) element.classList.remove(className);else element.className = element.className.replace(new RegExp('(^|\\s)' + className + '(?:\\s|$)', 'g'), '$1').replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, '');
};

/***/ }),

/***/ 1428:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = __webpack_require__(10);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _ChildMapping = __webpack_require__(1429);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var values = Object.values || function (obj) {
  return Object.keys(obj).map(function (k) {
    return obj[k];
  });
};

var propTypes = {
  /**
   * `<TransitionGroup>` renders a `<div>` by default. You can change this
   * behavior by providing a `component` prop.
   */
  component: _propTypes2.default.any,
  /**
   * A set of `<Transition>` components, that are toggled `in` and out as they
   * leave. the `<TransitionGroup>` will inject specific transition props, so
   * remember to spread them through if you are wrapping the `<Transition>` as
   * with our `<Fade>` example.
   */
  children: _propTypes2.default.node,

  /**
   * A convenience prop that enables or disabled appear animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  appear: _propTypes2.default.bool,
  /**
   * A convenience prop that enables or disabled enter animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  enter: _propTypes2.default.bool,
  /**
    * A convenience prop that enables or disabled exit animations
    * for all children. Note that specifying this will override any defaults set
    * on individual children Transitions.
    */
  exit: _propTypes2.default.bool,

  /**
   * You may need to apply reactive updates to a child as it is exiting.
   * This is generally done by using `cloneElement` however in the case of an exiting
   * child the element has already been removed and not accessible to the consumer.
   *
   * If you do need to update a child as it leaves you can provide a `childFactory`
   * to wrap every child, even the ones that are leaving.
   *
   * @type Function(child: ReactElement) -> ReactElement
   */
  childFactory: _propTypes2.default.func
};

var defaultProps = {
  component: 'div',
  childFactory: function childFactory(child) {
    return child;
  }
};

/**
 * The `<TransitionGroup>` component manages a set of `<Transition>` components
 * in a list. Like with the `<Transition>` component, `<TransitionGroup>`, is a
 * state machine for managing the mounting and unmounting of components over
 * time.
 *
 * Consider the example below using the `Fade` CSS transition from before.
 * As items are removed or added to the TodoList the `in` prop is toggled
 * automatically by the `<TransitionGroup>`. You can use _any_ `<Transition>`
 * component in a `<TransitionGroup>`, not just css.
 *
 * ```jsx
 * import TransitionGroup from 'react-transition-group/TransitionGroup';
 *
 * class TodoList extends React.Component {
 *   constructor(props) {
 *     super(props)
 *     this.state = {items: ['hello', 'world', 'click', 'me']}
 *   }
 *   handleAdd() {
 *     const newItems = this.state.items.concat([
 *       prompt('Enter some text')
 *     ]);
 *     this.setState({ items: newItems });
 *   }
 *   handleRemove(i) {
 *     let newItems = this.state.items.slice();
 *     newItems.splice(i, 1);
 *     this.setState({items: newItems});
 *   }
 *   render() {
 *     return (
 *       <div>
 *         <button onClick={() => this.handleAdd()}>Add Item</button>
 *         <TransitionGroup>
 *           {this.state.items.map((item, i) => (
 *             <FadeTransition key={item}>
 *               <div>
 *                 {item}{' '}
 *                 <button onClick={() => this.handleRemove(i)}>
 *                   remove
 *                 </button>
 *               </div>
 *             </FadeTransition>
 *           ))}
 *         </TransitionGroup>
 *       </div>
 *     );
 *   }
 * }
 * ```
 *
 * Note that `<TransitionGroup>`  does not define any animation behavior!
 * Exactly _how_ a list item animates is up to the individual `<Transition>`
 * components. This means you can mix and match animations across different
 * list items.
 */

var TransitionGroup = function (_React$Component) {
  _inherits(TransitionGroup, _React$Component);

  function TransitionGroup(props, context) {
    _classCallCheck(this, TransitionGroup);

    // Initial children should all be entering, dependent on appear
    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

    _this.handleExited = function (key, node, originalHandler) {
      var currentChildMapping = (0, _ChildMapping.getChildMapping)(_this.props.children);

      if (key in currentChildMapping) return;

      if (originalHandler) originalHandler(node);

      _this.setState(function (state) {
        var children = _extends({}, state.children);

        delete children[key];
        return { children: children };
      });
    };

    _this.state = {
      children: (0, _ChildMapping.getChildMapping)(props.children, function (child) {
        var onExited = function onExited(node) {
          _this.handleExited(child.key, node, child.props.onExited);
        };

        return (0, _react.cloneElement)(child, {
          onExited: onExited,
          in: true,
          appear: _this.getProp(child, 'appear'),
          enter: _this.getProp(child, 'enter'),
          exit: _this.getProp(child, 'exit')
        });
      })
    };
    return _this;
  }

  TransitionGroup.prototype.getChildContext = function getChildContext() {
    return {
      transitionGroup: { isMounting: !this.appeared }
    };
  };
  // use child config unless explictly set by the Group


  TransitionGroup.prototype.getProp = function getProp(child, prop) {
    var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.props;

    return props[prop] != null ? props[prop] : child.props[prop];
  };

  TransitionGroup.prototype.componentDidMount = function componentDidMount() {
    this.appeared = true;
  };

  TransitionGroup.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _this2 = this;

    var prevChildMapping = this.state.children;
    var nextChildMapping = (0, _ChildMapping.getChildMapping)(nextProps.children);

    var children = (0, _ChildMapping.mergeChildMappings)(prevChildMapping, nextChildMapping);

    Object.keys(children).forEach(function (key) {
      var child = children[key];

      if (!(0, _react.isValidElement)(child)) return;

      var onExited = function onExited(node) {
        _this2.handleExited(child.key, node, child.props.onExited);
      };

      var hasPrev = key in prevChildMapping;
      var hasNext = key in nextChildMapping;

      var prevChild = prevChildMapping[key];
      var isLeaving = (0, _react.isValidElement)(prevChild) && !prevChild.props.in;

      // item is new (entering)
      if (hasNext && (!hasPrev || isLeaving)) {
        // console.log('entering', key)
        children[key] = (0, _react.cloneElement)(child, {
          onExited: onExited,
          in: true,
          exit: _this2.getProp(child, 'exit', nextProps),
          enter: _this2.getProp(child, 'enter', nextProps)
        });
      }
      // item is old (exiting)
      else if (!hasNext && hasPrev && !isLeaving) {
          // console.log('leaving', key)
          children[key] = (0, _react.cloneElement)(child, { in: false });
        }
        // item hasn't changed transition states
        // copy over the last transition props;
        else if (hasNext && hasPrev && (0, _react.isValidElement)(prevChild)) {
            // console.log('unchanged', key)
            children[key] = (0, _react.cloneElement)(child, {
              onExited: onExited,
              in: prevChild.props.in,
              exit: _this2.getProp(child, 'exit', nextProps),
              enter: _this2.getProp(child, 'enter', nextProps)
            });
          }
    });

    this.setState({ children: children });
  };

  TransitionGroup.prototype.render = function render() {
    var _props = this.props,
        Component = _props.component,
        childFactory = _props.childFactory,
        props = _objectWithoutProperties(_props, ['component', 'childFactory']);

    var children = this.state.children;


    delete props.appear;
    delete props.enter;
    delete props.exit;

    return _react2.default.createElement(
      Component,
      props,
      values(children).map(childFactory)
    );
  };

  return TransitionGroup;
}(_react2.default.Component);

TransitionGroup.childContextTypes = {
  transitionGroup: _propTypes2.default.object.isRequired
};


TransitionGroup.propTypes =  false ? propTypes : {};
TransitionGroup.defaultProps = defaultProps;

exports.default = TransitionGroup;
module.exports = exports['default'];

/***/ }),

/***/ 1429:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.getChildMapping = getChildMapping;
exports.mergeChildMappings = mergeChildMappings;

var _react = __webpack_require__(5);

/**
 * Given `this.props.children`, return an object mapping key to child.
 *
 * @param {*} children `this.props.children`
 * @return {object} Mapping of key to child
 */
function getChildMapping(children, mapFn) {
  var mapper = function mapper(child) {
    return mapFn && (0, _react.isValidElement)(child) ? mapFn(child) : child;
  };

  var result = Object.create(null);
  if (children) _react.Children.map(children, function (c) {
    return c;
  }).forEach(function (child) {
    // run the map function here instead so that the key is the computed one
    result[child.key] = mapper(child);
  });
  return result;
}

/**
 * When you're adding or removing children some may be added or removed in the
 * same render pass. We want to show *both* since we want to simultaneously
 * animate elements in and out. This function takes a previous set of keys
 * and a new set of keys and merges them with its best guess of the correct
 * ordering. In the future we may expose some of the utilities in
 * ReactMultiChild to make this easy, but for now React itself does not
 * directly have this concept of the union of prevChildren and nextChildren
 * so we implement it here.
 *
 * @param {object} prev prev children as returned from
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @param {object} next next children as returned from
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @return {object} a key set that contains all keys in `prev` and all keys
 * in `next` in a reasonable order.
 */
function mergeChildMappings(prev, next) {
  prev = prev || {};
  next = next || {};

  function getValueForKey(key) {
    return key in next ? next[key] : prev[key];
  }

  // For each key of `next`, the list of keys to insert before that key in
  // the combined list
  var nextKeysPending = Object.create(null);

  var pendingKeys = [];
  for (var prevKey in prev) {
    if (prevKey in next) {
      if (pendingKeys.length) {
        nextKeysPending[prevKey] = pendingKeys;
        pendingKeys = [];
      }
    } else {
      pendingKeys.push(prevKey);
    }
  }

  var i = void 0;
  var childMapping = {};
  for (var nextKey in next) {
    if (nextKeysPending[nextKey]) {
      for (i = 0; i < nextKeysPending[nextKey].length; i++) {
        var pendingNextKey = nextKeysPending[nextKey][i];
        childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
      }
    }
    childMapping[nextKey] = getValueForKey(nextKey);
  }

  // Finally, add the keys which didn't appear before any key in `next`
  for (i = 0; i < pendingKeys.length; i++) {
    childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
  }

  return childMapping;
}

/***/ }),

/***/ 1478:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1479);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1334)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./auth.styles.less", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./auth.styles.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1479:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(657)(undefined);
// imports


// module
exports.push([module.i, "@font-face{font-family:FontAwesome;font-style:normal;font-weight:400;src:url(" + __webpack_require__(1335) + ") format(\"woff\")}@font-face{font-family:icofont;font-style:normal;font-weight:400;src:url(" + __webpack_require__(1336) + ") format(\"woff\")}.qG1W5-maZqhqdgApvOR_P h1{font-weight:500;letter-spacing:.3px;text-transform:uppercase}._3DKdNZwKUdQ80OJd30EGet{min-height:100%;padding:2rem;width:100%}@media (max-width:900px){._3DKdNZwKUdQ80OJd30EGet{padding:0}}._2_FVetm0_muMWU9XCGahuR{max-width:1200px;min-height:100%}._3DKdNZwKUdQ80OJd30EGet{display:flex;justify-content:center}._2_FVetm0_muMWU9XCGahuR{align-items:flex-start;display:flex;flex:1;flex-direction:column;width:100%}.qG1W5-maZqhqdgApvOR_P{margin-top:5rem}.qG1W5-maZqhqdgApvOR_P h1{color:#fff}@media (max-width:900px){.qG1W5-maZqhqdgApvOR_P{padding-left:2em}}._2XcE14dXvZzc1Cy1aUL_PQ{display:flex;min-height:500px;width:100%}@media (max-width:900px){._2XcE14dXvZzc1Cy1aUL_PQ{flex-direction:column}}._2peygc5sxtDuwCmUFX-0j4{background:#fff;display:flex;flex:1}", ""]);

// exports
exports.locals = {
	"Auth__header": "qG1W5-maZqhqdgApvOR_P",
	"Auth": "_3DKdNZwKUdQ80OJd30EGet",
	"Auth--constrained": "_2_FVetm0_muMWU9XCGahuR",
	"Auth__content": "_2XcE14dXvZzc1Cy1aUL_PQ",
	"Auth__connections": "_2peygc5sxtDuwCmUFX-0j4"
};

/***/ }),

/***/ 1480:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = NavPanel;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_dom__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_routes_helpers_parse_query__ = __webpack_require__(496);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_modules_routes_helpers_make_query__ = __webpack_require__(495);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_modules_common_components_nav_panel_nav_panel_styles__ = __webpack_require__(1481);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_modules_common_components_nav_panel_nav_panel_styles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_modules_common_components_nav_panel_nav_panel_styles__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











function makeSearch(location, param, value, isItemDefault) {
  var updatedSearch = Object(__WEBPACK_IMPORTED_MODULE_4_modules_routes_helpers_parse_query__["a" /* default */])(location.search);

  if (isItemDefault) {
    delete updatedSearch[param];
  } else {
    updatedSearch[param] = value;
  }

  return Object(__WEBPACK_IMPORTED_MODULE_5_modules_routes_helpers_make_query__["a" /* default */])(updatedSearch);
}

function NavPanel(p) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: __WEBPACK_IMPORTED_MODULE_6_modules_common_components_nav_panel_nav_panel_styles___default.a.NavPanel },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'aside',
      { className: __WEBPACK_IMPORTED_MODULE_6_modules_common_components_nav_panel_nav_panel_styles___default.a.NavPanel__controls },
      p.items.map(function (item) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2_react_router_dom__["b" /* Link */],
          {
            key: item.title,
            className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()(__WEBPACK_IMPORTED_MODULE_6_modules_common_components_nav_panel_nav_panel_styles___default.a.NavPanel__control, _defineProperty({}, __WEBPACK_IMPORTED_MODULE_6_modules_common_components_nav_panel_nav_panel_styles___default.a['NavPanel__control--active'], p.selectedNav != null ? item.param === p.selectedNav : item.default)),
            to: {
              search: makeSearch(p.location, p.param, item.param, item.default)
            }
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: __WEBPACK_IMPORTED_MODULE_6_modules_common_components_nav_panel_nav_panel_styles___default.a.NavPanel__icon },
            item.icon
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: __WEBPACK_IMPORTED_MODULE_6_modules_common_components_nav_panel_nav_panel_styles___default.a.NavPanel__title },
            item.title
          )
        );
      })
    )
  );
}

NavPanel.propTypes = {
  location: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  history: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  items: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array.isRequired,
  param: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired
};

/***/ }),

/***/ 1481:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1482);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1334)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./nav-panel.styles.less", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./nav-panel.styles.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1482:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(657)(undefined);
// imports


// module
exports.push([module.i, "@font-face{font-family:FontAwesome;font-style:normal;font-weight:400;src:url(" + __webpack_require__(1335) + ") format(\"woff\")}@font-face{font-family:icofont;font-style:normal;font-weight:400;src:url(" + __webpack_require__(1336) + ") format(\"woff\")}._1YixqD6qWUw-I_Z3vH1HZB{display:flex;min-height:100%;min-width:15em}._1HyMPxQJHYlpsRmUixf-zP{display:flex;flex:1;flex-direction:column}@media (max-width:900px){._1HyMPxQJHYlpsRmUixf-zP{flex-flow:row wrap}}._3KfTOda5tSr2rDBXoiqMVf{align-items:center;background:#412468;border-bottom:1px solid #5a407e;color:#fff;cursor:pointer;display:flex;flex:1;font-size:.875rem;font-weight:300;padding:0 0 0 2rem}._3KfTOda5tSr2rDBXoiqMVf:hover{background:#5a407e}._3KfTOda5tSr2rDBXoiqMVf:last-child{border-bottom:none}@media (max-width:900px){._3KfTOda5tSr2rDBXoiqMVf{border-bottom:none;flex-basis:33%;flex-flow:column wrap;height:6em;padding:1em}}._31aqHYsCHiQPZdZ2OrVlW9{background:#5a407e}.krdmTNtHIa-stieb962aR{color:#fff;margin-right:1.5em;vertical-align:middle;width:2.25em}@media (max-width:900px){.krdmTNtHIa-stieb962aR{align-items:center;display:flex;flex:1;height:100%;justify-content:center;margin-bottom:.5em;margin-right:0}.krdmTNtHIa-stieb962aR svg{height:100%}}._10vo08CWq8bsP0Sje8tTIE{flex:1}@media (max-width:900px){._10vo08CWq8bsP0Sje8tTIE{flex:none}}", ""]);

// exports
exports.locals = {
	"NavPanel": "_1YixqD6qWUw-I_Z3vH1HZB",
	"NavPanel__controls": "_1HyMPxQJHYlpsRmUixf-zP",
	"NavPanel__control": "_3KfTOda5tSr2rDBXoiqMVf",
	"NavPanel__control--active": "_31aqHYsCHiQPZdZ2OrVlW9",
	"NavPanel__icon": "krdmTNtHIa-stieb962aR",
	"NavPanel__title": "_10vo08CWq8bsP0Sje8tTIE"
};

/***/ }),

/***/ 1483:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export REGISTER */
/* unused harmony export LOGIN */
/* unused harmony export LOGOUT */
/* unused harmony export IMPORT */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return FUND_ACCOUNT; });
/* unused harmony export AUTH_TYPES */
/* unused harmony export DEFAULT_AUTH_TYPE */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AIRBITZ_WALLET_TYPE; });
var _AUTH_TYPES;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var REGISTER = 'register';
var LOGIN = 'login';
var LOGOUT = 'logout';
var IMPORT = 'import';
var FUND_ACCOUNT = 'fund_account';

var AUTH_TYPES = (_AUTH_TYPES = {}, _defineProperty(_AUTH_TYPES, REGISTER, REGISTER), _defineProperty(_AUTH_TYPES, LOGIN, LOGIN), _defineProperty(_AUTH_TYPES, IMPORT, IMPORT), _defineProperty(_AUTH_TYPES, LOGOUT, LOGOUT), _AUTH_TYPES);

var DEFAULT_AUTH_TYPE = REGISTER;

var AIRBITZ_WALLET_TYPE = 'wallet:ethereum';

/***/ }),

/***/ 1484:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base16_js__ = __webpack_require__(1666);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base32_js__ = __webpack_require__(1667);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base32hex_js__ = __webpack_require__(1668);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__base64_js__ = __webpack_require__(1669);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__base64url_js__ = __webpack_require__(1670);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__codec_js__ = __webpack_require__(1370);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__base16_js__; });
/* unused harmony reexport base32 */
/* unused harmony reexport base32hex */
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__base64_js__; });
/* unused harmony reexport base64url */
/* unused harmony reexport codec */










/***/ }),

/***/ 1485:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActionTypes; });
/* harmony export (immutable) */ __webpack_exports__["b"] = createStore;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_symbol_observable__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_symbol_observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_symbol_observable__);



/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var ActionTypes = {
  INIT: '@@redux/INIT'

  /**
   * Creates a Redux store that holds the state tree.
   * The only way to change the data in the store is to call `dispatch()` on it.
   *
   * There should only be a single store in your app. To specify how different
   * parts of the state tree respond to actions, you may combine several reducers
   * into a single reducer function by using `combineReducers`.
   *
   * @param {Function} reducer A function that returns the next state tree, given
   * the current state tree and the action to handle.
   *
   * @param {any} [preloadedState] The initial state. You may optionally specify it
   * to hydrate the state from the server in universal apps, or to restore a
   * previously serialized user session.
   * If you use `combineReducers` to produce the root reducer function, this must be
   * an object with the same shape as `combineReducers` keys.
   *
   * @param {Function} [enhancer] The store enhancer. You may optionally specify it
   * to enhance the store with third-party capabilities such as middleware,
   * time travel, persistence, etc. The only store enhancer that ships with Redux
   * is `applyMiddleware()`.
   *
   * @returns {Store} A Redux store that lets you read the state, dispatch actions
   * and subscribe to changes.
   */
};function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    return currentState;
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }

    var isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  function dispatch(action) {
    if (!Object(__WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__["a" /* default */])(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.INIT });
  }

  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */
  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object') {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return { unsubscribe: unsubscribe };
      }
    }, _ref[__WEBPACK_IMPORTED_MODULE_1_symbol_observable___default.a] = function () {
      return this;
    }, _ref;
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT });

  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[__WEBPACK_IMPORTED_MODULE_1_symbol_observable___default.a] = observable, _ref2;
}

/***/ }),

/***/ 1486:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}

/***/ }),

/***/ 1487:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = compose;
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(undefined, arguments));
    };
  });
}

/***/ }),

/***/ 1655:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = trimString;
function trimString(string) {
  if (string == null) return null;
  return string.substring(0, 4) + "..." + string.substring(string.length - 4);
}

/***/ }),

/***/ 1656:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_transition_group__ = __webpack_require__(1390);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_transition_group___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_transition_group__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_auth_components_help_help_styles__ = __webpack_require__(1657);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_auth_components_help_help_styles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_modules_auth_components_help_help_styles__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var helps = [{
  title: 'What is Augur?',
  def: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
}, {
  title: 'How does a wallet work?',
  def: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
}, {
  title: 'Which wallet is best for me?',
  def: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
}];

var Help = function (_Component) {
  _inherits(Help, _Component);

  function Help() {
    _classCallCheck(this, Help);

    var _this = _possibleConstructorReturn(this, (Help.__proto__ || Object.getPrototypeOf(Help)).call(this));

    _this.state = {
      areQuestionsVisible: false,
      visibleDefinitions: []
    };

    _this.toggleDefinition = _this.toggleDefinition.bind(_this);
    return _this;
  }

  _createClass(Help, [{
    key: 'toggleDefinition',
    value: function toggleDefinition(index) {
      this.setState({
        visibleDefinitions: this.state.visibleDefinitions.indexOf(index) !== -1 ? this.state.visibleDefinitions.filter(function (item) {
          return item !== index;
        }) : [].concat(_toConsumableArray(this.state.visibleDefinitions), [index])
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var s = this.state;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: __WEBPACK_IMPORTED_MODULE_2_modules_auth_components_help_help_styles___default.a.Help },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'button',
          {
            className: __WEBPACK_IMPORTED_MODULE_2_modules_auth_components_help_help_styles___default.a.Help__Header,
            onClick: function onClick() {
              return _this2.setState({ areQuestionsVisible: !s.areQuestionsVisible });
            }
          },
          'Confused? Get Help Here.'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_1_react_transition_group__["CSSTransitionGroup"],
          {
            transitionName: {
              enter: __WEBPACK_IMPORTED_MODULE_2_modules_auth_components_help_help_styles___default.a.Help__ItemEnter,
              enterActive: __WEBPACK_IMPORTED_MODULE_2_modules_auth_components_help_help_styles___default.a.Help__ItemEnterActive,
              leave: __WEBPACK_IMPORTED_MODULE_2_modules_auth_components_help_help_styles___default.a.Help__ItemLeave,
              leaveActive: __WEBPACK_IMPORTED_MODULE_2_modules_auth_components_help_help_styles___default.a.Help__ItemLeaveActive
            },
            transitionEnterTimeout: 300,
            transitionLeaveTimeout: 300
          },
          s.areQuestionsVisible && helps.map(function (help, i) {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              {
                key: help.title,
                className: __WEBPACK_IMPORTED_MODULE_2_modules_auth_components_help_help_styles___default.a.Help__Item
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'button',
                {
                  onClick: function onClick() {
                    return _this2.toggleDefinition(i);
                  }
                },
                help.title,
                ' +'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_1_react_transition_group__["CSSTransitionGroup"],
                {
                  transitionName: {
                    enter: __WEBPACK_IMPORTED_MODULE_2_modules_auth_components_help_help_styles___default.a.Help__DefinitionEnter,
                    enterActive: __WEBPACK_IMPORTED_MODULE_2_modules_auth_components_help_help_styles___default.a.Help__DefinitionEnterActive,
                    leave: __WEBPACK_IMPORTED_MODULE_2_modules_auth_components_help_help_styles___default.a.Help__DefinitionLeave,
                    leaveActive: __WEBPACK_IMPORTED_MODULE_2_modules_auth_components_help_help_styles___default.a.Help__DefinitionLeaveActive
                  },
                  transitionEnterTimeout: 300,
                  transitionLeaveTimeout: 300
                },
                s.visibleDefinitions.indexOf(i) !== -1 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'p',
                  null,
                  help.def
                )
              )
            );
          })
        )
      );
    }
  }]);

  return Help;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (Help);

/***/ }),

/***/ 1657:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1658);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1334)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./help.styles.less", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./help.styles.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1658:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(657)(undefined);
// imports


// module
exports.push([module.i, "@font-face{font-family:FontAwesome;font-style:normal;font-weight:400;src:url(" + __webpack_require__(1335) + ") format(\"woff\")}@font-face{font-family:icofont;font-style:normal;font-weight:400;src:url(" + __webpack_require__(1336) + ") format(\"woff\")}._1XB_fJFbz7lPqR9Jnt1os7{font-size:1.125rem;line-height:1.125rem}._2Yc8gjlsXWS5Yy85ss0zm3{color:#fff}@media (max-width:900px){._2Yc8gjlsXWS5Yy85ss0zm3{padding:0 2em}}._1XB_fJFbz7lPqR9Jnt1os7{margin:1em 0}.e7QasQV0meCjVa10Dw5Ru{font-size:1.125rem;position:relative}.e7QasQV0meCjVa10Dw5Ru button{color:#a7a2b2;display:block;margin-bottom:1em}.e7QasQV0meCjVa10Dw5Ru p{line-height:1.3em;margin:0 0 1.5em}._33zqTNh30PnwbPxnQVawtF,._2Z9uhIOQHsjXPK_85jYO1a{-webkit-transform:scaleY(0);transform:scaleY(0)}.yuXbd2H_bRzdcqiA3-3Rq,._3CMC6D4aCoNyQ6sAGvtbdg{-webkit-transform:scaleY(1);-webkit-transform-origin:top;transform:scaleY(1);transform-origin:top;transition:-webkit-transform .3s ease-in-out;transition:transform .3s ease-in-out;transition:transform .3s ease-in-out,-webkit-transform .3s ease-in-out}._1lssYYs4BeBL9EA-ltS0Mj,._2PPHTZBGPO8HvBpmlqIPEq{-webkit-transform:scaleY(1);transform:scaleY(1)}.han7cG5aM7lImE4rTznKu,._1FRv2rd24folIibeIDfILI{-webkit-transform:scaleY(0);-webkit-transform-origin:top;transform:scaleY(0);transform-origin:top;transition:-webkit-transform .3s ease-in-out;transition:transform .3s ease-in-out;transition:transform .3s ease-in-out,-webkit-transform .3s ease-in-out}", ""]);

// exports
exports.locals = {
	"Help__Header": "_1XB_fJFbz7lPqR9Jnt1os7",
	"Help": "_2Yc8gjlsXWS5Yy85ss0zm3",
	"Help__Item": "e7QasQV0meCjVa10Dw5Ru",
	"Help__DefinitionEnter": "_33zqTNh30PnwbPxnQVawtF",
	"Help__ItemEnter": "_2Z9uhIOQHsjXPK_85jYO1a",
	"Help__DefinitionEnterActive": "yuXbd2H_bRzdcqiA3-3Rq",
	"Help__ItemEnterActive": "_3CMC6D4aCoNyQ6sAGvtbdg",
	"Help__DefinitionLeave": "_1lssYYs4BeBL9EA-ltS0Mj",
	"Help__ItemLeave": "_2PPHTZBGPO8HvBpmlqIPEq",
	"Help__DefinitionLeaveActive": "han7cG5aM7lImE4rTznKu",
	"Help__ItemLeaveActive": "_1FRv2rd24folIibeIDfILI"
};

/***/ }),

/***/ 1659:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {/* unused harmony export loginWithAirbitzEthereumWallet */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return loginWithAirbitz; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_secure_random__ = __webpack_require__(1660);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_secure_random___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_secure_random__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_services_augurjs__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_auth_constants_auth_types__ = __webpack_require__(1483);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_auth_actions_load_account_data__ = __webpack_require__(660);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_auth_actions_update_is_logged__ = __webpack_require__(498);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ethrpc__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ethrpc___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ethrpc__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_modules_routes_helpers_make_path__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_modules_routes_constants_views__ = __webpack_require__(63);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };












var loginWithAirbitzEthereumWallet = function loginWithAirbitzEthereumWallet(airbitzAccount, ethereumWallet, history) {
  return function (dispatch) {
    var privateKey = ethereumWallet.keys.ethereumKey;
    var account = __WEBPACK_IMPORTED_MODULE_1_services_augurjs__["a" /* augur */].accounts.loginWithMasterKey({ privateKey: privateKey });

    if (!account.address) return console.error(account);

    dispatch(Object(__WEBPACK_IMPORTED_MODULE_4_modules_auth_actions_update_is_logged__["b" /* updateIsLogged */])(true));
    dispatch(Object(__WEBPACK_IMPORTED_MODULE_3_modules_auth_actions_load_account_data__["a" /* loadAccountData */])(_extends({}, account, {
      meta: {
        signer: privateKey,
        accountType: __WEBPACK_IMPORTED_MODULE_5_ethrpc__["constants"].ACCOUNT_TYPES.PRIVATE_KEY
      },
      name: airbitzAccount.username,
      airbitzAccount: airbitzAccount
    }), true));

    history.push(Object(__WEBPACK_IMPORTED_MODULE_6_modules_routes_helpers_make_path__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_7_modules_routes_constants_views__["j" /* DEFAULT_VIEW */]));
  };
};

// Create an ethereum wallet if one doesn't exist
var loginWithAirbitz = function loginWithAirbitz(airbitzAccount, history) {
  return function (dispatch) {
    var ethereumWallet = airbitzAccount.getFirstWallet(__WEBPACK_IMPORTED_MODULE_2_modules_auth_constants_auth_types__["a" /* AIRBITZ_WALLET_TYPE */]);
    if (ethereumWallet != null) {
      return dispatch(loginWithAirbitzEthereumWallet(airbitzAccount, ethereumWallet, history));
    }
    airbitzAccount.createWallet(__WEBPACK_IMPORTED_MODULE_2_modules_auth_constants_auth_types__["a" /* AIRBITZ_WALLET_TYPE */], { ethereumKey: new Buffer(__WEBPACK_IMPORTED_MODULE_0_secure_random___default()(32)).toString('hex') }, function (err, id) {
      if (err) return console.error({ code: 0, message: 'could not create wallet' });
      dispatch(loginWithAirbitzEthereumWallet(airbitzAccount, airbitzAccount.getWallet(id), history));
    });
  };
};
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(2).Buffer))

/***/ }),

/***/ 1660:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, Buffer) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!function(globals){
'use strict'

//*** UMD BEGIN
if (true) { //require.js / AMD
  !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
    return secureRandom
  }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
} else if (typeof module !== 'undefined' && module.exports) { //CommonJS
  module.exports = secureRandom
} else { //script / browser
  globals.secureRandom = secureRandom
}
//*** UMD END

//options.type is the only valid option
function secureRandom(count, options) {
  options = options || {type: 'Array'}
  //we check for process.pid to prevent browserify from tricking us
  if (typeof process != 'undefined' && typeof process.pid == 'number') {
    return nodeRandom(count, options)
  } else {
    var crypto = window.crypto || window.msCrypto
    if (!crypto) throw new Error("Your browser does not support window.crypto.")
    return browserRandom(count, options)
  }
}

function nodeRandom(count, options) {
  var crypto = __webpack_require__(1661)
  var buf = crypto.randomBytes(count)

  switch (options.type) {
    case 'Array':
      return [].slice.call(buf)
    case 'Buffer':
      return buf
    case 'Uint8Array':
      var arr = new Uint8Array(count)
      for (var i = 0; i < count; ++i) { arr[i] = buf.readUInt8(i) }
      return arr
    default:
      throw new Error(options.type + " is unsupported.")
  }
}

function browserRandom(count, options) {
  var nativeArr = new Uint8Array(count)
  var crypto = window.crypto || window.msCrypto
  crypto.getRandomValues(nativeArr)

  switch (options.type) {
    case 'Array':
      return [].slice.call(nativeArr)
    case 'Buffer':
      try { var b = new Buffer(1) } catch(e) { throw new Error('Buffer not supported in this environment. Use Node.js or Browserify for browser support.')}
      return new Buffer(nativeArr)
    case 'Uint8Array':
      return nativeArr
    default:
      throw new Error(options.type + " is unsupported.")
  }
}

secureRandom.randomArray = function(byteCount) {
  return secureRandom(byteCount, {type: 'Array'})
}

secureRandom.randomUint8Array = function(byteCount) {
  return secureRandom(byteCount, {type: 'Uint8Array'})
}

secureRandom.randomBuffer = function(byteCount) {
  return secureRandom(byteCount, {type: 'Buffer'})
}


}(this);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23), __webpack_require__(2).Buffer))

/***/ }),

/***/ 1661:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 1662:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_airbitz_core_js_ui__ = __webpack_require__(1663);


// NOTE -- I have a strong suspicion we can refactor this out to be clearer/cleaner, leaving for now

var selectABCUIContext = function selectABCUIContext() {
  return Object(__WEBPACK_IMPORTED_MODULE_0_airbitz_core_js_ui__["a" /* makeABCUIContext */])({
    apiKey: 'e239ec875955ec7474628a1dc3d449c8ea8e1b48',
    appId: 'net.augur.app',
    assetPath: '/abcui/assets/', // NOTE -- this is only here until the lib fixes this bug (PR submitted)
    assetsPath: '/abcui/assets/',
    vendorName: 'Augur',
    vendorImageUrl: 'https://airbitz.co/go/wp-content/uploads/2016/08/augur_logo_100.png'
  });
};

/* harmony default export */ __webpack_exports__["a"] = (selectABCUIContext);

/***/ }),

/***/ 1663:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return makeABCUIContext; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_airbitz_core_js__ = __webpack_require__(1664);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_whatwg_fetch__ = __webpack_require__(1681);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_whatwg_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_whatwg_fetch__);



var DomWindow;
var DomDocument;
if (typeof window === 'undefined') {
  DomWindow = {};
} else {
  DomWindow = window;
}
if (typeof document === 'undefined') {
  DomDocument = {
    createElement: function () {
      console.log(
        'createElement: Error browser routine used in non-browser environment'
      );
    },
    getElementsByTagName: function () {
      console.log(
        'getElementsByTagName: Error browser routine used in non-browser environment'
      );
    }
  };
} else {
  DomDocument = document;
}
function createIFrame (path) {
  var frame = DomDocument.createElement('iframe');
  var body = DomDocument.getElementsByTagName('BODY')[0];
  body.appendChild(frame, body);
  frame.setAttribute('src', path);
  frame.setAttribute('frameborder', '0');
  frame.setAttribute('allowtransparency', 'true');
  frame.setAttribute(
    'style',
    'border: 0px none transparent; overflow: hidden; visibility: visible; margin: 0px; padding: 0px; position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; z-index: 9999; display: block; background: transparent;'
  );
  return frame
}

function removeIFrame (frame) {
  frame.parentNode.removeChild(frame);
}

function makeABCUIContext (args) {
  return new UIContext(args)
}

var UIContext = function UIContext (args) {
  var opts = {};

  // API key:
  if (args.apiKey == null) {
    throw new Error('Missing api key')
  }
  opts.apiKey = args.apiKey;

  // appId:
  if (args.appId != null) {
    opts.appId = args.appId;
  } else if (args.accountType != null) {
    opts.accountType = args.accountType;
    console.warn(
      'Please provide Airbitz with an `appId`. The `accountType` is deprecated.'
    );
  } else {
    throw new Error('Missing appId')
  }

  // Figure out which server to use:
  if (DomWindow.localStorage != null) {
    var value = DomWindow.localStorage.getItem('airbitzAuthServer');
    if (value != null) {
      opts.authServer = value;
    }
  }

  // Make the core context:
  this.abcContext = Object(__WEBPACK_IMPORTED_MODULE_0_airbitz_core_js__["a" /* makeContext */])(opts);
  this.abcContext.displayName = args.vendorName;
  this.abcContext.displayImageUrl = args.vendorImageUrl;
  DomWindow.abcContext = this.abcContext;

  // Set up the UI context:
  if (args.assetPath != null) {
    this.assetsPath = args.assetsPath;
  } else if (args.bundlePath != null) {
    this.assetsPath = args.bundlePath + '/assets';
  } else {
    this.assetsPath = './assets';
  }

  DomWindow.abcuiContext = {
    vendorName: args.vendorName,
    assetsPath: this.assetsPath
  };
};

UIContext.prototype.openLoginWindow = function openLoginWindow (callback) {
  var frame = createIFrame(this.assetsPath + '/index.html');
  var done = function () {
    DomWindow.loginCallback = null;
    removeIFrame(frame);
  };
  DomWindow.loginCallback = function (error, account) {
    if (account) {
      DomWindow.abcAccount = account;
      callback(error, account);
      done();
    }
  };
  DomWindow.exitCallback = function () {
    removeIFrame(frame);
  };
};

UIContext.prototype.getABCContext = function getABCContext () {
  return this.abcContext
};

UIContext.prototype.openRecoveryWindow = function openRecoveryWindow (callback) {
  createIFrame(this.assetsPath + '/index.html#/recovery');
};

UIContext.prototype.openSetupRecoveryWindow = function openSetupRecoveryWindow (account, opts, callback) {
  var frame;
  if (opts && opts.noRequirePassword) {
    frame = createIFrame(
      this.assetsPath + '/index.html#/account/setuprecovery-nopassword'
    );
  } else {
    frame = createIFrame(
      this.assetsPath + '/index.html#/account/setuprecovery'
    );
  }
  DomWindow.exitCallback = function () {
    removeIFrame(frame);
  };
};

UIContext.prototype.openChangePinEdgeLoginWindow = function openChangePinEdgeLoginWindow (account, callback) {
  var frame = createIFrame(
    this.assetsPath + '/index.html#/account/changepin-edge-login'
  );
  DomWindow.exitCallback = function () {
    removeIFrame(frame);
  };
};

UIContext.prototype.openManageWindow = function openManageWindow (account, callback) {
  DomWindow.abcAccount = account;
  var frame = createIFrame(this.assetsPath + '/index.html#/home/');
  DomWindow.exitCallback = function () {
    removeIFrame(frame);
    callback(null);
  };
};


//# sourceMappingURL=abcui.es6.js.map


/***/ }),

/***/ 1664:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export error */
/* unused harmony export internal */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return makeContext; });
/* unused harmony export makeABCContext */
/* unused harmony export makeCurrencyWallet */
/* unused harmony export makeBrowserIo */
/* unused harmony export makeFakeIos */
/* unused harmony export NetworkError */
/* unused harmony export ObsoleteApiError */
/* unused harmony export UsernameError */
/* unused harmony export PasswordError */
/* unused harmony export OtpError */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_base_x__ = __webpack_require__(1665);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_base_x___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_base_x__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rfc4648__ = __webpack_require__(1484);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_utf8__ = __webpack_require__(1671);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_utf8___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_utf8__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_aes_js__ = __webpack_require__(1672);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_aes_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_aes_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_redux__ = __webpack_require__(1673);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_disklet__ = __webpack_require__(1677);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_scrypt_js__ = __webpack_require__(1680);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_scrypt_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_scrypt_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_redux_thunk__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_redux_thunk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_redux_thunk__);









var CREATE_REACTION = 'redux-reactions/CREATE_REACTION';
var DISPOSE_REACTION = 'redux-reactions/DISPOSE_REACTION';

/**
 * Returns an action which installs a reaction.
 *
 * The first parameters must be selector functions.
 * These accept the total store state and return the values
 * needed to trigger the reaction.
 *
 * The final function implements the reaction.
 * It is called when any of its selectors return a different value.
 */
function createReaction () {
  var selectors = [], len = arguments.length;
  while ( len-- ) selectors[ len ] = arguments[ len ];

  var reaction = selectors.pop();

  return { type: CREATE_REACTION, payload: { reaction: reaction, selectors: selectors } }
}

/**
 * Assuming the state has changed, attempts to run a reaction.
 */
function runReaction (state, cache) {
  var inputs = cache.inputs;
  var reaction = cache.reaction;
  var selectors = cache.selectors;

  // Check the selectors, starting a new array if there are changes:
  var newInputs;
  for (var i = 0; i < selectors.length; ++i) {
    var input = selectors[i](state);

    if (newInputs) {
      newInputs[i] = input;
    } else if (input !== inputs[i]) {
      newInputs = inputs.slice(0, i);
      newInputs[i] = input;
    }
  }

  // Run the reaction if the inputs have changed:
  if (newInputs) {
    cache.inputs = newInputs;
    return reaction.apply(void 0, newInputs.concat( inputs ))
  }
}

/**
 * Add this middleware to your reducer to enable reactions.
 */
function reactionMiddleware (ref) {
  var dispatch = ref.dispatch;
  var getState = ref.getState;

  var reactions = [];
  var nextId = 0;
  var oldState;

  function maybeRun (out) {
    return typeof out === 'function' ? out(dispatch, getState) : out
  }

  return function (next) { return function (action) {
    var type = action.type;
    var payload = action.payload;

    // Intercept our action types:
    switch (type) {
      case CREATE_REACTION: {
        var reaction = payload.reaction;
        var selectors = payload.selectors;
        var id = ++nextId;
        var cache = { id: id, inputs: [], reaction: reaction, selectors: selectors };

        reactions.push(cache);
        var out$1 = maybeRun(runReaction(getState(), cache));

        return { type: DISPOSE_REACTION, payload: { id: id, out: out$1 } }
      }
      case DISPOSE_REACTION: {
        reactions = reactions.filter(function (cache) { return cache.id !== payload.id; });
        return
      }
    }

    var out = next(action);

    // Run the reactions if the state has changed:
    var actions = [];
    var state = getState();
    if (state !== oldState) {
      oldState = state;
      for (var i = 0, list = reactions; i < list.length; i += 1) {
        var cache$1 = list[i];

        actions.push(runReaction(state, cache$1));
      }
    }

    // Dispatch any actions that were generated:
    for (var i$1 = 0, list$1 = actions; i$1 < list$1.length; i$1 += 1) {
      var action$1 = list$1[i$1];

      maybeRun(action$1);
    }

    return out
  }; }
}

/**
 * Returns x, unless that would be undefined or null.
 * This is called the "Elvis operator" in many languages.
 */
function elvis (x, fallback) {
  return x != null ? x : fallback
}

/**
 * Copies the selected properties into a new object, if they exist.
 */
function filterObject (source, keys) {
  var out = {};
  for (var i = 0, list = keys; i < list.length; i += 1) {
    var key = list[i];

    if (key in source) {
      out[key] = source[key];
    }
  }
  return out
}

/**
 * Safely concatenate a bunch of arrays, which may or may not exist.
 * Purrs quietly when pet.
 */
function softCat () {
  var lists = [], len = arguments.length;
  while ( len-- ) lists[ len ] = arguments[ len ];

  return (ref = []).concat.apply(ref, lists.filter(function (list) { return list != null; }))
  var ref;
}

/**
 * Merges several Javascript objects deeply,
 * prefering the items from later objects.
 */
function mergeDeeply () {
  var objects = [], len = arguments.length;
  while ( len-- ) objects[ len ] = arguments[ len ];

  var out = {};

  for (var i = 0, list = objects; i < list.length; i += 1) {
    var o = list[i];

    if (o == null) { continue }

    for (var i$1 = 0, list$1 = Object.keys(o); i$1 < list$1.length; i$1 += 1) {
      var key = list$1[i$1];

      if (o[key] == null) { continue }

      out[key] = out[key] != null && typeof o[key] === 'object'
        ? mergeDeeply(out[key], o[key])
        : o[key];
    }
  }

  return out
}

function compareInputs (a, b) {
  if ( b === void 0 ) b = [];

  if (a.length !== b.length) { return false }
  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) { return false }
  }
  return true
}

/**
 * Creates a cached selector for an expensive-to-compute value.
 * @param {*} selector A function that takes the state and some optional
 * parameters. Each parameter is used to index into the cache.
 * The selector should return an array of values, which are passed into
 * the derive function.
 * @param {*} derive This is the expensive calculation.
 * Its inputs come from the selector function.
 */
function deriveSelector (selector, derive) {
  var cacheTree = {};

  var out = function derivedSelector (state) {
    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

    // The arguments must match the selector:
    if (args.length + 1 !== selector.length) {
      throw new Error(("Expected " + (selector.length) + " arguments"))
    }

    // Navigate to our specific cache:
    var cache = cacheTree;
    for (var i = 0, list = args; i < list.length; i += 1) {
      var arg = list[i];

      if (!cache[arg]) { cache[arg] = {}; }
      cache = cache[arg];
    }

    // First, see if the state has changed:
    if (cache.oldState === state) { return cache.value }
    cache.oldState = state;

    // Next, check the inputs:
    var newInputs = selector.apply(void 0, [ state ].concat( args ));
    if (!Array.isArray(newInputs)) {
      throw new Error('The sector for a derived value should return an array.')
    }

    // Run the derivation if the inputs have changed:
    if (!compareInputs(newInputs, cache.inputs)) {
      cache.inputs = newInputs;
      cache.value = derive.apply(void 0, newInputs);
    }

    return cache.value
  };

  out.clearCache = function clearCache () {
    cacheTree = {};
  };

  return out
}

// Basic wallet functionality:
function getCurrencyWalletEngine (state, keyId) {
  return state.currencyWallets[keyId].engine
}

function getCurrencyWalletPlugin (state, keyId) {
  return state.currencyWallets[keyId].plugin
}

// Settable values:

function getCurrencyWalletBalance (state, keyId) {
  return state.currencyWallets[keyId].balance
}

function getCurrencyWalletBlockHeight (state, keyId) {
  return state.currencyWallets[keyId].blockHeight
}

function getCurrencyWalletName (state, keyId) {
  return state.currencyWallets[keyId].name
}

function getCurrencyWalletFiat (state, keyId) {
  return 'iso:USD'
}

function getCurrencyWalletFile (state, keyId, txid) {
  return state.currencyWallets[keyId].files[txid]
}

function getCurrencyWalletProgress (state, keyId) {
  return state.currencyWallets[keyId].progress
}

// Transactions:

function getCurrencyWalletFiles (state, keyId) {
  return state.currencyWallets[keyId].files
}

/**
 * Returns a list of `{ txid?: string, filename?: string, date?: number }`.
 * TODO: Merge our file list with the plugin txid list.
 */
var getCurrencyWalletTxList = deriveSelector(
  function (state, keyId) { return [state.currencyWallets[keyId].txs]; },
  function (txs) { return Object.keys(txs).map(function (txid) { return ({ txid: txid }); }); }
);

function getCurrencyWalletTxs (state, keyId) {
  return state.currencyWallets[keyId].txs
}

/**
 * Recursively searches for the best exchange rate.
 */
function searchRoutes (search, fromCurrency, parentRate, blacklist) {
  // If we reach our target, we are done:
  if (fromCurrency === search.toCurrency) {
    search.bestRate = parentRate;
  }

  // Never re-vist the same currency:
  blacklist = Object.assign({}, blacklist);
  blacklist[fromCurrency] = true;

  // Iterate over all the currencies we can convert to from here:
  for (var i$1 = 0, list = Object.keys(search.routes[fromCurrency]); i$1 < list.length; i$1 += 1) {
    // Skip this currency if it is on the blacklist:
    var currency = list[i$1];

    if (blacklist[currency]) { continue }

    // Of all the pairs that bring us to this currency, find the best one:
    var ourRate = { rate: 0, cost: Infinity };
    var indices = search.routes[fromCurrency][currency];
    for (var i$2 = 0, list$1 = indices; i$2 < list$1.length; i$2 += 1) {
      var i = list$1[i$2];

      var pair = search.pairs[i];
      var inverse = pair.fromCurrency !== fromCurrency;
      var cost =
        parentRate.cost +
        search.getPairCost(pair.source, search.now - pair.timestamp, inverse);

      // Save this rate if it has a better score:
      if (cost < ourRate.cost) {
        var rate = inverse
          ? parentRate.rate / pair.rate
          : parentRate.rate * pair.rate;
        ourRate = { rate: rate, cost: cost };
      }
    }

    // Only recurse if we have a better score:
    if (ourRate.cost < search.bestRate.cost) {
      searchRoutes(search, currency, ourRate, blacklist);
    }
  }
}

function startRouteSearch (
  routes,
  pairs,
  fromCurrency,
  toCurrency,
  getPairCost
) {
  var search = {
    // Search constants:
    now: Date.now() / 1000,
    routes: routes,
    pairs: pairs,
    toCurrency: toCurrency,
    getPairCost: getPairCost,

    // The search overwrites this as it finds better rates:
    bestRate: { rate: 0, cost: Infinity }
  };

  // Only search if the endpoints exist:
  if (search.routes[fromCurrency] && search.routes[toCurrency]) {
    searchRoutes(search, fromCurrency, { rate: 1, cost: 0 }, {});
  }

  return search.bestRate.rate
}

/**
 * Looks up the best available exchange rate.
 * @param {*} getPairCost a function that assigns scores to currecy pairs.
 * Higher scores are worse. The scores add, so longer paths have higher costs
 * than shorter paths. The signature is `(source, age, inverse) => cost`.
 */
function getExchangeRate (state, fromCurrency, toCurrency, getPairCost) {
  return startRouteSearch(
    state.exchangeCache.rates.routes,
    state.exchangeCache.rates.pairs,
    fromCurrency,
    toCurrency,
    getPairCost
  )
}

function getCurrencyMultiplier (state, currencyCode) {
  for (var i = 0, list = state.plugins.currencyPlugins; i < list.length; i += 1) {
    var plugin = list[i];

    var info = plugin.currencyInfo;

    for (var i$1 = 0, list$1 = info.denominations; i$1 < list$1.length; i$1 += 1) {
      var denomination = list$1[i$1];

      if (denomination.name === currencyCode) {
        return denomination.multiplier
      }
    }

    for (var i$2 = 0, list$2 = info.metaTokens; i$2 < list$2.length; i$2 += 1) {
      var token = list$2[i$2];

      for (var i$3 = 0, list$3 = token.denominations; i$3 < list$3.length; i$3 += 1) {
        var denomination$1 = list$3[i$3];

        if (denomination$1.name === currencyCode) {
          return denomination$1.multiplier
        }
      }
    }
  }

  return 1
}

function getExchangePlugins (state) {
  return state.plugins.exchangePlugins
}

var base58Codec = __WEBPACK_IMPORTED_MODULE_0_base_x___default()(
  '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
);

function assertString (text) {
  if (typeof text !== 'string') {
    throw new Error('Input is not a string')
  }
}

function assertData (data) {
  if (typeof data === 'string' || data.length == null) {
    throw new Error('Input is not data')
  }
}

var base16$1 = {
  parse: function parse (text) {
    assertString(text);
    return __WEBPACK_IMPORTED_MODULE_1_rfc4648__["a" /* base16 */].parse(text, { out: Uint8Array })
  },
  stringify: function stringify (data) {
    assertData(data);
    return __WEBPACK_IMPORTED_MODULE_1_rfc4648__["a" /* base16 */].stringify(data).toLowerCase()
  }
};

var base58 = {
  parse: function parse (text) {
    assertString(text);
    return base58Codec.decode(text)
  },
  stringify: function stringify (data) {
    assertData(data);
    return base58Codec.encode(data)
  }
};

var base64$1 = {
  parse: function parse (text) {
    assertString(text);
    return __WEBPACK_IMPORTED_MODULE_1_rfc4648__["b" /* base64 */].parse(text, { out: Uint8Array })
  },
  stringify: function stringify (data) {
    assertData(data);
    return __WEBPACK_IMPORTED_MODULE_1_rfc4648__["b" /* base64 */].stringify(data)
  }
};

var utf8 = {
  parse: function parse (text) {
    var byteString = __WEBPACK_IMPORTED_MODULE_2_utf8___default.a.encode(text);
    var out = new Uint8Array(text.length);

    for (var i = 0; i < text.length; ++i) {
      out[i] = byteString.charCodeAt(i);
    }

    return out
  },

  stringify: function stringify (data) {
    assertData(data);

    // Some of our data contains terminating null bytes due to an old bug.
    // We need to filter that out here:
    var length = data[data.length - 1] === 0 ? data.length - 1 : data.length;

    var byteString = '';
    for (var i = 0; i < length; ++i) {
      byteString += String.fromCharCode(data[i]);
    }

    return __WEBPACK_IMPORTED_MODULE_2_utf8___default.a.decode(byteString)
  }
};

function calcSnrpForTarget (salt, benchMs, targetMs) {
  var snrp = {
    salt_hex: base16$1.stringify(salt),
    n: 16384,
    r: 1,
    p: 1
  };

  var estTargetTimeElapsed = benchMs;
  var nUnPowered = 0;
  var r = targetMs / estTargetTimeElapsed;
  if (r > 8) {
    snrp.r = 8;

    estTargetTimeElapsed *= 8;
    var n = targetMs / estTargetTimeElapsed;

    if (n > 4) {
      nUnPowered = 4;

      estTargetTimeElapsed *= 4;
      var p = targetMs / estTargetTimeElapsed;
      snrp.p = Math.floor(p);
    } else {
      nUnPowered = Math.floor(n);
    }
  } else {
    snrp.r = r > 4 ? Math.floor(r) : 4;
  }
  nUnPowered = nUnPowered >= 1 ? nUnPowered : 1;
  snrp.n = Math.pow(2, nUnPowered + 13);

  return snrp
}

/**
 * Performs an scrypt derivation.
 */
function scrypt (state, data, snrp) {
  return state.scrypt.timeScrypt(data, snrp).then(function (value) { return value.hash; })
}

/**
 * Computes an SNRP value.
 */
function makeSnrp (state, targetMs) {
  if ( targetMs === void 0 ) targetMs = 2000;

  var io = state.io;
  var scrypt = state.scrypt;

  // Run the benchmark.
  // Writing directly to Redux would normally be a big no-no,
  // but memoization is "state" in the normal sense:
  if (scrypt.benchmark == null) {
    scrypt.benchmark = scrypt.timeScrypt('', {
      salt_hex: '00000000000000000000000000000000',
      n: 16384,
      r: 1,
      p: 1
    });
  }

  // Calculate an SNRP value:
  return scrypt.benchmark.then(function (value) {
    var benchMs = value.time;

    var snrp = calcSnrpForTarget(io.random(32), benchMs, targetMs);
    io.console.info(
      ("snrp: " + (snrp.n) + " " + (snrp.r) + " " + (snrp.p) + " based on " + benchMs + "ms benchmark")
    );
    return snrp
  })
}

var userIdSnrp = {
  salt_hex: 'b5865ffb9fa7b3bfe4b2384d47ce831ee22a4a9d5c34c7ef7d21467cc758f81b',
  n: 16384,
  r: 1,
  p: 1
};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var cryptoBundle = createCommonjsModule(function (module, exports) {
(function(e, a) { for(var i in a) { e[i] = a[i]; } }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			{ return installedModules[moduleId].exports; }

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	// These two libraries are broken under Rollup.js,
	// so we have to webpack them before we include them in our bundle.
	// This is the Webpack entry point.

	exports.elliptic = __webpack_require__(1);
	exports.hashjs = __webpack_require__(18);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var elliptic = exports;

	elliptic.version = __webpack_require__(2).version;
	elliptic.utils = __webpack_require__(3);
	elliptic.rand = __webpack_require__(9);
	elliptic.curve = __webpack_require__(11);
	elliptic.curves = __webpack_require__(17);

	// Protocols
	elliptic.ec = __webpack_require__(31);
	elliptic.eddsa = __webpack_require__(35);


/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = {"_from":"elliptic@^6.4.0","_id":"elliptic@6.4.0","_inBundle":false,"_integrity":"sha1-ysmvh2LIWDYYcAPI3+GT5eLq5d8=","_location":"/elliptic","_phantomChildren":{},"_requested":{"type":"range","registry":true,"raw":"elliptic@^6.4.0","name":"elliptic","escapedName":"elliptic","rawSpec":"^6.4.0","saveSpec":null,"fetchSpec":"^6.4.0"},"_requiredBy":["/"],"_resolved":"https://registry.npmjs.org/elliptic/-/elliptic-6.4.0.tgz","_shasum":"cac9af8762c85836187003c8dfe193e5e2eae5df","_spec":"elliptic@^6.4.0","_where":"/Users/paul/git3/airbitz-core-js","author":{"name":"Fedor Indutny","email":"fedor@indutny.com"},"bugs":{"url":"https://github.com/indutny/elliptic/issues"},"bundleDependencies":false,"dependencies":{"bn.js":"^4.4.0","brorand":"^1.0.1","hash.js":"^1.0.0","hmac-drbg":"^1.0.0","inherits":"^2.0.1","minimalistic-assert":"^1.0.0","minimalistic-crypto-utils":"^1.0.0"},"deprecated":false,"description":"EC cryptography","devDependencies":{"brfs":"^1.4.3","coveralls":"^2.11.3","grunt":"^0.4.5","grunt-browserify":"^5.0.0","grunt-cli":"^1.2.0","grunt-contrib-connect":"^1.0.0","grunt-contrib-copy":"^1.0.0","grunt-contrib-uglify":"^1.0.1","grunt-mocha-istanbul":"^3.0.1","grunt-saucelabs":"^8.6.2","istanbul":"^0.4.2","jscs":"^2.9.0","jshint":"^2.6.0","mocha":"^2.1.0"},"files":["lib"],"homepage":"https://github.com/indutny/elliptic","keywords":["EC","Elliptic","curve","Cryptography"],"license":"MIT","main":"lib/elliptic.js","name":"elliptic","repository":{"type":"git","url":"git+ssh://git@github.com/indutny/elliptic.git"},"scripts":{"jscs":"jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js","jshint":"jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js","lint":"npm run jscs && npm run jshint","test":"npm run lint && npm run unit","unit":"istanbul test _mocha --reporter=spec test/index.js","version":"grunt dist && git add dist/"},"version":"6.4.0"};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = exports;
	var BN = __webpack_require__(4);
	var minAssert = __webpack_require__(7);
	var minUtils = __webpack_require__(8);

	utils.assert = minAssert;
	utils.toArray = minUtils.toArray;
	utils.zero2 = minUtils.zero2;
	utils.toHex = minUtils.toHex;
	utils.encode = minUtils.encode;

	// Represent num in a w-NAF form
	function getNAF(num, w) {
	  var naf = [];
	  var ws = 1 << (w + 1);
	  var k = num.clone();
	  while (k.cmpn(1) >= 0) {
	    var z;
	    if (k.isOdd()) {
	      var mod = k.andln(ws - 1);
	      if (mod > (ws >> 1) - 1)
	        { z = (ws >> 1) - mod; }
	      else
	        { z = mod; }
	      k.isubn(z);
	    } else {
	      z = 0;
	    }
	    naf.push(z);

	    // Optimization, shift by word if possible
	    var shift = (k.cmpn(0) !== 0 && k.andln(ws - 1) === 0) ? (w + 1) : 1;
	    for (var i = 1; i < shift; i++)
	      { naf.push(0); }
	    k.iushrn(shift);
	  }

	  return naf;
	}
	utils.getNAF = getNAF;

	// Represent k1, k2 in a Joint Sparse Form
	function getJSF(k1, k2) {
	  var jsf = [
	    [],
	    []
	  ];

	  k1 = k1.clone();
	  k2 = k2.clone();
	  var d1 = 0;
	  var d2 = 0;
	  while (k1.cmpn(-d1) > 0 || k2.cmpn(-d2) > 0) {

	    // First phase
	    var m14 = (k1.andln(3) + d1) & 3;
	    var m24 = (k2.andln(3) + d2) & 3;
	    if (m14 === 3)
	      { m14 = -1; }
	    if (m24 === 3)
	      { m24 = -1; }
	    var u1;
	    if ((m14 & 1) === 0) {
	      u1 = 0;
	    } else {
	      var m8 = (k1.andln(7) + d1) & 7;
	      if ((m8 === 3 || m8 === 5) && m24 === 2)
	        { u1 = -m14; }
	      else
	        { u1 = m14; }
	    }
	    jsf[0].push(u1);

	    var u2;
	    if ((m24 & 1) === 0) {
	      u2 = 0;
	    } else {
	      var m8 = (k2.andln(7) + d2) & 7;
	      if ((m8 === 3 || m8 === 5) && m14 === 2)
	        { u2 = -m24; }
	      else
	        { u2 = m24; }
	    }
	    jsf[1].push(u2);

	    // Second phase
	    if (2 * d1 === u1 + 1)
	      { d1 = 1 - d1; }
	    if (2 * d2 === u2 + 1)
	      { d2 = 1 - d2; }
	    k1.iushrn(1);
	    k2.iushrn(1);
	  }

	  return jsf;
	}
	utils.getJSF = getJSF;

	function cachedProperty(obj, name, computer) {
	  var key = '_' + name;
	  obj.prototype[name] = function cachedProperty() {
	    return this[key] !== undefined ? this[key] :
	           this[key] = computer.call(this);
	  };
	}
	utils.cachedProperty = cachedProperty;

	function parseBytes(bytes) {
	  return typeof bytes === 'string' ? utils.toArray(bytes, 'hex') :
	                                     bytes;
	}
	utils.parseBytes = parseBytes;

	function intFromLE(bytes) {
	  return new BN(bytes, 'hex', 'le');
	}
	utils.intFromLE = intFromLE;



/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {(function (module, exports) {
	  'use strict';

	  // Utils
	  function assert (val, msg) {
	    if (!val) { throw new Error(msg || 'Assertion failed'); }
	  }

	  // Could use `inherits` module, but don't want to move from single file
	  // architecture yet.
	  function inherits (ctor, superCtor) {
	    ctor.super_ = superCtor;
	    var TempCtor = function () {};
	    TempCtor.prototype = superCtor.prototype;
	    ctor.prototype = new TempCtor();
	    ctor.prototype.constructor = ctor;
	  }

	  // BN

	  function BN (number, base, endian) {
	    if (BN.isBN(number)) {
	      return number;
	    }

	    this.negative = 0;
	    this.words = null;
	    this.length = 0;

	    // Reduction context
	    this.red = null;

	    if (number !== null) {
	      if (base === 'le' || base === 'be') {
	        endian = base;
	        base = 10;
	      }

	      this._init(number || 0, base || 10, endian || 'be');
	    }
	  }
	  if (typeof module === 'object') {
	    module.exports = BN;
	  } else {
	    exports.BN = BN;
	  }

	  BN.BN = BN;
	  BN.wordSize = 26;

	  var Buffer;
	  try {
	    // Obfuscate that we require Buffer, to reduce size
	    Buffer = __webpack_require__(6).Buffer;
	  } catch (e) {
	  }

	  BN.isBN = function isBN (num) {
	    if (num instanceof BN) {
	      return true;
	    }

	    return num !== null && typeof num === 'object' &&
	      num.constructor.wordSize === BN.wordSize && Array.isArray(num.words);
	  };

	  BN.max = function max (left, right) {
	    if (left.cmp(right) > 0) { return left; }
	    return right;
	  };

	  BN.min = function min (left, right) {
	    if (left.cmp(right) < 0) { return left; }
	    return right;
	  };

	  BN.prototype._init = function init (number, base, endian) {
	    if (typeof number === 'number') {
	      return this._initNumber(number, base, endian);
	    }

	    if (typeof number === 'object') {
	      return this._initArray(number, base, endian);
	    }

	    if (base === 'hex') {
	      base = 16;
	    }
	    assert(base === (base | 0) && base >= 2 && base <= 36);

	    number = number.toString().replace(/\s+/g, '');
	    var start = 0;
	    if (number[0] === '-') {
	      start++;
	    }

	    if (base === 16) {
	      this._parseHex(number, start);
	    } else {
	      this._parseBase(number, base, start);
	    }

	    if (number[0] === '-') {
	      this.negative = 1;
	    }

	    this.strip();

	    if (endian !== 'le') { return; }

	    this._initArray(this.toArray(), base, endian);
	  };

	  BN.prototype._initNumber = function _initNumber (number, base, endian) {
	    if (number < 0) {
	      this.negative = 1;
	      number = -number;
	    }
	    if (number < 0x4000000) {
	      this.words = [ number & 0x3ffffff ];
	      this.length = 1;
	    } else if (number < 0x10000000000000) {
	      this.words = [
	        number & 0x3ffffff,
	        (number / 0x4000000) & 0x3ffffff
	      ];
	      this.length = 2;
	    } else {
	      assert(number < 0x20000000000000); // 2 ^ 53 (unsafe)
	      this.words = [
	        number & 0x3ffffff,
	        (number / 0x4000000) & 0x3ffffff,
	        1
	      ];
	      this.length = 3;
	    }

	    if (endian !== 'le') { return; }

	    // Reverse the bytes
	    this._initArray(this.toArray(), base, endian);
	  };

	  BN.prototype._initArray = function _initArray (number, base, endian) {
	    var this$1 = this;

	    // Perhaps a Uint8Array
	    assert(typeof number.length === 'number');
	    if (number.length <= 0) {
	      this.words = [ 0 ];
	      this.length = 1;
	      return this;
	    }

	    this.length = Math.ceil(number.length / 3);
	    this.words = new Array(this.length);
	    for (var i = 0; i < this.length; i++) {
	      this$1.words[i] = 0;
	    }

	    var j, w;
	    var off = 0;
	    if (endian === 'be') {
	      for (i = number.length - 1, j = 0; i >= 0; i -= 3) {
	        w = number[i] | (number[i - 1] << 8) | (number[i - 2] << 16);
	        this$1.words[j] |= (w << off) & 0x3ffffff;
	        this$1.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
	        off += 24;
	        if (off >= 26) {
	          off -= 26;
	          j++;
	        }
	      }
	    } else if (endian === 'le') {
	      for (i = 0, j = 0; i < number.length; i += 3) {
	        w = number[i] | (number[i + 1] << 8) | (number[i + 2] << 16);
	        this$1.words[j] |= (w << off) & 0x3ffffff;
	        this$1.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
	        off += 24;
	        if (off >= 26) {
	          off -= 26;
	          j++;
	        }
	      }
	    }
	    return this.strip();
	  };

	  function parseHex (str, start, end) {
	    var r = 0;
	    var len = Math.min(str.length, end);
	    for (var i = start; i < len; i++) {
	      var c = str.charCodeAt(i) - 48;

	      r <<= 4;

	      // 'a' - 'f'
	      if (c >= 49 && c <= 54) {
	        r |= c - 49 + 0xa;

	      // 'A' - 'F'
	      } else if (c >= 17 && c <= 22) {
	        r |= c - 17 + 0xa;

	      // '0' - '9'
	      } else {
	        r |= c & 0xf;
	      }
	    }
	    return r;
	  }

	  BN.prototype._parseHex = function _parseHex (number, start) {
	    var this$1 = this;

	    // Create possibly bigger array to ensure that it fits the number
	    this.length = Math.ceil((number.length - start) / 6);
	    this.words = new Array(this.length);
	    for (var i = 0; i < this.length; i++) {
	      this$1.words[i] = 0;
	    }

	    var j, w;
	    // Scan 24-bit chunks and add them to the number
	    var off = 0;
	    for (i = number.length - 6, j = 0; i >= start; i -= 6) {
	      w = parseHex(number, i, i + 6);
	      this$1.words[j] |= (w << off) & 0x3ffffff;
	      // NOTE: `0x3fffff` is intentional here, 26bits max shift + 24bit hex limb
	      this$1.words[j + 1] |= w >>> (26 - off) & 0x3fffff;
	      off += 24;
	      if (off >= 26) {
	        off -= 26;
	        j++;
	      }
	    }
	    if (i + 6 !== start) {
	      w = parseHex(number, start, i + 6);
	      this.words[j] |= (w << off) & 0x3ffffff;
	      this.words[j + 1] |= w >>> (26 - off) & 0x3fffff;
	    }
	    this.strip();
	  };

	  function parseBase (str, start, end, mul) {
	    var r = 0;
	    var len = Math.min(str.length, end);
	    for (var i = start; i < len; i++) {
	      var c = str.charCodeAt(i) - 48;

	      r *= mul;

	      // 'a'
	      if (c >= 49) {
	        r += c - 49 + 0xa;

	      // 'A'
	      } else if (c >= 17) {
	        r += c - 17 + 0xa;

	      // '0' - '9'
	      } else {
	        r += c;
	      }
	    }
	    return r;
	  }

	  BN.prototype._parseBase = function _parseBase (number, base, start) {
	    var this$1 = this;

	    // Initialize as zero
	    this.words = [ 0 ];
	    this.length = 1;

	    // Find length of limb in base
	    for (var limbLen = 0, limbPow = 1; limbPow <= 0x3ffffff; limbPow *= base) {
	      limbLen++;
	    }
	    limbLen--;
	    limbPow = (limbPow / base) | 0;

	    var total = number.length - start;
	    var mod = total % limbLen;
	    var end = Math.min(total, total - mod) + start;

	    var word = 0;
	    for (var i = start; i < end; i += limbLen) {
	      word = parseBase(number, i, i + limbLen, base);

	      this$1.imuln(limbPow);
	      if (this$1.words[0] + word < 0x4000000) {
	        this$1.words[0] += word;
	      } else {
	        this$1._iaddn(word);
	      }
	    }

	    if (mod !== 0) {
	      var pow = 1;
	      word = parseBase(number, i, number.length, base);

	      for (i = 0; i < mod; i++) {
	        pow *= base;
	      }

	      this.imuln(pow);
	      if (this.words[0] + word < 0x4000000) {
	        this.words[0] += word;
	      } else {
	        this._iaddn(word);
	      }
	    }
	  };

	  BN.prototype.copy = function copy (dest) {
	    var this$1 = this;

	    dest.words = new Array(this.length);
	    for (var i = 0; i < this.length; i++) {
	      dest.words[i] = this$1.words[i];
	    }
	    dest.length = this.length;
	    dest.negative = this.negative;
	    dest.red = this.red;
	  };

	  BN.prototype.clone = function clone () {
	    var r = new BN(null);
	    this.copy(r);
	    return r;
	  };

	  BN.prototype._expand = function _expand (size) {
	    var this$1 = this;

	    while (this.length < size) {
	      this$1.words[this$1.length++] = 0;
	    }
	    return this;
	  };

	  // Remove leading `0` from `this`
	  BN.prototype.strip = function strip () {
	    var this$1 = this;

	    while (this.length > 1 && this.words[this.length - 1] === 0) {
	      this$1.length--;
	    }
	    return this._normSign();
	  };

	  BN.prototype._normSign = function _normSign () {
	    // -0 = 0
	    if (this.length === 1 && this.words[0] === 0) {
	      this.negative = 0;
	    }
	    return this;
	  };

	  BN.prototype.inspect = function inspect () {
	    return (this.red ? '<BN-R: ' : '<BN: ') + this.toString(16) + '>';
	  };

	  /*

	  var zeros = [];
	  var groupSizes = [];
	  var groupBases = [];

	  var s = '';
	  var i = -1;
	  while (++i < BN.wordSize) {
	    zeros[i] = s;
	    s += '0';
	  }
	  groupSizes[0] = 0;
	  groupSizes[1] = 0;
	  groupBases[0] = 0;
	  groupBases[1] = 0;
	  var base = 2 - 1;
	  while (++base < 36 + 1) {
	    var groupSize = 0;
	    var groupBase = 1;
	    while (groupBase < (1 << BN.wordSize) / base) {
	      groupBase *= base;
	      groupSize += 1;
	    }
	    groupSizes[base] = groupSize;
	    groupBases[base] = groupBase;
	  }

	  */

	  var zeros = [
	    '',
	    '0',
	    '00',
	    '000',
	    '0000',
	    '00000',
	    '000000',
	    '0000000',
	    '00000000',
	    '000000000',
	    '0000000000',
	    '00000000000',
	    '000000000000',
	    '0000000000000',
	    '00000000000000',
	    '000000000000000',
	    '0000000000000000',
	    '00000000000000000',
	    '000000000000000000',
	    '0000000000000000000',
	    '00000000000000000000',
	    '000000000000000000000',
	    '0000000000000000000000',
	    '00000000000000000000000',
	    '000000000000000000000000',
	    '0000000000000000000000000'
	  ];

	  var groupSizes = [
	    0, 0,
	    25, 16, 12, 11, 10, 9, 8,
	    8, 7, 7, 7, 7, 6, 6,
	    6, 6, 6, 6, 6, 5, 5,
	    5, 5, 5, 5, 5, 5, 5,
	    5, 5, 5, 5, 5, 5, 5
	  ];

	  var groupBases = [
	    0, 0,
	    33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216,
	    43046721, 10000000, 19487171, 35831808, 62748517, 7529536, 11390625,
	    16777216, 24137569, 34012224, 47045881, 64000000, 4084101, 5153632,
	    6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149,
	    24300000, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176
	  ];

	  BN.prototype.toString = function toString (base, padding) {
	    var this$1 = this;

	    base = base || 10;
	    padding = padding | 0 || 1;

	    var out;
	    if (base === 16 || base === 'hex') {
	      out = '';
	      var off = 0;
	      var carry = 0;
	      for (var i = 0; i < this.length; i++) {
	        var w = this$1.words[i];
	        var word = (((w << off) | carry) & 0xffffff).toString(16);
	        carry = (w >>> (24 - off)) & 0xffffff;
	        if (carry !== 0 || i !== this$1.length - 1) {
	          out = zeros[6 - word.length] + word + out;
	        } else {
	          out = word + out;
	        }
	        off += 2;
	        if (off >= 26) {
	          off -= 26;
	          i--;
	        }
	      }
	      if (carry !== 0) {
	        out = carry.toString(16) + out;
	      }
	      while (out.length % padding !== 0) {
	        out = '0' + out;
	      }
	      if (this.negative !== 0) {
	        out = '-' + out;
	      }
	      return out;
	    }

	    if (base === (base | 0) && base >= 2 && base <= 36) {
	      // var groupSize = Math.floor(BN.wordSize * Math.LN2 / Math.log(base));
	      var groupSize = groupSizes[base];
	      // var groupBase = Math.pow(base, groupSize);
	      var groupBase = groupBases[base];
	      out = '';
	      var c = this.clone();
	      c.negative = 0;
	      while (!c.isZero()) {
	        var r = c.modn(groupBase).toString(base);
	        c = c.idivn(groupBase);

	        if (!c.isZero()) {
	          out = zeros[groupSize - r.length] + r + out;
	        } else {
	          out = r + out;
	        }
	      }
	      if (this.isZero()) {
	        out = '0' + out;
	      }
	      while (out.length % padding !== 0) {
	        out = '0' + out;
	      }
	      if (this.negative !== 0) {
	        out = '-' + out;
	      }
	      return out;
	    }

	    assert(false, 'Base should be between 2 and 36');
	  };

	  BN.prototype.toNumber = function toNumber () {
	    var ret = this.words[0];
	    if (this.length === 2) {
	      ret += this.words[1] * 0x4000000;
	    } else if (this.length === 3 && this.words[2] === 0x01) {
	      // NOTE: at this stage it is known that the top bit is set
	      ret += 0x10000000000000 + (this.words[1] * 0x4000000);
	    } else if (this.length > 2) {
	      assert(false, 'Number can only safely store up to 53 bits');
	    }
	    return (this.negative !== 0) ? -ret : ret;
	  };

	  BN.prototype.toJSON = function toJSON () {
	    return this.toString(16);
	  };

	  BN.prototype.toBuffer = function toBuffer (endian, length) {
	    assert(typeof Buffer !== 'undefined');
	    return this.toArrayLike(Buffer, endian, length);
	  };

	  BN.prototype.toArray = function toArray (endian, length) {
	    return this.toArrayLike(Array, endian, length);
	  };

	  BN.prototype.toArrayLike = function toArrayLike (ArrayType, endian, length) {
	    var byteLength = this.byteLength();
	    var reqLength = length || Math.max(1, byteLength);
	    assert(byteLength <= reqLength, 'byte array longer than desired length');
	    assert(reqLength > 0, 'Requested array length <= 0');

	    this.strip();
	    var littleEndian = endian === 'le';
	    var res = new ArrayType(reqLength);

	    var b, i;
	    var q = this.clone();
	    if (!littleEndian) {
	      // Assume big-endian
	      for (i = 0; i < reqLength - byteLength; i++) {
	        res[i] = 0;
	      }

	      for (i = 0; !q.isZero(); i++) {
	        b = q.andln(0xff);
	        q.iushrn(8);

	        res[reqLength - i - 1] = b;
	      }
	    } else {
	      for (i = 0; !q.isZero(); i++) {
	        b = q.andln(0xff);
	        q.iushrn(8);

	        res[i] = b;
	      }

	      for (; i < reqLength; i++) {
	        res[i] = 0;
	      }
	    }

	    return res;
	  };

	  if (Math.clz32) {
	    BN.prototype._countBits = function _countBits (w) {
	      return 32 - Math.clz32(w);
	    };
	  } else {
	    BN.prototype._countBits = function _countBits (w) {
	      var t = w;
	      var r = 0;
	      if (t >= 0x1000) {
	        r += 13;
	        t >>>= 13;
	      }
	      if (t >= 0x40) {
	        r += 7;
	        t >>>= 7;
	      }
	      if (t >= 0x8) {
	        r += 4;
	        t >>>= 4;
	      }
	      if (t >= 0x02) {
	        r += 2;
	        t >>>= 2;
	      }
	      return r + t;
	    };
	  }

	  BN.prototype._zeroBits = function _zeroBits (w) {
	    // Short-cut
	    if (w === 0) { return 26; }

	    var t = w;
	    var r = 0;
	    if ((t & 0x1fff) === 0) {
	      r += 13;
	      t >>>= 13;
	    }
	    if ((t & 0x7f) === 0) {
	      r += 7;
	      t >>>= 7;
	    }
	    if ((t & 0xf) === 0) {
	      r += 4;
	      t >>>= 4;
	    }
	    if ((t & 0x3) === 0) {
	      r += 2;
	      t >>>= 2;
	    }
	    if ((t & 0x1) === 0) {
	      r++;
	    }
	    return r;
	  };

	  // Return number of used bits in a BN
	  BN.prototype.bitLength = function bitLength () {
	    var w = this.words[this.length - 1];
	    var hi = this._countBits(w);
	    return (this.length - 1) * 26 + hi;
	  };

	  function toBitArray (num) {
	    var w = new Array(num.bitLength());

	    for (var bit = 0; bit < w.length; bit++) {
	      var off = (bit / 26) | 0;
	      var wbit = bit % 26;

	      w[bit] = (num.words[off] & (1 << wbit)) >>> wbit;
	    }

	    return w;
	  }

	  // Number of trailing zero bits
	  BN.prototype.zeroBits = function zeroBits () {
	    var this$1 = this;

	    if (this.isZero()) { return 0; }

	    var r = 0;
	    for (var i = 0; i < this.length; i++) {
	      var b = this$1._zeroBits(this$1.words[i]);
	      r += b;
	      if (b !== 26) { break; }
	    }
	    return r;
	  };

	  BN.prototype.byteLength = function byteLength () {
	    return Math.ceil(this.bitLength() / 8);
	  };

	  BN.prototype.toTwos = function toTwos (width) {
	    if (this.negative !== 0) {
	      return this.abs().inotn(width).iaddn(1);
	    }
	    return this.clone();
	  };

	  BN.prototype.fromTwos = function fromTwos (width) {
	    if (this.testn(width - 1)) {
	      return this.notn(width).iaddn(1).ineg();
	    }
	    return this.clone();
	  };

	  BN.prototype.isNeg = function isNeg () {
	    return this.negative !== 0;
	  };

	  // Return negative clone of `this`
	  BN.prototype.neg = function neg () {
	    return this.clone().ineg();
	  };

	  BN.prototype.ineg = function ineg () {
	    if (!this.isZero()) {
	      this.negative ^= 1;
	    }

	    return this;
	  };

	  // Or `num` with `this` in-place
	  BN.prototype.iuor = function iuor (num) {
	    var this$1 = this;

	    while (this.length < num.length) {
	      this$1.words[this$1.length++] = 0;
	    }

	    for (var i = 0; i < num.length; i++) {
	      this$1.words[i] = this$1.words[i] | num.words[i];
	    }

	    return this.strip();
	  };

	  BN.prototype.ior = function ior (num) {
	    assert((this.negative | num.negative) === 0);
	    return this.iuor(num);
	  };

	  // Or `num` with `this`
	  BN.prototype.or = function or (num) {
	    if (this.length > num.length) { return this.clone().ior(num); }
	    return num.clone().ior(this);
	  };

	  BN.prototype.uor = function uor (num) {
	    if (this.length > num.length) { return this.clone().iuor(num); }
	    return num.clone().iuor(this);
	  };

	  // And `num` with `this` in-place
	  BN.prototype.iuand = function iuand (num) {
	    var this$1 = this;

	    // b = min-length(num, this)
	    var b;
	    if (this.length > num.length) {
	      b = num;
	    } else {
	      b = this;
	    }

	    for (var i = 0; i < b.length; i++) {
	      this$1.words[i] = this$1.words[i] & num.words[i];
	    }

	    this.length = b.length;

	    return this.strip();
	  };

	  BN.prototype.iand = function iand (num) {
	    assert((this.negative | num.negative) === 0);
	    return this.iuand(num);
	  };

	  // And `num` with `this`
	  BN.prototype.and = function and (num) {
	    if (this.length > num.length) { return this.clone().iand(num); }
	    return num.clone().iand(this);
	  };

	  BN.prototype.uand = function uand (num) {
	    if (this.length > num.length) { return this.clone().iuand(num); }
	    return num.clone().iuand(this);
	  };

	  // Xor `num` with `this` in-place
	  BN.prototype.iuxor = function iuxor (num) {
	    var this$1 = this;

	    // a.length > b.length
	    var a;
	    var b;
	    if (this.length > num.length) {
	      a = this;
	      b = num;
	    } else {
	      a = num;
	      b = this;
	    }

	    for (var i = 0; i < b.length; i++) {
	      this$1.words[i] = a.words[i] ^ b.words[i];
	    }

	    if (this !== a) {
	      for (; i < a.length; i++) {
	        this$1.words[i] = a.words[i];
	      }
	    }

	    this.length = a.length;

	    return this.strip();
	  };

	  BN.prototype.ixor = function ixor (num) {
	    assert((this.negative | num.negative) === 0);
	    return this.iuxor(num);
	  };

	  // Xor `num` with `this`
	  BN.prototype.xor = function xor (num) {
	    if (this.length > num.length) { return this.clone().ixor(num); }
	    return num.clone().ixor(this);
	  };

	  BN.prototype.uxor = function uxor (num) {
	    if (this.length > num.length) { return this.clone().iuxor(num); }
	    return num.clone().iuxor(this);
	  };

	  // Not ``this`` with ``width`` bitwidth
	  BN.prototype.inotn = function inotn (width) {
	    var this$1 = this;

	    assert(typeof width === 'number' && width >= 0);

	    var bytesNeeded = Math.ceil(width / 26) | 0;
	    var bitsLeft = width % 26;

	    // Extend the buffer with leading zeroes
	    this._expand(bytesNeeded);

	    if (bitsLeft > 0) {
	      bytesNeeded--;
	    }

	    // Handle complete words
	    for (var i = 0; i < bytesNeeded; i++) {
	      this$1.words[i] = ~this$1.words[i] & 0x3ffffff;
	    }

	    // Handle the residue
	    if (bitsLeft > 0) {
	      this.words[i] = ~this.words[i] & (0x3ffffff >> (26 - bitsLeft));
	    }

	    // And remove leading zeroes
	    return this.strip();
	  };

	  BN.prototype.notn = function notn (width) {
	    return this.clone().inotn(width);
	  };

	  // Set `bit` of `this`
	  BN.prototype.setn = function setn (bit, val) {
	    assert(typeof bit === 'number' && bit >= 0);

	    var off = (bit / 26) | 0;
	    var wbit = bit % 26;

	    this._expand(off + 1);

	    if (val) {
	      this.words[off] = this.words[off] | (1 << wbit);
	    } else {
	      this.words[off] = this.words[off] & ~(1 << wbit);
	    }

	    return this.strip();
	  };

	  // Add `num` to `this` in-place
	  BN.prototype.iadd = function iadd (num) {
	    var this$1 = this;

	    var r;

	    // negative + positive
	    if (this.negative !== 0 && num.negative === 0) {
	      this.negative = 0;
	      r = this.isub(num);
	      this.negative ^= 1;
	      return this._normSign();

	    // positive + negative
	    } else if (this.negative === 0 && num.negative !== 0) {
	      num.negative = 0;
	      r = this.isub(num);
	      num.negative = 1;
	      return r._normSign();
	    }

	    // a.length > b.length
	    var a, b;
	    if (this.length > num.length) {
	      a = this;
	      b = num;
	    } else {
	      a = num;
	      b = this;
	    }

	    var carry = 0;
	    for (var i = 0; i < b.length; i++) {
	      r = (a.words[i] | 0) + (b.words[i] | 0) + carry;
	      this$1.words[i] = r & 0x3ffffff;
	      carry = r >>> 26;
	    }
	    for (; carry !== 0 && i < a.length; i++) {
	      r = (a.words[i] | 0) + carry;
	      this$1.words[i] = r & 0x3ffffff;
	      carry = r >>> 26;
	    }

	    this.length = a.length;
	    if (carry !== 0) {
	      this.words[this.length] = carry;
	      this.length++;
	    // Copy the rest of the words
	    } else if (a !== this) {
	      for (; i < a.length; i++) {
	        this$1.words[i] = a.words[i];
	      }
	    }

	    return this;
	  };

	  // Add `num` to `this`
	  BN.prototype.add = function add (num) {
	    var res;
	    if (num.negative !== 0 && this.negative === 0) {
	      num.negative = 0;
	      res = this.sub(num);
	      num.negative ^= 1;
	      return res;
	    } else if (num.negative === 0 && this.negative !== 0) {
	      this.negative = 0;
	      res = num.sub(this);
	      this.negative = 1;
	      return res;
	    }

	    if (this.length > num.length) { return this.clone().iadd(num); }

	    return num.clone().iadd(this);
	  };

	  // Subtract `num` from `this` in-place
	  BN.prototype.isub = function isub (num) {
	    var this$1 = this;

	    // this - (-num) = this + num
	    if (num.negative !== 0) {
	      num.negative = 0;
	      var r = this.iadd(num);
	      num.negative = 1;
	      return r._normSign();

	    // -this - num = -(this + num)
	    } else if (this.negative !== 0) {
	      this.negative = 0;
	      this.iadd(num);
	      this.negative = 1;
	      return this._normSign();
	    }

	    // At this point both numbers are positive
	    var cmp = this.cmp(num);

	    // Optimization - zeroify
	    if (cmp === 0) {
	      this.negative = 0;
	      this.length = 1;
	      this.words[0] = 0;
	      return this;
	    }

	    // a > b
	    var a, b;
	    if (cmp > 0) {
	      a = this;
	      b = num;
	    } else {
	      a = num;
	      b = this;
	    }

	    var carry = 0;
	    for (var i = 0; i < b.length; i++) {
	      r = (a.words[i] | 0) - (b.words[i] | 0) + carry;
	      carry = r >> 26;
	      this$1.words[i] = r & 0x3ffffff;
	    }
	    for (; carry !== 0 && i < a.length; i++) {
	      r = (a.words[i] | 0) + carry;
	      carry = r >> 26;
	      this$1.words[i] = r & 0x3ffffff;
	    }

	    // Copy rest of the words
	    if (carry === 0 && i < a.length && a !== this) {
	      for (; i < a.length; i++) {
	        this$1.words[i] = a.words[i];
	      }
	    }

	    this.length = Math.max(this.length, i);

	    if (a !== this) {
	      this.negative = 1;
	    }

	    return this.strip();
	  };

	  // Subtract `num` from `this`
	  BN.prototype.sub = function sub (num) {
	    return this.clone().isub(num);
	  };

	  function smallMulTo (self, num, out) {
	    out.negative = num.negative ^ self.negative;
	    var len = (self.length + num.length) | 0;
	    out.length = len;
	    len = (len - 1) | 0;

	    // Peel one iteration (compiler can't do it, because of code complexity)
	    var a = self.words[0] | 0;
	    var b = num.words[0] | 0;
	    var r = a * b;

	    var lo = r & 0x3ffffff;
	    var carry = (r / 0x4000000) | 0;
	    out.words[0] = lo;

	    for (var k = 1; k < len; k++) {
	      // Sum all words with the same `i + j = k` and accumulate `ncarry`,
	      // note that ncarry could be >= 0x3ffffff
	      var ncarry = carry >>> 26;
	      var rword = carry & 0x3ffffff;
	      var maxJ = Math.min(k, num.length - 1);
	      for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
	        var i = (k - j) | 0;
	        a = self.words[i] | 0;
	        b = num.words[j] | 0;
	        r = a * b + rword;
	        ncarry += (r / 0x4000000) | 0;
	        rword = r & 0x3ffffff;
	      }
	      out.words[k] = rword | 0;
	      carry = ncarry | 0;
	    }
	    if (carry !== 0) {
	      out.words[k] = carry | 0;
	    } else {
	      out.length--;
	    }

	    return out.strip();
	  }

	  // TODO(indutny): it may be reasonable to omit it for users who don't need
	  // to work with 256-bit numbers, otherwise it gives 20% improvement for 256-bit
	  // multiplication (like elliptic secp256k1).
	  var comb10MulTo = function comb10MulTo (self, num, out) {
	    var a = self.words;
	    var b = num.words;
	    var o = out.words;
	    var c = 0;
	    var lo;
	    var mid;
	    var hi;
	    var a0 = a[0] | 0;
	    var al0 = a0 & 0x1fff;
	    var ah0 = a0 >>> 13;
	    var a1 = a[1] | 0;
	    var al1 = a1 & 0x1fff;
	    var ah1 = a1 >>> 13;
	    var a2 = a[2] | 0;
	    var al2 = a2 & 0x1fff;
	    var ah2 = a2 >>> 13;
	    var a3 = a[3] | 0;
	    var al3 = a3 & 0x1fff;
	    var ah3 = a3 >>> 13;
	    var a4 = a[4] | 0;
	    var al4 = a4 & 0x1fff;
	    var ah4 = a4 >>> 13;
	    var a5 = a[5] | 0;
	    var al5 = a5 & 0x1fff;
	    var ah5 = a5 >>> 13;
	    var a6 = a[6] | 0;
	    var al6 = a6 & 0x1fff;
	    var ah6 = a6 >>> 13;
	    var a7 = a[7] | 0;
	    var al7 = a7 & 0x1fff;
	    var ah7 = a7 >>> 13;
	    var a8 = a[8] | 0;
	    var al8 = a8 & 0x1fff;
	    var ah8 = a8 >>> 13;
	    var a9 = a[9] | 0;
	    var al9 = a9 & 0x1fff;
	    var ah9 = a9 >>> 13;
	    var b0 = b[0] | 0;
	    var bl0 = b0 & 0x1fff;
	    var bh0 = b0 >>> 13;
	    var b1 = b[1] | 0;
	    var bl1 = b1 & 0x1fff;
	    var bh1 = b1 >>> 13;
	    var b2 = b[2] | 0;
	    var bl2 = b2 & 0x1fff;
	    var bh2 = b2 >>> 13;
	    var b3 = b[3] | 0;
	    var bl3 = b3 & 0x1fff;
	    var bh3 = b3 >>> 13;
	    var b4 = b[4] | 0;
	    var bl4 = b4 & 0x1fff;
	    var bh4 = b4 >>> 13;
	    var b5 = b[5] | 0;
	    var bl5 = b5 & 0x1fff;
	    var bh5 = b5 >>> 13;
	    var b6 = b[6] | 0;
	    var bl6 = b6 & 0x1fff;
	    var bh6 = b6 >>> 13;
	    var b7 = b[7] | 0;
	    var bl7 = b7 & 0x1fff;
	    var bh7 = b7 >>> 13;
	    var b8 = b[8] | 0;
	    var bl8 = b8 & 0x1fff;
	    var bh8 = b8 >>> 13;
	    var b9 = b[9] | 0;
	    var bl9 = b9 & 0x1fff;
	    var bh9 = b9 >>> 13;

	    out.negative = self.negative ^ num.negative;
	    out.length = 19;
	    /* k = 0 */
	    lo = Math.imul(al0, bl0);
	    mid = Math.imul(al0, bh0);
	    mid = (mid + Math.imul(ah0, bl0)) | 0;
	    hi = Math.imul(ah0, bh0);
	    var w0 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w0 >>> 26)) | 0;
	    w0 &= 0x3ffffff;
	    /* k = 1 */
	    lo = Math.imul(al1, bl0);
	    mid = Math.imul(al1, bh0);
	    mid = (mid + Math.imul(ah1, bl0)) | 0;
	    hi = Math.imul(ah1, bh0);
	    lo = (lo + Math.imul(al0, bl1)) | 0;
	    mid = (mid + Math.imul(al0, bh1)) | 0;
	    mid = (mid + Math.imul(ah0, bl1)) | 0;
	    hi = (hi + Math.imul(ah0, bh1)) | 0;
	    var w1 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w1 >>> 26)) | 0;
	    w1 &= 0x3ffffff;
	    /* k = 2 */
	    lo = Math.imul(al2, bl0);
	    mid = Math.imul(al2, bh0);
	    mid = (mid + Math.imul(ah2, bl0)) | 0;
	    hi = Math.imul(ah2, bh0);
	    lo = (lo + Math.imul(al1, bl1)) | 0;
	    mid = (mid + Math.imul(al1, bh1)) | 0;
	    mid = (mid + Math.imul(ah1, bl1)) | 0;
	    hi = (hi + Math.imul(ah1, bh1)) | 0;
	    lo = (lo + Math.imul(al0, bl2)) | 0;
	    mid = (mid + Math.imul(al0, bh2)) | 0;
	    mid = (mid + Math.imul(ah0, bl2)) | 0;
	    hi = (hi + Math.imul(ah0, bh2)) | 0;
	    var w2 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w2 >>> 26)) | 0;
	    w2 &= 0x3ffffff;
	    /* k = 3 */
	    lo = Math.imul(al3, bl0);
	    mid = Math.imul(al3, bh0);
	    mid = (mid + Math.imul(ah3, bl0)) | 0;
	    hi = Math.imul(ah3, bh0);
	    lo = (lo + Math.imul(al2, bl1)) | 0;
	    mid = (mid + Math.imul(al2, bh1)) | 0;
	    mid = (mid + Math.imul(ah2, bl1)) | 0;
	    hi = (hi + Math.imul(ah2, bh1)) | 0;
	    lo = (lo + Math.imul(al1, bl2)) | 0;
	    mid = (mid + Math.imul(al1, bh2)) | 0;
	    mid = (mid + Math.imul(ah1, bl2)) | 0;
	    hi = (hi + Math.imul(ah1, bh2)) | 0;
	    lo = (lo + Math.imul(al0, bl3)) | 0;
	    mid = (mid + Math.imul(al0, bh3)) | 0;
	    mid = (mid + Math.imul(ah0, bl3)) | 0;
	    hi = (hi + Math.imul(ah0, bh3)) | 0;
	    var w3 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w3 >>> 26)) | 0;
	    w3 &= 0x3ffffff;
	    /* k = 4 */
	    lo = Math.imul(al4, bl0);
	    mid = Math.imul(al4, bh0);
	    mid = (mid + Math.imul(ah4, bl0)) | 0;
	    hi = Math.imul(ah4, bh0);
	    lo = (lo + Math.imul(al3, bl1)) | 0;
	    mid = (mid + Math.imul(al3, bh1)) | 0;
	    mid = (mid + Math.imul(ah3, bl1)) | 0;
	    hi = (hi + Math.imul(ah3, bh1)) | 0;
	    lo = (lo + Math.imul(al2, bl2)) | 0;
	    mid = (mid + Math.imul(al2, bh2)) | 0;
	    mid = (mid + Math.imul(ah2, bl2)) | 0;
	    hi = (hi + Math.imul(ah2, bh2)) | 0;
	    lo = (lo + Math.imul(al1, bl3)) | 0;
	    mid = (mid + Math.imul(al1, bh3)) | 0;
	    mid = (mid + Math.imul(ah1, bl3)) | 0;
	    hi = (hi + Math.imul(ah1, bh3)) | 0;
	    lo = (lo + Math.imul(al0, bl4)) | 0;
	    mid = (mid + Math.imul(al0, bh4)) | 0;
	    mid = (mid + Math.imul(ah0, bl4)) | 0;
	    hi = (hi + Math.imul(ah0, bh4)) | 0;
	    var w4 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w4 >>> 26)) | 0;
	    w4 &= 0x3ffffff;
	    /* k = 5 */
	    lo = Math.imul(al5, bl0);
	    mid = Math.imul(al5, bh0);
	    mid = (mid + Math.imul(ah5, bl0)) | 0;
	    hi = Math.imul(ah5, bh0);
	    lo = (lo + Math.imul(al4, bl1)) | 0;
	    mid = (mid + Math.imul(al4, bh1)) | 0;
	    mid = (mid + Math.imul(ah4, bl1)) | 0;
	    hi = (hi + Math.imul(ah4, bh1)) | 0;
	    lo = (lo + Math.imul(al3, bl2)) | 0;
	    mid = (mid + Math.imul(al3, bh2)) | 0;
	    mid = (mid + Math.imul(ah3, bl2)) | 0;
	    hi = (hi + Math.imul(ah3, bh2)) | 0;
	    lo = (lo + Math.imul(al2, bl3)) | 0;
	    mid = (mid + Math.imul(al2, bh3)) | 0;
	    mid = (mid + Math.imul(ah2, bl3)) | 0;
	    hi = (hi + Math.imul(ah2, bh3)) | 0;
	    lo = (lo + Math.imul(al1, bl4)) | 0;
	    mid = (mid + Math.imul(al1, bh4)) | 0;
	    mid = (mid + Math.imul(ah1, bl4)) | 0;
	    hi = (hi + Math.imul(ah1, bh4)) | 0;
	    lo = (lo + Math.imul(al0, bl5)) | 0;
	    mid = (mid + Math.imul(al0, bh5)) | 0;
	    mid = (mid + Math.imul(ah0, bl5)) | 0;
	    hi = (hi + Math.imul(ah0, bh5)) | 0;
	    var w5 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w5 >>> 26)) | 0;
	    w5 &= 0x3ffffff;
	    /* k = 6 */
	    lo = Math.imul(al6, bl0);
	    mid = Math.imul(al6, bh0);
	    mid = (mid + Math.imul(ah6, bl0)) | 0;
	    hi = Math.imul(ah6, bh0);
	    lo = (lo + Math.imul(al5, bl1)) | 0;
	    mid = (mid + Math.imul(al5, bh1)) | 0;
	    mid = (mid + Math.imul(ah5, bl1)) | 0;
	    hi = (hi + Math.imul(ah5, bh1)) | 0;
	    lo = (lo + Math.imul(al4, bl2)) | 0;
	    mid = (mid + Math.imul(al4, bh2)) | 0;
	    mid = (mid + Math.imul(ah4, bl2)) | 0;
	    hi = (hi + Math.imul(ah4, bh2)) | 0;
	    lo = (lo + Math.imul(al3, bl3)) | 0;
	    mid = (mid + Math.imul(al3, bh3)) | 0;
	    mid = (mid + Math.imul(ah3, bl3)) | 0;
	    hi = (hi + Math.imul(ah3, bh3)) | 0;
	    lo = (lo + Math.imul(al2, bl4)) | 0;
	    mid = (mid + Math.imul(al2, bh4)) | 0;
	    mid = (mid + Math.imul(ah2, bl4)) | 0;
	    hi = (hi + Math.imul(ah2, bh4)) | 0;
	    lo = (lo + Math.imul(al1, bl5)) | 0;
	    mid = (mid + Math.imul(al1, bh5)) | 0;
	    mid = (mid + Math.imul(ah1, bl5)) | 0;
	    hi = (hi + Math.imul(ah1, bh5)) | 0;
	    lo = (lo + Math.imul(al0, bl6)) | 0;
	    mid = (mid + Math.imul(al0, bh6)) | 0;
	    mid = (mid + Math.imul(ah0, bl6)) | 0;
	    hi = (hi + Math.imul(ah0, bh6)) | 0;
	    var w6 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w6 >>> 26)) | 0;
	    w6 &= 0x3ffffff;
	    /* k = 7 */
	    lo = Math.imul(al7, bl0);
	    mid = Math.imul(al7, bh0);
	    mid = (mid + Math.imul(ah7, bl0)) | 0;
	    hi = Math.imul(ah7, bh0);
	    lo = (lo + Math.imul(al6, bl1)) | 0;
	    mid = (mid + Math.imul(al6, bh1)) | 0;
	    mid = (mid + Math.imul(ah6, bl1)) | 0;
	    hi = (hi + Math.imul(ah6, bh1)) | 0;
	    lo = (lo + Math.imul(al5, bl2)) | 0;
	    mid = (mid + Math.imul(al5, bh2)) | 0;
	    mid = (mid + Math.imul(ah5, bl2)) | 0;
	    hi = (hi + Math.imul(ah5, bh2)) | 0;
	    lo = (lo + Math.imul(al4, bl3)) | 0;
	    mid = (mid + Math.imul(al4, bh3)) | 0;
	    mid = (mid + Math.imul(ah4, bl3)) | 0;
	    hi = (hi + Math.imul(ah4, bh3)) | 0;
	    lo = (lo + Math.imul(al3, bl4)) | 0;
	    mid = (mid + Math.imul(al3, bh4)) | 0;
	    mid = (mid + Math.imul(ah3, bl4)) | 0;
	    hi = (hi + Math.imul(ah3, bh4)) | 0;
	    lo = (lo + Math.imul(al2, bl5)) | 0;
	    mid = (mid + Math.imul(al2, bh5)) | 0;
	    mid = (mid + Math.imul(ah2, bl5)) | 0;
	    hi = (hi + Math.imul(ah2, bh5)) | 0;
	    lo = (lo + Math.imul(al1, bl6)) | 0;
	    mid = (mid + Math.imul(al1, bh6)) | 0;
	    mid = (mid + Math.imul(ah1, bl6)) | 0;
	    hi = (hi + Math.imul(ah1, bh6)) | 0;
	    lo = (lo + Math.imul(al0, bl7)) | 0;
	    mid = (mid + Math.imul(al0, bh7)) | 0;
	    mid = (mid + Math.imul(ah0, bl7)) | 0;
	    hi = (hi + Math.imul(ah0, bh7)) | 0;
	    var w7 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w7 >>> 26)) | 0;
	    w7 &= 0x3ffffff;
	    /* k = 8 */
	    lo = Math.imul(al8, bl0);
	    mid = Math.imul(al8, bh0);
	    mid = (mid + Math.imul(ah8, bl0)) | 0;
	    hi = Math.imul(ah8, bh0);
	    lo = (lo + Math.imul(al7, bl1)) | 0;
	    mid = (mid + Math.imul(al7, bh1)) | 0;
	    mid = (mid + Math.imul(ah7, bl1)) | 0;
	    hi = (hi + Math.imul(ah7, bh1)) | 0;
	    lo = (lo + Math.imul(al6, bl2)) | 0;
	    mid = (mid + Math.imul(al6, bh2)) | 0;
	    mid = (mid + Math.imul(ah6, bl2)) | 0;
	    hi = (hi + Math.imul(ah6, bh2)) | 0;
	    lo = (lo + Math.imul(al5, bl3)) | 0;
	    mid = (mid + Math.imul(al5, bh3)) | 0;
	    mid = (mid + Math.imul(ah5, bl3)) | 0;
	    hi = (hi + Math.imul(ah5, bh3)) | 0;
	    lo = (lo + Math.imul(al4, bl4)) | 0;
	    mid = (mid + Math.imul(al4, bh4)) | 0;
	    mid = (mid + Math.imul(ah4, bl4)) | 0;
	    hi = (hi + Math.imul(ah4, bh4)) | 0;
	    lo = (lo + Math.imul(al3, bl5)) | 0;
	    mid = (mid + Math.imul(al3, bh5)) | 0;
	    mid = (mid + Math.imul(ah3, bl5)) | 0;
	    hi = (hi + Math.imul(ah3, bh5)) | 0;
	    lo = (lo + Math.imul(al2, bl6)) | 0;
	    mid = (mid + Math.imul(al2, bh6)) | 0;
	    mid = (mid + Math.imul(ah2, bl6)) | 0;
	    hi = (hi + Math.imul(ah2, bh6)) | 0;
	    lo = (lo + Math.imul(al1, bl7)) | 0;
	    mid = (mid + Math.imul(al1, bh7)) | 0;
	    mid = (mid + Math.imul(ah1, bl7)) | 0;
	    hi = (hi + Math.imul(ah1, bh7)) | 0;
	    lo = (lo + Math.imul(al0, bl8)) | 0;
	    mid = (mid + Math.imul(al0, bh8)) | 0;
	    mid = (mid + Math.imul(ah0, bl8)) | 0;
	    hi = (hi + Math.imul(ah0, bh8)) | 0;
	    var w8 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w8 >>> 26)) | 0;
	    w8 &= 0x3ffffff;
	    /* k = 9 */
	    lo = Math.imul(al9, bl0);
	    mid = Math.imul(al9, bh0);
	    mid = (mid + Math.imul(ah9, bl0)) | 0;
	    hi = Math.imul(ah9, bh0);
	    lo = (lo + Math.imul(al8, bl1)) | 0;
	    mid = (mid + Math.imul(al8, bh1)) | 0;
	    mid = (mid + Math.imul(ah8, bl1)) | 0;
	    hi = (hi + Math.imul(ah8, bh1)) | 0;
	    lo = (lo + Math.imul(al7, bl2)) | 0;
	    mid = (mid + Math.imul(al7, bh2)) | 0;
	    mid = (mid + Math.imul(ah7, bl2)) | 0;
	    hi = (hi + Math.imul(ah7, bh2)) | 0;
	    lo = (lo + Math.imul(al6, bl3)) | 0;
	    mid = (mid + Math.imul(al6, bh3)) | 0;
	    mid = (mid + Math.imul(ah6, bl3)) | 0;
	    hi = (hi + Math.imul(ah6, bh3)) | 0;
	    lo = (lo + Math.imul(al5, bl4)) | 0;
	    mid = (mid + Math.imul(al5, bh4)) | 0;
	    mid = (mid + Math.imul(ah5, bl4)) | 0;
	    hi = (hi + Math.imul(ah5, bh4)) | 0;
	    lo = (lo + Math.imul(al4, bl5)) | 0;
	    mid = (mid + Math.imul(al4, bh5)) | 0;
	    mid = (mid + Math.imul(ah4, bl5)) | 0;
	    hi = (hi + Math.imul(ah4, bh5)) | 0;
	    lo = (lo + Math.imul(al3, bl6)) | 0;
	    mid = (mid + Math.imul(al3, bh6)) | 0;
	    mid = (mid + Math.imul(ah3, bl6)) | 0;
	    hi = (hi + Math.imul(ah3, bh6)) | 0;
	    lo = (lo + Math.imul(al2, bl7)) | 0;
	    mid = (mid + Math.imul(al2, bh7)) | 0;
	    mid = (mid + Math.imul(ah2, bl7)) | 0;
	    hi = (hi + Math.imul(ah2, bh7)) | 0;
	    lo = (lo + Math.imul(al1, bl8)) | 0;
	    mid = (mid + Math.imul(al1, bh8)) | 0;
	    mid = (mid + Math.imul(ah1, bl8)) | 0;
	    hi = (hi + Math.imul(ah1, bh8)) | 0;
	    lo = (lo + Math.imul(al0, bl9)) | 0;
	    mid = (mid + Math.imul(al0, bh9)) | 0;
	    mid = (mid + Math.imul(ah0, bl9)) | 0;
	    hi = (hi + Math.imul(ah0, bh9)) | 0;
	    var w9 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w9 >>> 26)) | 0;
	    w9 &= 0x3ffffff;
	    /* k = 10 */
	    lo = Math.imul(al9, bl1);
	    mid = Math.imul(al9, bh1);
	    mid = (mid + Math.imul(ah9, bl1)) | 0;
	    hi = Math.imul(ah9, bh1);
	    lo = (lo + Math.imul(al8, bl2)) | 0;
	    mid = (mid + Math.imul(al8, bh2)) | 0;
	    mid = (mid + Math.imul(ah8, bl2)) | 0;
	    hi = (hi + Math.imul(ah8, bh2)) | 0;
	    lo = (lo + Math.imul(al7, bl3)) | 0;
	    mid = (mid + Math.imul(al7, bh3)) | 0;
	    mid = (mid + Math.imul(ah7, bl3)) | 0;
	    hi = (hi + Math.imul(ah7, bh3)) | 0;
	    lo = (lo + Math.imul(al6, bl4)) | 0;
	    mid = (mid + Math.imul(al6, bh4)) | 0;
	    mid = (mid + Math.imul(ah6, bl4)) | 0;
	    hi = (hi + Math.imul(ah6, bh4)) | 0;
	    lo = (lo + Math.imul(al5, bl5)) | 0;
	    mid = (mid + Math.imul(al5, bh5)) | 0;
	    mid = (mid + Math.imul(ah5, bl5)) | 0;
	    hi = (hi + Math.imul(ah5, bh5)) | 0;
	    lo = (lo + Math.imul(al4, bl6)) | 0;
	    mid = (mid + Math.imul(al4, bh6)) | 0;
	    mid = (mid + Math.imul(ah4, bl6)) | 0;
	    hi = (hi + Math.imul(ah4, bh6)) | 0;
	    lo = (lo + Math.imul(al3, bl7)) | 0;
	    mid = (mid + Math.imul(al3, bh7)) | 0;
	    mid = (mid + Math.imul(ah3, bl7)) | 0;
	    hi = (hi + Math.imul(ah3, bh7)) | 0;
	    lo = (lo + Math.imul(al2, bl8)) | 0;
	    mid = (mid + Math.imul(al2, bh8)) | 0;
	    mid = (mid + Math.imul(ah2, bl8)) | 0;
	    hi = (hi + Math.imul(ah2, bh8)) | 0;
	    lo = (lo + Math.imul(al1, bl9)) | 0;
	    mid = (mid + Math.imul(al1, bh9)) | 0;
	    mid = (mid + Math.imul(ah1, bl9)) | 0;
	    hi = (hi + Math.imul(ah1, bh9)) | 0;
	    var w10 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w10 >>> 26)) | 0;
	    w10 &= 0x3ffffff;
	    /* k = 11 */
	    lo = Math.imul(al9, bl2);
	    mid = Math.imul(al9, bh2);
	    mid = (mid + Math.imul(ah9, bl2)) | 0;
	    hi = Math.imul(ah9, bh2);
	    lo = (lo + Math.imul(al8, bl3)) | 0;
	    mid = (mid + Math.imul(al8, bh3)) | 0;
	    mid = (mid + Math.imul(ah8, bl3)) | 0;
	    hi = (hi + Math.imul(ah8, bh3)) | 0;
	    lo = (lo + Math.imul(al7, bl4)) | 0;
	    mid = (mid + Math.imul(al7, bh4)) | 0;
	    mid = (mid + Math.imul(ah7, bl4)) | 0;
	    hi = (hi + Math.imul(ah7, bh4)) | 0;
	    lo = (lo + Math.imul(al6, bl5)) | 0;
	    mid = (mid + Math.imul(al6, bh5)) | 0;
	    mid = (mid + Math.imul(ah6, bl5)) | 0;
	    hi = (hi + Math.imul(ah6, bh5)) | 0;
	    lo = (lo + Math.imul(al5, bl6)) | 0;
	    mid = (mid + Math.imul(al5, bh6)) | 0;
	    mid = (mid + Math.imul(ah5, bl6)) | 0;
	    hi = (hi + Math.imul(ah5, bh6)) | 0;
	    lo = (lo + Math.imul(al4, bl7)) | 0;
	    mid = (mid + Math.imul(al4, bh7)) | 0;
	    mid = (mid + Math.imul(ah4, bl7)) | 0;
	    hi = (hi + Math.imul(ah4, bh7)) | 0;
	    lo = (lo + Math.imul(al3, bl8)) | 0;
	    mid = (mid + Math.imul(al3, bh8)) | 0;
	    mid = (mid + Math.imul(ah3, bl8)) | 0;
	    hi = (hi + Math.imul(ah3, bh8)) | 0;
	    lo = (lo + Math.imul(al2, bl9)) | 0;
	    mid = (mid + Math.imul(al2, bh9)) | 0;
	    mid = (mid + Math.imul(ah2, bl9)) | 0;
	    hi = (hi + Math.imul(ah2, bh9)) | 0;
	    var w11 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w11 >>> 26)) | 0;
	    w11 &= 0x3ffffff;
	    /* k = 12 */
	    lo = Math.imul(al9, bl3);
	    mid = Math.imul(al9, bh3);
	    mid = (mid + Math.imul(ah9, bl3)) | 0;
	    hi = Math.imul(ah9, bh3);
	    lo = (lo + Math.imul(al8, bl4)) | 0;
	    mid = (mid + Math.imul(al8, bh4)) | 0;
	    mid = (mid + Math.imul(ah8, bl4)) | 0;
	    hi = (hi + Math.imul(ah8, bh4)) | 0;
	    lo = (lo + Math.imul(al7, bl5)) | 0;
	    mid = (mid + Math.imul(al7, bh5)) | 0;
	    mid = (mid + Math.imul(ah7, bl5)) | 0;
	    hi = (hi + Math.imul(ah7, bh5)) | 0;
	    lo = (lo + Math.imul(al6, bl6)) | 0;
	    mid = (mid + Math.imul(al6, bh6)) | 0;
	    mid = (mid + Math.imul(ah6, bl6)) | 0;
	    hi = (hi + Math.imul(ah6, bh6)) | 0;
	    lo = (lo + Math.imul(al5, bl7)) | 0;
	    mid = (mid + Math.imul(al5, bh7)) | 0;
	    mid = (mid + Math.imul(ah5, bl7)) | 0;
	    hi = (hi + Math.imul(ah5, bh7)) | 0;
	    lo = (lo + Math.imul(al4, bl8)) | 0;
	    mid = (mid + Math.imul(al4, bh8)) | 0;
	    mid = (mid + Math.imul(ah4, bl8)) | 0;
	    hi = (hi + Math.imul(ah4, bh8)) | 0;
	    lo = (lo + Math.imul(al3, bl9)) | 0;
	    mid = (mid + Math.imul(al3, bh9)) | 0;
	    mid = (mid + Math.imul(ah3, bl9)) | 0;
	    hi = (hi + Math.imul(ah3, bh9)) | 0;
	    var w12 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w12 >>> 26)) | 0;
	    w12 &= 0x3ffffff;
	    /* k = 13 */
	    lo = Math.imul(al9, bl4);
	    mid = Math.imul(al9, bh4);
	    mid = (mid + Math.imul(ah9, bl4)) | 0;
	    hi = Math.imul(ah9, bh4);
	    lo = (lo + Math.imul(al8, bl5)) | 0;
	    mid = (mid + Math.imul(al8, bh5)) | 0;
	    mid = (mid + Math.imul(ah8, bl5)) | 0;
	    hi = (hi + Math.imul(ah8, bh5)) | 0;
	    lo = (lo + Math.imul(al7, bl6)) | 0;
	    mid = (mid + Math.imul(al7, bh6)) | 0;
	    mid = (mid + Math.imul(ah7, bl6)) | 0;
	    hi = (hi + Math.imul(ah7, bh6)) | 0;
	    lo = (lo + Math.imul(al6, bl7)) | 0;
	    mid = (mid + Math.imul(al6, bh7)) | 0;
	    mid = (mid + Math.imul(ah6, bl7)) | 0;
	    hi = (hi + Math.imul(ah6, bh7)) | 0;
	    lo = (lo + Math.imul(al5, bl8)) | 0;
	    mid = (mid + Math.imul(al5, bh8)) | 0;
	    mid = (mid + Math.imul(ah5, bl8)) | 0;
	    hi = (hi + Math.imul(ah5, bh8)) | 0;
	    lo = (lo + Math.imul(al4, bl9)) | 0;
	    mid = (mid + Math.imul(al4, bh9)) | 0;
	    mid = (mid + Math.imul(ah4, bl9)) | 0;
	    hi = (hi + Math.imul(ah4, bh9)) | 0;
	    var w13 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w13 >>> 26)) | 0;
	    w13 &= 0x3ffffff;
	    /* k = 14 */
	    lo = Math.imul(al9, bl5);
	    mid = Math.imul(al9, bh5);
	    mid = (mid + Math.imul(ah9, bl5)) | 0;
	    hi = Math.imul(ah9, bh5);
	    lo = (lo + Math.imul(al8, bl6)) | 0;
	    mid = (mid + Math.imul(al8, bh6)) | 0;
	    mid = (mid + Math.imul(ah8, bl6)) | 0;
	    hi = (hi + Math.imul(ah8, bh6)) | 0;
	    lo = (lo + Math.imul(al7, bl7)) | 0;
	    mid = (mid + Math.imul(al7, bh7)) | 0;
	    mid = (mid + Math.imul(ah7, bl7)) | 0;
	    hi = (hi + Math.imul(ah7, bh7)) | 0;
	    lo = (lo + Math.imul(al6, bl8)) | 0;
	    mid = (mid + Math.imul(al6, bh8)) | 0;
	    mid = (mid + Math.imul(ah6, bl8)) | 0;
	    hi = (hi + Math.imul(ah6, bh8)) | 0;
	    lo = (lo + Math.imul(al5, bl9)) | 0;
	    mid = (mid + Math.imul(al5, bh9)) | 0;
	    mid = (mid + Math.imul(ah5, bl9)) | 0;
	    hi = (hi + Math.imul(ah5, bh9)) | 0;
	    var w14 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w14 >>> 26)) | 0;
	    w14 &= 0x3ffffff;
	    /* k = 15 */
	    lo = Math.imul(al9, bl6);
	    mid = Math.imul(al9, bh6);
	    mid = (mid + Math.imul(ah9, bl6)) | 0;
	    hi = Math.imul(ah9, bh6);
	    lo = (lo + Math.imul(al8, bl7)) | 0;
	    mid = (mid + Math.imul(al8, bh7)) | 0;
	    mid = (mid + Math.imul(ah8, bl7)) | 0;
	    hi = (hi + Math.imul(ah8, bh7)) | 0;
	    lo = (lo + Math.imul(al7, bl8)) | 0;
	    mid = (mid + Math.imul(al7, bh8)) | 0;
	    mid = (mid + Math.imul(ah7, bl8)) | 0;
	    hi = (hi + Math.imul(ah7, bh8)) | 0;
	    lo = (lo + Math.imul(al6, bl9)) | 0;
	    mid = (mid + Math.imul(al6, bh9)) | 0;
	    mid = (mid + Math.imul(ah6, bl9)) | 0;
	    hi = (hi + Math.imul(ah6, bh9)) | 0;
	    var w15 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w15 >>> 26)) | 0;
	    w15 &= 0x3ffffff;
	    /* k = 16 */
	    lo = Math.imul(al9, bl7);
	    mid = Math.imul(al9, bh7);
	    mid = (mid + Math.imul(ah9, bl7)) | 0;
	    hi = Math.imul(ah9, bh7);
	    lo = (lo + Math.imul(al8, bl8)) | 0;
	    mid = (mid + Math.imul(al8, bh8)) | 0;
	    mid = (mid + Math.imul(ah8, bl8)) | 0;
	    hi = (hi + Math.imul(ah8, bh8)) | 0;
	    lo = (lo + Math.imul(al7, bl9)) | 0;
	    mid = (mid + Math.imul(al7, bh9)) | 0;
	    mid = (mid + Math.imul(ah7, bl9)) | 0;
	    hi = (hi + Math.imul(ah7, bh9)) | 0;
	    var w16 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w16 >>> 26)) | 0;
	    w16 &= 0x3ffffff;
	    /* k = 17 */
	    lo = Math.imul(al9, bl8);
	    mid = Math.imul(al9, bh8);
	    mid = (mid + Math.imul(ah9, bl8)) | 0;
	    hi = Math.imul(ah9, bh8);
	    lo = (lo + Math.imul(al8, bl9)) | 0;
	    mid = (mid + Math.imul(al8, bh9)) | 0;
	    mid = (mid + Math.imul(ah8, bl9)) | 0;
	    hi = (hi + Math.imul(ah8, bh9)) | 0;
	    var w17 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w17 >>> 26)) | 0;
	    w17 &= 0x3ffffff;
	    /* k = 18 */
	    lo = Math.imul(al9, bl9);
	    mid = Math.imul(al9, bh9);
	    mid = (mid + Math.imul(ah9, bl9)) | 0;
	    hi = Math.imul(ah9, bh9);
	    var w18 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w18 >>> 26)) | 0;
	    w18 &= 0x3ffffff;
	    o[0] = w0;
	    o[1] = w1;
	    o[2] = w2;
	    o[3] = w3;
	    o[4] = w4;
	    o[5] = w5;
	    o[6] = w6;
	    o[7] = w7;
	    o[8] = w8;
	    o[9] = w9;
	    o[10] = w10;
	    o[11] = w11;
	    o[12] = w12;
	    o[13] = w13;
	    o[14] = w14;
	    o[15] = w15;
	    o[16] = w16;
	    o[17] = w17;
	    o[18] = w18;
	    if (c !== 0) {
	      o[19] = c;
	      out.length++;
	    }
	    return out;
	  };

	  // Polyfill comb
	  if (!Math.imul) {
	    comb10MulTo = smallMulTo;
	  }

	  function bigMulTo (self, num, out) {
	    out.negative = num.negative ^ self.negative;
	    out.length = self.length + num.length;

	    var carry = 0;
	    var hncarry = 0;
	    for (var k = 0; k < out.length - 1; k++) {
	      // Sum all words with the same `i + j = k` and accumulate `ncarry`,
	      // note that ncarry could be >= 0x3ffffff
	      var ncarry = hncarry;
	      hncarry = 0;
	      var rword = carry & 0x3ffffff;
	      var maxJ = Math.min(k, num.length - 1);
	      for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
	        var i = k - j;
	        var a = self.words[i] | 0;
	        var b = num.words[j] | 0;
	        var r = a * b;

	        var lo = r & 0x3ffffff;
	        ncarry = (ncarry + ((r / 0x4000000) | 0)) | 0;
	        lo = (lo + rword) | 0;
	        rword = lo & 0x3ffffff;
	        ncarry = (ncarry + (lo >>> 26)) | 0;

	        hncarry += ncarry >>> 26;
	        ncarry &= 0x3ffffff;
	      }
	      out.words[k] = rword;
	      carry = ncarry;
	      ncarry = hncarry;
	    }
	    if (carry !== 0) {
	      out.words[k] = carry;
	    } else {
	      out.length--;
	    }

	    return out.strip();
	  }

	  function jumboMulTo (self, num, out) {
	    var fftm = new FFTM();
	    return fftm.mulp(self, num, out);
	  }

	  BN.prototype.mulTo = function mulTo (num, out) {
	    var res;
	    var len = this.length + num.length;
	    if (this.length === 10 && num.length === 10) {
	      res = comb10MulTo(this, num, out);
	    } else if (len < 63) {
	      res = smallMulTo(this, num, out);
	    } else if (len < 1024) {
	      res = bigMulTo(this, num, out);
	    } else {
	      res = jumboMulTo(this, num, out);
	    }

	    return res;
	  };

	  // Cooley-Tukey algorithm for FFT
	  // slightly revisited to rely on looping instead of recursion

	  function FFTM (x, y) {
	    this.x = x;
	    this.y = y;
	  }

	  FFTM.prototype.makeRBT = function makeRBT (N) {
	    var this$1 = this;

	    var t = new Array(N);
	    var l = BN.prototype._countBits(N) - 1;
	    for (var i = 0; i < N; i++) {
	      t[i] = this$1.revBin(i, l, N);
	    }

	    return t;
	  };

	  // Returns binary-reversed representation of `x`
	  FFTM.prototype.revBin = function revBin (x, l, N) {
	    if (x === 0 || x === N - 1) { return x; }

	    var rb = 0;
	    for (var i = 0; i < l; i++) {
	      rb |= (x & 1) << (l - i - 1);
	      x >>= 1;
	    }

	    return rb;
	  };

	  // Performs "tweedling" phase, therefore 'emulating'
	  // behaviour of the recursive algorithm
	  FFTM.prototype.permute = function permute (rbt, rws, iws, rtws, itws, N) {
	    for (var i = 0; i < N; i++) {
	      rtws[i] = rws[rbt[i]];
	      itws[i] = iws[rbt[i]];
	    }
	  };

	  FFTM.prototype.transform = function transform (rws, iws, rtws, itws, N, rbt) {
	    this.permute(rbt, rws, iws, rtws, itws, N);

	    for (var s = 1; s < N; s <<= 1) {
	      var l = s << 1;

	      var rtwdf = Math.cos(2 * Math.PI / l);
	      var itwdf = Math.sin(2 * Math.PI / l);

	      for (var p = 0; p < N; p += l) {
	        var rtwdf_ = rtwdf;
	        var itwdf_ = itwdf;

	        for (var j = 0; j < s; j++) {
	          var re = rtws[p + j];
	          var ie = itws[p + j];

	          var ro = rtws[p + j + s];
	          var io = itws[p + j + s];

	          var rx = rtwdf_ * ro - itwdf_ * io;

	          io = rtwdf_ * io + itwdf_ * ro;
	          ro = rx;

	          rtws[p + j] = re + ro;
	          itws[p + j] = ie + io;

	          rtws[p + j + s] = re - ro;
	          itws[p + j + s] = ie - io;

	          /* jshint maxdepth : false */
	          if (j !== l) {
	            rx = rtwdf * rtwdf_ - itwdf * itwdf_;

	            itwdf_ = rtwdf * itwdf_ + itwdf * rtwdf_;
	            rtwdf_ = rx;
	          }
	        }
	      }
	    }
	  };

	  FFTM.prototype.guessLen13b = function guessLen13b (n, m) {
	    var N = Math.max(m, n) | 1;
	    var odd = N & 1;
	    var i = 0;
	    for (N = N / 2 | 0; N; N = N >>> 1) {
	      i++;
	    }

	    return 1 << i + 1 + odd;
	  };

	  FFTM.prototype.conjugate = function conjugate (rws, iws, N) {
	    if (N <= 1) { return; }

	    for (var i = 0; i < N / 2; i++) {
	      var t = rws[i];

	      rws[i] = rws[N - i - 1];
	      rws[N - i - 1] = t;

	      t = iws[i];

	      iws[i] = -iws[N - i - 1];
	      iws[N - i - 1] = -t;
	    }
	  };

	  FFTM.prototype.normalize13b = function normalize13b (ws, N) {
	    var carry = 0;
	    for (var i = 0; i < N / 2; i++) {
	      var w = Math.round(ws[2 * i + 1] / N) * 0x2000 +
	        Math.round(ws[2 * i] / N) +
	        carry;

	      ws[i] = w & 0x3ffffff;

	      if (w < 0x4000000) {
	        carry = 0;
	      } else {
	        carry = w / 0x4000000 | 0;
	      }
	    }

	    return ws;
	  };

	  FFTM.prototype.convert13b = function convert13b (ws, len, rws, N) {
	    var carry = 0;
	    for (var i = 0; i < len; i++) {
	      carry = carry + (ws[i] | 0);

	      rws[2 * i] = carry & 0x1fff; carry = carry >>> 13;
	      rws[2 * i + 1] = carry & 0x1fff; carry = carry >>> 13;
	    }

	    // Pad with zeroes
	    for (i = 2 * len; i < N; ++i) {
	      rws[i] = 0;
	    }

	    assert(carry === 0);
	    assert((carry & ~0x1fff) === 0);
	  };

	  FFTM.prototype.stub = function stub (N) {
	    var ph = new Array(N);
	    for (var i = 0; i < N; i++) {
	      ph[i] = 0;
	    }

	    return ph;
	  };

	  FFTM.prototype.mulp = function mulp (x, y, out) {
	    var N = 2 * this.guessLen13b(x.length, y.length);

	    var rbt = this.makeRBT(N);

	    var _ = this.stub(N);

	    var rws = new Array(N);
	    var rwst = new Array(N);
	    var iwst = new Array(N);

	    var nrws = new Array(N);
	    var nrwst = new Array(N);
	    var niwst = new Array(N);

	    var rmws = out.words;
	    rmws.length = N;

	    this.convert13b(x.words, x.length, rws, N);
	    this.convert13b(y.words, y.length, nrws, N);

	    this.transform(rws, _, rwst, iwst, N, rbt);
	    this.transform(nrws, _, nrwst, niwst, N, rbt);

	    for (var i = 0; i < N; i++) {
	      var rx = rwst[i] * nrwst[i] - iwst[i] * niwst[i];
	      iwst[i] = rwst[i] * niwst[i] + iwst[i] * nrwst[i];
	      rwst[i] = rx;
	    }

	    this.conjugate(rwst, iwst, N);
	    this.transform(rwst, iwst, rmws, _, N, rbt);
	    this.conjugate(rmws, _, N);
	    this.normalize13b(rmws, N);

	    out.negative = x.negative ^ y.negative;
	    out.length = x.length + y.length;
	    return out.strip();
	  };

	  // Multiply `this` by `num`
	  BN.prototype.mul = function mul (num) {
	    var out = new BN(null);
	    out.words = new Array(this.length + num.length);
	    return this.mulTo(num, out);
	  };

	  // Multiply employing FFT
	  BN.prototype.mulf = function mulf (num) {
	    var out = new BN(null);
	    out.words = new Array(this.length + num.length);
	    return jumboMulTo(this, num, out);
	  };

	  // In-place Multiplication
	  BN.prototype.imul = function imul (num) {
	    return this.clone().mulTo(num, this);
	  };

	  BN.prototype.imuln = function imuln (num) {
	    var this$1 = this;

	    assert(typeof num === 'number');
	    assert(num < 0x4000000);

	    // Carry
	    var carry = 0;
	    for (var i = 0; i < this.length; i++) {
	      var w = (this$1.words[i] | 0) * num;
	      var lo = (w & 0x3ffffff) + (carry & 0x3ffffff);
	      carry >>= 26;
	      carry += (w / 0x4000000) | 0;
	      // NOTE: lo is 27bit maximum
	      carry += lo >>> 26;
	      this$1.words[i] = lo & 0x3ffffff;
	    }

	    if (carry !== 0) {
	      this.words[i] = carry;
	      this.length++;
	    }

	    return this;
	  };

	  BN.prototype.muln = function muln (num) {
	    return this.clone().imuln(num);
	  };

	  // `this` * `this`
	  BN.prototype.sqr = function sqr () {
	    return this.mul(this);
	  };

	  // `this` * `this` in-place
	  BN.prototype.isqr = function isqr () {
	    return this.imul(this.clone());
	  };

	  // Math.pow(`this`, `num`)
	  BN.prototype.pow = function pow (num) {
	    var w = toBitArray(num);
	    if (w.length === 0) { return new BN(1); }

	    // Skip leading zeroes
	    var res = this;
	    for (var i = 0; i < w.length; i++, res = res.sqr()) {
	      if (w[i] !== 0) { break; }
	    }

	    if (++i < w.length) {
	      for (var q = res.sqr(); i < w.length; i++, q = q.sqr()) {
	        if (w[i] === 0) { continue; }

	        res = res.mul(q);
	      }
	    }

	    return res;
	  };

	  // Shift-left in-place
	  BN.prototype.iushln = function iushln (bits) {
	    var this$1 = this;

	    assert(typeof bits === 'number' && bits >= 0);
	    var r = bits % 26;
	    var s = (bits - r) / 26;
	    var carryMask = (0x3ffffff >>> (26 - r)) << (26 - r);
	    var i;

	    if (r !== 0) {
	      var carry = 0;

	      for (i = 0; i < this.length; i++) {
	        var newCarry = this$1.words[i] & carryMask;
	        var c = ((this$1.words[i] | 0) - newCarry) << r;
	        this$1.words[i] = c | carry;
	        carry = newCarry >>> (26 - r);
	      }

	      if (carry) {
	        this.words[i] = carry;
	        this.length++;
	      }
	    }

	    if (s !== 0) {
	      for (i = this.length - 1; i >= 0; i--) {
	        this$1.words[i + s] = this$1.words[i];
	      }

	      for (i = 0; i < s; i++) {
	        this$1.words[i] = 0;
	      }

	      this.length += s;
	    }

	    return this.strip();
	  };

	  BN.prototype.ishln = function ishln (bits) {
	    // TODO(indutny): implement me
	    assert(this.negative === 0);
	    return this.iushln(bits);
	  };

	  // Shift-right in-place
	  // NOTE: `hint` is a lowest bit before trailing zeroes
	  // NOTE: if `extended` is present - it will be filled with destroyed bits
	  BN.prototype.iushrn = function iushrn (bits, hint, extended) {
	    var this$1 = this;

	    assert(typeof bits === 'number' && bits >= 0);
	    var h;
	    if (hint) {
	      h = (hint - (hint % 26)) / 26;
	    } else {
	      h = 0;
	    }

	    var r = bits % 26;
	    var s = Math.min((bits - r) / 26, this.length);
	    var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
	    var maskedWords = extended;

	    h -= s;
	    h = Math.max(0, h);

	    // Extended mode, copy masked part
	    if (maskedWords) {
	      for (var i = 0; i < s; i++) {
	        maskedWords.words[i] = this$1.words[i];
	      }
	      maskedWords.length = s;
	    }

	    if (s === 0) {
	      // No-op, we should not move anything at all
	    } else if (this.length > s) {
	      this.length -= s;
	      for (i = 0; i < this.length; i++) {
	        this$1.words[i] = this$1.words[i + s];
	      }
	    } else {
	      this.words[0] = 0;
	      this.length = 1;
	    }

	    var carry = 0;
	    for (i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
	      var word = this$1.words[i] | 0;
	      this$1.words[i] = (carry << (26 - r)) | (word >>> r);
	      carry = word & mask;
	    }

	    // Push carried bits as a mask
	    if (maskedWords && carry !== 0) {
	      maskedWords.words[maskedWords.length++] = carry;
	    }

	    if (this.length === 0) {
	      this.words[0] = 0;
	      this.length = 1;
	    }

	    return this.strip();
	  };

	  BN.prototype.ishrn = function ishrn (bits, hint, extended) {
	    // TODO(indutny): implement me
	    assert(this.negative === 0);
	    return this.iushrn(bits, hint, extended);
	  };

	  // Shift-left
	  BN.prototype.shln = function shln (bits) {
	    return this.clone().ishln(bits);
	  };

	  BN.prototype.ushln = function ushln (bits) {
	    return this.clone().iushln(bits);
	  };

	  // Shift-right
	  BN.prototype.shrn = function shrn (bits) {
	    return this.clone().ishrn(bits);
	  };

	  BN.prototype.ushrn = function ushrn (bits) {
	    return this.clone().iushrn(bits);
	  };

	  // Test if n bit is set
	  BN.prototype.testn = function testn (bit) {
	    assert(typeof bit === 'number' && bit >= 0);
	    var r = bit % 26;
	    var s = (bit - r) / 26;
	    var q = 1 << r;

	    // Fast case: bit is much higher than all existing words
	    if (this.length <= s) { return false; }

	    // Check bit and return
	    var w = this.words[s];

	    return !!(w & q);
	  };

	  // Return only lowers bits of number (in-place)
	  BN.prototype.imaskn = function imaskn (bits) {
	    assert(typeof bits === 'number' && bits >= 0);
	    var r = bits % 26;
	    var s = (bits - r) / 26;

	    assert(this.negative === 0, 'imaskn works only with positive numbers');

	    if (this.length <= s) {
	      return this;
	    }

	    if (r !== 0) {
	      s++;
	    }
	    this.length = Math.min(s, this.length);

	    if (r !== 0) {
	      var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
	      this.words[this.length - 1] &= mask;
	    }

	    return this.strip();
	  };

	  // Return only lowers bits of number
	  BN.prototype.maskn = function maskn (bits) {
	    return this.clone().imaskn(bits);
	  };

	  // Add plain number `num` to `this`
	  BN.prototype.iaddn = function iaddn (num) {
	    assert(typeof num === 'number');
	    assert(num < 0x4000000);
	    if (num < 0) { return this.isubn(-num); }

	    // Possible sign change
	    if (this.negative !== 0) {
	      if (this.length === 1 && (this.words[0] | 0) < num) {
	        this.words[0] = num - (this.words[0] | 0);
	        this.negative = 0;
	        return this;
	      }

	      this.negative = 0;
	      this.isubn(num);
	      this.negative = 1;
	      return this;
	    }

	    // Add without checks
	    return this._iaddn(num);
	  };

	  BN.prototype._iaddn = function _iaddn (num) {
	    var this$1 = this;

	    this.words[0] += num;

	    // Carry
	    for (var i = 0; i < this.length && this.words[i] >= 0x4000000; i++) {
	      this$1.words[i] -= 0x4000000;
	      if (i === this$1.length - 1) {
	        this$1.words[i + 1] = 1;
	      } else {
	        this$1.words[i + 1]++;
	      }
	    }
	    this.length = Math.max(this.length, i + 1);

	    return this;
	  };

	  // Subtract plain number `num` from `this`
	  BN.prototype.isubn = function isubn (num) {
	    var this$1 = this;

	    assert(typeof num === 'number');
	    assert(num < 0x4000000);
	    if (num < 0) { return this.iaddn(-num); }

	    if (this.negative !== 0) {
	      this.negative = 0;
	      this.iaddn(num);
	      this.negative = 1;
	      return this;
	    }

	    this.words[0] -= num;

	    if (this.length === 1 && this.words[0] < 0) {
	      this.words[0] = -this.words[0];
	      this.negative = 1;
	    } else {
	      // Carry
	      for (var i = 0; i < this.length && this.words[i] < 0; i++) {
	        this$1.words[i] += 0x4000000;
	        this$1.words[i + 1] -= 1;
	      }
	    }

	    return this.strip();
	  };

	  BN.prototype.addn = function addn (num) {
	    return this.clone().iaddn(num);
	  };

	  BN.prototype.subn = function subn (num) {
	    return this.clone().isubn(num);
	  };

	  BN.prototype.iabs = function iabs () {
	    this.negative = 0;

	    return this;
	  };

	  BN.prototype.abs = function abs () {
	    return this.clone().iabs();
	  };

	  BN.prototype._ishlnsubmul = function _ishlnsubmul (num, mul, shift) {
	    var this$1 = this;

	    var len = num.length + shift;
	    var i;

	    this._expand(len);

	    var w;
	    var carry = 0;
	    for (i = 0; i < num.length; i++) {
	      w = (this$1.words[i + shift] | 0) + carry;
	      var right = (num.words[i] | 0) * mul;
	      w -= right & 0x3ffffff;
	      carry = (w >> 26) - ((right / 0x4000000) | 0);
	      this$1.words[i + shift] = w & 0x3ffffff;
	    }
	    for (; i < this.length - shift; i++) {
	      w = (this$1.words[i + shift] | 0) + carry;
	      carry = w >> 26;
	      this$1.words[i + shift] = w & 0x3ffffff;
	    }

	    if (carry === 0) { return this.strip(); }

	    // Subtraction overflow
	    assert(carry === -1);
	    carry = 0;
	    for (i = 0; i < this.length; i++) {
	      w = -(this$1.words[i] | 0) + carry;
	      carry = w >> 26;
	      this$1.words[i] = w & 0x3ffffff;
	    }
	    this.negative = 1;

	    return this.strip();
	  };

	  BN.prototype._wordDiv = function _wordDiv (num, mode) {
	    var shift = this.length - num.length;

	    var a = this.clone();
	    var b = num;

	    // Normalize
	    var bhi = b.words[b.length - 1] | 0;
	    var bhiBits = this._countBits(bhi);
	    shift = 26 - bhiBits;
	    if (shift !== 0) {
	      b = b.ushln(shift);
	      a.iushln(shift);
	      bhi = b.words[b.length - 1] | 0;
	    }

	    // Initialize quotient
	    var m = a.length - b.length;
	    var q;

	    if (mode !== 'mod') {
	      q = new BN(null);
	      q.length = m + 1;
	      q.words = new Array(q.length);
	      for (var i = 0; i < q.length; i++) {
	        q.words[i] = 0;
	      }
	    }

	    var diff = a.clone()._ishlnsubmul(b, 1, m);
	    if (diff.negative === 0) {
	      a = diff;
	      if (q) {
	        q.words[m] = 1;
	      }
	    }

	    for (var j = m - 1; j >= 0; j--) {
	      var qj = (a.words[b.length + j] | 0) * 0x4000000 +
	        (a.words[b.length + j - 1] | 0);

	      // NOTE: (qj / bhi) is (0x3ffffff * 0x4000000 + 0x3ffffff) / 0x2000000 max
	      // (0x7ffffff)
	      qj = Math.min((qj / bhi) | 0, 0x3ffffff);

	      a._ishlnsubmul(b, qj, j);
	      while (a.negative !== 0) {
	        qj--;
	        a.negative = 0;
	        a._ishlnsubmul(b, 1, j);
	        if (!a.isZero()) {
	          a.negative ^= 1;
	        }
	      }
	      if (q) {
	        q.words[j] = qj;
	      }
	    }
	    if (q) {
	      q.strip();
	    }
	    a.strip();

	    // Denormalize
	    if (mode !== 'div' && shift !== 0) {
	      a.iushrn(shift);
	    }

	    return {
	      div: q || null,
	      mod: a
	    };
	  };

	  // NOTE: 1) `mode` can be set to `mod` to request mod only,
	  //       to `div` to request div only, or be absent to
	  //       request both div & mod
	  //       2) `positive` is true if unsigned mod is requested
	  BN.prototype.divmod = function divmod (num, mode, positive) {
	    assert(!num.isZero());

	    if (this.isZero()) {
	      return {
	        div: new BN(0),
	        mod: new BN(0)
	      };
	    }

	    var div, mod, res;
	    if (this.negative !== 0 && num.negative === 0) {
	      res = this.neg().divmod(num, mode);

	      if (mode !== 'mod') {
	        div = res.div.neg();
	      }

	      if (mode !== 'div') {
	        mod = res.mod.neg();
	        if (positive && mod.negative !== 0) {
	          mod.iadd(num);
	        }
	      }

	      return {
	        div: div,
	        mod: mod
	      };
	    }

	    if (this.negative === 0 && num.negative !== 0) {
	      res = this.divmod(num.neg(), mode);

	      if (mode !== 'mod') {
	        div = res.div.neg();
	      }

	      return {
	        div: div,
	        mod: res.mod
	      };
	    }

	    if ((this.negative & num.negative) !== 0) {
	      res = this.neg().divmod(num.neg(), mode);

	      if (mode !== 'div') {
	        mod = res.mod.neg();
	        if (positive && mod.negative !== 0) {
	          mod.isub(num);
	        }
	      }

	      return {
	        div: res.div,
	        mod: mod
	      };
	    }

	    // Both numbers are positive at this point

	    // Strip both numbers to approximate shift value
	    if (num.length > this.length || this.cmp(num) < 0) {
	      return {
	        div: new BN(0),
	        mod: this
	      };
	    }

	    // Very short reduction
	    if (num.length === 1) {
	      if (mode === 'div') {
	        return {
	          div: this.divn(num.words[0]),
	          mod: null
	        };
	      }

	      if (mode === 'mod') {
	        return {
	          div: null,
	          mod: new BN(this.modn(num.words[0]))
	        };
	      }

	      return {
	        div: this.divn(num.words[0]),
	        mod: new BN(this.modn(num.words[0]))
	      };
	    }

	    return this._wordDiv(num, mode);
	  };

	  // Find `this` / `num`
	  BN.prototype.div = function div (num) {
	    return this.divmod(num, 'div', false).div;
	  };

	  // Find `this` % `num`
	  BN.prototype.mod = function mod (num) {
	    return this.divmod(num, 'mod', false).mod;
	  };

	  BN.prototype.umod = function umod (num) {
	    return this.divmod(num, 'mod', true).mod;
	  };

	  // Find Round(`this` / `num`)
	  BN.prototype.divRound = function divRound (num) {
	    var dm = this.divmod(num);

	    // Fast case - exact division
	    if (dm.mod.isZero()) { return dm.div; }

	    var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;

	    var half = num.ushrn(1);
	    var r2 = num.andln(1);
	    var cmp = mod.cmp(half);

	    // Round down
	    if (cmp < 0 || r2 === 1 && cmp === 0) { return dm.div; }

	    // Round up
	    return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
	  };

	  BN.prototype.modn = function modn (num) {
	    var this$1 = this;

	    assert(num <= 0x3ffffff);
	    var p = (1 << 26) % num;

	    var acc = 0;
	    for (var i = this.length - 1; i >= 0; i--) {
	      acc = (p * acc + (this$1.words[i] | 0)) % num;
	    }

	    return acc;
	  };

	  // In-place division by number
	  BN.prototype.idivn = function idivn (num) {
	    var this$1 = this;

	    assert(num <= 0x3ffffff);

	    var carry = 0;
	    for (var i = this.length - 1; i >= 0; i--) {
	      var w = (this$1.words[i] | 0) + carry * 0x4000000;
	      this$1.words[i] = (w / num) | 0;
	      carry = w % num;
	    }

	    return this.strip();
	  };

	  BN.prototype.divn = function divn (num) {
	    return this.clone().idivn(num);
	  };

	  BN.prototype.egcd = function egcd (p) {
	    assert(p.negative === 0);
	    assert(!p.isZero());

	    var x = this;
	    var y = p.clone();

	    if (x.negative !== 0) {
	      x = x.umod(p);
	    } else {
	      x = x.clone();
	    }

	    // A * x + B * y = x
	    var A = new BN(1);
	    var B = new BN(0);

	    // C * x + D * y = y
	    var C = new BN(0);
	    var D = new BN(1);

	    var g = 0;

	    while (x.isEven() && y.isEven()) {
	      x.iushrn(1);
	      y.iushrn(1);
	      ++g;
	    }

	    var yp = y.clone();
	    var xp = x.clone();

	    while (!x.isZero()) {
	      for (var i = 0, im = 1; (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1){  }
	      if (i > 0) {
	        x.iushrn(i);
	        while (i-- > 0) {
	          if (A.isOdd() || B.isOdd()) {
	            A.iadd(yp);
	            B.isub(xp);
	          }

	          A.iushrn(1);
	          B.iushrn(1);
	        }
	      }

	      for (var j = 0, jm = 1; (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1){  }
	      if (j > 0) {
	        y.iushrn(j);
	        while (j-- > 0) {
	          if (C.isOdd() || D.isOdd()) {
	            C.iadd(yp);
	            D.isub(xp);
	          }

	          C.iushrn(1);
	          D.iushrn(1);
	        }
	      }

	      if (x.cmp(y) >= 0) {
	        x.isub(y);
	        A.isub(C);
	        B.isub(D);
	      } else {
	        y.isub(x);
	        C.isub(A);
	        D.isub(B);
	      }
	    }

	    return {
	      a: C,
	      b: D,
	      gcd: y.iushln(g)
	    };
	  };

	  // This is reduced incarnation of the binary EEA
	  // above, designated to invert members of the
	  // _prime_ fields F(p) at a maximal speed
	  BN.prototype._invmp = function _invmp (p) {
	    assert(p.negative === 0);
	    assert(!p.isZero());

	    var a = this;
	    var b = p.clone();

	    if (a.negative !== 0) {
	      a = a.umod(p);
	    } else {
	      a = a.clone();
	    }

	    var x1 = new BN(1);
	    var x2 = new BN(0);

	    var delta = b.clone();

	    while (a.cmpn(1) > 0 && b.cmpn(1) > 0) {
	      for (var i = 0, im = 1; (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1){  }
	      if (i > 0) {
	        a.iushrn(i);
	        while (i-- > 0) {
	          if (x1.isOdd()) {
	            x1.iadd(delta);
	          }

	          x1.iushrn(1);
	        }
	      }

	      for (var j = 0, jm = 1; (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1){  }
	      if (j > 0) {
	        b.iushrn(j);
	        while (j-- > 0) {
	          if (x2.isOdd()) {
	            x2.iadd(delta);
	          }

	          x2.iushrn(1);
	        }
	      }

	      if (a.cmp(b) >= 0) {
	        a.isub(b);
	        x1.isub(x2);
	      } else {
	        b.isub(a);
	        x2.isub(x1);
	      }
	    }

	    var res;
	    if (a.cmpn(1) === 0) {
	      res = x1;
	    } else {
	      res = x2;
	    }

	    if (res.cmpn(0) < 0) {
	      res.iadd(p);
	    }

	    return res;
	  };

	  BN.prototype.gcd = function gcd (num) {
	    if (this.isZero()) { return num.abs(); }
	    if (num.isZero()) { return this.abs(); }

	    var a = this.clone();
	    var b = num.clone();
	    a.negative = 0;
	    b.negative = 0;

	    // Remove common factor of two
	    for (var shift = 0; a.isEven() && b.isEven(); shift++) {
	      a.iushrn(1);
	      b.iushrn(1);
	    }

	    do {
	      while (a.isEven()) {
	        a.iushrn(1);
	      }
	      while (b.isEven()) {
	        b.iushrn(1);
	      }

	      var r = a.cmp(b);
	      if (r < 0) {
	        // Swap `a` and `b` to make `a` always bigger than `b`
	        var t = a;
	        a = b;
	        b = t;
	      } else if (r === 0 || b.cmpn(1) === 0) {
	        break;
	      }

	      a.isub(b);
	    } while (true);

	    return b.iushln(shift);
	  };

	  // Invert number in the field F(num)
	  BN.prototype.invm = function invm (num) {
	    return this.egcd(num).a.umod(num);
	  };

	  BN.prototype.isEven = function isEven () {
	    return (this.words[0] & 1) === 0;
	  };

	  BN.prototype.isOdd = function isOdd () {
	    return (this.words[0] & 1) === 1;
	  };

	  // And first word and num
	  BN.prototype.andln = function andln (num) {
	    return this.words[0] & num;
	  };

	  // Increment at the bit position in-line
	  BN.prototype.bincn = function bincn (bit) {
	    var this$1 = this;

	    assert(typeof bit === 'number');
	    var r = bit % 26;
	    var s = (bit - r) / 26;
	    var q = 1 << r;

	    // Fast case: bit is much higher than all existing words
	    if (this.length <= s) {
	      this._expand(s + 1);
	      this.words[s] |= q;
	      return this;
	    }

	    // Add bit and propagate, if needed
	    var carry = q;
	    for (var i = s; carry !== 0 && i < this.length; i++) {
	      var w = this$1.words[i] | 0;
	      w += carry;
	      carry = w >>> 26;
	      w &= 0x3ffffff;
	      this$1.words[i] = w;
	    }
	    if (carry !== 0) {
	      this.words[i] = carry;
	      this.length++;
	    }
	    return this;
	  };

	  BN.prototype.isZero = function isZero () {
	    return this.length === 1 && this.words[0] === 0;
	  };

	  BN.prototype.cmpn = function cmpn (num) {
	    var negative = num < 0;

	    if (this.negative !== 0 && !negative) { return -1; }
	    if (this.negative === 0 && negative) { return 1; }

	    this.strip();

	    var res;
	    if (this.length > 1) {
	      res = 1;
	    } else {
	      if (negative) {
	        num = -num;
	      }

	      assert(num <= 0x3ffffff, 'Number is too big');

	      var w = this.words[0] | 0;
	      res = w === num ? 0 : w < num ? -1 : 1;
	    }
	    if (this.negative !== 0) { return -res | 0; }
	    return res;
	  };

	  // Compare two numbers and return:
	  // 1 - if `this` > `num`
	  // 0 - if `this` == `num`
	  // -1 - if `this` < `num`
	  BN.prototype.cmp = function cmp (num) {
	    if (this.negative !== 0 && num.negative === 0) { return -1; }
	    if (this.negative === 0 && num.negative !== 0) { return 1; }

	    var res = this.ucmp(num);
	    if (this.negative !== 0) { return -res | 0; }
	    return res;
	  };

	  // Unsigned comparison
	  BN.prototype.ucmp = function ucmp (num) {
	    var this$1 = this;

	    // At this point both numbers have the same sign
	    if (this.length > num.length) { return 1; }
	    if (this.length < num.length) { return -1; }

	    var res = 0;
	    for (var i = this.length - 1; i >= 0; i--) {
	      var a = this$1.words[i] | 0;
	      var b = num.words[i] | 0;

	      if (a === b) { continue; }
	      if (a < b) {
	        res = -1;
	      } else if (a > b) {
	        res = 1;
	      }
	      break;
	    }
	    return res;
	  };

	  BN.prototype.gtn = function gtn (num) {
	    return this.cmpn(num) === 1;
	  };

	  BN.prototype.gt = function gt (num) {
	    return this.cmp(num) === 1;
	  };

	  BN.prototype.gten = function gten (num) {
	    return this.cmpn(num) >= 0;
	  };

	  BN.prototype.gte = function gte (num) {
	    return this.cmp(num) >= 0;
	  };

	  BN.prototype.ltn = function ltn (num) {
	    return this.cmpn(num) === -1;
	  };

	  BN.prototype.lt = function lt (num) {
	    return this.cmp(num) === -1;
	  };

	  BN.prototype.lten = function lten (num) {
	    return this.cmpn(num) <= 0;
	  };

	  BN.prototype.lte = function lte (num) {
	    return this.cmp(num) <= 0;
	  };

	  BN.prototype.eqn = function eqn (num) {
	    return this.cmpn(num) === 0;
	  };

	  BN.prototype.eq = function eq (num) {
	    return this.cmp(num) === 0;
	  };

	  //
	  // A reduce context, could be using montgomery or something better, depending
	  // on the `m` itself.
	  //
	  BN.red = function red (num) {
	    return new Red(num);
	  };

	  BN.prototype.toRed = function toRed (ctx) {
	    assert(!this.red, 'Already a number in reduction context');
	    assert(this.negative === 0, 'red works only with positives');
	    return ctx.convertTo(this)._forceRed(ctx);
	  };

	  BN.prototype.fromRed = function fromRed () {
	    assert(this.red, 'fromRed works only with numbers in reduction context');
	    return this.red.convertFrom(this);
	  };

	  BN.prototype._forceRed = function _forceRed (ctx) {
	    this.red = ctx;
	    return this;
	  };

	  BN.prototype.forceRed = function forceRed (ctx) {
	    assert(!this.red, 'Already a number in reduction context');
	    return this._forceRed(ctx);
	  };

	  BN.prototype.redAdd = function redAdd (num) {
	    assert(this.red, 'redAdd works only with red numbers');
	    return this.red.add(this, num);
	  };

	  BN.prototype.redIAdd = function redIAdd (num) {
	    assert(this.red, 'redIAdd works only with red numbers');
	    return this.red.iadd(this, num);
	  };

	  BN.prototype.redSub = function redSub (num) {
	    assert(this.red, 'redSub works only with red numbers');
	    return this.red.sub(this, num);
	  };

	  BN.prototype.redISub = function redISub (num) {
	    assert(this.red, 'redISub works only with red numbers');
	    return this.red.isub(this, num);
	  };

	  BN.prototype.redShl = function redShl (num) {
	    assert(this.red, 'redShl works only with red numbers');
	    return this.red.shl(this, num);
	  };

	  BN.prototype.redMul = function redMul (num) {
	    assert(this.red, 'redMul works only with red numbers');
	    this.red._verify2(this, num);
	    return this.red.mul(this, num);
	  };

	  BN.prototype.redIMul = function redIMul (num) {
	    assert(this.red, 'redMul works only with red numbers');
	    this.red._verify2(this, num);
	    return this.red.imul(this, num);
	  };

	  BN.prototype.redSqr = function redSqr () {
	    assert(this.red, 'redSqr works only with red numbers');
	    this.red._verify1(this);
	    return this.red.sqr(this);
	  };

	  BN.prototype.redISqr = function redISqr () {
	    assert(this.red, 'redISqr works only with red numbers');
	    this.red._verify1(this);
	    return this.red.isqr(this);
	  };

	  // Square root over p
	  BN.prototype.redSqrt = function redSqrt () {
	    assert(this.red, 'redSqrt works only with red numbers');
	    this.red._verify1(this);
	    return this.red.sqrt(this);
	  };

	  BN.prototype.redInvm = function redInvm () {
	    assert(this.red, 'redInvm works only with red numbers');
	    this.red._verify1(this);
	    return this.red.invm(this);
	  };

	  // Return negative clone of `this` % `red modulo`
	  BN.prototype.redNeg = function redNeg () {
	    assert(this.red, 'redNeg works only with red numbers');
	    this.red._verify1(this);
	    return this.red.neg(this);
	  };

	  BN.prototype.redPow = function redPow (num) {
	    assert(this.red && !num.red, 'redPow(normalNum)');
	    this.red._verify1(this);
	    return this.red.pow(this, num);
	  };

	  // Prime numbers with efficient reduction
	  var primes = {
	    k256: null,
	    p224: null,
	    p192: null,
	    p25519: null
	  };

	  // Pseudo-Mersenne prime
	  function MPrime (name, p) {
	    // P = 2 ^ N - K
	    this.name = name;
	    this.p = new BN(p, 16);
	    this.n = this.p.bitLength();
	    this.k = new BN(1).iushln(this.n).isub(this.p);

	    this.tmp = this._tmp();
	  }

	  MPrime.prototype._tmp = function _tmp () {
	    var tmp = new BN(null);
	    tmp.words = new Array(Math.ceil(this.n / 13));
	    return tmp;
	  };

	  MPrime.prototype.ireduce = function ireduce (num) {
	    var this$1 = this;

	    // Assumes that `num` is less than `P^2`
	    // num = HI * (2 ^ N - K) + HI * K + LO = HI * K + LO (mod P)
	    var r = num;
	    var rlen;

	    do {
	      this$1.split(r, this$1.tmp);
	      r = this$1.imulK(r);
	      r = r.iadd(this$1.tmp);
	      rlen = r.bitLength();
	    } while (rlen > this.n);

	    var cmp = rlen < this.n ? -1 : r.ucmp(this.p);
	    if (cmp === 0) {
	      r.words[0] = 0;
	      r.length = 1;
	    } else if (cmp > 0) {
	      r.isub(this.p);
	    } else {
	      r.strip();
	    }

	    return r;
	  };

	  MPrime.prototype.split = function split (input, out) {
	    input.iushrn(this.n, 0, out);
	  };

	  MPrime.prototype.imulK = function imulK (num) {
	    return num.imul(this.k);
	  };

	  function K256 () {
	    MPrime.call(
	      this,
	      'k256',
	      'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f');
	  }
	  inherits(K256, MPrime);

	  K256.prototype.split = function split (input, output) {
	    // 256 = 9 * 26 + 22
	    var mask = 0x3fffff;

	    var outLen = Math.min(input.length, 9);
	    for (var i = 0; i < outLen; i++) {
	      output.words[i] = input.words[i];
	    }
	    output.length = outLen;

	    if (input.length <= 9) {
	      input.words[0] = 0;
	      input.length = 1;
	      return;
	    }

	    // Shift by 9 limbs
	    var prev = input.words[9];
	    output.words[output.length++] = prev & mask;

	    for (i = 10; i < input.length; i++) {
	      var next = input.words[i] | 0;
	      input.words[i - 10] = ((next & mask) << 4) | (prev >>> 22);
	      prev = next;
	    }
	    prev >>>= 22;
	    input.words[i - 10] = prev;
	    if (prev === 0 && input.length > 10) {
	      input.length -= 10;
	    } else {
	      input.length -= 9;
	    }
	  };

	  K256.prototype.imulK = function imulK (num) {
	    // K = 0x1000003d1 = [ 0x40, 0x3d1 ]
	    num.words[num.length] = 0;
	    num.words[num.length + 1] = 0;
	    num.length += 2;

	    // bounded at: 0x40 * 0x3ffffff + 0x3d0 = 0x100000390
	    var lo = 0;
	    for (var i = 0; i < num.length; i++) {
	      var w = num.words[i] | 0;
	      lo += w * 0x3d1;
	      num.words[i] = lo & 0x3ffffff;
	      lo = w * 0x40 + ((lo / 0x4000000) | 0);
	    }

	    // Fast length reduction
	    if (num.words[num.length - 1] === 0) {
	      num.length--;
	      if (num.words[num.length - 1] === 0) {
	        num.length--;
	      }
	    }
	    return num;
	  };

	  function P224 () {
	    MPrime.call(
	      this,
	      'p224',
	      'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001');
	  }
	  inherits(P224, MPrime);

	  function P192 () {
	    MPrime.call(
	      this,
	      'p192',
	      'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff');
	  }
	  inherits(P192, MPrime);

	  function P25519 () {
	    // 2 ^ 255 - 19
	    MPrime.call(
	      this,
	      '25519',
	      '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed');
	  }
	  inherits(P25519, MPrime);

	  P25519.prototype.imulK = function imulK (num) {
	    // K = 0x13
	    var carry = 0;
	    for (var i = 0; i < num.length; i++) {
	      var hi = (num.words[i] | 0) * 0x13 + carry;
	      var lo = hi & 0x3ffffff;
	      hi >>>= 26;

	      num.words[i] = lo;
	      carry = hi;
	    }
	    if (carry !== 0) {
	      num.words[num.length++] = carry;
	    }
	    return num;
	  };

	  // Exported mostly for testing purposes, use plain name instead
	  BN._prime = function prime (name) {
	    // Cached version of prime
	    if (primes[name]) { return primes[name]; }

	    var prime;
	    if (name === 'k256') {
	      prime = new K256();
	    } else if (name === 'p224') {
	      prime = new P224();
	    } else if (name === 'p192') {
	      prime = new P192();
	    } else if (name === 'p25519') {
	      prime = new P25519();
	    } else {
	      throw new Error('Unknown prime ' + name);
	    }
	    primes[name] = prime;

	    return prime;
	  };

	  //
	  // Base reduction engine
	  //
	  function Red (m) {
	    if (typeof m === 'string') {
	      var prime = BN._prime(m);
	      this.m = prime.p;
	      this.prime = prime;
	    } else {
	      assert(m.gtn(1), 'modulus must be greater than 1');
	      this.m = m;
	      this.prime = null;
	    }
	  }

	  Red.prototype._verify1 = function _verify1 (a) {
	    assert(a.negative === 0, 'red works only with positives');
	    assert(a.red, 'red works only with red numbers');
	  };

	  Red.prototype._verify2 = function _verify2 (a, b) {
	    assert((a.negative | b.negative) === 0, 'red works only with positives');
	    assert(a.red && a.red === b.red,
	      'red works only with red numbers');
	  };

	  Red.prototype.imod = function imod (a) {
	    if (this.prime) { return this.prime.ireduce(a)._forceRed(this); }
	    return a.umod(this.m)._forceRed(this);
	  };

	  Red.prototype.neg = function neg (a) {
	    if (a.isZero()) {
	      return a.clone();
	    }

	    return this.m.sub(a)._forceRed(this);
	  };

	  Red.prototype.add = function add (a, b) {
	    this._verify2(a, b);

	    var res = a.add(b);
	    if (res.cmp(this.m) >= 0) {
	      res.isub(this.m);
	    }
	    return res._forceRed(this);
	  };

	  Red.prototype.iadd = function iadd (a, b) {
	    this._verify2(a, b);

	    var res = a.iadd(b);
	    if (res.cmp(this.m) >= 0) {
	      res.isub(this.m);
	    }
	    return res;
	  };

	  Red.prototype.sub = function sub (a, b) {
	    this._verify2(a, b);

	    var res = a.sub(b);
	    if (res.cmpn(0) < 0) {
	      res.iadd(this.m);
	    }
	    return res._forceRed(this);
	  };

	  Red.prototype.isub = function isub (a, b) {
	    this._verify2(a, b);

	    var res = a.isub(b);
	    if (res.cmpn(0) < 0) {
	      res.iadd(this.m);
	    }
	    return res;
	  };

	  Red.prototype.shl = function shl (a, num) {
	    this._verify1(a);
	    return this.imod(a.ushln(num));
	  };

	  Red.prototype.imul = function imul (a, b) {
	    this._verify2(a, b);
	    return this.imod(a.imul(b));
	  };

	  Red.prototype.mul = function mul (a, b) {
	    this._verify2(a, b);
	    return this.imod(a.mul(b));
	  };

	  Red.prototype.isqr = function isqr (a) {
	    return this.imul(a, a.clone());
	  };

	  Red.prototype.sqr = function sqr (a) {
	    return this.mul(a, a);
	  };

	  Red.prototype.sqrt = function sqrt (a) {
	    var this$1 = this;

	    if (a.isZero()) { return a.clone(); }

	    var mod3 = this.m.andln(3);
	    assert(mod3 % 2 === 1);

	    // Fast case
	    if (mod3 === 3) {
	      var pow = this.m.add(new BN(1)).iushrn(2);
	      return this.pow(a, pow);
	    }

	    // Tonelli-Shanks algorithm (Totally unoptimized and slow)
	    //
	    // Find Q and S, that Q * 2 ^ S = (P - 1)
	    var q = this.m.subn(1);
	    var s = 0;
	    while (!q.isZero() && q.andln(1) === 0) {
	      s++;
	      q.iushrn(1);
	    }
	    assert(!q.isZero());

	    var one = new BN(1).toRed(this);
	    var nOne = one.redNeg();

	    // Find quadratic non-residue
	    // NOTE: Max is such because of generalized Riemann hypothesis.
	    var lpow = this.m.subn(1).iushrn(1);
	    var z = this.m.bitLength();
	    z = new BN(2 * z * z).toRed(this);

	    while (this.pow(z, lpow).cmp(nOne) !== 0) {
	      z.redIAdd(nOne);
	    }

	    var c = this.pow(z, q);
	    var r = this.pow(a, q.addn(1).iushrn(1));
	    var t = this.pow(a, q);
	    var m = s;
	    while (t.cmp(one) !== 0) {
	      var tmp = t;
	      for (var i = 0; tmp.cmp(one) !== 0; i++) {
	        tmp = tmp.redSqr();
	      }
	      assert(i < m);
	      var b = this$1.pow(c, new BN(1).iushln(m - i - 1));

	      r = r.redMul(b);
	      c = b.redSqr();
	      t = t.redMul(c);
	      m = i;
	    }

	    return r;
	  };

	  Red.prototype.invm = function invm (a) {
	    var inv = a._invmp(this.m);
	    if (inv.negative !== 0) {
	      inv.negative = 0;
	      return this.imod(inv).redNeg();
	    } else {
	      return this.imod(inv);
	    }
	  };

	  Red.prototype.pow = function pow (a, num) {
	    var this$1 = this;

	    if (num.isZero()) { return new BN(1).toRed(this); }
	    if (num.cmpn(1) === 0) { return a.clone(); }

	    var windowSize = 4;
	    var wnd = new Array(1 << windowSize);
	    wnd[0] = new BN(1).toRed(this);
	    wnd[1] = a;
	    for (var i = 2; i < wnd.length; i++) {
	      wnd[i] = this$1.mul(wnd[i - 1], a);
	    }

	    var res = wnd[0];
	    var current = 0;
	    var currentLen = 0;
	    var start = num.bitLength() % 26;
	    if (start === 0) {
	      start = 26;
	    }

	    for (i = num.length - 1; i >= 0; i--) {
	      var word = num.words[i];
	      for (var j = start - 1; j >= 0; j--) {
	        var bit = (word >> j) & 1;
	        if (res !== wnd[0]) {
	          res = this$1.sqr(res);
	        }

	        if (bit === 0 && current === 0) {
	          currentLen = 0;
	          continue;
	        }

	        current <<= 1;
	        current |= bit;
	        currentLen++;
	        if (currentLen !== windowSize && (i !== 0 || j !== 0)) { continue; }

	        res = this$1.mul(res, wnd[current]);
	        currentLen = 0;
	        current = 0;
	      }
	      start = 26;
	    }

	    return res;
	  };

	  Red.prototype.convertTo = function convertTo (num) {
	    var r = num.umod(this.m);

	    return r === num ? r.clone() : r;
	  };

	  Red.prototype.convertFrom = function convertFrom (num) {
	    var res = num.clone();
	    res.red = null;
	    return res;
	  };

	  //
	  // Montgomery method engine
	  //

	  BN.mont = function mont (num) {
	    return new Mont(num);
	  };

	  function Mont (m) {
	    Red.call(this, m);

	    this.shift = this.m.bitLength();
	    if (this.shift % 26 !== 0) {
	      this.shift += 26 - (this.shift % 26);
	    }

	    this.r = new BN(1).iushln(this.shift);
	    this.r2 = this.imod(this.r.sqr());
	    this.rinv = this.r._invmp(this.m);

	    this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
	    this.minv = this.minv.umod(this.r);
	    this.minv = this.r.sub(this.minv);
	  }
	  inherits(Mont, Red);

	  Mont.prototype.convertTo = function convertTo (num) {
	    return this.imod(num.ushln(this.shift));
	  };

	  Mont.prototype.convertFrom = function convertFrom (num) {
	    var r = this.imod(num.mul(this.rinv));
	    r.red = null;
	    return r;
	  };

	  Mont.prototype.imul = function imul (a, b) {
	    if (a.isZero() || b.isZero()) {
	      a.words[0] = 0;
	      a.length = 1;
	      return a;
	    }

	    var t = a.imul(b);
	    var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
	    var u = t.isub(c).iushrn(this.shift);
	    var res = u;

	    if (u.cmp(this.m) >= 0) {
	      res = u.isub(this.m);
	    } else if (u.cmpn(0) < 0) {
	      res = u.iadd(this.m);
	    }

	    return res._forceRed(this);
	  };

	  Mont.prototype.mul = function mul (a, b) {
	    if (a.isZero() || b.isZero()) { return new BN(0)._forceRed(this); }

	    var t = a.mul(b);
	    var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
	    var u = t.isub(c).iushrn(this.shift);
	    var res = u;
	    if (u.cmp(this.m) >= 0) {
	      res = u.isub(this.m);
	    } else if (u.cmpn(0) < 0) {
	      res = u.iadd(this.m);
	    }

	    return res._forceRed(this);
	  };

	  Mont.prototype.invm = function invm (a) {
	    // (AR)^-1 * R^2 = (A^-1 * R^-1) * R^2 = A^-1 * R
	    var res = this.imod(a._invmp(this.m).mul(this.r2));
	    return res._forceRed(this);
	  };
	})(typeof module === 'undefined' || module, this);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)(module)));

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

	// We resolve `buffer` to this file, eliminating it from our builds.


/***/ }),
/* 7 */
/***/ (function(module, exports) {

	module.exports = assert;

	function assert(val, msg) {
	  if (!val)
	    { throw new Error(msg || 'Assertion failed'); }
	}

	assert.equal = function assertEqual(l, r, msg) {
	  if (l != r)
	    { throw new Error(msg || ('Assertion failed: ' + l + ' != ' + r)); }
	};


/***/ }),
/* 8 */
/***/ (function(module, exports) {

	'use strict';

	var utils = exports;

	function toArray(msg, enc) {
	  if (Array.isArray(msg))
	    { return msg.slice(); }
	  if (!msg)
	    { return []; }
	  var res = [];
	  if (typeof msg !== 'string') {
	    for (var i = 0; i < msg.length; i++)
	      { res[i] = msg[i] | 0; }
	    return res;
	  }
	  if (enc === 'hex') {
	    msg = msg.replace(/[^a-z0-9]+/ig, '');
	    if (msg.length % 2 !== 0)
	      { msg = '0' + msg; }
	    for (var i = 0; i < msg.length; i += 2)
	      { res.push(parseInt(msg[i] + msg[i + 1], 16)); }
	  } else {
	    for (var i = 0; i < msg.length; i++) {
	      var c = msg.charCodeAt(i);
	      var hi = c >> 8;
	      var lo = c & 0xff;
	      if (hi)
	        { res.push(hi, lo); }
	      else
	        { res.push(lo); }
	    }
	  }
	  return res;
	}
	utils.toArray = toArray;

	function zero2(word) {
	  if (word.length === 1)
	    { return '0' + word; }
	  else
	    { return word; }
	}
	utils.zero2 = zero2;

	function toHex(msg) {
	  var res = '';
	  for (var i = 0; i < msg.length; i++)
	    { res += zero2(msg[i].toString(16)); }
	  return res;
	}
	utils.toHex = toHex;

	utils.encode = function encode(arr, enc) {
	  if (enc === 'hex')
	    { return toHex(arr); }
	  else
	    { return arr; }
	};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	var r;

	module.exports = function rand(len) {
	  if (!r)
	    { r = new Rand(null); }

	  return r.generate(len);
	};

	function Rand(rand) {
	  this.rand = rand;
	}
	module.exports.Rand = Rand;

	Rand.prototype.generate = function generate(len) {
	  return this._rand(len);
	};

	// Emulate crypto API using randy
	Rand.prototype._rand = function _rand(n) {
	  var this$1 = this;

	  if (this.rand.getBytes)
	    { return this.rand.getBytes(n); }

	  var res = new Uint8Array(n);
	  for (var i = 0; i < res.length; i++)
	    { res[i] = this$1.rand.getByte(); }
	  return res;
	};

	if (typeof self === 'object') {
	  if (self.crypto && self.crypto.getRandomValues) {
	    // Modern browsers
	    Rand.prototype._rand = function _rand(n) {
	      var arr = new Uint8Array(n);
	      self.crypto.getRandomValues(arr);
	      return arr;
	    };
	  } else if (self.msCrypto && self.msCrypto.getRandomValues) {
	    // IE
	    Rand.prototype._rand = function _rand(n) {
	      var arr = new Uint8Array(n);
	      self.msCrypto.getRandomValues(arr);
	      return arr;
	    };

	  // Safari's WebWorkers do not have `crypto`
	  } else if (typeof window === 'object') {
	    // Old junk
	    Rand.prototype._rand = function() {
	      throw new Error('Not implemented yet');
	    };
	  }
	} else {
	  // Node.js or Web worker with no crypto support
	  try {
	    var crypto = __webpack_require__(10);
	    if (typeof crypto.randomBytes !== 'function')
	      { throw new Error('Not supported'); }

	    Rand.prototype._rand = function _rand(n) {
	      return crypto.randomBytes(n);
	    };
	  } catch (e) {
	  }
	}


/***/ }),
/* 10 */
/***/ (function(module, exports) {

	/* (ignored) */

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var curve = exports;

	curve.base = __webpack_require__(12);
	curve.short = __webpack_require__(13);
	curve.mont = __webpack_require__(15);
	curve.edwards = __webpack_require__(16);


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var BN = __webpack_require__(4);
	var elliptic = __webpack_require__(1);
	var utils = elliptic.utils;
	var getNAF = utils.getNAF;
	var getJSF = utils.getJSF;
	var assert = utils.assert;

	function BaseCurve(type, conf) {
	  this.type = type;
	  this.p = new BN(conf.p, 16);

	  // Use Montgomery, when there is no fast reduction for the prime
	  this.red = conf.prime ? BN.red(conf.prime) : BN.mont(this.p);

	  // Useful for many curves
	  this.zero = new BN(0).toRed(this.red);
	  this.one = new BN(1).toRed(this.red);
	  this.two = new BN(2).toRed(this.red);

	  // Curve configuration, optional
	  this.n = conf.n && new BN(conf.n, 16);
	  this.g = conf.g && this.pointFromJSON(conf.g, conf.gRed);

	  // Temporary arrays
	  this._wnafT1 = new Array(4);
	  this._wnafT2 = new Array(4);
	  this._wnafT3 = new Array(4);
	  this._wnafT4 = new Array(4);

	  // Generalized Greg Maxwell's trick
	  var adjustCount = this.n && this.p.div(this.n);
	  if (!adjustCount || adjustCount.cmpn(100) > 0) {
	    this.redN = null;
	  } else {
	    this._maxwellTrick = true;
	    this.redN = this.n.toRed(this.red);
	  }
	}
	module.exports = BaseCurve;

	BaseCurve.prototype.point = function point() {
	  throw new Error('Not implemented');
	};

	BaseCurve.prototype.validate = function validate() {
	  throw new Error('Not implemented');
	};

	BaseCurve.prototype._fixedNafMul = function _fixedNafMul(p, k) {
	  assert(p.precomputed);
	  var doubles = p._getDoubles();

	  var naf = getNAF(k, 1);
	  var I = (1 << (doubles.step + 1)) - (doubles.step % 2 === 0 ? 2 : 1);
	  I /= 3;

	  // Translate into more windowed form
	  var repr = [];
	  for (var j = 0; j < naf.length; j += doubles.step) {
	    var nafW = 0;
	    for (var k = j + doubles.step - 1; k >= j; k--)
	      { nafW = (nafW << 1) + naf[k]; }
	    repr.push(nafW);
	  }

	  var a = this.jpoint(null, null, null);
	  var b = this.jpoint(null, null, null);
	  for (var i = I; i > 0; i--) {
	    for (var j = 0; j < repr.length; j++) {
	      var nafW = repr[j];
	      if (nafW === i)
	        { b = b.mixedAdd(doubles.points[j]); }
	      else if (nafW === -i)
	        { b = b.mixedAdd(doubles.points[j].neg()); }
	    }
	    a = a.add(b);
	  }
	  return a.toP();
	};

	BaseCurve.prototype._wnafMul = function _wnafMul(p, k) {
	  var w = 4;

	  // Precompute window
	  var nafPoints = p._getNAFPoints(w);
	  w = nafPoints.wnd;
	  var wnd = nafPoints.points;

	  // Get NAF form
	  var naf = getNAF(k, w);

	  // Add `this`*(N+1) for every w-NAF index
	  var acc = this.jpoint(null, null, null);
	  for (var i = naf.length - 1; i >= 0; i--) {
	    // Count zeroes
	    for (var k = 0; i >= 0 && naf[i] === 0; i--)
	      { k++; }
	    if (i >= 0)
	      { k++; }
	    acc = acc.dblp(k);

	    if (i < 0)
	      { break; }
	    var z = naf[i];
	    assert(z !== 0);
	    if (p.type === 'affine') {
	      // J +- P
	      if (z > 0)
	        { acc = acc.mixedAdd(wnd[(z - 1) >> 1]); }
	      else
	        { acc = acc.mixedAdd(wnd[(-z - 1) >> 1].neg()); }
	    } else {
	      // J +- J
	      if (z > 0)
	        { acc = acc.add(wnd[(z - 1) >> 1]); }
	      else
	        { acc = acc.add(wnd[(-z - 1) >> 1].neg()); }
	    }
	  }
	  return p.type === 'affine' ? acc.toP() : acc;
	};

	BaseCurve.prototype._wnafMulAdd = function _wnafMulAdd(defW,
	                                                       points,
	                                                       coeffs,
	                                                       len,
	                                                       jacobianResult) {
	  var wndWidth = this._wnafT1;
	  var wnd = this._wnafT2;
	  var naf = this._wnafT3;

	  // Fill all arrays
	  var max = 0;
	  for (var i = 0; i < len; i++) {
	    var p = points[i];
	    var nafPoints = p._getNAFPoints(defW);
	    wndWidth[i] = nafPoints.wnd;
	    wnd[i] = nafPoints.points;
	  }

	  // Comb small window NAFs
	  for (var i = len - 1; i >= 1; i -= 2) {
	    var a = i - 1;
	    var b = i;
	    if (wndWidth[a] !== 1 || wndWidth[b] !== 1) {
	      naf[a] = getNAF(coeffs[a], wndWidth[a]);
	      naf[b] = getNAF(coeffs[b], wndWidth[b]);
	      max = Math.max(naf[a].length, max);
	      max = Math.max(naf[b].length, max);
	      continue;
	    }

	    var comb = [
	      points[a], /* 1 */
	      null, /* 3 */
	      null, /* 5 */
	      points[b] /* 7 */
	    ];

	    // Try to avoid Projective points, if possible
	    if (points[a].y.cmp(points[b].y) === 0) {
	      comb[1] = points[a].add(points[b]);
	      comb[2] = points[a].toJ().mixedAdd(points[b].neg());
	    } else if (points[a].y.cmp(points[b].y.redNeg()) === 0) {
	      comb[1] = points[a].toJ().mixedAdd(points[b]);
	      comb[2] = points[a].add(points[b].neg());
	    } else {
	      comb[1] = points[a].toJ().mixedAdd(points[b]);
	      comb[2] = points[a].toJ().mixedAdd(points[b].neg());
	    }

	    var index = [
	      -3, /* -1 -1 */
	      -1, /* -1 0 */
	      -5, /* -1 1 */
	      -7, /* 0 -1 */
	      0, /* 0 0 */
	      7, /* 0 1 */
	      5, /* 1 -1 */
	      1, /* 1 0 */
	      3  /* 1 1 */
	    ];

	    var jsf = getJSF(coeffs[a], coeffs[b]);
	    max = Math.max(jsf[0].length, max);
	    naf[a] = new Array(max);
	    naf[b] = new Array(max);
	    for (var j = 0; j < max; j++) {
	      var ja = jsf[0][j] | 0;
	      var jb = jsf[1][j] | 0;

	      naf[a][j] = index[(ja + 1) * 3 + (jb + 1)];
	      naf[b][j] = 0;
	      wnd[a] = comb;
	    }
	  }

	  var acc = this.jpoint(null, null, null);
	  var tmp = this._wnafT4;
	  for (var i = max; i >= 0; i--) {
	    var k = 0;

	    while (i >= 0) {
	      var zero = true;
	      for (var j = 0; j < len; j++) {
	        tmp[j] = naf[j][i] | 0;
	        if (tmp[j] !== 0)
	          { zero = false; }
	      }
	      if (!zero)
	        { break; }
	      k++;
	      i--;
	    }
	    if (i >= 0)
	      { k++; }
	    acc = acc.dblp(k);
	    if (i < 0)
	      { break; }

	    for (var j = 0; j < len; j++) {
	      var z = tmp[j];
	      var p;
	      if (z === 0)
	        { continue; }
	      else if (z > 0)
	        { p = wnd[j][(z - 1) >> 1]; }
	      else if (z < 0)
	        { p = wnd[j][(-z - 1) >> 1].neg(); }

	      if (p.type === 'affine')
	        { acc = acc.mixedAdd(p); }
	      else
	        { acc = acc.add(p); }
	    }
	  }
	  // Zeroify references
	  for (var i = 0; i < len; i++)
	    { wnd[i] = null; }

	  if (jacobianResult)
	    { return acc; }
	  else
	    { return acc.toP(); }
	};

	function BasePoint(curve, type) {
	  this.curve = curve;
	  this.type = type;
	  this.precomputed = null;
	}
	BaseCurve.BasePoint = BasePoint;

	BasePoint.prototype.eq = function eq(/*other*/) {
	  throw new Error('Not implemented');
	};

	BasePoint.prototype.validate = function validate() {
	  return this.curve.validate(this);
	};

	BaseCurve.prototype.decodePoint = function decodePoint(bytes, enc) {
	  bytes = utils.toArray(bytes, enc);

	  var len = this.p.byteLength();

	  // uncompressed, hybrid-odd, hybrid-even
	  if ((bytes[0] === 0x04 || bytes[0] === 0x06 || bytes[0] === 0x07) &&
	      bytes.length - 1 === 2 * len) {
	    if (bytes[0] === 0x06)
	      { assert(bytes[bytes.length - 1] % 2 === 0); }
	    else if (bytes[0] === 0x07)
	      { assert(bytes[bytes.length - 1] % 2 === 1); }

	    var res =  this.point(bytes.slice(1, 1 + len),
	                          bytes.slice(1 + len, 1 + 2 * len));

	    return res;
	  } else if ((bytes[0] === 0x02 || bytes[0] === 0x03) &&
	              bytes.length - 1 === len) {
	    return this.pointFromX(bytes.slice(1, 1 + len), bytes[0] === 0x03);
	  }
	  throw new Error('Unknown point format');
	};

	BasePoint.prototype.encodeCompressed = function encodeCompressed(enc) {
	  return this.encode(enc, true);
	};

	BasePoint.prototype._encode = function _encode(compact) {
	  var len = this.curve.p.byteLength();
	  var x = this.getX().toArray('be', len);

	  if (compact)
	    { return [ this.getY().isEven() ? 0x02 : 0x03 ].concat(x); }

	  return [ 0x04 ].concat(x, this.getY().toArray('be', len)) ;
	};

	BasePoint.prototype.encode = function encode(enc, compact) {
	  return utils.encode(this._encode(compact), enc);
	};

	BasePoint.prototype.precompute = function precompute(power) {
	  if (this.precomputed)
	    { return this; }

	  var precomputed = {
	    doubles: null,
	    naf: null,
	    beta: null
	  };
	  precomputed.naf = this._getNAFPoints(8);
	  precomputed.doubles = this._getDoubles(4, power);
	  precomputed.beta = this._getBeta();
	  this.precomputed = precomputed;

	  return this;
	};

	BasePoint.prototype._hasDoubles = function _hasDoubles(k) {
	  if (!this.precomputed)
	    { return false; }

	  var doubles = this.precomputed.doubles;
	  if (!doubles)
	    { return false; }

	  return doubles.points.length >= Math.ceil((k.bitLength() + 1) / doubles.step);
	};

	BasePoint.prototype._getDoubles = function _getDoubles(step, power) {
	  if (this.precomputed && this.precomputed.doubles)
	    { return this.precomputed.doubles; }

	  var doubles = [ this ];
	  var acc = this;
	  for (var i = 0; i < power; i += step) {
	    for (var j = 0; j < step; j++)
	      { acc = acc.dbl(); }
	    doubles.push(acc);
	  }
	  return {
	    step: step,
	    points: doubles
	  };
	};

	BasePoint.prototype._getNAFPoints = function _getNAFPoints(wnd) {
	  if (this.precomputed && this.precomputed.naf)
	    { return this.precomputed.naf; }

	  var res = [ this ];
	  var max = (1 << wnd) - 1;
	  var dbl = max === 1 ? null : this.dbl();
	  for (var i = 1; i < max; i++)
	    { res[i] = res[i - 1].add(dbl); }
	  return {
	    wnd: wnd,
	    points: res
	  };
	};

	BasePoint.prototype._getBeta = function _getBeta() {
	  return null;
	};

	BasePoint.prototype.dblp = function dblp(k) {
	  var r = this;
	  for (var i = 0; i < k; i++)
	    { r = r.dbl(); }
	  return r;
	};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var curve = __webpack_require__(11);
	var elliptic = __webpack_require__(1);
	var BN = __webpack_require__(4);
	var inherits = __webpack_require__(14);
	var Base = curve.base;

	var assert = elliptic.utils.assert;

	function ShortCurve(conf) {
	  Base.call(this, 'short', conf);

	  this.a = new BN(conf.a, 16).toRed(this.red);
	  this.b = new BN(conf.b, 16).toRed(this.red);
	  this.tinv = this.two.redInvm();

	  this.zeroA = this.a.fromRed().cmpn(0) === 0;
	  this.threeA = this.a.fromRed().sub(this.p).cmpn(-3) === 0;

	  // If the curve is endomorphic, precalculate beta and lambda
	  this.endo = this._getEndomorphism(conf);
	  this._endoWnafT1 = new Array(4);
	  this._endoWnafT2 = new Array(4);
	}
	inherits(ShortCurve, Base);
	module.exports = ShortCurve;

	ShortCurve.prototype._getEndomorphism = function _getEndomorphism(conf) {
	  // No efficient endomorphism
	  if (!this.zeroA || !this.g || !this.n || this.p.modn(3) !== 1)
	    { return; }

	  // Compute beta and lambda, that lambda * P = (beta * Px; Py)
	  var beta;
	  var lambda;
	  if (conf.beta) {
	    beta = new BN(conf.beta, 16).toRed(this.red);
	  } else {
	    var betas = this._getEndoRoots(this.p);
	    // Choose the smallest beta
	    beta = betas[0].cmp(betas[1]) < 0 ? betas[0] : betas[1];
	    beta = beta.toRed(this.red);
	  }
	  if (conf.lambda) {
	    lambda = new BN(conf.lambda, 16);
	  } else {
	    // Choose the lambda that is matching selected beta
	    var lambdas = this._getEndoRoots(this.n);
	    if (this.g.mul(lambdas[0]).x.cmp(this.g.x.redMul(beta)) === 0) {
	      lambda = lambdas[0];
	    } else {
	      lambda = lambdas[1];
	      assert(this.g.mul(lambda).x.cmp(this.g.x.redMul(beta)) === 0);
	    }
	  }

	  // Get basis vectors, used for balanced length-two representation
	  var basis;
	  if (conf.basis) {
	    basis = conf.basis.map(function(vec) {
	      return {
	        a: new BN(vec.a, 16),
	        b: new BN(vec.b, 16)
	      };
	    });
	  } else {
	    basis = this._getEndoBasis(lambda);
	  }

	  return {
	    beta: beta,
	    lambda: lambda,
	    basis: basis
	  };
	};

	ShortCurve.prototype._getEndoRoots = function _getEndoRoots(num) {
	  // Find roots of for x^2 + x + 1 in F
	  // Root = (-1 +- Sqrt(-3)) / 2
	  //
	  var red = num === this.p ? this.red : BN.mont(num);
	  var tinv = new BN(2).toRed(red).redInvm();
	  var ntinv = tinv.redNeg();

	  var s = new BN(3).toRed(red).redNeg().redSqrt().redMul(tinv);

	  var l1 = ntinv.redAdd(s).fromRed();
	  var l2 = ntinv.redSub(s).fromRed();
	  return [ l1, l2 ];
	};

	ShortCurve.prototype._getEndoBasis = function _getEndoBasis(lambda) {
	  // aprxSqrt >= sqrt(this.n)
	  var aprxSqrt = this.n.ushrn(Math.floor(this.n.bitLength() / 2));

	  // 3.74
	  // Run EGCD, until r(L + 1) < aprxSqrt
	  var u = lambda;
	  var v = this.n.clone();
	  var x1 = new BN(1);
	  var y1 = new BN(0);
	  var x2 = new BN(0);
	  var y2 = new BN(1);

	  // NOTE: all vectors are roots of: a + b * lambda = 0 (mod n)
	  var a0;
	  var b0;
	  // First vector
	  var a1;
	  var b1;
	  // Second vector
	  var a2;
	  var b2;

	  var prevR;
	  var i = 0;
	  var r;
	  var x;
	  while (u.cmpn(0) !== 0) {
	    var q = v.div(u);
	    r = v.sub(q.mul(u));
	    x = x2.sub(q.mul(x1));
	    var y = y2.sub(q.mul(y1));

	    if (!a1 && r.cmp(aprxSqrt) < 0) {
	      a0 = prevR.neg();
	      b0 = x1;
	      a1 = r.neg();
	      b1 = x;
	    } else if (a1 && ++i === 2) {
	      break;
	    }
	    prevR = r;

	    v = u;
	    u = r;
	    x2 = x1;
	    x1 = x;
	    y2 = y1;
	    y1 = y;
	  }
	  a2 = r.neg();
	  b2 = x;

	  var len1 = a1.sqr().add(b1.sqr());
	  var len2 = a2.sqr().add(b2.sqr());
	  if (len2.cmp(len1) >= 0) {
	    a2 = a0;
	    b2 = b0;
	  }

	  // Normalize signs
	  if (a1.negative) {
	    a1 = a1.neg();
	    b1 = b1.neg();
	  }
	  if (a2.negative) {
	    a2 = a2.neg();
	    b2 = b2.neg();
	  }

	  return [
	    { a: a1, b: b1 },
	    { a: a2, b: b2 }
	  ];
	};

	ShortCurve.prototype._endoSplit = function _endoSplit(k) {
	  var basis = this.endo.basis;
	  var v1 = basis[0];
	  var v2 = basis[1];

	  var c1 = v2.b.mul(k).divRound(this.n);
	  var c2 = v1.b.neg().mul(k).divRound(this.n);

	  var p1 = c1.mul(v1.a);
	  var p2 = c2.mul(v2.a);
	  var q1 = c1.mul(v1.b);
	  var q2 = c2.mul(v2.b);

	  // Calculate answer
	  var k1 = k.sub(p1).sub(p2);
	  var k2 = q1.add(q2).neg();
	  return { k1: k1, k2: k2 };
	};

	ShortCurve.prototype.pointFromX = function pointFromX(x, odd) {
	  x = new BN(x, 16);
	  if (!x.red)
	    { x = x.toRed(this.red); }

	  var y2 = x.redSqr().redMul(x).redIAdd(x.redMul(this.a)).redIAdd(this.b);
	  var y = y2.redSqrt();
	  if (y.redSqr().redSub(y2).cmp(this.zero) !== 0)
	    { throw new Error('invalid point'); }

	  // XXX Is there any way to tell if the number is odd without converting it
	  // to non-red form?
	  var isOdd = y.fromRed().isOdd();
	  if (odd && !isOdd || !odd && isOdd)
	    { y = y.redNeg(); }

	  return this.point(x, y);
	};

	ShortCurve.prototype.validate = function validate(point) {
	  if (point.inf)
	    { return true; }

	  var x = point.x;
	  var y = point.y;

	  var ax = this.a.redMul(x);
	  var rhs = x.redSqr().redMul(x).redIAdd(ax).redIAdd(this.b);
	  return y.redSqr().redISub(rhs).cmpn(0) === 0;
	};

	ShortCurve.prototype._endoWnafMulAdd =
	    function _endoWnafMulAdd(points, coeffs, jacobianResult) {
	  var this$1 = this;

	  var npoints = this._endoWnafT1;
	  var ncoeffs = this._endoWnafT2;
	  for (var i = 0; i < points.length; i++) {
	    var split = this$1._endoSplit(coeffs[i]);
	    var p = points[i];
	    var beta = p._getBeta();

	    if (split.k1.negative) {
	      split.k1.ineg();
	      p = p.neg(true);
	    }
	    if (split.k2.negative) {
	      split.k2.ineg();
	      beta = beta.neg(true);
	    }

	    npoints[i * 2] = p;
	    npoints[i * 2 + 1] = beta;
	    ncoeffs[i * 2] = split.k1;
	    ncoeffs[i * 2 + 1] = split.k2;
	  }
	  var res = this._wnafMulAdd(1, npoints, ncoeffs, i * 2, jacobianResult);

	  // Clean-up references to points and coefficients
	  for (var j = 0; j < i * 2; j++) {
	    npoints[j] = null;
	    ncoeffs[j] = null;
	  }
	  return res;
	};

	function Point(curve, x, y, isRed) {
	  Base.BasePoint.call(this, curve, 'affine');
	  if (x === null && y === null) {
	    this.x = null;
	    this.y = null;
	    this.inf = true;
	  } else {
	    this.x = new BN(x, 16);
	    this.y = new BN(y, 16);
	    // Force redgomery representation when loading from JSON
	    if (isRed) {
	      this.x.forceRed(this.curve.red);
	      this.y.forceRed(this.curve.red);
	    }
	    if (!this.x.red)
	      { this.x = this.x.toRed(this.curve.red); }
	    if (!this.y.red)
	      { this.y = this.y.toRed(this.curve.red); }
	    this.inf = false;
	  }
	}
	inherits(Point, Base.BasePoint);

	ShortCurve.prototype.point = function point(x, y, isRed) {
	  return new Point(this, x, y, isRed);
	};

	ShortCurve.prototype.pointFromJSON = function pointFromJSON(obj, red) {
	  return Point.fromJSON(this, obj, red);
	};

	Point.prototype._getBeta = function _getBeta() {
	  if (!this.curve.endo)
	    { return; }

	  var pre = this.precomputed;
	  if (pre && pre.beta)
	    { return pre.beta; }

	  var beta = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
	  if (pre) {
	    var curve = this.curve;
	    var endoMul = function(p) {
	      return curve.point(p.x.redMul(curve.endo.beta), p.y);
	    };
	    pre.beta = beta;
	    beta.precomputed = {
	      beta: null,
	      naf: pre.naf && {
	        wnd: pre.naf.wnd,
	        points: pre.naf.points.map(endoMul)
	      },
	      doubles: pre.doubles && {
	        step: pre.doubles.step,
	        points: pre.doubles.points.map(endoMul)
	      }
	    };
	  }
	  return beta;
	};

	Point.prototype.toJSON = function toJSON() {
	  if (!this.precomputed)
	    { return [ this.x, this.y ]; }

	  return [ this.x, this.y, this.precomputed && {
	    doubles: this.precomputed.doubles && {
	      step: this.precomputed.doubles.step,
	      points: this.precomputed.doubles.points.slice(1)
	    },
	    naf: this.precomputed.naf && {
	      wnd: this.precomputed.naf.wnd,
	      points: this.precomputed.naf.points.slice(1)
	    }
	  } ];
	};

	Point.fromJSON = function fromJSON(curve, obj, red) {
	  if (typeof obj === 'string')
	    { obj = JSON.parse(obj); }
	  var res = curve.point(obj[0], obj[1], red);
	  if (!obj[2])
	    { return res; }

	  function obj2point(obj) {
	    return curve.point(obj[0], obj[1], red);
	  }

	  var pre = obj[2];
	  res.precomputed = {
	    beta: null,
	    doubles: pre.doubles && {
	      step: pre.doubles.step,
	      points: [ res ].concat(pre.doubles.points.map(obj2point))
	    },
	    naf: pre.naf && {
	      wnd: pre.naf.wnd,
	      points: [ res ].concat(pre.naf.points.map(obj2point))
	    }
	  };
	  return res;
	};

	Point.prototype.inspect = function inspect() {
	  if (this.isInfinity())
	    { return '<EC Point Infinity>'; }
	  return '<EC Point x: ' + this.x.fromRed().toString(16, 2) +
	      ' y: ' + this.y.fromRed().toString(16, 2) + '>';
	};

	Point.prototype.isInfinity = function isInfinity() {
	  return this.inf;
	};

	Point.prototype.add = function add(p) {
	  // O + P = P
	  if (this.inf)
	    { return p; }

	  // P + O = P
	  if (p.inf)
	    { return this; }

	  // P + P = 2P
	  if (this.eq(p))
	    { return this.dbl(); }

	  // P + (-P) = O
	  if (this.neg().eq(p))
	    { return this.curve.point(null, null); }

	  // P + Q = O
	  if (this.x.cmp(p.x) === 0)
	    { return this.curve.point(null, null); }

	  var c = this.y.redSub(p.y);
	  if (c.cmpn(0) !== 0)
	    { c = c.redMul(this.x.redSub(p.x).redInvm()); }
	  var nx = c.redSqr().redISub(this.x).redISub(p.x);
	  var ny = c.redMul(this.x.redSub(nx)).redISub(this.y);
	  return this.curve.point(nx, ny);
	};

	Point.prototype.dbl = function dbl() {
	  if (this.inf)
	    { return this; }

	  // 2P = O
	  var ys1 = this.y.redAdd(this.y);
	  if (ys1.cmpn(0) === 0)
	    { return this.curve.point(null, null); }

	  var a = this.curve.a;

	  var x2 = this.x.redSqr();
	  var dyinv = ys1.redInvm();
	  var c = x2.redAdd(x2).redIAdd(x2).redIAdd(a).redMul(dyinv);

	  var nx = c.redSqr().redISub(this.x.redAdd(this.x));
	  var ny = c.redMul(this.x.redSub(nx)).redISub(this.y);
	  return this.curve.point(nx, ny);
	};

	Point.prototype.getX = function getX() {
	  return this.x.fromRed();
	};

	Point.prototype.getY = function getY() {
	  return this.y.fromRed();
	};

	Point.prototype.mul = function mul(k) {
	  k = new BN(k, 16);

	  if (this._hasDoubles(k))
	    { return this.curve._fixedNafMul(this, k); }
	  else if (this.curve.endo)
	    { return this.curve._endoWnafMulAdd([ this ], [ k ]); }
	  else
	    { return this.curve._wnafMul(this, k); }
	};

	Point.prototype.mulAdd = function mulAdd(k1, p2, k2) {
	  var points = [ this, p2 ];
	  var coeffs = [ k1, k2 ];
	  if (this.curve.endo)
	    { return this.curve._endoWnafMulAdd(points, coeffs); }
	  else
	    { return this.curve._wnafMulAdd(1, points, coeffs, 2); }
	};

	Point.prototype.jmulAdd = function jmulAdd(k1, p2, k2) {
	  var points = [ this, p2 ];
	  var coeffs = [ k1, k2 ];
	  if (this.curve.endo)
	    { return this.curve._endoWnafMulAdd(points, coeffs, true); }
	  else
	    { return this.curve._wnafMulAdd(1, points, coeffs, 2, true); }
	};

	Point.prototype.eq = function eq(p) {
	  return this === p ||
	         this.inf === p.inf &&
	             (this.inf || this.x.cmp(p.x) === 0 && this.y.cmp(p.y) === 0);
	};

	Point.prototype.neg = function neg(_precompute) {
	  if (this.inf)
	    { return this; }

	  var res = this.curve.point(this.x, this.y.redNeg());
	  if (_precompute && this.precomputed) {
	    var pre = this.precomputed;
	    var negate = function(p) {
	      return p.neg();
	    };
	    res.precomputed = {
	      naf: pre.naf && {
	        wnd: pre.naf.wnd,
	        points: pre.naf.points.map(negate)
	      },
	      doubles: pre.doubles && {
	        step: pre.doubles.step,
	        points: pre.doubles.points.map(negate)
	      }
	    };
	  }
	  return res;
	};

	Point.prototype.toJ = function toJ() {
	  if (this.inf)
	    { return this.curve.jpoint(null, null, null); }

	  var res = this.curve.jpoint(this.x, this.y, this.curve.one);
	  return res;
	};

	function JPoint(curve, x, y, z) {
	  Base.BasePoint.call(this, curve, 'jacobian');
	  if (x === null && y === null && z === null) {
	    this.x = this.curve.one;
	    this.y = this.curve.one;
	    this.z = new BN(0);
	  } else {
	    this.x = new BN(x, 16);
	    this.y = new BN(y, 16);
	    this.z = new BN(z, 16);
	  }
	  if (!this.x.red)
	    { this.x = this.x.toRed(this.curve.red); }
	  if (!this.y.red)
	    { this.y = this.y.toRed(this.curve.red); }
	  if (!this.z.red)
	    { this.z = this.z.toRed(this.curve.red); }

	  this.zOne = this.z === this.curve.one;
	}
	inherits(JPoint, Base.BasePoint);

	ShortCurve.prototype.jpoint = function jpoint(x, y, z) {
	  return new JPoint(this, x, y, z);
	};

	JPoint.prototype.toP = function toP() {
	  if (this.isInfinity())
	    { return this.curve.point(null, null); }

	  var zinv = this.z.redInvm();
	  var zinv2 = zinv.redSqr();
	  var ax = this.x.redMul(zinv2);
	  var ay = this.y.redMul(zinv2).redMul(zinv);

	  return this.curve.point(ax, ay);
	};

	JPoint.prototype.neg = function neg() {
	  return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
	};

	JPoint.prototype.add = function add(p) {
	  // O + P = P
	  if (this.isInfinity())
	    { return p; }

	  // P + O = P
	  if (p.isInfinity())
	    { return this; }

	  // 12M + 4S + 7A
	  var pz2 = p.z.redSqr();
	  var z2 = this.z.redSqr();
	  var u1 = this.x.redMul(pz2);
	  var u2 = p.x.redMul(z2);
	  var s1 = this.y.redMul(pz2.redMul(p.z));
	  var s2 = p.y.redMul(z2.redMul(this.z));

	  var h = u1.redSub(u2);
	  var r = s1.redSub(s2);
	  if (h.cmpn(0) === 0) {
	    if (r.cmpn(0) !== 0)
	      { return this.curve.jpoint(null, null, null); }
	    else
	      { return this.dbl(); }
	  }

	  var h2 = h.redSqr();
	  var h3 = h2.redMul(h);
	  var v = u1.redMul(h2);

	  var nx = r.redSqr().redIAdd(h3).redISub(v).redISub(v);
	  var ny = r.redMul(v.redISub(nx)).redISub(s1.redMul(h3));
	  var nz = this.z.redMul(p.z).redMul(h);

	  return this.curve.jpoint(nx, ny, nz);
	};

	JPoint.prototype.mixedAdd = function mixedAdd(p) {
	  // O + P = P
	  if (this.isInfinity())
	    { return p.toJ(); }

	  // P + O = P
	  if (p.isInfinity())
	    { return this; }

	  // 8M + 3S + 7A
	  var z2 = this.z.redSqr();
	  var u1 = this.x;
	  var u2 = p.x.redMul(z2);
	  var s1 = this.y;
	  var s2 = p.y.redMul(z2).redMul(this.z);

	  var h = u1.redSub(u2);
	  var r = s1.redSub(s2);
	  if (h.cmpn(0) === 0) {
	    if (r.cmpn(0) !== 0)
	      { return this.curve.jpoint(null, null, null); }
	    else
	      { return this.dbl(); }
	  }

	  var h2 = h.redSqr();
	  var h3 = h2.redMul(h);
	  var v = u1.redMul(h2);

	  var nx = r.redSqr().redIAdd(h3).redISub(v).redISub(v);
	  var ny = r.redMul(v.redISub(nx)).redISub(s1.redMul(h3));
	  var nz = this.z.redMul(h);

	  return this.curve.jpoint(nx, ny, nz);
	};

	JPoint.prototype.dblp = function dblp(pow) {
	  if (pow === 0)
	    { return this; }
	  if (this.isInfinity())
	    { return this; }
	  if (!pow)
	    { return this.dbl(); }

	  if (this.curve.zeroA || this.curve.threeA) {
	    var r = this;
	    for (var i = 0; i < pow; i++)
	      { r = r.dbl(); }
	    return r;
	  }

	  // 1M + 2S + 1A + N * (4S + 5M + 8A)
	  // N = 1 => 6M + 6S + 9A
	  var a = this.curve.a;
	  var tinv = this.curve.tinv;

	  var jx = this.x;
	  var jy = this.y;
	  var jz = this.z;
	  var jz4 = jz.redSqr().redSqr();

	  // Reuse results
	  var jyd = jy.redAdd(jy);
	  for (var i = 0; i < pow; i++) {
	    var jx2 = jx.redSqr();
	    var jyd2 = jyd.redSqr();
	    var jyd4 = jyd2.redSqr();
	    var c = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a.redMul(jz4));

	    var t1 = jx.redMul(jyd2);
	    var nx = c.redSqr().redISub(t1.redAdd(t1));
	    var t2 = t1.redISub(nx);
	    var dny = c.redMul(t2);
	    dny = dny.redIAdd(dny).redISub(jyd4);
	    var nz = jyd.redMul(jz);
	    if (i + 1 < pow)
	      { jz4 = jz4.redMul(jyd4); }

	    jx = nx;
	    jz = nz;
	    jyd = dny;
	  }

	  return this.curve.jpoint(jx, jyd.redMul(tinv), jz);
	};

	JPoint.prototype.dbl = function dbl() {
	  if (this.isInfinity())
	    { return this; }

	  if (this.curve.zeroA)
	    { return this._zeroDbl(); }
	  else if (this.curve.threeA)
	    { return this._threeDbl(); }
	  else
	    { return this._dbl(); }
	};

	JPoint.prototype._zeroDbl = function _zeroDbl() {
	  var nx;
	  var ny;
	  var nz;
	  // Z = 1
	  if (this.zOne) {
	    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html
	    //     #doubling-mdbl-2007-bl
	    // 1M + 5S + 14A

	    // XX = X1^2
	    var xx = this.x.redSqr();
	    // YY = Y1^2
	    var yy = this.y.redSqr();
	    // YYYY = YY^2
	    var yyyy = yy.redSqr();
	    // S = 2 * ((X1 + YY)^2 - XX - YYYY)
	    var s = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
	    s = s.redIAdd(s);
	    // M = 3 * XX + a; a = 0
	    var m = xx.redAdd(xx).redIAdd(xx);
	    // T = M ^ 2 - 2*S
	    var t = m.redSqr().redISub(s).redISub(s);

	    // 8 * YYYY
	    var yyyy8 = yyyy.redIAdd(yyyy);
	    yyyy8 = yyyy8.redIAdd(yyyy8);
	    yyyy8 = yyyy8.redIAdd(yyyy8);

	    // X3 = T
	    nx = t;
	    // Y3 = M * (S - T) - 8 * YYYY
	    ny = m.redMul(s.redISub(t)).redISub(yyyy8);
	    // Z3 = 2*Y1
	    nz = this.y.redAdd(this.y);
	  } else {
	    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html
	    //     #doubling-dbl-2009-l
	    // 2M + 5S + 13A

	    // A = X1^2
	    var a = this.x.redSqr();
	    // B = Y1^2
	    var b = this.y.redSqr();
	    // C = B^2
	    var c = b.redSqr();
	    // D = 2 * ((X1 + B)^2 - A - C)
	    var d = this.x.redAdd(b).redSqr().redISub(a).redISub(c);
	    d = d.redIAdd(d);
	    // E = 3 * A
	    var e = a.redAdd(a).redIAdd(a);
	    // F = E^2
	    var f = e.redSqr();

	    // 8 * C
	    var c8 = c.redIAdd(c);
	    c8 = c8.redIAdd(c8);
	    c8 = c8.redIAdd(c8);

	    // X3 = F - 2 * D
	    nx = f.redISub(d).redISub(d);
	    // Y3 = E * (D - X3) - 8 * C
	    ny = e.redMul(d.redISub(nx)).redISub(c8);
	    // Z3 = 2 * Y1 * Z1
	    nz = this.y.redMul(this.z);
	    nz = nz.redIAdd(nz);
	  }

	  return this.curve.jpoint(nx, ny, nz);
	};

	JPoint.prototype._threeDbl = function _threeDbl() {
	  var nx;
	  var ny;
	  var nz;
	  // Z = 1
	  if (this.zOne) {
	    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-3.html
	    //     #doubling-mdbl-2007-bl
	    // 1M + 5S + 15A

	    // XX = X1^2
	    var xx = this.x.redSqr();
	    // YY = Y1^2
	    var yy = this.y.redSqr();
	    // YYYY = YY^2
	    var yyyy = yy.redSqr();
	    // S = 2 * ((X1 + YY)^2 - XX - YYYY)
	    var s = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
	    s = s.redIAdd(s);
	    // M = 3 * XX + a
	    var m = xx.redAdd(xx).redIAdd(xx).redIAdd(this.curve.a);
	    // T = M^2 - 2 * S
	    var t = m.redSqr().redISub(s).redISub(s);
	    // X3 = T
	    nx = t;
	    // Y3 = M * (S - T) - 8 * YYYY
	    var yyyy8 = yyyy.redIAdd(yyyy);
	    yyyy8 = yyyy8.redIAdd(yyyy8);
	    yyyy8 = yyyy8.redIAdd(yyyy8);
	    ny = m.redMul(s.redISub(t)).redISub(yyyy8);
	    // Z3 = 2 * Y1
	    nz = this.y.redAdd(this.y);
	  } else {
	    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-3.html#doubling-dbl-2001-b
	    // 3M + 5S

	    // delta = Z1^2
	    var delta = this.z.redSqr();
	    // gamma = Y1^2
	    var gamma = this.y.redSqr();
	    // beta = X1 * gamma
	    var beta = this.x.redMul(gamma);
	    // alpha = 3 * (X1 - delta) * (X1 + delta)
	    var alpha = this.x.redSub(delta).redMul(this.x.redAdd(delta));
	    alpha = alpha.redAdd(alpha).redIAdd(alpha);
	    // X3 = alpha^2 - 8 * beta
	    var beta4 = beta.redIAdd(beta);
	    beta4 = beta4.redIAdd(beta4);
	    var beta8 = beta4.redAdd(beta4);
	    nx = alpha.redSqr().redISub(beta8);
	    // Z3 = (Y1 + Z1)^2 - gamma - delta
	    nz = this.y.redAdd(this.z).redSqr().redISub(gamma).redISub(delta);
	    // Y3 = alpha * (4 * beta - X3) - 8 * gamma^2
	    var ggamma8 = gamma.redSqr();
	    ggamma8 = ggamma8.redIAdd(ggamma8);
	    ggamma8 = ggamma8.redIAdd(ggamma8);
	    ggamma8 = ggamma8.redIAdd(ggamma8);
	    ny = alpha.redMul(beta4.redISub(nx)).redISub(ggamma8);
	  }

	  return this.curve.jpoint(nx, ny, nz);
	};

	JPoint.prototype._dbl = function _dbl() {
	  var a = this.curve.a;

	  // 4M + 6S + 10A
	  var jx = this.x;
	  var jy = this.y;
	  var jz = this.z;
	  var jz4 = jz.redSqr().redSqr();

	  var jx2 = jx.redSqr();
	  var jy2 = jy.redSqr();

	  var c = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a.redMul(jz4));

	  var jxd4 = jx.redAdd(jx);
	  jxd4 = jxd4.redIAdd(jxd4);
	  var t1 = jxd4.redMul(jy2);
	  var nx = c.redSqr().redISub(t1.redAdd(t1));
	  var t2 = t1.redISub(nx);

	  var jyd8 = jy2.redSqr();
	  jyd8 = jyd8.redIAdd(jyd8);
	  jyd8 = jyd8.redIAdd(jyd8);
	  jyd8 = jyd8.redIAdd(jyd8);
	  var ny = c.redMul(t2).redISub(jyd8);
	  var nz = jy.redAdd(jy).redMul(jz);

	  return this.curve.jpoint(nx, ny, nz);
	};

	JPoint.prototype.trpl = function trpl() {
	  if (!this.curve.zeroA)
	    { return this.dbl().add(this); }

	  // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html#tripling-tpl-2007-bl
	  // 5M + 10S + ...

	  // XX = X1^2
	  var xx = this.x.redSqr();
	  // YY = Y1^2
	  var yy = this.y.redSqr();
	  // ZZ = Z1^2
	  var zz = this.z.redSqr();
	  // YYYY = YY^2
	  var yyyy = yy.redSqr();
	  // M = 3 * XX + a * ZZ2; a = 0
	  var m = xx.redAdd(xx).redIAdd(xx);
	  // MM = M^2
	  var mm = m.redSqr();
	  // E = 6 * ((X1 + YY)^2 - XX - YYYY) - MM
	  var e = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
	  e = e.redIAdd(e);
	  e = e.redAdd(e).redIAdd(e);
	  e = e.redISub(mm);
	  // EE = E^2
	  var ee = e.redSqr();
	  // T = 16*YYYY
	  var t = yyyy.redIAdd(yyyy);
	  t = t.redIAdd(t);
	  t = t.redIAdd(t);
	  t = t.redIAdd(t);
	  // U = (M + E)^2 - MM - EE - T
	  var u = m.redIAdd(e).redSqr().redISub(mm).redISub(ee).redISub(t);
	  // X3 = 4 * (X1 * EE - 4 * YY * U)
	  var yyu4 = yy.redMul(u);
	  yyu4 = yyu4.redIAdd(yyu4);
	  yyu4 = yyu4.redIAdd(yyu4);
	  var nx = this.x.redMul(ee).redISub(yyu4);
	  nx = nx.redIAdd(nx);
	  nx = nx.redIAdd(nx);
	  // Y3 = 8 * Y1 * (U * (T - U) - E * EE)
	  var ny = this.y.redMul(u.redMul(t.redISub(u)).redISub(e.redMul(ee)));
	  ny = ny.redIAdd(ny);
	  ny = ny.redIAdd(ny);
	  ny = ny.redIAdd(ny);
	  // Z3 = (Z1 + E)^2 - ZZ - EE
	  var nz = this.z.redAdd(e).redSqr().redISub(zz).redISub(ee);

	  return this.curve.jpoint(nx, ny, nz);
	};

	JPoint.prototype.mul = function mul(k, kbase) {
	  k = new BN(k, kbase);

	  return this.curve._wnafMul(this, k);
	};

	JPoint.prototype.eq = function eq(p) {
	  if (p.type === 'affine')
	    { return this.eq(p.toJ()); }

	  if (this === p)
	    { return true; }

	  // x1 * z2^2 == x2 * z1^2
	  var z2 = this.z.redSqr();
	  var pz2 = p.z.redSqr();
	  if (this.x.redMul(pz2).redISub(p.x.redMul(z2)).cmpn(0) !== 0)
	    { return false; }

	  // y1 * z2^3 == y2 * z1^3
	  var z3 = z2.redMul(this.z);
	  var pz3 = pz2.redMul(p.z);
	  return this.y.redMul(pz3).redISub(p.y.redMul(z3)).cmpn(0) === 0;
	};

	JPoint.prototype.eqXToP = function eqXToP(x) {
	  var this$1 = this;

	  var zs = this.z.redSqr();
	  var rx = x.toRed(this.curve.red).redMul(zs);
	  if (this.x.cmp(rx) === 0)
	    { return true; }

	  var xc = x.clone();
	  var t = this.curve.redN.redMul(zs);
	  for (;;) {
	    xc.iadd(this$1.curve.n);
	    if (xc.cmp(this$1.curve.p) >= 0)
	      { return false; }

	    rx.redIAdd(t);
	    if (this$1.x.cmp(rx) === 0)
	      { return true; }
	  }
	  return false;
	};

	JPoint.prototype.inspect = function inspect() {
	  if (this.isInfinity())
	    { return '<EC JPoint Infinity>'; }
	  return '<EC JPoint x: ' + this.x.toString(16, 2) +
	      ' y: ' + this.y.toString(16, 2) +
	      ' z: ' + this.z.toString(16, 2) + '>';
	};

	JPoint.prototype.isInfinity = function isInfinity() {
	  // XXX This code assumes that zero is always zero in red
	  return this.z.cmpn(0) === 0;
	};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor;
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor;
	    var TempCtor = function () {};
	    TempCtor.prototype = superCtor.prototype;
	    ctor.prototype = new TempCtor();
	    ctor.prototype.constructor = ctor;
	  };
	}


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var curve = __webpack_require__(11);
	var BN = __webpack_require__(4);
	var inherits = __webpack_require__(14);
	var Base = curve.base;

	var elliptic = __webpack_require__(1);
	var utils = elliptic.utils;

	function MontCurve(conf) {
	  Base.call(this, 'mont', conf);

	  this.a = new BN(conf.a, 16).toRed(this.red);
	  this.b = new BN(conf.b, 16).toRed(this.red);
	  this.i4 = new BN(4).toRed(this.red).redInvm();
	  this.two = new BN(2).toRed(this.red);
	  this.a24 = this.i4.redMul(this.a.redAdd(this.two));
	}
	inherits(MontCurve, Base);
	module.exports = MontCurve;

	MontCurve.prototype.validate = function validate(point) {
	  var x = point.normalize().x;
	  var x2 = x.redSqr();
	  var rhs = x2.redMul(x).redAdd(x2.redMul(this.a)).redAdd(x);
	  var y = rhs.redSqrt();

	  return y.redSqr().cmp(rhs) === 0;
	};

	function Point(curve, x, z) {
	  Base.BasePoint.call(this, curve, 'projective');
	  if (x === null && z === null) {
	    this.x = this.curve.one;
	    this.z = this.curve.zero;
	  } else {
	    this.x = new BN(x, 16);
	    this.z = new BN(z, 16);
	    if (!this.x.red)
	      { this.x = this.x.toRed(this.curve.red); }
	    if (!this.z.red)
	      { this.z = this.z.toRed(this.curve.red); }
	  }
	}
	inherits(Point, Base.BasePoint);

	MontCurve.prototype.decodePoint = function decodePoint(bytes, enc) {
	  return this.point(utils.toArray(bytes, enc), 1);
	};

	MontCurve.prototype.point = function point(x, z) {
	  return new Point(this, x, z);
	};

	MontCurve.prototype.pointFromJSON = function pointFromJSON(obj) {
	  return Point.fromJSON(this, obj);
	};

	Point.prototype.precompute = function precompute() {
	  // No-op
	};

	Point.prototype._encode = function _encode() {
	  return this.getX().toArray('be', this.curve.p.byteLength());
	};

	Point.fromJSON = function fromJSON(curve, obj) {
	  return new Point(curve, obj[0], obj[1] || curve.one);
	};

	Point.prototype.inspect = function inspect() {
	  if (this.isInfinity())
	    { return '<EC Point Infinity>'; }
	  return '<EC Point x: ' + this.x.fromRed().toString(16, 2) +
	      ' z: ' + this.z.fromRed().toString(16, 2) + '>';
	};

	Point.prototype.isInfinity = function isInfinity() {
	  // XXX This code assumes that zero is always zero in red
	  return this.z.cmpn(0) === 0;
	};

	Point.prototype.dbl = function dbl() {
	  // http://hyperelliptic.org/EFD/g1p/auto-montgom-xz.html#doubling-dbl-1987-m-3
	  // 2M + 2S + 4A

	  // A = X1 + Z1
	  var a = this.x.redAdd(this.z);
	  // AA = A^2
	  var aa = a.redSqr();
	  // B = X1 - Z1
	  var b = this.x.redSub(this.z);
	  // BB = B^2
	  var bb = b.redSqr();
	  // C = AA - BB
	  var c = aa.redSub(bb);
	  // X3 = AA * BB
	  var nx = aa.redMul(bb);
	  // Z3 = C * (BB + A24 * C)
	  var nz = c.redMul(bb.redAdd(this.curve.a24.redMul(c)));
	  return this.curve.point(nx, nz);
	};

	Point.prototype.add = function add() {
	  throw new Error('Not supported on Montgomery curve');
	};

	Point.prototype.diffAdd = function diffAdd(p, diff) {
	  // http://hyperelliptic.org/EFD/g1p/auto-montgom-xz.html#diffadd-dadd-1987-m-3
	  // 4M + 2S + 6A

	  // A = X2 + Z2
	  var a = this.x.redAdd(this.z);
	  // B = X2 - Z2
	  var b = this.x.redSub(this.z);
	  // C = X3 + Z3
	  var c = p.x.redAdd(p.z);
	  // D = X3 - Z3
	  var d = p.x.redSub(p.z);
	  // DA = D * A
	  var da = d.redMul(a);
	  // CB = C * B
	  var cb = c.redMul(b);
	  // X5 = Z1 * (DA + CB)^2
	  var nx = diff.z.redMul(da.redAdd(cb).redSqr());
	  // Z5 = X1 * (DA - CB)^2
	  var nz = diff.x.redMul(da.redISub(cb).redSqr());
	  return this.curve.point(nx, nz);
	};

	Point.prototype.mul = function mul(k) {
	  var t = k.clone();
	  var a = this; // (N / 2) * Q + Q
	  var b = this.curve.point(null, null); // (N / 2) * Q
	  var c = this; // Q

	  for (var bits = []; t.cmpn(0) !== 0; t.iushrn(1))
	    { bits.push(t.andln(1)); }

	  for (var i = bits.length - 1; i >= 0; i--) {
	    if (bits[i] === 0) {
	      // N * Q + Q = ((N / 2) * Q + Q)) + (N / 2) * Q
	      a = a.diffAdd(b, c);
	      // N * Q = 2 * ((N / 2) * Q + Q))
	      b = b.dbl();
	    } else {
	      // N * Q = ((N / 2) * Q + Q) + ((N / 2) * Q)
	      b = a.diffAdd(b, c);
	      // N * Q + Q = 2 * ((N / 2) * Q + Q)
	      a = a.dbl();
	    }
	  }
	  return b;
	};

	Point.prototype.mulAdd = function mulAdd() {
	  throw new Error('Not supported on Montgomery curve');
	};

	Point.prototype.jumlAdd = function jumlAdd() {
	  throw new Error('Not supported on Montgomery curve');
	};

	Point.prototype.eq = function eq(other) {
	  return this.getX().cmp(other.getX()) === 0;
	};

	Point.prototype.normalize = function normalize() {
	  this.x = this.x.redMul(this.z.redInvm());
	  this.z = this.curve.one;
	  return this;
	};

	Point.prototype.getX = function getX() {
	  // Normalize coordinates
	  this.normalize();

	  return this.x.fromRed();
	};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var curve = __webpack_require__(11);
	var elliptic = __webpack_require__(1);
	var BN = __webpack_require__(4);
	var inherits = __webpack_require__(14);
	var Base = curve.base;

	var assert = elliptic.utils.assert;

	function EdwardsCurve(conf) {
	  // NOTE: Important as we are creating point in Base.call()
	  this.twisted = (conf.a | 0) !== 1;
	  this.mOneA = this.twisted && (conf.a | 0) === -1;
	  this.extended = this.mOneA;

	  Base.call(this, 'edwards', conf);

	  this.a = new BN(conf.a, 16).umod(this.red.m);
	  this.a = this.a.toRed(this.red);
	  this.c = new BN(conf.c, 16).toRed(this.red);
	  this.c2 = this.c.redSqr();
	  this.d = new BN(conf.d, 16).toRed(this.red);
	  this.dd = this.d.redAdd(this.d);

	  assert(!this.twisted || this.c.fromRed().cmpn(1) === 0);
	  this.oneC = (conf.c | 0) === 1;
	}
	inherits(EdwardsCurve, Base);
	module.exports = EdwardsCurve;

	EdwardsCurve.prototype._mulA = function _mulA(num) {
	  if (this.mOneA)
	    { return num.redNeg(); }
	  else
	    { return this.a.redMul(num); }
	};

	EdwardsCurve.prototype._mulC = function _mulC(num) {
	  if (this.oneC)
	    { return num; }
	  else
	    { return this.c.redMul(num); }
	};

	// Just for compatibility with Short curve
	EdwardsCurve.prototype.jpoint = function jpoint(x, y, z, t) {
	  return this.point(x, y, z, t);
	};

	EdwardsCurve.prototype.pointFromX = function pointFromX(x, odd) {
	  x = new BN(x, 16);
	  if (!x.red)
	    { x = x.toRed(this.red); }

	  var x2 = x.redSqr();
	  var rhs = this.c2.redSub(this.a.redMul(x2));
	  var lhs = this.one.redSub(this.c2.redMul(this.d).redMul(x2));

	  var y2 = rhs.redMul(lhs.redInvm());
	  var y = y2.redSqrt();
	  if (y.redSqr().redSub(y2).cmp(this.zero) !== 0)
	    { throw new Error('invalid point'); }

	  var isOdd = y.fromRed().isOdd();
	  if (odd && !isOdd || !odd && isOdd)
	    { y = y.redNeg(); }

	  return this.point(x, y);
	};

	EdwardsCurve.prototype.pointFromY = function pointFromY(y, odd) {
	  y = new BN(y, 16);
	  if (!y.red)
	    { y = y.toRed(this.red); }

	  // x^2 = (y^2 - 1) / (d y^2 + 1)
	  var y2 = y.redSqr();
	  var lhs = y2.redSub(this.one);
	  var rhs = y2.redMul(this.d).redAdd(this.one);
	  var x2 = lhs.redMul(rhs.redInvm());

	  if (x2.cmp(this.zero) === 0) {
	    if (odd)
	      { throw new Error('invalid point'); }
	    else
	      { return this.point(this.zero, y); }
	  }

	  var x = x2.redSqrt();
	  if (x.redSqr().redSub(x2).cmp(this.zero) !== 0)
	    { throw new Error('invalid point'); }

	  if (x.isOdd() !== odd)
	    { x = x.redNeg(); }

	  return this.point(x, y);
	};

	EdwardsCurve.prototype.validate = function validate(point) {
	  if (point.isInfinity())
	    { return true; }

	  // Curve: A * X^2 + Y^2 = C^2 * (1 + D * X^2 * Y^2)
	  point.normalize();

	  var x2 = point.x.redSqr();
	  var y2 = point.y.redSqr();
	  var lhs = x2.redMul(this.a).redAdd(y2);
	  var rhs = this.c2.redMul(this.one.redAdd(this.d.redMul(x2).redMul(y2)));

	  return lhs.cmp(rhs) === 0;
	};

	function Point(curve, x, y, z, t) {
	  Base.BasePoint.call(this, curve, 'projective');
	  if (x === null && y === null && z === null) {
	    this.x = this.curve.zero;
	    this.y = this.curve.one;
	    this.z = this.curve.one;
	    this.t = this.curve.zero;
	    this.zOne = true;
	  } else {
	    this.x = new BN(x, 16);
	    this.y = new BN(y, 16);
	    this.z = z ? new BN(z, 16) : this.curve.one;
	    this.t = t && new BN(t, 16);
	    if (!this.x.red)
	      { this.x = this.x.toRed(this.curve.red); }
	    if (!this.y.red)
	      { this.y = this.y.toRed(this.curve.red); }
	    if (!this.z.red)
	      { this.z = this.z.toRed(this.curve.red); }
	    if (this.t && !this.t.red)
	      { this.t = this.t.toRed(this.curve.red); }
	    this.zOne = this.z === this.curve.one;

	    // Use extended coordinates
	    if (this.curve.extended && !this.t) {
	      this.t = this.x.redMul(this.y);
	      if (!this.zOne)
	        { this.t = this.t.redMul(this.z.redInvm()); }
	    }
	  }
	}
	inherits(Point, Base.BasePoint);

	EdwardsCurve.prototype.pointFromJSON = function pointFromJSON(obj) {
	  return Point.fromJSON(this, obj);
	};

	EdwardsCurve.prototype.point = function point(x, y, z, t) {
	  return new Point(this, x, y, z, t);
	};

	Point.fromJSON = function fromJSON(curve, obj) {
	  return new Point(curve, obj[0], obj[1], obj[2]);
	};

	Point.prototype.inspect = function inspect() {
	  if (this.isInfinity())
	    { return '<EC Point Infinity>'; }
	  return '<EC Point x: ' + this.x.fromRed().toString(16, 2) +
	      ' y: ' + this.y.fromRed().toString(16, 2) +
	      ' z: ' + this.z.fromRed().toString(16, 2) + '>';
	};

	Point.prototype.isInfinity = function isInfinity() {
	  // XXX This code assumes that zero is always zero in red
	  return this.x.cmpn(0) === 0 &&
	         this.y.cmp(this.z) === 0;
	};

	Point.prototype._extDbl = function _extDbl() {
	  // hyperelliptic.org/EFD/g1p/auto-twisted-extended-1.html
	  //     #doubling-dbl-2008-hwcd
	  // 4M + 4S

	  // A = X1^2
	  var a = this.x.redSqr();
	  // B = Y1^2
	  var b = this.y.redSqr();
	  // C = 2 * Z1^2
	  var c = this.z.redSqr();
	  c = c.redIAdd(c);
	  // D = a * A
	  var d = this.curve._mulA(a);
	  // E = (X1 + Y1)^2 - A - B
	  var e = this.x.redAdd(this.y).redSqr().redISub(a).redISub(b);
	  // G = D + B
	  var g = d.redAdd(b);
	  // F = G - C
	  var f = g.redSub(c);
	  // H = D - B
	  var h = d.redSub(b);
	  // X3 = E * F
	  var nx = e.redMul(f);
	  // Y3 = G * H
	  var ny = g.redMul(h);
	  // T3 = E * H
	  var nt = e.redMul(h);
	  // Z3 = F * G
	  var nz = f.redMul(g);
	  return this.curve.point(nx, ny, nz, nt);
	};

	Point.prototype._projDbl = function _projDbl() {
	  // hyperelliptic.org/EFD/g1p/auto-twisted-projective.html
	  //     #doubling-dbl-2008-bbjlp
	  //     #doubling-dbl-2007-bl
	  // and others
	  // Generally 3M + 4S or 2M + 4S

	  // B = (X1 + Y1)^2
	  var b = this.x.redAdd(this.y).redSqr();
	  // C = X1^2
	  var c = this.x.redSqr();
	  // D = Y1^2
	  var d = this.y.redSqr();

	  var nx;
	  var ny;
	  var nz;
	  if (this.curve.twisted) {
	    // E = a * C
	    var e = this.curve._mulA(c);
	    // F = E + D
	    var f = e.redAdd(d);
	    if (this.zOne) {
	      // X3 = (B - C - D) * (F - 2)
	      nx = b.redSub(c).redSub(d).redMul(f.redSub(this.curve.two));
	      // Y3 = F * (E - D)
	      ny = f.redMul(e.redSub(d));
	      // Z3 = F^2 - 2 * F
	      nz = f.redSqr().redSub(f).redSub(f);
	    } else {
	      // H = Z1^2
	      var h = this.z.redSqr();
	      // J = F - 2 * H
	      var j = f.redSub(h).redISub(h);
	      // X3 = (B-C-D)*J
	      nx = b.redSub(c).redISub(d).redMul(j);
	      // Y3 = F * (E - D)
	      ny = f.redMul(e.redSub(d));
	      // Z3 = F * J
	      nz = f.redMul(j);
	    }
	  } else {
	    // E = C + D
	    var e = c.redAdd(d);
	    // H = (c * Z1)^2
	    var h = this.curve._mulC(this.c.redMul(this.z)).redSqr();
	    // J = E - 2 * H
	    var j = e.redSub(h).redSub(h);
	    // X3 = c * (B - E) * J
	    nx = this.curve._mulC(b.redISub(e)).redMul(j);
	    // Y3 = c * E * (C - D)
	    ny = this.curve._mulC(e).redMul(c.redISub(d));
	    // Z3 = E * J
	    nz = e.redMul(j);
	  }
	  return this.curve.point(nx, ny, nz);
	};

	Point.prototype.dbl = function dbl() {
	  if (this.isInfinity())
	    { return this; }

	  // Double in extended coordinates
	  if (this.curve.extended)
	    { return this._extDbl(); }
	  else
	    { return this._projDbl(); }
	};

	Point.prototype._extAdd = function _extAdd(p) {
	  // hyperelliptic.org/EFD/g1p/auto-twisted-extended-1.html
	  //     #addition-add-2008-hwcd-3
	  // 8M

	  // A = (Y1 - X1) * (Y2 - X2)
	  var a = this.y.redSub(this.x).redMul(p.y.redSub(p.x));
	  // B = (Y1 + X1) * (Y2 + X2)
	  var b = this.y.redAdd(this.x).redMul(p.y.redAdd(p.x));
	  // C = T1 * k * T2
	  var c = this.t.redMul(this.curve.dd).redMul(p.t);
	  // D = Z1 * 2 * Z2
	  var d = this.z.redMul(p.z.redAdd(p.z));
	  // E = B - A
	  var e = b.redSub(a);
	  // F = D - C
	  var f = d.redSub(c);
	  // G = D + C
	  var g = d.redAdd(c);
	  // H = B + A
	  var h = b.redAdd(a);
	  // X3 = E * F
	  var nx = e.redMul(f);
	  // Y3 = G * H
	  var ny = g.redMul(h);
	  // T3 = E * H
	  var nt = e.redMul(h);
	  // Z3 = F * G
	  var nz = f.redMul(g);
	  return this.curve.point(nx, ny, nz, nt);
	};

	Point.prototype._projAdd = function _projAdd(p) {
	  // hyperelliptic.org/EFD/g1p/auto-twisted-projective.html
	  //     #addition-add-2008-bbjlp
	  //     #addition-add-2007-bl
	  // 10M + 1S

	  // A = Z1 * Z2
	  var a = this.z.redMul(p.z);
	  // B = A^2
	  var b = a.redSqr();
	  // C = X1 * X2
	  var c = this.x.redMul(p.x);
	  // D = Y1 * Y2
	  var d = this.y.redMul(p.y);
	  // E = d * C * D
	  var e = this.curve.d.redMul(c).redMul(d);
	  // F = B - E
	  var f = b.redSub(e);
	  // G = B + E
	  var g = b.redAdd(e);
	  // X3 = A * F * ((X1 + Y1) * (X2 + Y2) - C - D)
	  var tmp = this.x.redAdd(this.y).redMul(p.x.redAdd(p.y)).redISub(c).redISub(d);
	  var nx = a.redMul(f).redMul(tmp);
	  var ny;
	  var nz;
	  if (this.curve.twisted) {
	    // Y3 = A * G * (D - a * C)
	    ny = a.redMul(g).redMul(d.redSub(this.curve._mulA(c)));
	    // Z3 = F * G
	    nz = f.redMul(g);
	  } else {
	    // Y3 = A * G * (D - C)
	    ny = a.redMul(g).redMul(d.redSub(c));
	    // Z3 = c * F * G
	    nz = this.curve._mulC(f).redMul(g);
	  }
	  return this.curve.point(nx, ny, nz);
	};

	Point.prototype.add = function add(p) {
	  if (this.isInfinity())
	    { return p; }
	  if (p.isInfinity())
	    { return this; }

	  if (this.curve.extended)
	    { return this._extAdd(p); }
	  else
	    { return this._projAdd(p); }
	};

	Point.prototype.mul = function mul(k) {
	  if (this._hasDoubles(k))
	    { return this.curve._fixedNafMul(this, k); }
	  else
	    { return this.curve._wnafMul(this, k); }
	};

	Point.prototype.mulAdd = function mulAdd(k1, p, k2) {
	  return this.curve._wnafMulAdd(1, [ this, p ], [ k1, k2 ], 2, false);
	};

	Point.prototype.jmulAdd = function jmulAdd(k1, p, k2) {
	  return this.curve._wnafMulAdd(1, [ this, p ], [ k1, k2 ], 2, true);
	};

	Point.prototype.normalize = function normalize() {
	  if (this.zOne)
	    { return this; }

	  // Normalize coordinates
	  var zi = this.z.redInvm();
	  this.x = this.x.redMul(zi);
	  this.y = this.y.redMul(zi);
	  if (this.t)
	    { this.t = this.t.redMul(zi); }
	  this.z = this.curve.one;
	  this.zOne = true;
	  return this;
	};

	Point.prototype.neg = function neg() {
	  return this.curve.point(this.x.redNeg(),
	                          this.y,
	                          this.z,
	                          this.t && this.t.redNeg());
	};

	Point.prototype.getX = function getX() {
	  this.normalize();
	  return this.x.fromRed();
	};

	Point.prototype.getY = function getY() {
	  this.normalize();
	  return this.y.fromRed();
	};

	Point.prototype.eq = function eq(other) {
	  return this === other ||
	         this.getX().cmp(other.getX()) === 0 &&
	         this.getY().cmp(other.getY()) === 0;
	};

	Point.prototype.eqXToP = function eqXToP(x) {
	  var this$1 = this;

	  var rx = x.toRed(this.curve.red).redMul(this.z);
	  if (this.x.cmp(rx) === 0)
	    { return true; }

	  var xc = x.clone();
	  var t = this.curve.redN.redMul(this.z);
	  for (;;) {
	    xc.iadd(this$1.curve.n);
	    if (xc.cmp(this$1.curve.p) >= 0)
	      { return false; }

	    rx.redIAdd(t);
	    if (this$1.x.cmp(rx) === 0)
	      { return true; }
	  }
	  return false;
	};

	// Compatibility with BaseCurve
	Point.prototype.toP = Point.prototype.normalize;
	Point.prototype.mixedAdd = Point.prototype.add;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var curves = exports;

	var hash = __webpack_require__(18);
	var elliptic = __webpack_require__(1);

	var assert = elliptic.utils.assert;

	function PresetCurve(options) {
	  if (options.type === 'short')
	    { this.curve = new elliptic.curve.short(options); }
	  else if (options.type === 'edwards')
	    { this.curve = new elliptic.curve.edwards(options); }
	  else
	    { this.curve = new elliptic.curve.mont(options); }
	  this.g = this.curve.g;
	  this.n = this.curve.n;
	  this.hash = options.hash;

	  assert(this.g.validate(), 'Invalid curve');
	  assert(this.g.mul(this.n).isInfinity(), 'Invalid curve, G*N != O');
	}
	curves.PresetCurve = PresetCurve;

	function defineCurve(name, options) {
	  Object.defineProperty(curves, name, {
	    configurable: true,
	    enumerable: true,
	    get: function() {
	      var curve = new PresetCurve(options);
	      Object.defineProperty(curves, name, {
	        configurable: true,
	        enumerable: true,
	        value: curve
	      });
	      return curve;
	    }
	  });
	}

	defineCurve('p192', {
	  type: 'short',
	  prime: 'p192',
	  p: 'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff',
	  a: 'ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc',
	  b: '64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1',
	  n: 'ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831',
	  hash: hash.sha256,
	  gRed: false,
	  g: [
	    '188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012',
	    '07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811'
	  ]
	});

	defineCurve('p224', {
	  type: 'short',
	  prime: 'p224',
	  p: 'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001',
	  a: 'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe',
	  b: 'b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4',
	  n: 'ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d',
	  hash: hash.sha256,
	  gRed: false,
	  g: [
	    'b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21',
	    'bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34'
	  ]
	});

	defineCurve('p256', {
	  type: 'short',
	  prime: null,
	  p: 'ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff',
	  a: 'ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc',
	  b: '5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b',
	  n: 'ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551',
	  hash: hash.sha256,
	  gRed: false,
	  g: [
	    '6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296',
	    '4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5'
	  ]
	});

	defineCurve('p384', {
	  type: 'short',
	  prime: null,
	  p: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
	     'fffffffe ffffffff 00000000 00000000 ffffffff',
	  a: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
	     'fffffffe ffffffff 00000000 00000000 fffffffc',
	  b: 'b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f ' +
	     '5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef',
	  n: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 ' +
	     'f4372ddf 581a0db2 48b0a77a ecec196a ccc52973',
	  hash: hash.sha384,
	  gRed: false,
	  g: [
	    'aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 ' +
	    '5502f25d bf55296c 3a545e38 72760ab7',
	    '3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 ' +
	    '0a60b1ce 1d7e819d 7a431d7c 90ea0e5f'
	  ]
	});

	defineCurve('p521', {
	  type: 'short',
	  prime: null,
	  p: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
	     'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
	     'ffffffff ffffffff ffffffff ffffffff ffffffff',
	  a: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
	     'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
	     'ffffffff ffffffff ffffffff ffffffff fffffffc',
	  b: '00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b ' +
	     '99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd ' +
	     '3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00',
	  n: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
	     'ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 ' +
	     'f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409',
	  hash: hash.sha512,
	  gRed: false,
	  g: [
	    '000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 ' +
	    '053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 ' +
	    'a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66',
	    '00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 ' +
	    '579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 ' +
	    '3fad0761 353c7086 a272c240 88be9476 9fd16650'
	  ]
	});

	defineCurve('curve25519', {
	  type: 'mont',
	  prime: 'p25519',
	  p: '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed',
	  a: '76d06',
	  b: '1',
	  n: '1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed',
	  hash: hash.sha256,
	  gRed: false,
	  g: [
	    '9'
	  ]
	});

	defineCurve('ed25519', {
	  type: 'edwards',
	  prime: 'p25519',
	  p: '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed',
	  a: '-1',
	  c: '1',
	  // -121665 * (121666^(-1)) (mod P)
	  d: '52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3',
	  n: '1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed',
	  hash: hash.sha256,
	  gRed: false,
	  g: [
	    '216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a',

	    // 4/5
	    '6666666666666666666666666666666666666666666666666666666666666658'
	  ]
	});

	var pre;
	try {
	  pre = __webpack_require__(30);
	} catch (e) {
	  pre = undefined;
	}

	defineCurve('secp256k1', {
	  type: 'short',
	  prime: 'k256',
	  p: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f',
	  a: '0',
	  b: '7',
	  n: 'ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141',
	  h: '1',
	  hash: hash.sha256,

	  // Precomputed endomorphism
	  beta: '7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee',
	  lambda: '5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72',
	  basis: [
	    {
	      a: '3086d221a7d46bcde86c90e49284eb15',
	      b: '-e4437ed6010e88286f547fa90abfe4c3'
	    },
	    {
	      a: '114ca50f7a8e2f3f657c1108d9d44cfd8',
	      b: '3086d221a7d46bcde86c90e49284eb15'
	    }
	  ],

	  gRed: false,
	  g: [
	    '79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798',
	    '483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8',
	    pre
	  ]
	});


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	var hash = exports;

	hash.utils = __webpack_require__(19);
	hash.common = __webpack_require__(20);
	hash.sha = __webpack_require__(21);
	hash.ripemd = __webpack_require__(28);
	hash.hmac = __webpack_require__(29);

	// Proxy hash functions to the main object
	hash.sha1 = hash.sha.sha1;
	hash.sha256 = hash.sha.sha256;
	hash.sha224 = hash.sha.sha224;
	hash.sha384 = hash.sha.sha384;
	hash.sha512 = hash.sha.sha512;
	hash.ripemd160 = hash.ripemd.ripemd160;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var assert = __webpack_require__(7);
	var inherits = __webpack_require__(14);

	exports.inherits = inherits;

	function toArray(msg, enc) {
	  if (Array.isArray(msg))
	    { return msg.slice(); }
	  if (!msg)
	    { return []; }
	  var res = [];
	  if (typeof msg === 'string') {
	    if (!enc) {
	      for (var i = 0; i < msg.length; i++) {
	        var c = msg.charCodeAt(i);
	        var hi = c >> 8;
	        var lo = c & 0xff;
	        if (hi)
	          { res.push(hi, lo); }
	        else
	          { res.push(lo); }
	      }
	    } else if (enc === 'hex') {
	      msg = msg.replace(/[^a-z0-9]+/ig, '');
	      if (msg.length % 2 !== 0)
	        { msg = '0' + msg; }
	      for (i = 0; i < msg.length; i += 2)
	        { res.push(parseInt(msg[i] + msg[i + 1], 16)); }
	    }
	  } else {
	    for (i = 0; i < msg.length; i++)
	      { res[i] = msg[i] | 0; }
	  }
	  return res;
	}
	exports.toArray = toArray;

	function toHex(msg) {
	  var res = '';
	  for (var i = 0; i < msg.length; i++)
	    { res += zero2(msg[i].toString(16)); }
	  return res;
	}
	exports.toHex = toHex;

	function htonl(w) {
	  var res = (w >>> 24) |
	            ((w >>> 8) & 0xff00) |
	            ((w << 8) & 0xff0000) |
	            ((w & 0xff) << 24);
	  return res >>> 0;
	}
	exports.htonl = htonl;

	function toHex32(msg, endian) {
	  var res = '';
	  for (var i = 0; i < msg.length; i++) {
	    var w = msg[i];
	    if (endian === 'little')
	      { w = htonl(w); }
	    res += zero8(w.toString(16));
	  }
	  return res;
	}
	exports.toHex32 = toHex32;

	function zero2(word) {
	  if (word.length === 1)
	    { return '0' + word; }
	  else
	    { return word; }
	}
	exports.zero2 = zero2;

	function zero8(word) {
	  if (word.length === 7)
	    { return '0' + word; }
	  else if (word.length === 6)
	    { return '00' + word; }
	  else if (word.length === 5)
	    { return '000' + word; }
	  else if (word.length === 4)
	    { return '0000' + word; }
	  else if (word.length === 3)
	    { return '00000' + word; }
	  else if (word.length === 2)
	    { return '000000' + word; }
	  else if (word.length === 1)
	    { return '0000000' + word; }
	  else
	    { return word; }
	}
	exports.zero8 = zero8;

	function join32(msg, start, end, endian) {
	  var len = end - start;
	  assert(len % 4 === 0);
	  var res = new Array(len / 4);
	  for (var i = 0, k = start; i < res.length; i++, k += 4) {
	    var w;
	    if (endian === 'big')
	      { w = (msg[k] << 24) | (msg[k + 1] << 16) | (msg[k + 2] << 8) | msg[k + 3]; }
	    else
	      { w = (msg[k + 3] << 24) | (msg[k + 2] << 16) | (msg[k + 1] << 8) | msg[k]; }
	    res[i] = w >>> 0;
	  }
	  return res;
	}
	exports.join32 = join32;

	function split32(msg, endian) {
	  var res = new Array(msg.length * 4);
	  for (var i = 0, k = 0; i < msg.length; i++, k += 4) {
	    var m = msg[i];
	    if (endian === 'big') {
	      res[k] = m >>> 24;
	      res[k + 1] = (m >>> 16) & 0xff;
	      res[k + 2] = (m >>> 8) & 0xff;
	      res[k + 3] = m & 0xff;
	    } else {
	      res[k + 3] = m >>> 24;
	      res[k + 2] = (m >>> 16) & 0xff;
	      res[k + 1] = (m >>> 8) & 0xff;
	      res[k] = m & 0xff;
	    }
	  }
	  return res;
	}
	exports.split32 = split32;

	function rotr32(w, b) {
	  return (w >>> b) | (w << (32 - b));
	}
	exports.rotr32 = rotr32;

	function rotl32(w, b) {
	  return (w << b) | (w >>> (32 - b));
	}
	exports.rotl32 = rotl32;

	function sum32(a, b) {
	  return (a + b) >>> 0;
	}
	exports.sum32 = sum32;

	function sum32_3(a, b, c) {
	  return (a + b + c) >>> 0;
	}
	exports.sum32_3 = sum32_3;

	function sum32_4(a, b, c, d) {
	  return (a + b + c + d) >>> 0;
	}
	exports.sum32_4 = sum32_4;

	function sum32_5(a, b, c, d, e) {
	  return (a + b + c + d + e) >>> 0;
	}
	exports.sum32_5 = sum32_5;

	function sum64(buf, pos, ah, al) {
	  var bh = buf[pos];
	  var bl = buf[pos + 1];

	  var lo = (al + bl) >>> 0;
	  var hi = (lo < al ? 1 : 0) + ah + bh;
	  buf[pos] = hi >>> 0;
	  buf[pos + 1] = lo;
	}
	exports.sum64 = sum64;

	function sum64_hi(ah, al, bh, bl) {
	  var lo = (al + bl) >>> 0;
	  var hi = (lo < al ? 1 : 0) + ah + bh;
	  return hi >>> 0;
	}
	exports.sum64_hi = sum64_hi;

	function sum64_lo(ah, al, bh, bl) {
	  var lo = al + bl;
	  return lo >>> 0;
	}
	exports.sum64_lo = sum64_lo;

	function sum64_4_hi(ah, al, bh, bl, ch, cl, dh, dl) {
	  var carry = 0;
	  var lo = al;
	  lo = (lo + bl) >>> 0;
	  carry += lo < al ? 1 : 0;
	  lo = (lo + cl) >>> 0;
	  carry += lo < cl ? 1 : 0;
	  lo = (lo + dl) >>> 0;
	  carry += lo < dl ? 1 : 0;

	  var hi = ah + bh + ch + dh + carry;
	  return hi >>> 0;
	}
	exports.sum64_4_hi = sum64_4_hi;

	function sum64_4_lo(ah, al, bh, bl, ch, cl, dh, dl) {
	  var lo = al + bl + cl + dl;
	  return lo >>> 0;
	}
	exports.sum64_4_lo = sum64_4_lo;

	function sum64_5_hi(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
	  var carry = 0;
	  var lo = al;
	  lo = (lo + bl) >>> 0;
	  carry += lo < al ? 1 : 0;
	  lo = (lo + cl) >>> 0;
	  carry += lo < cl ? 1 : 0;
	  lo = (lo + dl) >>> 0;
	  carry += lo < dl ? 1 : 0;
	  lo = (lo + el) >>> 0;
	  carry += lo < el ? 1 : 0;

	  var hi = ah + bh + ch + dh + eh + carry;
	  return hi >>> 0;
	}
	exports.sum64_5_hi = sum64_5_hi;

	function sum64_5_lo(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
	  var lo = al + bl + cl + dl + el;

	  return lo >>> 0;
	}
	exports.sum64_5_lo = sum64_5_lo;

	function rotr64_hi(ah, al, num) {
	  var r = (al << (32 - num)) | (ah >>> num);
	  return r >>> 0;
	}
	exports.rotr64_hi = rotr64_hi;

	function rotr64_lo(ah, al, num) {
	  var r = (ah << (32 - num)) | (al >>> num);
	  return r >>> 0;
	}
	exports.rotr64_lo = rotr64_lo;

	function shr64_hi(ah, al, num) {
	  return ah >>> num;
	}
	exports.shr64_hi = shr64_hi;

	function shr64_lo(ah, al, num) {
	  var r = (ah << (32 - num)) | (al >>> num);
	  return r >>> 0;
	}
	exports.shr64_lo = shr64_lo;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(19);
	var assert = __webpack_require__(7);

	function BlockHash() {
	  this.pending = null;
	  this.pendingTotal = 0;
	  this.blockSize = this.constructor.blockSize;
	  this.outSize = this.constructor.outSize;
	  this.hmacStrength = this.constructor.hmacStrength;
	  this.padLength = this.constructor.padLength / 8;
	  this.endian = 'big';

	  this._delta8 = this.blockSize / 8;
	  this._delta32 = this.blockSize / 32;
	}
	exports.BlockHash = BlockHash;

	BlockHash.prototype.update = function update(msg, enc) {
	  var this$1 = this;

	  // Convert message to array, pad it, and join into 32bit blocks
	  msg = utils.toArray(msg, enc);
	  if (!this.pending)
	    { this.pending = msg; }
	  else
	    { this.pending = this.pending.concat(msg); }
	  this.pendingTotal += msg.length;

	  // Enough data, try updating
	  if (this.pending.length >= this._delta8) {
	    msg = this.pending;

	    // Process pending data in blocks
	    var r = msg.length % this._delta8;
	    this.pending = msg.slice(msg.length - r, msg.length);
	    if (this.pending.length === 0)
	      { this.pending = null; }

	    msg = utils.join32(msg, 0, msg.length - r, this.endian);
	    for (var i = 0; i < msg.length; i += this._delta32)
	      { this$1._update(msg, i, i + this$1._delta32); }
	  }

	  return this;
	};

	BlockHash.prototype.digest = function digest(enc) {
	  this.update(this._pad());
	  assert(this.pending === null);

	  return this._digest(enc);
	};

	BlockHash.prototype._pad = function pad() {
	  var len = this.pendingTotal;
	  var bytes = this._delta8;
	  var k = bytes - ((len + this.padLength) % bytes);
	  var res = new Array(k + this.padLength);
	  res[0] = 0x80;
	  for (var i = 1; i < k; i++)
	    { res[i] = 0; }

	  // Append length
	  len <<= 3;
	  if (this.endian === 'big') {
	    for (var t = 8; t < this.padLength; t++)
	      { res[i++] = 0; }

	    res[i++] = 0;
	    res[i++] = 0;
	    res[i++] = 0;
	    res[i++] = 0;
	    res[i++] = (len >>> 24) & 0xff;
	    res[i++] = (len >>> 16) & 0xff;
	    res[i++] = (len >>> 8) & 0xff;
	    res[i++] = len & 0xff;
	  } else {
	    res[i++] = len & 0xff;
	    res[i++] = (len >>> 8) & 0xff;
	    res[i++] = (len >>> 16) & 0xff;
	    res[i++] = (len >>> 24) & 0xff;
	    res[i++] = 0;
	    res[i++] = 0;
	    res[i++] = 0;
	    res[i++] = 0;

	    for (t = 8; t < this.padLength; t++)
	      { res[i++] = 0; }
	  }

	  return res;
	};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.sha1 = __webpack_require__(22);
	exports.sha224 = __webpack_require__(24);
	exports.sha256 = __webpack_require__(25);
	exports.sha384 = __webpack_require__(26);
	exports.sha512 = __webpack_require__(27);


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(19);
	var common = __webpack_require__(20);
	var shaCommon = __webpack_require__(23);

	var rotl32 = utils.rotl32;
	var sum32 = utils.sum32;
	var sum32_5 = utils.sum32_5;
	var ft_1 = shaCommon.ft_1;
	var BlockHash = common.BlockHash;

	var sha1_K = [
	  0x5A827999, 0x6ED9EBA1,
	  0x8F1BBCDC, 0xCA62C1D6
	];

	function SHA1() {
	  if (!(this instanceof SHA1))
	    { return new SHA1(); }

	  BlockHash.call(this);
	  this.h = [
	    0x67452301, 0xefcdab89, 0x98badcfe,
	    0x10325476, 0xc3d2e1f0 ];
	  this.W = new Array(80);
	}

	utils.inherits(SHA1, BlockHash);
	module.exports = SHA1;

	SHA1.blockSize = 512;
	SHA1.outSize = 160;
	SHA1.hmacStrength = 80;
	SHA1.padLength = 64;

	SHA1.prototype._update = function _update(msg, start) {
	  var W = this.W;

	  for (var i = 0; i < 16; i++)
	    { W[i] = msg[start + i]; }

	  for(; i < W.length; i++)
	    { W[i] = rotl32(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1); }

	  var a = this.h[0];
	  var b = this.h[1];
	  var c = this.h[2];
	  var d = this.h[3];
	  var e = this.h[4];

	  for (i = 0; i < W.length; i++) {
	    var s = ~~(i / 20);
	    var t = sum32_5(rotl32(a, 5), ft_1(s, b, c, d), e, W[i], sha1_K[s]);
	    e = d;
	    d = c;
	    c = rotl32(b, 30);
	    b = a;
	    a = t;
	  }

	  this.h[0] = sum32(this.h[0], a);
	  this.h[1] = sum32(this.h[1], b);
	  this.h[2] = sum32(this.h[2], c);
	  this.h[3] = sum32(this.h[3], d);
	  this.h[4] = sum32(this.h[4], e);
	};

	SHA1.prototype._digest = function digest(enc) {
	  if (enc === 'hex')
	    { return utils.toHex32(this.h, 'big'); }
	  else
	    { return utils.split32(this.h, 'big'); }
	};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(19);
	var rotr32 = utils.rotr32;

	function ft_1(s, x, y, z) {
	  if (s === 0)
	    { return ch32(x, y, z); }
	  if (s === 1 || s === 3)
	    { return p32(x, y, z); }
	  if (s === 2)
	    { return maj32(x, y, z); }
	}
	exports.ft_1 = ft_1;

	function ch32(x, y, z) {
	  return (x & y) ^ ((~x) & z);
	}
	exports.ch32 = ch32;

	function maj32(x, y, z) {
	  return (x & y) ^ (x & z) ^ (y & z);
	}
	exports.maj32 = maj32;

	function p32(x, y, z) {
	  return x ^ y ^ z;
	}
	exports.p32 = p32;

	function s0_256(x) {
	  return rotr32(x, 2) ^ rotr32(x, 13) ^ rotr32(x, 22);
	}
	exports.s0_256 = s0_256;

	function s1_256(x) {
	  return rotr32(x, 6) ^ rotr32(x, 11) ^ rotr32(x, 25);
	}
	exports.s1_256 = s1_256;

	function g0_256(x) {
	  return rotr32(x, 7) ^ rotr32(x, 18) ^ (x >>> 3);
	}
	exports.g0_256 = g0_256;

	function g1_256(x) {
	  return rotr32(x, 17) ^ rotr32(x, 19) ^ (x >>> 10);
	}
	exports.g1_256 = g1_256;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(19);
	var SHA256 = __webpack_require__(25);

	function SHA224() {
	  if (!(this instanceof SHA224))
	    { return new SHA224(); }

	  SHA256.call(this);
	  this.h = [
	    0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
	    0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4 ];
	}
	utils.inherits(SHA224, SHA256);
	module.exports = SHA224;

	SHA224.blockSize = 512;
	SHA224.outSize = 224;
	SHA224.hmacStrength = 192;
	SHA224.padLength = 64;

	SHA224.prototype._digest = function digest(enc) {
	  // Just truncate output
	  if (enc === 'hex')
	    { return utils.toHex32(this.h.slice(0, 7), 'big'); }
	  else
	    { return utils.split32(this.h.slice(0, 7), 'big'); }
	};



/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(19);
	var common = __webpack_require__(20);
	var shaCommon = __webpack_require__(23);
	var assert = __webpack_require__(7);

	var sum32 = utils.sum32;
	var sum32_4 = utils.sum32_4;
	var sum32_5 = utils.sum32_5;
	var ch32 = shaCommon.ch32;
	var maj32 = shaCommon.maj32;
	var s0_256 = shaCommon.s0_256;
	var s1_256 = shaCommon.s1_256;
	var g0_256 = shaCommon.g0_256;
	var g1_256 = shaCommon.g1_256;

	var BlockHash = common.BlockHash;

	var sha256_K = [
	  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
	  0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
	  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
	  0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
	  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
	  0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
	  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
	  0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
	  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
	  0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
	  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
	  0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
	  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
	  0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
	  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
	  0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
	];

	function SHA256() {
	  if (!(this instanceof SHA256))
	    { return new SHA256(); }

	  BlockHash.call(this);
	  this.h = [
	    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
	    0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
	  ];
	  this.k = sha256_K;
	  this.W = new Array(64);
	}
	utils.inherits(SHA256, BlockHash);
	module.exports = SHA256;

	SHA256.blockSize = 512;
	SHA256.outSize = 256;
	SHA256.hmacStrength = 192;
	SHA256.padLength = 64;

	SHA256.prototype._update = function _update(msg, start) {
	  var this$1 = this;

	  var W = this.W;

	  for (var i = 0; i < 16; i++)
	    { W[i] = msg[start + i]; }
	  for (; i < W.length; i++)
	    { W[i] = sum32_4(g1_256(W[i - 2]), W[i - 7], g0_256(W[i - 15]), W[i - 16]); }

	  var a = this.h[0];
	  var b = this.h[1];
	  var c = this.h[2];
	  var d = this.h[3];
	  var e = this.h[4];
	  var f = this.h[5];
	  var g = this.h[6];
	  var h = this.h[7];

	  assert(this.k.length === W.length);
	  for (i = 0; i < W.length; i++) {
	    var T1 = sum32_5(h, s1_256(e), ch32(e, f, g), this$1.k[i], W[i]);
	    var T2 = sum32(s0_256(a), maj32(a, b, c));
	    h = g;
	    g = f;
	    f = e;
	    e = sum32(d, T1);
	    d = c;
	    c = b;
	    b = a;
	    a = sum32(T1, T2);
	  }

	  this.h[0] = sum32(this.h[0], a);
	  this.h[1] = sum32(this.h[1], b);
	  this.h[2] = sum32(this.h[2], c);
	  this.h[3] = sum32(this.h[3], d);
	  this.h[4] = sum32(this.h[4], e);
	  this.h[5] = sum32(this.h[5], f);
	  this.h[6] = sum32(this.h[6], g);
	  this.h[7] = sum32(this.h[7], h);
	};

	SHA256.prototype._digest = function digest(enc) {
	  if (enc === 'hex')
	    { return utils.toHex32(this.h, 'big'); }
	  else
	    { return utils.split32(this.h, 'big'); }
	};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(19);

	var SHA512 = __webpack_require__(27);

	function SHA384() {
	  if (!(this instanceof SHA384))
	    { return new SHA384(); }

	  SHA512.call(this);
	  this.h = [
	    0xcbbb9d5d, 0xc1059ed8,
	    0x629a292a, 0x367cd507,
	    0x9159015a, 0x3070dd17,
	    0x152fecd8, 0xf70e5939,
	    0x67332667, 0xffc00b31,
	    0x8eb44a87, 0x68581511,
	    0xdb0c2e0d, 0x64f98fa7,
	    0x47b5481d, 0xbefa4fa4 ];
	}
	utils.inherits(SHA384, SHA512);
	module.exports = SHA384;

	SHA384.blockSize = 1024;
	SHA384.outSize = 384;
	SHA384.hmacStrength = 192;
	SHA384.padLength = 128;

	SHA384.prototype._digest = function digest(enc) {
	  if (enc === 'hex')
	    { return utils.toHex32(this.h.slice(0, 12), 'big'); }
	  else
	    { return utils.split32(this.h.slice(0, 12), 'big'); }
	};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(19);
	var common = __webpack_require__(20);
	var assert = __webpack_require__(7);

	var rotr64_hi = utils.rotr64_hi;
	var rotr64_lo = utils.rotr64_lo;
	var shr64_hi = utils.shr64_hi;
	var shr64_lo = utils.shr64_lo;
	var sum64 = utils.sum64;
	var sum64_hi = utils.sum64_hi;
	var sum64_lo = utils.sum64_lo;
	var sum64_4_hi = utils.sum64_4_hi;
	var sum64_4_lo = utils.sum64_4_lo;
	var sum64_5_hi = utils.sum64_5_hi;
	var sum64_5_lo = utils.sum64_5_lo;

	var BlockHash = common.BlockHash;

	var sha512_K = [
	  0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd,
	  0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
	  0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019,
	  0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
	  0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
	  0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
	  0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1,
	  0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
	  0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3,
	  0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
	  0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483,
	  0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
	  0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210,
	  0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
	  0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
	  0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
	  0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926,
	  0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
	  0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8,
	  0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
	  0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001,
	  0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
	  0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910,
	  0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
	  0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
	  0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
	  0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb,
	  0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
	  0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60,
	  0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
	  0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9,
	  0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
	  0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207,
	  0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
	  0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6,
	  0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
	  0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493,
	  0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
	  0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a,
	  0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
	];

	function SHA512() {
	  if (!(this instanceof SHA512))
	    { return new SHA512(); }

	  BlockHash.call(this);
	  this.h = [
	    0x6a09e667, 0xf3bcc908,
	    0xbb67ae85, 0x84caa73b,
	    0x3c6ef372, 0xfe94f82b,
	    0xa54ff53a, 0x5f1d36f1,
	    0x510e527f, 0xade682d1,
	    0x9b05688c, 0x2b3e6c1f,
	    0x1f83d9ab, 0xfb41bd6b,
	    0x5be0cd19, 0x137e2179 ];
	  this.k = sha512_K;
	  this.W = new Array(160);
	}
	utils.inherits(SHA512, BlockHash);
	module.exports = SHA512;

	SHA512.blockSize = 1024;
	SHA512.outSize = 512;
	SHA512.hmacStrength = 192;
	SHA512.padLength = 128;

	SHA512.prototype._prepareBlock = function _prepareBlock(msg, start) {
	  var W = this.W;

	  // 32 x 32bit words
	  for (var i = 0; i < 32; i++)
	    { W[i] = msg[start + i]; }
	  for (; i < W.length; i += 2) {
	    var c0_hi = g1_512_hi(W[i - 4], W[i - 3]);  // i - 2
	    var c0_lo = g1_512_lo(W[i - 4], W[i - 3]);
	    var c1_hi = W[i - 14];  // i - 7
	    var c1_lo = W[i - 13];
	    var c2_hi = g0_512_hi(W[i - 30], W[i - 29]);  // i - 15
	    var c2_lo = g0_512_lo(W[i - 30], W[i - 29]);
	    var c3_hi = W[i - 32];  // i - 16
	    var c3_lo = W[i - 31];

	    W[i] = sum64_4_hi(
	      c0_hi, c0_lo,
	      c1_hi, c1_lo,
	      c2_hi, c2_lo,
	      c3_hi, c3_lo);
	    W[i + 1] = sum64_4_lo(
	      c0_hi, c0_lo,
	      c1_hi, c1_lo,
	      c2_hi, c2_lo,
	      c3_hi, c3_lo);
	  }
	};

	SHA512.prototype._update = function _update(msg, start) {
	  var this$1 = this;

	  this._prepareBlock(msg, start);

	  var W = this.W;

	  var ah = this.h[0];
	  var al = this.h[1];
	  var bh = this.h[2];
	  var bl = this.h[3];
	  var ch = this.h[4];
	  var cl = this.h[5];
	  var dh = this.h[6];
	  var dl = this.h[7];
	  var eh = this.h[8];
	  var el = this.h[9];
	  var fh = this.h[10];
	  var fl = this.h[11];
	  var gh = this.h[12];
	  var gl = this.h[13];
	  var hh = this.h[14];
	  var hl = this.h[15];

	  assert(this.k.length === W.length);
	  for (var i = 0; i < W.length; i += 2) {
	    var c0_hi = hh;
	    var c0_lo = hl;
	    var c1_hi = s1_512_hi(eh, el);
	    var c1_lo = s1_512_lo(eh, el);
	    var c2_hi = ch64_hi(eh, el, fh, fl, gh, gl);
	    var c2_lo = ch64_lo(eh, el, fh, fl, gh, gl);
	    var c3_hi = this$1.k[i];
	    var c3_lo = this$1.k[i + 1];
	    var c4_hi = W[i];
	    var c4_lo = W[i + 1];

	    var T1_hi = sum64_5_hi(
	      c0_hi, c0_lo,
	      c1_hi, c1_lo,
	      c2_hi, c2_lo,
	      c3_hi, c3_lo,
	      c4_hi, c4_lo);
	    var T1_lo = sum64_5_lo(
	      c0_hi, c0_lo,
	      c1_hi, c1_lo,
	      c2_hi, c2_lo,
	      c3_hi, c3_lo,
	      c4_hi, c4_lo);

	    c0_hi = s0_512_hi(ah, al);
	    c0_lo = s0_512_lo(ah, al);
	    c1_hi = maj64_hi(ah, al, bh, bl, ch, cl);
	    c1_lo = maj64_lo(ah, al, bh, bl, ch, cl);

	    var T2_hi = sum64_hi(c0_hi, c0_lo, c1_hi, c1_lo);
	    var T2_lo = sum64_lo(c0_hi, c0_lo, c1_hi, c1_lo);

	    hh = gh;
	    hl = gl;

	    gh = fh;
	    gl = fl;

	    fh = eh;
	    fl = el;

	    eh = sum64_hi(dh, dl, T1_hi, T1_lo);
	    el = sum64_lo(dl, dl, T1_hi, T1_lo);

	    dh = ch;
	    dl = cl;

	    ch = bh;
	    cl = bl;

	    bh = ah;
	    bl = al;

	    ah = sum64_hi(T1_hi, T1_lo, T2_hi, T2_lo);
	    al = sum64_lo(T1_hi, T1_lo, T2_hi, T2_lo);
	  }

	  sum64(this.h, 0, ah, al);
	  sum64(this.h, 2, bh, bl);
	  sum64(this.h, 4, ch, cl);
	  sum64(this.h, 6, dh, dl);
	  sum64(this.h, 8, eh, el);
	  sum64(this.h, 10, fh, fl);
	  sum64(this.h, 12, gh, gl);
	  sum64(this.h, 14, hh, hl);
	};

	SHA512.prototype._digest = function digest(enc) {
	  if (enc === 'hex')
	    { return utils.toHex32(this.h, 'big'); }
	  else
	    { return utils.split32(this.h, 'big'); }
	};

	function ch64_hi(xh, xl, yh, yl, zh) {
	  var r = (xh & yh) ^ ((~xh) & zh);
	  if (r < 0)
	    { r += 0x100000000; }
	  return r;
	}

	function ch64_lo(xh, xl, yh, yl, zh, zl) {
	  var r = (xl & yl) ^ ((~xl) & zl);
	  if (r < 0)
	    { r += 0x100000000; }
	  return r;
	}

	function maj64_hi(xh, xl, yh, yl, zh) {
	  var r = (xh & yh) ^ (xh & zh) ^ (yh & zh);
	  if (r < 0)
	    { r += 0x100000000; }
	  return r;
	}

	function maj64_lo(xh, xl, yh, yl, zh, zl) {
	  var r = (xl & yl) ^ (xl & zl) ^ (yl & zl);
	  if (r < 0)
	    { r += 0x100000000; }
	  return r;
	}

	function s0_512_hi(xh, xl) {
	  var c0_hi = rotr64_hi(xh, xl, 28);
	  var c1_hi = rotr64_hi(xl, xh, 2);  // 34
	  var c2_hi = rotr64_hi(xl, xh, 7);  // 39

	  var r = c0_hi ^ c1_hi ^ c2_hi;
	  if (r < 0)
	    { r += 0x100000000; }
	  return r;
	}

	function s0_512_lo(xh, xl) {
	  var c0_lo = rotr64_lo(xh, xl, 28);
	  var c1_lo = rotr64_lo(xl, xh, 2);  // 34
	  var c2_lo = rotr64_lo(xl, xh, 7);  // 39

	  var r = c0_lo ^ c1_lo ^ c2_lo;
	  if (r < 0)
	    { r += 0x100000000; }
	  return r;
	}

	function s1_512_hi(xh, xl) {
	  var c0_hi = rotr64_hi(xh, xl, 14);
	  var c1_hi = rotr64_hi(xh, xl, 18);
	  var c2_hi = rotr64_hi(xl, xh, 9);  // 41

	  var r = c0_hi ^ c1_hi ^ c2_hi;
	  if (r < 0)
	    { r += 0x100000000; }
	  return r;
	}

	function s1_512_lo(xh, xl) {
	  var c0_lo = rotr64_lo(xh, xl, 14);
	  var c1_lo = rotr64_lo(xh, xl, 18);
	  var c2_lo = rotr64_lo(xl, xh, 9);  // 41

	  var r = c0_lo ^ c1_lo ^ c2_lo;
	  if (r < 0)
	    { r += 0x100000000; }
	  return r;
	}

	function g0_512_hi(xh, xl) {
	  var c0_hi = rotr64_hi(xh, xl, 1);
	  var c1_hi = rotr64_hi(xh, xl, 8);
	  var c2_hi = shr64_hi(xh, xl, 7);

	  var r = c0_hi ^ c1_hi ^ c2_hi;
	  if (r < 0)
	    { r += 0x100000000; }
	  return r;
	}

	function g0_512_lo(xh, xl) {
	  var c0_lo = rotr64_lo(xh, xl, 1);
	  var c1_lo = rotr64_lo(xh, xl, 8);
	  var c2_lo = shr64_lo(xh, xl, 7);

	  var r = c0_lo ^ c1_lo ^ c2_lo;
	  if (r < 0)
	    { r += 0x100000000; }
	  return r;
	}

	function g1_512_hi(xh, xl) {
	  var c0_hi = rotr64_hi(xh, xl, 19);
	  var c1_hi = rotr64_hi(xl, xh, 29);  // 61
	  var c2_hi = shr64_hi(xh, xl, 6);

	  var r = c0_hi ^ c1_hi ^ c2_hi;
	  if (r < 0)
	    { r += 0x100000000; }
	  return r;
	}

	function g1_512_lo(xh, xl) {
	  var c0_lo = rotr64_lo(xh, xl, 19);
	  var c1_lo = rotr64_lo(xl, xh, 29);  // 61
	  var c2_lo = shr64_lo(xh, xl, 6);

	  var r = c0_lo ^ c1_lo ^ c2_lo;
	  if (r < 0)
	    { r += 0x100000000; }
	  return r;
	}


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(19);
	var common = __webpack_require__(20);

	var rotl32 = utils.rotl32;
	var sum32 = utils.sum32;
	var sum32_3 = utils.sum32_3;
	var sum32_4 = utils.sum32_4;
	var BlockHash = common.BlockHash;

	function RIPEMD160() {
	  if (!(this instanceof RIPEMD160))
	    { return new RIPEMD160(); }

	  BlockHash.call(this);

	  this.h = [ 0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0 ];
	  this.endian = 'little';
	}
	utils.inherits(RIPEMD160, BlockHash);
	exports.ripemd160 = RIPEMD160;

	RIPEMD160.blockSize = 512;
	RIPEMD160.outSize = 160;
	RIPEMD160.hmacStrength = 192;
	RIPEMD160.padLength = 64;

	RIPEMD160.prototype._update = function update(msg, start) {
	  var A = this.h[0];
	  var B = this.h[1];
	  var C = this.h[2];
	  var D = this.h[3];
	  var E = this.h[4];
	  var Ah = A;
	  var Bh = B;
	  var Ch = C;
	  var Dh = D;
	  var Eh = E;
	  for (var j = 0; j < 80; j++) {
	    var T = sum32(
	      rotl32(
	        sum32_4(A, f(j, B, C, D), msg[r[j] + start], K(j)),
	        s[j]),
	      E);
	    A = E;
	    E = D;
	    D = rotl32(C, 10);
	    C = B;
	    B = T;
	    T = sum32(
	      rotl32(
	        sum32_4(Ah, f(79 - j, Bh, Ch, Dh), msg[rh[j] + start], Kh(j)),
	        sh[j]),
	      Eh);
	    Ah = Eh;
	    Eh = Dh;
	    Dh = rotl32(Ch, 10);
	    Ch = Bh;
	    Bh = T;
	  }
	  T = sum32_3(this.h[1], C, Dh);
	  this.h[1] = sum32_3(this.h[2], D, Eh);
	  this.h[2] = sum32_3(this.h[3], E, Ah);
	  this.h[3] = sum32_3(this.h[4], A, Bh);
	  this.h[4] = sum32_3(this.h[0], B, Ch);
	  this.h[0] = T;
	};

	RIPEMD160.prototype._digest = function digest(enc) {
	  if (enc === 'hex')
	    { return utils.toHex32(this.h, 'little'); }
	  else
	    { return utils.split32(this.h, 'little'); }
	};

	function f(j, x, y, z) {
	  if (j <= 15)
	    { return x ^ y ^ z; }
	  else if (j <= 31)
	    { return (x & y) | ((~x) & z); }
	  else if (j <= 47)
	    { return (x | (~y)) ^ z; }
	  else if (j <= 63)
	    { return (x & z) | (y & (~z)); }
	  else
	    { return x ^ (y | (~z)); }
	}

	function K(j) {
	  if (j <= 15)
	    { return 0x00000000; }
	  else if (j <= 31)
	    { return 0x5a827999; }
	  else if (j <= 47)
	    { return 0x6ed9eba1; }
	  else if (j <= 63)
	    { return 0x8f1bbcdc; }
	  else
	    { return 0xa953fd4e; }
	}

	function Kh(j) {
	  if (j <= 15)
	    { return 0x50a28be6; }
	  else if (j <= 31)
	    { return 0x5c4dd124; }
	  else if (j <= 47)
	    { return 0x6d703ef3; }
	  else if (j <= 63)
	    { return 0x7a6d76e9; }
	  else
	    { return 0x00000000; }
	}

	var r = [
	  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
	  7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,
	  3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12,
	  1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
	  4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13
	];

	var rh = [
	  5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12,
	  6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2,
	  15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13,
	  8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14,
	  12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11
	];

	var s = [
	  11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8,
	  7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12,
	  11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5,
	  11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12,
	  9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6
	];

	var sh = [
	  8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6,
	  9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11,
	  9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5,
	  15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8,
	  8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11
	];


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(19);
	var assert = __webpack_require__(7);

	function Hmac(hash, key, enc) {
	  if (!(this instanceof Hmac))
	    { return new Hmac(hash, key, enc); }
	  this.Hash = hash;
	  this.blockSize = hash.blockSize / 8;
	  this.outSize = hash.outSize / 8;
	  this.inner = null;
	  this.outer = null;

	  this._init(utils.toArray(key, enc));
	}
	module.exports = Hmac;

	Hmac.prototype._init = function init(key) {
	  // Shorten key, if needed
	  if (key.length > this.blockSize)
	    { key = new this.Hash().update(key).digest(); }
	  assert(key.length <= this.blockSize);

	  // Add padding to key
	  for (var i = key.length; i < this.blockSize; i++)
	    { key.push(0); }

	  for (i = 0; i < key.length; i++)
	    { key[i] ^= 0x36; }
	  this.inner = new this.Hash().update(key);

	  // 0x36 ^ 0x5c = 0x6a
	  for (i = 0; i < key.length; i++)
	    { key[i] ^= 0x6a; }
	  this.outer = new this.Hash().update(key);
	};

	Hmac.prototype.update = function update(msg, enc) {
	  this.inner.update(msg, enc);
	  return this;
	};

	Hmac.prototype.digest = function digest(enc) {
	  this.outer.update(this.inner.digest());
	  return this.outer.digest(enc);
	};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

	module.exports = {
	  doubles: {
	    step: 4,
	    points: [
	      [
	        'e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a',
	        'f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821'
	      ],
	      [
	        '8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508',
	        '11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf'
	      ],
	      [
	        '175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739',
	        'd3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695'
	      ],
	      [
	        '363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640',
	        '4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9'
	      ],
	      [
	        '8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c',
	        '4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36'
	      ],
	      [
	        '723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda',
	        '96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f'
	      ],
	      [
	        'eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa',
	        '5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999'
	      ],
	      [
	        '100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0',
	        'cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09'
	      ],
	      [
	        'e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d',
	        '9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d'
	      ],
	      [
	        'feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d',
	        'e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088'
	      ],
	      [
	        'da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1',
	        '9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d'
	      ],
	      [
	        '53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0',
	        '5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8'
	      ],
	      [
	        '8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047',
	        '10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a'
	      ],
	      [
	        '385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862',
	        '283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453'
	      ],
	      [
	        '6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7',
	        '7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160'
	      ],
	      [
	        '3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd',
	        '56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0'
	      ],
	      [
	        '85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83',
	        '7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6'
	      ],
	      [
	        '948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a',
	        '53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589'
	      ],
	      [
	        '6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8',
	        'bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17'
	      ],
	      [
	        'e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d',
	        '4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda'
	      ],
	      [
	        'e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725',
	        '7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd'
	      ],
	      [
	        '213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754',
	        '4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2'
	      ],
	      [
	        '4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c',
	        '17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6'
	      ],
	      [
	        'fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6',
	        '6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f'
	      ],
	      [
	        '76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39',
	        'c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01'
	      ],
	      [
	        'c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891',
	        '893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3'
	      ],
	      [
	        'd895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b',
	        'febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f'
	      ],
	      [
	        'b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03',
	        '2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7'
	      ],
	      [
	        'e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d',
	        'eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78'
	      ],
	      [
	        'a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070',
	        '7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1'
	      ],
	      [
	        '90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4',
	        'e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150'
	      ],
	      [
	        '8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da',
	        '662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82'
	      ],
	      [
	        'e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11',
	        '1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc'
	      ],
	      [
	        '8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e',
	        'efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b'
	      ],
	      [
	        'e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41',
	        '2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51'
	      ],
	      [
	        'b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef',
	        '67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45'
	      ],
	      [
	        'd68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8',
	        'db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120'
	      ],
	      [
	        '324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d',
	        '648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84'
	      ],
	      [
	        '4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96',
	        '35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d'
	      ],
	      [
	        '9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd',
	        'ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d'
	      ],
	      [
	        '6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5',
	        '9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8'
	      ],
	      [
	        'a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266',
	        '40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8'
	      ],
	      [
	        '7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71',
	        '34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac'
	      ],
	      [
	        '928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac',
	        'c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f'
	      ],
	      [
	        '85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751',
	        '1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962'
	      ],
	      [
	        'ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e',
	        '493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907'
	      ],
	      [
	        '827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241',
	        'c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec'
	      ],
	      [
	        'eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3',
	        'be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d'
	      ],
	      [
	        'e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f',
	        '4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414'
	      ],
	      [
	        '1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19',
	        'aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd'
	      ],
	      [
	        '146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be',
	        'b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0'
	      ],
	      [
	        'fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9',
	        '6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811'
	      ],
	      [
	        'da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2',
	        '8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1'
	      ],
	      [
	        'a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13',
	        '7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c'
	      ],
	      [
	        '174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c',
	        'ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73'
	      ],
	      [
	        '959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba',
	        '2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd'
	      ],
	      [
	        'd2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151',
	        'e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405'
	      ],
	      [
	        '64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073',
	        'd99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589'
	      ],
	      [
	        '8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458',
	        '38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e'
	      ],
	      [
	        '13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b',
	        '69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27'
	      ],
	      [
	        'bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366',
	        'd3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1'
	      ],
	      [
	        '8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa',
	        '40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482'
	      ],
	      [
	        '8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0',
	        '620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945'
	      ],
	      [
	        'dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787',
	        '7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573'
	      ],
	      [
	        'f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e',
	        'ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82'
	      ]
	    ]
	  },
	  naf: {
	    wnd: 7,
	    points: [
	      [
	        'f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9',
	        '388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672'
	      ],
	      [
	        '2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4',
	        'd8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6'
	      ],
	      [
	        '5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc',
	        '6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da'
	      ],
	      [
	        'acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe',
	        'cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37'
	      ],
	      [
	        '774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb',
	        'd984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b'
	      ],
	      [
	        'f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8',
	        'ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81'
	      ],
	      [
	        'd7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e',
	        '581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58'
	      ],
	      [
	        'defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34',
	        '4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77'
	      ],
	      [
	        '2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c',
	        '85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a'
	      ],
	      [
	        '352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5',
	        '321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c'
	      ],
	      [
	        '2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f',
	        '2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67'
	      ],
	      [
	        '9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714',
	        '73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402'
	      ],
	      [
	        'daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729',
	        'a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55'
	      ],
	      [
	        'c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db',
	        '2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482'
	      ],
	      [
	        '6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4',
	        'e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82'
	      ],
	      [
	        '1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5',
	        'b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396'
	      ],
	      [
	        '605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479',
	        '2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49'
	      ],
	      [
	        '62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d',
	        '80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf'
	      ],
	      [
	        '80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f',
	        '1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a'
	      ],
	      [
	        '7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb',
	        'd0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7'
	      ],
	      [
	        'd528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9',
	        'eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933'
	      ],
	      [
	        '49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963',
	        '758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a'
	      ],
	      [
	        '77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74',
	        '958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6'
	      ],
	      [
	        'f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530',
	        'e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37'
	      ],
	      [
	        '463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b',
	        '5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e'
	      ],
	      [
	        'f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247',
	        'cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6'
	      ],
	      [
	        'caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1',
	        'cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476'
	      ],
	      [
	        '2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120',
	        '4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40'
	      ],
	      [
	        '7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435',
	        '91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61'
	      ],
	      [
	        '754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18',
	        '673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683'
	      ],
	      [
	        'e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8',
	        '59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5'
	      ],
	      [
	        '186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb',
	        '3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b'
	      ],
	      [
	        'df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f',
	        '55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417'
	      ],
	      [
	        '5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143',
	        'efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868'
	      ],
	      [
	        '290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba',
	        'e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a'
	      ],
	      [
	        'af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45',
	        'f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6'
	      ],
	      [
	        '766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a',
	        '744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996'
	      ],
	      [
	        '59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e',
	        'c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e'
	      ],
	      [
	        'f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8',
	        'e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d'
	      ],
	      [
	        '7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c',
	        '30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2'
	      ],
	      [
	        '948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519',
	        'e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e'
	      ],
	      [
	        '7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab',
	        '100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437'
	      ],
	      [
	        '3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca',
	        'ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311'
	      ],
	      [
	        'd3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf',
	        '8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4'
	      ],
	      [
	        '1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610',
	        '68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575'
	      ],
	      [
	        '733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4',
	        'f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d'
	      ],
	      [
	        '15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c',
	        'd56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d'
	      ],
	      [
	        'a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940',
	        'edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629'
	      ],
	      [
	        'e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980',
	        'a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06'
	      ],
	      [
	        '311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3',
	        '66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374'
	      ],
	      [
	        '34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf',
	        '9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee'
	      ],
	      [
	        'f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63',
	        '4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1'
	      ],
	      [
	        'd7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448',
	        'fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b'
	      ],
	      [
	        '32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf',
	        '5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661'
	      ],
	      [
	        '7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5',
	        '8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6'
	      ],
	      [
	        'ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6',
	        '8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e'
	      ],
	      [
	        '16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5',
	        '5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d'
	      ],
	      [
	        'eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99',
	        'f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc'
	      ],
	      [
	        '78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51',
	        'f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4'
	      ],
	      [
	        '494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5',
	        '42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c'
	      ],
	      [
	        'a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5',
	        '204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b'
	      ],
	      [
	        'c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997',
	        '4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913'
	      ],
	      [
	        '841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881',
	        '73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154'
	      ],
	      [
	        '5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5',
	        '39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865'
	      ],
	      [
	        '36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66',
	        'd2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc'
	      ],
	      [
	        '336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726',
	        'ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224'
	      ],
	      [
	        '8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede',
	        '6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e'
	      ],
	      [
	        '1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94',
	        '60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6'
	      ],
	      [
	        '85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31',
	        '3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511'
	      ],
	      [
	        '29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51',
	        'b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b'
	      ],
	      [
	        'a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252',
	        'ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2'
	      ],
	      [
	        '4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5',
	        'cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c'
	      ],
	      [
	        'd24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b',
	        '6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3'
	      ],
	      [
	        'ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4',
	        '322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d'
	      ],
	      [
	        'af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f',
	        '6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700'
	      ],
	      [
	        'e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889',
	        '2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4'
	      ],
	      [
	        '591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246',
	        'b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196'
	      ],
	      [
	        '11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984',
	        '998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4'
	      ],
	      [
	        '3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a',
	        'b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257'
	      ],
	      [
	        'cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030',
	        'bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13'
	      ],
	      [
	        'c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197',
	        '6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096'
	      ],
	      [
	        'c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593',
	        'c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38'
	      ],
	      [
	        'a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef',
	        '21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f'
	      ],
	      [
	        '347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38',
	        '60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448'
	      ],
	      [
	        'da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a',
	        '49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a'
	      ],
	      [
	        'c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111',
	        '5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4'
	      ],
	      [
	        '4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502',
	        '7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437'
	      ],
	      [
	        '3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea',
	        'be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7'
	      ],
	      [
	        'cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26',
	        '8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d'
	      ],
	      [
	        'b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986',
	        '39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a'
	      ],
	      [
	        'd4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e',
	        '62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54'
	      ],
	      [
	        '48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4',
	        '25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77'
	      ],
	      [
	        'dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda',
	        'ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517'
	      ],
	      [
	        '6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859',
	        'cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10'
	      ],
	      [
	        'e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f',
	        'f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125'
	      ],
	      [
	        'eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c',
	        '6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e'
	      ],
	      [
	        '13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942',
	        'fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1'
	      ],
	      [
	        'ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a',
	        '1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2'
	      ],
	      [
	        'b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80',
	        '5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423'
	      ],
	      [
	        'ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d',
	        '438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8'
	      ],
	      [
	        '8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1',
	        'cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758'
	      ],
	      [
	        '52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63',
	        'c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375'
	      ],
	      [
	        'e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352',
	        '6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d'
	      ],
	      [
	        '7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193',
	        'ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec'
	      ],
	      [
	        '5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00',
	        '9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0'
	      ],
	      [
	        '32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58',
	        'ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c'
	      ],
	      [
	        'e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7',
	        'd3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4'
	      ],
	      [
	        '8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8',
	        'c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f'
	      ],
	      [
	        '4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e',
	        '67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649'
	      ],
	      [
	        '3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d',
	        'cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826'
	      ],
	      [
	        '674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b',
	        '299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5'
	      ],
	      [
	        'd32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f',
	        'f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87'
	      ],
	      [
	        '30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6',
	        '462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b'
	      ],
	      [
	        'be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297',
	        '62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc'
	      ],
	      [
	        '93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a',
	        '7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c'
	      ],
	      [
	        'b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c',
	        'ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f'
	      ],
	      [
	        'd5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52',
	        '4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a'
	      ],
	      [
	        'd3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb',
	        'bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46'
	      ],
	      [
	        '463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065',
	        'bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f'
	      ],
	      [
	        '7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917',
	        '603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03'
	      ],
	      [
	        '74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9',
	        'cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08'
	      ],
	      [
	        '30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3',
	        '553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8'
	      ],
	      [
	        '9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57',
	        '712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373'
	      ],
	      [
	        '176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66',
	        'ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3'
	      ],
	      [
	        '75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8',
	        '9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8'
	      ],
	      [
	        '809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721',
	        '9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1'
	      ],
	      [
	        '1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180',
	        '4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9'
	      ]
	    ]
	  }
	};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var BN = __webpack_require__(4);
	var HmacDRBG = __webpack_require__(32);
	var elliptic = __webpack_require__(1);
	var utils = elliptic.utils;
	var assert = utils.assert;

	var KeyPair = __webpack_require__(33);
	var Signature = __webpack_require__(34);

	function EC(options) {
	  if (!(this instanceof EC))
	    { return new EC(options); }

	  // Shortcut `elliptic.ec(curve-name)`
	  if (typeof options === 'string') {
	    assert(elliptic.curves.hasOwnProperty(options), 'Unknown curve ' + options);

	    options = elliptic.curves[options];
	  }

	  // Shortcut for `elliptic.ec(elliptic.curves.curveName)`
	  if (options instanceof elliptic.curves.PresetCurve)
	    { options = { curve: options }; }

	  this.curve = options.curve.curve;
	  this.n = this.curve.n;
	  this.nh = this.n.ushrn(1);
	  this.g = this.curve.g;

	  // Point on curve
	  this.g = options.curve.g;
	  this.g.precompute(options.curve.n.bitLength() + 1);

	  // Hash for function for DRBG
	  this.hash = options.hash || options.curve.hash;
	}
	module.exports = EC;

	EC.prototype.keyPair = function keyPair(options) {
	  return new KeyPair(this, options);
	};

	EC.prototype.keyFromPrivate = function keyFromPrivate(priv, enc) {
	  return KeyPair.fromPrivate(this, priv, enc);
	};

	EC.prototype.keyFromPublic = function keyFromPublic(pub, enc) {
	  return KeyPair.fromPublic(this, pub, enc);
	};

	EC.prototype.genKeyPair = function genKeyPair(options) {
	  var this$1 = this;

	  if (!options)
	    { options = {}; }

	  // Instantiate Hmac_DRBG
	  var drbg = new HmacDRBG({
	    hash: this.hash,
	    pers: options.pers,
	    persEnc: options.persEnc || 'utf8',
	    entropy: options.entropy || elliptic.rand(this.hash.hmacStrength),
	    entropyEnc: options.entropy && options.entropyEnc || 'utf8',
	    nonce: this.n.toArray()
	  });

	  var bytes = this.n.byteLength();
	  var ns2 = this.n.sub(new BN(2));
	  do {
	    var priv = new BN(drbg.generate(bytes));
	    if (priv.cmp(ns2) > 0)
	      { continue; }

	    priv.iaddn(1);
	    return this$1.keyFromPrivate(priv);
	  } while (true);
	};

	EC.prototype._truncateToN = function truncateToN(msg, truncOnly) {
	  var delta = msg.byteLength() * 8 - this.n.bitLength();
	  if (delta > 0)
	    { msg = msg.ushrn(delta); }
	  if (!truncOnly && msg.cmp(this.n) >= 0)
	    { return msg.sub(this.n); }
	  else
	    { return msg; }
	};

	EC.prototype.sign = function sign(msg, key, enc, options) {
	  var this$1 = this;

	  if (typeof enc === 'object') {
	    options = enc;
	    enc = null;
	  }
	  if (!options)
	    { options = {}; }

	  key = this.keyFromPrivate(key, enc);
	  msg = this._truncateToN(new BN(msg, 16));

	  // Zero-extend key to provide enough entropy
	  var bytes = this.n.byteLength();
	  var bkey = key.getPrivate().toArray('be', bytes);

	  // Zero-extend nonce to have the same byte size as N
	  var nonce = msg.toArray('be', bytes);

	  // Instantiate Hmac_DRBG
	  var drbg = new HmacDRBG({
	    hash: this.hash,
	    entropy: bkey,
	    nonce: nonce,
	    pers: options.pers,
	    persEnc: options.persEnc || 'utf8'
	  });

	  // Number of bytes to generate
	  var ns1 = this.n.sub(new BN(1));

	  for (var iter = 0; true; iter++) {
	    var k = options.k ?
	        options.k(iter) :
	        new BN(drbg.generate(this$1.n.byteLength()));
	    k = this$1._truncateToN(k, true);
	    if (k.cmpn(1) <= 0 || k.cmp(ns1) >= 0)
	      { continue; }

	    var kp = this$1.g.mul(k);
	    if (kp.isInfinity())
	      { continue; }

	    var kpX = kp.getX();
	    var r = kpX.umod(this$1.n);
	    if (r.cmpn(0) === 0)
	      { continue; }

	    var s = k.invm(this$1.n).mul(r.mul(key.getPrivate()).iadd(msg));
	    s = s.umod(this$1.n);
	    if (s.cmpn(0) === 0)
	      { continue; }

	    var recoveryParam = (kp.getY().isOdd() ? 1 : 0) |
	                        (kpX.cmp(r) !== 0 ? 2 : 0);

	    // Use complement of `s`, if it is > `n / 2`
	    if (options.canonical && s.cmp(this$1.nh) > 0) {
	      s = this$1.n.sub(s);
	      recoveryParam ^= 1;
	    }

	    return new Signature({ r: r, s: s, recoveryParam: recoveryParam });
	  }
	};

	EC.prototype.verify = function verify(msg, signature, key, enc) {
	  msg = this._truncateToN(new BN(msg, 16));
	  key = this.keyFromPublic(key, enc);
	  signature = new Signature(signature, 'hex');

	  // Perform primitive values validation
	  var r = signature.r;
	  var s = signature.s;
	  if (r.cmpn(1) < 0 || r.cmp(this.n) >= 0)
	    { return false; }
	  if (s.cmpn(1) < 0 || s.cmp(this.n) >= 0)
	    { return false; }

	  // Validate signature
	  var sinv = s.invm(this.n);
	  var u1 = sinv.mul(msg).umod(this.n);
	  var u2 = sinv.mul(r).umod(this.n);

	  if (!this.curve._maxwellTrick) {
	    var p = this.g.mulAdd(u1, key.getPublic(), u2);
	    if (p.isInfinity())
	      { return false; }

	    return p.getX().umod(this.n).cmp(r) === 0;
	  }

	  // NOTE: Greg Maxwell's trick, inspired by:
	  // https://git.io/vad3K

	  var p = this.g.jmulAdd(u1, key.getPublic(), u2);
	  if (p.isInfinity())
	    { return false; }

	  // Compare `p.x` of Jacobian point with `r`,
	  // this will do `p.x == r * p.z^2` instead of multiplying `p.x` by the
	  // inverse of `p.z^2`
	  return p.eqXToP(r);
	};

	EC.prototype.recoverPubKey = function(msg, signature, j, enc) {
	  assert((3 & j) === j, 'The recovery param is more than two bits');
	  signature = new Signature(signature, enc);

	  var n = this.n;
	  var e = new BN(msg);
	  var r = signature.r;
	  var s = signature.s;

	  // A set LSB signifies that the y-coordinate is odd
	  var isYOdd = j & 1;
	  var isSecondKey = j >> 1;
	  if (r.cmp(this.curve.p.umod(this.curve.n)) >= 0 && isSecondKey)
	    { throw new Error('Unable to find sencond key candinate'); }

	  // 1.1. Let x = r + jn.
	  if (isSecondKey)
	    { r = this.curve.pointFromX(r.add(this.curve.n), isYOdd); }
	  else
	    { r = this.curve.pointFromX(r, isYOdd); }

	  var rInv = signature.r.invm(n);
	  var s1 = n.sub(e).mul(rInv).umod(n);
	  var s2 = s.mul(rInv).umod(n);

	  // 1.6.1 Compute Q = r^-1 (sR -  eG)
	  //               Q = r^-1 (sR + -eG)
	  return this.g.mulAdd(s1, r, s2);
	};

	EC.prototype.getKeyRecoveryParam = function(e, signature, Q, enc) {
	  var this$1 = this;

	  signature = new Signature(signature, enc);
	  if (signature.recoveryParam !== null)
	    { return signature.recoveryParam; }

	  for (var i = 0; i < 4; i++) {
	    var Qprime;
	    try {
	      Qprime = this$1.recoverPubKey(e, signature, i);
	    } catch (e) {
	      continue;
	    }

	    if (Qprime.eq(Q))
	      { return i; }
	  }
	  throw new Error('Unable to find valid recovery factor');
	};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var hash = __webpack_require__(18);
	var utils = __webpack_require__(8);
	var assert = __webpack_require__(7);

	function HmacDRBG(options) {
	  if (!(this instanceof HmacDRBG))
	    { return new HmacDRBG(options); }
	  this.hash = options.hash;
	  this.predResist = !!options.predResist;

	  this.outLen = this.hash.outSize;
	  this.minEntropy = options.minEntropy || this.hash.hmacStrength;

	  this._reseed = null;
	  this.reseedInterval = null;
	  this.K = null;
	  this.V = null;

	  var entropy = utils.toArray(options.entropy, options.entropyEnc || 'hex');
	  var nonce = utils.toArray(options.nonce, options.nonceEnc || 'hex');
	  var pers = utils.toArray(options.pers, options.persEnc || 'hex');
	  assert(entropy.length >= (this.minEntropy / 8),
	         'Not enough entropy. Minimum is: ' + this.minEntropy + ' bits');
	  this._init(entropy, nonce, pers);
	}
	module.exports = HmacDRBG;

	HmacDRBG.prototype._init = function init(entropy, nonce, pers) {
	  var this$1 = this;

	  var seed = entropy.concat(nonce).concat(pers);

	  this.K = new Array(this.outLen / 8);
	  this.V = new Array(this.outLen / 8);
	  for (var i = 0; i < this.V.length; i++) {
	    this$1.K[i] = 0x00;
	    this$1.V[i] = 0x01;
	  }

	  this._update(seed);
	  this._reseed = 1;
	  this.reseedInterval = 0x1000000000000;  // 2^48
	};

	HmacDRBG.prototype._hmac = function hmac() {
	  return new hash.hmac(this.hash, this.K);
	};

	HmacDRBG.prototype._update = function update(seed) {
	  var kmac = this._hmac()
	                 .update(this.V)
	                 .update([ 0x00 ]);
	  if (seed)
	    { kmac = kmac.update(seed); }
	  this.K = kmac.digest();
	  this.V = this._hmac().update(this.V).digest();
	  if (!seed)
	    { return; }

	  this.K = this._hmac()
	               .update(this.V)
	               .update([ 0x01 ])
	               .update(seed)
	               .digest();
	  this.V = this._hmac().update(this.V).digest();
	};

	HmacDRBG.prototype.reseed = function reseed(entropy, entropyEnc, add, addEnc) {
	  // Optional entropy enc
	  if (typeof entropyEnc !== 'string') {
	    addEnc = add;
	    add = entropyEnc;
	    entropyEnc = null;
	  }

	  entropy = utils.toArray(entropy, entropyEnc);
	  add = utils.toArray(add, addEnc);

	  assert(entropy.length >= (this.minEntropy / 8),
	         'Not enough entropy. Minimum is: ' + this.minEntropy + ' bits');

	  this._update(entropy.concat(add || []));
	  this._reseed = 1;
	};

	HmacDRBG.prototype.generate = function generate(len, enc, add, addEnc) {
	  var this$1 = this;

	  if (this._reseed > this.reseedInterval)
	    { throw new Error('Reseed is required'); }

	  // Optional encoding
	  if (typeof enc !== 'string') {
	    addEnc = add;
	    add = enc;
	    enc = null;
	  }

	  // Optional additional data
	  if (add) {
	    add = utils.toArray(add, addEnc || 'hex');
	    this._update(add);
	  }

	  var temp = [];
	  while (temp.length < len) {
	    this$1.V = this$1._hmac().update(this$1.V).digest();
	    temp = temp.concat(this$1.V);
	  }

	  var res = temp.slice(0, len);
	  this._update(add);
	  this._reseed++;
	  return utils.encode(res, enc);
	};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var BN = __webpack_require__(4);
	var elliptic = __webpack_require__(1);
	var utils = elliptic.utils;
	var assert = utils.assert;

	function KeyPair(ec, options) {
	  this.ec = ec;
	  this.priv = null;
	  this.pub = null;

	  // KeyPair(ec, { priv: ..., pub: ... })
	  if (options.priv)
	    { this._importPrivate(options.priv, options.privEnc); }
	  if (options.pub)
	    { this._importPublic(options.pub, options.pubEnc); }
	}
	module.exports = KeyPair;

	KeyPair.fromPublic = function fromPublic(ec, pub, enc) {
	  if (pub instanceof KeyPair)
	    { return pub; }

	  return new KeyPair(ec, {
	    pub: pub,
	    pubEnc: enc
	  });
	};

	KeyPair.fromPrivate = function fromPrivate(ec, priv, enc) {
	  if (priv instanceof KeyPair)
	    { return priv; }

	  return new KeyPair(ec, {
	    priv: priv,
	    privEnc: enc
	  });
	};

	KeyPair.prototype.validate = function validate() {
	  var pub = this.getPublic();

	  if (pub.isInfinity())
	    { return { result: false, reason: 'Invalid public key' }; }
	  if (!pub.validate())
	    { return { result: false, reason: 'Public key is not a point' }; }
	  if (!pub.mul(this.ec.curve.n).isInfinity())
	    { return { result: false, reason: 'Public key * N != O' }; }

	  return { result: true, reason: null };
	};

	KeyPair.prototype.getPublic = function getPublic(compact, enc) {
	  // compact is optional argument
	  if (typeof compact === 'string') {
	    enc = compact;
	    compact = null;
	  }

	  if (!this.pub)
	    { this.pub = this.ec.g.mul(this.priv); }

	  if (!enc)
	    { return this.pub; }

	  return this.pub.encode(enc, compact);
	};

	KeyPair.prototype.getPrivate = function getPrivate(enc) {
	  if (enc === 'hex')
	    { return this.priv.toString(16, 2); }
	  else
	    { return this.priv; }
	};

	KeyPair.prototype._importPrivate = function _importPrivate(key, enc) {
	  this.priv = new BN(key, enc || 16);

	  // Ensure that the priv won't be bigger than n, otherwise we may fail
	  // in fixed multiplication method
	  this.priv = this.priv.umod(this.ec.curve.n);
	};

	KeyPair.prototype._importPublic = function _importPublic(key, enc) {
	  if (key.x || key.y) {
	    // Montgomery points only have an `x` coordinate.
	    // Weierstrass/Edwards points on the other hand have both `x` and
	    // `y` coordinates.
	    if (this.ec.curve.type === 'mont') {
	      assert(key.x, 'Need x coordinate');
	    } else if (this.ec.curve.type === 'short' ||
	               this.ec.curve.type === 'edwards') {
	      assert(key.x && key.y, 'Need both x and y coordinate');
	    }
	    this.pub = this.ec.curve.point(key.x, key.y);
	    return;
	  }
	  this.pub = this.ec.curve.decodePoint(key, enc);
	};

	// ECDH
	KeyPair.prototype.derive = function derive(pub) {
	  return pub.mul(this.priv).getX();
	};

	// ECDSA
	KeyPair.prototype.sign = function sign(msg, enc, options) {
	  return this.ec.sign(msg, this, enc, options);
	};

	KeyPair.prototype.verify = function verify(msg, signature) {
	  return this.ec.verify(msg, signature, this);
	};

	KeyPair.prototype.inspect = function inspect() {
	  return '<Key priv: ' + (this.priv && this.priv.toString(16, 2)) +
	         ' pub: ' + (this.pub && this.pub.inspect()) + ' >';
	};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var BN = __webpack_require__(4);

	var elliptic = __webpack_require__(1);
	var utils = elliptic.utils;
	var assert = utils.assert;

	function Signature(options, enc) {
	  if (options instanceof Signature)
	    { return options; }

	  if (this._importDER(options, enc))
	    { return; }

	  assert(options.r && options.s, 'Signature without r or s');
	  this.r = new BN(options.r, 16);
	  this.s = new BN(options.s, 16);
	  if (options.recoveryParam === undefined)
	    { this.recoveryParam = null; }
	  else
	    { this.recoveryParam = options.recoveryParam; }
	}
	module.exports = Signature;

	function Position() {
	  this.place = 0;
	}

	function getLength(buf, p) {
	  var initial = buf[p.place++];
	  if (!(initial & 0x80)) {
	    return initial;
	  }
	  var octetLen = initial & 0xf;
	  var val = 0;
	  for (var i = 0, off = p.place; i < octetLen; i++, off++) {
	    val <<= 8;
	    val |= buf[off];
	  }
	  p.place = off;
	  return val;
	}

	function rmPadding(buf) {
	  var i = 0;
	  var len = buf.length - 1;
	  while (!buf[i] && !(buf[i + 1] & 0x80) && i < len) {
	    i++;
	  }
	  if (i === 0) {
	    return buf;
	  }
	  return buf.slice(i);
	}

	Signature.prototype._importDER = function _importDER(data, enc) {
	  data = utils.toArray(data, enc);
	  var p = new Position();
	  if (data[p.place++] !== 0x30) {
	    return false;
	  }
	  var len = getLength(data, p);
	  if ((len + p.place) !== data.length) {
	    return false;
	  }
	  if (data[p.place++] !== 0x02) {
	    return false;
	  }
	  var rlen = getLength(data, p);
	  var r = data.slice(p.place, rlen + p.place);
	  p.place += rlen;
	  if (data[p.place++] !== 0x02) {
	    return false;
	  }
	  var slen = getLength(data, p);
	  if (data.length !== slen + p.place) {
	    return false;
	  }
	  var s = data.slice(p.place, slen + p.place);
	  if (r[0] === 0 && (r[1] & 0x80)) {
	    r = r.slice(1);
	  }
	  if (s[0] === 0 && (s[1] & 0x80)) {
	    s = s.slice(1);
	  }

	  this.r = new BN(r);
	  this.s = new BN(s);
	  this.recoveryParam = null;

	  return true;
	};

	function constructLength(arr, len) {
	  if (len < 0x80) {
	    arr.push(len);
	    return;
	  }
	  var octets = 1 + (Math.log(len) / Math.LN2 >>> 3);
	  arr.push(octets | 0x80);
	  while (--octets) {
	    arr.push((len >>> (octets << 3)) & 0xff);
	  }
	  arr.push(len);
	}

	Signature.prototype.toDER = function toDER(enc) {
	  var r = this.r.toArray();
	  var s = this.s.toArray();

	  // Pad values
	  if (r[0] & 0x80)
	    { r = [ 0 ].concat(r); }
	  // Pad values
	  if (s[0] & 0x80)
	    { s = [ 0 ].concat(s); }

	  r = rmPadding(r);
	  s = rmPadding(s);

	  while (!s[0] && !(s[1] & 0x80)) {
	    s = s.slice(1);
	  }
	  var arr = [ 0x02 ];
	  constructLength(arr, r.length);
	  arr = arr.concat(r);
	  arr.push(0x02);
	  constructLength(arr, s.length);
	  var backHalf = arr.concat(s);
	  var res = [ 0x30 ];
	  constructLength(res, backHalf.length);
	  res = res.concat(backHalf);
	  return utils.encode(res, enc);
	};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var hash = __webpack_require__(18);
	var elliptic = __webpack_require__(1);
	var utils = elliptic.utils;
	var assert = utils.assert;
	var parseBytes = utils.parseBytes;
	var KeyPair = __webpack_require__(36);
	var Signature = __webpack_require__(37);

	function EDDSA(curve) {
	  assert(curve === 'ed25519', 'only tested with ed25519 so far');

	  if (!(this instanceof EDDSA))
	    { return new EDDSA(curve); }

	  var curve = elliptic.curves[curve].curve;
	  this.curve = curve;
	  this.g = curve.g;
	  this.g.precompute(curve.n.bitLength() + 1);

	  this.pointClass = curve.point().constructor;
	  this.encodingLength = Math.ceil(curve.n.bitLength() / 8);
	  this.hash = hash.sha512;
	}

	module.exports = EDDSA;

	/**
	* @param {Array|String} message - message bytes
	* @param {Array|String|KeyPair} secret - secret bytes or a keypair
	* @returns {Signature} - signature
	*/
	EDDSA.prototype.sign = function sign(message, secret) {
	  message = parseBytes(message);
	  var key = this.keyFromSecret(secret);
	  var r = this.hashInt(key.messagePrefix(), message);
	  var R = this.g.mul(r);
	  var Rencoded = this.encodePoint(R);
	  var s_ = this.hashInt(Rencoded, key.pubBytes(), message)
	               .mul(key.priv());
	  var S = r.add(s_).umod(this.curve.n);
	  return this.makeSignature({ R: R, S: S, Rencoded: Rencoded });
	};

	/**
	* @param {Array} message - message bytes
	* @param {Array|String|Signature} sig - sig bytes
	* @param {Array|String|Point|KeyPair} pub - public key
	* @returns {Boolean} - true if public key matches sig of message
	*/
	EDDSA.prototype.verify = function verify(message, sig, pub) {
	  message = parseBytes(message);
	  sig = this.makeSignature(sig);
	  var key = this.keyFromPublic(pub);
	  var h = this.hashInt(sig.Rencoded(), key.pubBytes(), message);
	  var SG = this.g.mul(sig.S());
	  var RplusAh = sig.R().add(key.pub().mul(h));
	  return RplusAh.eq(SG);
	};

	EDDSA.prototype.hashInt = function hashInt() {
	  var arguments$1 = arguments;

	  var hash = this.hash();
	  for (var i = 0; i < arguments.length; i++)
	    { hash.update(arguments$1[i]); }
	  return utils.intFromLE(hash.digest()).umod(this.curve.n);
	};

	EDDSA.prototype.keyFromPublic = function keyFromPublic(pub) {
	  return KeyPair.fromPublic(this, pub);
	};

	EDDSA.prototype.keyFromSecret = function keyFromSecret(secret) {
	  return KeyPair.fromSecret(this, secret);
	};

	EDDSA.prototype.makeSignature = function makeSignature(sig) {
	  if (sig instanceof Signature)
	    { return sig; }
	  return new Signature(this, sig);
	};

	/**
	* * https://tools.ietf.org/html/draft-josefsson-eddsa-ed25519-03#section-5.2
	*
	* EDDSA defines methods for encoding and decoding points and integers. These are
	* helper convenience methods, that pass along to utility functions implied
	* parameters.
	*
	*/
	EDDSA.prototype.encodePoint = function encodePoint(point) {
	  var enc = point.getY().toArray('le', this.encodingLength);
	  enc[this.encodingLength - 1] |= point.getX().isOdd() ? 0x80 : 0;
	  return enc;
	};

	EDDSA.prototype.decodePoint = function decodePoint(bytes) {
	  bytes = utils.parseBytes(bytes);

	  var lastIx = bytes.length - 1;
	  var normed = bytes.slice(0, lastIx).concat(bytes[lastIx] & ~0x80);
	  var xIsOdd = (bytes[lastIx] & 0x80) !== 0;

	  var y = utils.intFromLE(normed);
	  return this.curve.pointFromY(y, xIsOdd);
	};

	EDDSA.prototype.encodeInt = function encodeInt(num) {
	  return num.toArray('le', this.encodingLength);
	};

	EDDSA.prototype.decodeInt = function decodeInt(bytes) {
	  return utils.intFromLE(bytes);
	};

	EDDSA.prototype.isPoint = function isPoint(val) {
	  return val instanceof this.pointClass;
	};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var elliptic = __webpack_require__(1);
	var utils = elliptic.utils;
	var assert = utils.assert;
	var parseBytes = utils.parseBytes;
	var cachedProperty = utils.cachedProperty;

	/**
	* @param {EDDSA} eddsa - instance
	* @param {Object} params - public/private key parameters
	*
	* @param {Array<Byte>} [params.secret] - secret seed bytes
	* @param {Point} [params.pub] - public key point (aka `A` in eddsa terms)
	* @param {Array<Byte>} [params.pub] - public key point encoded as bytes
	*
	*/
	function KeyPair(eddsa, params) {
	  this.eddsa = eddsa;
	  this._secret = parseBytes(params.secret);
	  if (eddsa.isPoint(params.pub))
	    { this._pub = params.pub; }
	  else
	    { this._pubBytes = parseBytes(params.pub); }
	}

	KeyPair.fromPublic = function fromPublic(eddsa, pub) {
	  if (pub instanceof KeyPair)
	    { return pub; }
	  return new KeyPair(eddsa, { pub: pub });
	};

	KeyPair.fromSecret = function fromSecret(eddsa, secret) {
	  if (secret instanceof KeyPair)
	    { return secret; }
	  return new KeyPair(eddsa, { secret: secret });
	};

	KeyPair.prototype.secret = function secret() {
	  return this._secret;
	};

	cachedProperty(KeyPair, 'pubBytes', function pubBytes() {
	  return this.eddsa.encodePoint(this.pub());
	});

	cachedProperty(KeyPair, 'pub', function pub() {
	  if (this._pubBytes)
	    { return this.eddsa.decodePoint(this._pubBytes); }
	  return this.eddsa.g.mul(this.priv());
	});

	cachedProperty(KeyPair, 'privBytes', function privBytes() {
	  var eddsa = this.eddsa;
	  var hash = this.hash();
	  var lastIx = eddsa.encodingLength - 1;

	  var a = hash.slice(0, eddsa.encodingLength);
	  a[0] &= 248;
	  a[lastIx] &= 127;
	  a[lastIx] |= 64;

	  return a;
	});

	cachedProperty(KeyPair, 'priv', function priv() {
	  return this.eddsa.decodeInt(this.privBytes());
	});

	cachedProperty(KeyPair, 'hash', function hash() {
	  return this.eddsa.hash().update(this.secret()).digest();
	});

	cachedProperty(KeyPair, 'messagePrefix', function messagePrefix() {
	  return this.hash().slice(this.eddsa.encodingLength);
	});

	KeyPair.prototype.sign = function sign(message) {
	  assert(this._secret, 'KeyPair can only verify');
	  return this.eddsa.sign(message, this);
	};

	KeyPair.prototype.verify = function verify(message, sig) {
	  return this.eddsa.verify(message, sig, this);
	};

	KeyPair.prototype.getSecret = function getSecret(enc) {
	  assert(this._secret, 'KeyPair is public only');
	  return utils.encode(this.secret(), enc);
	};

	KeyPair.prototype.getPublic = function getPublic(enc) {
	  return utils.encode(this.pubBytes(), enc);
	};

	module.exports = KeyPair;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var BN = __webpack_require__(4);
	var elliptic = __webpack_require__(1);
	var utils = elliptic.utils;
	var assert = utils.assert;
	var cachedProperty = utils.cachedProperty;
	var parseBytes = utils.parseBytes;

	/**
	* @param {EDDSA} eddsa - eddsa instance
	* @param {Array<Bytes>|Object} sig -
	* @param {Array<Bytes>|Point} [sig.R] - R point as Point or bytes
	* @param {Array<Bytes>|bn} [sig.S] - S scalar as bn or bytes
	* @param {Array<Bytes>} [sig.Rencoded] - R point encoded
	* @param {Array<Bytes>} [sig.Sencoded] - S scalar encoded
	*/
	function Signature(eddsa, sig) {
	  this.eddsa = eddsa;

	  if (typeof sig !== 'object')
	    { sig = parseBytes(sig); }

	  if (Array.isArray(sig)) {
	    sig = {
	      R: sig.slice(0, eddsa.encodingLength),
	      S: sig.slice(eddsa.encodingLength)
	    };
	  }

	  assert(sig.R && sig.S, 'Signature without R or S');

	  if (eddsa.isPoint(sig.R))
	    { this._R = sig.R; }
	  if (sig.S instanceof BN)
	    { this._S = sig.S; }

	  this._Rencoded = Array.isArray(sig.R) ? sig.R : sig.Rencoded;
	  this._Sencoded = Array.isArray(sig.S) ? sig.S : sig.Sencoded;
	}

	cachedProperty(Signature, 'S', function S() {
	  return this.eddsa.decodeInt(this.Sencoded());
	});

	cachedProperty(Signature, 'R', function R() {
	  return this.eddsa.decodePoint(this.Rencoded());
	});

	cachedProperty(Signature, 'Rencoded', function Rencoded() {
	  return this.eddsa.encodePoint(this.R());
	});

	cachedProperty(Signature, 'Sencoded', function Sencoded() {
	  return this.eddsa.encodeInt(this.S());
	});

	Signature.prototype.toBytes = function toBytes() {
	  return this.Rencoded().concat(this.Sencoded());
	};

	Signature.prototype.toHex = function toHex() {
	  return utils.encode(this.toBytes(), 'hex').toUpperCase();
	};

	module.exports = Signature;


/***/ })
/******/ ])));
});

var elliptic = cryptoBundle.elliptic;
var hashjs = cryptoBundle.hashjs;

var AesCbc = __WEBPACK_IMPORTED_MODULE_3_aes_js___default.a.ModeOfOperation.cbc;

/**
 * @param box an Airbitz JSON encryption box
 * @param key a key, as an ArrayBuffer
 */
function decrypt (box, key) {
  // Check JSON:
  if (box.encryptionType !== 0) {
    throw new Error('Unknown encryption type')
  }
  var iv = base16$1.parse(box.iv_hex);
  var ciphertext = base64$1.parse(box.data_base64);

  // Decrypt:
  var cipher = new AesCbc(key, iv);
  var raw = cipher.decrypt(ciphertext);
  // Alternative using node.js crypto:
  // const decipher = crypto.createDecipheriv('AES-256-CBC', key, iv);
  // let x = decipher.update(box.data_base64, 'base64', 'hex')
  // x += decipher.final('hex')
  // const data = base16.parse(x)

  // Calculate field locations:
  var headerSize = raw[0];
  var dataSize =
    (raw[1 + headerSize] << 24) |
    (raw[2 + headerSize] << 16) |
    (raw[3 + headerSize] << 8) |
    raw[4 + headerSize];
  var dataStart = 1 + headerSize + 4;
  var footerSize = raw[dataStart + dataSize];
  var hashStart = dataStart + dataSize + 1 + footerSize;

  // Verify SHA-256 checksum:
  var hash = hashjs.sha256().update(raw.slice(0, hashStart)).digest();
  var hashSize = hash.length;
  for (var i = 0; i < hashSize; ++i) {
    if (raw[hashStart + i] !== hash[i]) {
      throw new Error('Invalid checksum')
    }
  }

  // Verify pkcs7 padding:
  var paddingStart = hashStart + hashSize;
  var paddingSize = raw.length - paddingStart;
  if (paddingSize <= 0) {
    throw new Error('Mising PKCS7 padding')
  }
  for (var i$1 = paddingStart; i$1 < raw.length; ++i$1) {
    if (raw[i$1] !== paddingSize) {
      throw new Error('Invalid PKCS7 padding')
    }
  }

  // Return the payload:
  return raw.slice(dataStart, dataStart + dataSize)
}

/**
 * @param payload an ArrayBuffer of data
 * @param key a key, as an ArrayBuffer
 */
function encrypt (io, data, key) {
  // Calculate sizes and locations:
  var headerSize = io.random(1)[0] & 0x1f;
  var dataStart = 1 + headerSize + 4;
  var dataSize = data.length;
  var footerStart = dataStart + dataSize + 1;
  var footerSize = io.random(1)[0] & 0x1f;
  var hashStart = footerStart + footerSize;
  var hashSize = 32;
  var paddingStart = hashStart + hashSize;
  var paddingSize = 16 - (paddingStart & 0xf);
  var raw = new Uint8Array(paddingStart + paddingSize);

  // Random header:
  var header = io.random(headerSize);
  raw[0] = headerSize;
  for (var i = 0; i < headerSize; ++i) {
    raw[1 + i] = header[i];
  }

  // Payload data:
  raw[1 + headerSize] = (dataSize >> 24) & 0xff;
  raw[2 + headerSize] = (dataSize >> 16) & 0xff;
  raw[3 + headerSize] = (dataSize >> 8) & 0xff;
  raw[4 + headerSize] = dataSize & 0xff;
  for (var i$1 = 0; i$1 < dataSize; ++i$1) {
    raw[dataStart + i$1] = data[i$1];
  }

  // Random footer:
  var footer = io.random(footerSize);
  raw[dataStart + dataSize] = footerSize;
  for (var i$2 = 0; i$2 < footerSize; ++i$2) {
    raw[footerStart + i$2] = footer[i$2];
  }

  // SHA-256 checksum:
  var hash = hashjs.sha256().update(raw.slice(0, hashStart)).digest();
  for (var i$3 = 0; i$3 < hashSize; ++i$3) {
    raw[hashStart + i$3] = hash[i$3];
  }

  // Add PKCS7 padding:
  for (var i$4 = 0; i$4 < paddingSize; ++i$4) {
    raw[paddingStart + i$4] = paddingSize;
  }

  // Encrypt to JSON:
  var iv = io.random(16);
  var cipher = new AesCbc(key, iv);
  var ciphertext = cipher.encrypt(raw);
  return {
    encryptionType: 0,
    iv_hex: base16$1.stringify(iv),
    data_base64: base64$1.stringify(ciphertext)
  }
}

function hmacSha256 (data, key) {
  var hmac = hashjs.hmac(hashjs.sha256, key);
  return hmac.update(data).digest()
}

function sha256 (data) {
  return hashjs.sha256().update(data).digest()
}

function getStorageWalletLastSync (state, keyId) {
  return state.storageWallets[keyId].status.lastSync
}

function getStorageWalletFolder (state, keyId) {
  return state.storageWallets[keyId].paths.folder
}

function getStorageWalletLocalFolder (state, keyId) {
  return state.storageWallets[keyId].localFolder
}

function hashStorageWalletFilename (state, keyId, data) {
  var dataKey = state.storageWallets[keyId].paths.dataKey;
  return base58.stringify(hmacSha256(data, dataKey))
}

function getIo (state) {
  return state.io
}

function getOnError (state) {
  return state.onError
}

var TYPED_ARRAYS = {
  '[object Float32Array]': true,
  '[object Float64Array]': true,
  '[object Int16Array]': true,
  '[object Int32Array]': true,
  '[object Int8Array]': true,
  '[object Uint16Array]': true,
  '[object Uint32Array]': true,
  '[object Uint8Array]': true,
  '[object Uint8ClampedArray]': true
};

/**
 * Compares two objects that are already known to have a common `[[Class]]`.
 */
function compareObjects (a, b, type) {
  // User-created objects:
  if (type === '[object Object]') {
    var proto = Object.getPrototypeOf(a);
    if (proto !== Object.getPrototypeOf(b)) { return false }

    var keys = Object.getOwnPropertyNames(a);
    if (keys.length !== Object.getOwnPropertyNames(b).length) { return false }

    // We know that both objects have the same number of properties,
    // so if every property in `a` has a matching property in `b`,
    // the objects must be identical, regardless of key order.
    for (var i$2 = 0, list = keys; i$2 < list.length; i$2 += 1) {
      var key = list[i$2];

      if (!b.hasOwnProperty(key) || !compare(a[key], b[key])) { return false }
    }
    return true
  }

  // Arrays:
  if (type === '[object Array]') {
    if (a.length !== b.length) { return false }
    for (var i = 0; i < a.length; ++i) {
      if (!compare(a[i], b[i])) { return false }
    }
    return true
  }

  // Javascript dates:
  if (type === '[object Date]') {
    return a.getTime() === b.getTime()
  }

  // Typed arrays:
  if (TYPED_ARRAYS[type]) {
    if (a.length !== b.length) { return false }
    for (var i$1 = 0; i$1 < a.length; ++i$1) {
      if (a[i$1] !== b[i$1]) { return false }
    }
    return true
  }

  // We don't even try comparing anything else:
  return false
}

/**
 * Returns true if two Javascript values are equal in value.
 */
function compare (a, b) {
  if (a === b) { return true }

  // Fast path for primitives:
  if (typeof a !== 'object') { return false }
  if (typeof b !== 'object') { return false }

  // If these are objects, the internal `[[Class]]` properties must match:
  var type = Object.prototype.toString.call(a);
  if (type !== Object.prototype.toString.call(b)) { return false }

  return compareObjects(a, b, type)
}

/**
 * Returns an object that is value-wise equivalent to `value`,
 * but preserves as much structure from object `original` as possible.
 */
function recycle (value, original) {
  if (value === original) { return original }

  // Fast path for primitives:
  if (typeof value !== 'object') { return value }
  if (typeof original !== 'object') { return value }

  // If these are objects, the internal `[[Class]]` properties must match:
  var type = Object.prototype.toString.call(value);
  if (type !== Object.prototype.toString.call(original)) { return value }

  // Merge user-created objects:
  if (type === '[object Object]') {
    var proto = Object.getPrototypeOf(value);
    if (proto !== Object.getPrototypeOf(original)) { return value }

    var valueKeys = Object.getOwnPropertyNames(value);
    var originalKeys = Object.getOwnPropertyNames(original);

    var changed = false;
    if (valueKeys.length !== originalKeys.length) { changed = true; }

    // Merge the two objects key-by-key:
    var merged = {};
    for (var i$1 = 0, list = valueKeys; i$1 < list.length; i$1 += 1) {
      var key = list[i$1];

      if (!original.hasOwnProperty(key)) {
        changed = true;
        merged[key] = value[key];
      } else {
        var r = recycle(value[key], original[key]);
        if (r !== original[key]) { changed = true; }
        merged[key] = r;
      }
    }

    // If there were no changes, just return the original:
    return changed ? merged : original
  }

  // Merge arrays:
  if (type === '[object Array]') {
    var changed$1 = false;
    if (value.length !== original.length) { changed$1 = true; }

    // Merge the two arrays index-by-index:
    var merged$1 = [];
    for (var i = 0; i < value.length; ++i) {
      var r$1 = recycle(value[i], original[i]);
      if (r$1 !== original[i]) { changed$1 = true; }
      merged$1[i] = r$1;
    }

    // If there were no changes, just return the original:
    return changed$1 ? merged$1 : original
  }

  return compareObjects(value, original, type) ? original : value
}

/**
 * A no-op reducer.
 * The state would generally be pre-loaded at store creation time.
 */
function constReducer (initialState) {
  if ( initialState === void 0 ) initialState = null;

  return function constReducer (state, action) {
    if ( state === void 0 ) state = initialState;

    return state
  }
}

/**
 * Creates a reducer for managing a key/value collection.
 * @param {*} itemReducer The reducer to use on the individual items.
 * @param {*} ACTIONS An object with the strings to use for the
 * `ADD` and `UPDATE` actions.
 */
function listReducer (itemReducer, ACTIONS) {
  if ( ACTIONS === void 0 ) ACTIONS = {};

  return function listReducer (state, action) {
    if ( state === void 0 ) state = {};

    var type = action.type;
    var payload = action.payload;

    switch (type) {
      case ACTIONS.ADD: {
        var id = payload.id;
        var initialState = payload.initialState;
        var out = Object.assign({}, state);
        out[id] = itemReducer(initialState, { type: '' });
        return out
      }
      case ACTIONS.UPDATE: {
        var id$1 = payload.id;
        var action$1 = payload.action;
        // Only update if the item exists:
        if (state[id$1] !== void 0) {
          var out$1 = Object.assign({}, state);
          out$1[id$1] = itemReducer(state[id$1], action$1);
          return out$1
        } else {
          return state
        }
      }
    }
    return state
  }
}

/**
 * A simple settable value reducer.
 */
function settableReducer (initialState, SET) {
  return function settableReducer (state, action) {
    if ( state === void 0 ) state = initialState;

    return action.type === SET ? action.payload : state
  }
}

// Basic wallet list:
var ADD = 'airbitz-core-js/currencyWallet/ADD';
var UPDATE = 'airbitz-core-js/currencyWallet/UPDATE';
var SET_ENGINE = 'airbitz-core-js/currencyWallet/engine/SET';

function add (keyId, initialState) {
  return { type: ADD, payload: { id: keyId, initialState: initialState } }
}

function update (keyId, action) {
  return { type: UPDATE, payload: { id: keyId, action: action } }
}

function setEngine (keyId, engine) {
  return update(keyId, { type: SET_ENGINE, payload: engine })
}

// Wallet settable data:
var SET_BALANCE = 'airbitz-core-js/currencyWallet/balance/SET';
var SET_BLOCK_HEIGHT = 'airbitz-core-js/currencyWallet/blockHeight/SET';
var SET_NAME = 'airbitz-core-js/currencyWallet/name/SET';
var SET_PROGRESS = 'airbitz-core-js/currencyWallet/progress/SET';

function setBalance (keyId, balance) {
  return update(keyId, { type: SET_BALANCE, payload: balance })
}

function setBlockHeight (keyId, blockHeight) {
  return update(keyId, { type: SET_BLOCK_HEIGHT, payload: blockHeight })
}

function setName (keyId, name) {
  return update(keyId, { type: SET_NAME, payload: name })
}

function setProgress (keyId, progress) {
  return update(keyId, { type: SET_PROGRESS, payload: progress })
}

// Transactions list:
var ADD_TXS = 'airbitz-core-js/currencyWallet/transactions/UPDATE';
var SET_FILE = 'airbitz-core-js/currencyWallet/transactions/SET_FILE';
var SET_FILES = 'airbitz-core-js/currencyWallet/transactions/SET_FILES';

function addTxs (keyId, txs, defaultCurrency) {
  return update(keyId, { type: ADD_TXS, payload: { txs: txs, defaultCurrency: defaultCurrency } })
}

function setFile (keyId, txid, json) {
  return update(keyId, { type: SET_FILE, payload: { txid: txid, json: json } })
}

function setFiles (keyId, files) {
  return update(keyId, { type: SET_FILES, payload: { files: files } })
}

/**
 * Merges a new incoming transaction with an existing transaction.
 */
function mergeTx (tx, defaultCurrency, oldTx) {
  if ( oldTx === void 0 ) oldTx = {};

  var out = {
    blockHeight: tx.blockHeight,
    date: tx.date,
    signedTx: tx.signedTx,
    txid: tx.txid,

    nativeAmount: Object.assign({}, oldTx.nativeAmount),
    networkFee: Object.assign({}, oldTx.networkFee),
    providerFee: Object.assign({}, oldTx.providerFee)
  };

  var currencyCode = tx.currencyCode != null ? tx.currencyCode : defaultCurrency;
  out.nativeAmount[currencyCode] = tx.amountSatoshi != null
    ? tx.amountSatoshi.toString()
    : tx.nativeAmount;
  out.networkFee[currencyCode] = tx.networkFee != null
    ? tx.networkFee.toString()
    : '0';
  out.providerFee[currencyCode] = tx.providerFee != null
    ? tx.providerFee.toString()
    : '0';

  return out
}

function files (state, action) {
  if ( state === void 0 ) state = {};

  var type = action.type;
  var payload = action.payload;

  switch (type) {
    case SET_FILE: {
      var txid = payload.txid;
      var json = payload.json;
      var out = Object.assign({}, state);
      out[txid] = json;
      return out
    }
    case SET_FILES: {
      var files = payload.files;
      return recycle(files, state)
    }
  }
  return state
}

/**
 * Transaction list reducer.
 */
function txs (state, action) {
  if ( state === void 0 ) state = {};

  var type = action.type;
  var payload = action.payload;

  switch (type) {
    case ADD_TXS: {
      var txs = payload.txs;
      var defaultCurrency = payload.defaultCurrency;
      var out = Object.assign({}, state);
      for (var i = 0, list = txs; i < list.length; i += 1) {
        var tx = list[i];

        out[tx.txid] = mergeTx(tx, defaultCurrency, out[tx.txid]);
      }
      return out
    }
  }
  return state
}

/**
 * Individual wallet reducer.
 */
var currencyWallet = Object(__WEBPACK_IMPORTED_MODULE_4_redux__["b" /* combineReducers */])({
  // Basic wallet stuff:
  engine: settableReducer(0, SET_ENGINE),
  plugin: constReducer(),

  // Settable data:
  balance: settableReducer({currencyCode: '', balance: 0}, SET_BALANCE),
  blockHeight: settableReducer(0, SET_BLOCK_HEIGHT),
  name: settableReducer(null, SET_NAME),
  progress: settableReducer(null, SET_PROGRESS),

  // Transaction data:
  files: files,
  txs: txs
});

/**
 * Wallet list reducer.
 */
var currencyWallets = listReducer(currencyWallet, { ADD: ADD, UPDATE: UPDATE });

/**
 * Creates the initial state for a currency wallet and adds it to the store.
 * @param opts The options passed to `createCurrencyWallet`.
 * @return A `Promise` that will resolve when the state is ready.
 */
function addCurrencyWallet$$1 (keyInfo, opts) {
  if ( opts === void 0 ) opts = {};

  return function (dispatch, getState) {
    var plugin = opts.plugin;
    if (plugin.currencyInfo == null) {
      plugin.currencyInfo = plugin.getInfo();
    }

    return dispatch(addStorageWallet(keyInfo)).then(function () {
      var state = getState();
      var keyId = keyInfo.id;

      // Add the wallet to the store:
      dispatch(add(keyId, { plugin: plugin }));

      // Create the currency plugin:
      var defaultCurrency = plugin.currencyInfo.currencyCode;
      var engine = plugin.makeEngine(keyInfo, {
        walletFolder: getStorageWalletFolder(state, keyId),
        walletLocalFolder: getStorageWalletLocalFolder(state, keyId),
        callbacks: {
          onAddressesChecked: function onAddressesChecked (ratio) {
            dispatch(setProgress(keyId, ratio));
          },

          onBalanceChanged: function onBalanceChanged (currencyCode, balance) {
            dispatch(setBalance(keyId, { currencyCode: currencyCode, balance: balance }));
          },

          onBlockHeightChanged: function onBlockHeightChanged (height) {
            dispatch(setBlockHeight(keyId, height));
          },

          onTransactionsChanged: function onTransactionsChanged (txs) {
            if (!txs) { return }
            dispatch(addTxs(keyId, txs, defaultCurrency));
          }
        }
      });

      return Promise.resolve(engine).then(function (engine) {
        dispatch(setEngine(keyId, engine));

        // Sign up for events:
        var disposer = dispatch(
          createReaction(
            function (state) { return getStorageWalletLastSync(state, keyId); },
            function (timestamp) { return function (dispatch) { return dispatch(loadFiles(keyId)); }; }
          )
        );
        return disposer.payload.out.then(function () { return keyInfo.id; })
      })
    })
  }
}

/**
 * Changes a wallet's name.
 */
function renameCurrencyWallet$$1 (keyId, name) {
  return function (dispatch, getState) { return getStorageWalletFolder(getState(), keyId)
      .file('WalletName.json')
      .setText(JSON.stringify({ walletName: name }))
      .then(function () { return dispatch(setName(keyId, name)); }); }
}

/**
 * Updates the wallet in response to data syncs.
 */
function loadFiles (keyId) {
  return function (dispatch, getState) {
    var folder = getStorageWalletFolder(getState(), keyId);

    return Promise.all([
      // Wallet name:
      folder
        .file('WalletName.json')
        .getText()
        .then(function (text) { return JSON.parse(text).walletName; })
        .catch(function (e) { return null; })
        .then(function (name) { return dispatch(setName(keyId, name)); }),
      // Transaction metadata:
      Object(__WEBPACK_IMPORTED_MODULE_5_disklet__["f" /* mapFiles */])(folder.folder('transaction'), function (file) { return file.getText().then(function (text) { return JSON.parse(text); }).catch(function (e) { return null; }); }
      ).then(function (files) {
        var out = {};
        var jsons = files.filter(function (json) { return json != null && json.txid != null; });
        for (var i = 0, list = jsons; i < list.length; i += 1) {
          var json = list[i];

          out[json.txid] = json;
        }
        return dispatch(setFiles(keyId, out))
      })
    ])
  }
}

/**
 * Changes a wallet's metadata.
 */
function setCurrencyWalletTxMetadata$$1 (
  keyId,
  txid,
  currencyCode,
  metadata
) {
  return function (dispatch, getState) {
    var state = getState();
    var folder = getStorageWalletFolder(state, keyId);
    var oldFile = getCurrencyWalletFile(state, keyId, txid);
    var newFile = {
      txid: txid,
      internal: false,
      currencies: {}
    };
    newFile.currencies[currencyCode] = {
      metadata: metadata
    };
    var file = mergeDeeply(oldFile, newFile);

    // Ensure we have a date:
    if (oldFile == null) {
      file.creationDate = Date.now() / 1000;
    }

    // Save the new file:
    dispatch(setFile(keyId, txid, file));
    return folder
      .folder('transaction')
      .file(txid + '.json')
      .setText(JSON.stringify(file))
      .then(function () { return void 0; })
  }
}

function setupNewTxMetadata$$1 (keyId, tx) {
  return function (dispatch, getState) {
    var state = getState();
    var folder = getStorageWalletFolder(state, keyId);
    var fiatCurrency = getCurrencyWalletFiat(state, keyId);
    var txid = tx.txid;

    // Basic file template:
    var file = {
      txid: txid,
      internal: true,
      creationDate: Date.now() / 1000,
      currencies: {}
    };

    // Trick `getCurrencyMultiplier` into using our plugin:
    var fakeState = {
      plugins: { currencyPlugins: [getCurrencyWalletPlugin(state, keyId)] }
    };

    // Set up exchange-rate metadata:
    for (var i = 0, list = Object.keys(tx.nativeAmount); i < list.length; i += 1) {
      var currency = list[i];

      var rate =
        getExchangeRate(state, currency, fiatCurrency, function () { return 1; }) /
        getCurrencyMultiplier(fakeState, currency);
      var nativeAmount = tx.nativeAmount[currency];

      var metadata = { exchangeAmount: {} };
      metadata.exchangeAmount[fiatCurrency] = rate * nativeAmount;
      file.currencies[currency] = { metadata: metadata, nativeAmount: nativeAmount };
    }

    // Save the new file:
    dispatch(setFile(keyId, txid, file));
    return folder
      .folder('transaction')
      .file(txid + '.json')
      .setText(JSON.stringify(file))
      .then(function () { return void 0; })
  }
}

/**
 * If the function f throws an error, return that as a rejected promise.
 */
function rejectify (f) {
  return function rejectify () {
    var rest = [], len = arguments.length;
    while ( len-- ) rest[ len ] = arguments[ len ];

    try {
      return f.apply(this, rest)
    } catch (e) {
      return Promise.reject(e)
    }
  }
}

/**
 * Prevents a function from running in parallel.
 * The currently-running operation must finish before the new one starts.
 */
function serialize (f) {
  var nextTask = Promise.resolve();
  return function serialize () {
    var this$1 = this;
    var rest = [], len = arguments.length;
    while ( len-- ) rest[ len ] = arguments[ len ];

    var onDone = function () { return f.apply(this$1, rest); };
    nextTask = nextTask.then(onDone, onDone);
    return nextTask
  }
}

var ADD_PAIRS = 'airbitz-core-js/exchangeCache/ADD_PAIRS';

function addPairs (pairs) {
  return { type: ADD_PAIRS, payload: pairs }
}

function addRoute (routes, from, to, pair) {
  if (!routes[from]) { routes[from] = {}; }
  if (!routes[from][to]) { routes[from][to] = []; }
  routes[from][to].push(pair);
}

/**
 * Currency rates reducer.
 * The raw state is just a list of currency pairs, each having a
 * `fromCurrency`, `toCurrency`, `rate`, `source`, and `timestamp` field.
 *
 * Based on this raw state, we also maintain a map of unique id's.
 * This is used to remove duplicates when we add new pairs to the state.
 * If a new pair has the same identity as an existing pair,
 * we use the mapped index to stomp over the old pair.
 *
 * Finally, we store a routing table, which is is just the pairs list
 * indexed by currency. The routing table has twice as many entries
 * as the pair list, since each pair works both ways.
 */
function rates (state, action) {
  if ( state === void 0 ) state = { ids: {}, pairs: [], routes: {} };

  if (action.type === ADD_PAIRS) {
    var ids = state.ids;
    var pairs = [].concat( state.pairs );

    // Update the id map and pairs array:
    for (var i$2 = 0, list = action.payload; i$2 < list.length; i$2 += 1) {
      var pair = list[i$2];

      var id = (pair.source) + "," + (pair.fromCurrency) + "," + (pair.toCurrency);

      // Have we ever seen this one before?
      var i = ids[id];
      if (i == null) {
        // Copy-on-write ids list:
        if (ids === state.ids) { ids = Object.assign({}, state.ids); }
        ids[id] = pairs.length;
        pairs.push(pair);
      } else {
        pairs[i] = pair;
      }
    }

    // Populate the routes table:
    var routes = state.routes;
    if (pairs.length !== state.pairs.length) {
      routes = {};
      for (var i$1 = 0; i$1 < pairs.length; ++i$1) {
        addRoute(routes, pairs[i$1].fromCurrency, pairs[i$1].toCurrency, i$1);
        addRoute(routes, pairs[i$1].toCurrency, pairs[i$1].fromCurrency, i$1);
      }
    }

    return { ids: ids, pairs: pairs, routes: routes }
  }

  return state
}

var exchangeCache = Object(__WEBPACK_IMPORTED_MODULE_4_redux__["b" /* combineReducers */])({
  rates: rates
});

function fetchExchangeRates () {
  return function (dispatch, getState) {
    var state = getState();
    var onError = getOnError(state);
    var plugins = getExchangePlugins(state);

    // TODO: Stop hard-coding this once wallets have a fiat setting:
    var pairs = [
      { fromCurrency: 'BTC', toCurrency: 'iso:EUR' },
      { fromCurrency: 'BTC', toCurrency: 'iso:USD' },
      { fromCurrency: 'ETH', toCurrency: 'iso:EUR' },
      { fromCurrency: 'ETH', toCurrency: 'iso:USD' }
    ];

    return Promise.all(
      plugins.map(function (plugin) { return rejectify(plugin.fetchExchangeRates)(pairs).catch(function (e) {
          onError(e);
          return []
        }); }
      )
    ).then(function (pairLists) {
      var timestamp = Date.now() / 1000;
      var pairs = [];
      for (var i = 0; i < plugins.length; ++i) {
        var source = plugins[i].exchangeInfo.exchangeName;
        for (var i$1 = 0, list = pairLists[i]; i$1 < list.length; i$1 += 1) {
          var pair = list[i$1];

          var fromCurrency = pair.fromCurrency;
          var toCurrency = pair.toCurrency;
          var rate = pair.rate;
          pairs.push({ fromCurrency: fromCurrency, toCurrency: toCurrency, rate: rate, source: source, timestamp: timestamp });
        }
      }

      return dispatch(addPairs(pairs))
    })
  }
}

var SET = 'airbitz-core-js/plugins/SET';

function setPlugins (currencyPlugins, exchangePlugins) {
  return { type: SET, payload: { currencyPlugins: currencyPlugins, exchangePlugins: exchangePlugins } }
}

var initialState = {
  currencyPlugins: [],
  exchangePlugins: []
};

var plugins = settableReducer(initialState, SET);

function setupPlugins (io, plugins$$1) {
  var currencyPromises = [];
  var exchangePromises = [];

  for (var i = 0, list = plugins$$1; i < list.length; i += 1) {
    var plugin = list[i];

    switch (plugin.pluginType) {
      case 'currency':
        currencyPromises.push(plugin.makePlugin(io));
        break
      case 'exchange':
        exchangePromises.push(plugin.makePlugin(io));
        break
      default:
        throw new Error(("Unknown plugin type " + (plugin.pluginType)))
    }
  }

  return function (dispatch) { return Promise.all([
      Promise.all(currencyPromises),
      Promise.all(exchangePromises)
    ]).then(function (ref) {
      var currencyPlugins = ref[0];
      var exchangePlugins = ref[1];

      // Fix legacy plugins:
      for (var i = 0, list = currencyPlugins; i < list.length; i += 1) {
        var plugin = list[i];

        if (plugin.currencyInfo == null) {
          plugin.currencyInfo = plugin.getInfo();
        }
      }

      return dispatch(setPlugins(currencyPlugins, exchangePlugins))
    }); }
}

var getTime = typeof window !== 'undefined' && window.performance
  ? function () { return window.performance.now(); }
  : function () { return Date.now(); };

function timeScrypt (scrypt, data, snrp, dklen) {
  if ( dklen === void 0 ) dklen = 32;

  if (typeof data === 'string') {
    data = utf8.parse(data);
  }

  var salt = base16$1.parse(snrp.salt_hex);
  var startTime = getTime();
  return scrypt(data, salt, snrp.n, snrp.r, snrp.p, dklen).then(function (hash) { return ({
    hash: hash,
    time: getTime() - startTime
  }); })
}

function scryptReducer (state, action) {
  if ( state === void 0 ) state = {};

  var type = action.type;
  var payload = action.payload;

  if (type === INIT) {
    var io = payload.io;

    return {
      timeScrypt: serialize(function (data, snrp, dklen) { return timeScrypt(io.scrypt, data, snrp, dklen); }
      ),
      benchmark: null
    }
  }
  return state
}

var ADD$1 = 'airbitz-core-js/storageWallet/ADD';
var UPDATE$1 = 'airbitz-core-js/storageWallet/UPDATE';
var SET_STATUS = 'airbitz-core-js/storageWallet/SET_STATUS';

function add$1 (keyId, initialState) {
  return { type: ADD$1, payload: { id: keyId, initialState: initialState } }
}

function update$1 (keyId, action) {
  return { type: UPDATE$1, payload: { id: keyId, action: action } }
}

function setStatus (keyId, status) {
  return update$1(keyId, { type: SET_STATUS, payload: status })
}

/**
 * Individual wallet reducer.
 */
var storageWallet = Object(__WEBPACK_IMPORTED_MODULE_4_redux__["b" /* combineReducers */])({
  localFolder: constReducer(),
  paths: constReducer(),
  status: settableReducer({}, SET_STATUS)
});

/**
 * Wallet list reducer.
 */
var storageWallets = listReducer(storageWallet, { ADD: ADD$1, UPDATE: UPDATE$1 });

var INIT = 'airbitz-core-js/INIT';

/**
 * Initializes the redux store on context creation.
 */
function initStore (io, onError) {
  return { type: INIT, payload: { io: io, onError: onError } }
}

function io (state, action) {
  if ( state === void 0 ) state = {};

  return action.type === INIT ? action.payload.io : state
}

function onError (state, action) {
  if ( state === void 0 ) state = function () {};

  return action.type === INIT ? action.payload.onError : state
}

var reducer = Object(__WEBPACK_IMPORTED_MODULE_4_redux__["b" /* combineReducers */])({
  // Library state:
  io: io,
  onError: onError,
  plugins: plugins,
  scrypt: scryptReducer,

  // Exchanges:
  exchangeCache: exchangeCache,

  // Wallet state:
  currencyWallets: currencyWallets,
  storageWallets: storageWallets
});

/**
 * A file within an encrypted folder.
 */
var RepoFile = function RepoFile (io, dataKey, file) {
  this.io = io;
  this.dataKey = dataKey;
  this.file = file;
};

RepoFile.prototype.delete = function delete$1 () {
  return this.file.delete()
};

RepoFile.prototype.getData = function getData () {
    var this$1 = this;

  return this.file
    .getText()
    .then(function (text) { return JSON.parse(text); })
    .then(function (json) { return decrypt(json, this$1.dataKey); })
};

RepoFile.prototype.getText = function getText () {
  return this.getData().then(function (data) { return utf8.stringify(data); })
};

RepoFile.prototype.setData = function setData (data) {
  return this.file.setText(
    JSON.stringify(encrypt(this.io, data, this.dataKey))
  )
};

RepoFile.prototype.setText = function setText (text) {
  return this.setData(utf8.parse(text))
};

/**
 * Wraps a folder with automatic encryption and decryption.
 */
var RepoFolder = function RepoFolder (io, dataKey, folder) {
  this.io = io;
  this.dataKey = dataKey;
  this.inner = folder;
};

RepoFolder.prototype.delete = function delete$2 () {
  return this.inner.delete()
};

RepoFolder.prototype.file = function file (name) {
  return new RepoFile(this.io, this.dataKey, this.inner.file(name))
};

RepoFolder.prototype.folder = function folder (name) {
  return new RepoFolder(this.io, this.dataKey, this.inner.folder(name))
};

RepoFolder.prototype.listFiles = function listFiles () {
  return this.inner.listFiles()
};

RepoFolder.prototype.listFolders = function listFolders () {
  return this.inner.listFolders()
};

/*
 * These are errors the core knows about.
 *
 * The GUI should handle these errors in an "intelligent" way, such as by
 * displaying a localized error message or asking the user for more info.
 * All these errors have a `type` field, which the GUI can use to select
 * the appropriate response.
 *
 * Other errors are possible, of course, since the Javascript language
 * itself can generate exceptions. Those errors won't have a `type` field,
 * and the GUI should just show them with a stack trace & generic message,
 * since the program has basically crashed at that point.
 */

/**
 * Could not reach the server at all.
 */
function NetworkError (message) {
  var e = new Error(message || 'Cannot reach the network');
  e.name = e.type = NetworkError.name;
  return e
}
NetworkError.type = NetworkError.name;

/**
 * The endpoint on the server is obsolete, and the app needs to be upgraded.
 */
function ObsoleteApiError (message) {
  var e = new Error(message || 'The application is too old. Please upgrade.');
  e.name = e.type = ObsoleteApiError.name;
  return e
}
ObsoleteApiError.type = ObsoleteApiError.name;

/**
 * Cannot find a login with that id.
 *
 * Reasons could include:
 * - Password login: wrong username
 * - PIN login: wrong PIN key
 * - Recovery login: wrong username, or wrong recovery key
 */
function UsernameError (message) {
  var e = new Error(message || 'Invalid username');
  e.name = e.type = UsernameError.name;
  return e
}
UsernameError.type = UsernameError.name;

/**
 * The provided authentication is incorrect.
 *
 * Reasons could include:
 * - Password login: wrong password
 * - PIN login: wrong PIN
 * - Recovery login: wrong answers
 *
 * The error object may include a `wait` member,
 * which is the number of seconds the user must wait before trying again.
 */
function PasswordError (resultsJson, message) {
  if ( resultsJson === void 0 ) resultsJson = {};

  var e = new Error(message || 'Invalid password');
  e.name = e.type = PasswordError.name;
  e.wait = resultsJson.wait_seconds;
  return e
}
PasswordError.type = PasswordError.name;

/**
 * The OTP token was missing / incorrect.
 *
 * The error object should include a `resetToken` member,
 * which can be used to reset OTP protection on the account.
 *
 * The error object may include a `resetDate` member,
 * which indicates that an OTP reset is already pending,
 * and when it will complete.
 */
function OtpError (resultsJson, message) {
  if ( resultsJson === void 0 ) resultsJson = {};

  var e = new Error(message || 'Invalid OTP token');
  e.name = e.type = OtpError.name;
  e.resetToken = resultsJson.otp_reset_auth;
  if (resultsJson.otp_timeout_date != null) {
    e.resetDate = new Date(1000 * resultsJson.otp_timeout_date);
  }
  return e
}
OtpError.type = OtpError.name;


var error = Object.freeze({
	NetworkError: NetworkError,
	ObsoleteApiError: ObsoleteApiError,
	UsernameError: UsernameError,
	PasswordError: PasswordError,
	OtpError: OtpError
});

/**
 * Waits for the first successful promise.
 * If no promise succeeds, returns the last failure.
 */


/**
 * If the promise doesn't resolve in the given time,
 * reject it with the provided error, or a generic error if none is provided.
 */
function timeout (promise, ms, error) {
  error = error || new Error(("Timeout of " + ms + "ms exceeded"));
  var timeout = new Promise(function (resolve, reject) {
    var timer = setTimeout(function () { return reject(error); }, ms);
    var onDone = function () { return clearTimeout(timer); };
    promise.then(onDone, onDone);
  });
  return Promise.race([promise, timeout])
}

var syncServers = ['https://git-js.airbitz.co', 'https://git4-js.airbitz.co'];

/**
 * Fetches some resource from a sync server.
 */
function syncRequest (io, method, uri, body) {
  return syncRequestInner(io, method, uri, body, 0)
}

function syncRequestInner (io, method, path, body, serverIndex) {
  var opts = {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  };
  if (method !== 'GET') {
    opts.body = JSON.stringify(body);
  }

  var uri = syncServers[serverIndex] + path;
  io.console.info((method + " " + uri));
  return timeout(
    io.fetch(uri, opts).then(
      function (response) { return response.json().catch(function (jsonError) {
          throw new Error('Non-JSON reply, HTTP status ' + response.status)
        }); },
      function (networkError) {
        throw new NetworkError('Could not reach the sync server')
      }
    ),
    10000,
    new NetworkError('Could not reach the sync server: timeout')
  ).catch(function (e) {
    if (serverIndex + 1 < syncServers.length) {
      return syncRequestInner(io, method, path, body, serverIndex + 1)
    } else {
      throw e
    }
  })
}

/**
 * Sets up the back-end folders needed to emulate Git on disk.
 * You probably don't want this.
 */
function makeRepoPaths (io, keyInfo) {
  var dataKey = base64$1.parse(keyInfo.keys.dataKey);
  var syncKey = base64$1.parse(keyInfo.keys.syncKey);
  var base = io.folder
    .folder('repos')
    .folder(base58.stringify(sha256(sha256(syncKey))));
  var changesFolder = base.folder('changes');
  var dataFolder = base.folder('data');
  var unionFolder = Object(__WEBPACK_IMPORTED_MODULE_5_disklet__["d" /* makeUnionFolder */])(changesFolder, dataFolder);

  return {
    dataKey: dataKey,
    syncKey: syncKey,
    changesFolder: changesFolder,
    dataFolder: dataFolder,
    folder: new RepoFolder(io, dataKey, unionFolder),
    statusFile: base.file('status.json')
  }
}

function loadRepoStatus (paths) {
  var fallback = { lastSync: 0 };
  return paths.statusFile
    .getText()
    .then(function (text) { return (Object.assign({}, {lastSync: 0}, JSON.parse(text))); })
    .catch(function (e) { return fallback; })
}

/**
 * This will save a changeset into the local storage.
 * This function ignores folder-level deletes and overwrites,
 * but those can't happen under the current rules anyhow.
 */
function saveChanges (folder, changes) {
  return Promise.all(
    Object.keys(changes).map(function (path) {
      var json = changes[path];
      var file = Object(__WEBPACK_IMPORTED_MODULE_5_disklet__["a" /* locateFile */])(folder, path);

      return json != null ? file.setText(JSON.stringify(json)) : file.delete()
    })
  )
}

/**
 * Synchronizes the local store with the remote server.
 */
function syncRepo (io, paths, status) {
  var changesFolder = paths.changesFolder;
  var dataFolder = paths.dataFolder;
  var statusFile = paths.statusFile;
  var syncKey = paths.syncKey;

  return Object(__WEBPACK_IMPORTED_MODULE_5_disklet__["e" /* mapAllFiles */])(changesFolder, function (file, name) { return file.getText().then(function (text) { return ({ file: file, name: name, json: JSON.parse(text) }); }); }
  ).then(function (ourChanges) {
    // If we have local changes, we need to bundle those:
    var request = {};
    if (ourChanges.length > 0) {
      request.changes = {};
      for (var i = 0, list = ourChanges; i < list.length; i += 1) {
        var change = list[i];

        request.changes[change.name] = change.json;
      }
    }
    var method = request.changes ? 'POST' : 'GET';

    // Calculate the URI:
    var path = '/api/v2/store/' + base16$1.stringify(syncKey);
    if (status.lastHash != null) {
      path += '/' + status.lastHash;
    }

    // Make the request:
    return syncRequest(io, method, path, request).then(function (reply) {
      var changes = reply.changes; if ( changes === void 0 ) changes = {};
      var hash = reply.hash;

      // Save the incoming changes into our `data` folder:
      return saveChanges(dataFolder, changes)
        .then(
          // Delete any changed keys (since the upload is done):
          function () { return Promise.all(ourChanges.map(function (change) { return change.file.delete(); })); }
        )
        .then(function () {
          // Update the repo status:
          status.lastSync = Date.now() / 1000;
          if (hash != null) { status.lastHash = hash; }
          return statusFile
            .setText(JSON.stringify(status))
            .then(function () { return ({ status: status, changes: changes }); })
        })
    })
  })
}

function addStorageWallet (keyInfo) {
  return function (dispatch, getState) {
    var io = getIo(getState());

    var paths = makeRepoPaths(io, keyInfo);
    var localFolder = io.folder
      .folder('local')
      .folder(base58.stringify(base64$1.parse(keyInfo.id)));

    return loadRepoStatus(paths).then(function (status) {
      dispatch(add$1(keyInfo.id, { localFolder: localFolder, paths: paths, status: status }));
      return dispatch(syncStorageWallet(keyInfo.id))
    })
  }
}

function syncStorageWallet (keyId) {
  return function (dispatch, getState) {
    var state = getState();
    var io = getIo(state);
    var ref = state.storageWallets[keyId];
    var paths = ref.paths;
    var status = ref.status;

    return syncRepo(io, paths, Object.assign({}, status)).then(function (ref) {
      var changes = ref.changes;
      var status = ref.status;

      dispatch(setStatus(keyId, status));
      return Object.keys(changes).length !== 0
    })
  }
}

/**
 * Prepares an async API endpoint for consumption by the outside world.
 */
function asyncApi (f, onError, name) {
  return function asyncApi () {
    var rest = [], len = arguments.length;
    while ( len-- ) rest[ len ] = arguments[ len ];

    var promise = rejectify(f).apply(this, rest).catch(function (e) {
      onError(e, name);
      throw e
    });

    // Figure out what to do with the promise:
    var callback = rest[rest.length - 1];
    if (f.length < rest.length && typeof callback === 'function') {
      promise.then(function (reply) { return callback(null, reply); }).catch(function (e) { return callback(e); });
    } else {
      return promise
    }
  }
}

/**
 * Prepares a sync API endploint for consumption by the outside world.
 */
function syncApi (f, onError, name) {
  return function syncApi () {
    var rest = [], len = arguments.length;
    while ( len-- ) rest[ len ] = arguments[ len ];

    try {
      return f.apply(this, rest)
    } catch (e) {
      onError(e, name);
      throw e
    }
  }
}

/**
 * Adjusts a property decscriptor, making the property ready for use as an API.
 */
function wrapProperty (key, d, onError, className, opts) {
  if ( opts === void 0 ) opts = {};

  // Wrap functions:
  if (typeof d.value === 'function') {
    var name = className + "." + key;
    d.value = opts.sync
      ? syncApi(d.value, onError, name)
      : asyncApi(d.value, onError, name);
  }
  if (d.get != null) {
    d.get = syncApi(d.get, onError, ("get " + className + "." + key));
  }
  if (d.set != null) {
    d.set = syncApi(d.set, onError, ("set " + className + "." + key));
  }

  // Properties are read-only by default:
  if (!opts.writable && d.get == null && d.set == null) {
    d.writable = false;
  }

  return d
}

/**
 * Copies the provided object, making its properties ready for use as an API.
 * If a property name starts with `@`, it is treated as an options structure.
 */
function wrapObject (onError, className, object) {
  var out = {};

  for (var i = 0, list = Object.getOwnPropertyNames(object); i < list.length; i += 1) {
    // Skip over options:
    var key = list[i];

    if (/^@/.test(key)) { continue }

    // Copy properties:
    var d = Object.getOwnPropertyDescriptor(object, key);
    var opts = object['@' + key];
    Object.defineProperty(
      out,
      key,
      wrapProperty(key, d, onError, className, opts)
    );
  }

  return out
}

function copyProperties (target, object) {
  for (var i = 0, list = Object.getOwnPropertyNames(object); i < list.length; i += 1) {
    var key = list[i];

    var d = Object.getOwnPropertyDescriptor(object, key);
    Object.defineProperty(target, key, d);
  }
  return target
}

function makeStorageWalletApi (redux$$1, keyInfo, callbacks) {
  var id = keyInfo.id;
  var type = keyInfo.type;
  var keys = keyInfo.keys;
  var onDataChanged = callbacks.onDataChanged;

  if (onDataChanged) {
    redux$$1.dispatch(
      createReaction(
        function (state) { return getStorageWalletLastSync(state, id); },
        onDataChanged
      )
    );
  }

  return {
    // Broken-out key info:
    id: id,
    type: type,
    keys: keys,

    // Folders:
    get folder () {
      return getStorageWalletFolder(redux$$1.getState(), id)
    },

    get localFolder () {
      return getStorageWalletLocalFolder(redux$$1.getState(), id)
    },

    sync: function sync () {
      return redux$$1.dispatch(syncStorageWallet(id))
    }
  }
}

function nop () {}

var fakeMetadata = {
  bizId: 0,
  category: '',
  exchangeAmount: {},
  name: '',
  notes: ''
};

/**
 * Creates a `CurrencyWallet` API object.
 */
function makeCurrencyWallet (keyInfo, opts) {
  var io = opts.io;
  var callbacks = opts.callbacks; if ( callbacks === void 0 ) callbacks = {};
  var redux$$1 = io.redux;

  return redux$$1
    .dispatch(addCurrencyWallet$$1(keyInfo, opts))
    .then(function (keyId) { return wrapObject(
        io.onError,
        'CurrencyWallet',
        makeCurrencyApi(redux$$1, keyInfo, callbacks)
      ); }
    )
}

/**
 * Creates an unwrapped account API object around an account state object.
 */
function makeCurrencyApi (redux$$1, keyInfo, callbacks) {
  var dispatch = redux$$1.dispatch;
  var getState = redux$$1.getState;
  var keyId = keyInfo.id;

  // Bound selectors:
  var engine = function () { return getCurrencyWalletEngine(getState(), keyId); };
  var plugin = function () { return getCurrencyWalletPlugin(getState(), keyId); };

  var onAddressesChecked = callbacks.onAddressesChecked;
  var onBalanceChanged = callbacks.onBalanceChanged;
  var onBlockHeightChanged = callbacks.onBlockHeightChanged;
  var onDataChanged = callbacks.onDataChanged;
  var onNewTransactions = callbacks.onNewTransactions; if ( onNewTransactions === void 0 ) onNewTransactions = nop;
  var onTransactionsChanged = callbacks.onTransactionsChanged; if ( onTransactionsChanged === void 0 ) onTransactionsChanged = nop;
  var onWalletNameChanged = callbacks.onWalletNameChanged;

  // Hook up engine callbacks:
  if (onAddressesChecked) {
    dispatch(
      createReaction(
        function (state) { return getCurrencyWalletProgress(state, keyId); },
        onAddressesChecked
      )
    );
  }

  if (onBalanceChanged) {
    dispatch(
      createReaction(
        function (state) { return getCurrencyWalletBalance(state, keyId); },
        function (balance) { return onBalanceChanged(balance.currencyCode, balance.balance); }
      )
    );
  }

  if (onBlockHeightChanged) {
    dispatch(
      createReaction(
        function (state) { return getCurrencyWalletBlockHeight(state, keyId); },
        onBlockHeightChanged
      )
    );
  }

  // Hook up storage callback:
  if (onDataChanged) {
    dispatch(
      createReaction(
        function (state) { return getStorageWalletLastSync(state, keyId); },
        function (timestamp) { return onDataChanged(); }
      )
    );
  }

  // Hook up the `onTransactionsChanged` and `onNewTransactions` callbacks:
  var inhibit = false;
  dispatch(
    createReaction(
      function (state) { return getCurrencyWalletFiles(state, keyId); },
      function (state) { return getCurrencyWalletTxs(state, keyId); },
      function (state) { return getCurrencyWalletTxList(state, keyId); },
      function (files, txs, list, oldFiles, oldTxs) {
        if ( oldFiles === void 0 ) oldFiles = {};
        if ( oldTxs === void 0 ) oldTxs = {};

        if (inhibit) { return }
        inhibit = true;

        var changes = [];
        var created = [];

        // Diff the transaction list:
        for (var i = 0, list$1 = list; i < list$1.length; i += 1) {
          var info = list$1[i];

          if (
            !compare(txs[info.txid], oldTxs[info.txid]) ||
            !compare(files[info.txid], oldFiles[info.txid])
          ) {
            // If we have no metadata, it's new:
            if (files[info.txid] == null) {
              dispatch(setupNewTxMetadata$$1(keyId, txs[info.txid]));
              created.push(info.txid);
            } else {
              changes.push(info.txid);
            }
          }
        }

        if (changes.length) { onTransactionsChanged(changes); }
        if (created.length) { onNewTransactions(created); }
        inhibit = false;
      }
    )
  );

  // Hook up the `onWalletNameChanged` callback:
  if (onWalletNameChanged) {
    dispatch(
      createReaction(
        function (state) { return getCurrencyWalletName(state, keyId); },
        onWalletNameChanged
      )
    );
  }

  var out = {
    // Storage stuff:
    get name () {
      return getCurrencyWalletName(getState(), keyId)
    },
    renameWallet: function renameWallet (name) {
      return dispatch(renameCurrencyWallet$$1(keyId, name))
    },

    // Currency info:
    get fiatCurrencyCode () {
      return getCurrencyWalletFiat(getState(), keyId)
    },
    get currencyInfo () {
      return plugin().currencyInfo
    },

    // Running state:
    startEngine: function startEngine () {
      return engine().startEngine()
    },

    stopEngine: function stopEngine () {
      return Promise.resolve(engine().killEngine())
    },

    // Transactions:
    '@getBalance': { sync: true },
    getBalance: function getBalance (opts) {
      return engine().getBalance(opts)
    },

    '@getBlockHeight': { sync: true },
    getBlockHeight: function getBlockHeight () {
      return engine().getBlockHeight()
    },

    getTransactions: function getTransactions (opts) {
      if ( opts === void 0 ) opts = {};

      var state = getState();
      var files = getCurrencyWalletFiles(state, keyId);
      var list = getCurrencyWalletTxList(state, keyId);
      var txs = getCurrencyWalletTxs(state, keyId);
      var fiat = getCurrencyWalletFiat(state, keyId);
      var defaultCurrency = plugin().currencyInfo.currencyCode;
      var currencyCode = opts.currencyCode || defaultCurrency;

      var outList = [];
      for (var i = 0, list$1 = list; i < list$1.length; i += 1) {
        var info = list$1[i];

        var tx = txs[info.txid];
        var file = files[info.txid];

        // Skip irrelevant transactions:
        if (!tx.nativeAmount[currencyCode] && !tx.networkFee[currencyCode]) {
          continue
        }

        // Copy the tx properties to the output:
        var out = Object.assign({}, tx,
          {amountSatoshi: Number(tx.nativeAmount[currencyCode]),
          nativeAmount: tx.nativeAmount[currencyCode],
          networkFee: tx.networkFee[currencyCode]});

        // These are our fallback values:
        var fallbackFile = {
          currencies: {}
        };
        fallbackFile.currencies[defaultCurrency] = {
          providerFreeSent: 0,
          metadata: {
            name: '',
            category: '',
            notes: '',
            bizId: 0,
            exchangeAmount: {}
          }
        };

        // Copy the appropriate metadata to the output:
        if (file) {
          var merged = mergeDeeply(
            fallbackFile,
            file.currencies[defaultCurrency],
            file.currencies[currencyCode]
          );

          if (file.creationDate < out.date) { out.date = file.creationDate; }
          out.providerFee = merged.providerFeeSent;
          out.metadata = merged.metadata;
          out.metadata.amountFiat = merged.metadata.exchangeAmount[fiat];
        }

        outList.push(out);
      }

      // TODO: Handle the sort within the tx list merge process:
      return Promise.resolve(outList.sort(function (a, b) { return a.date - b.date; }))
    },

    getReceiveAddress: function getReceiveAddress (opts) {
      return Promise.resolve({
        publicAddress: engine().getFreshAddress(opts),
        amountSatoshi: 0,
        metadata: fakeMetadata
      })
    },

    saveReceiveAddress: function saveReceiveAddress (receiveAddress) {
      return Promise.resolve()
    },

    lockReceiveAddress: function lockReceiveAddress (receiveAddress) {
      return Promise.resolve()
    },

    '@makeAddressQrCode': { sync: true },
    makeAddressQrCode: function makeAddressQrCode (address) {
      return address.publicAddress
    },

    '@makeAddressUri': { sync: true },
    makeAddressUri: function makeAddressUri (address) {
      return address.publicAddress
    },

    makeSpend: function makeSpend (spendInfo) {
      return engine().makeSpend(spendInfo)
    },

    signTx: function signTx (tx) {
      return engine().signTx(tx)
    },

    broadcastTx: function broadcastTx (tx) {
      return engine().broadcastTx(tx)
    },

    saveTx: function saveTx (tx) {
      return Promise.all([
        engine().saveTx(tx)
      ])
    },

    saveTxMetadata: function saveTxMetadata (txid, currencyCode, metadata) {
      var fiat = getCurrencyWalletFiat(getState(), keyId);

      return dispatch(
        setCurrencyWalletTxMetadata$$1(
          keyId,
          txid,
          currencyCode,
          fixMetadata(metadata, fiat)
        )
      )
    },

    getMaxSpendable: function getMaxSpendable (spendInfo) {
      return Promise.resolve(0)
    },

    sweepPrivateKey: function sweepPrivateKey (keyUri) {
      return Promise.resolve(0)
    },

    '@parseUri': { sync: true },
    parseUri: function parseUri (uri) {
      return plugin().parseUri(uri)
    },

    '@encodeUri': { sync: true },
    encodeUri: function encodeUri (obj) {
      return plugin().encodeUri(obj)
    }
  };
  copyProperties(out, makeStorageWalletApi(redux$$1, keyInfo, callbacks));

  return out
}

function fixMetadata (metadata, fiat) {
  var out = filterObject(metadata, [
    'bizId',
    'category',
    'exchangeAmount',
    'name',
    'notes'
  ]);

  if (metadata.amountFiat != null) {
    if (out.exchangeAmount == null) { out.exchangeAmount = {}; }
    out.exchangeAmount[fiat] = metadata.amountFiat;
  }

  return out
}

/**
 * Returns the first keyInfo with a matching type.
 */
function findFirstKey (keyInfos, type) {
  return keyInfos.find(function (info) { return info.type === type; })
}

function makeAccountType (appId) {
  return appId === ''
    ? 'account-repo:co.airbitz.wallet'
    : ("account-repo:" + appId)
}

/**
 * Assembles the key metadata structure that is encrypted within a keyBox.
 * @param idKey Used to derive the wallet id. It's usually `dataKey`.
 */
function makeKeyInfo (type, keys, idKey) {
  return {
    id: base64$1.stringify(hmacSha256(utf8.parse(type), idKey)),
    type: type,
    keys: keys
  }
}

/**
 * Makes keys for accessing an encrypted Git repo.
 */
function makeStorageKeyInfo (io, type, keys) {
  if ( keys === void 0 ) keys = {};

  if (keys.dataKey == null) { keys.dataKey = base64$1.stringify(io.random(32)); }
  if (keys.syncKey == null) { keys.syncKey = base64$1.stringify(io.random(20)); }

  return makeKeyInfo(type, keys, base64$1.parse(keys.dataKey))
}

/**
 * Assembles all the resources needed to attach new keys to the account.
 */
function makeKeysKit (io, login) {
  var keyInfos = [], len = arguments.length - 2;
  while ( len-- > 0 ) keyInfos[ len ] = arguments[ len + 2 ];

  var keyBoxes = keyInfos.map(function (info) { return encrypt(io, utf8.parse(JSON.stringify(info)), login.loginKey); }
  );
  var newSyncKeys = keyInfos
    .filter(function (info) { return info.keys.syncKey != null; })
    .map(function (info) { return base16$1.stringify(base64$1.parse(info.keys.syncKey)); });

  return {
    serverPath: '/v2/login/keys',
    server: { keyBoxes: keyBoxes, newSyncKeys: newSyncKeys },
    stash: { keyBoxes: keyBoxes },
    login: { keyInfos: keyInfos },
    loginId: login.loginId
  }
}

/**
 * Flattens an array of key structures, removing duplicates.
 */
function mergeKeyInfos (keyInfos) {
  var out = [];
  var ids = {}; // Maps ID's to output array indexes

  for (var i = 0, list = keyInfos; i < list.length; i += 1) {
    var keyInfo = list[i];

    var id = keyInfo.id;
    var type = keyInfo.type;
    var keys = keyInfo.keys;
    if (id == null || base64$1.parse(id).length !== 32) {
      throw new Error(("Key integrity violation: invalid id " + id))
    }

    if (ids[id] != null) {
      // We have already seen this id, so check for conflicts:
      var old = out[ids[id]];
      if (old.type !== type) {
        throw new Error(
          ("Key integrity violation for " + id + ": type " + type + " does not match " + (old.type))
        )
      }
      for (var i$1 = 0, list$1 = Object.keys(keys); i$1 < list$1.length; i$1 += 1) {
        var key = list$1[i$1];

        if (old.keys[key] != null && old.keys[key] !== keys[key]) {
          throw new Error(
            ("Key integrity violation for " + id + ": " + key + " keys do not match")
          )
        }
      }

      // Do the update:
      out[ids[id]] = { id: id, type: type, keys: Object.assign({}, old.keys, keys) };
    } else {
      // We haven't seen this id, so insert it:
      ids[id] = out.length;
      out.push(keyInfo);
    }
  }

  return out
}

function getJsonFiles (folder) {
  return Object(__WEBPACK_IMPORTED_MODULE_5_disklet__["f" /* mapFiles */])(folder, function (file) { return file
      .getText()
      .then(function (text) { return ({ file: file, json: JSON.parse(text) }); })
      .catch(function (e) { return void 0; }); }
  ).then(function (files) { return files.filter(function (file) { return file != null; }); })
}

function findUserFile (folder, username) {
  var fixedName = fixUsername(username);
  return getJsonFiles(folder).then(function (files) { return files.find(function (file) { return file.json.username === fixedName; }); }
  )
}

/**
 * Handles login data storage.
 */
var LoginStore = function LoginStore (io) {
  this.folder = io.folder.folder('logins');
};

/**
 * Lists the usernames that have data in the store.
 */
LoginStore.prototype.listUsernames = function listUsernames () {
  return getJsonFiles(this.folder).then(function (files) { return files.map(function (file) { return file.json.username; }); }
  )
};

/**
 * Finds the login stash for the given username.
 * Returns a default object if
 */
LoginStore.prototype.load = function load (username) {
  return findUserFile(this.folder, username).then(
    function (file) { return (file != null
        ? file.json
        : { username: fixUsername(username), appId: '' }); }
  )
};

/**
 * Removes any login stash that may be stored for the given username.
 */
LoginStore.prototype.remove = function remove (username) {
  return findUserFile(this.folder, username).then(
    function (file) { return (file != null ? file.file.delete() : void 0); }
  )
};

/**
 * Saves a login stash tree to the folder.
 */
LoginStore.prototype.save = function save (stashTree) {
  var loginId = base64$1.parse(stashTree.loginId);
  if (stashTree.appId !== '') {
    throw new Error('Cannot save a login without an appId.')
  }
  if (loginId.length !== 32) {
    throw new Error('Invalid loginId')
  }
  var filename = base58.stringify(loginId) + '.json';
  return this.folder.file(filename).setText(JSON.stringify(stashTree))
};

/**
 * Normalizes a username, and checks for invalid characters.
 * TODO: Support a wider character range via Unicode normalization.
 */
function fixUsername (username) {
  var out = username
    .toLowerCase()
    .replace(/[ \f\r\n\t\v]+/g, ' ')
    .replace(/ $/, '')
    .replace(/^ /, '');

  for (var i = 0; i < out.length; ++i) {
    var c = out.charCodeAt(i);
    if (c < 0x20 || c > 0x7e) {
      throw new Error('Bad characters in username')
    }
  }
  return out
}

// Hashed username cache:
var userIdCache = {};

/**
 * Hashes a username into a userId.
 */
function hashUsername (io, username) {
  var state = io.redux.getState();
  var fixedName = fixUsername(username);
  if (userIdCache[fixedName] == null) {
    userIdCache[fixedName] = scrypt(state, fixedName, userIdSnrp);
  }
  return userIdCache[fixedName]
}

/**
 * Functions for working with login data in its on-disk format.
 */

function cloneNode (node, children) {
  return Object.assign({}, node, {children: children})
}

/**
 * Returns the login that satisifies the given predicate,
 * or undefined if nothing matches.
 */
function searchTree (node, predicate) {
  if (predicate(node)) { return node }

  if (node.children != null) {
    for (var i = 0, list = node.children; i < list.length; i += 1) {
      var child = list[i];

      var out = searchTree(child, predicate);
      if (out != null) { return out }
    }
  }
}

/**
 * Replaces a node within a tree.
 * The `clone` callback is called for each unmodified node.
 * The `predicate` callback is used to find the target node.
 * The `update` callback is called on the target.
 */
function updateTree (node, predicate, update, clone) {
  if ( clone === void 0 ) clone = cloneNode;

  if (predicate(node)) { return update(node) }

  var children = node.children != null
    ? node.children.map(function (child) { return updateTree(child, predicate, update, clone); })
    : [];

  return clone(node, children)
}

function applyLoginReplyInner (stash, loginKey, loginReply) {
  // Copy common items:
  var out = filterObject(loginReply, [
    'appId',
    'loginId',
    'loginAuthBox',
    'userId',
    'parentBox',
    'passwordAuthBox',
    'passwordBox',
    'passwordKeySnrp',
    'mnemonicBox',
    'rootKeyBox',
    'mnemonicBox',
    'syncKeyBox'
  ]);

  // Preserve client-only data:
  out.username = stash.username;
  out.userId = stash.userId;

  // Store the pin key unencrypted:
  if (loginReply.pin2KeyBox != null) {
    var pin2Key = decrypt(loginReply.pin2KeyBox, loginKey);
    out.pin2Key = base64$1.stringify(pin2Key);
  }

  // Store the recovery key unencrypted:
  if (loginReply.recovery2KeyBox != null) {
    var recovery2Key = decrypt(loginReply.recovery2KeyBox, loginKey);
    out.recovery2Key = base64$1.stringify(recovery2Key);
  }

  // Keys (we could be more picky about this):
  out.keyBoxes = elvis(loginReply.keyBoxes, []);

  // Recurse into children:
  var stashChildren = elvis(stash.children, []);
  var replyChildren = elvis(loginReply.children, []);
  if (stashChildren.length > replyChildren.length) {
    throw new Error('The server has lost children!')
  }
  out.children = replyChildren.map(function (child, index) {
    var childStash = stashChildren[index] != null ? stashChildren[index] : {};
    var childKey = decrypt(child.parentBox, loginKey);
    return applyLoginReplyInner(childStash, childKey, child)
  });

  return out
}

/**
 * Updates the given login stash object with fields from the auth server.
 * TODO: We don't trust the auth server 100%, so be picky about what we copy.
 */
function applyLoginReply (stashTree, loginKey, loginReply) {
  return updateTree(
    stashTree,
    function (stash) { return stash.appId === loginReply.appId; },
    function (stash) { return applyLoginReplyInner(stash, loginKey, loginReply); }
  )
}

function makeLoginTreeInner (stash, loginKey) {
  var login = {};

  if (stash.username != null) {
    login.username = stash.username;
  }

  // Identity:
  if (stash.appId == null) {
    throw new Error('No appId provided')
  }
  if (stash.loginAuthBox != null) {
    login.loginAuth = decrypt(stash.loginAuthBox, loginKey);
  }
  if (stash.loginId == null) {
    throw new Error('No loginId provided')
  }
  login.appId = stash.appId;
  login.loginId = stash.loginId;
  login.loginKey = loginKey;

  // Password:
  if (stash.userId != null) {
    login.userId = stash.userId;
  } else if (stash.passwordAuthBox != null) {
    login.userId = login.loginId;
  }
  if (stash.passwordAuthBox != null) {
    login.passwordAuth = decrypt(stash.passwordAuthBox, loginKey);
  }

  // PIN v2:
  if (stash.pin2Key != null) {
    login.pin2Key = base64$1.parse(stash.pin2Key);
  }

  // Recovery v2:
  if (stash.recovery2Key != null) {
    login.recovery2Key = base64$1.parse(stash.recovery2Key);
  }

  var legacyKeys = [];

  // BitID wallet:
  if (stash.menemonicBox != null && stash.rootKeyBox != null) {
    var mnemonic = utf8.stringify(decrypt(stash.menemonicBox, loginKey));
    var rootKey = decrypt(stash.rootKeyBox, loginKey);
    var keys = {
      mnemonic: mnemonic,
      rootKey: base64$1.stringify(rootKey)
    };
    legacyKeys.push(makeKeyInfo('wallet:bitid', keys, rootKey));
  }

  // Account settings:
  if (stash.syncKeyBox != null) {
    var syncKey = decrypt(stash.syncKeyBox, loginKey);
    var type = makeAccountType(login.appId);
    var keys$1 = {
      syncKey: base64$1.stringify(syncKey),
      dataKey: base64$1.stringify(loginKey)
    };
    legacyKeys.push(makeKeyInfo(type, keys$1, loginKey));
  }

  // Keys:
  var keyInfos = elvis(stash.keyBoxes, []).map(function (box) { return JSON.parse(utf8.stringify(decrypt(box, loginKey))); }
  );

  login.keyInfos = mergeKeyInfos(legacyKeys.concat( keyInfos));

  // Recurse into children:
  login.children = elvis(stash.children, []).map(function (child) {
    var childKey = decrypt(child.parentBox, loginKey);
    return makeLoginTreeInner(child, childKey)
  });

  // Integrity check:
  if (login.loginAuth == null && login.passwordAuth == null) {
    throw new Error('No server authentication methods on login')
  }

  return login
}

/**
 * Converts a login stash into an in-memory login object.
 */
function makeLoginTree (stashTree, loginKey, appId) {
  if ( appId === void 0 ) appId = '';

  return updateTree(
    stashTree,
    function (stash) { return stash.appId === appId; },
    function (stash) { return makeLoginTreeInner(stash, loginKey); },
    function (stash, children) {
      var login = filterObject(stash, ['username', 'appId', 'loginId']);
      login.children = children;
      return login
    }
  )
}

/**
 * Changing a login involves updating the server, the in-memory login,
 * and the on-disk stash. A login kit contains all three elements,
 * and this function knows how to apply them all.
 */
function applyKit (io, loginTree, kit) {
  var loginId = kit.loginId;
  var login = searchTree(loginTree, function (login) { return login.loginId === loginId; });

  return io.loginStore.load(loginTree.username).then(function (stashTree) {
    var request = makeAuthJson(login);
    request.data = kit.server;
    return io.authRequest('POST', kit.serverPath, request).then(function (reply) {
      var newLoginTree = updateTree(
        loginTree,
        function (login) { return login.loginId === loginId; },
        function (login) { return (Object.assign({}, login,
          kit.login,
          {children: softCat(login.children, kit.login.children),
          keyInfos: mergeKeyInfos(softCat(login.keyInfos, kit.login.keyInfos))})); }
      );

      var newStashTree = updateTree(
        stashTree,
        function (stash) { return stash.loginId === loginId; },
        function (stash) { return (Object.assign({}, stash,
          kit.stash,
          {children: softCat(stash.children, kit.stash.children),
          keyBoxes: softCat(stash.keyBoxes, kit.stash.keyBoxes)})); }
      );

      return io.loginStore.save(newStashTree).then(function () { return newLoginTree; })
    })
  })
}

/**
 * Refreshes a login with data from the server.
 */
function syncLogin (io, loginTree, login) {
  return io.loginStore.load(loginTree.username).then(function (stashTree) {
    var request = makeAuthJson(login);
    return io.authRequest('POST', '/v2/login', request).then(function (reply) {
      var newStashTree = applyLoginReply(stashTree, login.loginKey, reply);
      var newLoginTree = makeLoginTree(stashTree, login.loginKey, login.appId);

      return io.loginStore.save(newStashTree).then(function () { return newLoginTree; })
    })
  })
}

/**
 * Sets up a login v2 server authorization JSON.
 */
function makeAuthJson (login) {
  if (login.loginAuth != null) {
    return {
      loginId: login.loginId,
      loginAuth: base64$1.stringify(login.loginAuth)
    }
  }
  if (login.passwordAuth != null) {
    return {
      userId: login.userId,
      passwordAuth: base64$1.stringify(login.passwordAuth)
    }
  }
  throw new Error('No server authentication methods available')
}

var passwordAuthSnrp = userIdSnrp;

function makeHashInput (username, password) {
  return fixUsername(username) + password
}

/**
 * Extracts the loginKey from the login stash.
 */
function extractLoginKey (io, stash, username, password) {
  var state = io.redux.getState();

  if (stash.passwordBox == null || stash.passwordKeySnrp == null) {
    throw new Error('Missing data for offline password login')
  }
  var up = makeHashInput(username, password);
  return scrypt(state, up, stash.passwordKeySnrp).then(function (passwordKey) {
    return decrypt(stash.passwordBox, passwordKey)
  })
}

/**
 * Fetches the loginKey from the server.
 */
function fetchLoginKey (io, username, password) {
  var state = io.redux.getState();
  var up = makeHashInput(username, password);
  var userId = hashUsername(io, username);
  var passwordAuth = scrypt(state, up, passwordAuthSnrp);

  return Promise.all([userId, passwordAuth]).then(function (values) {
    var userId = values[0];
    var passwordAuth = values[1];
    var request = {
      userId: base64$1.stringify(userId),
      passwordAuth: base64$1.stringify(passwordAuth)
      // "otp": null
    };
    return io.authRequest('POST', '/v2/login', request).then(function (reply) {
      if (reply.passwordBox == null || reply.passwordKeySnrp == null) {
        throw new Error('Missing data for online password login')
      }
      return scrypt(state, up, reply.passwordKeySnrp).then(function (passwordKey) {
        return {
          loginKey: decrypt(reply.passwordBox, passwordKey),
          loginReply: reply
        }
      })
    })
  })
}

/**
 * Logs a user in using a password.
 * @param username string
 * @param password string
 * @return A `Promise` for the new root login.
 */
function loginPassword (io, username, password) {
  return io.loginStore.load(username).then(function (stashTree) {
    return rejectify(extractLoginKey)(io, stashTree, username, password)
      .then(function (loginKey) {
        var loginTree = makeLoginTree(stashTree, loginKey);

        // Since we logged in offline, update the stash in the background:
        syncLogin(io, loginTree, loginTree).catch(function (e) { return io.console.warn(e); });

        return loginTree
      })
      .catch(function (e) {
        // If that failed, try an online login:
        return fetchLoginKey(io, username, password).then(function (values) {
          var loginKey = values.loginKey;
          var loginReply = values.loginReply;
          stashTree = applyLoginReply(stashTree, loginKey, loginReply);
          io.loginStore.save(stashTree);
          return makeLoginTree(stashTree, loginKey)
        })
      })
  })
}

/**
 * Returns true if the given password is correct.
 */
function checkPassword (io, login, password) {
  var state = io.redux.getState();

  // Derive passwordAuth:
  var up = makeHashInput(login.username, password);
  return scrypt(state, up, passwordAuthSnrp).then(function (passwordAuth) {
    // Compare what we derived with what we have:
    for (var i = 0; i < passwordAuth.length; ++i) {
      if (passwordAuth[i] !== login.passwordAuth[i]) {
        return false
      }
    }
    return true
  })
}

/**
 * Verifies that a password meets our suggested rules.
 */
function checkPasswordRules (password) {
  var tooShort = password.length < 10;
  var noNumber = !/[0-9]/.test(password);
  var noLowerCase = !/[a-z]/.test(password);
  var noUpperCase = !/[A-Z]/.test(password);

  return {
    tooShort: tooShort,
    noNumber: noNumber,
    noLowerCase: noLowerCase,
    noUpperCase: noUpperCase,
    passed: password.length >= 16 ||
      !(tooShort || noNumber || noUpperCase || noLowerCase)
  }
}

/**
 * Creates the data needed to attach a password to a login.
 */
function makePasswordKit (io, login, username, password) {
  var up = makeHashInput(username, password);
  var state = io.redux.getState();

  // loginKey chain:
  var boxPromise = makeSnrp(state).then(function (passwordKeySnrp) {
    return scrypt(state, up, passwordKeySnrp).then(function (passwordKey) {
      var passwordBox = encrypt(io, login.loginKey, passwordKey);
      return { passwordKeySnrp: passwordKeySnrp, passwordBox: passwordBox }
    })
  });

  // authKey chain:
  var authPromise = scrypt(state, up, passwordAuthSnrp).then(function (passwordAuth) {
    var passwordAuthBox = encrypt(io, passwordAuth, login.loginKey);
    return { passwordAuth: passwordAuth, passwordAuthBox: passwordAuthBox }
  });

  return Promise.all([boxPromise, authPromise]).then(function (values) {
    var values_0 = values[0];
    var passwordKeySnrp = values_0.passwordKeySnrp;
    var passwordBox = values_0.passwordBox;
    var values_1 = values[1];
    var passwordAuth = values_1.passwordAuth;
    var passwordAuthBox = values_1.passwordAuthBox;
    return {
      serverPath: '/v2/login/password',
      server: {
        passwordAuth: base64$1.stringify(passwordAuth),
        passwordAuthSnrp: passwordAuthSnrp, // TODO: Use this on the other side
        passwordKeySnrp: passwordKeySnrp,
        passwordBox: passwordBox,
        passwordAuthBox: passwordAuthBox
      },
      stash: {
        passwordKeySnrp: passwordKeySnrp,
        passwordBox: passwordBox,
        passwordAuthBox: passwordAuthBox
      },
      login: {
        passwordAuth: passwordAuth
      },
      loginId: login.loginId
    }
  })
}

function pin2Id (pin2Key, username) {
  return hmacSha256(fixUsername(username), pin2Key)
}

function pin2Auth (pin2Key, pin) {
  return hmacSha256(pin, pin2Key)
}

/**
 * Fetches and decrypts the loginKey from the server.
 * @return Promise<{loginKey, loginReply}>
 */
function fetchLoginKey$1 (io, pin2Key, username, pin) {
  var request = {
    pin2Id: base64$1.stringify(pin2Id(pin2Key, username)),
    pin2Auth: base64$1.stringify(pin2Auth(pin2Key, pin))
    // "otp": null
  };
  return io.authRequest('POST', '/v2/login', request).then(function (reply) {
    if (reply.pin2Box == null) {
      throw new Error('Missing data for PIN v2 login')
    }
    return {
      loginKey: decrypt(reply.pin2Box, pin2Key),
      loginReply: reply
    }
  })
}

/**
 * Returns a copy of the PIN login key if one exists on the local device.
 */
function getPin2Key (stashTree, appId) {
  var stash = stashTree.pin2Key != null
    ? stashTree
    : searchTree(stashTree, function (stash) { return stash.appId === appId; });
  return stash != null && stash.pin2Key != null
    ? { pin2Key: base64$1.parse(stash.pin2Key), appId: stash.appId }
    : {}
}

/**
 * Logs a user in using their PIN.
 * @return A `Promise` for the new root login.
 */
function loginPin2 (io, appId, username, pin) {
  return io.loginStore.load(username).then(function (stashTree) {
    var ref = getPin2Key(stashTree, appId);
    var pin2Key = ref.pin2Key;
    var appIdFound = ref.appId;
    if (pin2Key == null) {
      throw new Error('No PIN set locally for this account')
    }
    return fetchLoginKey$1(io, pin2Key, username, pin).then(function (values) {
      var loginKey = values.loginKey;
      var loginReply = values.loginReply;
      stashTree = applyLoginReply(stashTree, loginKey, loginReply);
      io.loginStore.save(stashTree);
      return makeLoginTree(stashTree, loginKey, appIdFound)
    })
  })
}

/**
 * Creates the data needed to attach a PIN to a login.
 */
function makePin2Kit (io, login, username, pin) {
  var pin2Key = login.pin2Key || io.random(32);
  var pin2Box = encrypt(io, login.loginKey, pin2Key);
  var pin2KeyBox = encrypt(io, pin2Key, login.loginKey);

  return {
    serverPath: '/v2/login/pin2',
    server: {
      pin2Id: base64$1.stringify(pin2Id(pin2Key, username)),
      pin2Auth: base64$1.stringify(pin2Auth(pin2Key, pin)),
      pin2Box: pin2Box,
      pin2KeyBox: pin2KeyBox
    },
    stash: {
      pin2Key: base64$1.stringify(pin2Key)
    },
    login: {
      pin: pin,
      pin2Key: pin2Key
    },
    loginId: login.loginId
  }
}

/**
 * Determines whether or not a username is available.
 */
function usernameAvailable (io, username) {
  return hashUsername(io, username).then(function (userId) {
    var request = {
      userId: base64$1.stringify(userId)
    };
    return io
      .authRequest('POST', '/v2/login', request)
      .then(function (reply) { return false; }) // It's not available if we can hit it!
      .catch(function (e) {
        if (e.type !== UsernameError.type) {
          throw e
        }
        return true
      })
  })
}

/**
 * Assembles all the data needed to create a new login.
 */
function makeCreateKit (io, parentLogin, appId, username, opts) {
  // Figure out login identity:
  var loginId = parentLogin != null
    ? io.random(32)
    : hashUsername(io, username);
  var loginKey = io.random(32);
  var loginAuth = io.random(32);
  var loginAuthBox = encrypt(io, loginAuth, loginKey);

  // Set up login methods:
  var parentBox = parentLogin != null
    ? encrypt(io, loginKey, parentLogin.loginKey)
    : void 0;
  var passwordKit = opts.password != null
    ? makePasswordKit(io, { loginKey: loginKey }, username, opts.password)
    : {};
  var pin2Kit = opts.pin != null
    ? makePin2Kit(io, { loginKey: loginKey }, username, opts.pin)
    : {};
  var keysKit = opts.keyInfo != null
    ? makeKeysKit(io, { loginKey: loginKey }, opts.keyInfo)
    : {};

  // Bundle everything:
  return Promise.all([loginId, passwordKit]).then(function (values) {
    var loginId = values[0];
    var passwordKit = values[1];
    return {
      serverPath: '/v2/login/create',
      server: Object.assign({}, {appId: appId,
        loginAuth: base64$1.stringify(loginAuth),
        loginAuthBox: loginAuthBox,
        loginId: base64$1.stringify(loginId),
        parentBox: parentBox},
        passwordKit.server,
        pin2Kit.server,
        keysKit.server),
      stash: Object.assign({}, {appId: appId,
        loginAuthBox: loginAuthBox,
        loginId: base64$1.stringify(loginId),
        parentBox: parentBox},
        passwordKit.stash,
        pin2Kit.stash,
        keysKit.stash),
      login: Object.assign({}, {appId: appId,
        loginAuth: loginAuth,
        loginId: base64$1.stringify(loginId),
        loginKey: loginKey,
        keyInfos: []},
        passwordKit.login,
        pin2Kit.login,
        keysKit.login)
    }
  })
}

/**
 * Creates a new login on the auth server.
 */
function createLogin (io, username, opts) {
  var fixedName = fixUsername(username);

  return makeCreateKit(io, null, '', fixedName, opts).then(function (kit) {
    kit.login.username = fixedName;
    kit.stash.username = fixedName;
    kit.login.userId = kit.login.loginId;

    var request = {};
    request.data = kit.server;
    return io
      .authRequest('POST', kit.serverPath, request)
      .then(function (reply) { return io.loginStore.save(kit.stash).then(function () { return kit.login; }); })
  })
}

function recovery2Id (recovery2Key, username) {
  return hmacSha256(fixUsername(username), recovery2Key)
}

function recovery2Auth (recovery2Key, answers) {
  return answers.map(function (answer) {
    var data = utf8.parse(answer);
    return base64$1.stringify(hmacSha256(data, recovery2Key))
  })
}

/**
 * Fetches and decrypts the loginKey from the server.
 * @return Promise<{loginKey, loginReply}>
 */
function fetchLoginKey$2 (io, recovery2Key, username, answers) {
  var request = {
    recovery2Id: base64$1.stringify(recovery2Id(recovery2Key, username)),
    recovery2Auth: recovery2Auth(recovery2Key, answers)
    // "otp": null
  };
  return io.authRequest('POST', '/v2/login', request).then(function (reply) {
    if (reply.recovery2Box == null) {
      throw new Error('Missing data for recovery v2 login')
    }
    return {
      loginKey: decrypt(reply.recovery2Box, recovery2Key),
      loginReply: reply
    }
  })
}

/**
 * Returns a copy of the recovery key if one exists on the local device.
 */
function getRecovery2Key (stashTree) {
  if (stashTree.recovery2Key != null) {
    return base64$1.parse(stashTree.recovery2Key)
  }
}

/**
 * Logs a user in using recovery answers.
 * @return A `Promise` for the new root login.
 */
function loginRecovery2 (io, recovery2Key, username, answers) {
  return io.loginStore.load(username).then(function (stashTree) {
    return fetchLoginKey$2(io, recovery2Key, username, answers).then(function (values) {
      var loginKey = values.loginKey;
      var loginReply = values.loginReply;
      stashTree = applyLoginReply(stashTree, loginKey, loginReply);
      io.loginStore.save(stashTree);
      return makeLoginTree(stashTree, loginKey)
    })
  })
}

/**
 * Fetches the questions for a login
 * @param username string
 * @param recovery2Key an ArrayBuffer recovery key
 * @param Question array promise
 */
function getQuestions2 (io, recovery2Key, username) {
  var request = {
    recovery2Id: base64$1.stringify(recovery2Id(recovery2Key, username))
    // "otp": null
  };
  return io.authRequest('POST', '/v2/login', request).then(function (reply) {
    // Recovery login:
    var question2Box = reply.question2Box;
    if (question2Box == null) {
      throw new Error('Login has no recovery questions')
    }

    // Decrypt the questions:
    var questions = decrypt(question2Box, recovery2Key);
    return JSON.parse(utf8.stringify(questions))
  })
}

/**
 * Creates the data needed to attach recovery questions to a login.
 */
function makeRecovery2Kit (io, login, username, questions, answers) {
  if (!Array.isArray(questions)) {
    throw new TypeError('Questions must be an array of strings')
  }
  if (!Array.isArray(answers)) {
    throw new TypeError('Answers must be an array of strings')
  }

  var recovery2Key = login.recovery2Key || io.random(32);
  var question2Box = encrypt(
    io,
    utf8.parse(JSON.stringify(questions)),
    recovery2Key
  );
  var recovery2Box = encrypt(io, login.loginKey, recovery2Key);
  var recovery2KeyBox = encrypt(io, recovery2Key, login.loginKey);

  return {
    serverPath: '/v2/login/recovery2',
    server: {
      recovery2Id: base64$1.stringify(recovery2Id(recovery2Key, username)),
      recovery2Auth: recovery2Auth(recovery2Key, answers),
      recovery2Box: recovery2Box,
      recovery2KeyBox: recovery2KeyBox,
      question2Box: question2Box
    },
    stash: {
      recovery2Key: base64$1.stringify(recovery2Key)
    },
    login: {
      recovery2Key: recovery2Key
    },
    loginId: login.loginId
  }
}

var listRecoveryQuestionChoices = function listRecoveryQuestionChoices (
  io
) {
  return io.authRequest('POST', '/v1/questions', '')
};

/**
 * Returns true if `Object.assign(a, b)` would alter `a`.
 */
function different (a, b) {
  for (var i = 0, list = Object.keys(b); i < list.length; i += 1) {
    var key = list[i];

    if (a[key] !== b[key]) {
      return true
    }
  }
  return false
}

function getJsonFiles$1 (folder) {
  return Object(__WEBPACK_IMPORTED_MODULE_5_disklet__["f" /* mapFiles */])(folder, function (file, name) { return file
      .getText()
      .then(function (text) { return ({ file: file, name: name, json: JSON.parse(text) }); })
      .catch(function (e) { return void 0; }); }
  ).then(function (files) { return files.filter(function (file) { return file != null; }); })
}

/**
 * Loads the legacy wallet list from the account folder.
 */
function loadWalletList (folder) {
  return getJsonFiles$1(folder.folder('Wallets')).then(function (files) {
    var keyInfos = [];
    var keyStates = {};

    files.forEach(function (file) {
      var ref = file.json;
      var SortIndex = ref.SortIndex;
      var Archived = ref.Archived;
      var BitcoinSeed = ref.BitcoinSeed;
      var MK = ref.MK;
      var SyncKey = ref.SyncKey;

      var dataKey = base16$1.parse(MK);
      var bitcoinKey = base16$1.parse(BitcoinSeed);
      var syncKey = base16$1.parse(SyncKey);
      var keys = {
        dataKey: base64$1.stringify(dataKey),
        bitcoinKey: base64$1.stringify(bitcoinKey),
        syncKey: base64$1.stringify(syncKey)
      };

      var keyInfo = makeKeyInfo('wallet:bitcoin', keys, dataKey);
      keyInfos.push(keyInfo);
      keyStates[keyInfo.id] = {
        sortIndex: SortIndex,
        archived: Archived,
        deleted: false
      };
    });

    return { keyInfos: keyInfos, keyStates: keyStates }
  })
}

/**
 * Loads the modern key state list from the account folder.
 */
function loadKeyStates (folder) {
  return getJsonFiles$1(folder.folder('Keys')).then(function (files) {
    var keyStates = [];

    files.forEach(function (file) {
      var ref = file.json;
      var id = ref.id;
      var archived = ref.archived;
      var deleted = ref.deleted;
      var sortIndex = ref.sortIndex;
      keyStates[id] = { archived: archived, deleted: deleted, sortIndex: sortIndex };
    });

    return keyStates
  })
}

/**
 * Loads the keyStates and legacy wallet list,
 * diffs them with the current keyStates and legacy wallet list,
 * and returns true if there are any changes.
 */
function loadAllKeyStates (state, keyId) {
  var folder = getStorageWalletFolder(state, keyId);

  return Promise.all([
    loadWalletList(folder),
    loadKeyStates(folder)
  ]).then(function (values) {
    var values_0 = values[0];
    var keyInfos = values_0.keyInfos;
    var legacyKeyStates = values_0.keyStates;
    var newKeyStates = values[1];
    var keyStates = Object.assign({}, legacyKeyStates, newKeyStates);
    return { keyInfos: keyInfos, keyStates: keyStates }
  })
}

/**
 * Writes some key states to the account folder.
 */
function saveKeyStates (state, keyId, keyStates) {
  var keyFolder = getStorageWalletFolder(state, keyId).folder('Keys');

  // If there are no changes, do nothing:
  var ids = Object.keys(keyStates);
  if (!ids.length) { return Promise.resolve() }

  return Promise.all(
    ids.map(function (id) {
      var ref = keyStates[id];
      var archived = ref.archived;
      var deleted = ref.deleted;
      var sortIndex = ref.sortIndex;
      var filename =
        hashStorageWalletFilename(state, keyId, base64$1.parse(id)) + '.json';
      return keyFolder
        .file(filename)
        .setText(JSON.stringify({ archived: archived, deleted: deleted, sortIndex: sortIndex, id: id }))
    })
  )
}

/**
 * Given a list of new key states, as well as the existing list,
 * writes out the ones that have changed, and returns the combined list.
 */
function changeKeyStates (state, keyId, keyStates, newStates) {
  // Find the changes between the new states and the old states:
  var toWrite = {};
  for (var i = 0, list = Object.keys(newStates); i < list.length; i += 1) {
    var id = list[i];

    if (keyStates[id] == null) {
      // We don't have this id, so everything is new:
      toWrite[id] = newStates[id];
    } else if (different(keyStates[id], newStates[id])) {
      // We already have this id, so only update if it has changed:
      toWrite[id] = Object.assign({}, keyStates[id], newStates[id]);
    }
  }

  return saveKeyStates(state, keyId, toWrite).then(function () { return (Object.assign({}, keyStates,
    toWrite)); })
}

function findAppLogin (loginTree, appId) {
  return searchTree(loginTree, function (login) { return login.appId === appId; })
}

function checkLogin (login) {
  if (login == null || login.loginKey == null) {
    throw new Error('Incomplete login')
  }
}

/**
 * Creates a child login under the provided login, with the given appId.
 */
function createChildLogin (io, loginTree, login, appId, wantRepo) {
  if ( wantRepo === void 0 ) wantRepo = true;

  var username = loginTree.username;
  checkLogin(login);

  var opts = { pin: loginTree.pin };
  if (wantRepo) {
    opts.keyInfo = makeStorageKeyInfo(io, makeAccountType(appId));
  }
  return makeCreateKit(io, login, appId, username, opts).then(function (kit) {
    var parentKit = {
      serverPath: kit.serverPath,
      server: kit.server,
      login: { children: [kit.login] },
      stash: { children: [kit.stash] },
      loginId: login.loginId
    };
    return applyKit(io, loginTree, parentKit)
  })
}

/**
 * Ensures that the loginTree contains an account for the specified appId.
 * @return A `Promise`, which will resolve to a loginTree that does have
 * the requested account.
 */
function ensureAccountExists (io, loginTree, appId) {
  var accountType = makeAccountType(appId);

  // If there is no app login, make that:
  var login = findAppLogin(loginTree, appId);
  if (login == null) {
    return createChildLogin(io, loginTree, loginTree, appId, true)
  }

  // Otherwise, make the repo:
  if (findFirstKey(login.keyInfos, accountType) == null) {
    checkLogin(login);
    var keyInfo = makeStorageKeyInfo(io, accountType);
    var keysKit = makeKeysKit(io, login, keyInfo);
    return applyKit(io, loginTree, keysKit)
  }

  // Everything is fine, so do nothing:
  return Promise.resolve(loginTree)
}

/**
 * This is the data an account contains, and the methods to update it.
 */
var AccountState = function AccountState (io, appId, loginTree, keyInfo) {
  // Constant stuff:
  this.io = io;
  this.appId = appId;
  this.keyInfo = keyInfo;

  // Login state:
  this.loginTree = loginTree;
  this.login = findAppLogin(loginTree, this.appId);
  this.legacyKeyInfos = [];
  this.keyStates = {};
};

AccountState.prototype.logout = function logout () {
    var this$1 = this;

  return new Promise(function (resolve, reject) {
    this$1.io = null;
    this$1.appId = null;
    this$1.keyInfo = null;

    // Login state:
    this$1.loginTree = null;
    this$1.login = null;
    this$1.legacyKeyInfos = null;
    this$1.keyStates = null;
    resolve();
  })
};

AccountState.prototype.changePassword = function changePassword (password, login) {
    var this$1 = this;
    if ( login === void 0 ) login = this.loginTree;

  var ref = this;
    var io = ref.io;
    var username = ref.loginTree.username;
  checkLogin(login);

  return makePasswordKit(io, login, username, password).then(function (kit) { return this$1.applyKit(kit); }
  )
};

AccountState.prototype.changePin = function changePin (pin, login) {
    if ( login === void 0 ) login = this.login;

  var ref = this;
    var io = ref.io;
    var username = ref.loginTree.username;
  checkLogin(login);

  var kit = makePin2Kit(io, login, username, pin);
  return this.applyKit(kit)
};

AccountState.prototype.changeRecovery = function changeRecovery (questions, answers, login) {
    if ( login === void 0 ) login = this.loginTree;

  var ref = this;
    var io = ref.io;
    var username = ref.loginTree.username;
  checkLogin(login);

  var kit = makeRecovery2Kit(io, login, username, questions, answers);
  return this.applyKit(kit)
};

AccountState.prototype.applyKit = function applyKit$1 (kit) {
    var this$1 = this;

  return applyKit(this.io, this.loginTree, kit).then(function (loginTree) {
    this$1.loginTree = loginTree;
    this$1.login = findAppLogin(loginTree, this$1.appId);
    return this$1
  })
};

AccountState.prototype.changeKeyStates = function changeKeyStates$1 (newStates) {
    var this$1 = this;

  var ref = this;
    var io = ref.io;
    var keyInfo = ref.keyInfo;
    var keyStates = ref.keyStates;
  return changeKeyStates(
    io.redux.getState(),
    keyInfo.id,
    keyStates,
    newStates
  ).then(function (keyStates) {
    this$1.keyStates = keyStates;
    return void 0
  })
};

AccountState.prototype.reloadKeyStates = function reloadKeyStates () {
    var this$1 = this;

  var ref = this;
    var io = ref.io;
    var keyInfo = ref.keyInfo;
  return loadAllKeyStates(io.redux.getState(), keyInfo.id).then(function (values) {
    var keyInfos = values.keyInfos;
      var keyStates = values.keyStates;
    this$1.legacyKeyInfos = keyInfos;
    this$1.keyStates = keyStates;
    return this$1
  })
};

function makeAccountState (io, appId, loginTree) {
  return ensureAccountExists(io, loginTree, appId).then(function (loginTree) {
    // Find our repo:
    var type = makeAccountType(appId);
    var login = findAppLogin(loginTree, appId);
    var keyInfo = findFirstKey(login.keyInfos, type);
    if (keyInfo == null) {
      throw new Error(("Cannot find a \"" + type + "\" repo"))
    }

    return io.redux.dispatch(addStorageWallet(keyInfo)).then(function () {
      var account = new AccountState(io, appId, loginTree, keyInfo);
      var disposer = io.redux.dispatch(
        createReaction(
          function (state) { return getStorageWalletLastSync(state, keyInfo.id); },
          function () { return account.reloadKeyStates(); }
        )
      );
      return disposer.payload.out.then(function () { return account; })
    })
  })
}

/**
 * Creates an `ExchangeCache` API object.
 */
function makeExchangeCache (io) {
  var redux$$1 = io.redux;

  return wrapObject(
    io.onError,
    'ExchangeCache',
    makeExchangeCacheApi(redux$$1.dispatch, redux$$1.getState)
  )
}

/**
 * Creates an unwrapped exchange cache API object.
 */
function makeExchangeCacheApi (dispatch, getState) {
  /**
   * TODO: Once the user has an exchange-rate preference,
   * look that up and bias in favor of the preferred exchange.
   */
  function getPairCost (source, age, inverse) {
    // The age curve goes from 0 to 1, with 1 being infinitely old.
    // The curve reaches half way (0.5) at 30 seconds in:
    var ageCurve = age / (30 + age);

    return 1 + 0.1 * inverse + ageCurve // + 2 * isWrongExchange()
  }

  var out = {
    '@convertCurrency': { sync: true },
    convertCurrency: function convertCurrency (fromCurrency, toCurrency, amount) {
      if ( amount === void 0 ) amount = 1;

      var rate = getExchangeRate(
        getState(),
        fromCurrency,
        toCurrency,
        getPairCost
      );
      return amount * rate
    }
  };

  return out
}

/**
 * Creates an `Account` API object.
 */
function makeAccount (io, appId, loginTree, loginType) {
  return makeAccountState(io, appId, loginTree).then(function (state) { return wrapObject(io.onError, 'Account', makeAccountApi(state, loginType)); }
  )
}

/**
 * Creates an unwrapped account API object around an account state object.
 */
function makeAccountApi (state, loginType) {
  var io = state.io;
  var appId = state.appId;
  var keyInfo = state.keyInfo;
  var callbacks = {};

  var exchangeCache = makeExchangeCache(io);

  var out = {
    get appId () {
      return state.login.appId
    },
    get username () {
      return state.loginTree.username
    },
    get loginKey () {
      return base58.stringify(state.login.loginKey)
    },

    // Exchange cache:
    get exchangeCache () {
      return exchangeCache
    },

    // Flags:
    get loggedIn () {
      return state.loginTree != null
    },
    keyLogin: loginType === 'keyLogin',
    pinLogin: loginType === 'pinLogin',
    passwordLogin: loginType === 'passwordLogin',
    newAccount: loginType === 'newAccount',
    recoveryLogin: loginType === 'recoveryLogin',
    get edgeLogin () {
      return state.loginTree.loginKey == null
    },
    '@isLoggedIn': { sync: true },
    isLoggedIn: function isLoggedIn () {
      return state.loginTree != null
    },

    logout: function logout () {
      return state.logout()
    },

    passwordOk: function passwordOk (password) {
      return checkPassword(io, state.loginTree, password)
    },

    passwordSetup: function passwordSetup (password) {
      return state.changePassword(password)
    },

    pinSetup: function pinSetup (pin) {
      return state
        .changePin(pin)
        .then(function () { return base58.stringify(state.login.pin2Key); })
    },

    recovery2Set: function recovery2Set (questions, answers) {
      return state
        .changeRecovery(questions, answers)
        .then(function () { return base58.stringify(state.loginTree.recovery2Key); })
    },

    /**
     * Retrieves all the keys that are available to this login object.
     */
    get allKeys () {
      var keyStates = state.keyStates;
      var legacyKeyInfos = state.legacyKeyInfos;
      var login = state.login;
      var allKeys = mergeKeyInfos(softCat(legacyKeyInfos, login.keyInfos));

      return allKeys.map(function (info) { return (Object.assign({}, {appId: appId,
        archived: false,
        deleted: false,
        sortIndex: allKeys.length},
        keyStates[info.id],
        info)); })
    },

    /**
     * Adjusts the sort, archive, or deletion state of keys.
     */
    changeKeyStates: function changeKeyStates (keyStates) {
      return state.changeKeyStates(keyStates)
    },

    '@listWalletIds': { sync: true },
    listWalletIds: function listWalletIds () {
      return state.login.keyInfos.map(function (info) { return info.id; })
    },

    '@getWallet': { sync: true },
    getWallet: function getWallet (id) {
      var info = state.login.keyInfos.find(function (info) { return info.id === id; });
      return info
    },

    /**
     * Gets the first wallet in an account (the first by sort order).
     * If type is a string, finds the first wallet with the same type.
     * Might return null if there are no wallets.
     */
    '@getFirstWallet': { sync: true },
    getFirstWallet: function getFirstWallet (type) {
      return findFirstKey(this.allKeys, type)
    },

    /**
     * Creates a new wallet repo, and attaches it to the account.
     * @param keys An object with any user-provided keys
     * that should be stored along with the wallet. For example,
     * Airbitz Bitcoin wallets would place their `bitcoinKey` here.
     */
    createWallet: function createWallet (type, keys) {
      var keyInfo = makeStorageKeyInfo(io, type, keys);
      var kit = makeKeysKit(io, state.login, keyInfo);
      return state.applyKit(kit).then(function () { return keyInfo.id; })
    }
  };
  copyProperties(out, makeStorageWalletApi(io.redux, keyInfo, callbacks));

  out.checkPassword = out.passwordOk;
  out.changePassword = out.passwordSetup;
  out.changePIN = out.pinSetup;
  out.setupRecovery2Questions = out.recovery2Set;

  return out
}

var EC = elliptic.ec;
var secp256k1 = new EC('secp256k1');

/**
 * Derives a shared secret from the given secret key and public key.
 */
function deriveSharedKey (keypair, pubkey) {
  var secretX = keypair
    .derive(secp256k1.keyFromPublic(pubkey).getPublic())
    .toArray('be');

  // From NIST.SP.800-56Ar2 section 5.8.1:
  return hmacSha256([0, 0, 0, 1 ].concat( secretX), utf8.parse('dataKey'))
}

/**
 * Decrypts a lobby reply using the request's secret key.
 */
function decryptLobbyReply (keypair, lobbyReply) {
  var pubkey = base64$1.parse(lobbyReply.publicKey);
  var sharedKey = deriveSharedKey(keypair, pubkey);
  return JSON.parse(utf8.stringify(decrypt(lobbyReply.box, sharedKey)))
}

/**
 * Encrypts a lobby reply JSON replyData, and returns a reply
 * suitable for sending to the server.
 */


function scheduleLobbyPoll (watcher) {
  if (!watcher.done) {
    watcher.timeout = setTimeout(function () { return pollLobby(watcher); }, watcher.period);
  }
}

function pollLobby (watcher) {
  var io = watcher.io;
  var lobbyId = watcher.lobbyId;
  var keypair = watcher.keypair;
  var onReply = watcher.onReply;
  var onError = watcher.onError;

  return io
    .authRequest('GET', '/v2/lobby/' + lobbyId, '')
    .then(function (reply) {
      while (watcher.replyCount < reply.replies.length) {
        var lobbyReply = reply.replies[watcher.replyCount];
        if (onReply) {
          onReply(decryptLobbyReply(keypair, lobbyReply));
        }
        ++watcher.replyCount;
      }
      return watcher
    })
    .then(scheduleLobbyPoll)
    .catch(function (e) {
      if (onError) { onError(e); }
      return watcher
    })
}

/**
 * Approximates the proposed ES `Observable` interface,
 * allowing clients to subscribe to lobby reply messages.
 */
var ObservableLobby = function ObservableLobby (io, lobbyId, keypair) {
  this.io = io;
  this.lobbyId = lobbyId;
  this.keypair = keypair;
};

ObservableLobby.prototype.subscribe = function subscribe (onReply, onError, period) {
    var this$1 = this;
    if ( period === void 0 ) period = 1000;

  this.onReply = onReply;
  this.onError = onError;
  this.period = period;
  this.replyCount = 0;
  this.done = false;
  pollLobby(this);

  var subscription = {
    unsubscribe: function () {
      this$1.done = true;
      if (this$1.timeout != null) {
        clearTimeout(this$1.timeout);
      }
    }
  };
  return subscription
};

/**
 * Creates a new lobby on the auth server holding the given request.
 * @return A lobby watcher object that will check for incoming replies.
 */
function makeLobby (io, lobbyRequest) {
  var keypair = secp256k1.genKeyPair({ entropy: io.random(32) });
  var pubkey = keypair.getPublic().encodeCompressed();
  if (lobbyRequest.timeout == null) {
    lobbyRequest.timeout = 600;
  }
  lobbyRequest.publicKey = base64$1.stringify(pubkey);

  var lobbyId = base58.stringify(sha256(sha256(pubkey)).slice(0, 10));

  var request = {
    data: lobbyRequest
  };
  return io.authRequest('PUT', '/v2/lobby/' + lobbyId, request).then(function (reply) {
    return new ObservableLobby(io, lobbyId, keypair)
  })
}

/**
 * Fetches a lobby request from the auth server.
 * @return A promise of the lobby request JSON.
 */


/**
 * Encrypts and sends a reply to a lobby request.
 */

/**
 * The public API for edge login requests.
 */
var ABCEdgeLoginRequest = function ABCEdgeLoginRequest (lobbyId, subscription) {
  this.id = lobbyId;
  this.cancelRequest = function () { return subscription.unsubscribe(); };
};

/**
 * Turns a reply into a logged-in account.
 */
function onReply (io, subscription, reply, appId, opts) {
  subscription.unsubscribe();
  var stashTree = reply.loginStash;

  if (opts.onProcessLogin != null) {
    opts.onProcessLogin(stashTree.username);
  }

  // Find the appropriate child:
  var child = searchTree(stashTree, function (stash) { return stash.appId === appId; });
  if (child == null) {
    throw new Error(("Cannot find requested appId: \"" + appId + "\""))
  }

  // The Airbitz mobile will sometimes send the pin2Key in base58
  // instead of base64 due to an unfortunate bug. Fix that:
  if (child.pin2Key != null && child.pin2Key.slice(-1) !== '=') {
    io.console.warn('Fixing base58 pin2Key');
    child.pin2Key = base64$1.stringify(base58.parse(child.pin2Key));
  }
  io.loginStore.save(stashTree);

  // This is almost guaranteed to blow up spectacularly:
  var loginKey = base64$1.parse(reply.loginKey);
  var loginTree = makeLoginTree(stashTree, loginKey, appId);
  if (opts.onLogin != null) {
    opts.onLogin(null, loginTree);
  }
}

function onError$1 (lobby, e, opts) {
  if (opts.onLogin != null) {
    opts.onLogin(e);
  }
}

/**
 * Creates a new account request lobby on the server.
 */
function requestEdgeLogin (io, appId, opts) {
  var request = {
    loginRequest: {
      appId: appId,
      displayImageUrl: opts.displayImageUrl,
      displayName: opts.displayName
    }
  };

  return makeLobby(io, request).then(function (lobby) {
    var subscription = lobby.subscribe(
      function (reply) { return onReply(io, subscription, reply, appId, opts); },
      function (e) { return onError$1(lobby, e, opts); }
    );
    return new ABCEdgeLoginRequest(lobby.lobbyId, subscription)
  })
}

/**
 * Extracts the io functions we need from the browser.
 */
function makeBrowserIo () {
  var out = {};

  if (typeof console !== 'undefined') {
    out.console = console;
  }

  if (typeof window !== 'undefined') {
    out.fetch = function () {
      var rest = [], len = arguments.length;
      while ( len-- ) rest[ len ] = arguments[ len ];

      return window.fetch.apply(window, rest);
    };
    out.localStorage = window.localStorage;

    if (window.crypto != null && window.crypto.getRandomValues != null) {
      out.random = function (size) {
        var out = new Uint8Array(size);
        window.crypto.getRandomValues(out);
        return out
      };
    }
  }

  return out
}

function scrypt$1 (data, salt, n, r, p, dklen) {
  return new Promise(function (resolve, reject) {
    var callback = function (error, progress, key) {
      if (error) { return reject(error) }
      if (key) { return resolve(key) }
    };

    __WEBPACK_IMPORTED_MODULE_6_scrypt_js___default()(data, salt, n, r, p, dklen, callback);
  })
}

function makeStore () {
  return Object(__WEBPACK_IMPORTED_MODULE_4_redux__["c" /* createStore */])(reducer, Object(__WEBPACK_IMPORTED_MODULE_4_redux__["a" /* applyMiddleware */])(__WEBPACK_IMPORTED_MODULE_7_redux_thunk___default.a, reactionMiddleware))
}

function parseReply (json) {
  switch (json.status_code) {
    case 0: // Success
      return json.results

    case 2: // Account exists
      throw new UsernameError('Account already exists on server')

    case 3: // Account does not exist
      throw new UsernameError('Account does not exist on server')

    case 4: // Invalid password
    case 5: // Invalid answers
      throw new PasswordError(json.results)

    case 6: // Invalid API key
      throw new Error('Invalid API key')

    case 8: // Invalid OTP
      throw new OtpError(json.results)

    case 1000: // Endpoint obsolete
      throw new ObsoleteApiError()

    case 1: // Error
    case 7: // Pin expired
    default:
      var message = json.message || json.detail || JSON.stringify(json);
      throw new Error(("Server error: " + message))
  }
}

var AuthServer = function AuthServer (io, apiKey, authServer) {
  // if (apiKey == null) throw new TypeError('No API key provided')

  this.io = io;
  this.apiKey = apiKey;
  this.authServer = authServer;
};

/**
 * Wraps the raw `fetch` API with the headers and error processing needed
 * to talk to the auth server.
 * @param body JSON object to send
 * @return a promise of the server's JSON reply
 */
AuthServer.prototype.request = function request (method, path, body) {
  var opts = {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Token ' + this.apiKey
    }
  };
  if (method !== 'GET') {
    opts.body = JSON.stringify(body);
  }

  var uri = this.authServer + path;
  this.io.console.info((method + " " + uri));
  return timeout(
    this.io.fetch(uri, opts).then(
      function (response) { return response.json().then(parseReply, function (jsonError) {
          throw new Error('Non-JSON reply, HTTP status ' + response.status)
        }); },
      function (networkError) {
        throw new NetworkError('Could not reach the auth server')
      }
    ),
    10000,
    new NetworkError('Could not reach the auth server: timeout')
  )
};

/**
 * Checks the properties of an `io` object,
 * upgrading obsolete ones and verifying that we have all necessary ones.
 */
function fixIo (io) {
  var out = {};

  // Copy native io resources:
  var keys = ['console', 'fetch', 'folder', 'random', 'scrypt'];
  for (var i = 0, list = keys; i < list.length; i += 1) {
    var key = list[i];

    out[key] = io[key];
  }

  // If there is no native folder, try `localStorage` instead:
  if (out.folder == null && io.localStorage != null) {
    out.folder = Object(__WEBPACK_IMPORTED_MODULE_5_disklet__["b" /* makeLocalStorageFolder */])(io.localStorage, {
      prefix: 'airbitz'
    });
  }

  // If there is no scrypt, use the JS one:
  if (out.scrypt == null) {
    out.scrypt = scrypt$1;
  }

  // Verify that we have what we need:
  for (var i$1 = 0, list$1 = keys; i$1 < list$1.length; i$1 += 1) {
    var key$1 = list$1[i$1];

    if (out[key$1] == null) {
      throw new Error(("Could not find \"" + key$1 + "\" in the environment"))
    }
  }

  return out
}

/**
 * Constructs an object containing the io resources used in this library,
 * along with the wrappers and caches needed to make use of them.
 */
var IoContext = function IoContext (nativeIo, opts) {
  var this$1 = this;
  if ( opts === void 0 ) opts = {};

  var onErrorDefault = function (error, name) { return this$1.console.error(name, error); };

  var apiKey = opts.apiKey;
  var authServer = opts.authServer; if ( authServer === void 0 ) authServer = 'https://auth.airbitz.co/api';
  var callbacks = opts.callbacks; if ( callbacks === void 0 ) callbacks = {};
  var plugins = opts.plugins; if ( plugins === void 0 ) plugins = [];
  var onError = callbacks.onError; if ( onError === void 0 ) onError = onErrorDefault;

  // Copy native io resources:
  var fixedIo = fixIo(nativeIo);
  Object.assign(this, fixedIo);

  // Set up wrapper objects:
  this.onError = onError;
  this.authServer = new AuthServer(this, apiKey, authServer);
  this.loginStore = new LoginStore(this);
  this.redux = makeStore();
  this.redux.dispatch(initStore(fixedIo, onError));
  this.redux
    .dispatch(setupPlugins(fixedIo, plugins))
    .then(function () { return this$1.redux.dispatch(fetchExchangeRates()); });
};

IoContext.prototype.authRequest = function authRequest () {
    var rest = [], len = arguments.length;
    while ( len-- ) rest[ len ] = arguments[ len ];

  return (ref = this.authServer).request.apply(ref, rest)
    var ref;
};

function makeContext (opts) {
  var io = new IoContext(opts.io != null ? opts.io : makeBrowserIo(), opts);
  var appId =
    opts.appId != null
      ? opts.appId
      : opts.accountType != null
        ? opts.accountType.replace(/^account.repo:/, '')
        : '';

  var out = wrapObject(io.onError, 'Context', {
    io: io,
    appId: appId,

    '@fixUsername': { sync: true },
    fixUsername: function fixUsername$1 (username) {
      return fixUsername(username)
    },

    listUsernames: function listUsernames () {
      return io.loginStore.listUsernames()
    },

    removeUsername: function removeUsername (username) {
      return io.loginStore.remove(username)
    },

    usernameAvailable: function usernameAvailable$1 (username) {
      return usernameAvailable(io, username)
    },

    createAccount: function createAccount (username, password, pin) {
      return createLogin(io, username, {
        password: password,
        pin: pin
      }).then(function (loginTree) {
        return makeAccount(io, appId, loginTree, 'newAccount')
      })
    },

    loginWithKey: function loginWithKey (username, loginKey) {
      return io.loginStore.load(username).then(function (stashTree) {
        var loginTree = makeLoginTree(
          stashTree,
          base58.parse(loginKey),
          appId
        );
        return makeAccount(io, appId, loginTree, 'keyLogin')
      })
    },

    loginWithPassword: function loginWithPassword (username, password) {
      return loginPassword(io, username, password).then(function (loginTree) {
        return makeAccount(io, appId, loginTree, 'passwordLogin')
      })
    },

    '@checkPasswordRules': { sync: true },
    checkPasswordRules: function checkPasswordRules$1 (password) {
      return checkPasswordRules(password)
    },

    pinExists: function pinExists (username) {
      return io.loginStore
        .load(username)
        .then(function (loginStash) { return getPin2Key(loginStash, appId).pin2Key != null; })
    },

    pinLoginEnabled: function pinLoginEnabled (username) {
      return this.pinExists(username)
    },

    loginWithPIN: function loginWithPIN (username, pin) {
      return loginPin2(io, appId, username, pin).then(function (loginTree) {
        return makeAccount(io, appId, loginTree, 'pinLogin')
      })
    },

    getRecovery2Key: function getRecovery2Key$1 (username) {
      return io.loginStore.load(username).then(function (loginStash) {
        var recovery2Key = getRecovery2Key(loginStash);
        if (recovery2Key == null) {
          throw new Error('No recovery key stored locally.')
        }
        return base58.stringify(recovery2Key)
      })
    },

    loginWithRecovery2: function loginWithRecovery2 (recovery2Key, username, answers) {
      recovery2Key = base58.parse(recovery2Key);
      return loginRecovery2(
        io,
        recovery2Key,
        username,
        answers
      ).then(function (loginTree) {
        return makeAccount(io, appId, loginTree, 'recoveryLogin')
      })
    },

    fetchRecovery2Questions: function fetchRecovery2Questions (recovery2Key, username) {
      recovery2Key = base58.parse(recovery2Key);
      return getQuestions2(io, recovery2Key, username)
    },

    listRecoveryQuestionChoices: function listRecoveryQuestionChoices$1 () {
      return listRecoveryQuestionChoices(io)
    },

    requestEdgeLogin: function requestEdgeLogin$1 (opts) {
      var onLogin = opts.onLogin;
      opts.onLogin = function (err, loginTree) {
        if (err) { return onLogin(err) }
        makeAccount(io, appId, loginTree).then(
          function (account) { return onLogin(null, account); },
          function (err) { return onLogin(err); }
        );
      };
      return requestEdgeLogin(io, appId, opts)
    }
  });

  out.usernameList = out.listUsernames;

  return out
}

// We are exporting some internal goodies for the CLI,
// which makes use of some undocumented core features.
// In the future we hope to minimize / reduce this




var internal = Object.freeze({
	hashUsername: hashUsername,
	makeLobby: makeLobby,
	rejectify: rejectify,
	serialize: serialize,
	base16: base16$1,
	base58: base58,
	base64: base64$1,
	utf8: utf8,
	elvis: elvis,
	filterObject: filterObject,
	softCat: softCat,
	mergeDeeply: mergeDeeply
});

var routes = [];

/**
 * Wires one or more handlers into the routing table.
 */
function addRoute$1 (method, path) {
  var handlers = [], len = arguments.length - 2;
  while ( len-- > 0 ) handlers[ len ] = arguments[ len + 2 ];

  for (var i = 0, list = handlers; i < list.length; i += 1) {
    var handler = list[i];

    routes.push({
      method: method,
      path: new RegExp(("^" + path + "$")),
      handler: handler
    });
  }
}

/**
 * Finds all matching handlers in the routing table.
 */
function findRoute (method, path) {
  return routes
    .filter(function (route) {
      return route.method === method && route.path.test(path)
    })
    .map(function (route) { return route.handler; })
}

var errorCodes = {
  success: 0,
  error: 1,
  accountExists: 2,
  noAccount: 3,
  invalidPassword: 4,
  invalidAnswers: 5,
  invalidApiKey: 6,
  invalidOtp: 8,
  conflict: 10,
  obsolete: 1000
};

var FakeResponse = function FakeResponse (body, opts) {
  if ( body === void 0 ) body = '';
  if ( opts === void 0 ) opts = {};

  this.body = body;
  this.status = opts.status || 200;
  this.statusText = opts.statusText || 'OK';
  this.ok = this.status >= 200 && this.status < 300;
};

FakeResponse.prototype.json = function json () {
  try {
    return Promise.resolve(JSON.parse(this.body))
  } catch (e) {
    return Promise.reject(e)
  }
};

FakeResponse.prototype.text = function text () {
  return Promise.resolve(this.body)
};

function makeResponse (results) {
  var reply = {
    status_code: 0
  };
  if (results != null) {
    reply.results = results;
  }
  return new FakeResponse(JSON.stringify(reply))
}

function makeErrorResponse (code, message, status) {
  if ( message === void 0 ) message = '';
  if ( status === void 0 ) status = 500;

  var body = {
    status_code: code,
    message: message || 'Server error'
  };
  return new FakeResponse(JSON.stringify(body), { status: status })
}

// Authentication middleware: ----------------------------------------------

/**
 * Verifies that the request contains valid v1 authenticaion.
 */
function authHandler1 (req) {
  // Password login:
  if (req.body.l1 != null && req.body.lp1 != null) {
    var login = this.findLoginId(req.body.l1);
    if (login == null) {
      return makeErrorResponse(errorCodes.noAccount)
    }
    if (req.body.lp1 !== login.passwordAuth) {
      return makeErrorResponse(errorCodes.invalidPassword)
    }
    req.login = login;
    return
  }
  return makeErrorResponse(errorCodes.error, 'Missing credentials')
}

/**
 * Verifies that the request contains valid v2 authenticaion.
 */
function authHandler (req) {
  // Token login:
  if (req.body.loginId != null && req.body.loginAuth != null) {
    var login = this.findLoginId(req.body.loginId);
    if (login == null) {
      return makeErrorResponse(errorCodes.noAccount)
    }
    if (req.body.loginAuth !== login.loginAuth) {
      return makeErrorResponse(errorCodes.invalidPassword)
    }
    req.login = login;
    return
  }

  // Password login:
  if (req.body.userId != null && req.body.passwordAuth != null) {
    var login$1 = this.findLoginId(req.body.userId);
    if (login$1 == null) {
      return makeErrorResponse(errorCodes.noAccount)
    }
    if (req.body.passwordAuth !== login$1.passwordAuth) {
      return makeErrorResponse(errorCodes.invalidPassword)
    }
    req.login = login$1;
    return
  }

  // PIN2 login:
  if (req.body.pin2Id != null && req.body.pin2Auth != null) {
    var login$2 = this.findPin2Id(req.body.pin2Id);
    if (login$2 == null) {
      return makeErrorResponse(errorCodes.noAccount)
    }
    if (req.body.pin2Auth !== login$2.pin2Auth) {
      return makeErrorResponse(errorCodes.invalidPassword)
    }
    req.login = login$2;
    return
  }

  // Recovery2 login:
  if (req.body.recovery2Id != null && req.body.recovery2Auth != null) {
    var login$3 = this.findRecovery2Id(req.body.recovery2Id);
    if (login$3 == null) {
      return makeErrorResponse(errorCodes.noAccount)
    }
    var serverAuth = login$3.recovery2Auth;
    var clientAuth = req.body.recovery2Auth;
    if (clientAuth.length !== serverAuth.length) {
      return makeErrorResponse(errorCodes.invalidAnswers)
    }
    for (var i = 0; i < clientAuth.length; ++i) {
      if (clientAuth[i] !== serverAuth[i]) {
        return makeErrorResponse(errorCodes.invalidAnswers)
      }
    }
    req.login = login$3;
    return
  }
  return makeErrorResponse(errorCodes.error, 'Missing credentials')
}

// Account lifetime v1: ----------------------------------------------------

addRoute$1('POST', '/api/v1/account/available', function (req) {
  if (this.findLoginId(req.body.l1)) {
    return makeErrorResponse(errorCodes.accountExists)
  }
  return makeResponse()
});

addRoute$1('POST', '/api/v1/account/create', function (req) {
  if (this.findLoginId(req.body.l1)) {
    return makeErrorResponse(errorCodes.accountExists)
  }

  var carePackage = JSON.parse(req.body.care_package);
  var loginPackage = JSON.parse(req.body.login_package);
  this.db.logins.push({
    appId: '',
    loginId: req.body.l1,
    passwordAuth: req.body.lp1,
    passwordKeySnrp: carePackage.SNRP2,
    passwordAuthBox: loginPackage.ELP1,
    passwordBox: loginPackage.EMK_LP2,
    syncKeyBox: loginPackage.ESyncKey
  });
  this.repos[req.body.repo_account_key] = {};

  return makeResponse()
});

addRoute$1('POST', '/api/v1/account/activate', authHandler1, function (req) {
  return makeResponse()
});

// Login v1: ---------------------------------------------------------------

addRoute$1('POST', '/api/v1/account/carepackage/get', function (req) {
  var login = this.findLoginId(req.body.l1);
  if (login == null) {
    return makeErrorResponse(errorCodes.noAccount)
  }

  return makeResponse({
    care_package: JSON.stringify({
      SNRP2: login.passwordKeySnrp
    })
  })
});

addRoute$1('POST', '/api/v1/account/loginpackage/get', authHandler1, function (
  req
) {
  var results = {
    login_package: JSON.stringify({
      ELP1: req.login.passwordAuthBox,
      EMK_LP2: req.login.passwordBox,
      ESyncKey: req.login.syncKeyBox
    })
  };
  if (req.login.rootKeyBox != null) {
    results.rootKeyBox = req.login.rootKeyBox;
  }
  return makeResponse(results)
});

// PIN login v1: -----------------------------------------------------------

addRoute$1('POST', '/api/v1/account/pinpackage/update', authHandler1, function (
  req
) {
  this.db.pinKeyBox = JSON.parse(req.body.pin_package);
  return makeResponse()
});

addRoute$1('POST', '/api/v1/account/pinpackage/get', function (req) {
  if (this.db.pinKeyBox == null) {
    return makeErrorResponse(errorCodes.noAccount)
  }
  return makeResponse({
    pin_package: JSON.stringify(this.db.pinKeyBox)
  })
});

// Repo server v1: ---------------------------------------------------------

addRoute$1('POST', '/api/v1/wallet/create', authHandler1, function (req) {
  this.repos[req.body.repo_wallet_key] = {};
  return makeResponse()
});

addRoute$1('POST', '/api/v1/wallet/activate', authHandler1, function (req) {
  return makeResponse()
});

// login v2: ---------------------------------------------------------------

addRoute$1(
  'POST',
  '/api/v2/login',
  function (req) {
    if (req.body.userId != null && req.body.passwordAuth == null) {
      var login = this.findLoginId(req.body.userId);
      if (login == null) {
        return makeErrorResponse(errorCodes.noAccount)
      }
      return makeResponse({
        passwordAuthSnrp: login.passwordAuthSnrp
      })
    }
    if (req.body.recovery2Id != null && req.body.recovery2Auth == null) {
      var login$1 = this.findRecovery2Id(req.body.recovery2Id);
      if (login$1 == null) {
        return makeErrorResponse(errorCodes.noAccount)
      }
      return makeResponse({
        question2Box: login$1.question2Box
      })
    }
    return null
  },
  authHandler,
  function (req) {
    return makeResponse(this.makeReply(req.login))
  }
);

addRoute$1('POST', '/api/v2/login/create', function (req) {
  var this$1 = this;

  var data = req.body.data;
  if (
    data.appId == null ||
    data.loginId == null ||
    this.db.logins.find(function (login) { return login.loginId === data.loginId; })
  ) {
    return makeErrorResponse(errorCodes.error)
  }

  // Set up repos:
  if (data.newSyncKeys != null) {
    for (var i = 0, list = data.newSyncKeys; i < list.length; i += 1) {
      var syncKey = list[i];

      this$1.repos[syncKey] = {};
    }
  }

  // Set up login object:
  var row = filterObject(data, [
    'appId',
    'loginId',
    'loginAuth',
    'loginAuthBox',
    'parentBox',
    'passwordAuth',
    'passwordAuthBox',
    'passwordAuthSnrp',
    'passwordBox',
    'passwordKeySnrp',
    'pin2Auth',
    'pin2Box',
    'pin2Id',
    'pin2KeyBox',
    'question2Box',
    'recovery2Auth',
    'recovery2Box',
    'recovery2Id',
    'recovery2KeyBox',
    'mnemonicBox', // Used for testing, not part of the real server!
    'rootKeyBox', // Same
    'syncKeyBox', // Same
    'repos'
  ]);
  if (req.body.loginId != null || req.body.userId != null) {
    var e = authHandler.call(this, req);
    if (e) { return e }

    row.parent = req.login.loginId;
  }
  this.db.logins.push(row);

  return makeResponse()
});

addRoute$1('POST', '/api/v2/login/keys', authHandler, function (req) {
  var this$1 = this;

  var data = req.body.data;
  if (data.keyBoxes == null) {
    return makeErrorResponse(errorCodes.error)
  }

  // Set up repos:
  if (data.newSyncKeys != null) {
    for (var i = 0, list = data.newSyncKeys; i < list.length; i += 1) {
      var syncKey = list[i];

      this$1.repos[syncKey] = {};
    }
  }

  req.login.keyBoxes = softCat(req.login.keyBoxes, data.keyBoxes);

  return makeResponse()
});

addRoute$1('POST', '/api/v2/login/password', authHandler, function (req) {
  var data = req.body.data;
  if (
    data.passwordAuth == null ||
    data.passwordAuthBox == null ||
    data.passwordAuthSnrp == null ||
    data.passwordBox == null ||
    data.passwordKeySnrp == null
  ) {
    return makeErrorResponse(errorCodes.error)
  }

  req.login.passwordAuth = data.passwordAuth;
  req.login.passwordAuthBox = data.passwordAuthBox;
  req.login.passwordAuthSnrp = data.passwordAuthSnrp;
  req.login.passwordBox = data.passwordBox;
  req.login.passwordKeySnrp = data.passwordKeySnrp;

  return makeResponse()
});

addRoute$1('POST', '/api/v2/login/pin2', authHandler, function (req) {
  var data = req.body.data;
  if (
    data.pin2Auth == null ||
    data.pin2Box == null ||
    data.pin2Id == null ||
    data.pin2KeyBox == null
  ) {
    return makeErrorResponse(errorCodes.error)
  }

  req.login.pin2Auth = data.pin2Auth;
  req.login.pin2Box = data.pin2Box;
  req.login.pin2Id = data.pin2Id;
  req.login.pin2KeyBox = data.pin2KeyBox;

  return makeResponse()
});

addRoute$1('POST', '/api/v2/login/recovery2', authHandler, function (req) {
  var data = req.body.data;
  if (
    data.question2Box == null ||
    data.recovery2Auth == null ||
    data.recovery2Box == null ||
    data.recovery2Id == null ||
    data.recovery2KeyBox == null
  ) {
    return makeErrorResponse(errorCodes.error)
  }

  req.login.question2Box = data.question2Box;
  req.login.recovery2Auth = data.recovery2Auth;
  req.login.recovery2Box = data.recovery2Box;
  req.login.recovery2Id = data.recovery2Id;
  req.login.recovery2KeyBox = data.recovery2KeyBox;

  return makeResponse()
});

// lobby: ------------------------------------------------------------------

addRoute$1('PUT', '/api/v2/lobby/.*', function (req) {
  var pubkey = req.path.split('/')[4];
  this.db.lobbies[pubkey] = { request: req.body.data, replies: [] };
  return makeResponse()
});

addRoute$1('POST', '/api/v2/lobby/.*', function (req) {
  var pubkey = req.path.split('/')[4];
  this.db.lobbies[pubkey].replies.push(req.body.data);
  return makeResponse()
});

addRoute$1('GET', '/api/v2/lobby/.*', function (req) {
  var pubkey = req.path.split('/')[4];
  if (this.db.lobbies[pubkey] == null) {
    return new FakeResponse(("Cannot find lobby \"" + pubkey + "\""), { status: 404 })
  }
  return makeResponse(this.db.lobbies[pubkey])
});

addRoute$1('DELETE', '/api/v2/lobby/.*', function (req) {
  var pubkey = req.path.split('/')[4];
  delete this.db.lobbies[pubkey];
  return makeResponse()
});

// sync: -------------------------------------------------------------------

function storeRoute (req) {
  var elements = req.path.split('/');
  var syncKey = elements[4];
  // const hash = elements[5]

  var repo = this.repos[syncKey];
  if (repo == null) {
    return new FakeResponse('Cannot find repo ' + syncKey, { status: 404 })
  }

  switch (req.method) {
    case 'POST':
      var changes = req.body.changes;
      for (var i = 0, list = Object.keys(changes); i < list.length; i += 1) {
        var change = list[i];

    repo[change] = changes[change];
      }
      return new FakeResponse(
        JSON.stringify({
          changes: repo,
          hash: '1111111111111111111111111111111111111111'
        })
      )

    case 'GET':
      return new FakeResponse(JSON.stringify({ changes: repo }))
  }
}

addRoute$1('GET', '/api/v2/store/.*', storeRoute);
addRoute$1('POST', '/api/v2/store/.*', storeRoute);

/**
 * Emulates the Airbitz login server.
 */
var FakeServer = function FakeServer () {
  var this$1 = this;

  this.db = { lobbies: {}, logins: [] };
  this.repos = {};
  this.fetch = function (uri, opts) {
    if ( opts === void 0 ) opts = {};

    try {
      return Promise.resolve(this$1.request(uri, opts))
    } catch (e) {
      return Promise.reject(e)
    }
  };
};

FakeServer.prototype.findLoginId = function findLoginId (loginId) {
  if (loginId == null) { return }
  return this.db.logins.find(function (login) { return login.loginId === loginId; })
};

FakeServer.prototype.findPin2Id = function findPin2Id (pin2Id) {
  return this.db.logins.find(function (login) { return login.pin2Id === pin2Id; })
};

FakeServer.prototype.findRecovery2Id = function findRecovery2Id (recovery2Id) {
  return this.db.logins.find(function (login) { return login.recovery2Id === recovery2Id; })
};

FakeServer.prototype.makeReply = function makeReply (login) {
    var this$1 = this;

  var reply = filterObject(login, [
    'appId',
    'loginId',
    'loginAuthBox',
    'parentBox',
    'passwordAuthBox',
    'passwordAuthSnrp',
    'passwordBox',
    'passwordKeySnrp',
    'pin2Box',
    'pin2KeyBox',
    'question2Box',
    'recovery2Box',
    'recovery2KeyBox',
    'mnemonicBox',
    'rootKeyBox',
    'syncKeyBox',
    'keyBoxes'
  ]);
  reply.children = this.db.logins
    .filter(function (child) { return child.parent === login.loginId; })
    .map(function (child) { return this$1.makeReply(child); });
  return reply
};

FakeServer.prototype.request = function request (uri, opts) {
    var this$1 = this;

  var req = {
    method: opts.method || 'GET',
    body: opts.body ? JSON.parse(opts.body) : null,
    path: uri.replace(new RegExp('https?://[^/]*'), '')
  };

  var handlers = findRoute(req.method, req.path);
  for (var i = 0, list = handlers; i < list.length; i += 1) {
    var handler = list[i];

      var out = handler.call(this$1, req);
    if (out != null) {
      return out
    }
  }
  return makeErrorResponse(
    errorCodes.error,
    ("Unknown API endpoint " + (req.path)),
    404
  )
};

/**
 * Silences all logging.
 */
var fakeConsole = {
  info: function () {},
  warn: function () {},
  error: function () {}
};

/**
 * Generates deterministic "random" data for unit-testing.
 */
function makeFakeRandom () {
  var seed = 0;

  return function (bytes) {
    var out = [];

    for (var i = 0; i < bytes; ++i) {
      // Simplest numbers that give a full-period generator with
      // a good mix of high & low values within the first few bytes:
      seed = (5 * seed + 3) & 0xff;
      out[i] = seed;
    }

    return out
  }
}

/**
 * Creates an array of io context objects.
 * Each object has its own storage, but all contexts share a server.
 * @param {number} count number of io contexts to create
 */
function makeFakeIos (count) {
  // The common server used by all contexts:
  var server = new FakeServer();
  var random = makeFakeRandom();

  // Make the io objects:
  var out = [];
  for (var i = 0; i < count; ++i) {
    out[i] = {
      console: fakeConsole,
      fetch: server.fetch,
      folder: Object(__WEBPACK_IMPORTED_MODULE_5_disklet__["c" /* makeMemoryFolder */])(),
      random: random
    };
  }

  return out
}

// Sub-module exports:
/**
 * Same thing as `makeContext`, but corresponding to the documentation.
 */
function makeABCContext (apiKey, appId, opts) {
  return makeContext(Object.assign({}, {apiKey: apiKey, appId: appId}, opts))
}


//# sourceMappingURL=index.es.js.map


/***/ }),

/***/ 1665:
/***/ (function(module, exports) {

// base-x encoding
// Forked from https://github.com/cryptocoinjs/bs58
// Originally written by Mike Hearn for BitcoinJ
// Copyright (c) 2011 Google Inc
// Ported to JavaScript by Stefan Thomas
// Merged Buffer refactorings from base58-native by Stephen Pair
// Copyright (c) 2013 BitPay Inc

module.exports = function base (ALPHABET) {
  var ALPHABET_MAP = {}
  var BASE = ALPHABET.length
  var LEADER = ALPHABET.charAt(0)

  // pre-compute lookup table
  for (var i = 0; i < ALPHABET.length; i++) {
    ALPHABET_MAP[ALPHABET.charAt(i)] = i
  }

  function encode (source) {
    if (source.length === 0) return ''

    var digits = [0]
    for (var i = 0; i < source.length; ++i) {
      for (var j = 0, carry = source[i]; j < digits.length; ++j) {
        carry += digits[j] << 8
        digits[j] = carry % BASE
        carry = (carry / BASE) | 0
      }

      while (carry > 0) {
        digits.push(carry % BASE)
        carry = (carry / BASE) | 0
      }
    }

    var string = ''

    // deal with leading zeros
    for (var k = 0; source[k] === 0 && k < source.length - 1; ++k) string += ALPHABET[0]
    // convert digits to a string
    for (var q = digits.length - 1; q >= 0; --q) string += ALPHABET[digits[q]]

    return string
  }

  function decodeUnsafe (string) {
    if (string.length === 0) return []

    var bytes = [0]
    for (var i = 0; i < string.length; i++) {
      var value = ALPHABET_MAP[string[i]]
      if (value === undefined) return

      for (var j = 0, carry = value; j < bytes.length; ++j) {
        carry += bytes[j] * BASE
        bytes[j] = carry & 0xff
        carry >>= 8
      }

      while (carry > 0) {
        bytes.push(carry & 0xff)
        carry >>= 8
      }
    }

    // deal with leading zeros
    for (var k = 0; string[k] === LEADER && k < string.length - 1; ++k) {
      bytes.push(0)
    }

    return bytes.reverse()
  }

  function decode (string) {
    var array = decodeUnsafe(string)
    if (array) return array

    throw new Error('Non-base' + BASE + ' character')
  }

  return {
    encode: encode,
    decodeUnsafe: decodeUnsafe,
    decode: decode
  }
}


/***/ }),

/***/ 1666:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["parse"] = parse;
/* harmony export (immutable) */ __webpack_exports__["stringify"] = stringify;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__codec_js__ = __webpack_require__(1370);


var encoding = {
  chars: '0123456789ABCDEF',
  bits: 4
}

function parse (string, opts) {
  return __WEBPACK_IMPORTED_MODULE_0__codec_js__["a" /* parse */](string.toUpperCase(), encoding, opts)
}

function stringify (data, opts) {
  return __WEBPACK_IMPORTED_MODULE_0__codec_js__["b" /* stringify */](data, encoding, opts)
}


/***/ }),

/***/ 1667:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export parse */
/* unused harmony export stringify */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__codec_js__ = __webpack_require__(1370);


var encoding = {
  chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567',
  bits: 5
}

function parse (string, opts) {
  return __WEBPACK_IMPORTED_MODULE_0__codec_js__["a" /* parse */](string, encoding, opts)
}

function stringify (data, opts) {
  return __WEBPACK_IMPORTED_MODULE_0__codec_js__["b" /* stringify */](data, encoding, opts)
}


/***/ }),

/***/ 1668:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export parse */
/* unused harmony export stringify */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__codec_js__ = __webpack_require__(1370);


var encoding = {
  chars: '0123456789ABCDEFGHIJKLMNOPQRSTUV',
  bits: 5
}

function parse (string, opts) {
  return __WEBPACK_IMPORTED_MODULE_0__codec_js__["a" /* parse */](string, encoding, opts)
}

function stringify (data, opts) {
  return __WEBPACK_IMPORTED_MODULE_0__codec_js__["b" /* stringify */](data, encoding, opts)
}


/***/ }),

/***/ 1669:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["parse"] = parse;
/* harmony export (immutable) */ __webpack_exports__["stringify"] = stringify;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__codec_js__ = __webpack_require__(1370);


var encoding = {
  chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
  bits: 6
}

function parse (string, opts) {
  return __WEBPACK_IMPORTED_MODULE_0__codec_js__["a" /* parse */](string, encoding, opts)
}

function stringify (data, opts) {
  return __WEBPACK_IMPORTED_MODULE_0__codec_js__["b" /* stringify */](data, encoding, opts)
}


/***/ }),

/***/ 1670:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export parse */
/* unused harmony export stringify */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__codec_js__ = __webpack_require__(1370);


var encoding = {
  chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_',
  bits: 6
}

function parse (string, opts) {
  return __WEBPACK_IMPORTED_MODULE_0__codec_js__["a" /* parse */](string, encoding, opts)
}

function stringify (data, opts) {
  return __WEBPACK_IMPORTED_MODULE_0__codec_js__["b" /* stringify */](data, encoding, opts)
}


/***/ }),

/***/ 1671:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/utf8js v2.1.2 by @mathias */
;(function(root) {

	// Detect free variables `exports`
	var freeExports = typeof exports == 'object' && exports;

	// Detect free variable `module`
	var freeModule = typeof module == 'object' && module &&
		module.exports == freeExports && module;

	// Detect free variable `global`, from Node.js or Browserified code,
	// and use it as `root`
	var freeGlobal = typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/*--------------------------------------------------------------------------*/

	var stringFromCharCode = String.fromCharCode;

	// Taken from https://mths.be/punycode
	function ucs2decode(string) {
		var output = [];
		var counter = 0;
		var length = string.length;
		var value;
		var extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	// Taken from https://mths.be/punycode
	function ucs2encode(array) {
		var length = array.length;
		var index = -1;
		var value;
		var output = '';
		while (++index < length) {
			value = array[index];
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
		}
		return output;
	}

	function checkScalarValue(codePoint) {
		if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
			throw Error(
				'Lone surrogate U+' + codePoint.toString(16).toUpperCase() +
				' is not a scalar value'
			);
		}
	}
	/*--------------------------------------------------------------------------*/

	function createByte(codePoint, shift) {
		return stringFromCharCode(((codePoint >> shift) & 0x3F) | 0x80);
	}

	function encodeCodePoint(codePoint) {
		if ((codePoint & 0xFFFFFF80) == 0) { // 1-byte sequence
			return stringFromCharCode(codePoint);
		}
		var symbol = '';
		if ((codePoint & 0xFFFFF800) == 0) { // 2-byte sequence
			symbol = stringFromCharCode(((codePoint >> 6) & 0x1F) | 0xC0);
		}
		else if ((codePoint & 0xFFFF0000) == 0) { // 3-byte sequence
			checkScalarValue(codePoint);
			symbol = stringFromCharCode(((codePoint >> 12) & 0x0F) | 0xE0);
			symbol += createByte(codePoint, 6);
		}
		else if ((codePoint & 0xFFE00000) == 0) { // 4-byte sequence
			symbol = stringFromCharCode(((codePoint >> 18) & 0x07) | 0xF0);
			symbol += createByte(codePoint, 12);
			symbol += createByte(codePoint, 6);
		}
		symbol += stringFromCharCode((codePoint & 0x3F) | 0x80);
		return symbol;
	}

	function utf8encode(string) {
		var codePoints = ucs2decode(string);
		var length = codePoints.length;
		var index = -1;
		var codePoint;
		var byteString = '';
		while (++index < length) {
			codePoint = codePoints[index];
			byteString += encodeCodePoint(codePoint);
		}
		return byteString;
	}

	/*--------------------------------------------------------------------------*/

	function readContinuationByte() {
		if (byteIndex >= byteCount) {
			throw Error('Invalid byte index');
		}

		var continuationByte = byteArray[byteIndex] & 0xFF;
		byteIndex++;

		if ((continuationByte & 0xC0) == 0x80) {
			return continuationByte & 0x3F;
		}

		// If we end up here, it’s not a continuation byte
		throw Error('Invalid continuation byte');
	}

	function decodeSymbol() {
		var byte1;
		var byte2;
		var byte3;
		var byte4;
		var codePoint;

		if (byteIndex > byteCount) {
			throw Error('Invalid byte index');
		}

		if (byteIndex == byteCount) {
			return false;
		}

		// Read first byte
		byte1 = byteArray[byteIndex] & 0xFF;
		byteIndex++;

		// 1-byte sequence (no continuation bytes)
		if ((byte1 & 0x80) == 0) {
			return byte1;
		}

		// 2-byte sequence
		if ((byte1 & 0xE0) == 0xC0) {
			byte2 = readContinuationByte();
			codePoint = ((byte1 & 0x1F) << 6) | byte2;
			if (codePoint >= 0x80) {
				return codePoint;
			} else {
				throw Error('Invalid continuation byte');
			}
		}

		// 3-byte sequence (may include unpaired surrogates)
		if ((byte1 & 0xF0) == 0xE0) {
			byte2 = readContinuationByte();
			byte3 = readContinuationByte();
			codePoint = ((byte1 & 0x0F) << 12) | (byte2 << 6) | byte3;
			if (codePoint >= 0x0800) {
				checkScalarValue(codePoint);
				return codePoint;
			} else {
				throw Error('Invalid continuation byte');
			}
		}

		// 4-byte sequence
		if ((byte1 & 0xF8) == 0xF0) {
			byte2 = readContinuationByte();
			byte3 = readContinuationByte();
			byte4 = readContinuationByte();
			codePoint = ((byte1 & 0x07) << 0x12) | (byte2 << 0x0C) |
				(byte3 << 0x06) | byte4;
			if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
				return codePoint;
			}
		}

		throw Error('Invalid UTF-8 detected');
	}

	var byteArray;
	var byteCount;
	var byteIndex;
	function utf8decode(byteString) {
		byteArray = ucs2decode(byteString);
		byteCount = byteArray.length;
		byteIndex = 0;
		var codePoints = [];
		var tmp;
		while ((tmp = decodeSymbol()) !== false) {
			codePoints.push(tmp);
		}
		return ucs2encode(codePoints);
	}

	/*--------------------------------------------------------------------------*/

	var utf8 = {
		'version': '2.1.2',
		'encode': utf8encode,
		'decode': utf8decode
	};

	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return utf8;
		}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}	else if (freeExports && !freeExports.nodeType) {
		if (freeModule) { // in Node.js or RingoJS v0.8.0+
			freeModule.exports = utf8;
		} else { // in Narwhal or RingoJS v0.7.0-
			var object = {};
			var hasOwnProperty = object.hasOwnProperty;
			for (var key in utf8) {
				hasOwnProperty.call(utf8, key) && (freeExports[key] = utf8[key]);
			}
		}
	} else { // in Rhino or a web browser
		root.utf8 = utf8;
	}

}(this));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(65)(module), __webpack_require__(14)))

/***/ }),

/***/ 1672:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function(root) {

    function checkInt(value) {
        return (parseInt(value) === value);
    }

    function checkInts(arrayish) {
        if (!checkInt(arrayish.length)) { return false; }

        for (var i = 0; i < arrayish.length; i++) {
            if (!checkInt(arrayish[i]) || arrayish[i] < 0 || arrayish[i] > 255) {
                return false;
            }
        }

        return true;
    }

    function coerceArray(arg, copy) {

        // ArrayBuffer view
        if (arg.buffer && ArrayBuffer.isView(arg) && arg.name === 'Uint8Array') {

            if (copy) {
                if (arg.slice) {
                    arg = arg.slice();
                } else {
                    arg = Array.prototype.slice.call(arg);
                }
            }

            return arg;
        }

        // It's an array; check it is a valid representation of a byte
        if (Array.isArray(arg)) {
            if (!checkInts(arg)) {
                throw new Error('Array contains invalid value: ' + arg);
            }

            return new Uint8Array(arg);
        }

        // Something else, but behaves like an array (maybe a Buffer? Arguments?)
        if (checkInt(arg.length) && checkInts(arg)) {
            return new Uint8Array(arg);
        }

        throw new Error('unsupported array-like object');
    }

    function createArray(length) {
        return new Uint8Array(length);
    }

    function copyArray(sourceArray, targetArray, targetStart, sourceStart, sourceEnd) {
        if (sourceStart != null || sourceEnd != null) {
            if (sourceArray.slice) {
                sourceArray = sourceArray.slice(sourceStart, sourceEnd);
            } else {
                sourceArray = Array.prototype.slice.call(sourceArray, sourceStart, sourceEnd);
            }
        }
        targetArray.set(sourceArray, targetStart);
    }



    var convertUtf8 = (function() {
        function toBytes(text) {
            var result = [], i = 0;
            text = encodeURI(text);
            while (i < text.length) {
                var c = text.charCodeAt(i++);

                // if it is a % sign, encode the following 2 bytes as a hex value
                if (c === 37) {
                    result.push(parseInt(text.substr(i, 2), 16))
                    i += 2;

                // otherwise, just the actual byte
                } else {
                    result.push(c)
                }
            }

            return coerceArray(result);
        }

        function fromBytes(bytes) {
            var result = [], i = 0;

            while (i < bytes.length) {
                var c = bytes[i];

                if (c < 128) {
                    result.push(String.fromCharCode(c));
                    i++;
                } else if (c > 191 && c < 224) {
                    result.push(String.fromCharCode(((c & 0x1f) << 6) | (bytes[i + 1] & 0x3f)));
                    i += 2;
                } else {
                    result.push(String.fromCharCode(((c & 0x0f) << 12) | ((bytes[i + 1] & 0x3f) << 6) | (bytes[i + 2] & 0x3f)));
                    i += 3;
                }
            }

            return result.join('');
        }

        return {
            toBytes: toBytes,
            fromBytes: fromBytes,
        }
    })();

    var convertHex = (function() {
        function toBytes(text) {
            var result = [];
            for (var i = 0; i < text.length; i += 2) {
                result.push(parseInt(text.substr(i, 2), 16));
            }

            return result;
        }

        // http://ixti.net/development/javascript/2011/11/11/base64-encodedecode-of-utf8-in-browser-with-js.html
        var Hex = '0123456789abcdef';

        function fromBytes(bytes) {
                var result = [];
                for (var i = 0; i < bytes.length; i++) {
                    var v = bytes[i];
                    result.push(Hex[(v & 0xf0) >> 4] + Hex[v & 0x0f]);
                }
                return result.join('');
        }

        return {
            toBytes: toBytes,
            fromBytes: fromBytes,
        }
    })();


    // Number of rounds by keysize
    var numberOfRounds = {16: 10, 24: 12, 32: 14}

    // Round constant words
    var rcon = [0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8, 0xab, 0x4d, 0x9a, 0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d, 0xfa, 0xef, 0xc5, 0x91];

    // S-box and Inverse S-box (S is for Substitution)
    var S = [0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76, 0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0, 0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15, 0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75, 0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84, 0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf, 0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8, 0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2, 0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73, 0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb, 0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79, 0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08, 0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a, 0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e, 0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf, 0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16];
    var Si =[0x52, 0x09, 0x6a, 0xd5, 0x30, 0x36, 0xa5, 0x38, 0xbf, 0x40, 0xa3, 0x9e, 0x81, 0xf3, 0xd7, 0xfb, 0x7c, 0xe3, 0x39, 0x82, 0x9b, 0x2f, 0xff, 0x87, 0x34, 0x8e, 0x43, 0x44, 0xc4, 0xde, 0xe9, 0xcb, 0x54, 0x7b, 0x94, 0x32, 0xa6, 0xc2, 0x23, 0x3d, 0xee, 0x4c, 0x95, 0x0b, 0x42, 0xfa, 0xc3, 0x4e, 0x08, 0x2e, 0xa1, 0x66, 0x28, 0xd9, 0x24, 0xb2, 0x76, 0x5b, 0xa2, 0x49, 0x6d, 0x8b, 0xd1, 0x25, 0x72, 0xf8, 0xf6, 0x64, 0x86, 0x68, 0x98, 0x16, 0xd4, 0xa4, 0x5c, 0xcc, 0x5d, 0x65, 0xb6, 0x92, 0x6c, 0x70, 0x48, 0x50, 0xfd, 0xed, 0xb9, 0xda, 0x5e, 0x15, 0x46, 0x57, 0xa7, 0x8d, 0x9d, 0x84, 0x90, 0xd8, 0xab, 0x00, 0x8c, 0xbc, 0xd3, 0x0a, 0xf7, 0xe4, 0x58, 0x05, 0xb8, 0xb3, 0x45, 0x06, 0xd0, 0x2c, 0x1e, 0x8f, 0xca, 0x3f, 0x0f, 0x02, 0xc1, 0xaf, 0xbd, 0x03, 0x01, 0x13, 0x8a, 0x6b, 0x3a, 0x91, 0x11, 0x41, 0x4f, 0x67, 0xdc, 0xea, 0x97, 0xf2, 0xcf, 0xce, 0xf0, 0xb4, 0xe6, 0x73, 0x96, 0xac, 0x74, 0x22, 0xe7, 0xad, 0x35, 0x85, 0xe2, 0xf9, 0x37, 0xe8, 0x1c, 0x75, 0xdf, 0x6e, 0x47, 0xf1, 0x1a, 0x71, 0x1d, 0x29, 0xc5, 0x89, 0x6f, 0xb7, 0x62, 0x0e, 0xaa, 0x18, 0xbe, 0x1b, 0xfc, 0x56, 0x3e, 0x4b, 0xc6, 0xd2, 0x79, 0x20, 0x9a, 0xdb, 0xc0, 0xfe, 0x78, 0xcd, 0x5a, 0xf4, 0x1f, 0xdd, 0xa8, 0x33, 0x88, 0x07, 0xc7, 0x31, 0xb1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xec, 0x5f, 0x60, 0x51, 0x7f, 0xa9, 0x19, 0xb5, 0x4a, 0x0d, 0x2d, 0xe5, 0x7a, 0x9f, 0x93, 0xc9, 0x9c, 0xef, 0xa0, 0xe0, 0x3b, 0x4d, 0xae, 0x2a, 0xf5, 0xb0, 0xc8, 0xeb, 0xbb, 0x3c, 0x83, 0x53, 0x99, 0x61, 0x17, 0x2b, 0x04, 0x7e, 0xba, 0x77, 0xd6, 0x26, 0xe1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0c, 0x7d];

    // Transformations for encryption
    var T1 = [0xc66363a5, 0xf87c7c84, 0xee777799, 0xf67b7b8d, 0xfff2f20d, 0xd66b6bbd, 0xde6f6fb1, 0x91c5c554, 0x60303050, 0x02010103, 0xce6767a9, 0x562b2b7d, 0xe7fefe19, 0xb5d7d762, 0x4dababe6, 0xec76769a, 0x8fcaca45, 0x1f82829d, 0x89c9c940, 0xfa7d7d87, 0xeffafa15, 0xb25959eb, 0x8e4747c9, 0xfbf0f00b, 0x41adadec, 0xb3d4d467, 0x5fa2a2fd, 0x45afafea, 0x239c9cbf, 0x53a4a4f7, 0xe4727296, 0x9bc0c05b, 0x75b7b7c2, 0xe1fdfd1c, 0x3d9393ae, 0x4c26266a, 0x6c36365a, 0x7e3f3f41, 0xf5f7f702, 0x83cccc4f, 0x6834345c, 0x51a5a5f4, 0xd1e5e534, 0xf9f1f108, 0xe2717193, 0xabd8d873, 0x62313153, 0x2a15153f, 0x0804040c, 0x95c7c752, 0x46232365, 0x9dc3c35e, 0x30181828, 0x379696a1, 0x0a05050f, 0x2f9a9ab5, 0x0e070709, 0x24121236, 0x1b80809b, 0xdfe2e23d, 0xcdebeb26, 0x4e272769, 0x7fb2b2cd, 0xea75759f, 0x1209091b, 0x1d83839e, 0x582c2c74, 0x341a1a2e, 0x361b1b2d, 0xdc6e6eb2, 0xb45a5aee, 0x5ba0a0fb, 0xa45252f6, 0x763b3b4d, 0xb7d6d661, 0x7db3b3ce, 0x5229297b, 0xdde3e33e, 0x5e2f2f71, 0x13848497, 0xa65353f5, 0xb9d1d168, 0x00000000, 0xc1eded2c, 0x40202060, 0xe3fcfc1f, 0x79b1b1c8, 0xb65b5bed, 0xd46a6abe, 0x8dcbcb46, 0x67bebed9, 0x7239394b, 0x944a4ade, 0x984c4cd4, 0xb05858e8, 0x85cfcf4a, 0xbbd0d06b, 0xc5efef2a, 0x4faaaae5, 0xedfbfb16, 0x864343c5, 0x9a4d4dd7, 0x66333355, 0x11858594, 0x8a4545cf, 0xe9f9f910, 0x04020206, 0xfe7f7f81, 0xa05050f0, 0x783c3c44, 0x259f9fba, 0x4ba8a8e3, 0xa25151f3, 0x5da3a3fe, 0x804040c0, 0x058f8f8a, 0x3f9292ad, 0x219d9dbc, 0x70383848, 0xf1f5f504, 0x63bcbcdf, 0x77b6b6c1, 0xafdada75, 0x42212163, 0x20101030, 0xe5ffff1a, 0xfdf3f30e, 0xbfd2d26d, 0x81cdcd4c, 0x180c0c14, 0x26131335, 0xc3ecec2f, 0xbe5f5fe1, 0x359797a2, 0x884444cc, 0x2e171739, 0x93c4c457, 0x55a7a7f2, 0xfc7e7e82, 0x7a3d3d47, 0xc86464ac, 0xba5d5de7, 0x3219192b, 0xe6737395, 0xc06060a0, 0x19818198, 0x9e4f4fd1, 0xa3dcdc7f, 0x44222266, 0x542a2a7e, 0x3b9090ab, 0x0b888883, 0x8c4646ca, 0xc7eeee29, 0x6bb8b8d3, 0x2814143c, 0xa7dede79, 0xbc5e5ee2, 0x160b0b1d, 0xaddbdb76, 0xdbe0e03b, 0x64323256, 0x743a3a4e, 0x140a0a1e, 0x924949db, 0x0c06060a, 0x4824246c, 0xb85c5ce4, 0x9fc2c25d, 0xbdd3d36e, 0x43acacef, 0xc46262a6, 0x399191a8, 0x319595a4, 0xd3e4e437, 0xf279798b, 0xd5e7e732, 0x8bc8c843, 0x6e373759, 0xda6d6db7, 0x018d8d8c, 0xb1d5d564, 0x9c4e4ed2, 0x49a9a9e0, 0xd86c6cb4, 0xac5656fa, 0xf3f4f407, 0xcfeaea25, 0xca6565af, 0xf47a7a8e, 0x47aeaee9, 0x10080818, 0x6fbabad5, 0xf0787888, 0x4a25256f, 0x5c2e2e72, 0x381c1c24, 0x57a6a6f1, 0x73b4b4c7, 0x97c6c651, 0xcbe8e823, 0xa1dddd7c, 0xe874749c, 0x3e1f1f21, 0x964b4bdd, 0x61bdbddc, 0x0d8b8b86, 0x0f8a8a85, 0xe0707090, 0x7c3e3e42, 0x71b5b5c4, 0xcc6666aa, 0x904848d8, 0x06030305, 0xf7f6f601, 0x1c0e0e12, 0xc26161a3, 0x6a35355f, 0xae5757f9, 0x69b9b9d0, 0x17868691, 0x99c1c158, 0x3a1d1d27, 0x279e9eb9, 0xd9e1e138, 0xebf8f813, 0x2b9898b3, 0x22111133, 0xd26969bb, 0xa9d9d970, 0x078e8e89, 0x339494a7, 0x2d9b9bb6, 0x3c1e1e22, 0x15878792, 0xc9e9e920, 0x87cece49, 0xaa5555ff, 0x50282878, 0xa5dfdf7a, 0x038c8c8f, 0x59a1a1f8, 0x09898980, 0x1a0d0d17, 0x65bfbfda, 0xd7e6e631, 0x844242c6, 0xd06868b8, 0x824141c3, 0x299999b0, 0x5a2d2d77, 0x1e0f0f11, 0x7bb0b0cb, 0xa85454fc, 0x6dbbbbd6, 0x2c16163a];
    var T2 = [0xa5c66363, 0x84f87c7c, 0x99ee7777, 0x8df67b7b, 0x0dfff2f2, 0xbdd66b6b, 0xb1de6f6f, 0x5491c5c5, 0x50603030, 0x03020101, 0xa9ce6767, 0x7d562b2b, 0x19e7fefe, 0x62b5d7d7, 0xe64dabab, 0x9aec7676, 0x458fcaca, 0x9d1f8282, 0x4089c9c9, 0x87fa7d7d, 0x15effafa, 0xebb25959, 0xc98e4747, 0x0bfbf0f0, 0xec41adad, 0x67b3d4d4, 0xfd5fa2a2, 0xea45afaf, 0xbf239c9c, 0xf753a4a4, 0x96e47272, 0x5b9bc0c0, 0xc275b7b7, 0x1ce1fdfd, 0xae3d9393, 0x6a4c2626, 0x5a6c3636, 0x417e3f3f, 0x02f5f7f7, 0x4f83cccc, 0x5c683434, 0xf451a5a5, 0x34d1e5e5, 0x08f9f1f1, 0x93e27171, 0x73abd8d8, 0x53623131, 0x3f2a1515, 0x0c080404, 0x5295c7c7, 0x65462323, 0x5e9dc3c3, 0x28301818, 0xa1379696, 0x0f0a0505, 0xb52f9a9a, 0x090e0707, 0x36241212, 0x9b1b8080, 0x3ddfe2e2, 0x26cdebeb, 0x694e2727, 0xcd7fb2b2, 0x9fea7575, 0x1b120909, 0x9e1d8383, 0x74582c2c, 0x2e341a1a, 0x2d361b1b, 0xb2dc6e6e, 0xeeb45a5a, 0xfb5ba0a0, 0xf6a45252, 0x4d763b3b, 0x61b7d6d6, 0xce7db3b3, 0x7b522929, 0x3edde3e3, 0x715e2f2f, 0x97138484, 0xf5a65353, 0x68b9d1d1, 0x00000000, 0x2cc1eded, 0x60402020, 0x1fe3fcfc, 0xc879b1b1, 0xedb65b5b, 0xbed46a6a, 0x468dcbcb, 0xd967bebe, 0x4b723939, 0xde944a4a, 0xd4984c4c, 0xe8b05858, 0x4a85cfcf, 0x6bbbd0d0, 0x2ac5efef, 0xe54faaaa, 0x16edfbfb, 0xc5864343, 0xd79a4d4d, 0x55663333, 0x94118585, 0xcf8a4545, 0x10e9f9f9, 0x06040202, 0x81fe7f7f, 0xf0a05050, 0x44783c3c, 0xba259f9f, 0xe34ba8a8, 0xf3a25151, 0xfe5da3a3, 0xc0804040, 0x8a058f8f, 0xad3f9292, 0xbc219d9d, 0x48703838, 0x04f1f5f5, 0xdf63bcbc, 0xc177b6b6, 0x75afdada, 0x63422121, 0x30201010, 0x1ae5ffff, 0x0efdf3f3, 0x6dbfd2d2, 0x4c81cdcd, 0x14180c0c, 0x35261313, 0x2fc3ecec, 0xe1be5f5f, 0xa2359797, 0xcc884444, 0x392e1717, 0x5793c4c4, 0xf255a7a7, 0x82fc7e7e, 0x477a3d3d, 0xacc86464, 0xe7ba5d5d, 0x2b321919, 0x95e67373, 0xa0c06060, 0x98198181, 0xd19e4f4f, 0x7fa3dcdc, 0x66442222, 0x7e542a2a, 0xab3b9090, 0x830b8888, 0xca8c4646, 0x29c7eeee, 0xd36bb8b8, 0x3c281414, 0x79a7dede, 0xe2bc5e5e, 0x1d160b0b, 0x76addbdb, 0x3bdbe0e0, 0x56643232, 0x4e743a3a, 0x1e140a0a, 0xdb924949, 0x0a0c0606, 0x6c482424, 0xe4b85c5c, 0x5d9fc2c2, 0x6ebdd3d3, 0xef43acac, 0xa6c46262, 0xa8399191, 0xa4319595, 0x37d3e4e4, 0x8bf27979, 0x32d5e7e7, 0x438bc8c8, 0x596e3737, 0xb7da6d6d, 0x8c018d8d, 0x64b1d5d5, 0xd29c4e4e, 0xe049a9a9, 0xb4d86c6c, 0xfaac5656, 0x07f3f4f4, 0x25cfeaea, 0xafca6565, 0x8ef47a7a, 0xe947aeae, 0x18100808, 0xd56fbaba, 0x88f07878, 0x6f4a2525, 0x725c2e2e, 0x24381c1c, 0xf157a6a6, 0xc773b4b4, 0x5197c6c6, 0x23cbe8e8, 0x7ca1dddd, 0x9ce87474, 0x213e1f1f, 0xdd964b4b, 0xdc61bdbd, 0x860d8b8b, 0x850f8a8a, 0x90e07070, 0x427c3e3e, 0xc471b5b5, 0xaacc6666, 0xd8904848, 0x05060303, 0x01f7f6f6, 0x121c0e0e, 0xa3c26161, 0x5f6a3535, 0xf9ae5757, 0xd069b9b9, 0x91178686, 0x5899c1c1, 0x273a1d1d, 0xb9279e9e, 0x38d9e1e1, 0x13ebf8f8, 0xb32b9898, 0x33221111, 0xbbd26969, 0x70a9d9d9, 0x89078e8e, 0xa7339494, 0xb62d9b9b, 0x223c1e1e, 0x92158787, 0x20c9e9e9, 0x4987cece, 0xffaa5555, 0x78502828, 0x7aa5dfdf, 0x8f038c8c, 0xf859a1a1, 0x80098989, 0x171a0d0d, 0xda65bfbf, 0x31d7e6e6, 0xc6844242, 0xb8d06868, 0xc3824141, 0xb0299999, 0x775a2d2d, 0x111e0f0f, 0xcb7bb0b0, 0xfca85454, 0xd66dbbbb, 0x3a2c1616];
    var T3 = [0x63a5c663, 0x7c84f87c, 0x7799ee77, 0x7b8df67b, 0xf20dfff2, 0x6bbdd66b, 0x6fb1de6f, 0xc55491c5, 0x30506030, 0x01030201, 0x67a9ce67, 0x2b7d562b, 0xfe19e7fe, 0xd762b5d7, 0xabe64dab, 0x769aec76, 0xca458fca, 0x829d1f82, 0xc94089c9, 0x7d87fa7d, 0xfa15effa, 0x59ebb259, 0x47c98e47, 0xf00bfbf0, 0xadec41ad, 0xd467b3d4, 0xa2fd5fa2, 0xafea45af, 0x9cbf239c, 0xa4f753a4, 0x7296e472, 0xc05b9bc0, 0xb7c275b7, 0xfd1ce1fd, 0x93ae3d93, 0x266a4c26, 0x365a6c36, 0x3f417e3f, 0xf702f5f7, 0xcc4f83cc, 0x345c6834, 0xa5f451a5, 0xe534d1e5, 0xf108f9f1, 0x7193e271, 0xd873abd8, 0x31536231, 0x153f2a15, 0x040c0804, 0xc75295c7, 0x23654623, 0xc35e9dc3, 0x18283018, 0x96a13796, 0x050f0a05, 0x9ab52f9a, 0x07090e07, 0x12362412, 0x809b1b80, 0xe23ddfe2, 0xeb26cdeb, 0x27694e27, 0xb2cd7fb2, 0x759fea75, 0x091b1209, 0x839e1d83, 0x2c74582c, 0x1a2e341a, 0x1b2d361b, 0x6eb2dc6e, 0x5aeeb45a, 0xa0fb5ba0, 0x52f6a452, 0x3b4d763b, 0xd661b7d6, 0xb3ce7db3, 0x297b5229, 0xe33edde3, 0x2f715e2f, 0x84971384, 0x53f5a653, 0xd168b9d1, 0x00000000, 0xed2cc1ed, 0x20604020, 0xfc1fe3fc, 0xb1c879b1, 0x5bedb65b, 0x6abed46a, 0xcb468dcb, 0xbed967be, 0x394b7239, 0x4ade944a, 0x4cd4984c, 0x58e8b058, 0xcf4a85cf, 0xd06bbbd0, 0xef2ac5ef, 0xaae54faa, 0xfb16edfb, 0x43c58643, 0x4dd79a4d, 0x33556633, 0x85941185, 0x45cf8a45, 0xf910e9f9, 0x02060402, 0x7f81fe7f, 0x50f0a050, 0x3c44783c, 0x9fba259f, 0xa8e34ba8, 0x51f3a251, 0xa3fe5da3, 0x40c08040, 0x8f8a058f, 0x92ad3f92, 0x9dbc219d, 0x38487038, 0xf504f1f5, 0xbcdf63bc, 0xb6c177b6, 0xda75afda, 0x21634221, 0x10302010, 0xff1ae5ff, 0xf30efdf3, 0xd26dbfd2, 0xcd4c81cd, 0x0c14180c, 0x13352613, 0xec2fc3ec, 0x5fe1be5f, 0x97a23597, 0x44cc8844, 0x17392e17, 0xc45793c4, 0xa7f255a7, 0x7e82fc7e, 0x3d477a3d, 0x64acc864, 0x5de7ba5d, 0x192b3219, 0x7395e673, 0x60a0c060, 0x81981981, 0x4fd19e4f, 0xdc7fa3dc, 0x22664422, 0x2a7e542a, 0x90ab3b90, 0x88830b88, 0x46ca8c46, 0xee29c7ee, 0xb8d36bb8, 0x143c2814, 0xde79a7de, 0x5ee2bc5e, 0x0b1d160b, 0xdb76addb, 0xe03bdbe0, 0x32566432, 0x3a4e743a, 0x0a1e140a, 0x49db9249, 0x060a0c06, 0x246c4824, 0x5ce4b85c, 0xc25d9fc2, 0xd36ebdd3, 0xacef43ac, 0x62a6c462, 0x91a83991, 0x95a43195, 0xe437d3e4, 0x798bf279, 0xe732d5e7, 0xc8438bc8, 0x37596e37, 0x6db7da6d, 0x8d8c018d, 0xd564b1d5, 0x4ed29c4e, 0xa9e049a9, 0x6cb4d86c, 0x56faac56, 0xf407f3f4, 0xea25cfea, 0x65afca65, 0x7a8ef47a, 0xaee947ae, 0x08181008, 0xbad56fba, 0x7888f078, 0x256f4a25, 0x2e725c2e, 0x1c24381c, 0xa6f157a6, 0xb4c773b4, 0xc65197c6, 0xe823cbe8, 0xdd7ca1dd, 0x749ce874, 0x1f213e1f, 0x4bdd964b, 0xbddc61bd, 0x8b860d8b, 0x8a850f8a, 0x7090e070, 0x3e427c3e, 0xb5c471b5, 0x66aacc66, 0x48d89048, 0x03050603, 0xf601f7f6, 0x0e121c0e, 0x61a3c261, 0x355f6a35, 0x57f9ae57, 0xb9d069b9, 0x86911786, 0xc15899c1, 0x1d273a1d, 0x9eb9279e, 0xe138d9e1, 0xf813ebf8, 0x98b32b98, 0x11332211, 0x69bbd269, 0xd970a9d9, 0x8e89078e, 0x94a73394, 0x9bb62d9b, 0x1e223c1e, 0x87921587, 0xe920c9e9, 0xce4987ce, 0x55ffaa55, 0x28785028, 0xdf7aa5df, 0x8c8f038c, 0xa1f859a1, 0x89800989, 0x0d171a0d, 0xbfda65bf, 0xe631d7e6, 0x42c68442, 0x68b8d068, 0x41c38241, 0x99b02999, 0x2d775a2d, 0x0f111e0f, 0xb0cb7bb0, 0x54fca854, 0xbbd66dbb, 0x163a2c16];
    var T4 = [0x6363a5c6, 0x7c7c84f8, 0x777799ee, 0x7b7b8df6, 0xf2f20dff, 0x6b6bbdd6, 0x6f6fb1de, 0xc5c55491, 0x30305060, 0x01010302, 0x6767a9ce, 0x2b2b7d56, 0xfefe19e7, 0xd7d762b5, 0xababe64d, 0x76769aec, 0xcaca458f, 0x82829d1f, 0xc9c94089, 0x7d7d87fa, 0xfafa15ef, 0x5959ebb2, 0x4747c98e, 0xf0f00bfb, 0xadadec41, 0xd4d467b3, 0xa2a2fd5f, 0xafafea45, 0x9c9cbf23, 0xa4a4f753, 0x727296e4, 0xc0c05b9b, 0xb7b7c275, 0xfdfd1ce1, 0x9393ae3d, 0x26266a4c, 0x36365a6c, 0x3f3f417e, 0xf7f702f5, 0xcccc4f83, 0x34345c68, 0xa5a5f451, 0xe5e534d1, 0xf1f108f9, 0x717193e2, 0xd8d873ab, 0x31315362, 0x15153f2a, 0x04040c08, 0xc7c75295, 0x23236546, 0xc3c35e9d, 0x18182830, 0x9696a137, 0x05050f0a, 0x9a9ab52f, 0x0707090e, 0x12123624, 0x80809b1b, 0xe2e23ddf, 0xebeb26cd, 0x2727694e, 0xb2b2cd7f, 0x75759fea, 0x09091b12, 0x83839e1d, 0x2c2c7458, 0x1a1a2e34, 0x1b1b2d36, 0x6e6eb2dc, 0x5a5aeeb4, 0xa0a0fb5b, 0x5252f6a4, 0x3b3b4d76, 0xd6d661b7, 0xb3b3ce7d, 0x29297b52, 0xe3e33edd, 0x2f2f715e, 0x84849713, 0x5353f5a6, 0xd1d168b9, 0x00000000, 0xeded2cc1, 0x20206040, 0xfcfc1fe3, 0xb1b1c879, 0x5b5bedb6, 0x6a6abed4, 0xcbcb468d, 0xbebed967, 0x39394b72, 0x4a4ade94, 0x4c4cd498, 0x5858e8b0, 0xcfcf4a85, 0xd0d06bbb, 0xefef2ac5, 0xaaaae54f, 0xfbfb16ed, 0x4343c586, 0x4d4dd79a, 0x33335566, 0x85859411, 0x4545cf8a, 0xf9f910e9, 0x02020604, 0x7f7f81fe, 0x5050f0a0, 0x3c3c4478, 0x9f9fba25, 0xa8a8e34b, 0x5151f3a2, 0xa3a3fe5d, 0x4040c080, 0x8f8f8a05, 0x9292ad3f, 0x9d9dbc21, 0x38384870, 0xf5f504f1, 0xbcbcdf63, 0xb6b6c177, 0xdada75af, 0x21216342, 0x10103020, 0xffff1ae5, 0xf3f30efd, 0xd2d26dbf, 0xcdcd4c81, 0x0c0c1418, 0x13133526, 0xecec2fc3, 0x5f5fe1be, 0x9797a235, 0x4444cc88, 0x1717392e, 0xc4c45793, 0xa7a7f255, 0x7e7e82fc, 0x3d3d477a, 0x6464acc8, 0x5d5de7ba, 0x19192b32, 0x737395e6, 0x6060a0c0, 0x81819819, 0x4f4fd19e, 0xdcdc7fa3, 0x22226644, 0x2a2a7e54, 0x9090ab3b, 0x8888830b, 0x4646ca8c, 0xeeee29c7, 0xb8b8d36b, 0x14143c28, 0xdede79a7, 0x5e5ee2bc, 0x0b0b1d16, 0xdbdb76ad, 0xe0e03bdb, 0x32325664, 0x3a3a4e74, 0x0a0a1e14, 0x4949db92, 0x06060a0c, 0x24246c48, 0x5c5ce4b8, 0xc2c25d9f, 0xd3d36ebd, 0xacacef43, 0x6262a6c4, 0x9191a839, 0x9595a431, 0xe4e437d3, 0x79798bf2, 0xe7e732d5, 0xc8c8438b, 0x3737596e, 0x6d6db7da, 0x8d8d8c01, 0xd5d564b1, 0x4e4ed29c, 0xa9a9e049, 0x6c6cb4d8, 0x5656faac, 0xf4f407f3, 0xeaea25cf, 0x6565afca, 0x7a7a8ef4, 0xaeaee947, 0x08081810, 0xbabad56f, 0x787888f0, 0x25256f4a, 0x2e2e725c, 0x1c1c2438, 0xa6a6f157, 0xb4b4c773, 0xc6c65197, 0xe8e823cb, 0xdddd7ca1, 0x74749ce8, 0x1f1f213e, 0x4b4bdd96, 0xbdbddc61, 0x8b8b860d, 0x8a8a850f, 0x707090e0, 0x3e3e427c, 0xb5b5c471, 0x6666aacc, 0x4848d890, 0x03030506, 0xf6f601f7, 0x0e0e121c, 0x6161a3c2, 0x35355f6a, 0x5757f9ae, 0xb9b9d069, 0x86869117, 0xc1c15899, 0x1d1d273a, 0x9e9eb927, 0xe1e138d9, 0xf8f813eb, 0x9898b32b, 0x11113322, 0x6969bbd2, 0xd9d970a9, 0x8e8e8907, 0x9494a733, 0x9b9bb62d, 0x1e1e223c, 0x87879215, 0xe9e920c9, 0xcece4987, 0x5555ffaa, 0x28287850, 0xdfdf7aa5, 0x8c8c8f03, 0xa1a1f859, 0x89898009, 0x0d0d171a, 0xbfbfda65, 0xe6e631d7, 0x4242c684, 0x6868b8d0, 0x4141c382, 0x9999b029, 0x2d2d775a, 0x0f0f111e, 0xb0b0cb7b, 0x5454fca8, 0xbbbbd66d, 0x16163a2c];

    // Transformations for decryption
    var T5 = [0x51f4a750, 0x7e416553, 0x1a17a4c3, 0x3a275e96, 0x3bab6bcb, 0x1f9d45f1, 0xacfa58ab, 0x4be30393, 0x2030fa55, 0xad766df6, 0x88cc7691, 0xf5024c25, 0x4fe5d7fc, 0xc52acbd7, 0x26354480, 0xb562a38f, 0xdeb15a49, 0x25ba1b67, 0x45ea0e98, 0x5dfec0e1, 0xc32f7502, 0x814cf012, 0x8d4697a3, 0x6bd3f9c6, 0x038f5fe7, 0x15929c95, 0xbf6d7aeb, 0x955259da, 0xd4be832d, 0x587421d3, 0x49e06929, 0x8ec9c844, 0x75c2896a, 0xf48e7978, 0x99583e6b, 0x27b971dd, 0xbee14fb6, 0xf088ad17, 0xc920ac66, 0x7dce3ab4, 0x63df4a18, 0xe51a3182, 0x97513360, 0x62537f45, 0xb16477e0, 0xbb6bae84, 0xfe81a01c, 0xf9082b94, 0x70486858, 0x8f45fd19, 0x94de6c87, 0x527bf8b7, 0xab73d323, 0x724b02e2, 0xe31f8f57, 0x6655ab2a, 0xb2eb2807, 0x2fb5c203, 0x86c57b9a, 0xd33708a5, 0x302887f2, 0x23bfa5b2, 0x02036aba, 0xed16825c, 0x8acf1c2b, 0xa779b492, 0xf307f2f0, 0x4e69e2a1, 0x65daf4cd, 0x0605bed5, 0xd134621f, 0xc4a6fe8a, 0x342e539d, 0xa2f355a0, 0x058ae132, 0xa4f6eb75, 0x0b83ec39, 0x4060efaa, 0x5e719f06, 0xbd6e1051, 0x3e218af9, 0x96dd063d, 0xdd3e05ae, 0x4de6bd46, 0x91548db5, 0x71c45d05, 0x0406d46f, 0x605015ff, 0x1998fb24, 0xd6bde997, 0x894043cc, 0x67d99e77, 0xb0e842bd, 0x07898b88, 0xe7195b38, 0x79c8eedb, 0xa17c0a47, 0x7c420fe9, 0xf8841ec9, 0x00000000, 0x09808683, 0x322bed48, 0x1e1170ac, 0x6c5a724e, 0xfd0efffb, 0x0f853856, 0x3daed51e, 0x362d3927, 0x0a0fd964, 0x685ca621, 0x9b5b54d1, 0x24362e3a, 0x0c0a67b1, 0x9357e70f, 0xb4ee96d2, 0x1b9b919e, 0x80c0c54f, 0x61dc20a2, 0x5a774b69, 0x1c121a16, 0xe293ba0a, 0xc0a02ae5, 0x3c22e043, 0x121b171d, 0x0e090d0b, 0xf28bc7ad, 0x2db6a8b9, 0x141ea9c8, 0x57f11985, 0xaf75074c, 0xee99ddbb, 0xa37f60fd, 0xf701269f, 0x5c72f5bc, 0x44663bc5, 0x5bfb7e34, 0x8b432976, 0xcb23c6dc, 0xb6edfc68, 0xb8e4f163, 0xd731dcca, 0x42638510, 0x13972240, 0x84c61120, 0x854a247d, 0xd2bb3df8, 0xaef93211, 0xc729a16d, 0x1d9e2f4b, 0xdcb230f3, 0x0d8652ec, 0x77c1e3d0, 0x2bb3166c, 0xa970b999, 0x119448fa, 0x47e96422, 0xa8fc8cc4, 0xa0f03f1a, 0x567d2cd8, 0x223390ef, 0x87494ec7, 0xd938d1c1, 0x8ccaa2fe, 0x98d40b36, 0xa6f581cf, 0xa57ade28, 0xdab78e26, 0x3fadbfa4, 0x2c3a9de4, 0x5078920d, 0x6a5fcc9b, 0x547e4662, 0xf68d13c2, 0x90d8b8e8, 0x2e39f75e, 0x82c3aff5, 0x9f5d80be, 0x69d0937c, 0x6fd52da9, 0xcf2512b3, 0xc8ac993b, 0x10187da7, 0xe89c636e, 0xdb3bbb7b, 0xcd267809, 0x6e5918f4, 0xec9ab701, 0x834f9aa8, 0xe6956e65, 0xaaffe67e, 0x21bccf08, 0xef15e8e6, 0xbae79bd9, 0x4a6f36ce, 0xea9f09d4, 0x29b07cd6, 0x31a4b2af, 0x2a3f2331, 0xc6a59430, 0x35a266c0, 0x744ebc37, 0xfc82caa6, 0xe090d0b0, 0x33a7d815, 0xf104984a, 0x41ecdaf7, 0x7fcd500e, 0x1791f62f, 0x764dd68d, 0x43efb04d, 0xccaa4d54, 0xe49604df, 0x9ed1b5e3, 0x4c6a881b, 0xc12c1fb8, 0x4665517f, 0x9d5eea04, 0x018c355d, 0xfa877473, 0xfb0b412e, 0xb3671d5a, 0x92dbd252, 0xe9105633, 0x6dd64713, 0x9ad7618c, 0x37a10c7a, 0x59f8148e, 0xeb133c89, 0xcea927ee, 0xb761c935, 0xe11ce5ed, 0x7a47b13c, 0x9cd2df59, 0x55f2733f, 0x1814ce79, 0x73c737bf, 0x53f7cdea, 0x5ffdaa5b, 0xdf3d6f14, 0x7844db86, 0xcaaff381, 0xb968c43e, 0x3824342c, 0xc2a3405f, 0x161dc372, 0xbce2250c, 0x283c498b, 0xff0d9541, 0x39a80171, 0x080cb3de, 0xd8b4e49c, 0x6456c190, 0x7bcb8461, 0xd532b670, 0x486c5c74, 0xd0b85742];
    var T6 = [0x5051f4a7, 0x537e4165, 0xc31a17a4, 0x963a275e, 0xcb3bab6b, 0xf11f9d45, 0xabacfa58, 0x934be303, 0x552030fa, 0xf6ad766d, 0x9188cc76, 0x25f5024c, 0xfc4fe5d7, 0xd7c52acb, 0x80263544, 0x8fb562a3, 0x49deb15a, 0x6725ba1b, 0x9845ea0e, 0xe15dfec0, 0x02c32f75, 0x12814cf0, 0xa38d4697, 0xc66bd3f9, 0xe7038f5f, 0x9515929c, 0xebbf6d7a, 0xda955259, 0x2dd4be83, 0xd3587421, 0x2949e069, 0x448ec9c8, 0x6a75c289, 0x78f48e79, 0x6b99583e, 0xdd27b971, 0xb6bee14f, 0x17f088ad, 0x66c920ac, 0xb47dce3a, 0x1863df4a, 0x82e51a31, 0x60975133, 0x4562537f, 0xe0b16477, 0x84bb6bae, 0x1cfe81a0, 0x94f9082b, 0x58704868, 0x198f45fd, 0x8794de6c, 0xb7527bf8, 0x23ab73d3, 0xe2724b02, 0x57e31f8f, 0x2a6655ab, 0x07b2eb28, 0x032fb5c2, 0x9a86c57b, 0xa5d33708, 0xf2302887, 0xb223bfa5, 0xba02036a, 0x5ced1682, 0x2b8acf1c, 0x92a779b4, 0xf0f307f2, 0xa14e69e2, 0xcd65daf4, 0xd50605be, 0x1fd13462, 0x8ac4a6fe, 0x9d342e53, 0xa0a2f355, 0x32058ae1, 0x75a4f6eb, 0x390b83ec, 0xaa4060ef, 0x065e719f, 0x51bd6e10, 0xf93e218a, 0x3d96dd06, 0xaedd3e05, 0x464de6bd, 0xb591548d, 0x0571c45d, 0x6f0406d4, 0xff605015, 0x241998fb, 0x97d6bde9, 0xcc894043, 0x7767d99e, 0xbdb0e842, 0x8807898b, 0x38e7195b, 0xdb79c8ee, 0x47a17c0a, 0xe97c420f, 0xc9f8841e, 0x00000000, 0x83098086, 0x48322bed, 0xac1e1170, 0x4e6c5a72, 0xfbfd0eff, 0x560f8538, 0x1e3daed5, 0x27362d39, 0x640a0fd9, 0x21685ca6, 0xd19b5b54, 0x3a24362e, 0xb10c0a67, 0x0f9357e7, 0xd2b4ee96, 0x9e1b9b91, 0x4f80c0c5, 0xa261dc20, 0x695a774b, 0x161c121a, 0x0ae293ba, 0xe5c0a02a, 0x433c22e0, 0x1d121b17, 0x0b0e090d, 0xadf28bc7, 0xb92db6a8, 0xc8141ea9, 0x8557f119, 0x4caf7507, 0xbbee99dd, 0xfda37f60, 0x9ff70126, 0xbc5c72f5, 0xc544663b, 0x345bfb7e, 0x768b4329, 0xdccb23c6, 0x68b6edfc, 0x63b8e4f1, 0xcad731dc, 0x10426385, 0x40139722, 0x2084c611, 0x7d854a24, 0xf8d2bb3d, 0x11aef932, 0x6dc729a1, 0x4b1d9e2f, 0xf3dcb230, 0xec0d8652, 0xd077c1e3, 0x6c2bb316, 0x99a970b9, 0xfa119448, 0x2247e964, 0xc4a8fc8c, 0x1aa0f03f, 0xd8567d2c, 0xef223390, 0xc787494e, 0xc1d938d1, 0xfe8ccaa2, 0x3698d40b, 0xcfa6f581, 0x28a57ade, 0x26dab78e, 0xa43fadbf, 0xe42c3a9d, 0x0d507892, 0x9b6a5fcc, 0x62547e46, 0xc2f68d13, 0xe890d8b8, 0x5e2e39f7, 0xf582c3af, 0xbe9f5d80, 0x7c69d093, 0xa96fd52d, 0xb3cf2512, 0x3bc8ac99, 0xa710187d, 0x6ee89c63, 0x7bdb3bbb, 0x09cd2678, 0xf46e5918, 0x01ec9ab7, 0xa8834f9a, 0x65e6956e, 0x7eaaffe6, 0x0821bccf, 0xe6ef15e8, 0xd9bae79b, 0xce4a6f36, 0xd4ea9f09, 0xd629b07c, 0xaf31a4b2, 0x312a3f23, 0x30c6a594, 0xc035a266, 0x37744ebc, 0xa6fc82ca, 0xb0e090d0, 0x1533a7d8, 0x4af10498, 0xf741ecda, 0x0e7fcd50, 0x2f1791f6, 0x8d764dd6, 0x4d43efb0, 0x54ccaa4d, 0xdfe49604, 0xe39ed1b5, 0x1b4c6a88, 0xb8c12c1f, 0x7f466551, 0x049d5eea, 0x5d018c35, 0x73fa8774, 0x2efb0b41, 0x5ab3671d, 0x5292dbd2, 0x33e91056, 0x136dd647, 0x8c9ad761, 0x7a37a10c, 0x8e59f814, 0x89eb133c, 0xeecea927, 0x35b761c9, 0xede11ce5, 0x3c7a47b1, 0x599cd2df, 0x3f55f273, 0x791814ce, 0xbf73c737, 0xea53f7cd, 0x5b5ffdaa, 0x14df3d6f, 0x867844db, 0x81caaff3, 0x3eb968c4, 0x2c382434, 0x5fc2a340, 0x72161dc3, 0x0cbce225, 0x8b283c49, 0x41ff0d95, 0x7139a801, 0xde080cb3, 0x9cd8b4e4, 0x906456c1, 0x617bcb84, 0x70d532b6, 0x74486c5c, 0x42d0b857];
    var T7 = [0xa75051f4, 0x65537e41, 0xa4c31a17, 0x5e963a27, 0x6bcb3bab, 0x45f11f9d, 0x58abacfa, 0x03934be3, 0xfa552030, 0x6df6ad76, 0x769188cc, 0x4c25f502, 0xd7fc4fe5, 0xcbd7c52a, 0x44802635, 0xa38fb562, 0x5a49deb1, 0x1b6725ba, 0x0e9845ea, 0xc0e15dfe, 0x7502c32f, 0xf012814c, 0x97a38d46, 0xf9c66bd3, 0x5fe7038f, 0x9c951592, 0x7aebbf6d, 0x59da9552, 0x832dd4be, 0x21d35874, 0x692949e0, 0xc8448ec9, 0x896a75c2, 0x7978f48e, 0x3e6b9958, 0x71dd27b9, 0x4fb6bee1, 0xad17f088, 0xac66c920, 0x3ab47dce, 0x4a1863df, 0x3182e51a, 0x33609751, 0x7f456253, 0x77e0b164, 0xae84bb6b, 0xa01cfe81, 0x2b94f908, 0x68587048, 0xfd198f45, 0x6c8794de, 0xf8b7527b, 0xd323ab73, 0x02e2724b, 0x8f57e31f, 0xab2a6655, 0x2807b2eb, 0xc2032fb5, 0x7b9a86c5, 0x08a5d337, 0x87f23028, 0xa5b223bf, 0x6aba0203, 0x825ced16, 0x1c2b8acf, 0xb492a779, 0xf2f0f307, 0xe2a14e69, 0xf4cd65da, 0xbed50605, 0x621fd134, 0xfe8ac4a6, 0x539d342e, 0x55a0a2f3, 0xe132058a, 0xeb75a4f6, 0xec390b83, 0xefaa4060, 0x9f065e71, 0x1051bd6e, 0x8af93e21, 0x063d96dd, 0x05aedd3e, 0xbd464de6, 0x8db59154, 0x5d0571c4, 0xd46f0406, 0x15ff6050, 0xfb241998, 0xe997d6bd, 0x43cc8940, 0x9e7767d9, 0x42bdb0e8, 0x8b880789, 0x5b38e719, 0xeedb79c8, 0x0a47a17c, 0x0fe97c42, 0x1ec9f884, 0x00000000, 0x86830980, 0xed48322b, 0x70ac1e11, 0x724e6c5a, 0xfffbfd0e, 0x38560f85, 0xd51e3dae, 0x3927362d, 0xd9640a0f, 0xa621685c, 0x54d19b5b, 0x2e3a2436, 0x67b10c0a, 0xe70f9357, 0x96d2b4ee, 0x919e1b9b, 0xc54f80c0, 0x20a261dc, 0x4b695a77, 0x1a161c12, 0xba0ae293, 0x2ae5c0a0, 0xe0433c22, 0x171d121b, 0x0d0b0e09, 0xc7adf28b, 0xa8b92db6, 0xa9c8141e, 0x198557f1, 0x074caf75, 0xddbbee99, 0x60fda37f, 0x269ff701, 0xf5bc5c72, 0x3bc54466, 0x7e345bfb, 0x29768b43, 0xc6dccb23, 0xfc68b6ed, 0xf163b8e4, 0xdccad731, 0x85104263, 0x22401397, 0x112084c6, 0x247d854a, 0x3df8d2bb, 0x3211aef9, 0xa16dc729, 0x2f4b1d9e, 0x30f3dcb2, 0x52ec0d86, 0xe3d077c1, 0x166c2bb3, 0xb999a970, 0x48fa1194, 0x642247e9, 0x8cc4a8fc, 0x3f1aa0f0, 0x2cd8567d, 0x90ef2233, 0x4ec78749, 0xd1c1d938, 0xa2fe8cca, 0x0b3698d4, 0x81cfa6f5, 0xde28a57a, 0x8e26dab7, 0xbfa43fad, 0x9de42c3a, 0x920d5078, 0xcc9b6a5f, 0x4662547e, 0x13c2f68d, 0xb8e890d8, 0xf75e2e39, 0xaff582c3, 0x80be9f5d, 0x937c69d0, 0x2da96fd5, 0x12b3cf25, 0x993bc8ac, 0x7da71018, 0x636ee89c, 0xbb7bdb3b, 0x7809cd26, 0x18f46e59, 0xb701ec9a, 0x9aa8834f, 0x6e65e695, 0xe67eaaff, 0xcf0821bc, 0xe8e6ef15, 0x9bd9bae7, 0x36ce4a6f, 0x09d4ea9f, 0x7cd629b0, 0xb2af31a4, 0x23312a3f, 0x9430c6a5, 0x66c035a2, 0xbc37744e, 0xcaa6fc82, 0xd0b0e090, 0xd81533a7, 0x984af104, 0xdaf741ec, 0x500e7fcd, 0xf62f1791, 0xd68d764d, 0xb04d43ef, 0x4d54ccaa, 0x04dfe496, 0xb5e39ed1, 0x881b4c6a, 0x1fb8c12c, 0x517f4665, 0xea049d5e, 0x355d018c, 0x7473fa87, 0x412efb0b, 0x1d5ab367, 0xd25292db, 0x5633e910, 0x47136dd6, 0x618c9ad7, 0x0c7a37a1, 0x148e59f8, 0x3c89eb13, 0x27eecea9, 0xc935b761, 0xe5ede11c, 0xb13c7a47, 0xdf599cd2, 0x733f55f2, 0xce791814, 0x37bf73c7, 0xcdea53f7, 0xaa5b5ffd, 0x6f14df3d, 0xdb867844, 0xf381caaf, 0xc43eb968, 0x342c3824, 0x405fc2a3, 0xc372161d, 0x250cbce2, 0x498b283c, 0x9541ff0d, 0x017139a8, 0xb3de080c, 0xe49cd8b4, 0xc1906456, 0x84617bcb, 0xb670d532, 0x5c74486c, 0x5742d0b8];
    var T8 = [0xf4a75051, 0x4165537e, 0x17a4c31a, 0x275e963a, 0xab6bcb3b, 0x9d45f11f, 0xfa58abac, 0xe303934b, 0x30fa5520, 0x766df6ad, 0xcc769188, 0x024c25f5, 0xe5d7fc4f, 0x2acbd7c5, 0x35448026, 0x62a38fb5, 0xb15a49de, 0xba1b6725, 0xea0e9845, 0xfec0e15d, 0x2f7502c3, 0x4cf01281, 0x4697a38d, 0xd3f9c66b, 0x8f5fe703, 0x929c9515, 0x6d7aebbf, 0x5259da95, 0xbe832dd4, 0x7421d358, 0xe0692949, 0xc9c8448e, 0xc2896a75, 0x8e7978f4, 0x583e6b99, 0xb971dd27, 0xe14fb6be, 0x88ad17f0, 0x20ac66c9, 0xce3ab47d, 0xdf4a1863, 0x1a3182e5, 0x51336097, 0x537f4562, 0x6477e0b1, 0x6bae84bb, 0x81a01cfe, 0x082b94f9, 0x48685870, 0x45fd198f, 0xde6c8794, 0x7bf8b752, 0x73d323ab, 0x4b02e272, 0x1f8f57e3, 0x55ab2a66, 0xeb2807b2, 0xb5c2032f, 0xc57b9a86, 0x3708a5d3, 0x2887f230, 0xbfa5b223, 0x036aba02, 0x16825ced, 0xcf1c2b8a, 0x79b492a7, 0x07f2f0f3, 0x69e2a14e, 0xdaf4cd65, 0x05bed506, 0x34621fd1, 0xa6fe8ac4, 0x2e539d34, 0xf355a0a2, 0x8ae13205, 0xf6eb75a4, 0x83ec390b, 0x60efaa40, 0x719f065e, 0x6e1051bd, 0x218af93e, 0xdd063d96, 0x3e05aedd, 0xe6bd464d, 0x548db591, 0xc45d0571, 0x06d46f04, 0x5015ff60, 0x98fb2419, 0xbde997d6, 0x4043cc89, 0xd99e7767, 0xe842bdb0, 0x898b8807, 0x195b38e7, 0xc8eedb79, 0x7c0a47a1, 0x420fe97c, 0x841ec9f8, 0x00000000, 0x80868309, 0x2bed4832, 0x1170ac1e, 0x5a724e6c, 0x0efffbfd, 0x8538560f, 0xaed51e3d, 0x2d392736, 0x0fd9640a, 0x5ca62168, 0x5b54d19b, 0x362e3a24, 0x0a67b10c, 0x57e70f93, 0xee96d2b4, 0x9b919e1b, 0xc0c54f80, 0xdc20a261, 0x774b695a, 0x121a161c, 0x93ba0ae2, 0xa02ae5c0, 0x22e0433c, 0x1b171d12, 0x090d0b0e, 0x8bc7adf2, 0xb6a8b92d, 0x1ea9c814, 0xf1198557, 0x75074caf, 0x99ddbbee, 0x7f60fda3, 0x01269ff7, 0x72f5bc5c, 0x663bc544, 0xfb7e345b, 0x4329768b, 0x23c6dccb, 0xedfc68b6, 0xe4f163b8, 0x31dccad7, 0x63851042, 0x97224013, 0xc6112084, 0x4a247d85, 0xbb3df8d2, 0xf93211ae, 0x29a16dc7, 0x9e2f4b1d, 0xb230f3dc, 0x8652ec0d, 0xc1e3d077, 0xb3166c2b, 0x70b999a9, 0x9448fa11, 0xe9642247, 0xfc8cc4a8, 0xf03f1aa0, 0x7d2cd856, 0x3390ef22, 0x494ec787, 0x38d1c1d9, 0xcaa2fe8c, 0xd40b3698, 0xf581cfa6, 0x7ade28a5, 0xb78e26da, 0xadbfa43f, 0x3a9de42c, 0x78920d50, 0x5fcc9b6a, 0x7e466254, 0x8d13c2f6, 0xd8b8e890, 0x39f75e2e, 0xc3aff582, 0x5d80be9f, 0xd0937c69, 0xd52da96f, 0x2512b3cf, 0xac993bc8, 0x187da710, 0x9c636ee8, 0x3bbb7bdb, 0x267809cd, 0x5918f46e, 0x9ab701ec, 0x4f9aa883, 0x956e65e6, 0xffe67eaa, 0xbccf0821, 0x15e8e6ef, 0xe79bd9ba, 0x6f36ce4a, 0x9f09d4ea, 0xb07cd629, 0xa4b2af31, 0x3f23312a, 0xa59430c6, 0xa266c035, 0x4ebc3774, 0x82caa6fc, 0x90d0b0e0, 0xa7d81533, 0x04984af1, 0xecdaf741, 0xcd500e7f, 0x91f62f17, 0x4dd68d76, 0xefb04d43, 0xaa4d54cc, 0x9604dfe4, 0xd1b5e39e, 0x6a881b4c, 0x2c1fb8c1, 0x65517f46, 0x5eea049d, 0x8c355d01, 0x877473fa, 0x0b412efb, 0x671d5ab3, 0xdbd25292, 0x105633e9, 0xd647136d, 0xd7618c9a, 0xa10c7a37, 0xf8148e59, 0x133c89eb, 0xa927eece, 0x61c935b7, 0x1ce5ede1, 0x47b13c7a, 0xd2df599c, 0xf2733f55, 0x14ce7918, 0xc737bf73, 0xf7cdea53, 0xfdaa5b5f, 0x3d6f14df, 0x44db8678, 0xaff381ca, 0x68c43eb9, 0x24342c38, 0xa3405fc2, 0x1dc37216, 0xe2250cbc, 0x3c498b28, 0x0d9541ff, 0xa8017139, 0x0cb3de08, 0xb4e49cd8, 0x56c19064, 0xcb84617b, 0x32b670d5, 0x6c5c7448, 0xb85742d0];

    // Transformations for decryption key expansion
    var U1 = [0x00000000, 0x0e090d0b, 0x1c121a16, 0x121b171d, 0x3824342c, 0x362d3927, 0x24362e3a, 0x2a3f2331, 0x70486858, 0x7e416553, 0x6c5a724e, 0x62537f45, 0x486c5c74, 0x4665517f, 0x547e4662, 0x5a774b69, 0xe090d0b0, 0xee99ddbb, 0xfc82caa6, 0xf28bc7ad, 0xd8b4e49c, 0xd6bde997, 0xc4a6fe8a, 0xcaaff381, 0x90d8b8e8, 0x9ed1b5e3, 0x8ccaa2fe, 0x82c3aff5, 0xa8fc8cc4, 0xa6f581cf, 0xb4ee96d2, 0xbae79bd9, 0xdb3bbb7b, 0xd532b670, 0xc729a16d, 0xc920ac66, 0xe31f8f57, 0xed16825c, 0xff0d9541, 0xf104984a, 0xab73d323, 0xa57ade28, 0xb761c935, 0xb968c43e, 0x9357e70f, 0x9d5eea04, 0x8f45fd19, 0x814cf012, 0x3bab6bcb, 0x35a266c0, 0x27b971dd, 0x29b07cd6, 0x038f5fe7, 0x0d8652ec, 0x1f9d45f1, 0x119448fa, 0x4be30393, 0x45ea0e98, 0x57f11985, 0x59f8148e, 0x73c737bf, 0x7dce3ab4, 0x6fd52da9, 0x61dc20a2, 0xad766df6, 0xa37f60fd, 0xb16477e0, 0xbf6d7aeb, 0x955259da, 0x9b5b54d1, 0x894043cc, 0x87494ec7, 0xdd3e05ae, 0xd33708a5, 0xc12c1fb8, 0xcf2512b3, 0xe51a3182, 0xeb133c89, 0xf9082b94, 0xf701269f, 0x4de6bd46, 0x43efb04d, 0x51f4a750, 0x5ffdaa5b, 0x75c2896a, 0x7bcb8461, 0x69d0937c, 0x67d99e77, 0x3daed51e, 0x33a7d815, 0x21bccf08, 0x2fb5c203, 0x058ae132, 0x0b83ec39, 0x1998fb24, 0x1791f62f, 0x764dd68d, 0x7844db86, 0x6a5fcc9b, 0x6456c190, 0x4e69e2a1, 0x4060efaa, 0x527bf8b7, 0x5c72f5bc, 0x0605bed5, 0x080cb3de, 0x1a17a4c3, 0x141ea9c8, 0x3e218af9, 0x302887f2, 0x223390ef, 0x2c3a9de4, 0x96dd063d, 0x98d40b36, 0x8acf1c2b, 0x84c61120, 0xaef93211, 0xa0f03f1a, 0xb2eb2807, 0xbce2250c, 0xe6956e65, 0xe89c636e, 0xfa877473, 0xf48e7978, 0xdeb15a49, 0xd0b85742, 0xc2a3405f, 0xccaa4d54, 0x41ecdaf7, 0x4fe5d7fc, 0x5dfec0e1, 0x53f7cdea, 0x79c8eedb, 0x77c1e3d0, 0x65daf4cd, 0x6bd3f9c6, 0x31a4b2af, 0x3fadbfa4, 0x2db6a8b9, 0x23bfa5b2, 0x09808683, 0x07898b88, 0x15929c95, 0x1b9b919e, 0xa17c0a47, 0xaf75074c, 0xbd6e1051, 0xb3671d5a, 0x99583e6b, 0x97513360, 0x854a247d, 0x8b432976, 0xd134621f, 0xdf3d6f14, 0xcd267809, 0xc32f7502, 0xe9105633, 0xe7195b38, 0xf5024c25, 0xfb0b412e, 0x9ad7618c, 0x94de6c87, 0x86c57b9a, 0x88cc7691, 0xa2f355a0, 0xacfa58ab, 0xbee14fb6, 0xb0e842bd, 0xea9f09d4, 0xe49604df, 0xf68d13c2, 0xf8841ec9, 0xd2bb3df8, 0xdcb230f3, 0xcea927ee, 0xc0a02ae5, 0x7a47b13c, 0x744ebc37, 0x6655ab2a, 0x685ca621, 0x42638510, 0x4c6a881b, 0x5e719f06, 0x5078920d, 0x0a0fd964, 0x0406d46f, 0x161dc372, 0x1814ce79, 0x322bed48, 0x3c22e043, 0x2e39f75e, 0x2030fa55, 0xec9ab701, 0xe293ba0a, 0xf088ad17, 0xfe81a01c, 0xd4be832d, 0xdab78e26, 0xc8ac993b, 0xc6a59430, 0x9cd2df59, 0x92dbd252, 0x80c0c54f, 0x8ec9c844, 0xa4f6eb75, 0xaaffe67e, 0xb8e4f163, 0xb6edfc68, 0x0c0a67b1, 0x02036aba, 0x10187da7, 0x1e1170ac, 0x342e539d, 0x3a275e96, 0x283c498b, 0x26354480, 0x7c420fe9, 0x724b02e2, 0x605015ff, 0x6e5918f4, 0x44663bc5, 0x4a6f36ce, 0x587421d3, 0x567d2cd8, 0x37a10c7a, 0x39a80171, 0x2bb3166c, 0x25ba1b67, 0x0f853856, 0x018c355d, 0x13972240, 0x1d9e2f4b, 0x47e96422, 0x49e06929, 0x5bfb7e34, 0x55f2733f, 0x7fcd500e, 0x71c45d05, 0x63df4a18, 0x6dd64713, 0xd731dcca, 0xd938d1c1, 0xcb23c6dc, 0xc52acbd7, 0xef15e8e6, 0xe11ce5ed, 0xf307f2f0, 0xfd0efffb, 0xa779b492, 0xa970b999, 0xbb6bae84, 0xb562a38f, 0x9f5d80be, 0x91548db5, 0x834f9aa8, 0x8d4697a3];
    var U2 = [0x00000000, 0x0b0e090d, 0x161c121a, 0x1d121b17, 0x2c382434, 0x27362d39, 0x3a24362e, 0x312a3f23, 0x58704868, 0x537e4165, 0x4e6c5a72, 0x4562537f, 0x74486c5c, 0x7f466551, 0x62547e46, 0x695a774b, 0xb0e090d0, 0xbbee99dd, 0xa6fc82ca, 0xadf28bc7, 0x9cd8b4e4, 0x97d6bde9, 0x8ac4a6fe, 0x81caaff3, 0xe890d8b8, 0xe39ed1b5, 0xfe8ccaa2, 0xf582c3af, 0xc4a8fc8c, 0xcfa6f581, 0xd2b4ee96, 0xd9bae79b, 0x7bdb3bbb, 0x70d532b6, 0x6dc729a1, 0x66c920ac, 0x57e31f8f, 0x5ced1682, 0x41ff0d95, 0x4af10498, 0x23ab73d3, 0x28a57ade, 0x35b761c9, 0x3eb968c4, 0x0f9357e7, 0x049d5eea, 0x198f45fd, 0x12814cf0, 0xcb3bab6b, 0xc035a266, 0xdd27b971, 0xd629b07c, 0xe7038f5f, 0xec0d8652, 0xf11f9d45, 0xfa119448, 0x934be303, 0x9845ea0e, 0x8557f119, 0x8e59f814, 0xbf73c737, 0xb47dce3a, 0xa96fd52d, 0xa261dc20, 0xf6ad766d, 0xfda37f60, 0xe0b16477, 0xebbf6d7a, 0xda955259, 0xd19b5b54, 0xcc894043, 0xc787494e, 0xaedd3e05, 0xa5d33708, 0xb8c12c1f, 0xb3cf2512, 0x82e51a31, 0x89eb133c, 0x94f9082b, 0x9ff70126, 0x464de6bd, 0x4d43efb0, 0x5051f4a7, 0x5b5ffdaa, 0x6a75c289, 0x617bcb84, 0x7c69d093, 0x7767d99e, 0x1e3daed5, 0x1533a7d8, 0x0821bccf, 0x032fb5c2, 0x32058ae1, 0x390b83ec, 0x241998fb, 0x2f1791f6, 0x8d764dd6, 0x867844db, 0x9b6a5fcc, 0x906456c1, 0xa14e69e2, 0xaa4060ef, 0xb7527bf8, 0xbc5c72f5, 0xd50605be, 0xde080cb3, 0xc31a17a4, 0xc8141ea9, 0xf93e218a, 0xf2302887, 0xef223390, 0xe42c3a9d, 0x3d96dd06, 0x3698d40b, 0x2b8acf1c, 0x2084c611, 0x11aef932, 0x1aa0f03f, 0x07b2eb28, 0x0cbce225, 0x65e6956e, 0x6ee89c63, 0x73fa8774, 0x78f48e79, 0x49deb15a, 0x42d0b857, 0x5fc2a340, 0x54ccaa4d, 0xf741ecda, 0xfc4fe5d7, 0xe15dfec0, 0xea53f7cd, 0xdb79c8ee, 0xd077c1e3, 0xcd65daf4, 0xc66bd3f9, 0xaf31a4b2, 0xa43fadbf, 0xb92db6a8, 0xb223bfa5, 0x83098086, 0x8807898b, 0x9515929c, 0x9e1b9b91, 0x47a17c0a, 0x4caf7507, 0x51bd6e10, 0x5ab3671d, 0x6b99583e, 0x60975133, 0x7d854a24, 0x768b4329, 0x1fd13462, 0x14df3d6f, 0x09cd2678, 0x02c32f75, 0x33e91056, 0x38e7195b, 0x25f5024c, 0x2efb0b41, 0x8c9ad761, 0x8794de6c, 0x9a86c57b, 0x9188cc76, 0xa0a2f355, 0xabacfa58, 0xb6bee14f, 0xbdb0e842, 0xd4ea9f09, 0xdfe49604, 0xc2f68d13, 0xc9f8841e, 0xf8d2bb3d, 0xf3dcb230, 0xeecea927, 0xe5c0a02a, 0x3c7a47b1, 0x37744ebc, 0x2a6655ab, 0x21685ca6, 0x10426385, 0x1b4c6a88, 0x065e719f, 0x0d507892, 0x640a0fd9, 0x6f0406d4, 0x72161dc3, 0x791814ce, 0x48322bed, 0x433c22e0, 0x5e2e39f7, 0x552030fa, 0x01ec9ab7, 0x0ae293ba, 0x17f088ad, 0x1cfe81a0, 0x2dd4be83, 0x26dab78e, 0x3bc8ac99, 0x30c6a594, 0x599cd2df, 0x5292dbd2, 0x4f80c0c5, 0x448ec9c8, 0x75a4f6eb, 0x7eaaffe6, 0x63b8e4f1, 0x68b6edfc, 0xb10c0a67, 0xba02036a, 0xa710187d, 0xac1e1170, 0x9d342e53, 0x963a275e, 0x8b283c49, 0x80263544, 0xe97c420f, 0xe2724b02, 0xff605015, 0xf46e5918, 0xc544663b, 0xce4a6f36, 0xd3587421, 0xd8567d2c, 0x7a37a10c, 0x7139a801, 0x6c2bb316, 0x6725ba1b, 0x560f8538, 0x5d018c35, 0x40139722, 0x4b1d9e2f, 0x2247e964, 0x2949e069, 0x345bfb7e, 0x3f55f273, 0x0e7fcd50, 0x0571c45d, 0x1863df4a, 0x136dd647, 0xcad731dc, 0xc1d938d1, 0xdccb23c6, 0xd7c52acb, 0xe6ef15e8, 0xede11ce5, 0xf0f307f2, 0xfbfd0eff, 0x92a779b4, 0x99a970b9, 0x84bb6bae, 0x8fb562a3, 0xbe9f5d80, 0xb591548d, 0xa8834f9a, 0xa38d4697];
    var U3 = [0x00000000, 0x0d0b0e09, 0x1a161c12, 0x171d121b, 0x342c3824, 0x3927362d, 0x2e3a2436, 0x23312a3f, 0x68587048, 0x65537e41, 0x724e6c5a, 0x7f456253, 0x5c74486c, 0x517f4665, 0x4662547e, 0x4b695a77, 0xd0b0e090, 0xddbbee99, 0xcaa6fc82, 0xc7adf28b, 0xe49cd8b4, 0xe997d6bd, 0xfe8ac4a6, 0xf381caaf, 0xb8e890d8, 0xb5e39ed1, 0xa2fe8cca, 0xaff582c3, 0x8cc4a8fc, 0x81cfa6f5, 0x96d2b4ee, 0x9bd9bae7, 0xbb7bdb3b, 0xb670d532, 0xa16dc729, 0xac66c920, 0x8f57e31f, 0x825ced16, 0x9541ff0d, 0x984af104, 0xd323ab73, 0xde28a57a, 0xc935b761, 0xc43eb968, 0xe70f9357, 0xea049d5e, 0xfd198f45, 0xf012814c, 0x6bcb3bab, 0x66c035a2, 0x71dd27b9, 0x7cd629b0, 0x5fe7038f, 0x52ec0d86, 0x45f11f9d, 0x48fa1194, 0x03934be3, 0x0e9845ea, 0x198557f1, 0x148e59f8, 0x37bf73c7, 0x3ab47dce, 0x2da96fd5, 0x20a261dc, 0x6df6ad76, 0x60fda37f, 0x77e0b164, 0x7aebbf6d, 0x59da9552, 0x54d19b5b, 0x43cc8940, 0x4ec78749, 0x05aedd3e, 0x08a5d337, 0x1fb8c12c, 0x12b3cf25, 0x3182e51a, 0x3c89eb13, 0x2b94f908, 0x269ff701, 0xbd464de6, 0xb04d43ef, 0xa75051f4, 0xaa5b5ffd, 0x896a75c2, 0x84617bcb, 0x937c69d0, 0x9e7767d9, 0xd51e3dae, 0xd81533a7, 0xcf0821bc, 0xc2032fb5, 0xe132058a, 0xec390b83, 0xfb241998, 0xf62f1791, 0xd68d764d, 0xdb867844, 0xcc9b6a5f, 0xc1906456, 0xe2a14e69, 0xefaa4060, 0xf8b7527b, 0xf5bc5c72, 0xbed50605, 0xb3de080c, 0xa4c31a17, 0xa9c8141e, 0x8af93e21, 0x87f23028, 0x90ef2233, 0x9de42c3a, 0x063d96dd, 0x0b3698d4, 0x1c2b8acf, 0x112084c6, 0x3211aef9, 0x3f1aa0f0, 0x2807b2eb, 0x250cbce2, 0x6e65e695, 0x636ee89c, 0x7473fa87, 0x7978f48e, 0x5a49deb1, 0x5742d0b8, 0x405fc2a3, 0x4d54ccaa, 0xdaf741ec, 0xd7fc4fe5, 0xc0e15dfe, 0xcdea53f7, 0xeedb79c8, 0xe3d077c1, 0xf4cd65da, 0xf9c66bd3, 0xb2af31a4, 0xbfa43fad, 0xa8b92db6, 0xa5b223bf, 0x86830980, 0x8b880789, 0x9c951592, 0x919e1b9b, 0x0a47a17c, 0x074caf75, 0x1051bd6e, 0x1d5ab367, 0x3e6b9958, 0x33609751, 0x247d854a, 0x29768b43, 0x621fd134, 0x6f14df3d, 0x7809cd26, 0x7502c32f, 0x5633e910, 0x5b38e719, 0x4c25f502, 0x412efb0b, 0x618c9ad7, 0x6c8794de, 0x7b9a86c5, 0x769188cc, 0x55a0a2f3, 0x58abacfa, 0x4fb6bee1, 0x42bdb0e8, 0x09d4ea9f, 0x04dfe496, 0x13c2f68d, 0x1ec9f884, 0x3df8d2bb, 0x30f3dcb2, 0x27eecea9, 0x2ae5c0a0, 0xb13c7a47, 0xbc37744e, 0xab2a6655, 0xa621685c, 0x85104263, 0x881b4c6a, 0x9f065e71, 0x920d5078, 0xd9640a0f, 0xd46f0406, 0xc372161d, 0xce791814, 0xed48322b, 0xe0433c22, 0xf75e2e39, 0xfa552030, 0xb701ec9a, 0xba0ae293, 0xad17f088, 0xa01cfe81, 0x832dd4be, 0x8e26dab7, 0x993bc8ac, 0x9430c6a5, 0xdf599cd2, 0xd25292db, 0xc54f80c0, 0xc8448ec9, 0xeb75a4f6, 0xe67eaaff, 0xf163b8e4, 0xfc68b6ed, 0x67b10c0a, 0x6aba0203, 0x7da71018, 0x70ac1e11, 0x539d342e, 0x5e963a27, 0x498b283c, 0x44802635, 0x0fe97c42, 0x02e2724b, 0x15ff6050, 0x18f46e59, 0x3bc54466, 0x36ce4a6f, 0x21d35874, 0x2cd8567d, 0x0c7a37a1, 0x017139a8, 0x166c2bb3, 0x1b6725ba, 0x38560f85, 0x355d018c, 0x22401397, 0x2f4b1d9e, 0x642247e9, 0x692949e0, 0x7e345bfb, 0x733f55f2, 0x500e7fcd, 0x5d0571c4, 0x4a1863df, 0x47136dd6, 0xdccad731, 0xd1c1d938, 0xc6dccb23, 0xcbd7c52a, 0xe8e6ef15, 0xe5ede11c, 0xf2f0f307, 0xfffbfd0e, 0xb492a779, 0xb999a970, 0xae84bb6b, 0xa38fb562, 0x80be9f5d, 0x8db59154, 0x9aa8834f, 0x97a38d46];
    var U4 = [0x00000000, 0x090d0b0e, 0x121a161c, 0x1b171d12, 0x24342c38, 0x2d392736, 0x362e3a24, 0x3f23312a, 0x48685870, 0x4165537e, 0x5a724e6c, 0x537f4562, 0x6c5c7448, 0x65517f46, 0x7e466254, 0x774b695a, 0x90d0b0e0, 0x99ddbbee, 0x82caa6fc, 0x8bc7adf2, 0xb4e49cd8, 0xbde997d6, 0xa6fe8ac4, 0xaff381ca, 0xd8b8e890, 0xd1b5e39e, 0xcaa2fe8c, 0xc3aff582, 0xfc8cc4a8, 0xf581cfa6, 0xee96d2b4, 0xe79bd9ba, 0x3bbb7bdb, 0x32b670d5, 0x29a16dc7, 0x20ac66c9, 0x1f8f57e3, 0x16825ced, 0x0d9541ff, 0x04984af1, 0x73d323ab, 0x7ade28a5, 0x61c935b7, 0x68c43eb9, 0x57e70f93, 0x5eea049d, 0x45fd198f, 0x4cf01281, 0xab6bcb3b, 0xa266c035, 0xb971dd27, 0xb07cd629, 0x8f5fe703, 0x8652ec0d, 0x9d45f11f, 0x9448fa11, 0xe303934b, 0xea0e9845, 0xf1198557, 0xf8148e59, 0xc737bf73, 0xce3ab47d, 0xd52da96f, 0xdc20a261, 0x766df6ad, 0x7f60fda3, 0x6477e0b1, 0x6d7aebbf, 0x5259da95, 0x5b54d19b, 0x4043cc89, 0x494ec787, 0x3e05aedd, 0x3708a5d3, 0x2c1fb8c1, 0x2512b3cf, 0x1a3182e5, 0x133c89eb, 0x082b94f9, 0x01269ff7, 0xe6bd464d, 0xefb04d43, 0xf4a75051, 0xfdaa5b5f, 0xc2896a75, 0xcb84617b, 0xd0937c69, 0xd99e7767, 0xaed51e3d, 0xa7d81533, 0xbccf0821, 0xb5c2032f, 0x8ae13205, 0x83ec390b, 0x98fb2419, 0x91f62f17, 0x4dd68d76, 0x44db8678, 0x5fcc9b6a, 0x56c19064, 0x69e2a14e, 0x60efaa40, 0x7bf8b752, 0x72f5bc5c, 0x05bed506, 0x0cb3de08, 0x17a4c31a, 0x1ea9c814, 0x218af93e, 0x2887f230, 0x3390ef22, 0x3a9de42c, 0xdd063d96, 0xd40b3698, 0xcf1c2b8a, 0xc6112084, 0xf93211ae, 0xf03f1aa0, 0xeb2807b2, 0xe2250cbc, 0x956e65e6, 0x9c636ee8, 0x877473fa, 0x8e7978f4, 0xb15a49de, 0xb85742d0, 0xa3405fc2, 0xaa4d54cc, 0xecdaf741, 0xe5d7fc4f, 0xfec0e15d, 0xf7cdea53, 0xc8eedb79, 0xc1e3d077, 0xdaf4cd65, 0xd3f9c66b, 0xa4b2af31, 0xadbfa43f, 0xb6a8b92d, 0xbfa5b223, 0x80868309, 0x898b8807, 0x929c9515, 0x9b919e1b, 0x7c0a47a1, 0x75074caf, 0x6e1051bd, 0x671d5ab3, 0x583e6b99, 0x51336097, 0x4a247d85, 0x4329768b, 0x34621fd1, 0x3d6f14df, 0x267809cd, 0x2f7502c3, 0x105633e9, 0x195b38e7, 0x024c25f5, 0x0b412efb, 0xd7618c9a, 0xde6c8794, 0xc57b9a86, 0xcc769188, 0xf355a0a2, 0xfa58abac, 0xe14fb6be, 0xe842bdb0, 0x9f09d4ea, 0x9604dfe4, 0x8d13c2f6, 0x841ec9f8, 0xbb3df8d2, 0xb230f3dc, 0xa927eece, 0xa02ae5c0, 0x47b13c7a, 0x4ebc3774, 0x55ab2a66, 0x5ca62168, 0x63851042, 0x6a881b4c, 0x719f065e, 0x78920d50, 0x0fd9640a, 0x06d46f04, 0x1dc37216, 0x14ce7918, 0x2bed4832, 0x22e0433c, 0x39f75e2e, 0x30fa5520, 0x9ab701ec, 0x93ba0ae2, 0x88ad17f0, 0x81a01cfe, 0xbe832dd4, 0xb78e26da, 0xac993bc8, 0xa59430c6, 0xd2df599c, 0xdbd25292, 0xc0c54f80, 0xc9c8448e, 0xf6eb75a4, 0xffe67eaa, 0xe4f163b8, 0xedfc68b6, 0x0a67b10c, 0x036aba02, 0x187da710, 0x1170ac1e, 0x2e539d34, 0x275e963a, 0x3c498b28, 0x35448026, 0x420fe97c, 0x4b02e272, 0x5015ff60, 0x5918f46e, 0x663bc544, 0x6f36ce4a, 0x7421d358, 0x7d2cd856, 0xa10c7a37, 0xa8017139, 0xb3166c2b, 0xba1b6725, 0x8538560f, 0x8c355d01, 0x97224013, 0x9e2f4b1d, 0xe9642247, 0xe0692949, 0xfb7e345b, 0xf2733f55, 0xcd500e7f, 0xc45d0571, 0xdf4a1863, 0xd647136d, 0x31dccad7, 0x38d1c1d9, 0x23c6dccb, 0x2acbd7c5, 0x15e8e6ef, 0x1ce5ede1, 0x07f2f0f3, 0x0efffbfd, 0x79b492a7, 0x70b999a9, 0x6bae84bb, 0x62a38fb5, 0x5d80be9f, 0x548db591, 0x4f9aa883, 0x4697a38d];

    function convertToInt32(bytes) {
        var result = [];
        for (var i = 0; i < bytes.length; i += 4) {
            result.push(
                (bytes[i    ] << 24) |
                (bytes[i + 1] << 16) |
                (bytes[i + 2] <<  8) |
                 bytes[i + 3]
            );
        }
        return result;
    }

    var AES = function(key) {
        if (!(this instanceof AES)) {
            throw Error('AES must be instanitated with `new`');
        }

        Object.defineProperty(this, 'key', {
            value: coerceArray(key, true)
        });

        this._prepare();
    }


    AES.prototype._prepare = function() {

        var rounds = numberOfRounds[this.key.length];
        if (rounds == null) {
            throw new Error('invalid key size (must be 16, 24 or 32 bytes)');
        }

        // encryption round keys
        this._Ke = [];

        // decryption round keys
        this._Kd = [];

        for (var i = 0; i <= rounds; i++) {
            this._Ke.push([0, 0, 0, 0]);
            this._Kd.push([0, 0, 0, 0]);
        }

        var roundKeyCount = (rounds + 1) * 4;
        var KC = this.key.length / 4;

        // convert the key into ints
        var tk = convertToInt32(this.key);

        // copy values into round key arrays
        var index;
        for (var i = 0; i < KC; i++) {
            index = i >> 2;
            this._Ke[index][i % 4] = tk[i];
            this._Kd[rounds - index][i % 4] = tk[i];
        }

        // key expansion (fips-197 section 5.2)
        var rconpointer = 0;
        var t = KC, tt;
        while (t < roundKeyCount) {
            tt = tk[KC - 1];
            tk[0] ^= ((S[(tt >> 16) & 0xFF] << 24) ^
                      (S[(tt >>  8) & 0xFF] << 16) ^
                      (S[ tt        & 0xFF] <<  8) ^
                       S[(tt >> 24) & 0xFF]        ^
                      (rcon[rconpointer] << 24));
            rconpointer += 1;

            // key expansion (for non-256 bit)
            if (KC != 8) {
                for (var i = 1; i < KC; i++) {
                    tk[i] ^= tk[i - 1];
                }

            // key expansion for 256-bit keys is "slightly different" (fips-197)
            } else {
                for (var i = 1; i < (KC / 2); i++) {
                    tk[i] ^= tk[i - 1];
                }
                tt = tk[(KC / 2) - 1];

                tk[KC / 2] ^= (S[ tt        & 0xFF]        ^
                              (S[(tt >>  8) & 0xFF] <<  8) ^
                              (S[(tt >> 16) & 0xFF] << 16) ^
                              (S[(tt >> 24) & 0xFF] << 24));

                for (var i = (KC / 2) + 1; i < KC; i++) {
                    tk[i] ^= tk[i - 1];
                }
            }

            // copy values into round key arrays
            var i = 0, r, c;
            while (i < KC && t < roundKeyCount) {
                r = t >> 2;
                c = t % 4;
                this._Ke[r][c] = tk[i];
                this._Kd[rounds - r][c] = tk[i++];
                t++;
            }
        }

        // inverse-cipher-ify the decryption round key (fips-197 section 5.3)
        for (var r = 1; r < rounds; r++) {
            for (var c = 0; c < 4; c++) {
                tt = this._Kd[r][c];
                this._Kd[r][c] = (U1[(tt >> 24) & 0xFF] ^
                                  U2[(tt >> 16) & 0xFF] ^
                                  U3[(tt >>  8) & 0xFF] ^
                                  U4[ tt        & 0xFF]);
            }
        }
    }

    AES.prototype.encrypt = function(plaintext) {
        if (plaintext.length != 16) {
            throw new Error('invalid plaintext size (must be 16 bytes)');
        }

        var rounds = this._Ke.length - 1;
        var a = [0, 0, 0, 0];

        // convert plaintext to (ints ^ key)
        var t = convertToInt32(plaintext);
        for (var i = 0; i < 4; i++) {
            t[i] ^= this._Ke[0][i];
        }

        // apply round transforms
        for (var r = 1; r < rounds; r++) {
            for (var i = 0; i < 4; i++) {
                a[i] = (T1[(t[ i         ] >> 24) & 0xff] ^
                        T2[(t[(i + 1) % 4] >> 16) & 0xff] ^
                        T3[(t[(i + 2) % 4] >>  8) & 0xff] ^
                        T4[ t[(i + 3) % 4]        & 0xff] ^
                        this._Ke[r][i]);
            }
            t = a.slice();
        }

        // the last round is special
        var result = createArray(16), tt;
        for (var i = 0; i < 4; i++) {
            tt = this._Ke[rounds][i];
            result[4 * i    ] = (S[(t[ i         ] >> 24) & 0xff] ^ (tt >> 24)) & 0xff;
            result[4 * i + 1] = (S[(t[(i + 1) % 4] >> 16) & 0xff] ^ (tt >> 16)) & 0xff;
            result[4 * i + 2] = (S[(t[(i + 2) % 4] >>  8) & 0xff] ^ (tt >>  8)) & 0xff;
            result[4 * i + 3] = (S[ t[(i + 3) % 4]        & 0xff] ^  tt       ) & 0xff;
        }

        return result;
    }

    AES.prototype.decrypt = function(ciphertext) {
        if (ciphertext.length != 16) {
            throw new Error('invalid ciphertext size (must be 16 bytes)');
        }

        var rounds = this._Kd.length - 1;
        var a = [0, 0, 0, 0];

        // convert plaintext to (ints ^ key)
        var t = convertToInt32(ciphertext);
        for (var i = 0; i < 4; i++) {
            t[i] ^= this._Kd[0][i];
        }

        // apply round transforms
        for (var r = 1; r < rounds; r++) {
            for (var i = 0; i < 4; i++) {
                a[i] = (T5[(t[ i          ] >> 24) & 0xff] ^
                        T6[(t[(i + 3) % 4] >> 16) & 0xff] ^
                        T7[(t[(i + 2) % 4] >>  8) & 0xff] ^
                        T8[ t[(i + 1) % 4]        & 0xff] ^
                        this._Kd[r][i]);
            }
            t = a.slice();
        }

        // the last round is special
        var result = createArray(16), tt;
        for (var i = 0; i < 4; i++) {
            tt = this._Kd[rounds][i];
            result[4 * i    ] = (Si[(t[ i         ] >> 24) & 0xff] ^ (tt >> 24)) & 0xff;
            result[4 * i + 1] = (Si[(t[(i + 3) % 4] >> 16) & 0xff] ^ (tt >> 16)) & 0xff;
            result[4 * i + 2] = (Si[(t[(i + 2) % 4] >>  8) & 0xff] ^ (tt >>  8)) & 0xff;
            result[4 * i + 3] = (Si[ t[(i + 1) % 4]        & 0xff] ^  tt       ) & 0xff;
        }

        return result;
    }


    /**
     *  Mode Of Operation - Electonic Codebook (ECB)
     */
    var ModeOfOperationECB = function(key) {
        if (!(this instanceof ModeOfOperationECB)) {
            throw Error('AES must be instanitated with `new`');
        }

        this.description = "Electronic Code Block";
        this.name = "ecb";

        this._aes = new AES(key);
    }

    ModeOfOperationECB.prototype.encrypt = function(plaintext) {
        plaintext = coerceArray(plaintext);

        if ((plaintext.length % 16) !== 0) {
            throw new Error('invalid plaintext size (must be multiple of 16 bytes)');
        }

        var ciphertext = createArray(plaintext.length);
        var block = createArray(16);

        for (var i = 0; i < plaintext.length; i += 16) {
            copyArray(plaintext, block, 0, i, i + 16);
            block = this._aes.encrypt(block);
            copyArray(block, ciphertext, i);
        }

        return ciphertext;
    }

    ModeOfOperationECB.prototype.decrypt = function(ciphertext) {
        ciphertext = coerceArray(ciphertext);

        if ((ciphertext.length % 16) !== 0) {
            throw new Error('invalid ciphertext size (must be multiple of 16 bytes)');
        }

        var plaintext = createArray(ciphertext.length);
        var block = createArray(16);

        for (var i = 0; i < ciphertext.length; i += 16) {
            copyArray(ciphertext, block, 0, i, i + 16);
            block = this._aes.decrypt(block);
            copyArray(block, plaintext, i);
        }

        return plaintext;
    }


    /**
     *  Mode Of Operation - Cipher Block Chaining (CBC)
     */
    var ModeOfOperationCBC = function(key, iv) {
        if (!(this instanceof ModeOfOperationCBC)) {
            throw Error('AES must be instanitated with `new`');
        }

        this.description = "Cipher Block Chaining";
        this.name = "cbc";

        if (!iv) {
            iv = createArray(16);

        } else if (iv.length != 16) {
            throw new Error('invalid initialation vector size (must be 16 bytes)');
        }

        this._lastCipherblock = coerceArray(iv, true);

        this._aes = new AES(key);
    }

    ModeOfOperationCBC.prototype.encrypt = function(plaintext) {
        plaintext = coerceArray(plaintext);

        if ((plaintext.length % 16) !== 0) {
            throw new Error('invalid plaintext size (must be multiple of 16 bytes)');
        }

        var ciphertext = createArray(plaintext.length);
        var block = createArray(16);

        for (var i = 0; i < plaintext.length; i += 16) {
            copyArray(plaintext, block, 0, i, i + 16);

            for (var j = 0; j < 16; j++) {
                block[j] ^= this._lastCipherblock[j];
            }

            this._lastCipherblock = this._aes.encrypt(block);
            copyArray(this._lastCipherblock, ciphertext, i);
        }

        return ciphertext;
    }

    ModeOfOperationCBC.prototype.decrypt = function(ciphertext) {
        ciphertext = coerceArray(ciphertext);

        if ((ciphertext.length % 16) !== 0) {
            throw new Error('invalid ciphertext size (must be multiple of 16 bytes)');
        }

        var plaintext = createArray(ciphertext.length);
        var block = createArray(16);

        for (var i = 0; i < ciphertext.length; i += 16) {
            copyArray(ciphertext, block, 0, i, i + 16);
            block = this._aes.decrypt(block);

            for (var j = 0; j < 16; j++) {
                plaintext[i + j] = block[j] ^ this._lastCipherblock[j];
            }

            copyArray(ciphertext, this._lastCipherblock, 0, i, i + 16);
        }

        return plaintext;
    }


    /**
     *  Mode Of Operation - Cipher Feedback (CFB)
     */
    var ModeOfOperationCFB = function(key, iv, segmentSize) {
        if (!(this instanceof ModeOfOperationCFB)) {
            throw Error('AES must be instanitated with `new`');
        }

        this.description = "Cipher Feedback";
        this.name = "cfb";

        if (!iv) {
            iv = createArray(16);

        } else if (iv.length != 16) {
            throw new Error('invalid initialation vector size (must be 16 size)');
        }

        if (!segmentSize) { segmentSize = 1; }

        this.segmentSize = segmentSize;

        this._shiftRegister = coerceArray(iv, true);

        this._aes = new AES(key);
    }

    ModeOfOperationCFB.prototype.encrypt = function(plaintext) {
        if ((plaintext.length % this.segmentSize) != 0) {
            throw new Error('invalid plaintext size (must be segmentSize bytes)');
        }

        var encrypted = coerceArray(plaintext, true);

        var xorSegment;
        for (var i = 0; i < encrypted.length; i += this.segmentSize) {
            xorSegment = this._aes.encrypt(this._shiftRegister);
            for (var j = 0; j < this.segmentSize; j++) {
                encrypted[i + j] ^= xorSegment[j];
            }

            // Shift the register
            copyArray(this._shiftRegister, this._shiftRegister, 0, this.segmentSize);
            copyArray(encrypted, this._shiftRegister, 16 - this.segmentSize, i, i + this.segmentSize);
        }

        return encrypted;
    }

    ModeOfOperationCFB.prototype.decrypt = function(ciphertext) {
        if ((ciphertext.length % this.segmentSize) != 0) {
            throw new Error('invalid ciphertext size (must be segmentSize bytes)');
        }

        var plaintext = coerceArray(ciphertext, true);

        var xorSegment;
        for (var i = 0; i < plaintext.length; i += this.segmentSize) {
            xorSegment = this._aes.encrypt(this._shiftRegister);

            for (var j = 0; j < this.segmentSize; j++) {
                plaintext[i + j] ^= xorSegment[j];
            }

            // Shift the register
            copyArray(this._shiftRegister, this._shiftRegister, 0, this.segmentSize);
            copyArray(ciphertext, this._shiftRegister, 16 - this.segmentSize, i, i + this.segmentSize);
        }

        return plaintext;
    }

    /**
     *  Mode Of Operation - Output Feedback (OFB)
     */
    var ModeOfOperationOFB = function(key, iv) {
        if (!(this instanceof ModeOfOperationOFB)) {
            throw Error('AES must be instanitated with `new`');
        }

        this.description = "Output Feedback";
        this.name = "ofb";

        if (!iv) {
            iv = createArray(16);

        } else if (iv.length != 16) {
            throw new Error('invalid initialation vector size (must be 16 bytes)');
        }

        this._lastPrecipher = coerceArray(iv, true);
        this._lastPrecipherIndex = 16;

        this._aes = new AES(key);
    }

    ModeOfOperationOFB.prototype.encrypt = function(plaintext) {
        var encrypted = coerceArray(plaintext, true);

        for (var i = 0; i < encrypted.length; i++) {
            if (this._lastPrecipherIndex === 16) {
                this._lastPrecipher = this._aes.encrypt(this._lastPrecipher);
                this._lastPrecipherIndex = 0;
            }
            encrypted[i] ^= this._lastPrecipher[this._lastPrecipherIndex++];
        }

        return encrypted;
    }

    // Decryption is symetric
    ModeOfOperationOFB.prototype.decrypt = ModeOfOperationOFB.prototype.encrypt;


    /**
     *  Counter object for CTR common mode of operation
     */
    var Counter = function(initialValue) {
        if (!(this instanceof Counter)) {
            throw Error('Counter must be instanitated with `new`');
        }

        // We allow 0, but anything false-ish uses the default 1
        if (initialValue !== 0 && !initialValue) { initialValue = 1; }

        if (typeof(initialValue) === 'number') {
            this._counter = createArray(16);
            this.setValue(initialValue);

        } else {
            this.setBytes(initialValue);
        }
    }

    Counter.prototype.setValue = function(value) {
        if (typeof(value) !== 'number' || parseInt(value) != value) {
            throw new Error('invalid counter value (must be an integer)');
        }

        // We cannot safely handle numbers beyond the safe range for integers
        if (value > Number.MAX_SAFE_INTEGER) {
            throw new Error('integer value out of safe range');
        }

        for (var index = 15; index >= 0; --index) {
            this._counter[index] = value % 256;
            value = parseInt(value / 256);
        }
    }

    Counter.prototype.setBytes = function(bytes) {
        bytes = coerceArray(bytes, true);

        if (bytes.length != 16) {
            throw new Error('invalid counter bytes size (must be 16 bytes)');
        }

        this._counter = bytes;
    };

    Counter.prototype.increment = function() {
        for (var i = 15; i >= 0; i--) {
            if (this._counter[i] === 255) {
                this._counter[i] = 0;
            } else {
                this._counter[i]++;
                break;
            }
        }
    }


    /**
     *  Mode Of Operation - Counter (CTR)
     */
    var ModeOfOperationCTR = function(key, counter) {
        if (!(this instanceof ModeOfOperationCTR)) {
            throw Error('AES must be instanitated with `new`');
        }

        this.description = "Counter";
        this.name = "ctr";

        if (!(counter instanceof Counter)) {
            counter = new Counter(counter)
        }

        this._counter = counter;

        this._remainingCounter = null;
        this._remainingCounterIndex = 16;

        this._aes = new AES(key);
    }

    ModeOfOperationCTR.prototype.encrypt = function(plaintext) {
        var encrypted = coerceArray(plaintext, true);

        for (var i = 0; i < encrypted.length; i++) {
            if (this._remainingCounterIndex === 16) {
                this._remainingCounter = this._aes.encrypt(this._counter._counter);
                this._remainingCounterIndex = 0;
                this._counter.increment();
            }
            encrypted[i] ^= this._remainingCounter[this._remainingCounterIndex++];
        }

        return encrypted;
    }

    // Decryption is symetric
    ModeOfOperationCTR.prototype.decrypt = ModeOfOperationCTR.prototype.encrypt;


    ///////////////////////
    // Padding

    // See:https://tools.ietf.org/html/rfc2315
    function pkcs7pad(data) {
        data = coerceArray(data, true);
        var padder = 16 - (data.length % 16);
        var result = createArray(data.length + padder);
        copyArray(data, result);
        for (var i = data.length; i < result.length; i++) {
            result[i] = padder;
        }
        return result;
    }

    function pkcs7strip(data) {
        data = coerceArray(data, true);
        if (data.length < 16) { throw new Error('PKCS#7 invalid length'); }

        var padder = data[data.length - 1];
        if (padder > 16) { throw new Error('PKCS#7 padding byte out of range'); }

        var length = data.length - padder;
        for (var i = 0; i < padder; i++) {
            if (data[length + i] !== padder) {
                throw new Error('PKCS#7 invalid padding byte');
            }
        }

        var result = createArray(length);
        copyArray(data, result, 0, 0, length);
        return result;
    }

    ///////////////////////
    // Exporting


    // The block cipher
    var aesjs = {
        AES: AES,
        Counter: Counter,

        ModeOfOperation: {
            ecb: ModeOfOperationECB,
            cbc: ModeOfOperationCBC,
            cfb: ModeOfOperationCFB,
            ofb: ModeOfOperationOFB,
            ctr: ModeOfOperationCTR
        },

        utils: {
            hex: convertHex,
            utf8: convertUtf8
        },

        padding: {
            pkcs7: {
                pad: pkcs7pad,
                strip: pkcs7strip
            }
        },

        _arrayTest: {
            coerceArray: coerceArray,
            createArray: createArray,
            copyArray: copyArray,
        }
    };


    // node.js
    if (true) {
        module.exports = aesjs

    // RequireJS/AMD
    // http://www.requirejs.org/docs/api.html
    // https://github.com/amdjs/amdjs-api/wiki/AMD
    } else if (typeof(define) === 'function' && define.amd) {
        define(aesjs);

    // Web Browsers
    } else {

        // If there was an existing library at "aesjs" make sure it's still available
        if (root.aesjs) {
            aesjs._aesjs = root.aesjs;
        }

        root.aesjs = aesjs;
    }


})(this);


/***/ }),

/***/ 1673:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__(1485);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__combineReducers__ = __webpack_require__(1674);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bindActionCreators__ = __webpack_require__(1675);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__applyMiddleware__ = __webpack_require__(1676);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__compose__ = __webpack_require__(1487);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_warning__ = __webpack_require__(1486);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__createStore__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__combineReducers__["a"]; });
/* unused harmony reexport bindActionCreators */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_3__applyMiddleware__["a"]; });
/* unused harmony reexport compose */







/*
* This is a dummy function to check if the function name has been altered by minification.
* If the function has been minified and NODE_ENV !== 'production', warn the user.
*/
function isCrushed() {}

if (false) {
  warning('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
}



/***/ }),

/***/ 1674:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = combineReducers;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__(1485);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_es_isPlainObject__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_warning__ = __webpack_require__(1486);




function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state. ' + 'If you want this reducer to hold no value, you can return null instead of undefined.';
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === __WEBPACK_IMPORTED_MODULE_0__createStore__["a" /* ActionTypes */].INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!Object(__WEBPACK_IMPORTED_MODULE_1_lodash_es_isPlainObject__["a" /* default */])(inputState)) {
    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });

  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });

  if (unexpectedKeys.length > 0) {
    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, { type: __WEBPACK_IMPORTED_MODULE_0__createStore__["a" /* ActionTypes */].INIT });

    if (typeof initialState === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined. If you don\'t want to set a value for this reducer, ' + 'you can use null instead of undefined.');
    }

    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
    if (typeof reducer(undefined, { type: type }) === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + __WEBPACK_IMPORTED_MODULE_0__createStore__["a" /* ActionTypes */].INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined, but can be null.');
    }
  });
}

/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (false) {
      if (typeof reducers[key] === 'undefined') {
        warning('No reducer provided for key "' + key + '"');
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers);

  var unexpectedKeyCache = void 0;
  if (false) {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError = void 0;
  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (false) {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
      if (warningMessage) {
        warning(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};
    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }
      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}

/***/ }),

/***/ 1675:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(undefined, arguments));
  };
}

/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}

/***/ }),

/***/ 1676:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = applyMiddleware;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__compose__ = __webpack_require__(1487);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
function applyMiddleware() {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function (reducer, preloadedState, enhancer) {
      var store = createStore(reducer, preloadedState, enhancer);
      var _dispatch = store.dispatch;
      var chain = [];

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch(action) {
          return _dispatch(action);
        }
      };
      chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = __WEBPACK_IMPORTED_MODULE_0__compose__["a" /* default */].apply(undefined, chain)(store.dispatch);

      return _extends({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

/***/ }),

/***/ 1677:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return locateFile; });
/* unused harmony export locateFolder */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return mapAllFiles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return mapFiles; });
/* unused harmony export mapFolders */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return makeLocalStorageFolder; });
/* unused harmony export makeLoggedFolder */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return makeMemoryFolder; });
/* unused harmony export makeNodeFolder */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return makeUnionFolder$$1; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rfc4648__ = __webpack_require__(1484);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_fs__ = __webpack_require__(1678);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_fs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_path__ = __webpack_require__(1679);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_path__);




/**
 * Interprets a path as a series of folder lookups,
 * handling special components like `.` and `..`.
 */
function followPath (folder, parts) {
  var i = 0; // Read index
  var j = 0; // Write index

  // Shift down good elements, dropping bad ones:
  while (i < parts.length) {
    var part = parts[i++];
    if (part === '..') { j--; }
    else if (part !== '.' && part !== '') { parts[j++] = part; }

    if (j < 0) { throw new Error('Path would escape folder') }
  }

  // Navigate the folder:
  for (i = 0; i < j; ++i) {
    folder = folder.folder(parts[i]);
  }
  return folder
}

/**
 * Navigates down to the file indicated by the path.
 */
function locateFile (folder, path) {
  var parts = path.split('/');
  var filename = parts.pop();
  return followPath(folder, parts).file(filename)
}

/**
 * Navigates down to the sub-folder indicated by the path.
 */
function locateFolder (folder, path) {
  var parts = path.split('/');
  return followPath(folder, parts)
}

/**
 * Applies an async function to all the files in a folder.
 */
function mapFiles (folder, f) {
  return folder
    .listFiles()
    .then(function (names) { return Promise.all(names.map(function (name) { return f(folder.file(name), name, folder); })); }
    )
}

/**
 * Applies an async function to all the sub-folders in a folder.
 */
function mapFolders (folder, f) {
  return folder
    .listFolders()
    .then(function (names) { return Promise.all(names.map(function (name) { return f(folder.folder(name), name, folder); })); }
    )
}

/**
 * Recursively applies an async function to all the files in a folder tree.
 * The file names are expanded into paths, and the result is a flat array.
 */
function mapAllFiles (folder, f) {
  function recurse (folder, f, prefix) {
    return Promise.all([
      mapFiles(folder, function (file, name) { return f(file, prefix + name, folder); }),
      mapFolders(folder, function (folder, name) { return recurse(folder, f, prefix + name + '/'); }
      )
    ]).then(function (ref) {
      var files = ref[0];
      var folders = ref[1];

      return files.concat.apply(files, folders);
    })
  }

  return recurse(folder, f, '')
}

/**
 * Verifies that a name contains no slashes.
 */
function checkName (name) {
  if (typeof name !== 'string' || !name.length || /[/]/.test(name)) {
    throw new Error(("Invalid file name \"" + name + "\""))
  }
}

var Data = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;

/**
 * Lists the keys in a localStorage object.
 */
function storageKeys (storage) {
  var keys = [];
  for (var i = 0; i < storage.length; ++i) {
    keys.push(storage.key(i));
  }
  return keys
}

/**
 * A single file stored in localStorage.
 */
var LocalStorageFile = function LocalStorageFile (storage, path) {
  this._storage = storage;
  this._path = path;
};

LocalStorageFile.prototype.delete = function delete$1 () {
  this._storage.removeItem(this._path);
  return Promise.resolve()
};

LocalStorageFile.prototype.getData = function getData () {
  return this.getText().then(function (text) { return __WEBPACK_IMPORTED_MODULE_0_rfc4648__["b" /* base64 */].parse(text, { out: Data }); })
};

LocalStorageFile.prototype.getText = function getText () {
  var item = this._storage.getItem(this._path);
  return item != null
    ? Promise.resolve(item)
    : Promise.reject(new Error(("Cannot load \"" + (this._path) + "\"")))
};

LocalStorageFile.prototype.setText = function setText (text) {
  if (typeof text !== 'string') {
    return Promise.reject(new TypeError('Expected a string'))
  }

  this._storage.setItem(this._path, text);
  return Promise.resolve()
};

LocalStorageFile.prototype.setData = function setData (data) {
  return this.setText(__WEBPACK_IMPORTED_MODULE_0_rfc4648__["b" /* base64 */].stringify(data))
};

/**
 * Emulates a filesystem inside a localStorage instance.
 */
var LocalStorageFolder = function LocalStorageFolder (storage, path) {
  this._storage = storage;
  this._path = path + '/';
};

LocalStorageFolder.prototype.delete = function delete$2 () {
    var this$1 = this;

  var test = new RegExp(("^" + (this._path)));
  storageKeys(this._storage).forEach(function (key) {
    if (test.test(key)) {
      this$1._storage.removeItem(key);
    }
  });
  return Promise.resolve()
};

LocalStorageFolder.prototype.file = function file (name) {
  checkName(name);
  return new LocalStorageFile(this._storage, this._path + name)
};

LocalStorageFolder.prototype.folder = function folder (name) {
  checkName(name);
  return new LocalStorageFolder(this._storage, this._path + name)
};

LocalStorageFolder.prototype.listFiles = function listFiles () {
  var test = new RegExp(("^" + (this._path) + "([^/]+)$"));

  var names = [];
  storageKeys(this._storage).forEach(function (key) {
    var results = test.exec(key);
    if (results != null) { names.push(results[1]); }
  });

  return Promise.resolve(names)
};

LocalStorageFolder.prototype.listFolders = function listFolders () {
  var test = new RegExp(("^" + (this._path) + "([^/]+)/.+"));

  var names = {};
  storageKeys(this._storage).forEach(function (key) {
    var results = test.exec(key);
    if (results != null) { names[results[1]] = true; }
  });

  return Promise.resolve(Object.keys(names))
};

function makeLocalStorageFolder (
  storage,
  opts
) {
  if ( storage === void 0 ) storage = window.localStorage;
  if ( opts === void 0 ) opts = {};

  return new LocalStorageFolder(storage, opts.prefix || '')
}

function logConsole (path, operation) {
  console.log((operation + " \"" + path + "\""));
}

function log (path, operation, opts) {
  var f = opts.callback != null ? opts.callback : logConsole;

  if (opts.verbose || /set|delete/.test(operation)) {
    f(path, operation);
  }
}

var LoggedFile = function LoggedFile (file, path, opts) {
  this._file = file;
  this._path = path;
  this._opts = opts;
};

LoggedFile.prototype.delete = function delete$1 () {
  log(this._path, 'delete file', this._opts);
  return this._file.delete()
};

LoggedFile.prototype.getData = function getData () {
  log(this._path, 'get data', this._opts);
  return this._file.getData()
};

LoggedFile.prototype.getText = function getText () {
  log(this._path, 'get text', this._opts);
  return this._file.getText()
};

LoggedFile.prototype.setData = function setData (data) {
  log(this._path, 'set data', this._opts);
  return this._file.setData(data)
};

LoggedFile.prototype.setText = function setText (text) {
  log(this._path, 'set text', this._opts);
  return this._file.setText(text)
};

var LoggedFolder = function LoggedFolder (folder, path, opts) {
  this._folder = folder;
  this._path = path;
  this._opts = opts;
};

LoggedFolder.prototype.delete = function delete$2 () {
  log(this._path, 'delete folder', this._opts);
  return this._folder.delete()
};

LoggedFolder.prototype.file = function file (name) {
  return new LoggedFile(
    this._folder.file(name),
    this._path + name,
    this._opts
  )
};

LoggedFolder.prototype.folder = function folder (name) {
  return new LoggedFolder(
    this._folder.folder(name),
    this._path + name + '/',
    this._opts
  )
};

LoggedFolder.prototype.listFiles = function listFiles () {
  log(this._path, 'list files', this._opts);
  return this._folder.listFiles()
};

LoggedFolder.prototype.listFolders = function listFolders () {
  log(this._path, 'list folders', this._opts);
  return this._folder.listFolders()
};

function makeLoggedFolder (folder, opts) {
  if ( opts === void 0 ) opts = {};

  return new LoggedFolder(folder, '', opts)
}

/**
 * A single file stored in memory.
 */
var MemoryFile = function MemoryFile (storage, path) {
  this._storage = storage;
  this._path = path;
};

MemoryFile.prototype.delete = function delete$1 () {
  delete this._storage[this._path];
  return Promise.resolve()
};

MemoryFile.prototype.getData = function getData () {
  var item = this._storage[this._path];
  return item != null
    ? Promise.resolve(item)
    : Promise.reject(new Error(("Cannot load \"" + (this._path) + "\"")))
};

MemoryFile.prototype.getText = function getText () {
  var item = this._storage[this._path];
  return item != null
    ? Promise.resolve(item)
    : Promise.reject(new Error(("Cannot load \"" + (this._path) + "\"")))
};

MemoryFile.prototype.setData = function setData (data) {
  this._storage[this._path] = data;
  return Promise.resolve()
};

MemoryFile.prototype.setText = function setText (text) {
  if (typeof text !== 'string') {
    return Promise.reject(new TypeError('Expected a string'))
  }

  this._storage[this._path] = text;
  return Promise.resolve()
};

/**
 * Emulates a filesystem in memory.
 */
var MemoryFolder = function MemoryFolder (storage, path) {
  this._storage = storage;
  this._path = path + '/';
};

MemoryFolder.prototype.delete = function delete$2 () {
    var this$1 = this;

  var test = new RegExp(("^" + (this._path)));
  Object.keys(this._storage).forEach(function (key) {
    if (test.test(key)) {
      delete this$1._storage[key];
    }
  });
  return Promise.resolve()
};

MemoryFolder.prototype.file = function file (name) {
  checkName(name);
  return new MemoryFile(this._storage, this._path + name)
};

MemoryFolder.prototype.folder = function folder (name) {
  checkName(name);
  return new MemoryFolder(this._storage, this._path + name)
};

MemoryFolder.prototype.listFiles = function listFiles () {
  var test = new RegExp(("^" + (this._path) + "([^/]+)$"));

  var names = [];
  Object.keys(this._storage).forEach(function (key) {
    var results = test.exec(key);
    if (results != null) { names.push(results[1]); }
  });

  return Promise.resolve(names)
};

MemoryFolder.prototype.listFolders = function listFolders () {
  var test = new RegExp(("^" + (this._path) + "([^/]+)/.+"));

  var names = {};
  Object.keys(this._storage).forEach(function (key) {
    var results = test.exec(key);
    if (results != null) { names[results[1]] = true; }
  });

  return Promise.resolve(Object.keys(names))
};

function makeMemoryFolder (storage) {
  if ( storage === void 0 ) storage = {};

  return new MemoryFolder(storage, '')
}

// Promise versions of node.js file operations: -----------------------------

function mkdir (path) {
  return new Promise(function (resolve, reject) { return __WEBPACK_IMPORTED_MODULE_1_fs___default.a.mkdir(
      path,
      function (err) { return (err && err.code !== 'EEXIST' ? reject(err) : resolve()); }
    ); }
  )
}

function rmdir (path) {
  return new Promise(function (resolve, reject) { return __WEBPACK_IMPORTED_MODULE_1_fs___default.a.rmdir(path, function (err, out) { return (err ? reject(err) : resolve(out)); }); }
  )
}

function readdir (path) {
  return new Promise(function (resolve, reject) { return __WEBPACK_IMPORTED_MODULE_1_fs___default.a.readdir(path, function (err, out) { return (err ? reject(err) : resolve(out)); }); }
  )
}

function readFile (path, opts) {
  return new Promise(function (resolve, reject) { return __WEBPACK_IMPORTED_MODULE_1_fs___default.a.readFile(path, opts, function (err, out) { return (err ? reject(err) : resolve(out)); }); }
  )
}

function stat (path) {
  return new Promise(function (resolve, reject) { return __WEBPACK_IMPORTED_MODULE_1_fs___default.a.stat(path, function (err, out) { return (err ? reject(err) : resolve(out)); }); }
  )
}

function unlink (path) {
  return new Promise(function (resolve, reject) { return __WEBPACK_IMPORTED_MODULE_1_fs___default.a.unlink(path, function (err, out) { return (err ? reject(err) : resolve(out)); }); }
  )
}

function writeFile (path, data, opts) {
  return new Promise(function (resolve, reject) { return __WEBPACK_IMPORTED_MODULE_1_fs___default.a.writeFile(
      path,
      data,
      opts,
      function (err, out) { return (err ? reject(err) : resolve(out)); }
    ); }
  )
}

// Helpers: -----------------------------------------------------------------

/**
 * If node.js returns a missing-file error (`ENOENT`),
 * translate that into the fallback value and proceed.
 */
function ignoreMissing (fallback) {
  return function (err) {
    if (err.code !== 'ENOENT') { throw err }
    return fallback
  }
}

/**
 * Reads a directory, returning a list of names and a list of stat objects.
 * Returns empty lists if the directory doesn't exist.
 */
function readdirStat (path) {
  return readdir(path)
    .catch(ignoreMissing([]))
    .then(function (names) { return Promise.all(
        names.map(function (name) { return stat(__WEBPACK_IMPORTED_MODULE_2_path___default.a.join(path, name)); })
      ).then(function (stats) { return ({ names: names, stats: stats }); }); }
    )
}

/**
 * Recursively creates a directory.
 */
function mkdirDeep (path) {
  return mkdir(path).catch(function (err) {
    if (err.code !== 'ENOENT') { throw err }
    return mkdirDeep(__WEBPACK_IMPORTED_MODULE_2_path___default.a.dirname(path)).then(function () { return mkdir(path); })
  })
}

/**
 * Writes a file, creating its directory if needed.
 */
function writeFileDeep (path, data, opts) {
  return writeFile(path, data, opts).catch(function (err) {
    if (err.code !== 'ENOENT') { throw err }
    return mkdirDeep(__WEBPACK_IMPORTED_MODULE_2_path___default.a.dirname(path)).then(function () { return writeFile(path, data, opts); }
    )
  })
}

var NodeFile = function NodeFile (path) {
  this._path = path;
};

NodeFile.prototype.delete = function delete$1 () {
  return unlink(this._path).catch(ignoreMissing())
};

NodeFile.prototype.getData = function getData () {
  return readFile(this._path, null)
};

NodeFile.prototype.getText = function getText () {
  return readFile(this._path, 'utf8')
};

NodeFile.prototype.setData = function setData (data) {
  return writeFileDeep(this._path, Uint8Array.from(data), null)
};

NodeFile.prototype.setText = function setText (text) {
  return writeFileDeep(this._path, text, 'utf8')
};

var NodeFolder = function NodeFolder (path) {
  this._path = path;
};

NodeFolder.prototype.delete = function delete$2 () {
    var this$1 = this;

  return readdirStat(this._path)
    .then(function (lists) {
      var names = lists.names;
        var stats = lists.stats;
      var files = names.filter(function (name, i) { return stats[i].isFile(); });
      var folders = names.filter(function (name, i) { return stats[i].isDirectory(); });

      // Recursively delete children:
      return Promise.all(files.map(function (name) { return this$1.file(name).delete(); }).concat( folders.map(function (name) { return this$1.folder(name).delete(); })
      ))
    })
    .then(function () { return rmdir(this$1._path); })
    .catch(ignoreMissing())
};

NodeFolder.prototype.file = function file (name) {
  checkName(name);
  return new NodeFile(__WEBPACK_IMPORTED_MODULE_2_path___default.a.join(this._path, name))
};

NodeFolder.prototype.folder = function folder (name) {
  checkName(name);
  return new NodeFolder(__WEBPACK_IMPORTED_MODULE_2_path___default.a.join(this._path, name))
};

NodeFolder.prototype.listFiles = function listFiles () {
  return readdirStat(this._path).then(function (lists) {
    var names = lists.names;
      var stats = lists.stats;
    return names.filter(function (name, i) { return stats[i].isFile(); })
  })
};

NodeFolder.prototype.listFolders = function listFolders () {
  return readdirStat(this._path).then(function (lists) {
    var names = lists.names;
      var stats = lists.stats;
    return names.filter(function (name, i) { return stats[i].isDirectory(); })
  })
};

function makeNodeFolder (path) {
  return new NodeFolder(__WEBPACK_IMPORTED_MODULE_2_path___default.a.resolve(path))
}

function removeDuplicates (master, fallback) {
  var blacklist = {};
  var out = [];
  master.forEach(function (item) {
    if (/\._x_$/.test(item)) {
      blacklist[item] = true;
    } else {
      blacklist[item + '._x_'] = true;
      out.push(item);
    }
  });

  fallback.forEach(function (item) {
    if (!blacklist[item + '._x_']) { out.push(item); }
  });

  return out
}

/**
 * A file within a unionFolder.
 */
var UnionFile = function UnionFile (master, fallback, whiteout) {
  this._master = master;
  this._fallback = fallback;
  this._whiteout = whiteout;
};

UnionFile.prototype.delete = function delete$1 () {
  return Promise.all([
    this._whiteout.setData([]),
    this._master.delete().catch(function (e) { return null; })
  ])
};

UnionFile.prototype.getData = function getData () {
    var this$1 = this;

  return this._master.getData().catch(function (e) { return this$1._whiteout.getData().then(
      function (data) {
        throw new Error('File has been deleted')
      },
      function (e) { return this$1._fallback.getData(); }
    ); }
  )
};

UnionFile.prototype.getText = function getText () {
    var this$1 = this;

  return this._master.getText().catch(function (e) { return this$1._whiteout.getData().then(
      function (data) {
        throw new Error('File has been deleted')
      },
      function (e) { return this$1._fallback.getText(); }
    ); }
  )
};

UnionFile.prototype.setData = function setData (data) {
  return this._master.setData(data)
};

UnionFile.prototype.setText = function setText (text) {
  return this._master.setText(text)
};

/**
 * Reads and writes go to a master folder, but if a read fails,
 * we will also try the fallback folder.
 */
var UnionFolder = function UnionFolder (master, fallback) {
  this._master = master;
  this._fallback = fallback;
};

UnionFolder.prototype.delete = function delete$2 () {
  return Promise.all([
    mapFiles(this, function (file) { return file.delete(); }),
    mapFolders(this, function (folder) { return folder.delete(); })
  ]).then(function () {})
};

UnionFolder.prototype.file = function file (name) {
  return new UnionFile(
    this._master.file(name),
    this._fallback.file(name),
    this._master.file(name + '._x_')
  )
};

UnionFolder.prototype.folder = function folder (name) {
  return new UnionFolder(
    this._master.folder(name),
    this._fallback.folder(name)
  )
};

UnionFolder.prototype.listFiles = function listFiles () {
  return Promise.all([
    this._master.listFiles(),
    this._fallback.listFiles()
  ]).then(function (values) { return removeDuplicates(values[0], values[1]); })
};

UnionFolder.prototype.listFolders = function listFolders () {
  return Promise.all([
    this._master.listFolders(),
    this._fallback.listFolders()
  ]).then(function (values) { return removeDuplicates(values[0], values[1]); })
};

function makeUnionFolder$$1 (master, fallback) {
  return new UnionFolder(master, fallback)
}


//# sourceMappingURL=disklet.js.map


/***/ }),

/***/ 1678:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 1679:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 1680:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setImmediate) {

(function(root) {
    var MAX_VALUE = 0x7fffffff;

    // The SHA256 and PBKDF2 implementation are from scrypt-async-js:
    // See: https://github.com/dchest/scrypt-async-js
    function SHA256(m) {
        var K = [
           0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b,
           0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01,
           0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7,
           0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
           0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152,
           0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147,
           0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc,
           0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
           0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819,
           0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08,
           0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f,
           0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
           0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
       ];

        var h0 = 0x6a09e667, h1 = 0xbb67ae85, h2 = 0x3c6ef372, h3 = 0xa54ff53a;
        var h4 = 0x510e527f, h5 = 0x9b05688c, h6 = 0x1f83d9ab, h7 = 0x5be0cd19;
        var w = new Array(64);

        function blocks(p) {
            var off = 0, len = p.length;
            while (len >= 64) {
                var a = h0, b = h1, c = h2, d = h3, e = h4, f = h5, g = h6, h = h7, u, i, j, t1, t2;

                for (i = 0; i < 16; i++) {
                    j = off + i*4;
                    w[i] = ((p[j] & 0xff)<<24) | ((p[j+1] & 0xff)<<16) |
                    ((p[j+2] & 0xff)<<8) | (p[j+3] & 0xff);
                }

                for (i = 16; i < 64; i++) {
                    u = w[i-2];
                    t1 = ((u>>>17) | (u<<(32-17))) ^ ((u>>>19) | (u<<(32-19))) ^ (u>>>10);

                    u = w[i-15];
                    t2 = ((u>>>7) | (u<<(32-7))) ^ ((u>>>18) | (u<<(32-18))) ^ (u>>>3);

                    w[i] = (((t1 + w[i-7]) | 0) + ((t2 + w[i-16]) | 0)) | 0;
                }

                for (i = 0; i < 64; i++) {
                    t1 = ((((((e>>>6) | (e<<(32-6))) ^ ((e>>>11) | (e<<(32-11))) ^
                             ((e>>>25) | (e<<(32-25)))) + ((e & f) ^ (~e & g))) | 0) +
                          ((h + ((K[i] + w[i]) | 0)) | 0)) | 0;

                    t2 = ((((a>>>2) | (a<<(32-2))) ^ ((a>>>13) | (a<<(32-13))) ^
                           ((a>>>22) | (a<<(32-22)))) + ((a & b) ^ (a & c) ^ (b & c))) | 0;

                    h = g;
                    g = f;
                    f = e;
                    e = (d + t1) | 0;
                    d = c;
                    c = b;
                    b = a;
                    a = (t1 + t2) | 0;
                }

                h0 = (h0 + a) | 0;
                h1 = (h1 + b) | 0;
                h2 = (h2 + c) | 0;
                h3 = (h3 + d) | 0;
                h4 = (h4 + e) | 0;
                h5 = (h5 + f) | 0;
                h6 = (h6 + g) | 0;
                h7 = (h7 + h) | 0;

                off += 64;
                len -= 64;
            }
        }

        blocks(m);

        var i, bytesLeft = m.length % 64,
        bitLenHi = (m.length / 0x20000000) | 0,
        bitLenLo = m.length << 3,
        numZeros = (bytesLeft < 56) ? 56 : 120,
        p = m.slice(m.length - bytesLeft, m.length);

        p.push(0x80);
        for (i = bytesLeft + 1; i < numZeros; i++) { p.push(0); }
        p.push((bitLenHi>>>24) & 0xff);
        p.push((bitLenHi>>>16) & 0xff);
        p.push((bitLenHi>>>8)  & 0xff);
        p.push((bitLenHi>>>0)  & 0xff);
        p.push((bitLenLo>>>24) & 0xff);
        p.push((bitLenLo>>>16) & 0xff);
        p.push((bitLenLo>>>8)  & 0xff);
        p.push((bitLenLo>>>0)  & 0xff);

        blocks(p);

        return [
            (h0>>>24) & 0xff, (h0>>>16) & 0xff, (h0>>>8) & 0xff, (h0>>>0) & 0xff,
            (h1>>>24) & 0xff, (h1>>>16) & 0xff, (h1>>>8) & 0xff, (h1>>>0) & 0xff,
            (h2>>>24) & 0xff, (h2>>>16) & 0xff, (h2>>>8) & 0xff, (h2>>>0) & 0xff,
            (h3>>>24) & 0xff, (h3>>>16) & 0xff, (h3>>>8) & 0xff, (h3>>>0) & 0xff,
            (h4>>>24) & 0xff, (h4>>>16) & 0xff, (h4>>>8) & 0xff, (h4>>>0) & 0xff,
            (h5>>>24) & 0xff, (h5>>>16) & 0xff, (h5>>>8) & 0xff, (h5>>>0) & 0xff,
            (h6>>>24) & 0xff, (h6>>>16) & 0xff, (h6>>>8) & 0xff, (h6>>>0) & 0xff,
            (h7>>>24) & 0xff, (h7>>>16) & 0xff, (h7>>>8) & 0xff, (h7>>>0) & 0xff
        ];
    }

    function PBKDF2_HMAC_SHA256_OneIter(password, salt, dkLen) {
        // compress password if it's longer than hash block length
        password = password.length <= 64 ? password : SHA256(password);

        var i;
        var innerLen = 64 + salt.length + 4;
        var inner = new Array(innerLen);
        var outerKey = new Array(64);
        var dk = [];

        // inner = (password ^ ipad) || salt || counter
        for (i = 0; i < 64; i++) inner[i] = 0x36;
        for (i = 0; i < password.length; i++) inner[i] ^= password[i];
        for (i = 0; i < salt.length; i++) inner[64+i] = salt[i];
        for (i = innerLen - 4; i < innerLen; i++) inner[i] = 0;

        // outerKey = password ^ opad
        for (i = 0; i < 64; i++) outerKey[i] = 0x5c;
        for (i = 0; i < password.length; i++) outerKey[i] ^= password[i];

        // increments counter inside inner
        function incrementCounter() {
            for (var i = innerLen-1; i >= innerLen-4; i--) {
                inner[i]++;
                if (inner[i] <= 0xff) return;
                inner[i] = 0;
            }
        }

        // output blocks = SHA256(outerKey || SHA256(inner)) ...
        while (dkLen >= 32) {
            incrementCounter();
            dk = dk.concat(SHA256(outerKey.concat(SHA256(inner))));
            dkLen -= 32;
        }
        if (dkLen > 0) {
            incrementCounter();
            dk = dk.concat(SHA256(outerKey.concat(SHA256(inner))).slice(0, dkLen));
        }

        return dk;
    }

    // The following is an adaptation of scryptsy
    // See: https://www.npmjs.com/package/scryptsy
    function blockmix_salsa8(BY, Yi, r, x, _X) {
        var i;

        arraycopy(BY, (2 * r - 1) * 16, _X, 0, 16);
        for (i = 0; i < 2 * r; i++) {
            blockxor(BY, i * 16, _X, 16);
            salsa20_8(_X, x);
            arraycopy(_X, 0, BY, Yi + (i * 16), 16);
        }

        for (i = 0; i < r; i++) {
            arraycopy(BY, Yi + (i * 2) * 16, BY, (i * 16), 16);
        }

        for (i = 0; i < r; i++) {
            arraycopy(BY, Yi + (i * 2 + 1) * 16, BY, (i + r) * 16, 16);
        }
    }

    function R(a, b) {
        return (a << b) | (a >>> (32 - b));
    }

    function salsa20_8(B, x) {
        arraycopy(B, 0, x, 0, 16);

        for (var i = 8; i > 0; i -= 2) {
            x[ 4] ^= R(x[ 0] + x[12], 7);
            x[ 8] ^= R(x[ 4] + x[ 0], 9);
            x[12] ^= R(x[ 8] + x[ 4], 13);
            x[ 0] ^= R(x[12] + x[ 8], 18);
            x[ 9] ^= R(x[ 5] + x[ 1], 7);
            x[13] ^= R(x[ 9] + x[ 5], 9);
            x[ 1] ^= R(x[13] + x[ 9], 13);
            x[ 5] ^= R(x[ 1] + x[13], 18);
            x[14] ^= R(x[10] + x[ 6], 7);
            x[ 2] ^= R(x[14] + x[10], 9);
            x[ 6] ^= R(x[ 2] + x[14], 13);
            x[10] ^= R(x[ 6] + x[ 2], 18);
            x[ 3] ^= R(x[15] + x[11], 7);
            x[ 7] ^= R(x[ 3] + x[15], 9);
            x[11] ^= R(x[ 7] + x[ 3], 13);
            x[15] ^= R(x[11] + x[ 7], 18);
            x[ 1] ^= R(x[ 0] + x[ 3], 7);
            x[ 2] ^= R(x[ 1] + x[ 0], 9);
            x[ 3] ^= R(x[ 2] + x[ 1], 13);
            x[ 0] ^= R(x[ 3] + x[ 2], 18);
            x[ 6] ^= R(x[ 5] + x[ 4], 7);
            x[ 7] ^= R(x[ 6] + x[ 5], 9);
            x[ 4] ^= R(x[ 7] + x[ 6], 13);
            x[ 5] ^= R(x[ 4] + x[ 7], 18);
            x[11] ^= R(x[10] + x[ 9], 7);
            x[ 8] ^= R(x[11] + x[10], 9);
            x[ 9] ^= R(x[ 8] + x[11], 13);
            x[10] ^= R(x[ 9] + x[ 8], 18);
            x[12] ^= R(x[15] + x[14], 7);
            x[13] ^= R(x[12] + x[15], 9);
            x[14] ^= R(x[13] + x[12], 13);
            x[15] ^= R(x[14] + x[13], 18);
        }

        for (i = 0; i < 16; ++i) {
            B[i] += x[i];
        }
    }

    // naive approach... going back to loop unrolling may yield additional performance
    function blockxor(S, Si, D, len) {
        for (var i = 0; i < len; i++) {
            D[i] ^= S[Si + i]
        }
    }

    function arraycopy(src, srcPos, dest, destPos, length) {
        while (length--) {
            dest[destPos++] = src[srcPos++];
        }
    }

    function checkBufferish(o) {
        if (!o || typeof(o.length) !== 'number') {
            return false;
        }
        for (var i = 0; i < o.length; i++) {
            if (typeof(o[i]) !== 'number') { return false; }

            var v = parseInt(o[i]);
            if (v != o[i] || v < 0 || v >= 256) {
                return false;
            }
        }
        return true;
    }

    function ensureInteger(value, name) {
        var intValue = parseInt(value);
        if (value != intValue) { throw new Error('invalid ' + name); }
        return intValue;
    }

    // N = Cpu cost, r = Memory cost, p = parallelization cost
    // callback(error, progress, key)
    function scrypt(password, salt, N, r, p, dkLen, callback) {

        if (!callback) { throw new Error('missing callback'); }

        N = ensureInteger(N, 'N');
        r = ensureInteger(r, 'r');
        p = ensureInteger(p, 'p');

        dkLen = ensureInteger(dkLen, 'dkLen');

        if (N === 0 || (N & (N - 1)) !== 0) { throw new Error('N must be power of 2'); }

        if (N > MAX_VALUE / 128 / r) { throw new Error('N too large'); }
        if (r > MAX_VALUE / 128 / p) { throw new Error('r too large'); }

        if (!checkBufferish(password)) {
            throw new Error('password must be an array or buffer');
        }

        if (!checkBufferish(salt)) {
            throw new Error('salt must be an array or buffer');
        }

        var b = PBKDF2_HMAC_SHA256_OneIter(password, salt, p * 128 * r);
        var B = new Uint32Array(p * 32 * r)
        for (var i = 0; i < B.length; i++) {
            var j = i * 4;
            B[i] = ((b[j + 3] & 0xff) << 24) |
                   ((b[j + 2] & 0xff) << 16) |
                   ((b[j + 1] & 0xff) << 8) |
                   ((b[j + 0] & 0xff) << 0);
        }

        var XY = new Uint32Array(64 * r);
        var V = new Uint32Array(32 * r * N);

        var Yi = 32 * r;

        // scratch space
        var x = new Uint32Array(16);       // salsa20_8
        var _X = new Uint32Array(16);      // blockmix_salsa8

        var totalOps = p * N * 2;
        var currentOp = 0;
        var lastPercent10 = null;

        // Set this to true to abandon the scrypt on the next step
        var stop = false;

        // State information
        var state = 0;
        var i0 = 0, i1;
        var Bi;

        // How many blockmix_salsa8 can we do per step?
        var limit = parseInt(1000 / r);

        // Trick from scrypt-async; if there is a setImmediate shim in place, use it
        var nextTick = (typeof(setImmediate) !== 'undefined') ? setImmediate : setTimeout;

        // This is really all I changed; making scryptsy a state machine so we occasionally
        // stop and give other evnts on the evnt loop a chance to run. ~RicMoo
        var incrementalSMix = function() {
            if (stop) {
                return callback(new Error('cancelled'), currentOp / totalOps);
            }

            switch (state) {
                case 0:
                    // for (var i = 0; i < p; i++)...
                    Bi = i0 * 32 * r;

                    arraycopy(B, Bi, XY, 0, Yi);                       // ROMix - 1

                    state = 1;                                         // Move to ROMix 2
                    i1 = 0;

                    // Fall through

                case 1:

                    // Run up to 1000 steps of the first inner smix loop
                    var steps = N - i1;
                    if (steps > limit) { steps = limit; }
                    for (var i = 0; i < steps; i++) {                  // ROMix - 2
                        arraycopy(XY, 0, V, (i1 + i) * Yi, Yi)         // ROMix - 3
                        blockmix_salsa8(XY, Yi, r, x, _X);             // ROMix - 4
                    }

                    // for (var i = 0; i < N; i++)
                    i1 += steps;
                    currentOp += steps;

                    // Call the callback with the progress (optionally stopping us)
                    var percent10 = parseInt(1000 * currentOp / totalOps);
                    if (percent10 !== lastPercent10) {
                        stop = callback(null, currentOp / totalOps);
                        if (stop) { break; }
                        lastPercent10 = percent10;
                    }

                    if (i1 < N) {
                        break;
                    }

                    i1 = 0;                                          // Move to ROMix 6
                    state = 2;

                    // Fall through

                case 2:

                    // Run up to 1000 steps of the second inner smix loop
                    var steps = N - i1;
                    if (steps > limit) { steps = limit; }
                    for (var i = 0; i < steps; i++) {                // ROMix - 6
                        var offset = (2 * r - 1) * 16;               // ROMix - 7
                        var j = XY[offset] & (N - 1);
                        blockxor(V, j * Yi, XY, Yi);                 // ROMix - 8 (inner)
                        blockmix_salsa8(XY, Yi, r, x, _X);           // ROMix - 9 (outer)
                    }

                    // for (var i = 0; i < N; i++)...
                    i1 += steps;
                    currentOp += steps;

                    // Call the callback with the progress (optionally stopping us)
                    var percent10 = parseInt(1000 * currentOp / totalOps);
                    if (percent10 !== lastPercent10) {
                        stop = callback(null, currentOp / totalOps);
                        if (stop) { break; }
                        lastPercent10 = percent10;
                    }

                    if (i1 < N) {
                        break;
                    }

                    arraycopy(XY, 0, B, Bi, Yi);                     // ROMix - 10

                    // for (var i = 0; i < p; i++)...
                    i0++;
                    if (i0 < p) {
                        state = 0;
                        break;
                    }

                    b = [];
                    for (var i = 0; i < B.length; i++) {
                        b.push((B[i] >>  0) & 0xff);
                        b.push((B[i] >>  8) & 0xff);
                        b.push((B[i] >> 16) & 0xff);
                        b.push((B[i] >> 24) & 0xff);
                    }

                    var derivedKey = PBKDF2_HMAC_SHA256_OneIter(password, b, dkLen);

                    // Done; don't break (which would reschedule)
                    return callback(null, 1.0, derivedKey);
                }

                // Schedule the next steps
                nextTick(incrementalSMix);
            }

            // Bootstrap the incremental smix
            incrementalSMix();
    }

    // node.js
    if (true) {
       module.exports = scrypt;

    // RequireJS/AMD
    // http://www.requirejs.org/docs/api.html
    // https://github.com/amdjs/amdjs-api/wiki/AMD
    } else if (typeof(define) === 'function' && define.amd) {
        define(scrypt);

    // Web Browsers
    } else if (root) {

        // If there was an existing library "scrypt", make sure it is still available
        if (root.scrypt) {
            root._scrypt = root.scrypt;
        }

        root.scrypt = scrypt;
    }

})(this);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(116).setImmediate))

/***/ }),

/***/ 1681:
/***/ (function(module, exports) {

(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1])
      }, this)
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var oldValue = this.map[name]
    this.map[name] = oldValue ? oldValue+','+value : value
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    name = normalizeName(name)
    return this.has(name) ? this.map[name] : null
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value)
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this)
      }
    }
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }

    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = String(input)
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    rawHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = 'status' in options ? options.status : 200
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : 'OK'
    this.headers = new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init)
      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);


/***/ }),

/***/ 1682:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modules_auth_components_uport_uport__ = __webpack_require__(1683);



/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0_react_redux__["b" /* connect */])()(__WEBPACK_IMPORTED_MODULE_1_modules_auth_components_uport_uport__["a" /* default */]));

/***/ }),

/***/ 1683:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Uport;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function Uport() {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'span',
    null,
    'yooooooooooooooo port'
  );
}

/***/ }),

/***/ 1684:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return login; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_services_augurjs__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modules_auth_actions_load_account_data__ = __webpack_require__(660);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_auth_actions_update_is_logged__ = __webpack_require__(498);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ethrpc__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ethrpc___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ethrpc__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_utils_log_error__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_utils_get_value__ = __webpack_require__(78);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };









var login = function login(keystore, password) {
  var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : __WEBPACK_IMPORTED_MODULE_4_utils_log_error__["a" /* default */];
  return function (dispatch, getState) {
    __WEBPACK_IMPORTED_MODULE_0_services_augurjs__["a" /* augur */].accounts.login({
      keystore: keystore,
      password: password,
      address: keystore.address
    }, function (err, account) {
      var address = Object(__WEBPACK_IMPORTED_MODULE_5_utils_get_value__["a" /* default */])(account, 'keystore.address');
      if (err) return callback(err);
      if (!address) return callback(null, account);

      dispatch(Object(__WEBPACK_IMPORTED_MODULE_2_modules_auth_actions_update_is_logged__["b" /* updateIsLogged */])(true));
      dispatch(Object(__WEBPACK_IMPORTED_MODULE_1_modules_auth_actions_load_account_data__["a" /* loadAccountData */])(_extends({}, account, {
        address: address,
        meta: {
          signer: account.privateKey,
          accountType: __WEBPACK_IMPORTED_MODULE_3_ethrpc__["constants"].ACCOUNT_TYPES.PRIVATE_KEY
        }
      }), true));

      callback(null);
    });
  };
};

/***/ }),

/***/ 1685:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TITLE_SUFFIX; });
var TITLE_SUFFIX = '| AUGUR';

/***/ }),

/***/ 1927:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = AuthConnect;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_helmet__ = __webpack_require__(658);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_helmet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_helmet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_common_components_nav_panel_nav_panel__ = __webpack_require__(1480);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_auth_components_help_help__ = __webpack_require__(1656);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_modules_auth_containers_airbitz_connect__ = __webpack_require__(1928);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_modules_auth_containers_ledger__ = __webpack_require__(1932);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_modules_auth_containers_uport__ = __webpack_require__(1682);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_modules_auth_containers_keystore_connect__ = __webpack_require__(1934);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_modules_auth_containers_trezor__ = __webpack_require__(1939);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_modules_auth_components_metamask_metamask__ = __webpack_require__(1941);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_modules_routes_helpers_parse_query__ = __webpack_require__(496);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_modules_routes_constants_param_names__ = __webpack_require__(659);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_modules_auth_constants_connect_nav__ = __webpack_require__(1942);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_modules_app_constants_title_suffix__ = __webpack_require__(1685);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_modules_auth_components_auth_auth_styles__ = __webpack_require__(1478);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_modules_auth_components_auth_auth_styles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_modules_auth_components_auth_auth_styles__);





















function AuthConnect(p) {
  var selectedNav = Object(__WEBPACK_IMPORTED_MODULE_11_modules_routes_helpers_parse_query__["a" /* default */])(p.location.search)[__WEBPACK_IMPORTED_MODULE_12_modules_routes_constants_param_names__["a" /* CONNECT_NAV */]] || null;

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: __WEBPACK_IMPORTED_MODULE_15_modules_auth_components_auth_auth_styles___default.a.Auth },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_helmet___default.a, {
      titleTemplate: 'Connect -- %s ' + __WEBPACK_IMPORTED_MODULE_14_modules_app_constants_title_suffix__["a" /* TITLE_SUFFIX */]
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: __WEBPACK_IMPORTED_MODULE_15_modules_auth_components_auth_auth_styles___default.a['Auth--constrained'] },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: __WEBPACK_IMPORTED_MODULE_15_modules_auth_components_auth_auth_styles___default.a.Auth__header },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'h1',
          null,
          'Connect An Account'
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: __WEBPACK_IMPORTED_MODULE_15_modules_auth_components_auth_auth_styles___default.a.Auth__content },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_modules_common_components_nav_panel_nav_panel__["a" /* default */], {
          location: p.location,
          history: p.history,
          items: __WEBPACK_IMPORTED_MODULE_13_modules_auth_constants_connect_nav__["a" /* ITEMS */],
          param: __WEBPACK_IMPORTED_MODULE_12_modules_routes_constants_param_names__["a" /* CONNECT_NAV */],
          selectedNav: selectedNav
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: __WEBPACK_IMPORTED_MODULE_15_modules_auth_components_auth_auth_styles___default.a.Auth__connections },
          selectedNav == null && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_modules_auth_containers_airbitz_connect__["a" /* default */], null),
          selectedNav === __WEBPACK_IMPORTED_MODULE_13_modules_auth_constants_connect_nav__["b" /* PARAMS */].METAMASK && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_10_modules_auth_components_metamask_metamask__["a" /* default */], null),
          selectedNav === __WEBPACK_IMPORTED_MODULE_13_modules_auth_constants_connect_nav__["b" /* PARAMS */].LEDGER && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_modules_auth_containers_ledger__["a" /* default */], null),
          selectedNav === __WEBPACK_IMPORTED_MODULE_13_modules_auth_constants_connect_nav__["b" /* PARAMS */].UPORT && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_modules_auth_containers_uport__["a" /* default */], null),
          selectedNav === __WEBPACK_IMPORTED_MODULE_13_modules_auth_constants_connect_nav__["b" /* PARAMS */].KEYSTORE && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8_modules_auth_containers_keystore_connect__["a" /* default */], null),
          selectedNav === __WEBPACK_IMPORTED_MODULE_13_modules_auth_constants_connect_nav__["b" /* PARAMS */].TREZOR && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9_modules_auth_containers_trezor__["a" /* default */], null)
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: __WEBPACK_IMPORTED_MODULE_15_modules_auth_components_auth_auth_styles___default.a.Auth__faq },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_modules_auth_components_help_help__["a" /* default */], null)
      )
    )
  );
}

AuthConnect.propTypes = {
  location: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  history: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  isMobile: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool.isRequired
};

/***/ }),

/***/ 1928:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_auth_components_airbitz_connect_airbitz_connect__ = __webpack_require__(1929);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_auth_actions_login_with_airbitz__ = __webpack_require__(1659);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_auth_helpers_abc__ = __webpack_require__(1662);






var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    airbitzLoginLink: function airbitzLoginLink(history) {
      return Object(__WEBPACK_IMPORTED_MODULE_4_modules_auth_helpers_abc__["a" /* default */])().openLoginWindow(function (result, airbitzAccount) {
        if (airbitzAccount) {
          dispatch(Object(__WEBPACK_IMPORTED_MODULE_3_modules_auth_actions_login_with_airbitz__["a" /* loginWithAirbitz */])(airbitzAccount, history));
        } else {
          console.error('error registering in: ' + result);
        }
      });
    },
    airbitzOnLoad: function airbitzOnLoad(history) {
      var abcUi = Object(__WEBPACK_IMPORTED_MODULE_4_modules_auth_helpers_abc__["a" /* default */])();
      var abcContext = abcUi.abcContext;
      var usernames = abcContext.listUsernames();
      if (usernames.length > 0) {
        abcUi.openLoginWindow(function (result, airbitzAccount) {
          if (airbitzAccount) {
            dispatch(Object(__WEBPACK_IMPORTED_MODULE_3_modules_auth_actions_login_with_airbitz__["a" /* loginWithAirbitz */])(airbitzAccount, history));
          } else {
            console.error('error registering in: ' + result);
          }
        });
      }
    }
  };
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["f" /* withRouter */])(Object(__WEBPACK_IMPORTED_MODULE_0_react_redux__["b" /* connect */])(null, mapDispatchToProps)(__WEBPACK_IMPORTED_MODULE_2_modules_auth_components_airbitz_connect_airbitz_connect__["a" /* default */])));

/***/ }),

/***/ 1929:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_helmet__ = __webpack_require__(658);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_helmet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_helmet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_auth_components_airbitz_connect_airbitz_connect_styles__ = __webpack_require__(1930);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_auth_components_airbitz_connect_airbitz_connect_styles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_modules_auth_components_airbitz_connect_airbitz_connect_styles__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var Airbitz = function (_Component) {
  _inherits(Airbitz, _Component);

  function Airbitz() {
    _classCallCheck(this, Airbitz);

    return _possibleConstructorReturn(this, (Airbitz.__proto__ || Object.getPrototypeOf(Airbitz)).apply(this, arguments));
  }

  _createClass(Airbitz, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.airbitzOnLoad(this.props.history);
    }
  }, {
    key: 'render',
    value: function render() {
      var p = this.props;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'section',
        { className: __WEBPACK_IMPORTED_MODULE_4_modules_auth_components_airbitz_connect_airbitz_connect_styles___default.a.Airbitz },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_3_react_helmet___default.a,
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'title',
            null,
            'Airbitz'
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'button',
          {
            className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()(__WEBPACK_IMPORTED_MODULE_4_modules_auth_components_airbitz_connect_airbitz_connect_styles___default.a.button, __WEBPACK_IMPORTED_MODULE_4_modules_auth_components_airbitz_connect_airbitz_connect_styles___default.a['button--purple'], __WEBPACK_IMPORTED_MODULE_4_modules_auth_components_airbitz_connect_airbitz_connect_styles___default.a.Airbitz__button),
            onClick: function onClick() {
              return p.airbitzLoginLink(p.history);
            }
          },
          'Connect Airbitz Account'
        )
      );
    }
  }]);

  return Airbitz;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

Airbitz.propTypes = {
  history: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  airbitzLoginLink: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  airbitzOnLoad: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};
/* harmony default export */ __webpack_exports__["a"] = (Airbitz);

/***/ }),

/***/ 1930:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1931);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1334)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./airbitz-connect.styles.less", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./airbitz-connect.styles.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1931:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(657)(undefined);
// imports


// module
exports.push([module.i, "@font-face{font-family:FontAwesome;font-style:normal;font-weight:400;src:url(" + __webpack_require__(1335) + ") format(\"woff\")}@font-face{font-family:icofont;font-style:normal;font-weight:400;src:url(" + __webpack_require__(1336) + ") format(\"woff\")}._3MVnuMlDkXWv6kA79Jow3Q{display:flex;justify-content:center;min-height:100%;width:100%}._1CP25SSWNM_U4LsNHRBt3v{align-self:center}", ""]);

// exports
exports.locals = {
	"Airbitz": "_3MVnuMlDkXWv6kA79Jow3Q",
	"Airbitz__button": "_1CP25SSWNM_U4LsNHRBt3v"
};

/***/ }),

/***/ 1932:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modules_auth_components_ledger_ledger__ = __webpack_require__(1933);



/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0_react_redux__["b" /* connect */])()(__WEBPACK_IMPORTED_MODULE_1_modules_auth_components_ledger_ledger__["a" /* default */]));

/***/ }),

/***/ 1933:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Trezor;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function Trezor() {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'span',
    null,
    'Leadure'
  );
}

/***/ }),

/***/ 1934:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_auth_components_keystore_connect_keystore_connect__ = __webpack_require__(1935);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_auth_actions_import_account__ = __webpack_require__(1938);






var mapPropsToState = function mapPropsToState(dispatch) {
  return {
    importAccount: function importAccount(keystore, password, callback) {
      return dispatch(Object(__WEBPACK_IMPORTED_MODULE_3_modules_auth_actions_import_account__["a" /* importAccount */])(keystore, password, callback));
    }
  };
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["f" /* withRouter */])(Object(__WEBPACK_IMPORTED_MODULE_0_react_redux__["b" /* connect */])(null, mapPropsToState)(__WEBPACK_IMPORTED_MODULE_2_modules_auth_components_keystore_connect_keystore_connect__["a" /* default */])));

/***/ }),

/***/ 1935:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_helmet__ = __webpack_require__(658);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_helmet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_helmet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_common_components_icons_icons__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_modules_routes_helpers_make_path__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_utils_trim_string__ = __webpack_require__(1655);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_modules_routes_constants_views__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_modules_auth_components_keystore_connect_keystore_connect_styles__ = __webpack_require__(1936);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_modules_auth_components_keystore_connect_keystore_connect_styles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_modules_auth_components_keystore_connect_keystore_connect_styles__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }















var KeystoreConnect = function (_Component) {
  _inherits(KeystoreConnect, _Component);

  function KeystoreConnect() {
    _classCallCheck(this, KeystoreConnect);

    var _this = _possibleConstructorReturn(this, (KeystoreConnect.__proto__ || Object.getPrototypeOf(KeystoreConnect)).call(this));

    _this.state = {
      error: null,
      password: '',
      keystore: null
    };

    _this.handleRecoverError = _this.handleRecoverError.bind(_this);
    return _this;
  }

  _createClass(KeystoreConnect, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // NOTE --  keythereum (as of implementation) simply throws when a private key
      //          is unable to be recovered, so this error is handled thusly
      window.addEventListener('error', this.handleRecoverError);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('error', this.handleRecoverError);
    }
  }, {
    key: 'handleRecoverError',
    value: function handleRecoverError(err) {
      this.setState({
        error: 'Unable to recover account from file'
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var p = this.props;
      var s = this.state;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'section',
        { className: __WEBPACK_IMPORTED_MODULE_8_modules_auth_components_keystore_connect_keystore_connect_styles___default.a.Keystore },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2_react_helmet___default.a,
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'title',
            null,
            'Keystore'
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: __WEBPACK_IMPORTED_MODULE_8_modules_auth_components_keystore_connect_keystore_connect_styles___default.a.Keystore__content },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'form',
            {
              className: __WEBPACK_IMPORTED_MODULE_8_modules_auth_components_keystore_connect_keystore_connect_styles___default.a.Keystore__form,
              onSubmit: function onSubmit(e) {
                e.preventDefault();

                if (s.keystore && s.password) {
                  p.importAccount(s.password, s.keystore, function (err) {
                    if (err) {
                      return _this2.setState({
                        error: 'Account Import Failed'
                      });
                    }

                    p.history.push(Object(__WEBPACK_IMPORTED_MODULE_5_modules_routes_helpers_make_path__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_7_modules_routes_constants_views__["j" /* DEFAULT_VIEW */]));
                  });
                }
              }
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              {
                className: __WEBPACK_IMPORTED_MODULE_8_modules_auth_components_keystore_connect_keystore_connect_styles___default.a.Keystore__input
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', {
                id: 'keystore_connect_file',
                className: __WEBPACK_IMPORTED_MODULE_8_modules_auth_components_keystore_connect_keystore_connect_styles___default.a.Keystore__file,
                type: 'file',
                onChange: function onChange(e) {
                  if (e.target.files.length) {
                    if (e.target.files[0].type !== '') {
                      _this2.setState({
                        error: 'Incorrect file type',
                        password: '',
                        keystore: null
                      });
                    }
                    var fileReader = new FileReader();

                    fileReader.readAsText(e.target.files[0]);

                    fileReader.onload = function (e) {
                      try {
                        var keystore = JSON.parse(e.target.result);
                        _this2.setState({
                          error: null,
                          password: '',
                          keystore: keystore
                        });
                      } catch (err) {
                        _this2.setState({
                          error: 'Malformed account file',
                          password: '',
                          keystore: null
                        });
                      }
                    };
                  } else {
                    _this2.setState({
                      error: null,
                      password: '',
                      keystore: null
                    });
                  }
                }
              }),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'label',
                {
                  htmlFor: 'keystore_connect_file'
                },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'span',
                  null,
                  __WEBPACK_IMPORTED_MODULE_4_modules_common_components_icons_icons__["m" /* Export */]
                ),
                s.keystore === null ? 'Upload File' : Object(__WEBPACK_IMPORTED_MODULE_6_utils_trim_string__["a" /* default */])(s.keystore.address)
              )
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              {
                className: __WEBPACK_IMPORTED_MODULE_8_modules_auth_components_keystore_connect_keystore_connect_styles___default.a.Keystore__input
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'label',
                {
                  htmlFor: 'keyword_create_passphrase'
                },
                'Passphrase'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', {
                id: 'keyword_create_passphrase',
                type: 'password',
                value: s.password,
                placeholder: 'Passphrase',
                disabled: s.keystore === null,
                onChange: function onChange(e) {
                  return _this2.setState({ password: e.target.value });
                }
              })
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: __WEBPACK_IMPORTED_MODULE_8_modules_auth_components_keystore_connect_keystore_connect_styles___default.a.Keystore__actions },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'button',
                {
                  className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()(__WEBPACK_IMPORTED_MODULE_8_modules_auth_components_keystore_connect_keystore_connect_styles___default.a['button--purple'], _defineProperty({}, __WEBPACK_IMPORTED_MODULE_8_modules_auth_components_keystore_connect_keystore_connect_styles___default.a['button--disabled'], s.password === '' || s.keystore === null)),
                  disabled: s.password === '' || s.keystore === null
                },
                'connect'
              )
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: __WEBPACK_IMPORTED_MODULE_8_modules_auth_components_keystore_connect_keystore_connect_styles___default.a.Keystore__instruction },
            s.error !== null && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              null,
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'h3',
                null,
                'Error:'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'span',
                null,
                s.error
              )
            )
          )
        )
      );
    }
  }]);

  return KeystoreConnect;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

KeystoreConnect.propTypes = {
  history: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  importAccount: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};
/* harmony default export */ __webpack_exports__["a"] = (KeystoreConnect);

/***/ }),

/***/ 1936:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1937);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1334)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./keystore-connect.styles.less", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./keystore-connect.styles.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1937:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(657)(undefined);
// imports


// module
exports.push([module.i, "@font-face{font-family:FontAwesome;font-style:normal;font-weight:400;src:url(" + __webpack_require__(1335) + ") format(\"woff\")}@font-face{font-family:icofont;font-style:normal;font-weight:400;src:url(" + __webpack_require__(1336) + ") format(\"woff\")}._6A_uVpIzjPJqZa6xZaqR5 button{font-weight:500;letter-spacing:.3px;text-transform:uppercase}._6A_uVpIzjPJqZa6xZaqR5 label{color:#372e4b}.uLlpZmSwNwRGCdUO69FiK{display:flex;flex-direction:column;height:100%;padding:2rem 2rem 2rem 6rem}._2pUENEqsjYVsbvsFudrZV4{height:100%;width:100%}._2pUENEqsjYVsbvsFudrZV4,._6A_uVpIzjPJqZa6xZaqR5{display:flex;justify-content:center}._6A_uVpIzjPJqZa6xZaqR5{flex:3;flex-direction:column;padding-right:2rem}._6A_uVpIzjPJqZa6xZaqR5>*{margin-bottom:1.8em}._6A_uVpIzjPJqZa6xZaqR5 h3{font-size:1.125rem}.PaR6NSX-0YXvAPxCM7dW_{display:flex;justify-content:space-around}.PaR6NSX-0YXvAPxCM7dW_ a,.PaR6NSX-0YXvAPxCM7dW_ button{max-height:3em}._14AuQ0nlqsoDqQ1woSu03H{flex:2}._14AuQ0nlqsoDqQ1woSu03H h3{margin-bottom:1em}._2kvxUJSRSkMa31PIB7faQ ul{list-style:disc}._2kvxUJSRSkMa31PIB7faQ ul li{font-size:.875rem;margin:1em 0 0 1em}.lV4LF91aqpadBjmWVGTh8{display:none}.lV4LF91aqpadBjmWVGTh8+label{align-items:center;display:flex;font-size:1.125rem;margin-bottom:0}.lV4LF91aqpadBjmWVGTh8+label span{align-items:center;display:flex;height:1.2em;margin:.2em .5em 0 0;padding:0;width:1.2em}.lV4LF91aqpadBjmWVGTh8+label span svg{height:100%;width:100%}", ""]);

// exports
exports.locals = {
	"Keystore__form": "_6A_uVpIzjPJqZa6xZaqR5",
	"Keystore": "uLlpZmSwNwRGCdUO69FiK",
	"Keystore__content": "_2pUENEqsjYVsbvsFudrZV4",
	"Keystore__actions": "PaR6NSX-0YXvAPxCM7dW_",
	"Keystore__instruction": "_14AuQ0nlqsoDqQ1woSu03H",
	"Keystore__suggestions": "_2kvxUJSRSkMa31PIB7faQ",
	"Keystore__file": "lV4LF91aqpadBjmWVGTh8"
};

/***/ }),

/***/ 1938:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return importAccount; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_services_augurjs__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modules_auth_actions_login__ = __webpack_require__(1684);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_utils_log_error__ = __webpack_require__(22);




var importAccount = function importAccount(password, keystore) {
  var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : __WEBPACK_IMPORTED_MODULE_2_utils_log_error__["a" /* default */];
  return function (dispatch, getState) {
    return __WEBPACK_IMPORTED_MODULE_0_services_augurjs__["a" /* augur */].accounts.importAccount({ password: password, keystore: keystore }, function (err, account) {
      if (err) return callback(err);

      dispatch(Object(__WEBPACK_IMPORTED_MODULE_1_modules_auth_actions_login__["a" /* login */])(keystore, password, function (err) {
        return callback(err);
      }));
    });
  };
};

/***/ }),

/***/ 1939:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modules_auth_components_trezor_trezor__ = __webpack_require__(1940);



/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0_react_redux__["b" /* connect */])()(__WEBPACK_IMPORTED_MODULE_1_modules_auth_components_trezor_trezor__["a" /* default */]));

/***/ }),

/***/ 1940:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Ledger;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function Ledger() {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'span',
    null,
    'Traysor'
  );
}

/***/ }),

/***/ 1941:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Trezor;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function Trezor() {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'span',
    null,
    'Micromask'
  );
}

/***/ }),

/***/ 1942:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return PARAMS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ITEMS; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_modules_common_components_icons_icons__ = __webpack_require__(123);


var PARAMS = {
  AIRBITZ: 'airbitz',
  UPORT: 'uport',
  KEYSTORE: 'keystore',
  TREZOR: 'trezor',
  LEDGER: 'ledger',
  METAMASK: 'metamask'
};

var ITEMS = [{
  param: PARAMS.AIRBITZ,
  title: 'Airbitz',
  icon: __WEBPACK_IMPORTED_MODULE_0_modules_common_components_icons_icons__["a" /* Airbitz */],
  default: true
}, {
  param: PARAMS.METAMASK,
  title: 'Metamask',
  icon: __WEBPACK_IMPORTED_MODULE_0_modules_common_components_icons_icons__["t" /* Metamask */]
}, {
  param: PARAMS.UPORT,
  title: 'uPort',
  icon: __WEBPACK_IMPORTED_MODULE_0_modules_common_components_icons_icons__["y" /* uPort */]
}, {
  param: PARAMS.KEYSTORE,
  title: 'Keystore',
  icon: __WEBPACK_IMPORTED_MODULE_0_modules_common_components_icons_icons__["o" /* Key */]
}, {
  param: PARAMS.TREZOR,
  title: 'Trezor',
  icon: __WEBPACK_IMPORTED_MODULE_0_modules_common_components_icons_icons__["w" /* Trezor */]
}, {
  param: PARAMS.LEDGER,
  title: 'Ledger',
  icon: __WEBPACK_IMPORTED_MODULE_0_modules_common_components_icons_icons__["p" /* Ledger */]
}];

/***/ }),

/***/ 683:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_auth_components_connect_connect__ = __webpack_require__(1927);




var mapStateToProps = function mapStateToProps(state) {
  return {
    isMobile: state.isMobile
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["f" /* withRouter */])(Object(__WEBPACK_IMPORTED_MODULE_0_react_redux__["b" /* connect */])(mapStateToProps)(__WEBPACK_IMPORTED_MODULE_2_modules_auth_components_connect_connect__["a" /* default */])));

/***/ })

});
//# sourceMappingURL=auth-connect.74d69b0836bd5311ad45.js.map