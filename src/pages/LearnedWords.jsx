import React, { useState, useEffect } from 'react';
import { Group, Button, Box, Center, Text, Flex } from '@mantine/core';
import { wordApi } from '../api/api';
import Loading from '../components/Loading';
import toast, { Toaster } from 'react-hot-toast';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import WordCard from '../components/WordCard';
import 'swiper/css';
import 'swiper/css/pagination';

const LearnedWords = () => {
	const [learnedWords, setLearnedWords] = useState();
	const [error, setError] = useState();

	const deleteWord = async (id) => {
		try {
			const { data } = await wordApi.delete(`/api/learned-words/delete/${id}`);
			setLearnedWords(() => learnedWords.filter((el) => el._id !== id));

			toast.success(data?.message);
		} catch (error) {
			toast.error(error.message);
		}
	};

	useEffect(() => {
		const getAllWords = async () => {
			try {
				const { data } = await wordApi.get('/api/learned-words');
				setLearnedWords(data);
			} catch (error) {
				setError(error);
			}
		};
		getAllWords();
	}, []);

	if (error)
		return (
			<Center style={{ height: '100%' }}>
				<Text fz="xl">{error}</Text>
			</Center>
		);

	return (
		<>
			{learnedWords ? (
				<Box h="100%">
					<Flex justify="center" align="center" h="100%" px="1rem">
						<Swiper
							spaceBetween={50}
							slidesPerView={1}
							modules={[Pagination, Navigation]}
							pagination={{
								type: 'fraction',
							}}
							style={{ width: '400px', paddingBottom: '2.5rem' }}
						>
							{learnedWords?.map((item, i) => (
								<SwiperSlide key={item._id} style={{ height: 'auto' }}>
									<WordCard word={item} index={i}>
										<Group>
											<Button
												variant="outline"
												color="gray"
												size="xs"
												radius="xl"
												onClick={() => deleteWord(item._id)}
											>
												Delete
											</Button>
										</Group>
									</WordCard>
								</SwiperSlide>
							))}
						</Swiper>
					</Flex>
					<Toaster position="bottom-right" />
				</Box>
			) : (
				<Loading />
			)}
		</>
	);
};

export default LearnedWords;
