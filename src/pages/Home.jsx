import React, { useState, useEffect } from "react";
import EditModal from "../components/EditModal";
import Tools from "../components/Tools";
import { Table, Group, Button, Text, Box, createStyles } from "@mantine/core";
import { useWordContext } from "../context/WordContext";
import { wordApi } from "../api/api";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import toast, { Toaster } from "react-hot-toast";
import Sidebar from "../components/Sidebar";
const tableHead = [
	{ id: 1, title: "Word Type" },
	{ id: 2, title: "Word" },
	{ id: 3, title: "Pronunciation" },
	{ id: 4, title: "Meaning" },
	{ id: 5, title: "Actions" },
];

const useStyles = createStyles((theme) => ({
	generalWrapper: {
		display: "grid",
		gridTemplateColumns: "minmax(300px,350px) 1fr",

		[`@media (max-width: ${theme.breakpoints.md}px)`]: {
			gridTemplateColumns: "minmax(300px,1fr)",
		},
	},

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
	tableWrapper: {
		padding: theme.spacing.lg,
		overflowX: "auto",
	},
	container: {
		padding: theme.spacing.md,
		overflowX: "auto",
	},
}));

const Home = () => {
	const { classes } = useStyles();
	const { wordsData, dispatch } = useWordContext();
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
		<Box className={classes.generalWrapper}>
			<Sidebar />
			<Box>
				<Tools />
				<Box className={classes.tableWrapper}>
					<Table verticalSpacing="md" fontSize="md">
						<thead>
							<tr>
								{tableHead.map((head) => (
									<th key={head.id}>{head.title}</th>
								))}
							</tr>
						</thead>
						<tbody>
							{wordsData?.selectWords?.map((item) => (
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
											<Button
												color="green"
												size="xs"
												radius="xl"
												onClick={() => learnedWord(item)}
											>
												Learned
											</Button>
										</Group>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</Box>
			</Box>

			{editModalShow && (
				<EditModal opened={editModalShow} onClose={() => setEditModalShow(false)} selectWord={editSelectWord} />
			)}

			<Toaster position="bottom-right" />
		</Box>
	);
};

export default Home;
