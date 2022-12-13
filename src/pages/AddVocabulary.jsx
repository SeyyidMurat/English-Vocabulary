import { useState, useEffect } from 'react';
import { Input, Stack, Card, Button, Box, Group, Container, Text, createStyles } from '@mantine/core';
import toast, { Toaster } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import DeleteIcon from '../assets/icons/DeleteIcon';
import { wordType } from '../utils/utils';
const useStyles = createStyles((theme) => ({
	wrapper: {
		height: '100%',
		display: 'grid',
		placeItems: 'center',
	},
}));
const AddVocabulary = () => {
	const [ınputValue, setInputValue] = useState({
		key: uuidv4(),
		vocabulary: '',
	});
	const [vocabularyList, setVocabularyList] = useState(() =>
		localStorage.getItem('vocabulary') ? JSON.parse(localStorage.getItem('vocabulary')) : wordType
	);
	const { classes } = useStyles();

	const removeVocabulary = (vocabulary) => {
		setVocabularyList(() => vocabularyList.filter((el) => el.vocabulary !== vocabulary));
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setInputValue((ınputValue) => ({ ...ınputValue, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setVocabularyList(() => [
			...vocabularyList,
			{ ...ınputValue, vocabulary: ınputValue.vocabulary.toLowerCase() },
		]);
		toast.success('Success Added');
		setInputValue(() => ({ key: uuidv4(), vocabulary: '' }));
	};

	useEffect(() => {
		localStorage.setItem('vocabulary', JSON.stringify(vocabularyList));
	}, [vocabularyList]);

	return (
		<Box className={classes.wrapper}>
			<Container size="lg">
				<Group position="center">
					{vocabularyList.map((el) => (
						<Button
							key={el.key}
							variant="light"
							color="indigo"
							transform="capitalize"
							compact
							onClick={() => removeVocabulary(el.vocabulary)}
						>
							<div>
								<DeleteIcon />
							</div>
							<Text transform="capitalize" weight={500}>
								{el.vocabulary}
							</Text>
						</Button>
					))}
				</Group>
			</Container>
			<Box sx={{ width: '360px', alignSelf: 'flex-start' }}>
				<form onSubmit={handleSubmit}>
					<Card shadow="lg" p="lg" withBorder>
						<Stack spacing="xl">
							<Input.Wrapper id="input-vocabulary" label="Enter Vocabulary">
								<Input
									id="input-word"
									name="vocabulary"
									placeholder="Enter Vocabulary"
									required
									value={ınputValue.vocabulary}
									onChange={handleChange}
								/>
							</Input.Wrapper>
							<Button type="submit" color="indigo">
								Add Vocabulary
							</Button>
						</Stack>
					</Card>
				</form>
			</Box>
			<Toaster position="bottom-right" />
		</Box>
	);
};

export default AddVocabulary;
