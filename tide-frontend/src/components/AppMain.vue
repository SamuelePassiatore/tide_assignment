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
            uniswapAddress: '0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14'
        };
    },
    computed: {
        ...mapGetters(['userAddress']),
    },
    methods: {
        async checkRecentTransactions() {
            if (!this.userAddress) {
                alert('Please connect your wallet first.');
                return;
            }

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
                alert('An error occurred while fetching transactions.');
            }
        },
        async mintNFT() {
            if (!this.userAddress) {
                alert('Please connect your wallet first.');
                return;
            }

            try {
                const response = await axios.post('http://localhost:3000/api/mint', { address: this.userAddress });
                if (response.status === 200) {
                    alert('NFT Minted Successfully!');
                } else {
                    alert('Failed to mint NFT.');
                }
            } catch (error) {
                console.error('Error minting NFT:', error);
                alert('An error occurred while minting the NFT.');
            }
        }
    }
};
</script>

<template>
    <main>
        <div class="d-flex justify-content-center align-items-center main-page">
            <div class="d-flex flex-column justify-content-center align-items-center">
                <p class="mb-5">If you need sepolia tokens to use in uniswap, visit to this address:
                    <a href="https://faucets.chain.link/sepolia" target="_blank">https://faucets.chain.link/sepolia</a>
                </p>
                <div v-if="!checkedTransactions">
                    <button @click="checkRecentTransactions" class="btn btn-secondary">Check Transactions</button>
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
                    <div v-else class="d-flex flex-column align-items-center">
                        <p class="text-success text-bold">You have made a transaction on Uniswap in the last 24 hours
                            with this wallet. YOU CAN MINT THE NFT!
                        </p>
                        <button @click="mintNFT" class="btn btn-warning">MINT NFT</button>
                        <p>See the transaction on Sepolia Etherscan</p>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.main-page {
    height: calc(100vh - 100px);
}
</style>
