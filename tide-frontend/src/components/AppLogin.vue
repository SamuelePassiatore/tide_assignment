<script>
export default {
    name: "AppLogin",
    data() {
        return {
            username: '',
            password: '',
            error: ''
        };
    },
    methods: {
        login() {
            const validUsername = 'admin';
            const validPassword = 'admin';

            if (this.username === validUsername && this.password === validPassword) {
                this.$router.push({ name: 'home' });
            } else {
                this.error = 'Invalid username or password';
            }
        }
    }
};
</script>

<template>
    <div class="log-form">
        <h2>Login</h2>
        <form @submit.prevent="login">
            <input type="text" title="username" placeholder="username" v-model.trim="username" required />
            <input type="password" title="password" placeholder="password" v-model.trim="password" required />
            <button type="submit" class="btn">Login</button>
            <p v-if="error" class="error">{{ error }}</p>
        </form>
    </div>
</template>

<style lang="scss" scoped>
.log-form {
    width: 40%;
    background: #fff;

    box-shadow: 0px 2px 5px rgba(0, 0, 0, .25);


    form {
        display: block;
        width: 100%;
        padding: 2em;
    }

    h2 {
        width: 100%;
        color: lighten(white, 20%);
        font-size: 1.35em;
        display: block;
        background-color: darkblue;
        text-transform: uppercase;
        padding: .75em 1em .75em 1.5em;
        box-shadow: inset 0px 1px 1px fadeout(white, 95%);
        border: 1px solid darken(#2a2a2a, 5%);
        margin: 0;
        font-weight: 200;
    }

    input {
        display: block;
        margin: auto auto;
        width: 100%;
        margin-bottom: 2em;
        padding: .5em 0;
        border: none;
        border-bottom: 1px solid #eaeaea;
        padding-bottom: 1.25em;
        color: #757575;

        &:focus {
            outline: none;
        }
    }

    .btn {
        display: inline-block;
        background-color: darkblue;
        border: 1px solid darken(darkblue, 5%);
        padding: .5em 2em;
        color: white;
        margin-right: .5em;
        box-shadow: inset 0px 1px 0px fadeout(white, 80%);

        &:hover {
            background: lighten(#2b2359, 5%);
        }

        &:active {
            background: #2b2359;
            box-shadow: inset 0px 1px 1px fadeout(black, 90%);
        }

        &:focus {
            outline: none;
        }
    }

    .error {
        color: red;
        margin-top: 2.5em;
    }

}
</style>
