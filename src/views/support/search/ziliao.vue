<template>
  <div class="ziliao">
    <section>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="资料目录">{{
          info.businessTypeName
        }}</el-descriptions-item>
        <el-descriptions-item label="资料分类">{{
          info.classification
        }}</el-descriptions-item>
        <el-descriptions-item label="资料标题">{{
          info.title
        }}</el-descriptions-item>
        <el-descriptions-item label="资料文号">{{
          info.fileNumber
        }}</el-descriptions-item>
        <el-descriptions-item label="所属地区">
          {{ info.areaName }}
        </el-descriptions-item>
        <el-descriptions-item label="提供人/单位">
          {{ info.fromPerson }}/{{ info.fromUnit }}
        </el-descriptions-item>
        <el-descriptions-item label="资料简介" :span="2">
          {{ info.content }}
        </el-descriptions-item>
        <el-descriptions-item label="附件" :span="2">
          <section v-if="info.attachmentId">
            <span>{{ info.attachmentName }}</span
            ><a
              href="#"
              @click="preview(info.attachmentId)"
              style="margin-left: 10px; color: #409eff"
              >预览</a
            ><a
              href="#"
              style="margin-left: 10px; color: #409eff"
              @click="downloadFile(info.attachmentId)"
              >下载</a
            >
          </section>

          <span v-else>-</span>
        </el-descriptions-item>
      </el-descriptions>
    </section>
    <!-- <section>
      <img :src="path" alt="">
    </section> -->
  </div>
</template>
<script>
import { getSingleInfo, filePreview } from "@/utils/styem";
import { manageSee } from "@/api/support/material";
export default {
  data() {
    return {
      id: "",
      info: {},
      FileList: [],
    };
  },

  computed: {},
  created() {
    this.id = this.$route.query.id;
    this.getinfo();
  },
  methods: {
    preview(ids) {
      filePreview(ids);
    },
    downloadFile: function (ids) {
      getSingleInfo(ids);
    },
    getinfo: async function () {
      const res = await manageSee({ id: this.id });
      this.info = res.data;
    },
  },
};
</script>

<style lang="scss" scoped>
.ziliao {
  padding: 20px;
  section {
    margin-bottom: 20px;
    header {
      height: 40px;
      line-height: 40px;
      background: #409eff;
      text-align: center;
      color: white;
    }
  }
}

</style>


