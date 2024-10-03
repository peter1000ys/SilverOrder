import { create } from "zustand";
import axios from "axios";
import useInfoStore from "./infos"; // 토큰을 가져오기 위한 기존 Zustand 스토어
import human_logo from "../img/gps_human.png"; // 사용자 마커 이미지
import store_logo from "../img/gps_store.png"; // 가게 마커 이미지

// Zustand 스토어 정의
const useMapStore = create((set, get) => ({
  location: {
    latitude: null, // 사용자 위치의 위도 저장
    longitude: null, // 사용자 위치의 경도 저장
    error: null, // 위치 오류 메시지 저장
  },
  mapLoaded: false, // 지도 로드 여부 상태
  nearStores: [], // 주변 가게 정보 저장
  mapRef: null, // Kakao 지도 참조값 저장
  markerRef: null, // 사용자 위치 마커 참조값 저장

  // 위치 상태 업데이트 함수
  setLocation: (newLocation) =>
    set((state) => ({ location: { ...state.location, ...newLocation } })),
  // 지도 로드 상태 업데이트 함수
  setMapLoaded: (status) => set({ mapLoaded: status }),
  // 주변 가게 정보 저장 함수
  setNearStores: (stores) => set({ nearStores: stores }),
  // Kakao 지도 참조값 설정 함수
  setMapRef: (map) => set({ mapRef: map }),
  // 마커 참조값 설정 함수
  setMarkerRef: (marker) => set({ markerRef: marker }),

  // 현재 위치 정보를 가져오는 함수
  fetchLocation: () => {
    if (navigator.geolocation) {
      // 브라우저에서 Geolocation API를 지원하는지 확인
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("위치 가져오기 성공:", position.coords); // 성공 로그
          get().setLocation({
            latitude: position.coords.latitude, // 위도 저장
            longitude: position.coords.longitude, // 경도 저장
            error: null,
          });

          // 위치를 가져온 후 지도를 업데이트하는 함수 호출
          get().updateMap();
        },
        (error) => {
          console.log("위치 가져오기 실패:", error); // 오류 로그
          get().setLocation({ error: error.message }); // 오류 메시지 저장
        }
      );
    } else {
      // 브라우저에서 위치 정보 지원하지 않는 경우 처리
      get().setLocation({
        error: "이 브라우저는 위치 정보를 지원하지 않습니다.",
      });
    }
  },

  // Kakao 지도를 초기화하는 함수
  initializeMap: () => {
    if (!window.kakao || !window.kakao.maps) {
      console.error("Kakao Maps API가 로드되지 않았습니다.");
      return;
    }
    const container = document.getElementById("kakaomap"); // Kakao 지도 DOM 요소
    const options = {
      center: new window.kakao.maps.LatLng(37.5665, 126.978), // 기본 지도 중심 좌표 (서울)
      level: 3, // 지도 줌 레벨
    };
    const map = new window.kakao.maps.Map(container, options); // 지도 생성
    get().setMapRef(map); // 지도 참조값 저장
    get().setMapLoaded(true); // 지도 로드 상태를 true로 설정
  },

  // 주변 가게 정보를 API로부터 가져오는 함수
  fetchNearbyStores: async () => {
    const { location } = get(); // 현재 위치 정보 가져오기
    const { token } = useInfoStore.getState(); // 로그인된 유저의 토큰 가져오기
    const API_URL =
      import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/silverorder/"; // API URL 설정

    if (location.latitude && location.longitude) {
      try {
        // 위치 정보를 바탕으로 API에 요청
        const response = await axios.get(`${API_URL}store/list/near`, {
          headers: { Authorization: `Bearer ${token}` }, // 토큰을 포함하여 요청
          params: {
            latitude: location.latitude, // 위도
            longitude: location.longitude, // 경도
          },
        });
        get().setNearStores(response.data); // 응답 데이터로 주변 가게 정보 저장
      } catch (error) {
        console.error("가게 정보 가져오기 실패:", error); // 오류 처리
      }
    }
  },

  // 지도와 마커를 업데이트하는 함수
  updateMap: () => {
    const { location, mapRef, markerRef, nearStores } = get(); // 상태에서 필요한 값 가져오기
    if (!mapRef || !location.latitude || !location.longitude) return; // 지도나 위치가 없으면 종료

    console.log("지도 중심 설정 위치:", location.latitude, location.longitude); // 새로운 위치 로그

    const newCenter = new window.kakao.maps.LatLng(
      location.latitude,
      location.longitude
    ); // 새로운 위치 객체 생성
    mapRef.setCenter(newCenter); // 지도 중심을 새로운 위치로 설정

    if (markerRef) markerRef.setMap(null); // 기존 마커가 있으면 제거

    // 사용자 위치 마커 생성
    const userMarker = new window.kakao.maps.Marker({
      position: newCenter, // 사용자 위치
      title: "내 위치", // 마커 제목
      image: new window.kakao.maps.MarkerImage(
        human_logo, // 마커 이미지
        new window.kakao.maps.Size(24, 35)
      ),
    });
    get().setMarkerRef(userMarker); // 마커 참조값 저장
    userMarker.setMap(mapRef); // 마커를 지도에 표시

    // 주변 가게 마커를 지도에 표시
    nearStores.forEach((store) => {
      const storePosition = new window.kakao.maps.LatLng(
        store.latitude,
        store.longitude
      ); // 가게 위치 객체 생성
      const storeMarker = new window.kakao.maps.Marker({
        position: storePosition, // 가게 위치
        title: store.storeName, // 가게 이름
        image: new window.kakao.maps.MarkerImage(
          store_logo, // 가게 마커 이미지
          new window.kakao.maps.Size(24, 35)
        ),
      });
      storeMarker.setMap(mapRef); // 가게 마커를 지도에 표시
    });
  },
}));

export default useMapStore;
