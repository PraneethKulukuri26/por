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
                bat 'set CI=false && npm run build'
            }
        }

        stage('Deploy to Tomcat') {
            steps {
                // remove old deployment if exists
                bat "rmdir /S /Q \"%TOMCAT_PATH%\""

                // copy new build folder
                bat "xcopy /E /I /Y build \"%TOMCAT_PATH%\""
            }
        }

        // stage('Restart Tomcat') {
        //     steps {
        //         // Restart Tomcat Windows service (adjust service name if different)
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
