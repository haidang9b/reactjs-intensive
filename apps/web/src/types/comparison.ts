export type ComparisonItem = {
  id: number;
  slug: string;
  name: string;
  image: string;
  price: number;
};

export type ComparisonRow = {
  label: string;
  values: string[];
};

export type Comparison = {
  productIds: number[];
  items: ComparisonItem[];
  comparisonRows: ComparisonRow[];
};
