declare module 'logusix' {
  class Logusix {
    constructor({ output, locale, timestamp, printer, dashboard }: {
      output?: string
      locale?: string | 'en-US' | 'fr-FR'
      timestamp?: boolean
      printer?: boolean
      dashboard: Dashboard
    });

    file: () => string;
    
    timestamping: (c: string) => string;
    
    formatForPrinting: (c: string) => string;

    log: (...c: string) => void;

    print: (...c: string) => void;

    on: () => void;

    emit: () => void;

    backup: ({ output, backupName, force }: Backup) => void;
  }

  class LogusixError extends Error {
    constructor({ message, stacks }: string)
  }

  interface Dashboard {
    active?: boolean
    port: string | number
  }

  interface Backup {
    output?: string;
    backupName?: string;
    force?: boolean;
  }
}