import PropTypes from 'prop-types';
import React, { Component, useEffect } from 'react';
import { Overlay, ModalDiv } from './Modal.styled';

export const Modal =({ onCloseModal, currentImg}) =>{
 
 useEffect(() => { 

  const handleCloseEsc = e => {
    if (e.code === 'Escape') {
    onCloseModal();
    }
  };
  window.addEventListener('keydown', this.handleCloseEsc);
  return () => {
    window.removeEventListener('keydown', this.handleCloseEsc);
 };
},[onCloseModal]);
  
  const handleCloseBackdrop = ({ target, currentTarget }) => {
    if (target === currentTarget) {
    onCloseModal();
    }
  };

    return (
      <Overlay onClick={handleCloseBackdrop} className="overlay">
        <ModalDiv className="modal">
          <img src={currentImg} alt="" width="800" height="600" />
        </ModalDiv>
      </Overlay>
    );
    };
Modal.propTypes = {
  currentImg: PropTypes.string.isRequired,
};