import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import Record from '../../class/linear-algebra-class/Record';

interface PropsArguement {
	result: Record[];
}

type attributes = {
  id : string,
  label : string,
  align? : string, 
  minWidth? : number
}

export default function StickyHeadTable({ result }: PropsArguement) {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const attributes : attributes[] = [
    { id: 'iterationNo', label: 'Iteration No.' },
    { id: 'x', label: 'x'},
    { id: 'value', label: 'value'},
    { id: 'tolerance', label: 'Tolerance'}
  ];

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
									align={"center"}
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
								<TableRow hover role="checkbox" tabIndex={-1} key={row.id} className={ Number(row["iterationNo"]) % 2 == 0 ? "bg-slate-100": " "}>
									{attributes.map((attribute) => {
										const value = row[attribute.id as keyof Record];
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


