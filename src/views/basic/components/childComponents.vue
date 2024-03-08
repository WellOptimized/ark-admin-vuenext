<template>
  <div class="hello">{{ `${props.user.name}在学习VUE3` }}</div>
  <el-dialog title="提示" v-model="dialogVisble" width="30%">
    <span>这是一段信息</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'

// 定义控制弹窗显隐的变量
const dialogVisble = ref(false)

// 接受父组件传过来的值
// const props = defineProps({
//   user: {
//     type: Object,
//     default: {}
//   }
// })
// 或者
const props = defineProps(['user'])

function confirm() {
  ElMessageBox.confirm('确定关闭吗?').then(() => {
    console.log('你点击了确定按钮')
    dialogVisble.value = false
  }).catch(() => { })
}

function close() {
  dialogVisble.value = false
}

// 将变量暴露出来
defineExpose({
  dialogVisble
})
</script>
