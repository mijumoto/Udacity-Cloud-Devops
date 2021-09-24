[![CircleCI](https://circleci.com/gh/mijumoto/nextjs-blog/tree/master.svg?style=svg)](https://circleci.com/gh/mijumoto/nextjs-blog/tree/master)

# Udacity Devops nanodegree Capstone project

In this project you will apply the skills and knowledge which were developed throughout the Cloud DevOps Nanodegree program. These include:

Working in AWS
Using Jenkins or Circle CI to implement Continuous Integration and Continuous Deployment
Building pipelines
Working with Ansible and CloudFormation to deploy clusters
Building Kubernetes clusters
Building Docker containers in pipelines
As a capstone project, the directions are rather more open-ended than they were in the previous projects in the program. You will also be able to make some of your own choices in this capstone, for the type of deployment you implement, which services you will use, and the nature of the application you develop.

You will develop a CI/CD pipeline for micro services applications with either blue/green deployment or rolling deployment. You will also develop your Continuous Integration steps as you see fit, but must at least include typographical checking (aka “linting”). To make your project stand out, you may also choose to implement other checks such as security scanning, performance testing, integration testing, etc.!

Once you have completed your Continuous Integration you will set up Continuous Deployment, which will include:

Pushing the built Docker container(s) to the Docker repository (you can use AWS ECR, create your own custom Registry within your cluster, or another 3rd party Docker repository) ; and
Deploying these Docker container(s) to a small Kubernetes cluster. For your Kubernetes cluster you can either use AWS Kubernetes as a Service, or build your own Kubernetes cluster. To deploy your Kubernetes cluster, use either Ansible or Cloudformation. Preferably, run these from within Jenkins or Circle CI as an independent pipeline.

## About the App

The app is a NextJs blog that has two posts.

## Pipeline steps

The following diagram shows all the steps of our pipeline. Our pipelines runs on CircleCI and deploys a docker image with the app that it is setup on a Kubernettes cluster deployed with eksctl.

Pipeline:
![Alt text](/deliverables/pipeline.png?raw=true "Title")

### Build

The build step is kicked off by a new commit to master. CircleCI is the continous integration tool for this project.

### Configure environment variables on CircleCI

CircleCI env vars

| Variable                 | Description                                                                                                                                                     |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `APP_NAME`      | Name of the app |
| `AWS_REGION ` | AWS Region |
| `ECR`            | Identifies the AWS ECR docker image registry that the docker image will be pushed to, in the format `AWS_ACCOUNT_ID`.dkr.ecr.`AWS_DEFAULT_REGION`.amazonaws.com |
| `SNYK_TOKEN`     | Identifies the AWS ECR docker image registry that the docker image will be pushed to, in the format `AWS_ACCOUNT_ID`.dkr.ecr.`AWS_DEFAULT_REGION`.amazonaws.com |


### Static tests

There are three tests performed:
1 - Lint tests - checks if the code doesnt have linting errors
2 - Unit tests - performs unit testing of some parts of the code
3 - Dependency audit - checks if there are no security issues with the NPM dependencies

### Build image and run security tests

There are three steps that are performed in series:
1 - The docker image of the app is built
2 - Snyk runs a security scan on the built image
3 - If the security scan passes then the image is pushed to AWS ECR

### Create/update cluster

The cluster gets created if it already exists then we dont create it anymore (rolling deployment)

eksctl takes care of creating all the infrastructure for the cluster (VPC, subnets, etc...)

```
eksctl create cluster --version 1.21 --name=app --tags environment=staging --region us-east-1 --zones us-east-1a,us-east-1b,us-east-1c --nodegroup-name app --node-type t2.micro  --nodes 3 --enable-ssm
```

### Deployment

To deploy the following command is used:

```
kubectl apply -f .circleci/kubernetes/deployment.yml
```

Here is the deployment YML:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: webserver
  labels:
    app: webserver
spec:
  replicas: 3
  selector:
    matchLabels:
      app: webserver
  template:
    metadata:
      labels:
        app: webserver
    spec:
      containers:
      - name: webserver
        image: 321723638230.dkr.ecr.us-east-1.amazonaws.com/udacitycapstone:latest
        imagePullPolicy: Always
        ports:
        - containerPort: 80
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 50%
```

### Expose app as a service

To expose our app to the internet we use the following command:

```
kubectl expose deployment webapp --type="LoadBalancer"  --name=my-service --port 80
```

### Post deployment tests

For testing our app, we use Cypress to test that our app works.

### Failures

When the cluster or tests fail, a rollback is performed to the previous working version.

### Other important files

* .circleci/config.yml - holds the ci/cd configuration for circleci which builds the app and run the tests
* Dockerfile - helps to automate the creation of the app image


## Review deliverables

Failed lint:
![Alt text](/deliverables/lint-fail.png?raw=true "failed lint")

Passing Lint:
![Alt text](/deliverables/lint-pass.png?raw=true "lint pass")

Unit tests:
![Alt text](/deliverables/unit-tests.png?raw=true "lint pass")

NPM audit:
![Alt text](/deliverables/npm-audit.png?raw=true "lint pass")

Snyk Security Scan:
![Alt text](/deliverables/snyk-security-scan.png?raw=true "lint pass")

Sucessfull deployment:
![Alt text](/deliverables/deploy.png?raw=true "lint pass")

AWS EC2:
![Alt text](/deliverables/aws-ec2.png?raw=true "lint pass")

E2E test:
![Alt text](/deliverables/e2e-tests.png?raw=true "lint pass")

Web app screenshot:
![Alt text](/deliverables/webapp.png?raw=true "lint pass")
