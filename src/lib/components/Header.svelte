<script lang="ts">
    import { isDark } from "../core/stores/themeStore";
</script>

<header class="flex items-center justify-center px-8 py-2 w-full fixed top-0 left-0 h-20 bg-light-table-row-aside-background dark:bg-dark-table-row-aside-background border-light-header-aside-border dark:border-dark-header-aside-border border-b-2 ">
    <img class="h-full w-auto" src={$isDark ? 'jurai-light.png' : 'jurai-dark.png'} alt="jurai-logo">
</header>