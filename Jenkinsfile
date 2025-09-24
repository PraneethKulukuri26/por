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

                // create WEB-INF folder and web.xml inside build
                bat '''
                mkdir build\\WEB-INF
                echo ^<?xml version="1.0" encoding="UTF-8"?^> > build\\WEB-INF\\web.xml
                echo ^<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd" version="3.1"^> >> build\\WEB-INF\\web.xml
                echo ^<welcome-file-list^> >> build\\WEB-INF\\web.xml
                echo ^<welcome-file^>index.html^</welcome-file^> >> build\\WEB-INF\\web.xml
                echo ^</welcome-file-list^> >> build\\WEB-INF\\web.xml
                echo ^</web-app^> >> build\\WEB-INF\\web.xml
                '''

                // copy build folder to Tomcat
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
