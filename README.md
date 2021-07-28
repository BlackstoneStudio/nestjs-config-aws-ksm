<a href="https://www.blackstone.studio/" target="_blank"><img src="https://blackstone-open-assets.s3-us-west-2.amazonaws.com/header.png" alt="Blackstone Studio - In Development We Trust"></a>

# NestJS ConfigModule With AWS Secret Manager

<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.5-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/BlackstoneStudio/Parrot-Messenger/" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/BlackstoneStudio/Parrot-Messenger/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained-yes-green.svg" />
  </a>
  <a href="https://nestjs.com" target="_blank">
    <img src="https://img.shields.io/badge/Module%20of-NestJs-red.svg" alt="Built with NestJS">
  </a>
</p>

## Table of Contents

- [Installation](#installation)
- [Initialization](#initialization)
- [Notes](#notes)

## Installation

Using npm:

```bash
npm install nestjs-config-aws-ksm
```

Using yarn:

```bash
yarn add nestjs-config-aws-ksm
```

## Initialization

1. Import `ConfigModule` in your module.

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

2. Import and use `ConfigService` in your Service.

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

## Who are we

We are the development partner of choice for several different sized companies who need a team that delivers fast & scalable code understanding users needs and commercial scope.

### Our services

- Website development
- UX/UI Design
- Webapp Development
- Mobile Development
- Ecommerce
- Specialized enterprise software
- Legacy migrations, debugging and refactors

### Why us?

We don't outsource a single thing. Each wireframe, design and every piece of code is written with outmost care by Blackstone's diverse teams.

## 🛠 Built With

- [Node.js](https://nodejs.org/en/) - Backend

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

You can also suggest a new feature by creating an Issue. Please wait for confirmation before working on it.

## 📝 License

Copyright © 2020 [Blackstone Studio](https://github.com/Blasckstone-Studio).

This project is [MIT](https://github.com/BlackstoneStudio/Parrot-Messenger/master/LICENSE) licensed.

<a href="https://www.blackstone.studio/we-are-blackstone/" target="_blank"><img src="https://blackstone-open-assets.s3-us-west-2.amazonaws.com/footer.png" alt="We are blackstone - Contact us"></a>
