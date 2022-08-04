import { useState, useContext } from "react";
import { InputWrapper, Input, Stack, Button, Modal } from "@mantine/core";
import { WordContext } from "../context/WordContext";
import { wordApi } from "../api/api";
import StatusMessage from "./StatusMessage";

const EditModal = (props) => {
	const { dispatch } = useContext(WordContext);

	const [ınputValues, setInputValues] = useState(props.selectWord);
	const [openNotification, setOpenNotification] = useState(false);
	const [statusMessage, setStatusMessage] = useState("");

	const { _id, word, meaning, pronunciation, wordType } = ınputValues;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setInputValues((ınputValue) => ({ ...ınputValue, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const { data } = await wordApi.put(`/api/words/update/${_id}`, { wordType, word, meaning, pronunciation });
			dispatch({ type: "UPDATE_WORDS", payload: ınputValues });
			setStatusMessage({ message: data.message, code: "success" });
			setOpenNotification(true);
			props.onClose();
		} catch (error) {
			setStatusMessage({ message: error.message, code: "faild" });
			setOpenNotification(true);
			props.onClose();
		}
	};

	return (
		<>
			<Modal opened={props.opened} onClose={props.onClose}>
				<form onSubmit={handleSubmit}>
					<Stack spacing="xl">
						<InputWrapper id="input-word" label="Enter Word">
							<Input
								id="input-word"
								name="word"
								placeholder="Enter Word"
								value={ınputValues.word}
								onChange={handleChange}
								required
							/>
						</InputWrapper>
						<InputWrapper id="input-meaning" label="Meaning ">
							<Input
								id="input-meaning"
								name="meaning"
								placeholder="Meaning"
								value={ınputValues.meaning}
								onChange={handleChange}
								required
							/>
						</InputWrapper>
						<InputWrapper id="input-pronunciation" label="Pronunciation">
							<Input
								id="input-spoken"
								name="pronunciation"
								placeholder="Pronunciation"
								value={ınputValues.pronunciation}
								onChange={handleChange}
								required
							/>
						</InputWrapper>
						<Button type="submit" variant="gradient" gradient={{ from: "indigo", to: "cyan" }}>
							Edit Word
						</Button>
					</Stack>
				</form>
			</Modal>

			{openNotification && (
				<StatusMessage
					message={statusMessage.message}
					color={statusMessage.code === "faild" ? "red" : "green"}
				/>
			)}
		</>
	);
};

export default EditModal;
