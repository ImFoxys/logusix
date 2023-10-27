
# Logusix  
Simple and powerfull file log system with web dashboard and bakcup system.

| Language | Platform | Dépendencies | Repository |
|----------|----------|--------------|------------|
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) | ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) | ![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101) | ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

## Screenshots  

![Terminal and Log's fil screen](https://cdn.discordapp.com/attachments/1023228430671683654/1167217936226857001/Logusix.png?ex=654d5369&is=653ade69&hm=27d001c77eb88ddb57383518067bb4f78376a54a9c76ab7b024c69960a220872&)

![Web dashboard](https://cdn.discordapp.com/attachments/1023228430671683654/1167217936499494954/LogusixWeb.png?ex=654d5369&is=653ade69&hm=d82c401942c7195f37c7311c060d35631336d0862bab9b269d83b8fc69291e1f&)

## Features  

- Simple to use
- Web dashboard :
  - custom port
  - Auto-refresh with WebSockets
- File output customisable
- Simple backup system
  - Choose backup output
  - Choose backup name

## Installation
```bash
  npm i logusix
```

## Usage (CommonJS)
```javascript
  const Logusix = require('logusix');

  const logusix = new Logusix({
    /* params */
  });
```

## Usage (ESM)
```javascript
  import Logusix from 'logusix';

  const logusix = new Logusix({
    /* params */
  });
```

## Parameters 
**`output`** : Name of output file. `(default : 'log')`

**`locale`** : Location name for timestamp `(default: 'en-US')` [🔗](https://www.techonthenet.com/js/language_tags.php)

**`printer`** : Print automatically in console when you `<Logusix>.log('>> Somethings')` in output file. `(default: false)`

**`timestamp`:** Show log timestamp `(default: true)`

**`dashboard.active`**: Active web dashboard on selected port `(default: false)`

**`dashboard.port`**: Select 


## Functions
```javascript
  // Write in file
  logusix.log('>> Something');

  // Print in console
  logusix.print('>> Something else');
```

```javascript
  // Multi arguments supported !
  logusix.log('>> Something', '!> Something else'); 
```

```javascript
  // Make backup
  logusix.backup({
    // Backup file output 
    // Dont forget to create this folder !
    output: 'backup', 
    
    // Backup file name 
    // (default: new Date().getTime()) 
    // Converted in snake_case
    backupName: 'your_name', 
  });
```

## Colors 
You just need to start each line with :

**`>>`** : Gray (default)

**`!>`** : Red

**`$>`** : Yellow

**`*>`** : Green

**`?>`** : Blue

## Some questions ?

My discord : `@foxys__`

## Github Repository 
[here !](https://github.com/ImFoxys/logusix)

## Licenses

[MIT](https://choosealicense.com/licenses/mit/)

---

*This library has been created in few hours with ❤.* 