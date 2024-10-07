import React, { useEffect } from "react";
import useMapStore from "../stores/map"; // Zustand 스토어 가져오기
import "../styles/FindStorePage.css"; // 스타일 시트 가져오기

const FindStorePage = () => {
  const {
    location, // 현재 위치 상태 (위도, 경도)
    mapLoaded, // 지도 로드 여부 상태
    fetchLocation, // 현재 위치를 가져오는 함수
    initializeMap, // Kakao 지도를 초기화하는 함수
    fetchNearbyStores, // 주변 가게 정보를 API로 가져오는 함수
    updateMap, // 지도를 업데이트하는 함수
  } = useMapStore(); // Zustand 스토어에서 필요한 상태와 함수들을 가져옴

  const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_MAP_API_KEY; // Kakao API 키

  // Kakao 지도 API를 로드하고 지도 초기화
  useEffect(() => {
    const script = document.createElement("script"); // 스크립트 태그 생성
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&autoload=false`; // Kakao 지도 API 스크립트 로드
    script.async = true; // 비동기 로드 설정

    script.onload = () => {
      window.kakao.maps.load(() => {
        initializeMap(); // 지도 초기화 함수 호출
        fetchLocation(); // 현재 위치 가져오는 함수 호출
      });
    };

    document.head.appendChild(script); // 스크립트를 문서의 head에 추가
    return () => {
      document.head.removeChild(script); // 컴포넌트 언마운트 시 스크립트 제거
    };
  }, [initializeMap, fetchLocation]); // 의존성 배열에 초기화 함수들을 추가하여, 첫 렌더 시 실행

  // 위치 정보가 설정되고 지도가 로드되면 가게 정보와 지도를 업데이트
  useEffect(() => {
    if (mapLoaded && location.latitude && location.longitude) {
      console.log(
        "지도 로드 및 위치 업데이트:",
        location.latitude,
        location.longitude
      ); // 현재 위치 확인 로그 출력
      fetchNearbyStores(); // 주변 가게 정보 가져오는 함수 호출
      updateMap(); // 지도 업데이트 함수 호출
    }
  }, [
    mapLoaded,
    location.latitude,
    location.longitude,
    fetchNearbyStores,
    updateMap,
  ]); // 의존성 배열에 상태와 함수 추가

  return (
    <div className="map-container">
      <div id="kakaomap"></div> {/* Kakao 지도 표시 영역 */}
      <button className="gpsbtn" onClick={fetchLocation}>
        내 위치
      </button>{" "}
      {/* "내 위치" 버튼 클릭 시 fetchLocation 함수 호출 */}
      {location.error && <p>{location.error}</p>}{" "}
      {/* 오류 발생 시 오류 메시지 출력 */}
    </div>
  );
};

export default FindStorePage;
