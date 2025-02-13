import axios from "axios";
import {store} from "../stores/store.ts";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}


const agent = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

agent.interceptors.request.use(config => {
    store.uiStore.isBusy();
    return config;
});

agent.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        store.uiStore.isIdle();
        return response;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    } finally {
        store.uiStore.isIdle();
    }
});



export default agent;