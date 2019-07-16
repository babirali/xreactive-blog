import { Subject } from "rxjs";

const subject = new Subject<boolean>();

export const spinnerService = {
    getMessage: () => subject.asObservable(),
    showLoading: (value: boolean) => subject.next(value),
};
