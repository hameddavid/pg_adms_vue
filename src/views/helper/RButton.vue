<template>
  <button :loadingState="loadingState" type="button" @click="handleClick" @myevent="my"  >
    <span v-if="loadingState"
      class="spinner-grow spinner-grow-sm"
      role="status"
      aria-hidden="true"
    ></span>
    
    <span :class="loadingState ? 'visually-hidden' : ''">
        <slot name="label">
    </slot> 
    </span>
  </button>
</template>

<script>
export default {
    name:'RButton',
    data() {
        return {
            loadingState: false,

        }
    },
    methods: {
        handleMouseOver(e){
            console.log(e)
            console.log('mouse over')
        },
        handleClick(e){
            this.loadingState = !this.loadingState;
            this.$emit('click');
            
        },
        my(){
            console.log('my')
        }
    },
    created() {
        Fire.$on('myevent',()=>{
            console.log('my event')
        })
        
    },
};
</script>

<style></style>
