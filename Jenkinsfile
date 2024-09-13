pipeline {
    agent any
    
    environment {
        DOCKER_NETWORK = "silverOrder"
        VITE_API_BASE_URL = 'https://j11c202.p.ssafy.io/silverorder/'
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
                        dir('Frontend/Admin_page/siverOrder') {
                            sh 'node --version'
                            sh 'npm --version'
                            sh 'npm install'
                            sh 'npm run build'
                            sh 'echo "VITE_API_BASE_URL=${VITE_API_BASE_URL}" > .env'
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
                            sh 'npm install'
                            sh 'npm run build'
                            sh 'echo "VITE_API_BASE_URL=${VITE_API_BASE_URL}" > .env'
                        }
                    }
                }
            }
        }
        
        stage('Frontend - Docker Build and Deploy') {
            parallel {
                stage('Web Version') {
                    steps {
                        dir('Frontend/Admin_page/siverOrder') {
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
                            sh 'docker build -t frontend-app:${BUILD_NUMBER} --build-arg VITE_API_BASE_URL=${VITE_API_BASE_URL} -f Dockerfile .'
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
                        backend:${BUILD_NUMBER}
                    """
                }
            }
        }
        
        stage('Health Check') {
            steps {
                script {
                    sh 'sleep 10'  // 서비스가 완전히 시작될 때까지 대기 시간
                    sh 'curl -f http://localhost:3000 '
                    sh 'curl -f http://localhost:3001 '
                    sh 'curl -f http://localhost:8080 '
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
