# RTC plain text editor server

## Development

### Docker

The application is written in Typescript so development iterations are a bit more involving. Easiest way to get a dev environment up and running is with docker-compose:

```
docker-compose up
```

That will build the [Dockerfile](./Dockerfile) until the `build` stage and run the builder and the application in parallel in a production-**like** environment.

### Local

This approach is not recommended, however a bit more conventional. To run the project locally without using docker:

```
npm install
npm run watch-build

# In a separate terminal
npm run dev
```

## Production

To get an production build just build the whole build with docker:

```
docker build -t text-editor-server .
```
