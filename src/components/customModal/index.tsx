interface ICustomModal {
	title: string;
	children: any;
	show: boolean;
	setShow: (e: any) => void;
}

export default function CustomModal({ title, show, setShow, children }: ICustomModal) {
	return (
		<div
			className={`absolute z-10 max-w-7xl mx-auto left-0 right-0 bg-slate-700 p-5 rounded-md transition-all ${
				show ? "top-4 opacity-100 visible" : "top-0 opacity-0 invisible"
			}`}
		>
			<div className="flex justify-between items-center">
				<h4 className="text-2xl font-bold">{title}</h4>
				<span onClick={() => setShow((prev: any) => ({ ...prev, show: !show }))}>Close</span>
			</div>
			{children}
		</div>
	);
}
