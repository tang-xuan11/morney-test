import Vue from "vue";
import Vuex from "vuex";
import clone from "@/lib/clone";
import createId from "@/lib/createId";
import router from "@/router";
Vue.use(Vuex);
const defaultIconList = [
  { iconName: "child" },
  { iconName: "cure" },
  { iconName: "dress" },
  { iconName: "fruit" },
  { iconName: "live" },
  { iconName: "repast" },
  { iconName: "sports" },
  { iconName: "traffic" },
];

const store = new Vuex.Store({
  state: {
    recordList: [],
    createRecordError: null,
    tagList: [],
    iconList: defaultIconList,
    currentTag: undefined,
  } as RootState,
  mutations: {
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter((t) => t.id === id)[0];
    },
    updateTag(state, payload: { id: string; name: string }) {
      const { id, name } = payload;
      const idList = state.tagList.map((item) => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map((item) => item.name);
        if (names.indexOf(name) >= 0) {
          window.alert("标签名重复");
        } else {
          const tag = state.tagList.filter((item) => item.id === id)[0];
          tag.name = name;
          store.commit("saveTags");
        }
      }
    },
    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        state.tagList.splice(index, 1);
        store.commit("saveTags");
        router.back();
      } else {
        window.alert("删除失败");
      }
    },
    fetchRecords(state) {
      state.recordList = JSON.parse(
        window.localStorage.getItem("recordList") || "[]"
      ) as RecordItem[];
    },
    createRecord(state, record: RecordItem) {
      const record2 = clone(record);
      record2.createdAt = record2.createdAt || new Date().toISOString();
      state.recordList.push(record2);
      store.commit("saveRecords");
    },
    saveRecords(state) {
      window.localStorage.setItem(
        "recordList",
        JSON.stringify(state.recordList)
      );
    },
    fetchTags(state) {
      state.tagList = JSON.parse(
        window.localStorage.getItem("tagList") || "[]"
      );
      if (!state.tagList || state.tagList.length === 0) {
        store.commit("createTag", { name: "服饰", icon: "dress" });
        store.commit("createTag", { name: "孩子", icon: "child" });
        store.commit("createTag", { name: "水果", icon: "fruit" });
        store.commit("createTag", { name: "住宿", icon: "live" });
        store.commit("createTag", { name: "运动", icon: "sports" });
      }
    },
    createTag(state, tag: { name: string; icon: string }) {
      const { name, icon } = tag;
      const names = state.tagList.map((item) => item.name);
      if (names.indexOf(name) >= 0) {
        return window.alert("标签名重复");
      }
      const id = createId().toString();
      state.tagList.push({ id, name, icon });
      store.commit("saveTags");
    },
    saveTags(state) {
      window.localStorage.setItem("tagList", JSON.stringify(state.tagList));
    },
  },
});

export default store;
