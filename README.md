# Brettpanel

A visual wrapper around Mixpanel's data API.

### Usage

Brettpanel is available as a Docker image. By default it runs on port 5000.

```sh
$ docker run -p 5000:5000 --rm benmoose/brettpanel:latest
```

### Other options

Use the `-l/--listen` flag to specify a custom container port.
Remember to update the host:container port mapping.
```sh
$ docker run -p 5000:1234 --rm benmoose/brettpanel:latest -l 1234
```
