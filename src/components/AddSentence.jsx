import React, { useState } from "react";
import { InputWrapper, Stack, Card, Button, Box, Textarea } from "@mantine/core";
import { wordApi } from "../api/api";
import toast, { Toaster } from "react-hot-toast";
const AddSentence = () => {
	const [ınputValue, setInputValue] = useState({
		sentence: "",
		meaning: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setInputValue((ınputValue) => ({ ...ınputValue, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await wordApi.post("api/sentences/add", ınputValue);
			toast.success(data?.message);
			setInputValue({ sentence: "", meaning: "" });
		} catch (error) {
			toast.error(error.message);
			setInputValue({ sentence: "", meaning: "" });
		}
	};

	return (
		<>
			<Box sx={{ width: "360px" }}>
				<form onSubmit={handleSubmit}>
					<Card shadow="lg" p="lg">
						<Stack spacing="xl">
							<InputWrapper id="input-sentence" label="Sentence">
								<Textarea
									name="sentence"
									placeholder="Sentence"
									autosize
									minRows={2}
									required
									value={ınputValue.sentence}
									onChange={handleChange}
								/>
							</InputWrapper>
							<InputWrapper id="input-meaning" label="Meaning">
								<Textarea
									name="meaning"
									placeholder="Meaning"
									autosize
									minRows={2}
									required
									value={ınputValue.meaning}
									onChange={handleChange}
								/>
							</InputWrapper>
							<Button type="submit" color="indigo">
								Add Sentence
							</Button>
						</Stack>
					</Card>
				</form>
			</Box>
			<Toaster position="bottom-right" />
		</>
	);
};

export default AddSentence;
