// 完整项目中可以有type这个目录，用于定义typescript顶层类型。
// 本项目未使用type目录，保留此目录主要是起到提醒备忘的作用，了明更大向中可以有types定义的环节。

// shared Types of this App.
export interface IMovie {
  _id: any;
  _source: {
    title: string;
    year: number;
    info: {
      plot: string;
      directors: string[];
      rating: number;
    };
  };
}
