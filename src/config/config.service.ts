import AWS from 'aws-sdk';
import { Injectable, Inject, Logger } from '@nestjs/common';
import { Options } from './interfaces';

@Injectable()
export class ConfigService {
  private readonly client: AWS.SecretsManager;

  private logger: Logger = new Logger('ConfigService');

  private secrets: Array<{ [secret: string]: string }> = [];

  constructor(@Inject('CONFIG_OPTIONS') options: Options) {
    // Load the AWS SDK
    AWS.config.update({
      accessKeyId: options.accessKey,
      secretAccessKey: options.secretAccessKey,
      region: options.region,
    });

    // Create a Secrets Manager client
    this.client = new AWS.SecretsManager({
      region: options.region,
    });

    if (options.storage) {
      this.loadStorage(options.storage)
        .then(() => this.logger.log('Storage loaded.'))
        .catch((err) => this.logger.error(err));
    }
  }

  get(key: string): string {
    if (this.secrets[key]) {
      return this.secrets[key];
    }
    return process.env[key];
  }

  async loadStorage(key: string): Promise<void> {
    try {
      const data = await this.client
        .getSecretValue({ SecretId: key })
        .promise();
      this.secrets = JSON.parse(data.SecretString);
    } catch (err) {
      if (err.code === 'DecryptionFailureException') {
        this.logger.error(
          "Secrets Manager can't decrypt the protected secret text using the provided KMS key.",
        );
      } else if (err.code === 'InternalServiceErrorException') {
        this.logger.error('An error occurred on the server side.');
      } else if (err.code === 'InvalidParameterException') {
        this.logger.error('You provided an invalid value for a parameter.');
      } else if (err.code === 'InvalidRequestException') {
        this.logger.error(
          'You provided a parameter value that is not valid for the current state of the resource.',
        );
      } else if (err.code === 'ResourceNotFoundException') {
        this.logger.error("We can't find the resource that you asked for.");
      } else if (err.code === 'AccessDeniedException') {
        this.logger.error('You not have access to resource.');
      } else this.logger.error(err);

      throw err;
    }
  }
}
