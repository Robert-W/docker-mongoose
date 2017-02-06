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
  container: {
    'position': 'fixed',
    'height': 'auto'
  },
  toast: {
    'boxShadow': '0 4px 8px #B0BEC5',
    'borderRadius': '5px',
    'display': 'flex',
    'width': '300px'
  },
  iconContainer: {
    'padding': '10px',
    'width': '44px'
  },


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

const toast = ({
  key,
  type,
  title,
  message,
  actions,
  duration,
  onRemove,
  iconClass = ''
}) => {
  // const toastStyle = Object.assign({}, styles.toast, { background: getBackgroundColor(type) });
  // const iconContainerStyle = Object.assign({}, styles.iconContainer);

  const clear = function clear () {
    onRemove(key);
  };

  let timer = setTimeout(clear, duration);

  const onMouseEnter = () => {
    clearTimeout(timer);
  };

  const onMouseLeave = () => {
    timer = setTimeout(clear, 1000);
  };

  return (
    <div
      key={key}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
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
};

const ToasterDefaults = {
  placement: 'top-right',
  duplicates: true,
  disableStyles: false,
  duration: 4000,
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
      key: uuidGenerator(),
      onRemove: this.removeToast,
      duration: this.defaults.duration
    }, params);
    const currentMessages = this.state.messages.slice();
    const newMessage = toast(options);

    currentMessages.unshift(newMessage);
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
