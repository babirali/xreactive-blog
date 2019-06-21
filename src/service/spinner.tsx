import { Subject } from 'rxjs';

const subject = new Subject<boolean>();

export const spinnerService = {
    showLoading: (value:boolean) => subject.next(value),
    getMessage: () => subject.asObservable()
};