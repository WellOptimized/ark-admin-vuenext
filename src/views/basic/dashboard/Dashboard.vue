<template>
  <PageWrapper :content-background="false">
    <ElCard class="px-4">
      <div class="font-semibold my-4 text-xl">您好, {{ getUsername }}, 欢迎使用移动通信网络流量预测平台!</div>
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
      >
        <el-button slot="trigger" size="medium" type="primary">上传流量数据文件</el-button>
        <el-button slot="trigger" size="medium" type="primary">上传基站拓扑文件</el-button>
        <el-button slot="trigger" size="medium" type="primary">上传模型</el-button>
      </el-upload>

      <el-button slot="trigger" size="medium" type="primary" @click="dataPreprogressVisible = true">
        数据预处理
      </el-button>

      <el-dialog
        v-model="dataPreprogressVisible"
        title="数据预处理"
        width="500"
        :before-close="handleClose"
      >
        <span>您确定要执行数据预处理操作吗？</span>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dataPreprogressVisible = false">取消</el-button>
            <el-button type="primary" @click="submitdataPreprocess">确定</el-button>
          </div>
        </template>
      </el-dialog>

      <div style="height: 10px;"></div>

      <el-button slot="trigger" size="medium" type="primary" @click="predictVisible = true">
        流量预测
      </el-button>

      <el-dialog
        v-model="predictVisible"
        title="流量预测"
        width="500"
        :before-close="handleClose"
      >
        <span>您确定要执行流量预测操作吗？</span>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="predictVisible = false">取消</el-button>
            <el-button type="primary" @click="submitPredict">确定</el-button>
          </div>
        </template>
      </el-dialog>

      <div style="height: 15px;"></div>

      <!-- <el-input v-model="baseIDInputVisible" placeholder="请输入想要观察的基站ID" />
      <div>
        <el-button @click="loadPredictImage" size="medium" type="primary">预测结果可视化</el-button>
        <img v-if="basePredictImageUrl" :src="basePredictImageUrl" alt="预测结果" />
      </div>

      <div style="height: 15px;"></div>  -->

      <div>
        <el-button @click="showBaseIDInput = true" size="medium" type="primary">预测结果可视化</el-button>
        <div v-if="showBaseIDInput">
          <el-form inline style="margin-top: 20px;">
            <el-form-item label="基站ID:">
              <el-input v-model="baseIDInput" placeholder="请输入想要观察的基站ID" />
            </el-form-item>
            <el-form-item>
              <el-button @click="submitbasdIDPicture">确认</el-button>
            </el-form-item>
          </el-form>
          <img v-if="ifShowBaseIDImage" :src="basePredictImageUrl" alt="Image" />
        </div>
      </div>

      
    </ElCard>
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref,computed } from 'vue'
import { PageWrapper } from '/@/components/Page'
import { DOC_SITE, VUE_REPO_GITHUB_URL, ZERO_REPO_GITHUB_URL, NEST_REPO_GITHUB_URL } from '/@/settings/siteSetting'
import { useUserStore } from '/@/stores/modules/user'
import { ElMessageBox, ElMessage } from 'element-plus'
const userStore = useUserStore()
const dataPreprogressVisible = ref(false)
const predictVisible = ref(false)

const basePredictImageUrl = ref('')
const baseIDInputVisible = ref('')


const showBaseIDInput=ref('')
const ifShowBaseIDImage=ref(false)

const baseIDInput=ref('')

const loadPredictImage = () => {
  ElMessage.success('预测结果可视化已完成')
  // 这里的路径应该是你的图片在服务器上的路径
  basePredictImageUrl.value = '/pic.png'
}

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}

const getUsername = computed(() => userStore.getUserInfo?.username)

const handleSuccess = (response, file, fileList) => {
  ElMessage.success('模型上传成功')
}

const beforeUpload = (file) => {
  console.log('开始上传文件')
}

const submitdataPreprocess = () => {
  ElMessage.success('数据预处理已完成')
  dataPreprogressVisible.value = false
}

const submitPredict = () => {
  ElMessage.success('流量预测已完成')
  predictVisible.value = false
}

const submitbasdIDPicture = () => {
  ElMessage.success('预测结果可视化成功')
  ifShowBaseIDImage.value=true
  basePredictImageUrl.value = '/pic.png'
}
</script>
