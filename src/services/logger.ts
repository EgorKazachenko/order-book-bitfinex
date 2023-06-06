export class LoggerService {
  private readonly name: string;
  constructor(name: string) {
    this.name = name;
  }

  private get prefix() {
    return `${this.name} -> `;
  }
  info = (...args: Array<unknown>) => {
    console.log(this.prefix, ...args);
  };

  error = (...args: Array<unknown>) => {
    console.error(this.prefix, ...args);
  };
}
