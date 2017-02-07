import React, {Component} from 'react';
import 'shared/css/toaster.scss';

/**
Prop Types:
// Defaults
placement: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' - 'top-right'
duplicates: Boolean - false
disableStyles: Boolean - false
duration: Number - 4000
closable: Boolean - true

// Customization
containerClass: String | [String] - nil

// Events
onShow: Function - nil
onClose: Function - nil

// Methods available from ref
toast(options)
options.type: info | success | warning | error - nil
options.title: String
options.message: String
options.actions: Component | [Component] - nil
options.iconClass: String - nil
*/

const styles = {
  bottomRight: {
    'bottom': '20px',
    'right': '20px'
  },
  bottomLeft: {
    'bottom': '20px',
    'left': '20px'
  },
  topRight: {
    'top': '20px',
    'right': '20px'
  },
  topLeft: {
    'top': '20px',
    'left': '20px'
  },
  modal: {

  }
};

let uuid = 0;
const uuidGenerator = () => ++uuid;

const indexOfToast = function indexOfToast (messages, key) {
  const len = messages.length;
  let k = 0;
  while (k < len) {
    if (+messages[k].key === key) { return k; }
    k++;
  }
  return -1;
};

const getPlacementStyles = function getPlacementStyles (placement) {
  switch (placement) {
    case 'top-right':
      return styles.topRight;
    case 'top-left':
      return styles.topLeft;
    case 'bottom-right':
      return styles.bottomRight;
    case 'bottom-left':
      return styles.bottomLeft;
    default:
      return styles.topRight;
  }
};

const ANIMATION_DURATION = 500;
const MOUSE_OUT_DURATION = 1000;

class Toast extends Component {

  componentDidMount () {
    const { container } = this.refs;
    const { duration } = this.props;

    requestAnimationFrame(() => {
      container.classList.add('opaque');
      this.timer = setTimeout(this.clear, duration);
    });
  }

  componentWillMount () {
    this.transitionTimers = [];
  }

  componentWillUnmount () {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.transitionTimers.forEach(timeout => clearTimeout(timeout));
  }

  clear = () => {
    const { id, onRemove } = this.props;
    const { container } = this.refs;

    container.classList.remove('opaque');
    setTimeout(function () {
      onRemove(id);
    }, ANIMATION_DURATION);
  };

  onMouseEnter = () => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  };

  onMouseLeave = () => {
    this.timer = setTimeout(this.clear, MOUSE_OUT_DURATION);
  };

  render () {
    const {
      type,
      title,
      message,
      actions,
      iconClass = ''
    } = this.props;

    return (
      <div
        ref='container'
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        className={`toaster__toast ${type}`}>
        <div className='toaster__toast-icon-container'>
          <div className={`toaster__toast-icon ${iconClass}`}></div>
        </div>
        <div className='toaster__toast-content-container'>
          <div className='toaster__toast-title'>{title}</div>
          <div className='toaster__toast-message'>{message}</div>
          <div className='toaster__toast-actions'>{actions}</div>
        </div>
      </div>
    );
  }
}

const ToasterDefaults = {
  placement: 'top-right',
  duplicates: true,
  disableStyles: false,
  duration: 5000,
  closable: true
};

export default class Toaster extends Component {

  constructor (props) {
    super(props);
    // Store the defaults
    this.defaults = Object.assign(ToasterDefaults, this.props);
    // Setup state
    this.state = {
      messages: []
    };
  }

  toast = (params) => {
    const options = Object.assign({
      id: uuidGenerator(),
      onRemove: this.removeToast,
      duration: this.defaults.duration
    }, params);
    const currentMessages = this.state.messages.slice();

    currentMessages.unshift(<Toast key={options.id} {...options} />);
    this.setState({ messages: currentMessages });
  };

  removeToast = (key) => {
    const updatedMessages = this.state.messages.slice();
    const index = indexOfToast(updatedMessages, key);
    if (index > -1) {
      updatedMessages.splice(index, index + 1);
      this.setState({ messages: updatedMessages });
    }
  };

  render () {

    return (
      <div className='toaster__container' style={getPlacementStyles(this.defaults.placement)}>
        {this.state.messages}
      </div>
    );
  }
}
