import "../styles/FindStorePage.css";
import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import useInfoStore from "../stores/infos";
import human_logo from "../img/gps_human.png";
import store_logo from "../img/gps_store.png";

const FindStorePage = () => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    error: null,
  });

  const [mapLoaded, setMapLoaded] = useState(false);
  const [nearStores, setNearStores] = useState([]); // 주변 가게 정보 저장
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const API_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/silverorder/";

  // 위치 정보를 가져오는 함수
  const fetchLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          });
        },
        (error) => {
          setLocation((prev) => ({ ...prev, error: error.message }));
        }
      );
    } else {
      setLocation((prev) => ({
        ...prev,
        error: "이 브라우저에서는 위치 정보를 지원하지 않습니다.",
      }));
    }
  }, []);

  // 지도를 초기화하는 함수
  const initializeMap = useCallback(() => {
    if (!window.kakao || !window.kakao.maps) {
      console.error("Kakao Maps API가 로드되지 않았습니다.");
      return;
    }

    const container = document.getElementById("kakaomap");
    if (!container) {
      console.error("지도를 표시할 div를 찾을 수 없습니다.");
      return;
    }

    const options = {
      center: new window.kakao.maps.LatLng(37.5665, 126.978),
      level: 3,
    };

    try {
      mapRef.current = new window.kakao.maps.Map(container, options);
      setMapLoaded(true);
    } catch (error) {
      console.error("지도 초기화 실패:", error);
    }
  }, []);

  // 주변 가게 정보를 가져오는 함수
  const fetchNearbyStores = useCallback(async () => {
    if (location.latitude && location.longitude) {
      const { token } = useInfoStore.getState();

      const params = {
        latitude: location.latitude,
        longitude: location.longitude,
      };

      try {
        const response = await axios.get(`${API_URL}store/list/near`, {
          headers: {
            Authorization: `Bearer ${token}`, // 수정된 부분
          },
          params: params, // 수정된 부분: GET 요청의 쿼리 파라미터로 데이터 전달
        });
        console.log(response.data);
        setNearStores(response.data); // API 응답에서 가게 정보 저장
      } catch (error) {
        console.error("가게 정보 가져오기 실패:", error);
      }
    }
  }, [location.latitude, location.longitude, API_URL]);

  // 지도를 업데이트하는 함수
  const updateMap = useCallback(() => {
    if (!mapRef.current || !location.latitude || !location.longitude) {
      return;
    }

    const newCenter = new window.kakao.maps.LatLng(
      location.latitude,
      location.longitude
    );
    mapRef.current.setCenter(newCenter);

    // 사용자 위치 마커
    if (markerRef.current) {
      markerRef.current.setMap(null);
    }

    markerRef.current = new window.kakao.maps.Marker({
      position: newCenter,
      title: "내 위치",
      image: new window.kakao.maps.MarkerImage(
        human_logo,
        new window.kakao.maps.Size(24, 35)
      ), // 사용자 마커 이미지
    });
    markerRef.current.setMap(mapRef.current);

    // 주변 가게 마커 표시
    nearStores.forEach((store) => {
      const storePosition = new window.kakao.maps.LatLng(
        store.latitude,
        store.longitude
      ); // 가게의 위도와 경도
      const storeMarker = new window.kakao.maps.Marker({
        position: storePosition,
        title: store.storeName,
        image: new window.kakao.maps.MarkerImage(
          store_logo,
          new window.kakao.maps.Size(24, 35)
        ), // 가게 마커 이미지
      });
      storeMarker.setMap(mapRef.current);
    });
  }, [location, nearStores]);

  // 카카오 맵 API 스크립트 로드 및 초기화
  useEffect(() => {
    const KAKAO_API_KEY = "내 api key";
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        initializeMap();
        fetchLocation(); // 지도가 초기화된 후에 위치 정보를 가져옴
      });
    };

    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [initializeMap, fetchLocation]);

  // 위치 정보와 지도가 로드된 후 가게 정보와 지도를 업데이트
  useEffect(() => {
    if (mapLoaded && location.latitude && location.longitude) {
      fetchNearbyStores(); // 지도 로드 및 위치 설정 완료 시 가게 정보 가져오기
      updateMap(); // 위치 정보와 지도 로드 완료 시 지도 업데이트
    }
  }, [
    mapLoaded,
    location.latitude,
    location.longitude,
    fetchNearbyStores,
    updateMap,
  ]); // 모든 필요한 상태와 함수를 의존성 배열에 추가

  return (
    <div className="map-container">
      <div id="kakaomap"></div>
      <button className="gpsbtn" onClick={fetchLocation}>
        내 위치
      </button>
      {location.error && <p>{location.error}</p>} {/* 에러 메시지 출력 */}
    </div>
  );
};

export default FindStorePage;
