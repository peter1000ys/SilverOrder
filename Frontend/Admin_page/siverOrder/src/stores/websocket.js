import { create } from 'zustand';
import SockJS from 'sockjs-client';
import { Stomp } from "@stomp/stompjs";
import useOrderStore from './order'; // 주문 목록 상태 관리하는 스토어
const useWebSocketStore = create((set, get) => ({
  stompClient: null,

  // WebSocket 연결
  connectWebSocket: (storeId) => {
    if (!storeId) {
      console.error('storeId가 없습니다. WebSocket을 연결할 수 없습니다.');
      return;
    }

    // SockJS를 사용하여 서버에 연결
    const socket = new SockJS('http://localhost:8080/silverorder/ws-stomp'); // Socket을 바로 여기서 선언
    const stompClient = Stomp.over(socket); // WebSocket 객체를 Stomp에 넘김

    stompClient.connect({}, (frame) => {
      console.log('Connected to WebSocket:', frame);

      // storeId에 해당하는 특정 topic을 구독
      stompClient.subscribe(`/topic/orderIn/${storeId}`, (message) => {
        const onMessageReceived = get().onMessageReceived;
        if (onMessageReceived) {
          onMessageReceived(); // 메시지 수신 후 처리
        }
      });
    }, (error) => {
      console.error('WebSocket connection error:', error);
    });

    // Zustand 상태에 stompClient 저장
    set({ stompClient });
  },

  // WebSocket 연결 해제
  disconnectWebSocket: () => {
    const { stompClient } = get();
    if (stompClient) {
      stompClient.disconnect(() => {
        console.log('Disconnected from WebSocket');
      });
    }
  },

  // 메시지 수신 시 실행되는 함수 설정
  setOnMessageReceived: (callback) => set({ onMessageReceived: callback }),
}));

export default useWebSocketStore;