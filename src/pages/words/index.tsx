import React, { FC, useEffect, useState } from "react";
import CustomButton from "../../components/customButton";
import CustomInput from "../../components/customInput";
import CustomModal from "../../components/customModal";
import CustomSelect from "../../components/customSelect";
import CustomTable from "../../components/customTable";
import { del, edit, voiceIcon } from "../../components/icons";
import Loading from "../../components/loading";
import Pagination from "../../components/pagination";
import UploadFile from "../../components/uploadFile";
import { IAddWord, IWord } from "../../models/IWord";
import { useGetLevelsQuery } from "../../services/levelsService";
import {
	useAddWordMutation,
	useDeleteWordMutation,
	useEditWordMutation,
	useGetWordsQuery,
} from "../../services/wordsService";
import st from "./words.module.scss";

interface IWords {
	levelsData: { title: string; value: string; mark: number }[];
	voice: string;
	image: string;
	modal: {
		show: boolean;
		type: "add" | "edit";
		data?: IWord;
		variants?: string[];
	};
	deleteModal: {
		show: boolean;
		id?: string;
	};
}

const Words: FC = () => {
	const [levelsData, setLevelsData] = useState<IWords["levelsData"]>([]),
		[page, setPage] = useState<number>(1),
		[limit, setLimit] = useState<number>(10),
		defStateModal: IWords["modal"] = {
			show: false,
			type: "add",
		},
		[voice, setVoice] = useState<IWords["voice"]>(""),
		[image, setImage] = useState<IWords["image"]>(""),
		[modal, setModal] = useState<IWords["modal"]>(defStateModal),
		[deleteModal, setDeleteModal] = useState<IWords["deleteModal"]>({ show: false }),
		{ data: getLevels, isLoading } = useGetLevelsQuery(),
		{ data: getWords, isLoading: loading, error } = useGetWordsQuery(100000),
		[deleteWord] = useDeleteWordMutation(),
		[addWord] = useAddWordMutation(),
		[editWord] = useEditWordMutation();

	useEffect(() => {
		getLevels?.length &&
			setLevelsData(
				getLevels.map((item) => ({
					title: item.name,
					value: item._id,
					mark: item.mark,
				}))
			);
	}, [isLoading]);

	const onSave = (e: any) => {
		e.preventDefault();

		if (voice?.length && image?.length && modal.variants?.length === 3) {
			const data: IAddWord = {
				name: e.target[0].value,
				class: e.target[1].value,
				transcript: e.target[2].value,
				translationRu: e.target[3].value,
				translationUz: e.target[4].value,
				level: e.target[5].value,
				wordMark: levelsData?.find((item) => item.value === e.target[5].value)?.mark || 20,
				description: e.target[8].value,
				example: e.target[9].value,
				exampleRu: e.target[10].value,
				exampleUz: e.target[11].value,
				image: image,
				voice: voice,
				variants: modal?.variants,
			};

			modal.type === "add"
				? addWord(data).then((res) => {
						console.log(res);
						setModal(defStateModal);
				  })
				: editWord({ id: modal?.data?._id || "", word: data }).then((res) => {
						console.log(res);
						setModal(defStateModal);
				  });
		} else {
			alert("Something left!");
		}
	};

	const delItem = () => {
		if (deleteModal.id) {
			deleteWord(deleteModal.id).then((res) => {
				console.log(res);
				setDeleteModal({ show: false });
			});
		}
	};

	if (loading) return <Loading />;

	return (
		<div className={st.words}>
			<div className={st.words__manipulations}>
				<h4>Total: {getWords?.total}</h4>
				<CustomSelect
					title="Limit:"
					options={[
						{
							title: "5",
							value: 5,
						},
						{
							title: "10",
							value: 10,
						},
						{
							title: "20",
							value: 20,
						},
					]}
					value={limit}
					setValue={setLimit}
					className="me-3"
				/>
				<CustomButton
					title="Create"
					onClick={() =>
						setModal({
							show: true,
							type: "add",
							variants: [
								getWords?.words[getRandomArrayNumber(getWords?.words?.length || 0)]?._id || "",
								getWords?.words[getRandomArrayNumber(getWords?.words?.length || 0)]?._id || "",
								getWords?.words[getRandomArrayNumber(getWords?.words?.length || 0)]?._id || "",
							],
						})
					}
				/>
			</div>
			<CustomTable
				table={
					<table>
						<thead>
							<tr>
								<th>id</th>
								<th>Image</th>
								<th>Name</th>
								<th>Mark</th>
								<th className="text-nowrap">Part of</th>
								<th className="text-center text-nowrap">Variants</th>
								<th className="text-center text-nowrap">Transcription</th>
								<th className="text-center text-nowrap">Voice</th>
								<th className="text-center text-nowrap">Translation RU</th>
								<th className="text-center text-nowrap">Translation UZ</th>
								<th className="text-center text-nowrap">Level</th>
								<th className="text-center text-nowrap">Description</th>
								<th className="text-center text-nowrap">Example</th>
								<th className="text-center text-nowrap">Example RU</th>
								<th className="text-center text-nowrap">Example UZ</th>
								<th className="text-center text-nowrap">Actions</th>
							</tr>
						</thead>
						<tbody>
							{getWords?.words.slice((page - 1) * limit, page * limit).map((item, i) => (
								<tr key={item.name}>
									<td>{(page - 1) * +limit + i + 1}</td>
									<td>
										<img src={item.image.url} />
									</td>
									<td>{item.name}</td>
									<td>{item?.wordMark}</td>
									<td className="text-center">{item.class}</td>
									<td className="text-center">{item.variants.length ? "yes" : "no"}</td>
									<td className="text-center text-nowrap">[{item.transcript}]</td>
									<td
										className="text-center"
										onClick={() => {
											let audio = new Audio(item.voice.url);
											audio.play();
										}}
									>
										{voiceIcon}
									</td>
									<td className="text-center">{item.translationRu}</td>
									<td className="text-center">{item.translationUz}</td>
									<td className="text-center">{item?.level?.name}</td>
									<td className="text-left">{item.description}</td>
									<td className="text-left">{item.example}</td>
									<td className="text-left">{item.exampleRu}</td>
									<td className="text-left">{item.exampleUz}</td>
									<td>
										<div>
											<span
												onClick={() =>
													setModal({
														show: true,
														type: "edit",
														data: item,
														variants: item.variants.map((el) => el._id),
													})
												}
											>
												{edit}
											</span>
											<span onClick={() => setDeleteModal({ show: true, id: item._id })}>
												{del}
											</span>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				}
			/>

			<Pagination page={page} limit={limit} total={getWords?.total || 10} setPage={setPage} />
			{modal.show && (
				<CustomModal
					title={modal.type === "add" ? "Add new word" : "Edit word"}
					show={modal.show}
					setShow={setModal}
				>
					<form onSubmit={onSave} className={st.words__form}>
						<>{console.log(modal)}</>
						<div className={st.words__form__inputs}>
							<div className={st.words__form__inputs__left}>
								<CustomInput
									type="text"
									defVal={modal.data?.name}
									title="Name:"
									placeholder="Apple"
									required={true}
								/>
								<CustomInput
									type="text"
									defVal={modal.data?.class}
									title="Part of:"
									placeholder="n., v., adj."
									required={true}
								/>
								<CustomInput
									type="text"
									defVal={modal.data?.transcript}
									title="Transcription:"
									placeholder="ˈæp(ə)l"
									required={true}
								/>
								<CustomInput
									type="text"
									defVal={modal.data?.translationRu}
									title="Translation Ru:"
									placeholder="Яблоко"
									required={true}
								/>
								<CustomInput
									type="text"
									defVal={modal.data?.translationUz}
									title="Translation Uz:"
									placeholder="Olma"
									required={true}
								/>
								<CustomSelect title="Level:" options={levelsData} value={modal.data?.level?._id} />
							</div>
							<div className={st.words__form__inputs__voice}>
								<UploadFile
									defFile={modal.data?.voice}
									title="Voice"
									type="music"
									setValue={setVoice}
								/>
							</div>
							<div className={st.words__form__inputs__image}>
								<UploadFile
									type="img"
									defFile={modal.data?.image}
									title="Image"
									setValue={setImage}
								/>
							</div>
						</div>
						<div className={st.words__form__footer}>
							<CustomInput
								type="text"
								defVal={modal.data?.description}
								title="Description:"
								placeholder="An apple is a fruit"
								required={true}
							/>
							<CustomInput
								type="text"
								defVal={modal.data?.example}
								title="Example:"
								placeholder="I have two apples."
								required={true}
							/>
							<CustomInput
								type="text"
								defVal={modal.data?.exampleRu}
								title="Example Ru:"
								placeholder="У меня есть два яблока."
								required={true}
							/>
							<CustomInput
								type="text"
								defVal={modal.data?.exampleUz}
								title="Example Uz:"
								placeholder="Menda ikkita olma bor."
								required={true}
							/>
							<table className={st.words__form__footer__variants}>
								<tr>
									<td>№</td>
									<td>id</td>
								</tr>
								{modal?.variants?.length &&
									modal.variants.map((item, i) => (
										<tr>
											<td>{i}</td>
											<td>{item}</td>
										</tr>
									))}
							</table>
						</div>
						<div className="flex justify-end">
							<CustomButton
								type="button"
								title="Cancel"
								btnType="cancel"
								className="mr-2"
								onClick={() => setModal(defStateModal)}
							/>
							<CustomButton type="submit" title="Save" />
						</div>
					</form>
				</CustomModal>
			)}

			<CustomModal title="Are you sure?" show={deleteModal.show} setShow={setDeleteModal}>
				<div className="flex justify-end">
					<CustomButton
						type="button"
						title="Cancel"
						btnType="cancel"
						className="mr-2"
						onClick={() => setDeleteModal({ show: false })}
					/>
					<CustomButton type="button" title="Delete" btnType="delete" onClick={delItem} />
				</div>
			</CustomModal>
		</div>
	);
};

export default Words;

const getRandomArrayNumber = (len: number) => {
	return (Math.random() * len) | 0;
};
