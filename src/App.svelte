<script lang="ts">
  let count: number = $state(0);
  const increment: () => void = () => count++;
</script>

<main>
  <h1>Typescript and <span class="text-sky-600">TailwindCSS</span> test</h1>
  <button onclick={increment}>Count is {count}</button>
</main>
