import {makeAutoObservable} from "mobx";

export class CounterStore {
    title = 'Counter Store';
    count = 0;
    events: string[] = [
        `initial count is ${this.count}`
    ];

    constructor() {
        makeAutoObservable(this);
    }

    increment = (amount = 1) => {
        this.count += amount;
        this.events.push(`incremented by ${amount} to ${this.count}`);
    }

    decrement = (amount = 1) => {
        this.count -= amount;
        this.events.push(`decremented by ${amount} to ${this.count}`);
    }

    get eventCount() {
        return this.events.length;
    }
}