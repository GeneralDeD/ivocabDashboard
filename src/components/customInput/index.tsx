import React, { FC } from "react";
import st from "./customInput.module.scss";

interface ICustomInput extends React.InputHTMLAttributes<HTMLInputElement> {
	defVal?: string | number | undefined;
}

const CustomInput: FC<ICustomInput> = ({
	title,
	name,
	defVal,
	value,
	onChange,
	type,
	placeholder,
	className,
	required,
}) => {
	return (
		<table className={`${st.customInput} ${className}`}>
			<tbody>
				<tr>
					<td>{title}</td>
					<td>
						{value ? (
							<input
								type={type}
								name={name}
								defaultValue={defVal}
								value={value}
								placeholder={placeholder}
								onChange={onChange}
								required={required}
							/>
						) : (
							<input
								type={type}
								name={name}
								defaultValue={defVal}
								placeholder={placeholder}
								required={required}
							/>
						)}
					</td>
				</tr>
			</tbody>
		</table>
	);
};

export default CustomInput;
