<script setup lang="ts">
import { ref } from 'vue'
const data = [
  {
    value: '1',
    label: 'Level one 1',
    children: [
      {
        value: '1-1',
        label: 'Level two 1-1',
        children: [
          {
            value: '1-1-1',
            label: 'Level three 1-1-1'
          }
        ]
      }
    ]
  },
  {
    value: '2',
    label: 'Level one 2',
    children: [
      {
        value: '2-1',
        label: 'Level two 2-1',
        children: [
          {
            value: '2-1-1',
            label: 'Level three 2-1-1'
          }
        ]
      },
      {
        value: '2-2',
        label: 'Level two 2-2',
        children: [
          {
            value: '2-2-1',
            label: 'Level three 2-2-1'
          }
        ]
      }
    ]
  }
]

const form = ref({
  ids: []
})

const handleFocus = () => {
  console.log('focus')
}

const handleBlur = () => {
  console.log('blur')
}
</script>
<template>
  <ElForm ref="formRef" :model="form">
    <ElForm-item label="test">
      <ElTreeSelect
        v-model="form.ids"
        :data="data"
        show-checkbox
        check-strictly
        check-on-click-node
        filterable
        multiple
        @focus="handleFocus"
        @blur="handleBlur"
        ref="selectTreeRef"
      />
    </ElForm-item>
  </ElForm>
</template>
