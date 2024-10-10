import React, { useState, useEffect } from 'react';
import './ReviewList.css';
import useReviewStore from '../../stores/review';
import Notiflix from 'notiflix';

const CommentModal = ({ isOpen, onClose, onSubmit, commentContent }) => {
    const [comment, setComment] = useState('');

    useEffect(() => {
        if (commentContent) {
            setComment(commentContent); 
        } else {
            setComment('');
        }
    }, [commentContent]);

    const handleSubmit = () => {
        if (!comment) {
            Notiflix.Notify.failure('댓글을 입력해주세요.');
            return;
        }
        onSubmit(comment);
    };

    return isOpen ? (
        <div className="modal-overlay">
            <div className="modal-content1">
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="댓글을 입력하세요..."
                    disabled={commentContent !== null && commentContent.length > 0}
                />
                <div className="modal-actions">
                    {commentContent === null || commentContent === '' ? (
                        <button className="modal-btn submit-btn" onClick={handleSubmit}>
                            댓글 등록
                        </button>
                    ) : (
                        <button className="modal-btn close-btn" onClick={onClose}>
                            닫기
                        </button>
                    )}
                    {commentContent === null || commentContent === '' ? (
                        <button className="modal-btn cancel-btn" onClick={onClose}>
                            취소
                        </button>
                    ) : null}
                </div>
            </div>
        </div>
    ) : null;
};



const ReviewList = () => {
    const [sortOption, setSortOption] = useState('ratingDesc');
    const [filterOption, setFilterOption] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedReview, setSelectedReview] = useState(null); 
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [currentComment, setCurrentComment] = useState(''); 
    const reviewsPerPage = 8;

    const { reviews, fetchReviews, createComment } = useReviewStore(); 

    useEffect(() => {
        const loadReviews = async () => {
            try {
                await fetchReviews();
            } catch (error) {
                Notiflix.Notify.failure('리뷰를 불러오는 중 오류가 발생했습니다.');
            }
        };
        loadReviews();
    }, [fetchReviews]);

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const handleFilterChange = (e) => {
        setFilterOption(e.target.value);
    };

    const sortReviews = (reviews) => {
        if (sortOption === 'ratingAsc') {
            return [...reviews].sort((a, b) => a.rating - b.rating);
        } else if (sortOption === 'ratingDesc') {
            return [...reviews].sort((a, b) => b.rating - a.rating);
        }
        return reviews;
    };

    const filterReviews = (reviews) => {
        if (filterOption === 'all') {
            return reviews;
        }
        return reviews.filter(review => review.productType === filterOption);
    };

    const sortedAndFilteredReviews = filterReviews(sortReviews(reviews));
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = sortedAndFilteredReviews.slice(indexOfFirstReview, indexOfLastReview);

    const totalPages = Math.ceil(sortedAndFilteredReviews.length / reviewsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleCommentClick = (review) => {
        setSelectedReview(review);
        if (review.commentId) {
            
            setCurrentComment(review.commentContent || '');
        } else {
            
            setCurrentComment('');
        }
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedReview(null);
        setCurrentComment(''); 
    };

    const handleCommentSubmit = async (comment) => {
        if (selectedReview) {
            try {
                await createComment(selectedReview.reviewId, comment);
                // Notiflix.Notify.success('댓글이 성공적으로 등록되었습니다.');
                await fetchReviews();
            } catch (error) {
                Notiflix.Notify.failure('댓글 등록에 실패했습니다.');
            }
            handleModalClose();
        }
    };

    const emptyRows = Array(reviewsPerPage - currentReviews.length).fill(null);

    return (
        <div className="center-wrapper">
            <div className="filter-sort-wrapper">
                <select value={sortOption} onChange={handleSortChange}>
                    <option value="ratingDesc">평점 높은 순</option>
                    <option value="ratingAsc">평점 낮은 순</option>
                </select>
                <select value={filterOption} onChange={handleFilterChange}>
                    <option value="all">전체 상품</option>
                </select>
            </div>
            <table className="review-table">
                <thead>
                    <tr>
                        <th>주문 번호</th>
                        <th>리뷰 ID</th>
                        <th>이름</th>
                        <th>코멘트</th>
                        <th>평점</th>
                        <th>댓글 작성일</th>
                        <th>댓글</th>
                    </tr>
                </thead>
                <tbody>
                    {currentReviews.map(review => (
                        <tr key={review.reviewId}>
                            <td>{review.orderId}</td>
                            <td>{review.reviewId}</td>
                            <td>{review.userEmail}</td>
                            <td>{review.content}</td>
                            <td>{review.rating}</td>
                            <td>{review.createdDate ? new Date(review.createdDate).toLocaleDateString() : 'N/A'}</td>
                            <td>
                                <button onClick={() => handleCommentClick(review)}>
                                    {review.commentId ? '댓글 확인' : '댓글 달기'}
                                </button>
                            </td>
                        </tr>
                    ))}
                    {emptyRows.map((_, index) => (
                        <tr key={`empty-${index}`} className="empty-row">
                            <td colSpan="7">&nbsp;</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

           
            <CommentModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onSubmit={handleCommentSubmit}
                commentContent={currentComment}
            />
        </div>
    );
};

export default ReviewList;
