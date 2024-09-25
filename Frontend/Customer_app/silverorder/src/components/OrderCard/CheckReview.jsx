import "./styles/CheckReview.css";

const CheckReview = ({ orderId, onClose }) => {
  const handleReviewResult = () => {
    onClose();
  };

  return (
    <div className="review-overlay">
      <div className="review-container">
        <p>리뷰 작성하기</p>
        <div className="review-btns">
          <button className="review-write-btn" onClick={handleReviewResult}>
            완료
          </button>
          <button className="review-cancel-btn" onClick={onClose}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckReview;
