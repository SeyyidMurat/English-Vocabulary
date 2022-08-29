import React, { useState, useContext, useEffect } from "react";
import EditModal from "../components/EditModal";
import Tools from "../components/Tools";
import { Table, Group, Button, Text, Box, createStyles } from "@mantine/core";
import { WordContext } from "../context/WordContext";
import { wordApi } from "../api/api";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import toast, { Toaster } from "react-hot-toast";
const tableHead = [
	{ id: 1, title: "Word Type" },
	{ id: 2, title: "Word" },
	{ id: 3, title: "Pronunciation" },
	{ id: 4, title: "Meaning" },
	{ id: 5, title: "Actions" },
];

const useStyles = createStyles((theme) => ({
	hideText: {
		opacity: "0",
		transition: "opacity 250ms ease-in-out",
		color: theme.colors.red[7],
		fontSize: theme.fontSizes,
		fontWeight: "700",
		cursor: "pointer",
		"&:hover": {
			opacity: 1,
		},
	},
	container: {
		padding: theme.spacing.md,
		overflowX: "auto",
	},
}));

const Home = () => {
	const { classes } = useStyles();
	const { wordsData, dispatch } = useContext(WordContext);
	const { wordType } = useParams();

	const [editModalShow, setEditModalShow] = useState(false);
	const [editSelectWord, setEditSelectWord] = useState("");

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

	useEffect(() => {
		const getAllWords = async () => {
			try {
				const { data } = await wordApi.get("/api/words");
				dispatch({ type: "GET_WORDS", payload: { data, wordType } });
			} catch (error) {
				console.log(error);
			}
		};
		getAllWords();
	}, []);

	if (!wordsData?.words) return <Loading />;

	return (
		<>
			<Tools />
			<Box p="1rem">
				<Table verticalSpacing="md" fontSize="md">
					<thead>
						<tr>
							{tableHead.map((head) => (
								<th key={head.id}>{head.title}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{wordsData?.error !== undefined ? (
							<tr>{wordsData?.error?.message}</tr>
						) : (
							wordsData?.selectWords?.map((item) => (
								<tr key={item._id}>
									<td>{item.wordType}</td>
									<td>
										<Text className={classes.hideText}>{item.word}</Text>
									</td>
									<td>
										<Text className={classes.hideText}>{`( ${item.pronunciation} )`}</Text>
									</td>
									<td>
										<Text color="indigo" weight={700} size="lg">
											{item.meaning}
										</Text>
									</td>
									<td>
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
											<Button
												variant="outline"
												color="gray"
												size="xs"
												radius="xl"
												onClick={() => editWord(item)}
											>
												Edit
											</Button>
										</Group>
									</td>
								</tr>
							))
						)}
					</tbody>
				</Table>
			</Box>

			{editModalShow && (
				<EditModal opened={editModalShow} onClose={() => setEditModalShow(false)} selectWord={editSelectWord} />
			)}

			<Toaster position="bottom-right" />
		</>
	);
};

export default Home;
