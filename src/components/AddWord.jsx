import { useState } from "react";
import { InputWrapper, Input, NativeSelect, Stack, Card, Button, Box } from "@mantine/core";
import { wordApi } from "../api/api";
import toast, { Toaster } from "react-hot-toast";
const wordType = [
	{ key: 1, value: "noun", label: "Noun" },
	{ key: 2, value: "verb", label: "Verb" },
	{ key: 3, value: "adjective", label: "Adjective" },
	{ key: 4, value: "pronoun", label: "Pronoun" },
	{ key: 5, value: "adverb", label: "Adverb" },
	{ key: 6, value: "preposition", label: "Preposition" },
	{ key: 7, value: "conjunction", label: "Conjunction" },
	{ key: 8, value: "branchEnglish", label: "Branch English" },
];

const AddWord = () => {
	const [ınputValue, setInputValue] = useState({
		wordType: "",
		word: "",
		meaning: "",
		pronunciation: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setInputValue((ınputValue) => ({ ...ınputValue, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const { data } = await wordApi.post("api/words/add", ınputValue);
			toast.success(data?.message);
			setInputValue({ wordType: "", word: "", meaning: "", pronunciation: "" });
		} catch (error) {
			toast.error(error.message);
			setInputValue({ wordType: "", word: "", meaning: "", pronunciation: "" });
		}
	};

	return (
		<>
			<Box sx={{ width: "360px" }}>
				<form onSubmit={handleSubmit}>
					<Card shadow="lg" p="lg">
						<Stack spacing="xl">
							<NativeSelect
								label="Choose Word Type"
								data={wordType}
								value={ınputValue.wordType}
								onChange={handleChange}
								name="wordType"
								placeholder="Select"
								required
							/>
							<InputWrapper id="input-word" label="Enter Word">
								<Input
									id="input-word"
									name="word"
									placeholder="Enter Word"
									required
									value={ınputValue.word}
									onChange={handleChange}
								/>
							</InputWrapper>
							<InputWrapper id="input-meaning" label="Meaning ">
								<Input
									id="input-meaning"
									name="meaning"
									placeholder="Meaning"
									required
									value={ınputValue.meaning}
									onChange={handleChange}
								/>
							</InputWrapper>
							<InputWrapper id="input-pronunciation" label="Pronunciation">
								<Input
									id="input-spoken"
									name="pronunciation"
									placeholder="Pronunciation"
									required
									value={ınputValue.pronunciation}
									onChange={handleChange}
								/>
							</InputWrapper>
							<Button type="submit" color="indigo">
								Add Word
							</Button>
						</Stack>
					</Card>
				</form>
			</Box>
			<Toaster position="bottom-right" />
		</>
	);
};

export default AddWord;
