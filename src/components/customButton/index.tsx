import React, { FC } from 'react';
import Loading from '../loading';
import st from './customButton.module.scss';

interface ICustomButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	isLoading?: boolean;
	btnType?: string;
}

const CustomButton: FC<ICustomButton> = ({ type, title, isLoading, className, btnType, onClick, onSubmit }) => {
	return (
		<button
			type={type}
			className={`${st.customButton} ${st[`customButton__${btnType}`]} ${className}`}
			onSubmit={onSubmit}
			onClick={onClick}>
			{title} {isLoading ? <Loading isButton={true} /> : null}
		</button>
	);
};

export default CustomButton;
