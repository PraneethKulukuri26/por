pipeline {
    agent any

    tools {
        nodejs "NodeJS System"
    }

    environment {
        TOMCAT_PATH = "C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\portfolio"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master',
                    url: 'https://github.com/PraneethKulukuri26/por.git'
            }
        }

        stage('Install dependencies') {
            steps {
                bat 'npm install --legacy-peer-deps'
            }
        }

        stage('Build React app') {
            steps {
                bat 'set CI=false\nnpm run build'
            }
        }

        stage('Deploy to Tomcat') {
            steps {
                // remove old deployment if exists
                bat 'if exist "%TOMCAT_PATH%" rmdir /S /Q "%TOMCAT_PATH%"'

                // copy new build folder
                bat 'xcopy /E /I /Y build "%TOMCAT_PATH%"'
            }
        }

        // Uncomment if you want to restart Tomcat service
        // stage('Restart Tomcat') {
        //     steps {
        //         bat 'net stop Tomcat9'
        //         bat 'net start Tomcat9'
        //     }
        // }
    }

    post {
        success {
            echo "✅ Deployment successful! Visit http://localhost:8080/portfolio/"
        }
        failure {
            echo "❌ Deployment failed. Check logs."
        }
    }
}
