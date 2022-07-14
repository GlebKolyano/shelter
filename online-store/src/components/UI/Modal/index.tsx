import React, { useEffect, useState } from 'react';
import './style.css';
import Button from '../Button';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { changeModalState, registerModal } from '../../../store/reducers/modal.slice';

type Props = {
  id: string;
  title: string;
  text: string;
};

function Modal(props: Props) {
  const dispatch = useAppDispatch();
  const { modalsID } = useAppSelector((state) => state.modalReducer);
  const { id, text, title } = props;
  const [isModalVisible, setModalVisibility] = useState(false);

  useEffect(() => {
    dispatch(registerModal(id));
  }, []);

  useEffect(() => {
    const newState = modalsID[id];
    setModalVisibility(newState);
  }, [id, modalsID]);

  if (!isModalVisible) {
    return null;
  }

  const handleChangeVisibility = () => {
    setModalVisibility(false);
    dispatch(changeModalState(id));
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-header__title">{title}</h4>
        </div>
        <div className="modal-body">
          <p>{text}</p>
        </div>
        <div className="modal-footer">
          <Button type="button" onClick={handleChangeVisibility} text="Закрыть" />
        </div>
      </div>
    </div>
  );
}

export default Modal;
