import "./styles/CheckReview.css";
import { useState } from "react";

const CheckReview = ({ orderId, onClose }) => {
  const [review, setReview] = useState("");

  const handleReviewResult = () => {
    console.log(review);
    onClose();
  };

  return (
    <div className="review-overlay">
      <div className="review-container">
        <p className="review-title">리뷰 작성하기</p>
        <textarea
          className="review-input"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="여기에 작성해주세요"
        ></textarea>
        <div className="review-btns">
          <button className="review-write-btn" onClick={handleReviewResult}>
            완 료
          </button>
          <button className="review-cancel-btn" onClick={onClose}>
            취 소
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckReview;
