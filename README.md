<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a><br>
  <a href="https://github.com/suppressf0rce/mobile-marketplace-app-backend/actions/workflows/node.js.yml"><img src="https://github.com/suppressf0rce/mobile-marketplace-app-backend/actions/workflows/node.js.yml/badge.svg?branch=master" /></a>
  <a href="https://codecov.io/gh/suppressf0rce/mobile-marketplace-app-backend" > 
 <img src="https://codecov.io/gh/suppressf0rce/mobile-marketplace-app-backend/branch/master/graph/badge.svg?token=P3YPA9ZUUO"/> 
 <a href="https://suppressf0rce.github.io/mobile-marketplace-app-backend/" target="_blank"><img src="https://suppressf0rce.github.io/mobile-marketplace-app-backend/images/coverage-badge-documentation.svg" alt="DocumentationCoverage"/></a>
 </a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) backend application written in typescript for mobile marketplace app

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## Running the app with docker-compose
**Prequisites**
1. Docker Installed
2. docker-compose installed

You can run this application using docker compose which will automatically setup your database and application for you with next commands

```bash
# Basic run
docker-compose up

# Run application proccess in background
docker-compose up -d

# Run application and rebuild it
docker-compose up --build

# Stopping application from background
docker-compose down
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# License
This product is under the AGPL 3.0. See the [LICENSE](LICENSE) for more details.

```
Designed and developed by Dejan Radmanovic 2023

Licensed under the APGL, Version 3.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   https://www.gnu.org/licenses/agpl-3.0.en

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
