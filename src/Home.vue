<template>

    <div class="root">
        <div class="content">
            1111
        </div>
        <div class="content">
            3333
        </div>
        <div class="content">
            44444
        </div>
        <div class="content">
            5566
        </div>
    </div>


</template>

<script>
    export default {
        name: "Home",
    }
</script>

<style scoped>
    .root {
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
    }

    .content {
        width: 47%;
        margin-top: 10px;
    }

    .content {
        height: 250px;
        box-shadow: 2px 2px 10px #9090905c;
        border-radius: 5px;
        padding: 7px
    }


</style>