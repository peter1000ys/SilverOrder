import "./styles/WatchReview.css";
import { useState, useEffect } from "react";
import useReviewStore from "../../stores/review";

const WatchReview = ({ orderId, onClose }) => {
  const [myReview, setMyReview] = useState({});
  const { fetchSelectedReview } = useReviewStore();

  useEffect(() => {
    const fetchSelectedMyReview = async () => {
      try {
        const response = await fetchSelectedReview(orderId);
        if (response) {
          setMyReview(response);
        } else {
          console.error("해당 주문 리뷰 로딩 실패");
        }
      } catch (error) {
        console.error("로딩 실패", error);
      }
    };

    fetchSelectedMyReview();
  }, [fetchSelectedReview]);

  return (
    <div className="watch-review-overlay">
      <div className="watch-review-container">
        <p className="watch-review-title">내 리뷰 확인하기</p>

        {/* 이미지 미리보기 */}
        <div className="watch-review-image">
          {myReview.reviewThumb ? (
            <img src={myReview.reviewThumb} alt="리뷰 이미지 미리보기" />
          ) : null}
        </div>

        {/* 별점 섹션 */}
        <div className="watch-review-rating">
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className={`watch-review-star ${
                index < myReview.rating ? "filled" : ""
              }`}
            >
              ★
            </span>
          ))}
        </div>

        <div className="watch-review-content">
          <p>{myReview.content}</p>
        </div>

        <div className="watch-review-owner">
          {myReview.commentContent ? (
            <p>{myReview.commentContent}</p>
          ) : (
            <p id="owner-review-none">사장님 댓글이 아직 달리지 않았습니다.</p>
          )}
        </div>

        <div className="watch-review-btns">
          <button className="watch-review-close-btn" onClick={onClose}>
            확 인
          </button>
        </div>
      </div>
    </div>
  );
};

export default WatchReview;
