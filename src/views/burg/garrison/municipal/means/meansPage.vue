<template>
  <div class="information-inner information-change" ref="informationInner">
    <div class="information-tab" @click="handleTabClick">
      <h1 class="information-title active" name="list">
        资料清单
      </h1>
      <h1 class="information-title" name="add">调阅记录</h1>
    </div>
    <div class="tab-list-content">
      <means-list v-if="tabName === 'list'"></means-list>
      <means-add v-else></means-add>
    </div>
  </div>
</template>

<script>
import meansList from "./meansList";
import meansAdd from "./meansAdd";
export default {
  components: {
    meansList,
    meansAdd
  },
  data() {
    return {
      tabName: "list"
    };
  },
  created() {},
  methods: {
    handleTabClick(e) {
      const tabs = document.getElementsByClassName("information-title");
      for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("active");
      }
      e.target.classList.add("active");
      this.tabName = e.target.getAttribute("name");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>