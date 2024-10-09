import "../styles/OutdoorPage.css";
import { useNavigate } from "react-router-dom";
import silverorder_logo from "../img/silverorder_logo.png";
import { baseURL } from "../constant";
import React, { useRef, useState, useEffect } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { Button, Box } from '@mui/material';

const OutdoorPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState('No result');
  const videoRef = useRef(null);
  const codeReader = new BrowserMultiFormatReader();
  const streamRef = useRef(null);

  useEffect(() => {
    if (open) {
      startScan();
    } else {
      stopScan();
    }
    return () => stopScan();
  }, [open]);

  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => {
    setOpen(false);
  };

  const startScan = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("getUserMedia not supported in this browser.");
      }

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        codeReader.decodeFromVideoDevice(null, videoRef.current, (result, err) => {
          if (result) {
            setData(result.text);
            if (isValidURL(result.text)) {
              window.location.href = result.text;
            }
          }
          if (err && !(err instanceof Error)) {
            console.error(err);
          }
        });
      } else {
        console.error("Video element not found.");
      }
    } catch (err) {
      console.error("Error starting video stream:", err);
      alert("Failed to access camera. Please check permissions.");
    }
  };

  const stopScan = () => {
    codeReader.reset();
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    streamRef.current = null;
  };

  const isValidURL = (string) => {
    const res = string.match(/(https?:\/\/[^\s]+)/g);
    return (res !== null);
  };

  const go_to_sign_up = () => {
    navigate(`${baseURL}/signup`);
  };

  const go_to_find_store = () => {
    navigate(`${baseURL}/findstore`);
  };

  return (
    <div className="outdoor-container">
      <div className="outdoor-contents">
        <img className="outdoor-page-logo" src={silverorder_logo} alt="로고" />
        <button
          className="outdoor-page-findstore-btn"
          onClick={go_to_find_store}
        >
          주변매장 찾아보기
        </button>
        <button
          className="outdoor-page-findstore-btn"
          onClick={onOpenModal}
        >
          매장 QR 스캔
        </button>
        
        <Modal open={open} onClose={onCloseModal} center>
          <h2>매장 QR 코드 스캐너</h2>
          <video
            style={{ width: '100%', height: 'auto', zIndex: '1' }}
            ref={videoRef}
            autoPlay
            playsInline
            muted
          />
          <Box display="flex" justifyContent="flex-end">
            <Button 
              variant="contained" 
              sx={{ backgroundColor: 'grey', fontSize: '1.5rem' }} // 원하는 크기로 조정
              onClick={onCloseModal}
            >
              취소
            </Button>
          </Box>
        </Modal>  
        
      </div>
    </div>
  );
};

export default OutdoorPage;