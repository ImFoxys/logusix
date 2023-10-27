const { Server } = require('socket.io');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');

module.exports = class Logusix {
  constructor({ output, locale, timestamp, printer, dashboard }) {
    this.output = output ?? 'log';
    this.locale = locale ?? 'en-US';
    this.timestamp = typeof timestamp === 'undefined' ? true : timestamp;
    this.printer = typeof printer === 'undefined' ? false : printer;
    this.dashboard = typeof dashboard === 'undefined' ? { active: false } : dashboard;

    try {
      fs.readFileSync(this.file());
    } catch(err) {
      fs.writeFileSync(this.file(), '');
    }

    if(dashboard.active) {
      this.server = http.createServer((req, res) => {
        if(req.url !== '/') return res.write('404');

        const html = fs.readFileSync(path.join(__dirname, '/logusix.html'));

        res.writeHead(200, { 'content-type': 'text/html' });

        res.write(html.toString());
        
        res.end();
      });

      this.server.listen(dashboard.port ?? '8080', 'localhost');

      this.wss = new Server(this.server);

      this.on();
    }
  }

  file() {
    return this.output.endsWith('.logusix') ? this.output : this.output + '.logusix';
  }

  timestamping(content) {
    const match = content.match(/^([!?>*$])/);

    if(match) {
      return this.timestamp 
      ? `${match[1]}> [${new Date().toLocaleString(this.locale)}] => ${ content.slice(2).trim()}` 
      : `${match[1]}> : ${ content.slice(2).trim()}`
    } else {
      return content;
    }
  }

  formatForPrinting(content) {
    const core = {
      '>': '\x1b[90m', // GRAY
      '!': '\x1b[31m', // RED
      '$': '\x1b[33m', // YELLOW
      '?': '\x1b[34m', // BLUE
      '*': '\x1b[32m', // GREEN
    }

    return core.hasOwnProperty(content[0]) ? core[content[0]] + content.slice(3) : content.slice(3);
  }

  log(...content) {
    try {
      fs.readFileSync(this.file());

      content.map(c => {
        if(this.printer) this.print(c);

        fs.appendFileSync(this.file(), this.timestamping(c) + '\n');

        if(!this.socket) return;

        this.socket.emit('new', this.timestamping(c));
      });
    } catch(err) {
      console.error(err);
    }
  }

  print(...content) {
    content.map(c => {
      console.log(this.formatForPrinting(this.timestamping(c)));
    });
  }

  on() {
    this.wss.on('connection', (socket) => {
      this.socket = socket;

      socket.on('new', (d) => {
        this.socket.emit(this.timestamping(d));

        this.log(d);
      });

      this.socket.emit('new', `?> [${new Date().toLocaleString('fr-FR')}] => Connected to LogusixWeb`);
    });
  }

  emit(content) {
    if(!this.socket) return;
    this.socket.emit('new', content);
  }

  backup({ output, backupName }) {
    backupName = backupName && backupName !== '' ? backupName.replace(/\s+/g, '_').toLowerCase() : new Date().getTime().toString();

    if(!output) throw new LogusixError({message: 'No output provided to backup ' + this.file()});

    const current = this.file().startsWith('./') ? this.file() : './' + this.file();
    const newPath = `${output.startsWith('./') ? output : './' + output}/${backupName?.endsWith('.logusix') ? backupName : backupName + '.logusix'}`;

    this.log(`>> ${this.file()} Backuped`);

    try {
      fs.renameSync(current, newPath);
    } catch(err) {
      throw new LogusixError({message: 'Bad output provided. A file could already exists with this backupName'});
    }

    try {
      fs.readFileSync(this.file());
    } catch(err) {
      fs.writeFileSync(this.file(), '');
    }
  }
}

class LogusixError extends Error {
  constructor({ message, stacks }) {
    super(message);

    this.message = message;

    this.stacks = stacks
  }
}
