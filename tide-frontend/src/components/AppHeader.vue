<script>
import Web3 from 'web3';
import { mapActions } from 'vuex';

export default {
    name: 'AppHeader',
    data() {
        return {
            web3: null,
            accounts: [],
            userAddress: null,
            isConnected: false
        };
    },
    methods: {
        ...mapActions(['setUserAddress', 'clearUserAddress']),
        async connectWallet() {
            if (typeof window.ethereum !== 'undefined') {
                try {
                    this.web3 = new Web3(window.ethereum);
                    this.accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                    this.userAddress = this.accounts[0];
                    this.isConnected = true;
                    this.setUserAddress(this.userAddress);
                    console.log('Connected account:', this.userAddress);
                } catch (error) {
                    console.error('Error connecting to wallet:', error);
                    alert('An error occurred while connecting to the wallet.');
                }
            } else {
                console.error('MetaMask is not installed!');
                alert('MetaMask is not installed! Please install MetaMask and try again.');
            }
        },
        logout() {
            this.web3 = null;
            this.accounts = [];
            this.userAddress = null;
            this.isConnected = false;
            this.clearUserAddress();
            alert('You have been logged out of the application. Please disconnect your wallet from MetaMask for complete security.');
            this.$router.push({ name: 'login' });
        },
        backToHomePage() {
            this.$router.push({ name: 'login' });
        },
    },
    computed: {
        formatUserAddress() {
            if (this.userAddress) {
                const firstChars = this.userAddress.substring(0, 6);
                const lastChars = this.userAddress.substring(this.userAddress.length - 4);
                return `${firstChars}...${lastChars}`;
            } else {
                return '';
            }
        }
    },
    mounted() {
        if (typeof window.ethereum !== 'undefined') {
            window.ethereum.request({ method: 'eth_accounts' })
                .then(accounts => {
                    if (accounts.length > 0) {
                        this.accounts = accounts;
                        this.userAddress = this.accounts[0];
                        this.isConnected = true;
                        this.setUserAddress(this.userAddress);
                        console.log('Wallet already connected:', this.userAddress);
                    }
                })
                .catch(error => {
                    console.error('Error checking wallet connection:', error);
                });
        }
    }
};
</script>

<template>
    <nav class="navbar navbar-expand-lg d-flex align-items-center justify-content-between px-5 py-3">
        <div class="d-flex align-items-center">
            <img @click="refreshHomePage" src="../../public/ethereum_logo.png" class="logo" alt="logo">
            <span class="name ps-3 fs-3" href="#">TIDE</span>
        </div>
        <div id="navbarNavAltMarkup">
            <div class="navbar-nav d-flex align-items-center">
                <button v-if="!isConnected" class="btn btn-primary me-4" @click="connectWallet">Connect wallet</button>
                <div v-if="isConnected" class="me-4">
                    <img src="../../public/metamask.png" alt="metamask" class="logo-wallet me-1">
                    <span class="me-2 text-white wallet-address">{{ formatUserAddress }}</span>
                </div>
                <button class="btn btn-danger" @click="logout">Log out</button>
            </div>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
.logo {
    width: 30px;
    cursor: pointer;
}

nav {
    height: 100px;
    background-color: darkblue;
    border-bottom: 2px solid white;
}

.name {
    color: white;
}

.logo-wallet {
    height: 30px;
}
</style>