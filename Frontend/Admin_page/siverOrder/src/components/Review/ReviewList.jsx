import React, { useState } from 'react';
import './ReviewList.css';

const ReviewList = () => {
    const [reviews, setReviews] = useState([
        { id: 1, productName: 'test 상품', productType: '음료', reviewer: '도미노', comment: '빠른 배송 감사합니다~', rating: 5, confirmed: true, orderDate: new Date('2024-09-15') },
        { id: 2, productName: 'test 상품', productType: '디저트', reviewer: '도미노', comment: '불만족 합니다.', rating: 4, confirmed: false, orderDate: new Date('2024-09-14') },
        { id: 3, productName: 'test 상품', productType: '음료', reviewer: '최고관리자', comment: '괜찮은 것 같아요', rating: 4, confirmed: false, orderDate: new Date('2024-09-13') },
        { id: 4, productName: 'test 상품', productType: '디저트', reviewer: '테스트', comment: '만족합니다.', rating: 3, confirmed: false, orderDate: new Date('2024-09-12') },
        { id: 5, productName: 'test 상품', productType: '음료', reviewer: '도미노', comment: '빠른 배송 감사합니다~', rating: 4, confirmed: true, orderDate: new Date('2024-09-11') },
        { id: 6, productName: 'test 상품', productType: '디저트', reviewer: '도미노', comment: '불만족 합니다.', rating: 1, confirmed: false, orderDate: new Date('2024-09-10') },
        { id: 7, productName: 'test 상품', productType: '음료', reviewer: '최고관리자', comment: '괜찮은 것 같아요', rating: 5, confirmed: false, orderDate: new Date('2024-09-09') },
        { id: 8, productName: 'test 상품', productType: '디저트', reviewer: '테스트', comment: '만족합니다.', rating: 4, confirmed: false, orderDate: new Date('2024-09-08') },
        { id: 9, productName: 'test 상품', productType: '음료', reviewer: '도미노', comment: '빠른 배송 감사합니다~', rating: 5, confirmed: true, orderDate: new Date('2024-09-15') },
        { id: 10, productName: 'test 상품', productType: '디저트', reviewer: '도미노', comment: '불만족 합니다.', rating: 4, confirmed: false, orderDate: new Date('2024-09-14') },
        { id: 11, productName: 'test 상품', productType: '음료', reviewer: '최고관리자', comment: '괜찮은 것 같아요', rating: 4, confirmed: false, orderDate: new Date('2024-09-13') },
        { id: 12, productName: 'test 상품', productType: '디저트', reviewer: '테스트', comment: '만족합니다.', rating: 3, confirmed: false, orderDate: new Date('2024-09-12') },
        { id: 13, productName: 'test 상품', productType: '음료', reviewer: '도미노', comment: '빠른 배송 감사합니다~', rating: 4, confirmed: true, orderDate: new Date('2024-09-11') },
    ]);

    const [sortOption, setSortOption] = useState('ratingDesc');
    const [filterOption, setFilterOption] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 8;

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const handleFilterChange = (e) => {
        setFilterOption(e.target.value);
    };

    const handleConfirmationChange = (id) => {
        setReviews(prevReviews =>
            prevReviews.map(review =>
                review.id === id ? { ...review, confirmed: !review.confirmed } : review
            )
        );
    };

    const sortReviews = (reviews) => {
        if (sortOption === 'ratingAsc') {
            return [...reviews].sort((a, b) => a.rating - b.rating);
        } else if (sortOption === 'ratingDesc') {
            return [...reviews].sort((a, b) => b.rating - a.rating);
        } else if (sortOption === 'orderDateDesc') {
            return [...reviews].sort((a, b) => b.orderDate - a.orderDate);
        }
        return reviews;
    };

    const filterReviews = (reviews) => {
        if (filterOption === 'all') {
            return reviews;
        }
        return reviews.filter(review => review.productType === filterOption);
    };

    // Pagination logic
    const sortedAndFilteredReviews = filterReviews(sortReviews(reviews));
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = sortedAndFilteredReviews.slice(indexOfFirstReview, indexOfLastReview);

    const totalPages = Math.ceil(sortedAndFilteredReviews.length / reviewsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Fill remaining rows if there are fewer than reviewsPerPage on the current page
    const emptyRows = Array(reviewsPerPage - currentReviews.length).fill(null);

    return (
        <div className="center-wrapper">
            <div className="filter-sort-wrapper">
                <select value={sortOption} onChange={handleSortChange}>
                    <option value="ratingDesc">평점 높은 순</option>
                    <option value="ratingAsc">평점 낮은 순</option>
                    <option value="orderDateDesc">작성일 최신 순</option>
                </select>
                <select value={filterOption} onChange={handleFilterChange}>
                    <option value="all">전체 상품</option>
                    <option value="음료">음료</option>
                    <option value="디저트">디저트</option>
                </select>
            </div>
            <table className="review-table">
                <thead>
                    <tr>
                        <th>상품명</th>
                        <th>이름</th>
                        <th>코멘트</th>
                        <th>평점</th>
                        <th>작성일</th>
                        <th>본문 확인</th>
                    </tr>
                </thead>
                <tbody>
                    {currentReviews.map(review => (
                        <tr key={review.id}>
                            <td>{review.productName}</td>
                            <td>{review.reviewer}</td>
                            <td>{review.comment}</td>
                            <td>{review.rating}</td>
                            <td>{review.orderDate.toLocaleDateString()}</td>
                            <td>
                                <button>본문</button>
                            </td>
                        </tr>
                    ))}
                    {emptyRows.map((_, index) => (
                        <tr key={`empty-${index}`} className="empty-row">
                            <td colSpan="8">&nbsp;</td>
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
        </div>
    );
};

export default ReviewList;
