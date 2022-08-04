import React, { useState, useEffect } from "react";
import { InputWrapper, Stack, Card, Button, Box, Textarea } from "@mantine/core";
import { wordApi } from "../api/api";
import StatusMessage from "./StatusMessage";
const AddSentence = () => {
	const [ınputValue, setInputValue] = useState({
		sentence: "",
		meaning: "",
	});
	const [openNotification, setOpenNotification] = useState(false);
	const [statusMessage, setStatusMessage] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;
		setInputValue((ınputValue) => ({ ...ınputValue, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await wordApi.post("api/sentences/add", ınputValue);
			setStatusMessage({ message: data?.message, code: "success" });
			setInputValue({ sentence: "", meaning: "" });
			setOpenNotification(true);
		} catch (error) {
			setStatusMessage({ message: error?.message, code: "faild" });
			setInputValue({ sentence: "", meaning: "" });
			setOpenNotification(true);
		}
	};

	useEffect(() => {
		setTimeout(() => {
			setOpenNotification(false);
		}, 1500);
	}, [openNotification]);
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
			{openNotification && (
				<StatusMessage
					message={statusMessage.message}
					color={statusMessage.code === "faild" ? "red" : "green"}
				/>
			)}
		</>
	);
};

export default AddSentence;
