import { AppObservableObject, NumberValueObserver } from './base.observable';

describe('NumberValueObserver', () => {

    it('subscription works', () => {
        const testObj = new NumberValueObserver();

        let value = 0;
        testObj.observable.subscribe(_value => value = _value);

        // Adding new value should succeed
        testObj.setObject(3);
        expect(value).toEqual(3);
    });
});

class SubjectObservable extends AppObservableObject<string> { }

describe('SubjectObservable', () => {

    it('object subscription works', () => {
        const testObj = new SubjectObservable();

        let state = null;
        testObj.observable.subscribe(_state => state = _state);

        // Adding new item should succeed
        testObj.setObject('bar');
        expect(state).toEqual('bar');
    });

    it('object subscription using asPipe method works', () => {
        const testObj = new SubjectObservable();

        let state = null;
        testObj.asPipe().subscribe(_state => state = _state);

        // Adding new item should succeed
        testObj.setObject('bar');
        expect(state).toEqual('bar');

        // When observer is closed from emitting new values
        testObj.closeSubject();

        // New values are no longer received
        testObj.setObject('foo');
        expect(state).toEqual('bar');
    });
});
