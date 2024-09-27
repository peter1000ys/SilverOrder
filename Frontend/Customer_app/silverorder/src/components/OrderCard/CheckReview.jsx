import "./styles/CheckReview.css";
import { useState } from "react";
import useReviewStore from "../../stores/review";

const CheckReview = ({ orderId, onClose }) => {
  const [content, setContent] = useState("");
  const [reviewThumb, setReviewThumb] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [rating, setRating] = useState(0); // 별점 상태
  const { sendReviewRequest } = useReviewStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImgFile(file);
      setReviewThumb(URL.createObjectURL(file));
    }
  };

  const handleReviewResult = async () => {
    if (!content.trim()) {
      alert("리뷰 내용을 입력하세요.");
      return;
    }
    if (rating === 0) {
      alert("별점을 선택하세요.");
      return;
    }

    console.log(imgFile);

    const result = await sendReviewRequest(orderId, content, imgFile, rating);

    if (result === true) {
      alert("리뷰 작성이 완료되었습니다.");
    } else {
      console.error("리뷰 작성에 실패했습니다.");
    }

    onClose();
  };

  // 별 클릭 핸들러
  const handleRatingClick = (index) => {
    setRating(index + 1); // 클릭한 별의 인덱스 + 1로 별점 갱신
  };

  return (
    <div className="review-overlay">
      <div className="review-container">
        <p className="review-title">리뷰 작성하기</p>

        {/* 이미지 미리보기 */}
        {reviewThumb ? (
          <div className="review-image-preview">
            <img src={reviewThumb} alt="리뷰 이미지 미리보기" />
          </div>
        ) : null}

        {/* 이미지를 업로드하는 부분 */}
        <label htmlFor="file-upload" className="custom-file-upload">
          사진 올리기
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden-file-input"
        />

        {/* 별점 섹션 */}
        <div className="review-rating">
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className={`review-star ${index < rating ? "filled" : ""}`}
              onClick={() => handleRatingClick(index)}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          className="review-input"
          value={content}
          onChange={(e) => setContent(e.target.value)}
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
