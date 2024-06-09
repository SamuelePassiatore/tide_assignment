<script>
import AppLogin from '../components/AppLogin.vue';



export default {
    name: 'LoginPage',
    components: { AppLogin },
};

</script>

<template>
    <div class="d-flex justify-content-center align-items-center login-page">
        <AppLogin></AppLogin>
    </div>
</template>

<style scoped lang="scss">
.login-page {
    height: 100vh;
}
</style>