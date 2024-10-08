import { create } from "zustand";
import axios from "axios";
import useInfoStore from "./infos"; // 토큰을 가져오기 위한 기존 Zustand 스토어
import human_logo from "../img/gps_human.png"; // 사용자 마커 이미지
import store_logo from "../img/gps_store.png"; // 가게 마커 이미지

// Zustand 스토어 정의
const useMapStore = create((set, get) => ({
  location: {
    latitude: null,
    longitude: null,
    error: null,
  },
  mapLoaded: false,
  nearStores: [],
  mapRef: null,
  markerRef: null,
  infowindow: null, // 정보 창 참조 추가

  // 위치 상태 업데이트 함수
  setLocation: (newLocation) =>
    set((state) => ({ location: { ...state.location, ...newLocation } })),
  setMapLoaded: (status) => set({ mapLoaded: status }),
  setNearStores: (stores) => set({ nearStores: stores }),
  setMapRef: (map) => set({ mapRef: map }),
  setMarkerRef: (marker) => set({ markerRef: marker }),

  // 정보 창 참조 설정 함수 추가
  setInfowindow: (infowindow) => set({ infowindow }), // 정보 창 참조 저장

  fetchLocation: () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          get().setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          });

          get().updateMap();
        },
        (error) => {
          get().setLocation({ error: error.message });
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      get().setLocation({
        error: "이 브라우저는 위치 정보를 지원하지 않습니다.",
      });
    }
  },

  initializeMap: () => {
    if (!window.kakao || !window.kakao.maps) {
      console.error("Kakao Maps API가 로드되지 않았습니다.");
      return;
    }
    const container = document.getElementById("kakaomap");
    const options = {
      center: new window.kakao.maps.LatLng(37.5665, 126.978),
      level: 3,
    };
    const map = new window.kakao.maps.Map(container, options);
    get().setMapRef(map);
    get().setMapLoaded(true);
  },

  fetchNearbyStores: async () => {
    const { location } = get();
    const { token } = useInfoStore.getState();
    const API_URL =
      import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/silverorder/";

    if (location.latitude && location.longitude) {
      try {
        const response = await axios.get(`${API_URL}store/list/near`, {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            latitude: location.latitude,
            longitude: location.longitude,
          },
        });
        get().setNearStores(response.data);
      } catch (error) {
        console.error("가게 정보 가져오기 실패:", error);
      }
    }
  },

  updateMap: () => {
    const { location, mapRef, markerRef, nearStores, infowindow } = get();
    if (!mapRef || !location.latitude || !location.longitude) return;

    const newCenter = new window.kakao.maps.LatLng(
      location.latitude,
      location.longitude
    );
    mapRef.setCenter(newCenter);

    if (markerRef) markerRef.setMap(null);

    const userMarker = new window.kakao.maps.Marker({
      position: newCenter,
      title: "내 위치",
      image: new window.kakao.maps.MarkerImage(
        human_logo,
        new window.kakao.maps.Size(24, 35)
      ),
    });
    get().setMarkerRef(userMarker);
    userMarker.setMap(mapRef);

    if (infowindow) infowindow.close();

    const newInfowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
    get().setInfowindow(newInfowindow); // 정보 창 설정

    nearStores.forEach((store) => {
      const storePosition = new window.kakao.maps.LatLng(
        store.latitude,
        store.longitude
      );

      const storeMarker = new window.kakao.maps.Marker({
        position: storePosition,
        title: store.storeName,
        image: new window.kakao.maps.MarkerImage(
          store_logo,
          new window.kakao.maps.Size(24, 35)
        ),
      });
      storeMarker.setMap(mapRef);

      window.kakao.maps.event.addListener(storeMarker, "click", () => {
        newInfowindow.setContent(
          `<div class="store-info-window">${store.storeName}</div>`
        );
        newInfowindow.open(mapRef, storeMarker);
        set({ selectedStoreName: store.storeName });
      });
    });
  },
}));

export default useMapStore;
