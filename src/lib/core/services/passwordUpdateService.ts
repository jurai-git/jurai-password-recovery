import { type EmptyResponse, type ErrorResponse, type AsyncState } from "../types"
import { writable, type Writable } from 'svelte/store';
import { fetchWithTimeout } from "../util";

export const passwordUpdateState: Writable<AsyncState<EmptyResponse>> = writable({
    loading: false,
    data: {done: false},
    error: null
});

export function updatePassword(token: string, newpwd: string) {
    passwordUpdateState.set({
        loading: true,
        data: {done: false},
        error: null
    });

    fetchWithTimeout("/advogado/reset-password/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: token,
            password: newpwd 
        }),
    }).then(response => {
        if (!response.ok) {
            console.log("Response not OK");
            return response.json().then(errorData => {
                throw {
                    status: response.status,
                    json: errorData
                } as ErrorResponse;
            });
        }
        return response.json();
    }).then(() => {
        passwordUpdateState.set({
            loading: false,
            data: {done: true},
            error: null
        });
    }).catch(error => {
        console.log("Error: ", error);
        passwordUpdateState.set({
            loading: false,
            data: {done: true},
            error: error
        });
    })
}