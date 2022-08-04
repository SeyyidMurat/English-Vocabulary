import React, { useState, useEffect, useContext } from "react";
import { wordApi } from "../api/api";
import { WordContext } from "../context/WordContext";
import StatusMessage from "../components/StatusMessage";
import Loading from "../components/Loading";
import { Table, Group, Button, Text, Box, createStyles } from "@mantine/core";
import Header from "../components/Header";
import DownArrow from "../assets/icons/DownArrow";
const tableHead = [
	{ id: 1, title: "Sentence" },
	{ id: 2, title: "Mean" },
	{ id: 3, title: "Actions" },
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
	sort: {
		verticalAlign: "sub",
		paddingLeft: "0.5rem",
		cursor: "pointer",
	},
	arrowRotate: {
		"& > svg": {
			transform: "rotate(180deg)",
			transition: "all 0.5s esea-in-out",
		},
	},
}));

const Sentence = () => {
	const { classes, cx } = useStyles();

	const { sentecesData, dispatch2 } = useContext(WordContext);

	const [openNotification, setOpenNotification] = useState(false);
	const [statusMessage, setStatusMessage] = useState("");
	const [rotateArrow, setRotateArrow] = useState(false);

	const deleteSentence = async (id) => {
		try {
			const { data } = await wordApi.delete(`/api/sentences/${id}`);
			dispatch2({ type: "DELETE_WORDS", payload: id });
			setStatusMessage({ message: data.message, code: "success" });
			setOpenNotification(true);
		} catch (error) {
			setStatusMessage({ message: error.message, code: "faild" });
			setOpenNotification(true);
		}
	};

	const handleSorting = () => {
		setRotateArrow(!rotateArrow);
		dispatch2({ type: "SORTING_SENTENCES", payload: rotateArrow ? "oldest" : "most recently" });
	};

	useEffect(() => {
		const getAllSentences = async () => {
			try {
				const { data } = await wordApi.get("/api/sentences");
				console.log(data);
				dispatch2({ type: "GET_SENTENCES", payload: data });
			} catch (error) {
				console.log(error);
			}
		};
		getAllSentences();
	}, []);

	useEffect(() => {
		setTimeout(() => {
			setOpenNotification(false);
		}, 1500);
	}, [openNotification]);

	const ShowSentence = () => {
		return (
			<Box p="1rem">
				<Table verticalSpacing="md" fontSize="md">
					<thead>
						<tr>
							{tableHead.map((head) => (
								<th key={head.id}>
									{head.title}
									<span
										onClick={handleSorting}
										className={cx(classes.sort, {
											[classes.arrowRotate]: rotateArrow === true,
										})}
									>
										<DownArrow />
									</span>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{sentecesData?.senteces.map((item) => (
							<tr key={item._id}>
								<td>
									<Text className={classes.hideText}>{item.sentence}</Text>
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
											onClick={() => deleteSentence(item._id)}
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
		);
	};

	return (
		<div>
			<Header />
			{!sentecesData?.senteces ? <Loading /> : <ShowSentence />}
			{openNotification && (
				<StatusMessage
					message={statusMessage.message}
					color={statusMessage.code === "faild" ? "red" : "green"}
				/>
			)}
		</div>
	);
};

export default Sentence;
