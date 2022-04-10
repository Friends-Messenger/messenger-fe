import {Injectable, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class OnDestroyService extends Subject<void> implements OnDestroy{
    public readonly $ = this.asObservable();

    public ngOnDestroy(): void {
        this.next();
        this.complete();
    }
}
