import { Subject } from 'rxjs';

const url$ = new Subject<{ filename: string; url: string }>();

export default url$;
