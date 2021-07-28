import { Test } from '@nestjs/testing';
import { ConfigService, ConfigModule } from '../src';

describe('AddressService', () => {
  let service: ConfigService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.register({
          accessKey: process.env.ACCESS_KEY,
          secretAccessKey: process.env.SECRET_ACCESS_KEY,
          region: process.env.REGION,
        }),
      ],
    }).compile();

    service = await moduleRef.resolve(ConfigService);
  });

  it('Load service.', () => {
    expect(service).toBeDefined();
  });

  it('Verify Example var.', async () => {
    const secret = service.get('EXAMPLE');
    expect(secret).toBe('EXAMPLE');
  });
});
