# alexa-triggers
![latest-node-version](https://img.shields.io/node/v/pm2) ![last-commit](https://img.shields.io/github/last-commit/cyan903/alexa-triggers) ![repo-size](https://img.shields.io/github/repo-size/cyan903/alexa-triggers)

Trigger [pm2](https://github.com/Unitech/pm2) and shell commands through [Alexa](https://developer.amazon.com/en-US/alexa). Useful for selfhosted setups and local servers.

![triggers](https://raw.githubusercontent.com/Cyan903/Static-github/main/alexa-triggers/triggers.png)

## Requirements
- **Node >=10.0.0**
- Amazon Alexa
- [IFTTT](https://ifttt.com/) account

## Setup
Clone and install the source:
```sh
$ git clone https://github.com/Cyan903/alexa-triggers.git
$ cd alexa-triggers
$ npm i
```

Copy and edit the configs:
```sh
$ sudo cp ext/nginx.conf /etc/nginx/conf.d/alexa.conf
$ cp ext/config.example.json config.json
```

Create and configure an account on [ifttt](https://ifttt.com/). Create an applet and select `Amazon Alexa` for `if this`. Choose `say a specific phrase`. Next, select `webhooks` for `then that`.
<p align="center">
    <img height="300" src="https://raw.githubusercontent.com/Cyan903/Static-github/main/alexa-triggers/alexa-triggers.png" />
    <img height="300" src="https://raw.githubusercontent.com/Cyan903/Static-github/main/alexa-triggers/webhook-triggers.png" />
</p>

<p align="center">Finally, configure the webhook to match <code>config.json</code>.</p>
<p align="center">
    <img height="500" src="https://raw.githubusercontent.com/Cyan903/Static-github/main/alexa-triggers/web.png" />
</p>

Now you should be set. All that's left is to run the server and make sure it's accessible through [ifttt](https://ifttt.com/). You can keep the server running with [pm2](https://github.com/Unitech/pm2) or any other process manager.

```sh
$ pm2 start src/triggers.js
```


## License

  [MIT](LICENSE)
