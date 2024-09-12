import "../styles/FindStorePage.css";
import React, { useState, useEffect, useRef, useCallback } from "react";

const FindStorePage = () => {
  // 사용자 위치 정보 (위도, 경도, 오류 메시지) 저장을 위한 상태 변수
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    error: null,
  });

  // 지도가 로드되었는지 여부를 관리하는 상태 변수
  const [mapLoaded, setMapLoaded] = useState(false);

  // 지도를 참조하기 위한 Ref
  const mapRef = useRef(null);

  // 지도에 표시할 마커를 참조하기 위한 Ref
  const markerRef = useRef(null);

  // 사용자의 위치 정보를 가져오는 함수
  const fetchLocation = useCallback(() => {
    // 브라우저에서 위치 정보 API를 지원하는지 확인
    if (navigator.geolocation) {
      // 위치 정보를 가져오는 API 호출
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // 위치 정보를 성공적으로 가져왔을 때 실행
          console.log("위치 정보 가져옴:", position.coords);
          setLocation({
            latitude: position.coords.latitude, // 위도 설정
            longitude: position.coords.longitude, // 경도 설정
            error: null, // 오류 없음
          });
        },
        (error) => {
          // 위치 정보를 가져오는 데 실패했을 때 실행
          console.error("위치 정보 가져오기 실패:", error);
          setLocation((prev) => ({ ...prev, error: error.message })); // 오류 메시지 저장
        }
      );
    } else {
      // 위치 정보 API를 지원하지 않는 경우
      console.error("Geolocation이 지원되지 않음");
      setLocation((prev) => ({
        ...prev,
        error: "이 브라우저에서는 위치 정보를 지원하지 않습니다.",
      }));
    }
  }, []);

  // 지도를 초기화하는 함수
  const initializeMap = useCallback(() => {
    // Kakao Maps API가 로드되었는지 확인
    if (!window.kakao || !window.kakao.maps) {
      console.error("Kakao Maps API가 로드되지 않았습니다.");
      return;
    }

    // 지도를 표시할 div 요소 찾기
    const container = document.getElementById("kakaomap");
    if (!container) {
      console.error("지도를 표시할 div를 찾을 수 없습니다.");
      return;
    }

    // 지도 초기화 옵션 설정 (기본 중심 좌표는 서울, 확대 레벨은 3)
    const options = {
      center: new window.kakao.maps.LatLng(37.5665, 126.978),
      level: 3,
    };

    try {
      // Kakao Maps API를 사용해 지도 생성
      mapRef.current = new window.kakao.maps.Map(container, options);
      console.log("지도 초기화 성공");
      setMapLoaded(true); // 지도 로드 완료 상태 설정
    } catch (error) {
      console.error("지도 초기화 실패:", error);
    }
  }, []);

  // 지도에 마커를 표시하고 위치를 업데이트하는 함수
  const updateMap = useCallback(() => {
    // 지도 객체와 위치 정보가 있는지 확인
    if (!mapRef.current || !location.latitude || !location.longitude) {
      console.log("지도 업데이트 불가: 지도 또는 위치 정보 없음");
      return;
    }

    // 새로운 위치로 지도의 중심 좌표 설정
    const newCenter = new window.kakao.maps.LatLng(
      location.latitude,
      location.longitude
    );
    mapRef.current.setCenter(newCenter); // 지도의 중심을 사용자 위치로 변경

    // 이전에 표시된 마커가 있으면 삭제
    if (markerRef.current) {
      markerRef.current.setMap(null);
    }

    // 새로운 마커 생성 및 지도에 표시
    markerRef.current = new window.kakao.maps.Marker({
      position: newCenter,
    });
    markerRef.current.setMap(mapRef.current);
    console.log("지도 업데이트 완료");
  }, [location]);

  // 컴포넌트가 처음 렌더링될 때 Kakao Maps API 스크립트를 동적으로 로드
  useEffect(() => {
    const KAKAO_API_KEY = "내 카카오 API 키"; // Kakao API 키 설정
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&autoload=false`;
    script.async = true;

    // 스크립트가 로드되면 Kakao Maps API를 초기화하고 위치 정보 가져오기 시작
    script.onload = () => {
      console.log("Kakao Maps API 스크립트 로드 완료");
      window.kakao.maps.load(() => {
        console.log("Kakao Maps SDK 로드 완료");
        initializeMap(); // 지도 초기화
        fetchLocation(); // 위치 정보 가져오기
      });
    };

    document.head.appendChild(script); // 스크립트를 HTML <head>에 추가

    // 컴포넌트가 언마운트될 때 스크립트를 제거
    return () => {
      document.head.removeChild(script);
    };
  }, [initializeMap, fetchLocation]);

  // 위치 정보가 업데이트되거나 지도가 로드되었을 때 지도를 업데이트
  useEffect(() => {
    if (mapLoaded) {
      updateMap();
    }
  }, [location, mapLoaded, updateMap]);

  return (
    <div className="map-container">
      {/* Kakao 지도 표시 영역 */}
      <div id="kakaomap"></div>

      {/* GPS 버튼 클릭 시 위치 정보 다시 가져오기 */}
      <button className="gpsbtn" onClick={fetchLocation}>
        내 위치
      </button>
    </div>
  );
};

export default FindStorePage;
