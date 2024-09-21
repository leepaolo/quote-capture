export interface IRoot {
  success: ISuccess;
  contents: IContents;
}

export interface ISuccess {
  total: number;
}

export interface IContents {
  quotes: IQuote[];
}

export interface IQuote {
  quote: string;
  length: string;
  author: string;
  tags: string[];
  category: string;
  id: string;
}
