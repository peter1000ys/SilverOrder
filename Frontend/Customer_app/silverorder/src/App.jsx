import "./App.css";
import { useEffect } from "react";
import PageRoutes from "./routes/PageRoutes";
import UpsideNavbar from "./components/Navbar/UpsideNavbar";
import DownsideNavbar from "./components/Navbar/DownsideNavbar";
import useInfoStore from "./stores/infos";
import useWebSocketStore from "./stores/websocket";

function App() {
  const { isLogin } = useInfoStore();
  const { connect, disconnect } = useWebSocketStore();

  useEffect(() => {
    // 앱이 처음 실행될 때 WebSocket 연결
    connect();

    // 컴포넌트가 언마운트될 때 WebSocket 연결 해제
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  if (!isLogin) {
    return (
      <div id="app-container">
        <div className="scrollable-content">
          <PageRoutes />
        </div>
      </div>
    );
  }

  return (
    <div id="app-container">
      <div className="fixed-top">
        <UpsideNavbar />
      </div>
      <div className="scrollable-content">
        <PageRoutes />
      </div>
      <div className="fixed-bottom">
        <DownsideNavbar />
      </div>
    </div>
  );
}

export default App;
