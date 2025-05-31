import { writable, type Writable } from "svelte/store";

export const isDark: Writable<boolean> = writable(true);

export function init() {
    if (typeof window !== 'undefined') {
        const html = document.documentElement;

        const update = () => {
            isDark.set(html.classList.contains('dark'));
        };

        update();

        const observer = new MutationObserver(update);
        observer.observe(html, { attributes: true, attributeFilter: ['class'] });
    }
}

export function toDark() {
    document.documentElement.classList.add('dark');
}

export function toLight() {
    document.documentElement.classList.remove('dark');
}