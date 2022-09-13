import React, { FC } from 'react';
import { chevron } from '../icons';
import st from './pagination.module.scss';

interface IPagin {
	page: number;
	limit: number;
	total: number;
	setPage: (e: number) => void;
}

const Pagination: FC<IPagin> = ({ page, limit, total, setPage }) => {
	return (
		<div className={st.pagination}>
			<p>
				{page} of {Math.ceil(total / limit)}
			</p>
			<span onClick={() => (page !== 1 ? setPage(page - 1) : null)}>{chevron}</span>
			<span onClick={() => (page !== Math.ceil(total / limit) ? setPage(page + 1) : null)}>{chevron}</span>
		</div>
	);
};

export default Pagination;
