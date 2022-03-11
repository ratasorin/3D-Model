import { useEffect, useState } from 'react';
import { map, Subject } from 'rxjs';

const styleToggler$ = new Subject<string>();

export const emitCommand = (command: string) => styleToggler$.next(command);
export const receiveCommand = () => {
  const [command, setCommand] = useState<{ payload: string }>({ payload: '' });
  useEffect(() => {
    const subscription = styleToggler$
      .pipe(map((payload) => ({ payload })))
      .subscribe(setCommand);
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { command: command.payload };
};
