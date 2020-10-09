<template>
  <div class="wrapper">
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click="goBack" />
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wapper">
      <FormItem
        :value="currentTag.name"
        @update:value="update"
        fieldName="标签名"
        placeholder="请输入标签名（不超过4个字符）"
        :maxlength="4"
      />
    </div>
    <div class="button-wapper">
      <Button @click="remove">删除标签</Button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import FormItem from "@/components/Money/FormItem.vue";
import Button from "@/components/Button.vue";
import { Component } from "vue-property-decorator";
import { Message } from "element-ui";

@Component({
  components: { FormItem, Button },
})
export default class EditLabel extends Vue {
  get currentTag() {
    return this.$store.state.currentTag;
  }
  created() {
    const id = this.$route.params.id;
    this.$store.commit("fetchTags");
    this.$store.commit("setCurrentTag", id);
    if (!this.currentTag) {
      this.$router.replace("/404");
    }
  }
  update(name: string) {
    if (this.currentTag) {
      this.$store.commit("updateTag", { id: this.currentTag.id, name });
    }
  }
  remove() {
    if (this.currentTag) {
      this.$store.commit("removeTag", this.currentTag.id);
    }
  }
  goBack() {
    if (this.currentTag.name === "") {
      return Message.warning({
        message: "标签名不能为空，且不能重复，请重新输入",
        offset: 55,
        showClose: true,
      });
    }
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  min-height: 100vh;
}
.navBar {
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  background: white;
  > .leftIcon {
    width: 24px;
    height: 24px;
  }
  > .rightIcon {
    width: 24px;
    height: 24px;
  }
}
.form-wapper {
  background: white;
  margin-top: 8px;
}
.button-wapper {
  text-align: center;
  padding: 16px 0;
  margin-top: 44-16px;
}
</style>