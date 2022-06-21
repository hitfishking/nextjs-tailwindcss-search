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
		}
	}
}
