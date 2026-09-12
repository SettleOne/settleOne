export type DocPage = {
  id: string;
  title: string;
};

export type DocSection = {
  id: string;
  title: string;
  icon: any;
  pages: DocPage[];
};
