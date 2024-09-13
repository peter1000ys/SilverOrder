pipeline {
    agent any
    
    
    environment {
        DOCKER_NETWORK = "silverOrder"
        VITE_API_BASE_URL = 'https://j11c202.p.ssafy.io/studycow/'
        SPRING_PROFILES_ACTIVE = 'prod'
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Backend - Build') {
            steps {
                dir('backend') {
                    sh 'chmod +x ./gradlew'
                    sh './gradlew clean bootJar'
                    sh 'docker build -t backend:${BUILD_NUMBER} --build-arg SPRING_PROFILES_ACTIVE=${SPRING_PROFILES_ACTIVE} .'
                }
            }
        }
        
        stage('Frontend - Build and Deploy') {
            steps {
                dir('studycow') {
                    sh 'npm install'
                    sh 'npm run build'
                    sh 'ls -la build'
                    sh 'cat build/index.html || echo "index.html not found"'
                    sh 'echo "VITE_API_BASE_URL=${VITE_API_BASE_URL}" > .env'  
                    sh 'docker build -t frontend:${BUILD_NUMBER} --build-arg VITE_API_BASE_URL=${VITE_API_BASE_URL} .'
                    
                    sh 'docker stop frontend || true'
                    sh 'docker rm frontend || true'
                    sh 'docker run -d --name frontend --network studycow_network -p 3000:80 frontend:${BUILD_NUMBER}'
                    sh 'docker cp frontend:/usr/share/nginx/html ./nginx-content'
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
                        backend:${BUILD_NUMBER}
                    """
                }
            }
        }
        
        stage('Health Check') {
            steps {
                script {
                    sh 'sleep 7'  // 서비스가 완전히 시작될 때까지 대기 시간
                }
            }
        }
    }
    
    post {
        always {
            sh 'docker logs backend || echo "No backend logs available"'
            sh 'docker logs frontend || echo "No frontend logs available"'
        }
        failure {
            sh 'docker stop backend frontend || true'
            sh 'docker rm backend frontend || true'
        }
        cleanup {
            cleanWs()
        }
    }
}
