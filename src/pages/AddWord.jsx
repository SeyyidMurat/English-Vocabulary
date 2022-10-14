import { useState } from "react";
import { InputWrapper, Input, NativeSelect, Stack, Card, Button, Box, Textarea, createStyles } from "@mantine/core";
import { wordApi } from "../api/api";
import toast, { Toaster } from "react-hot-toast";

const useStyles = createStyles((theme) => ({
	wrapper: {
		height: "100%",
		display: "grid",
		placeItems: "center",
	},
	selectItem: {
		option: {
			textTransform: "capitalize",
		},
	},
}));
const AddWord = () => {
	const [ınputValue, setInputValue] = useState({
		wordType: "",
		word: "",
		meaning: "",
		pronunciation: "",
		example: "",
	});

	const { classes } = useStyles();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setInputValue((ınputValue) => ({ ...ınputValue, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const { data } = await wordApi.post("api/words/add", ınputValue);
			toast.success(data?.message);
			setInputValue({ wordType: "", word: "", meaning: "", pronunciation: "", example: "" });
		} catch (error) {
			toast.error(error.message);
			setInputValue({ wordType: "", word: "", meaning: "", pronunciation: "", example: "" });
		}
	};

	return (
		<Box className={classes.wrapper}>
			<Box sx={{ width: "360px" }}>
				<form onSubmit={handleSubmit}>
					<Card shadow="lg" p="lg">
						<Stack spacing="xl">
							<NativeSelect
								className={classes.selectItem}
								label="Choose Word Type"
								data={JSON.parse(localStorage.getItem("vocabulary")).map((el) => el.vocabulary)}
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

							<Textarea
								label="Example"
								name="example"
								placeholder="Example"
								required
								autosize
								minRows={2}
								value={ınputValue.example}
								onChange={handleChange}
							/>

							<Button type="submit" color="indigo">
								Add Word
							</Button>
						</Stack>
					</Card>
				</form>
			</Box>
			<Toaster position="bottom-right" />
		</Box>
	);
};

export default AddWord;
