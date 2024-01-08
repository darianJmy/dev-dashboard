<script setup lang="ts">
import { ref } from "vue";
import { Upload, UploadFilled } from "@element-plus/icons-vue";
import { utils, writeFile } from "xlsx";
import { genFileId } from "element-plus";
import type { UploadInstance, UploadProps, UploadRawFile } from "element-plus";

const dialog = ref(false);

const exportTemplate = async () => {
  const tHeader = ["资产编号", "带外地址", "厂商", "用户名", "密码"];
  const data = [["xxxx", "192.168.1.1", "联想", "admin", "123456"]];
  const ws = utils.aoa_to_sheet([tHeader, ...data]);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Sheet1");
  await writeFile(wb, "template.xlsx");
};

const upload = ref<UploadInstance>();

const handleExceed: UploadProps["onExceed"] = files => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
};

const submitUpload = () => {
  dialog.value = false;
  upload.value!.submit();
};

const close = () => {
  upload.value!.clearFiles();
};
</script>

<template>
  <div>
    <el-button
      style="margin-left: 12px"
      type="primary"
      :icon="Upload"
      @click="dialog = true"
      >导入</el-button
    >

    <!-- 导入 -->
    <el-dialog v-model="dialog" width="30%" center @close="close">
      <el-upload
        ref="upload"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        drag
        :limit="1"
        :on-exceed="handleExceed"
        :auto-upload="false"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <template #tip>
          <div class="el-upload__tip">
            只能上传xlsx文件，点击此处
            <a @click="exportTemplate" style="color: #409eff">下载模板</a>
          </div>
        </template>
      </el-upload>
      <template #footer>
        <div>
          <el-button @click="dialog = false">取消</el-button>
          <el-button type="primary" @click="submitUpload">确认</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
