<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click="goBack" />
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wapper">
      <FormItem :value="tag.name" @update:value="update" fieldName="标签名" placeholder="请输入标签名" />
    </div>
    <div class="button-wapper">
      <Button @click="remove">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import FormItem from "@/components/Money/FormItem.vue";
import Button from "@/components/Button.vue";
import { Component } from "vue-property-decorator";
import store from "@/store/index2";
@Component({
  components: { FormItem, Button },
})
export default class EditLabel extends Vue {
  tag?: Tag = undefined;
  created() {
    this.tag = store.findTag(this.$route.params.id);
    if (!this.tag) {
      this.$router.replace("/404");
    }
  }
  update(name: string) {
    if (this.tag) {
      store.updateTag(this.tag.id, name);
    }
  }
  remove() {
    if (this.tag) {
      if (store.removeTag(this.tag.id)) {
        this.$router.back();
      } else {
        window.alert("删除失败");
      }
    }
  }
  goBack() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
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