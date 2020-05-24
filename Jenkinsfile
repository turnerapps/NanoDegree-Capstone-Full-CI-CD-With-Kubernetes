pipeline {
    agent { label 'slave01' }
    stages {
        stage('Lint Code'){
            when {
                branch 'dev'
            }
            steps {
                sh '''#!/bin/bash
                    eslint ./code
                '''
            }
        }
        stage('Lint Docker'){
            when {
                branch 'dev'
            }            
            steps {
                sh '''#!/bin/bash
                    hadolint Dockerfile
                '''
            }
        }
        stage('Build Docker Dev'){
            when {
                branch 'dev'
            }
            steps {
                sh '''#!/bin/bash
                    tag=$(git log -1 --format=%h)
                    docker build -t capstone-rest:$tag -t capstone-rest:dev .
                '''
            }
        }
        stage('Build Docker Prod'){
            when {
                branch 'prod'
            }
            steps {
                sh '''#!/bin/bash
                    tag=$(git log -1 --format=%h)
                    docker build -t capstone-rest:$tag -t capstone-rest:latest .
                '''
            }
        }        
        stage('Upload to Docker Dev'){
            when {
                branch 'dev'
            }
            steps {
                sh '''#!/bin/bash
                    dockerpath=turnertechappdeveloper/capstone-rest:dev
                    docker tag $(docker images --filter=reference='capstone-rest:dev' --format "{{.ID}}") $dockerpath
                    docker push $dockerpath
                '''
            }
        }
        stage('Upload to Docker Prod'){
            when {
                branch 'prod'
            }
            steps {
                sh '''#!/bin/bash
                    dockerpath=turnertechappdeveloper/capstone-rest:latest
                    docker tag $(docker images --filter=reference='capstone-rest:latest' --format "{{.ID}}") $dockerpath
                    docker push $dockerpath
                '''
            }
        }
        stage('Update Dev Kubernetes') {
            when {
                branch 'dev'
            }
            steps {
                sh '''#!/bin/bash
                    kubectl set image pod/rest-dev rest-dev=turnertechappdeveloper/capstone-rest:dev
                '''
                sh '''kubectl describe pod rest-dev'''
            }
        }
        stage('Update Prod Kubernetes') {
            when {
                branch 'prod'
            }
            steps {
                sh '''#!/bin/bash
                    kubectl set image pod/rest-dev rest-dev=turnertechappdeveloper/capstone-rest:latest                '''
                sh '''kubectl describe pod rest-prod'''
            }
        }        
    }
}