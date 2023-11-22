<template>
  <el-dialog title="新增部门" :visible="showDialog" @close="close" />
</template>
<script>
export default {
  name: 'AddDept',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      this.$emit('update:showDialog', false)
    }
  }
}
</script>
