<template>
  <Layout>
    <div class="tags">
      <router-link class="tag" v-for="tag in tags" :key="tag.id" :to="`/labels/edit/${tag.id}`">
        <span>{{tag.name}}</span>
        <Icon name="right" />
      </router-link>
    </div>
    <div class="createTag-wapper">
      <Button class="createTag" @click="createTag">新建标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import tagListModel from "@/models/tagListModel";
import Button from "@/components/Button.vue";

@Component({
  components: { Button },
})
export default class Labels extends Vue {
  tags = window.tagList;

  createTag() {
    const name = window.prompt("请输入标签名");
    if (name) {
      window.createTag(name);
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  max-height: 70vh;
  overflow: auto;
  background: white;
  font-size: 16px;
  padding-left: 16px;
  > .tag {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e2e2e2;
    > svg {
      font-size: 20px;
      margin-right: 16px;
    }
  }
}
.createTag {
  background: #ffa500;
  border: none;
  border-radius: 4px;
  height: 40px;
  padding: 0 16px;
  &-wapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
}
</style>