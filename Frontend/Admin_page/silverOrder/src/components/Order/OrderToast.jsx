import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toast, ToastContainer } from 'react-bootstrap'; // bootstrap의 토스트 컴포넌트를 사용

const OrderToast = ({ show, onClose, message }) => {
  return (
    <ToastContainer className="position-absolute top-0 end-0 p-3">
      <Toast show={show} onClose={onClose} delay={3000} autohide>
        <Toast.Header>
          <strong className="me-auto">주문 알림</strong>
          <small>방금</small>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default OrderToast;
