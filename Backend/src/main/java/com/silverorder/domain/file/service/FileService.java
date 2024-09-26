package com.silverorder.domain.file.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * <pre>
 *  GCS 파일 관리 서비스 인터페이스
 * </pre>
 *
 * @author 박봉균
 * @since JDK17 Eclipse Temurin
 */
public interface FileService {
    /** 파일 업로드 */
    String uploadFile(MultipartFile file) throws IOException;

    /** 파일 삭제 */
    void deleteFile(String fileLink) throws RuntimeException;

}
