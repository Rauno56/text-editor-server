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

## Deployments

To build and publish an new version of the image use `./docker-release`.

The application is deployed to kubernetes using [kustomize](https://kustomize.io/). One needs to install the stand-alone version of kustomize, since the bundled one is long out of date([#1500](https://github.com/kubernetes-sigs/kustomize/issues/1500)). The manifests for each of the deployments are defined in [./k8s](./k8s):

```
./k8s
├── prod # the production deployment
├── global # manifests that do not have to do with a specific deployment
└── server-base # shared manifest definitions for each of the deployments
```

To update the image tag either:

1. edit `newTag` of one of the [kustomization.yaml](./k8s/prod/kustomization.yaml) files in the respective deployment directories or
2. run `kustomize edit set image text-editor/server=rauno56/text-editor-server:[new tag name]` in the respective deployment directory.

Build and apply a "kustomization" by running:

```
kustomize build [path-to-dir-with-kustomization.yaml] | kubectl apply -f -
```

