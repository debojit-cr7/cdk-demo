import * as apigw from '@aws-cdk/aws-apigateway';
import * as lambda from '@aws-cdk/aws-lambda';
import { CfnOutput, Construct, Stack, StackProps } from '@aws-cdk/core';
import * as path from 'path';
import * as ecs from '@aws-cdk/aws-ecs';
import ecs_patterns = require('@aws-cdk/aws-ecs-patterns');

/**
 * A stack for our simple Lambda-powered web service
 */
export class CdkpipelinesDemoStack extends Stack {
  /**
   * The URL of the API Gateway endpoint, for use in the integ tests
   */
  public readonly urlOutput: CfnOutput;
 
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    
    const service = new ecs_patterns.ApplicationLoadBalancedFargateService(this, 'FargateService',{
      memoryLimitMiB: 1024,
      cpu: 512,
      taskImageOptions: {
        image: ecs.ContainerImage.fromRegistry('amazon/amazon-ecs-sample'),
      },
    });


    this.urlOutput = new CfnOutput(this, 'Url', {
      value: service.loadBalancer.loadBalancerDnsName,
    });
  }
}