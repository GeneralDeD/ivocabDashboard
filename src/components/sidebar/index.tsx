import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import { RouteNames } from "../../router";
import { setAuth } from "../../store/reducers/adminSlice";
import { burgerMenu, ivocab, ivocabDesc, ivocabText } from "../icons";
import st from "./sidebar.module.scss";

interface ISidebar {
	isOpen: boolean;
	setIsOpen: (e: boolean) => void;
}

const Sidebar: FC<ISidebar> = ({ isOpen, setIsOpen }) => {
	const dispatch = useAppDispatch(),
		navigate = useNavigate(),
		links = [
			{
				title: "Home",
				link: RouteNames.HOME,
				func: () => {
					navigate(RouteNames.HOME);

					if (document.body.clientWidth <= 1000) setIsOpen(false);
				},
			},
			{
				title: "Users",
				link: "/users",
				func: () => {
					navigate(RouteNames.TEST);

					if (document.body.clientWidth <= 1000) setIsOpen(false);
				},
			},
			{
				title: "Levels",
				link: "/levels",
				func: () => {
					navigate(RouteNames.LEVELS);

					if (document.body.clientWidth <= 1000) setIsOpen(false);
				},
			},
			{
				title: "Words",
				link: "/words",
				func: () => {
					navigate(RouteNames.WORDS);

					if (document.body.clientWidth <= 1000) setIsOpen(false);
				},
			},
			{
				title: "Support",
				link: "/support",
			},
			{
				title: "Log out",
				link: "/logout",
				func: () => {
					localStorage.removeItem("token");
					dispatch(setAuth(""));
				},
			},
		];

	return (
		<div className={`${st.sidebar} ${!isOpen ? st.sidebar__unactive : null}`}>
			<div className={st.sidebar__header}>
				<span className={st.sidebar__header__logo}>
					{ivocab}
					{ivocabText}
					{ivocabDesc}
				</span>
			</div>
			<div className={st.sidebar__body}>
				<ul>
					{links.map((item, i) => (
						<li
							key={i}
							className={`${st.sidebar__body__link} ${
								item.link === window.location.pathname ? st.sidebar__body__link__active : ""
							}`}
							onClick={() => (item.func ? item.func() : null)}
						>
							<span>{item.title}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Sidebar;
