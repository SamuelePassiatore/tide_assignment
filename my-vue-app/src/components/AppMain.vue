<script>
export default {
    name: "AppMain",
    data() {
        return {

        }
    }
};
</script>

<template>
    <main>
        <div class="d-flex justify-content-center align-items-center main-page">
            <div class="d-flex flex-column justify-content-center align-items-center">
                <p>You have made a transaction in the last 24 hours with this wallet</p>
                <button class="btn btn-warning">MINT NFT</button>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.main-page {
    height: calc(100vh - 100px);
}
</style>