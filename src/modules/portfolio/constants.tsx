export interface NameValuePair {
  label: string;
  value: string;
  comp: Function|null;
}

export interface Market {
  marketId: string,
  description: string
}

export interface Tab {
  key: string,
  label: string,
  num: number
}
