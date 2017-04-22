# cPig-API

cPig API use firebase functions

### Get started with Cloud Functions

refs : [Get started with Cloud Functions](https://firebase.google.com/docs/functions/get-started)

1.  Install the Firebase CLI
    
    ```
    npm install -g firebase-tools
    ```

2.  Initialize your project

    ```
    firebase login --no-localhost
    firebase init functions
    ```
    
### Setting Environment Configuration

refs : [Environment Configuration](https://firebase.google.com/docs/functions/config-env)

```
firebase functions:config:set gmail.email="<email of system admin>" gmail.password="<password of system admin email>"
```

### Deploy

```
firebase deploy --only functions
```