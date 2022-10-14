import { useState, useContext } from "react";
import { InputWrapper, Input, Stack, Button, Modal, Textarea } from "@mantine/core";
import { WordContext } from "../context/WordContext";
import { wordApi } from "../api/api";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
const EditModal = (props) => {
	const params = useParams();

	const { dispatch } = useContext(WordContext);

	const [ınputValues, setInputValues] = useState(props.selectWord);

	const { _id, word, meaning, pronunciation, wordType, example } = ınputValues;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setInputValues((ınputValue) => ({ ...ınputValue, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const { data } = await wordApi.put(`/api/words/update/${_id}`, {
				wordType,
				word,
				meaning,
				pronunciation,
				example,
			});
			dispatch({ type: "UPDATE_WORDS", payload: { params: params.wordType, editInputs: ınputValues } });
			toast.success(data?.message);
			props.onClose();
		} catch (error) {
			toast.error(error.message);
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
						<Textarea
							label="Example"
							name="example"
							placeholder="Example"
							required
							autosize
							minRows={2}
							value={ınputValues.example}
							onChange={handleChange}
						/>

						<Button type="submit" variant="gradient" gradient={{ from: "indigo", to: "cyan" }}>
							Edit Word
						</Button>
					</Stack>
				</form>
			</Modal>
			<Toaster position="bottom-right" />
		</>
	);
};

export default EditModal;
