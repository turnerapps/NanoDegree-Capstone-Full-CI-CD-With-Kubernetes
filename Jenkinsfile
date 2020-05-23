pipeline {
    agent { label 'slave01' }
    stages {
        stage('Lint Code'){
            steps {
                eslint ./code
            }
        }
        stage('Lint Docker'){
            steps {
                hadolint Dockerfile
            }
        }
        stage('Build Docker'){
            steps {
                tag=$(git log -1 --format=%h)
                docker build -t capstone-rest:$tag -t capstone-rest:latest .
            }
        }
        stage('Upload to Docker'){
            steps {
                ./upload_docker.sh
            }
        }
    }
}