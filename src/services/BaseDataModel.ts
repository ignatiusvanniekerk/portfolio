import {Subject} from 'rxjs/Subject';

export class BaseDataModel extends Subject<any> {
    public emitChange(kind, data) {
        this.next({kind: kind, value: data});
    }

    public emit(kind) {
        this.next({kind: kind});
    }
}
