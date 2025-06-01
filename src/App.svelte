<script lang="ts">
    import { onMount } from "svelte";
  import { isErrorResponse, type AccountRecoveryData, type AsyncState } from "./lib/core/types";
    import Header from "./lib/components/Header.svelte";
    import TextField from "./lib/components/TextField.svelte";
    import { passwordUpdateState, updatePassword } from "./lib/core/services/passwordUpdateService";

  // this will be loaded with the token and username, and an error if they are wrong
  let recoveryData: AsyncState<AccountRecoveryData | null> = $state({
    data: null,
    error: null,
    loading: true
  });

  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const username = urlParams.get('username');
    const token = urlParams.get('token');

    // assert the url params are present
    if (username == null || token === null) {
      recoveryData.error = {
        status: 400,
        json: '{"message": "ERROR_MISSING_URL_PARAMS"}'
      };
      console.log("BAD URL");
    } else {
      recoveryData.data = {
        username: username,
        token: token
      };
      console.log("GOOD URL");
    }

    recoveryData.loading = false;
    console.log("Finished loading recovery data");
  });

  let pwd = $state("");
  let pwdError = $state("");
  let confirmPwd = $state("");
  let showPwd = $state(false);
  let buttonError = $state("");

  function clicked() {
    if (pwd.length === 0 || confirmPwd.length === 0) {
      buttonError = "Você deve preencher os dois campos";
      return;
    }

    if (pwd.length < 8) {
      pwdError = "A senha deve ter ao menos 8 caracteres";
      setTimeout(() => pwdError = "", 5000);
      return;
    }

    if (pwd !== confirmPwd) {
      buttonError = "As senhas não coincidem";
      return;
    }

    if (recoveryData.loading) { // this should never happen, but if it does, we handle it anyway
      buttonError = "Ainda estamos carregando suas informações, aguarde um pouco ou recarregue a página.";
      setTimeout(() => buttonError = "", 6000); 
      return;
    } else if (recoveryData.error !== null) { // this should also never happen
      buttonError = "Este link parece ser inválido. Se você está tendo problemas, volte à plataforma JurAI e gere um novo link.";
      setTimeout(() => buttonError = "", 6000);
      return;
    }

    buttonError = "";
    pwdError = "";

    // actually make the request

    updatePassword(recoveryData.data!.token, pwd); // data will never be null because if error is not null and it is not loading, data has to have stuff
  }


</script>

<div class="bg-light-main-background dark:bg-dark-main-background min-h-dvh justify-start flex items-center w-full flex-col">
  <Header>
  </Header>
    <main class="h-full flex items-center flex-col pt-8 md:pt-16 lg:pt-0 lg:justify-center lg:-translate-y-20 justify-start grow px-6 w-full">
      {#if recoveryData.loading}
        <p>Carregando dados...</p>
      {:else if recoveryData.error === null}
        {#if !$passwordUpdateState.data.done}
        <section class="w-full max-w-[600px] h-fit md:translate-y-10 sm:translate-y-0 bg-light-background dark:bg-dark-background p-4 border-2 border-light-config-li-background dark:border-dark-config-li-background rounded-xl shadow-2xl flex flex-col gap-1 justify-start items-center">
          <h2 class="text-center w-full text-light-emphasis-text dark:text-dark-emphasis-text text-2xl pb-8 pt-2">Recuperação de Senha JurAI</h2>
          <h4 class="text-lg pb-4">{recoveryData.data!.username}, insira a sua nova senha:</h4>

          <div class="pwd-box flex flex-col justify-start w-full pb-10">
            <TextField onkeypress={() => { buttonError = ""; pwdError = ""; } } password={!showPwd} className="w-full pb-6" bind:value={pwd} label="Nova Senha" error={pwdError}></TextField>
            <TextField onkeypress={() => buttonError = ""} password={!showPwd} className="w-full pb-4" bind:value={confirmPwd} label="Confirmar Senha"></TextField>

            <label class="ml-1" for="show-pwd-check">
              <input id="show-pwd-check" type="checkbox" bind:checked={showPwd}>
              Mostrar senhas
            </label>
          </div>

          <button class="
                  cursor-pointer bg-light-emphasis-text/80 dark:bg-dark-emphasis-text/80 text-white dark:text-black
                  w-full py-2
                "
                onclick={clicked}
          >Confirmar</button>
          {#if buttonError.length !== 0}
            <p class="text-red-500 text-sm mt-1">{buttonError}</p>
          {/if}
        </section>

        {:else}

          <div class="flex flex-col justify-center gap-2 items-center">
          {#if $passwordUpdateState.loading}
            <h1 class="text-2xl">Carregando</h1>
            <p>Espere um pouco, estamos atualizando a sua senha.</p>
          {:else if $passwordUpdateState.error === null}
            <h1 class="text-2xl text-green-500">Sua senha foi atualizada com sucesso!</h1>
            <p>Agora você pode voltar para a plataforma de login, e utilizar sua nova senha.</p>
          {:else}
            <!-- here we check for the http error code -->
            {#if isErrorResponse($passwordUpdateState.error)}
              {#if $passwordUpdateState.error.status === 401}
                <h1 class="text-red-500 text-2xl">Erro: link inválido</h1>
                <p>O seu link de recuperação é inválido ou expirou. Gere um novo link pela plataforma JurAI.</p>
              {:else}
                <h1 class="text-red-500 text-2xl">Erro</h1>
                <p>Ocorreu um erro ao atualizar a sua senha.</p>
                <p class="pb-2">Se o problema persistir, você pode gerar um novo link de recuperação pela plataforma JurAI.</p>
                <p>Código do erro: {$passwordUpdateState.error.status}</p>
              {/if}
            {:else}
              <h1 class="text-red-500 text-2xl">Erro</h1>
              <p>Ocorreu um erro de rede ao atualizar a sua senha.</p>
              <p class="pb-2">Verifique sua conexão com a internet. Se o problema persistir, você pode gerar um novo link de recuperação pela plataforma JurAI.</p>
            {/if}
          {/if}
          </div>

        {/if}
      {:else}
        <p>Esse URL de recuperação de senha parece ser inválido. Tente voltar para a plataforma JurAI e gerar um novo link.</p>
      {/if}
    </main>
</div>
