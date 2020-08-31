type RecordItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createdAt?: Date;
};

type Tag = {
  id: string;
  name: string;
};
type TagListModel = {
  data: Tag[];
  create: (name: string) => "success" | "duplicated";
  fetch: () => Tag[];
  update: (id: string, name: string) => "success" | "not found" | "duplicated";
  remove: (id: string) => boolean;
  save: () => void;
};

interface Window {
  tagList: Tag[];
  findTag: (id: string) => Tag | undefined;
  createTag: (name: string) => void;
  removeTag: (id: string) => boolean;
  updateTag: (
    id: string,
    name: string
  ) => "success" | "not found" | "duplicated";
  recordList: RecordItem[];
  createRecord: (record: RecordItem) => void;
}
