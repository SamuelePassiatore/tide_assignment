<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
    name: "AppMain",
    data() {
        return {
            transactions: [],
            hasRecentTransaction: false,
            etherscanApiKey: '1BCG6YD8ISYEJ9BBB44SPJSIXGIKHEY7DW',
            checkedTransactions: false,
            uniswapAddress: '0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14',
            txHash: null,
            loading: false,
            loadingTransactions: false,
            errorMessage: null
        };
    },
    computed: {
        ...mapGetters(['userAddress']),
    },
    methods: {
        async checkRecentTransactions() {
            if (!this.userAddress) {
                this.errorMessage = 'Please connect your wallet first.';
                return;
            }

            this.loadingTransactions = true;
            this.errorMessage = null;

            const now = Math.floor(Date.now() / 1000);
            const twentyFourHoursAgo = now - 24 * 60 * 60;

            try {
                const response = await axios.get(`https://api-sepolia.etherscan.io/api`, {
                    params: {
                        module: 'account',
                        action: 'txlist',
                        address: this.userAddress,
                        startblock: 0,
                        endblock: 99999999,
                        sort: 'desc',
                        apikey: this.etherscanApiKey
                    }
                });

                const allTransactions = response.data.result;
                this.transactions = allTransactions.filter(tx => tx.timeStamp >= twentyFourHoursAgo && tx.to.toLowerCase() === this.uniswapAddress.toLowerCase());

                this.hasRecentTransaction = this.transactions.length > 0;
                this.checkedTransactions = true;
            } catch (error) {
                console.error('Error fetching transactions:', error);
                this.errorMessage = 'An error occurred while fetching transactions.';
            } finally {
                this.loadingTransactions = false;
            }
        },
        async mintNFT() {
            if (!this.userAddress) {
                this.errorMessage = 'Please connect your wallet first.';
                return;
            }

            this.loading = true;
            this.errorMessage = null;

            try {
                //  const response = await axios.post('http://localhost:3000/api/mint', { address: this.userAddress });
                const response = await axios.post('https://tide-assignment-backend.onrender.com/api/mint', { address: this.userAddress });
                if (response.status === 200) {
                    const txHash = response.data.transactionHash;
                    this.txHash = txHash;
                } else {
                    this.errorMessage = 'Failed to mint NFT.';
                }
            } catch (error) {
                console.error('Error minting NFT:', error);
                this.errorMessage = 'An error occurred while minting the NFT.';
            } finally {
                this.loading = false;
            }
        }
    },
};
</script>



<template>
    <main>
        <div class="d-flex justify-content-center align-items-center flex-column main-page">
            <div>
                <p class="mb-5 text-white">If you need sepolia tokens to use in uniswap, visit this address:
                    <a href="https://faucets.chain.link/sepolia" target="_blank">https://faucets.chain.link/sepolia</a>
                </p>
            </div>
            <div class="d-flex flex-column justify-content-center align-items-center">
                <div v-if="!checkedTransactions && !loadingTransactions">
                    <button @click="checkRecentTransactions" class="btn btn-success">Check Transactions</button>
                </div>
                <div v-else-if="loadingTransactions" class="d-flex flex-column align-items-center">
                    <div class="spinner-border text-light" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <p class="text-info">Checking transactions, please wait...</p>
                </div>
                <div v-else>
                    <div v-if="!hasRecentTransaction" class="d-flex flex-column align-items-center">
                        <p class="text-danger text-bold">
                            You have not made a transaction on Uniswap in the last 24 hours with this wallet. You cannot
                            mint the NFT.
                        </p>
                        <button @click="checkRecentTransactions" class="btn btn-secondary mt-2">Check Transactions
                            Again</button>
                    </div>
                    <div v-else class="d-flex flex-column align-items-center justify-content-center">
                        <div v-if="!txHash && !loading"
                            class="d-flex flex-column align-items-center justify-content-center">
                            <p class="text-success text-bold">You have made a transaction on Uniswap in the last 24
                                hours with this wallet. YOU CAN MINT THE NFT!</p>
                            <button @click="mintNFT" class="btn btn-warning">MINT NFT</button>
                        </div>

                        <div v-if="loading" class="d-flex flex-column align-items-center justify-content-center">
                            <div class="spinner-border text-light" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                            <p class="text-info">Minting NFT, please wait...</p>
                        </div>

                        <div class="d-flex flex-column align-items-center" v-if="txHash">
                            <p class="text-success text-bold text-center fs-1">Congratulations! You minted a NFT!</p>
                            <a class="text-white fs-3" :href="`https://sepolia.etherscan.io/tx/${txHash}`"
                                target="_blank">See the transaction on Sepolia Etherscan</a>
                        </div>

                        <div v-if="errorMessage" class="text-danger text-bold text-center">
                            <p>{{ errorMessage }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>


<style lang="scss" scoped>
.main-page {
    height: calc(100vh - 100px);
    background-color: darkblue;
}
</style>
