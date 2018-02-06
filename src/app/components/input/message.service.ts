export class MessageService {
  private _message = '默认消息';
  public get message(): string {
    return this._message;
  }
  public set message(value: string) {
    this._message = value;
  }
  constructor() { }

}
