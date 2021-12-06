<template>
  <div class="information-inner information-styem" ref="informationInner">
    <el-tabs v-model="activeName" type="card" ref="tabs" class="information-styem-tab">
      <el-tab-pane label="日志列表" name="list">
        <log-query-list></log-query-list>
      </el-tab-pane>
      <el-tab-pane label="日志统计" name="see">
        <log-query-see></log-query-see>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import logQueryList from "./logQueryList";
import logQuerySee from "./logQuerySee";
import bus from "@/utils/vueBus";
export default {
  components: {
    logQueryList,
    logQuerySee
  },
  data() {
    return {
      activeName: "list",
      tabState: "add"
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
</style>