<template>
    <fieldset class="fieldset">
    	<label for="min">Глобальный поиск</label>
    	<input class="fieldset__input" type="text" placeholder="Введите искомый текст" name="" v-model="query">
    </fieldset>	
</template>

<script>


export default {
   
computed: {
    query: {
        get() {
            return this.$store.state.query
        },
        set(value){   
            this.$store.commit('queryChange',value)
        }
    }
}
}
</script>

<style scoped>

</style>