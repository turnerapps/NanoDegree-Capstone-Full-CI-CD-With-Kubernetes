pipeline {
    agent { label 'slave01' }
    stages {
        stage('Set Build Number') {
            steps {
                script {
                    BUILD_VERSION_GENERATED = VersionNumber(
                        versionNumberString: '${BUILDS_ALL_TIME, X}-${BRANCH_NAME}',
                        projectStartDate:    '2020-05-22',
                        skipFailedBuilds:    true)
                    currentBuild.displayName = BUILD_VERSION_GENERATED
                    deployment_name="capstone-${BRANCH_NAME}"
                    dockerpath="turnertechappdeveloper/capstone-rest:${currentBuild.displayName}"
                }
                echo currentBuild.displayName
                echo pod_name
            }
        }
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
        stage('Build Docker'){
            steps {
                sh "docker build -t capstone-rest:${currentBuild.displayName} ."
            }
        }
        stage('Upload to Docker'){
            steps {
                sh """#!/bin/bash
                    docker tag \$(docker images --filter=reference='capstone-rest:${currentBuild.displayName}' --format "{{.ID}}") ${dockerpath}
                    docker push ${dockerpath}
                """
            }
        }
        stage('Update Kubernetes') {
            steps {
                sh """#!/bin/bash
                    kubectl get deployment
                    kubectl set image deployment/capstone-${BRANCH_NAME} capstone-rest=capstone-rest:${currentBuild.displayName}
                    kubectl rollout status deployment capstone-${BRANCH_NAME}
                    sleep 60
                    kubectl get deployment capstone-${BRANCH_NAME}
                """
            }
        }
    }
}