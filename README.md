<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Descripción

Este proyecto contiene la implementación de un backend para una billetera virtual, desarrollado con NestJS y MongoDB. El objetivo del proyecto es proporcionar una solución robusta y escalable para la gestión de clientes y operaciones de recarga y pagos en una billetera virtual.

El proyecto usa como base de datos MongoDB para mas eficiencia a la hora del manejo de datos, tambien cuenta con autenticación JWT para mas seguridada y por ultimo se hace uso de envios de emails para hacer llegar la información de la app a los usuarios de esta.

## Instalar dependencias

El proyecto utiliza el manejador de pnpm para mayor rapidez y eficiencia.

```bash
$ pnpm install
```

## Configurar variables de entorno

Se debe de configurar las variables de entorno para el correcto funcionamiento del servidor.

```bash
# Global settings
PRODUCT_NAME='Epayco-Technical-Test-Backend-Database'

# Set to production when deploying to production
NODE_ENV=development

# Node.js server configuration
SERVER_HOST=http://127.0.0.1      #Server host de la api backend
SERVER_PORT=4000                  #Server port de la api backend
WEB_SERVER_HOST=http://127.0.0.1  #Server host del servicio Web frontend
WEB_SERVER_PORT=3000              #Server port del servicio Web frontend

# Sincronize true only with MongoDB
MONGODB_HOST=host
MONGODB_PORT=port
# La url es opcional
MONGODB_URL=mongoUrl
# (si cuenta con una conexion url puede hacer uso de esta)
MONGODB_DBNAME=dbname
MONGODB_DBTEST=dbtest
MONGODB_USER=username
MONGODB_PASSWORD=password

# JWT Config
JWT_SECRET=MyS3cReTsK3y!
JWT_EXPIRES=43200  #seconds

# SMTP Config (Si no cuenta con uno, estare adjuntando las credenciales por correo)
SMTP_HOST=mail
SMTP_PORT=1025
SMTP_USERNAME=
SMTP_PASSWORD=
SMTP_SECURE_SSL=false
SMTP_SENDER_NAME=Notifications
SMTP_SENDER_EMAIL_DEFAULT=notification@localhost.com
```

## Compilar y correr proyecto

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```
