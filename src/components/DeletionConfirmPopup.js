import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeletionConfirmPopup(props) {
  function handleSubmit(e) {
    e.preventDefault();

    props.onConfirmDeletion();
  }

  return (
    <PopupWithForm name="deletion-confirm" title="Вы уверены?" buttonText="Да" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} isFormLoading={props.isFormLoading}></PopupWithForm>
  )
}

export default DeletionConfirmPopup;
