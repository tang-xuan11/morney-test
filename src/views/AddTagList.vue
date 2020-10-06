<template>
  <Layout>
    <div class="navBar">
      <Icon name="left" class="leftIcon" @click="goBack" />
      <span class="title">添加标签</span>
      <span @click="saveAddTag" class="finish">完成</span>
    </div>
    <div class="form-wrapper">
      <FormItem
        :value.sync="addTag.name"
        placeholder="请输入标签名（不超过4个字符）"
        :maxlength="4"
        fieldName="标签名"
      />
    </div>
    <ul class="icons">
      <li v-for="icon in iconList" :key="icon.iconName" @click="toggle(icon)">
        <div
          class="iconWrapper"
          :class="{ selected: selectedIcons.indexOf(icon) >= 0 }"
        >
          <Icon :name="icon.iconName" />
        </div>
      </li>
    </ul>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import FormItem from "@/components/Money/FormItem.vue";
import { Component } from "vue-property-decorator";
import { add } from "lodash";
import Tags from "@/components/Money/Tags.vue";
@Component({
  components: { FormItem },
})
export default class AddTagList extends Vue {
  addTag: Tag = {
    name: "",
    icon: "",
  };

  get iconList() {
    return this.$store.state.iconList;
  }
  selectedIcons: any[] = [];

  toggle(icon: string) {
    const index = this.selectedIcons.indexOf(icon);
    if (index >= 0) {
      this.selectedIcons.splice(index, 1);
    } else {
      this.selectedIcons.push(icon);
    }
    if (this.selectedIcons.length > 1) {
      this.selectedIcons.splice(0, 1);
    }
    if (this.selectedIcons[0]) {
      this.addTag.icon = this.selectedIcons[0].iconName;
    }
    this.$emit("update:value", this.selectedIcons);
  }
  goBack() {
    this.$router.back();
  }
  saveAddTag() {
    if (this.addTag.name === "") {
      return window.alert("标签名不能为空");
    }
    if (this.addTag.icon === "") {
      return window.alert("请选择一个标签");
    }
    this.$store.commit("createTag", this.addTag);
    this.addTag = { name: "", icon: "" };
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
.navBar {
  background: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  > .leftIcon {
    font-size: 24px;
  }
}
.form-wrapper {
  margin-top: 12px;
  background: #fff;
}
ul {
  flex-wrap: wrap;
  display: flex;
  align-content: flex-start;
  margin-top: 12px;
  > li {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25%;
    padding: 4px 12px;
    flex-direction: column;
    display: flex;
    > .iconWrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      &.selected {
        background: orange;
        color: white;
      }
      > .icon {
        display: flex;
        width: 40px;
        height: 40px;
      }
    }
  }
}
</style>