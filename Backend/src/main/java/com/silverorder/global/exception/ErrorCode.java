package com.silverorder.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

/**
 * <pre>
 *     Custom 예외 응답을 위한 Enum 클래스
 * </pre>
 * @author 채기훈
 * @since JDK17
 */
@Getter
@AllArgsConstructor
public enum ErrorCode {

    SUCCESS(HttpStatus.OK, "요청 및 응답 성공"),
    WRONG_DATE_FORMAT(HttpStatus.BAD_REQUEST, "잘못된 날짜 형식입니다."),
    WRONG_REQUEST_MAPPING(HttpStatus.BAD_REQUEST,"유효하지 않은 데이터 포맷입니다. 다시 양식에 맞춰 요청해주세요."),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR,"서버 오류 발생"),
    DATABASE_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "데이터베이스 오류가 발생했습니다."),
    BAD_REQUEST(HttpStatus.BAD_REQUEST,"잘못된 요청입니다."),
    DUPLICATE_RESOURCE(HttpStatus.CONFLICT,"중복된 요청입니다"),


    //회원
    USER_NOT_FOUND(HttpStatus.NOT_FOUND,"해당하는 유저를 찾을 수 없습니다"),
    NOT_AUTHENTICATED(HttpStatus.UNAUTHORIZED,"접근 권한이 없습니다. 로그인해주세요"),
    LOGIN_REQUIRED(HttpStatus.UNAUTHORIZED,"로그인이 필요한 서비스입니다."),
    INVALID_TOKEN(HttpStatus.UNAUTHORIZED,"유효하지 않은 토큰입니다. 재로그인 해주세요"),
    DUPLICATE_USEREMAIL(HttpStatus.CONFLICT,"중복된 유저 이메일입니다."),
    WRONG_PASSWORD(HttpStatus.BAD_REQUEST,"비밀번호가 틀렸습니다."),
    BANK_USER_NOT_FOUND(HttpStatus.NOT_FOUND, "SSAFY 금융망에서 해당 회원 조회에 실패하였습니다."),


    //가맹점
    STORE_NOT_FOUND(HttpStatus.NOT_FOUND,"해당하는 가맹점을 찾을 수 없습니다"),
    STORE_NOT_AUTHENTICATED(HttpStatus.UNAUTHORIZED,"가맹점주가 아닙니다"),


    //메뉴
    MENU_CATEGORY_NOT_FOUND(HttpStatus.NOT_FOUND,"해당 메뉴 카테고리를 찾을 수 없습니다"),
    MENU_NOT_FOUND(HttpStatus.NOT_FOUND,"해당 메뉴를 찾을 수 없습니다"),


    //옵션
    OPTION_CATEGORY_NOT_FOUND(HttpStatus.NOT_FOUND,"해당 옵션 카테고리를 찾을 수 없습니다"),


    //파일 관리 오류 코드
    IO_EXCEPTION(HttpStatus.INTERNAL_SERVER_ERROR, "파일 또는 입출력 처리 중 오류가 발생했습니다."),
    NO_FILE(HttpStatus.NOT_FOUND, "업로드할 파일이 없습니다."),
    INVALID_FILE_LINK(HttpStatus.BAD_REQUEST, "올바르지 않은 파일 링크입니다."),

    NO_ELEMENT(HttpStatus.NOT_FOUND,"해당하는 요소가 없습니다."),

    //결제
    CARD_NOT_FOUND(HttpStatus.NOT_FOUND, "등록된 카드를 찾을 수 없습니다."),
    CARD_PAY_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "카드 간편 결제에 실패하였습니다.");


    private HttpStatus status;
    private final String message;
}




