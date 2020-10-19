def builderDocker
def CommitHash

pipeline {

    agent any

    parameters {
        booleanParam(name: 'RUNTEST', defaultValue: true, description: 'Toggle this value from testing')
    }

    stages {

        stage('Build Project') {
            steps {
                nodejs("node12") {
                    sh 'npm install'
                }
            }
        }

    stage('ansible for development') {
            when {
                expression {
                    BRANCH_NAME == "deployment"
                }
            }
            steps{
               script {
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'ansible',
                                verbose: false,
                                transfers: [
                                    sshTransfer(
                                        execCommand: 'cd ansible; ansible-playbook -i hosts backend.yml',
                                    )
                                ]
                            )
                        ]
                    )
                }
            }
        }


        stage('ansible for production') {
            when {
                expression {
                    BRANCH_NAME == "production"
                }
            }
            steps{
               script {
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'ansible',
                                verbose: false,
                                transfers: [
                                    sshTransfer(
                                        execCommand: 'cd ansible; ansible-playbook -i hosts backend.yml',
                                    )
                                ]
                            )
                        ]
                    )
                }
            }
        }

        stage('Run Testing production') {
            when {
                expression {
                    BRANCH_NAME == "production"  
                }
            }
            steps{
               script {
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'ansible',
                                verbose: false,
                                transfers: [
                                    sshTransfer(
                                        execCommand: 'cd ansible; ansible backend -a "cd project/backnew; docker-compose -up -d"',
                                        execTimeout: 60000,
                                    )
                                ]
                            )
                        ]
                    )
                }
            }
        } 

        stage('Run Testing') {
            when {
                expression {
                    BRANCH_NAME == "deployment"|| BRANCH_NAME == "production"
                }
            }
            steps{
               script {
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'ansible',
                                verbose: false,
                                transfers: [
                                    sshTransfer(
                                        execCommand: 'ansible dev-server -a "curl localhost:8080"',
                                        execTimeout: 60000,
                                    )
                                ]
                            )
                        ]
                    )
                }
            }
        }



    }
}
