pipeline {
    agent { label 'slave01' }
    stages {
        stage('Lint Code'){
            steps {
                sh '''
                    eslint ./code
                '''
            }
        }
        stage('Lint Docker'){
            steps {
                sh '''
                    hadolint Dockerfile
                '''
            }
        }
        stage('Build Docker'){
            steps {
                sh '''
                    tag=$(git log -1 --format=%h)
                    docker build -t capstone-rest:$tag -t capstone-rest:latest .
                '''
            }
        }
        stage('Upload to Docker'){
            steps {
                sh '''
                    ./upload_docker.sh
                '''
            }
        }
    }
}