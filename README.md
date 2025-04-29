# APIBrasil Client KeyManager
Client Free Open Source APIBrasil KeyManager

![image](https://github.com/user-attachments/assets/69d3a9a3-a52a-495b-b553-25ba2b202f47)

# How to use
```js
const Manager = require('@apibrasil/client-keymanager');

Manager.valid('you_url_key_manager_server', {
    'example': 'datajson'
})
.then(() => {
    this.initSession(req, res);
})
.catch(error => {
    Manager.log('error', error.message || JSON.stringify(error));
});
```
