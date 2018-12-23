# Brettpanel

A visual wrapper around Mixpanel's data API.

### Usage

Brettpanel is available as a Docker image. By default it runs on port 5000.

```sh
$ docker run -p 5000:5000 --rm benmoose/brettpanel:latest
```

### Other options

Options passed to `docker run benmoose/brettpanel` are passed directly to [Serve](https://github.com/zeit/serve).
So, for example, to specify a custom container port you can use Serve's `-l/--listen` flag.

```sh
$ docker run -p 5000:1234 --rm benmoose/brettpanel:latest -l 1234
```
