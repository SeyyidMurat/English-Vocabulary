import React, { useState, useEffect } from "react";
import { Table, Group, Button, Text, Box, createStyles } from "@mantine/core";
import { wordApi } from "../api/api";
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
	tableWrapper: {
		padding: theme.spacing.lg,
		overflowX: "auto",
	},
	container: {
		padding: theme.spacing.md,
		overflowX: "auto",
	},
}));

const LearnedWords = () => {
	const { classes } = useStyles();
	const [learnedWords, setLearnedWords] = useState();

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
				const { data } = await wordApi.get("/api/learned-words");
				setLearnedWords(data);
				console.log(data);
			} catch (error) {
				console.log(error);
			}
		};
		getAllWords();
	}, []);

	if (!learnedWords) return <Loading />;

	return (
		<Box>
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
						{learnedWords?.map((item) => (
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
									</Group>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</Box>

			<Toaster position="bottom-right" />
		</Box>
	);
};

export default LearnedWords;
