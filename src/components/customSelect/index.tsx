import React, { FC } from 'react';
import st from './customSelect.module.scss';

interface ICustomSelect extends React.SelectHTMLAttributes<HTMLSelectElement> {
	title: string;
	options: {
		title: string;
		value: string | number;
	}[];
	className?: string;
	setValue?: (e: number) => void;
}

const CustomSelect: FC<ICustomSelect> = ({ title, options, className, value, setValue }) => {
	return (
		<div className={`${st.customSelect} ${className}`}>
			<p>{title}</p>
			<select onChange={(e) => (setValue ? setValue(+e.target.value) : null)}>
				{options.map((option) => (
					<option key={option.title} value={option.value} selected={value == option.value ? true : false}>
						{option.title}
					</option>
				))}
			</select>
		</div>
	);
};

export default CustomSelect;
