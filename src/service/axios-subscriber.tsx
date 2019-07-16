import { Observable, Subscriber } from "rxjs";
import axios from "axios";
import axiosCancel from "axios-cancel";
// adds cancel prototype method
// @ts-ignore
axiosCancel(axios);
// @ts-ignore
class AxiosSubscriber extends Subscriber {
    requestId: any;
    aborted: boolean;
    constructor(observer: any) {
        super(observer);
        // create sample request id
        this.requestId = Math.random() + '-xhr-id';
        // XHR complete pointer
        this.aborted = false;

        observer.next('response.data');
        observer.complete();
        // make axios request on subscription
        // axios.get('https://jsonplaceholder.typicode.com/users', {
        //     // @ts-ignore
        //     requestId: this.requestId
        // }).then((response: any) => {
        //     observer.next(response.data);
        //     this.aborted = true;
        //     observer.complete();
        // }).catch((error: any) => {
        //     this.aborted = true;
        //     observer.error(error);
        // });
    }
    unsubscribe() {
        super.unsubscribe();

        // cancel XHR
        if (this.aborted === false) {
            // axios.isCancel(this.requestId);
            // @ts-ignore
            axios.cancel(this.requestId);
            this.aborted = true;
        }
    }
}
export default AxiosSubscriber;

