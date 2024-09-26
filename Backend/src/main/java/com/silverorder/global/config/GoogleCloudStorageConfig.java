package com.silverorder.global.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;

/**
 * <pre>
 *  Google Cloud Storage 사용을 위한 Configuration 클래스
 * </pre>
 *
 * @author 박봉균
 * @since JDK17
 */
@Configuration
public class GoogleCloudStorageConfig {

    @Bean
    public Storage storage() throws IOException {
        ClassPathResource resource = new ClassPathResource("keystore/silver-order-8bf9ace6e13d.json");
        GoogleCredentials credentials = GoogleCredentials.fromStream(resource.getInputStream());
        String projectId = "silver-order";
        return StorageOptions.newBuilder()
                .setProjectId(projectId)
                .setCredentials(credentials)
                .build()
                .getService();
    }

}
