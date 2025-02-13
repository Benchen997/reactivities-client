import { CounterStore } from './counterStore';
import React from 'react';
import {UiStore} from "./uiStore.ts";
interface Store {
    counterStore: CounterStore;
    uiStore: UiStore;
}


export const store: Store = {
    counterStore: new CounterStore(),
    uiStore: new UiStore()
}

export const StoreContext = React.createContext(store);