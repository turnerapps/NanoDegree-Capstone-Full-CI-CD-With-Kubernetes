pipeline {
    agent { label 'slave01' }
    stages {
        stage('Lint Code'){
            steps {
                bash '''
                    eslint ./code
                '''
            }
        }
        stage('Lint Docker'){
            steps {
                bash '''
                    hadolint Dockerfile
                '''
            }
        }
        stage('Build Docker'){
            steps {
                bash '''
                    tag=$(git log -1 --format=%h)
                    docker build -t capstone-rest:$tag -t capstone-rest:latest .
                '''
            }
        }
        stage('Upload to Docker'){
            steps {
                bash '''
                    ./upload_docker.sh
                '''
            }
        }
    }
}