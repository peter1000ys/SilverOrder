import React, { useEffect, useState } from 'react';
import './App.css';
import PageRoutes from './routes/PageRoutes';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Notiflix from 'notiflix';
import useWebSocketStore from './stores/websocket';
import useInfoStore from './stores/infos';
import OrderToast from './components/Order/OrderToast'; // 추가된 Toast 컴포넌트

// Material UI 폰트 적용
const theme = createTheme({
  typography: {
    fontFamily: 'Pretendard, sans-serif',
  },
});

function App() {
  const { userInfo } = useInfoStore();
  const storeId = userInfo.storeId; // storeId 가져오기
  const connectWebSocket = useWebSocketStore((state) => state.connectWebSocket);
  const disconnectWebSocket = useWebSocketStore((state) => state.disconnectWebSocket);

  // 토스트 상태 관리
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const setViewportMeta = () => {
      let metaTag = document.querySelector('meta[name="viewport"]');
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.name = 'viewport';
        document.head.appendChild(metaTag);
      }
      metaTag.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    };
    setViewportMeta();

    Notiflix.Notify.init({
      position: 'center-top',
      width: 'calc(320 / 1440 * 100vw)',
      borderRadius: 'calc(7 / 1440 * 100vw)',
      clickToClose: true,
    });

    if (storeId) {
      connectWebSocket(storeId); // WebSocket 연결

      // WebSocket에서 메시지를 받을 때 토스트 알림을 띄우는 로직
      const handleNewOrder = () => {
        setToastMessage('주문이 추가되었습니다!');
        setShowToast(true);
      };

      // WebSocket 메시지 처리 콜백 설정
      useWebSocketStore.setState({ onMessageReceived: handleNewOrder });
    }

    return () => {
      disconnectWebSocket(); // WebSocket 연결 해제
    };
  }, [storeId, connectWebSocket, disconnectWebSocket]);

  return (
    <ThemeProvider theme={theme}>
      <PageRoutes />
      {/* Toast 알림을 화면에 추가 */}
      <OrderToast show={showToast} onClose={() => setShowToast(false)} message={toastMessage} />
    </ThemeProvider>
  );
}

export default App;
