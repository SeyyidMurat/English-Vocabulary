import React, { useEffect, useState } from 'react';
import { Box, createStyles, Center, Text, Flex, Group, Button, Title } from '@mantine/core';
import { useWordContext } from '../context/WordContext';
import { Link, useParams } from 'react-router-dom';
import { wordApi } from '../api/api';
import toast, { Toaster } from 'react-hot-toast';
import WordCard from '../components/WordCard';
import Sidebar from '../components/Sidebar';
import Loading from '../components/Loading';
import Tools from '../components/Tools';
import EditModal from '../components/EditModal';
const useStyles = createStyles((theme) => ({
	generalWrapper: {
		flex: '1 0 auto',
		position: 'relative',
		height: 'calc(100% - 80px)',
	},
	homeWrapper: {
		flex: '1 1 auto',
		height: '100%',
		maxWidth: '100%',
		minWidth: '0',
		overflow: 'auto',
	},
	cardListWrapper: {
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
		gap: '1.25rem',
		padding: '1rem',
	},
}));

const Home = () => {
	const [editModalShow, setEditModalShow] = useState(false);
	const [editSelectWord, setEditSelectWord] = useState('');

	const { wordsData, dispatch } = useWordContext();
	const { wordType } = useParams();
	const { classes } = useStyles();

	const editWord = (word) => {
		setEditSelectWord(word);
		setEditModalShow(true);
	};

	const deleteWord = async (id) => {
		try {
			const { data } = await wordApi.delete(`/api/words/${id}`);
			dispatch({ type: 'DELETE_WORDS', payload: { params: wordType, id } });
			toast.success(data?.message);
		} catch (error) {
			toast.error(error.message);
		}
	};

	const learnedWord = async (word) => {
		try {
			const data = await Promise.all([
				wordApi.delete(`/api/words/${word._id}`),
				wordApi.post('/api/learned-words/add', word),
			]);
			dispatch({ type: 'DELETE_WORDS', payload: { params: wordType, id: word._id } });
			console.log(data);
		} catch (error) {
			toast.error(error.message);
		}
	};

	useEffect(() => {
		const getAllWords = async () => {
			try {
				const { data } = await wordApi.get('/api/words');
				dispatch({ type: 'GET_WORDS', payload: { data, wordType } });
			} catch (error) {
				dispatch({ type: 'ERROR_HANDLER', payload: error.message });
			}
		};

		getAllWords();
	}, []);
	if (wordsData.error)
		return (
			<Center style={{ height: '100%' }}>
				<Text fz="xl">{wordsData.error}</Text>
			</Center>
		);
	return (
		<>
			{wordsData.words ? (
				<Flex className={classes.generalWrapper}>
					<Sidebar />
					{wordsData.words.length > 0 ? (
						<Box className={classes.homeWrapper}>
							<Tools />
							<div className={classes.cardListWrapper}>
								{wordsData.selectWords.map((item, i) => (
									<WordCard word={item} index={i} key={item._id}>
										<Group pt={20}>
											<Button size="xs" radius="xl" onClick={() => editWord(item)}>
												Edit
											</Button>
											<Button
												color="green"
												size="xs"
												radius="xl"
												onClick={() => learnedWord(item)}
											>
												Learned
											</Button>
											<Button
												color="red"
												size="xs"
												radius="xl"
												onClick={() => deleteWord(item._id)}
											>
												Delete
											</Button>
										</Group>
									</WordCard>
								))}
							</div>
						</Box>
					) : (
						<Center style={{ flex: 1 }}>
							<Title order={3} underline color="indigo.5">
								<Link to="/add">Please Add Words...</Link>
							</Title>
						</Center>
					)}
				</Flex>
			) : (
				<Loading width="100%" />
			)}

			{editModalShow && (
				<EditModal opened={editModalShow} onClose={() => setEditModalShow(false)} selectWord={editSelectWord} />
			)}
			<Toaster position="bottom-right" />
		</>
	);
};

export default Home;
