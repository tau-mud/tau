export interface IMessageContext {
  message: string;
  receivedAt: Date;
}

export function MessageContext(message: string): IMessageContext {
  return {
    message,
    receivedAt: new Date(),
  };
}
