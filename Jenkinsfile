pipeline {
    agent { label 'slave01' }
    stages {
        stage('Lint Code'){
            steps {
                sh '''#!/bin/bash
                    eslint ./code
                '''
            }
        }
        stage('Lint Docker'){
            steps {
                sh '''#!/bin/bash
                    hadolint Dockerfile
                '''
            }
        }
        stage('Build Docker'){
            steps {
                sh '''#!/bin/bash
                    tag=$(git log -1 --format=%h)
                    docker build -t capstone-rest:$tag -t capstone-rest:latest .
                '''
            }
        }
        stage('Upload to Docker'){
            steps {
                sh '''#!/bin/bash
                    dockerpath=turnertechappdeveloper/capstone-rest
                    docker tag $(docker images --filter=reference='capstone-rest:latest' --format "{{.ID}}") $dockerpath
                    docker push $dockerpath
                '''
            }
        }
    }
}