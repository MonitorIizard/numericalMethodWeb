import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import SetOfResult from '@/class/root-of-equation/SetOfResult';
import Column from '@/types/Column';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

interface PropsArguement {
	result: SetOfResult[];
	attributes: Column[];
}

export default function StickyHeadTable({ result, attributes }: PropsArguement) {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden' }}>
			<TableContainer sx={{ maxHeight: 440 }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{attributes.map((column) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth }}
									className="text-lg"
								>
									<InlineMath>{column.label}</InlineMath>
								</TableCell>
							))}
						</TableRow>
					</TableHead>

					<TableBody>
						{result.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
							return (
								<TableRow hover role="checkbox" tabIndex={-1} key={row.iterationNo}>
									{attributes.map((attribute) => {
										const value = row[attribute.id];
										return (
											<TableCell key={attribute.id} align={'center'}>
												<InlineMath>{value.toString()}</InlineMath>
											</TableCell>
										);
									})}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={result.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				className="text-md"
			/>
		</Paper>
	);
}
