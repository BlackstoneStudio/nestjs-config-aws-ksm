import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { Options } from './interfaces';

@Module({})
export class ConfigModule {
  static register(options: Options): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
        ConfigService,
      ],
      exports: [ConfigService],
    };
  }
}
