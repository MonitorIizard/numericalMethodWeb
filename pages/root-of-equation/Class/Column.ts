import SetOfResult from "./SetOfResult";

interface Column {
	id: keyof SetOfResult; //'iterationNo' | 'root' | 'tolerance'; => 
	label: string;
	minWidth?: number;
	align?: 'right';
	format?: (value: number) => string;
}

export default Column;