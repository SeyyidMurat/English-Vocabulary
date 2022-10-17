import React, { useState } from "react";
import EditModal from "./EditModal";
import { wordApi } from "../api/api";
import { useWordContext } from "../context/WordContext";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Box, Card, Text, Stack, Button, createStyles, Group, Center, Title, List, ListItem } from "@mantine/core";

const useStyles = createStyles((theme) => ({
	cardListWrapper: {
		display: "grid",
		gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
		gap: "1.25rem",
		padding: "1rem",
	},

	isFlipped: {
		transform: "rotateY(180deg)",
	},

	cardInner: {
		height: "100%",
		transition: "transform .5s ease",
		transformStyle: "preserve-3d",
		cursor: "pointer",
		position: "relative",
	},
	cardFace: {
		backfaceVisibility: "hidden",
		overflow: "hidden",
	},
	cardFront: {
		position: "absolute",
		inset: 0,
	},
	cardBack: {
		width: "100%",
		height: "100%",
		display: "flex",
		zIndex: 1,
		transform: "rotateY(180deg)",
	},
	cardBackChild: {
		flex: 1,
	},
	cardBackList: {
		flex: 1,
	},
}));

const WordCard = () => {
	const [editModalShow, setEditModalShow] = useState(false);
	const [editSelectWord, setEditSelectWord] = useState("");
	const [flippedCard, setFlippedCard] = useState("");
	const { wordType } = useParams();
	const { classes, cx } = useStyles();
	const {
		wordsData: { selectWords },
		dispatch,
	} = useWordContext();

	const editWord = (item) => {
		setEditSelectWord(item);
		setEditModalShow(true);
	};

	const deleteWord = async (id) => {
		try {
			const { data } = await wordApi.delete(`/api/words/${id}`);
			dispatch({ type: "DELETE_WORDS", payload: { params: wordType, id } });
			toast.success(data?.message);
		} catch (error) {
			toast.error(error.message);
		}
	};

	const learnedWord = async (item) => {
		try {
			const data = await Promise.all([
				wordApi.delete(`/api/words/${item._id}`),
				wordApi.post("/api/learned-words/add", item),
			]);
			dispatch({ type: "DELETE_WORDS", payload: { params: wordType, id: item._id } });
			console.log(data);
		} catch (error) {
			toast.error(error.message);
		}
	};

	const handleFlippedCard = (index) => {
		if (flippedCard === index) {
			setFlippedCard("");
		} else {
			setFlippedCard(index);
		}
	};

	return (
		<div>
			<Box className={classes.cardListWrapper}>
				{selectWords.map((item, index) => (
					<Card
						shadow="sm"
						p="lg"
						radius="md"
						withBorder
						key={item._id}
						onClick={() => handleFlippedCard(index)}
					>
						<Box className={cx(classes.cardInner, { [classes.isFlipped]: flippedCard === index })}>
							<Center className={cx(classes.cardFront, classes.cardFace)}>
								<Title order={3}>{item.meaning}</Title>
							</Center>
							<Box className={cx(classes.cardBack, classes.cardFace)}>
								<Stack className={classes.cardBackChild}>
									<Text weight={700} transform="capitalize" size="xl" color="red">
										{item.word}
									</Text>
									<Text size="xl" weight={700}>
										( {item.pronunciation} )
									</Text>
									<List className={classes.cardBackList}>
										{item.example.split(/[\\.?]+/g).map((el, i) => (
											<ListItem key={i}>{el}</ListItem>
										))}
									</List>
									<Group pt={20}>
										<Button size="xs" radius="xl" onClick={() => editWord(item)}>
											Edit
										</Button>
										<Button color="green" size="xs" radius="xl" onClick={() => learnedWord(item)}>
											Learned
										</Button>
										<Button color="red" size="xs" radius="xl" onClick={() => deleteWord(item._id)}>
											Delete
										</Button>
									</Group>
								</Stack>
							</Box>
						</Box>
					</Card>
				))}
			</Box>
			{editModalShow && (
				<EditModal opened={editModalShow} onClose={() => setEditModalShow(false)} selectWord={editSelectWord} />
			)}
			<Toaster position="bottom-right" />
		</div>
	);
};

export default WordCard;
