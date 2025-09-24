pipeline {
    agent any

    tools {
        nodejs "NodeJS System"
    }

    environment {
        TOMCAT_USER = "admin1234"
        TOMCAT_PASS = "admin"
        TOMCAT_URL  = "http://localhost:8080/manager/text"
        APP_NAME    = "portfolio"
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
                bat 'npm run build'
            }
        }

        stage('Package WAR') {
            steps {
                // package React build folder as a WAR file
                bat 'jar -cvf portfolio.war -C build .'
            }
        }

        stage('Deploy to Tomcat') {
            steps {
                // undeploy old app
                bat 'curl -u %TOMCAT_USER%:%TOMCAT_PASS% "%TOMCAT_URL%/undeploy?path=/%APP_NAME%" || exit 0'

                // deploy new WAR
                bat 'curl -u %TOMCAT_USER%:%TOMCAT_PASS% -T portfolio.war "%TOMCAT_URL%/deploy?path=/%APP_NAME%"'
            }
        }
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
