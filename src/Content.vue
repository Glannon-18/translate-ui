<template>
    <el-container>
        <el-header class="header">
            <Head></Head>
        </el-header>
        <el-container>
            <router-view></router-view>
        </el-container>
    </el-container>
</template>

<script>
    import Head from "@/components/Head";

    export default {
        name: "Content",
        components: {
            Head
        },
        created() {
            this.$router.push("/content/home")
        }
    }
</script>

<style scoped>
    .header {
        background-color: #409eff;
    }

</style>