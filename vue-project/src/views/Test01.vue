<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
            {{this}}
                <h1>{{that.count}}</h1>
                <button @click="that.increment">Increment</button>
            </div>
        </div>
    </div>
</template>
<script>
import {defineComponent} from 'vue'
    export default defineComponent({
        name: 'Home',

        data:(vm) =>{
            return {
                that: vm,
                count: 0,
            }
        },
        methods: {
            increment() {
                this.count++
            }
        },
    })
    </script>