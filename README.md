# APIBrasil Key Manager
Client Free Open Source APIBrasil Key Manager

# How to use
```js
const Manager = require('apibrasil-manager');

Manager.valid('you_url_key_manger_server', {
    apitoken: process.env.TOKEN,
    host_ssl: process.env.HOST_SSL,
    port: process.env.PORT,
})
.then(() => {
    this.initSession(req, res);
})
.catch(error => {
    Manager.log('error', error.message || JSON.stringify(error));
});
```