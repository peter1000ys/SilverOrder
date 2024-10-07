pipeline {
    agent any
    
    environment {
        DOCKER_NETWORK = "silverOrder"
        VITE_API_BASE_URL = 'https://j11c202.p.ssafy.io/silverorder/api/'
        SPRING_PROFILES_ACTIVE = 'prod'
        SSAFY_API_KEY = credentials('ssafy-api-key')
        MSSQL_KEY = credentials('mssql-key')
        RABBITMQ_KEY = credentials('rabbitmq-key')
        JUPITER_API_URL = credentials('jupiter-api-url')
        VITE_KAKAO_MAP_API_KEY = credentials('VITE_KAKAO_MAP_API_KEY')
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Backend - Build') {
            steps {
                dir('Backend') {
                    sh 'chmod +x ./gradlew'
                    sh './gradlew clean bootJar'
                    sh 'docker build -t backend:${BUILD_NUMBER} --build-arg SPRING_PROFILES_ACTIVE=${SPRING_PROFILES_ACTIVE} .'
                }
            }
        }
        
        stage('Frontend - Build') {
            parallel {
                stage('Web Version') {
                    agent {
                        docker {
                            image 'node:20'
                            args '-v $HOME/.npm:/root/.npm'
                        }
                    }
                    steps {
                        dir('Frontend/Admin_page/silverOrder') {
                        
                            sh 'node --version'
                            sh 'npm --version'
                            sh 'echo "VITE_API_BASE_URL=${VITE_API_BASE_URL}" > .env'
                            sh 'npm install'
                            sh 'npm run build'
                            
                        }
                    }
                }
                stage('App Version') {
                    agent {
                        docker {
                            image 'node:20'
                            args '-v $HOME/.npm:/root/.npm'
                        }
                    }
                    steps {
                        dir('Frontend/Customer_app/silverorder') {
                            sh 'node --version'
                            sh 'npm --version'
                            sh 'echo "VITE_API_BASE_URL=${VITE_API_BASE_URL}" > .env'
                            sh 'echo "VITE_KAKAO_MAP_API_KEY=${VITE_KAKAO_MAP_API_KEY}" >> .env'
                            sh 'npm install'
                            sh 'npm run build'
                            
                        }
                    }
                }
            }
        }
        
        stage('Frontend - Docker Build and Deploy') {
            parallel {
                stage('Web Version') {
                    steps {
                        dir('Frontend/Admin_page/silverOrder') {
                            sh 'docker build -t frontend-web:${BUILD_NUMBER} --build-arg VITE_API_BASE_URL=${VITE_API_BASE_URL} -f Dockerfile .'
                            sh 'docker stop frontend-web || true'
                            sh 'docker rm frontend-web || true'
                            sh 'docker run -d --name frontend-web --network silverOrder -p 3000:80 frontend-web:${BUILD_NUMBER}'
                        }
                    }
                }
                stage('App Version') {
                    steps {
                        dir('Frontend/Customer_app/silverorder') {
                            sh 'docker build -t frontend-app:${BUILD_NUMBER} --build-arg VITE_API_BASE_URL=${VITE_API_BASE_URL} --build-arg VITE_KAKAO_MAP_API_KEY=${VITE_KAKAO_MAP_API_KEY} -f Dockerfile .'
                            sh 'docker stop frontend-app || true'
                            sh 'docker rm frontend-app || true'
                            sh 'docker run -d --name frontend-app --network silverOrder -p 3001:80 frontend-app:${BUILD_NUMBER}'
                        }
                    }
                }
            }
        }
        
        stage('Backend - Deploy') {
            steps {
                script {
                    sh "docker network create ${DOCKER_NETWORK} || true"
                    
                    sh 'docker stop backend || true'
                    sh 'docker rm backend || true'
                    sh """
                    docker run -d --name backend \
                        --network ${DOCKER_NETWORK} \
                        -p 8080:8080 \
                        -e SPRING_PROFILES_ACTIVE=${SPRING_PROFILES_ACTIVE} \
                        -e SSAFY_API_KEY=${SSAFY_API_KEY} \
                        -e MSSQL_KEY=${MSSQL_KEY} \
                        -e RABBITMQ_KEY=${RABBITMQ_KEY} \
                        -e JUPITER_API_URL=${JUPITER_API_URL} \
                        -e TZ=Asia/Seoul \
                        backend:${BUILD_NUMBER}
                    """
                }
            }
        }
        

    }
    
    post {
        always {
            sh 'docker logs backend || echo "No backend logs available"'
            sh 'docker logs frontend-web || echo "No frontend-web logs available"'
            sh 'docker logs frontend-app || echo "No frontend-app logs available"'
        }
        failure {
            sh 'docker stop backend frontend-web frontend-app || true'
            sh 'docker rm backend frontend-web frontend-app || true'
        }
        cleanup {
            cleanWs()
        }
    }
}
