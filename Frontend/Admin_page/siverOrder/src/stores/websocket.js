import { create } from 'zustand';
import SockJS from 'sockjs-client';
import { Stomp } from "@stomp/stompjs";
import useOrderStore from './order'; // 주문 목록 상태 관리하는 스토어

const useWebSocketStore = create((set, get) => ({
  stompClient: null,

  // WebSocket 연결
  connectWebSocket: (storeId) => {
    // SockJS를 사용하여 서버에 연결
    const socket = new SockJS('http://localhost:8080/silverorder/ws-stomp');
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, (frame) => {
      console.log('Connected to WebSocket:', frame);
      // 특정 storeId에 대한 구독 설정
      stompClient.subscribe(`/topic/orderIn/${storeId}`, (message) => {
        console.log('Received message:', message.body);
        get().onMessageReceived(); // 메시지 수신 후 처리
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

  // 메시지 수신 시 실행되는 함수
  onMessageReceived: () => {
    const { fetchOrders } = useOrderStore.getState(); // 주문 목록 갱신 함수
    fetchOrders(); // 주문 목록 갱신
  },
}));

export default useWebSocketStore;
