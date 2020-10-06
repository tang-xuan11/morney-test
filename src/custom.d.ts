type RootState = {
  recordList: RecordItem[];
  createRecordError: Error | null;
  tagList: Tag[];
  currentTag?: Tag;
  payIconList: Icon[];
  receiptIconList: Icon[];
};
type RecordItem = {
  tags: Tag[];
  notes: string;
  type: string;
  amount: number;
  createdAt?: string;
};
type Icon = {
  iconName: string;
};
type Tag = {
  id?: string;
  name: string;
  icon?: string;
};
type TagListModel = {
  data: Tag[];
  create: (name: string) => "success" | "duplicated";
  fetch: () => Tag[];
  update: (id: string, name: string) => "success" | "not found" | "duplicated";
  remove: (id: string) => boolean;
  save: () => void;
};
type DataSourceItem = {
  text: string;
  value: string;
};
