<script>
import AppHeader from '../components/AppHeader.vue';
import AppMain from '../components/AppMain.vue';

export default {
    name: 'HomePage',
    components: { AppHeader, AppMain },
};

</script>

<template>
    <div id="home">
        <AppHeader></AppHeader>
        <AppMain></AppMain>
    </div>
</template>

<style scoped lang="scss"></style>