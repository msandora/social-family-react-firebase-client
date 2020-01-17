import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

const Modal = ({ isShowing, hide, person }) => isShowing ? ReactDOM.createPortal(
  <React.Fragment>
    <div className={styles.overlay}/>
    <div className={styles.wrapper} aria-modal aria-hidden tabIndex={-1} role="dialog">
      <div className={styles.modal}>
        <div className={styles.header}>
          <button type="button" className={styles.closebutton} data-dismiss="modal" aria-label="Close" onClick={hide}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <p>
          Hello, I am {person.firstName} {person.lastName}.
        </p>
      </div>
    </div>
  </React.Fragment>, document.body
) : null;

export default Modal;