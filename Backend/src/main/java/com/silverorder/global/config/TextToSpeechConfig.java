package com.silverorder.global.config;

import com.google.api.gax.core.FixedCredentialsProvider;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.texttospeech.v1.TextToSpeechClient;
import com.google.cloud.texttospeech.v1.TextToSpeechSettings;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;

import java.io.FileInputStream;
import java.io.IOException;

@Configuration
public class TextToSpeechConfig {

    @Value("${spring.cloud.gcp.credentials.location}")
    private Resource credentialsResource;

    @Bean
    public TextToSpeechClient textToSpeechClient() throws IOException {
        GoogleCredentials credentials = GoogleCredentials.fromStream(
                credentialsResource.getInputStream());

        TextToSpeechSettings settings = TextToSpeechSettings.newBuilder()
                .setCredentialsProvider(FixedCredentialsProvider.create(credentials))
                .build();

        return TextToSpeechClient.create(settings);
    }
}