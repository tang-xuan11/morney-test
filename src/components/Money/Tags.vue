<template>
  <div class="tags">
    <ul class="current">
      <li v-for="tag in tagList" :key="tag.id" @click="toggle(tag)">
        <div
          class="iconWrapper"
          :class="{ selected: selectedTags.indexOf(tag) >= 0 }"
        >
          <Icon :name="tag.icon" />
        </div>
        <div class="iconName">
          {{ tag.name }}
        </div>
      </li>
      <li class="new">
        <router-link to="/money/addTagList" class="addTagList">
          <div class="addTagWrapper">
            <Icon name="add" />
          </div>
          <div class="addTag">新增标签</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class Tags extends Vue {
  get tagList() {
    return this.$store.state.tagList;
  }
  selectedTags: string[] = [];
  created() {
    this.$store.commit("fetchTags");
  }
  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.$emit("update:value", this.selectedTags);
  }
  create() {
    const name = window.prompt("请输入标签名");
    if (name === "") {
      return window.alert("标签名不能为空");
    } else if (name === null) {
      return;
    } else {
      this.$store.commit("createTag", { name });
      window.alert("添加成功");
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  display: flex;
  flex-grow: 1;
  padding: 16px;
  height: 100px;
  overflow: auto;
  > .current {
    flex-wrap: wrap;
    display: flex;
    align-content: flex-start;
    > li {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 25%;
      padding: 4px 12px;
      flex-direction: column;
      display: flex;
      > .iconName {
        font-size: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
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
    > .new {
      display: flex;
      padding: 4px 12px;
      > .addTagList {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border: none;
        background: transparent;
        > .addTag {
          font-size: 14px;
          display: flex;
          flex-wrap: nowrap;
        }
        > .addTagWrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          > .icon {
            display: flex;
            width: 40px;
            height: 40px;
          }
        }
      }
    }
  }
}
</style>