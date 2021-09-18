#!/bin/bash

# Parameters:
# $1 create, delete or update stack
# $2 Stack name
# $3 Template body
# $4 Parameters file

# Example: ./cloudform.sh create stackName infra.yml infra.json
# Example: ./cloudform.sh delete stackName
# Example: ./cloudform.sh update stackName servers.yml servers.json

PARAMS=$4
REGION="us-east-1"
CAPABILITIES='"CAPABILITY_IAM" "CAPABILITY_NAMED_IAM"'
if [ "$4" = "" ]; then
	PARAMS=$3
fi
if [ "$1" = "create" ]; then
	aws cloudformation create-stack --stack-name $2 --template-body file://$3.yml  --parameters file://$PARAMS.json --capabilities "CAPABILITY_IAM" "CAPABILITY_NAMED_IAM" --region=$REGION
fi
if [ "$1" = "delete" ]; then
	aws cloudformation delete-stack --stack-name $2
fi
if [ "$1" = "update" ]; then
	aws cloudformation update-stack --stack-name $2 --template-body file://$3.yml  --parameters file://$PARAMS.json --capabilities "CAPABILITY_IAM" "CAPABILITY_NAMED_IAM" --region=$REGION
fi