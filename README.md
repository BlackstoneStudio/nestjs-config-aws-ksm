<h1 align="center"></h1>

<div align="center">
  <a href="http://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="150" alt="Nest Logo" />
  </a>
</div>

<h3 align="center">NestJS ConfigModule With AWS Secret Manager</h3>

<div align="center">
  <a href="https://nestjs.com" target="_blank">
    <img src="https://img.shields.io/badge/Module%20of-NestJs-red.svg" alt="Built with NestJS">
  </a>
</div>

## Installation

1. Add module to project.

```bash
npm install nestjs-config-aws-ksm
```

2. Import `ConfigModule` in your module.

```ts
import { Module } from '@nestjs/common';
import { ConfigModule } from 'nestjs-config-aws-ksm';
import { NameService } from './name.service';

@Module({
  imports: [
    ConfigModule.register({
      accessKey: 'AWS_ACCESS_KEY',
      secretAccessKey: 'AWS_ACCESS_SECRET_KEY',
      region: 'AWS_REGION',
      storage: 'STORAGE_NAME'
    }),
  ],
  providers: :[NameService],
  exports: [NameService],
})

export class NameModule {}
```

3. Import and use `ConfigService` in your Service.

```ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from 'nestjs-config-aws-ksm';

@Injectable()
export class NameService {
  constructor(configService: ConfigService) {
    configService.get('SECRET_AWS_OR_ENV_VARIABLE');
  }
}
```

## Notes

Given that the register method is asynchronous the variables may not be loaded yet. If you need to load it via `registerAsync` we recommend using the `loadStorage` method. Example:

```ts
import { Module } from '@nestjs/common';
import { ConfigModule } from 'nestjs-config-aws-ksm';
import { NameService } from './name.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule.register({
        accessKey: 'AWS_ACCESS_KEY',
        secretAccessKey: 'AWS_ACCESS_SECRET_KEY',
        region: 'AWS_REGION',
        storage: 'STORAGE_NAME'
      })],
      useFactory: async (configService: ConfigService) => {
        await configService.loadStorage('STORAGE_NAME');
        return ({
          secret: configService.get('JWT_SECRET'),
          signOptions: { expiresIn: "72h" },
        })
      },
      inject: [ConfigService],
    }),
  ],
  providers: :[NameService],
  exports: [NameService],
})

export class NameModule {}
```

## Author

**Blackstone Studio**
