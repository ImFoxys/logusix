
# Logusix  
Simple and powerfull file log system, with web dashboard

## Screenshots  

![Terminal and Log's fil screen](https://cdn.discordapp.com/attachments/1023228430671683654/1167217936226857001/Logusix.png?ex=654d5369&is=653ade69&hm=27d001c77eb88ddb57383518067bb4f78376a54a9c76ab7b024c69960a220872&)

![Web dashboard](https://cdn.discordapp.com/attachments/1023228430671683654/1167217936499494954/LogusixWeb.png?ex=654d5369&is=653ade69&hm=d82c401942c7195f37c7311c060d35631336d0862bab9b269d83b8fc69291e1f&)

## Features  

- Simple to use
- Web dashboard  
- File output customisable  

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

**`locale`** : Location name for timestamp `(default: 'en-US')`

**`printer`** : Print automatically in console when you `<Logusix>.log('>> Somethings')` in output file. `(default: false)`

**`timestamp`:** Show log timestamp `(default: true)`

**`dashboard`**: Start the dashport on __localhost:8080__ `(default: false)`


## Functions
```javascript
  // Write in file
  logusix.log('>> Something');

  // Print in console
  logusix.print('>> Something else');
```

```javascript
  // Multi arguments supported !
  lagousix.log('>> Something', '!> Something else'); 
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


## Licenses

[MIT](https://choosealicense.com/licenses/mit/)

---

*This library has been created in few hours with ❤.*