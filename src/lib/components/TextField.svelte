<script lang="ts">
    let { value = $bindable(), label, error = $bindable(), className="", password = $bindable(false), onkeypress = () => {} }: {
        value: string,
        label: string,
        error?: string,
        className: string,
        password: boolean,
        onkeypress: () => void,
    } = $props();
</script>

<div class="text-input-container w-full {className}">
    <div class="relative w-full">
        <input
            onkeypress={onkeypress}
            id={label}
            bind:value={value}
            type={password ? "password" : "text"}
            placeholder=" "
            class="peer w-full bg-light-background dark:bg-dark-background text-light-form-list-text dark:text-dark-form-list-text placeholder-transparent border-1 border-light-form-list-text2 dark:border-dark-form-list-text2 px-3 pt-3 pb-3 focus:outline-none focus:border-black focus:dark:border-white focus:ring-0"
        />
        <label
            for={label}
            class="transition-all duration-500 absolute left-3 -top-3 text-light-form-list-text dark:text-dark-form-list-text bg-light-background dark:bg-dark-background px-1
                   peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base
                   peer-focus:-top-3 peer-focus:left-3.5 peer-focus:text-black dark:peer-focus:text-white"
        >
            {label}
        </label>
    </div>

    {#if error}
        <p class="text-red-500 text-sm mt-1">{error}</p>
    {/if}
</div>
