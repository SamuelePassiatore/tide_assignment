<script>
export default {
    name: "AppHeader",
    data() {
        return {

        }
    }
};
</script>

<template>
    <nav class="navbar navbar-expand-lg d-flex align-items-center justify-content-between px-5 py-3">
        <div class="d-flex align-items-center">
            <img src="../../public/ethereum_logo.png" class="logo" alt="logo">
            <span class="name ps-3 fs-3" href="#">TIDE</span>
        </div>
        <div id="navbarNavAltMarkup">
            <div class="navbar-nav d-flex">
                <button class="btn btn-primary me-2">Connect wallet</button>
                <button class="btn btn-danger">Log out</button>
            </div>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
.logo {
    width: 30px;
}

nav {
    height: 100px;
    background-color: darkblue;
}

.name {
    color: white;
}
</style>