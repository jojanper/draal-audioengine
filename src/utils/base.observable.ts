import { takeWhile } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';


/**
 * Base class for managing an object as observable.
 */
export abstract class BaseObservableObject<T> {
    observable: Observable<T>;
    protected subject: Subject<T>;
    protected destroy = false;

    constructor(subject: Subject<T>) {
        this.subject = subject;
        this.observable = this.subject.asObservable();
    }

    /**
     * Return observable that closes when `closeSubject` method is called.
     */
    asPipe(): Observable<T> {
        return this.observable.pipe(
            takeWhile(() => this.destroy === false)
        );
    }

    /**
     * Close subject from emitting further values.
     */
    closeSubject(): void {
        this.destroy = true;
    }

    /**
     * Set next object.
     */
    setObject(subject: T): void {
        this.subject.next(subject);
    }
}

/**
 * Base class for managing an object as Subject.
 */
export abstract class AppObservableObject<T> extends BaseObservableObject<T> {
    constructor() {
        super(new Subject<T>());
    }
}

export class NumberValueObserver extends AppObservableObject<number> { }
