[![mijumoto](https://circleci.com/gh/mijumoto/nextjs-blog.svg?style=svg)](https://app.circleci.com/pipelines/github/mijumoto/nextjs-blog)

## Project Overview

In this project, you will apply the skills you have acquired in this course to operationalize a Machine Learning Microservice API. 

You are given a pre-trained, `sklearn` model that has been trained to predict housing prices in Boston according to several features, such as average rooms in a home and data about highway access, teacher-to-pupil ratios, and so on. You can read more about the data, which was initially taken from Kaggle, on [the data source site](https://www.kaggle.com/c/boston-housing). This project tests your ability to operationalize a Python flask app—in a provided file, `app.py`—that serves out predictions (inference) about housing prices through API calls. This project could be extended to any pre-trained machine learning model, such as those for image recognition and data labeling.

## Setup the Environment

* Create a virtualenv and activate it
* Run `make install` to install the necessary dependencies

### Running `app.py`

1. Standalone:  `python app.py`
2. Run in Docker:  `./run_docker.sh`
3. Run in Kubernetes:  `./run_kubernetes.sh`

### Kubernetes Steps

* Setup and Configure Docker locally (make sure kubectl is running)
* Run the script to create an image from the Dockerfile (./run_docker.sh)
* Upload the image to docker hub (./upload_docker.sh)
* Setup and Configure Kubernetes locally (install and start minikube)
* Run via kubectl (./run_kubernetes.sh)
* Make predictions (./make_prediction.sh)

### Other important files

* .circleci/config.yml - holds the ci/cd configuration for circleci which builds the app and run the tests
* Dockerfile - helps to automate the creation of the app image
* Makefile - holds several commands like install, lint, etc..
* requirements.txt - holds the dependencies that need to be installed by python for the app to run