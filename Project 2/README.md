# Udacity-Devops-CloudFormation
Your company is creating an Instagram clone called Udagram. Developers pushed the latest version of their code in a zip file located in a public S3 Bucket.  You have been tasked with deploying the application, along with the necessary supporting software into its matching infrastructure.  This needs to be done in an automated fashion so that the infrastructure can be discarded as soon as the testing team finishes their tests and gathers their results.

## Udacity Project III:
Region: us-east-1
AZs: 2
Instances per AZ: 2
instances: t2.medium - 2 cpu / 4gb
OS: Ubuntu 18
AMI:  ami-013f17f36f8b1fefb - SSD / 18.04 / east-1
EBS: 10gb

## Security Groups and Roles

1. Since you will be downloading the application archive from an S3 Bucket, you'll need to create an IAM Role that allows your instances to use the S3 Service. —> Role: udagram, s3: https://s3.console.aws.amazon.com/s3/buckets/udagram-AWSACCOUNTID?region=us-east-1&tab=objects 
2. Udagram communicates on the default HTTP Port: 80, so your servers will need this inbound port open since you will use it with the Load Balancer and the Load Balancer Health Check. As for outbound, the servers will need unrestricted internet access to be able to download and update their software.
3. The load balancer should allow all public traffic (0.0.0.0/0) on port 80 inbound, which is the default HTTP port. Outbound, it will only be using port 80 to reach the internal servers.
4. The application needs to be deployed into private subnets with a Load Balancer located in a public subnet.
5. One of the output exports of the CloudFormation script should be the public URL of the LoadBalancer. Bonus points if you add http:// in front of the load balancer DNS Name in the output, for convenience.

## Other Considerations

1. You can deploy your servers with an SSH Key into Public subnets while you are creating the script. This helps with troubleshooting. Once done, move them to your private subnets and remove the SSH Key from your Launch Configuration.
2. It also helps to test directly, without the load balancer. Once you are confident that your server is behaving correctly, increase the instance count and add the load balancer to your script.
3. While your instances are in public subnets, you'll also need the SSH port open (port 22) for your access, in case you need to troubleshoot your instances.
4. Log information for UserData scripts is located in this file: cloud-init-output.log under the folder: /var/log.
5. You should be able to destroy the entire infrastructure and build it back up without any manual steps required, other than running the CloudFormation script.
6. The provided UserData script should help you install all the required dependencies. Bear in mind that this process takes several minutes to complete. Also, the application takes a few seconds to load. This information is crucial for the settings of your load balancer health check.
7. It's up to you to decide which values should be parameters and which you will hard-code in your script.
8. See the provided supporting code for help and more clues.
9. If you want to go the extra mile, set up a bastion host (jump box) to allow you to SSH into your private subnet servers. This bastion host would be on a Public Subnet with port 22 open only to your home IP address, and it would need to have the private key that you use to access the other servers.

Last thing: Remember to delete your CloudFormation stack when you're done to avoid recurring charges!

Rubric: https://review.udacity.com/#!/rubrics/2556/view