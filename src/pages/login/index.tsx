import React, { FC, useState } from "react";
import CustomButton from "../../components/customButton";
import CustomInput from "../../components/customInput";
import { useAppDispatch } from "../../hooks/redux";
import { IAuth } from "../../models/IAuth";
import { useGetLoginMutation } from "../../services/authService";
import { setAuth } from "../../store/reducers/adminSlice";
import st from "./login.module.scss";

const Login: FC = () => {
	const dispatch = useAppDispatch();
	const [state, setState] = useState<IAuth>({ username: "", password: "" });
	const [login, { isLoading, error }] = useGetLoginMutation();

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const token = await login(state);

		if ("data" in token) {
			localStorage.setItem("token", token.data);
			dispatch(setAuth(token.data));
		}
	};

	const handleChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
		setState((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<div className={st.login}>
			<form className={st.login__block} onSubmit={onSubmit}>
				<h2>Sign in</h2>
				<CustomInput
					name="username"
					title="Username:"
					value={state.username}
					onChange={handleChange}
					type="text"
					placeholder="GooDeD"
					required={true}
				/>
				<CustomInput
					name="password"
					title="Password:"
					type="password"
					placeholder="********"
					required={true}
					value={state.password}
					onChange={handleChange}
				/>
				{error ? <p className="text-danger">Login or password error! GO AWAY!</p> : null}
				<CustomButton title="Sign in" type="submit" isLoading={isLoading} />
			</form>
		</div>
	);
};

export default Login;
