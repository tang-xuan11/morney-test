<template>
  <Layout>
    <div class="tags">
      <router-link
        class="tag"
        v-for="tag in tags"
        :key="tag.id"
        :to="`/labels/edit/${tag.id}`"
      >
        <span>
          <Icon :name="tag.icon" />
          {{ tag.name }}
        </span>
        <Icon name="right" />
      </router-link>
    </div>
    <router-link to="/money/addTagList">
      <div class="createTag-wapper">
        <Button class="createTag">新建标签</Button>
      </div>
    </router-link>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Button from "@/components/Button.vue";

@Component({
  components: { Button },
})
export default class Labels extends Vue {
  get tags() {
    return this.$store.state.tagList;
  }
  beforeCreate() {
    this.$store.commit("fetchTags");
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
    > span {
      display: flex;
      align-items: center;
      > .icon {
        font-size: 24px;
        margin-right: 4px;
      }
    }
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