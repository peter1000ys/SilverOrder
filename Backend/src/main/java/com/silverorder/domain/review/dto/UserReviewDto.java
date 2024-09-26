<<<<<<< HEAD
package com.silverorder.domain.review.dto;public class UserReviewDto {
=======
package com.silverorder.domain.review.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserReviewDto {
    private String content;
    private int rating;
    private Long orderId;
    private String reviewThumb;
>>>>>>> 4507837 (Feat: GCS 파일 관리 완료 #S11P21C202-113 #done)
}
