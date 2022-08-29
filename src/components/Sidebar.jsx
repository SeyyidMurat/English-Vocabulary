import React, { useContext } from "react";
import { List, ListItem, Anchor, Stack, Box, createStyles } from "@mantine/core";
import { NavLink, useParams } from "react-router-dom";
import { WordContext } from "../context/WordContext";
const sidebarElements = [
	{ id: 1, title: "All Words", path: "" },
	{ id: 2, title: "Noun", path: "noun" },
	{ id: 3, title: "Verb", path: "verb" },
	{ id: 4, title: "Adjective", path: "adjective" },
	{ id: 5, title: "Pronoun", path: "pronoun" },
	{ id: 6, title: "Adverb", path: "adverb" },
	{ id: 7, title: "Preposition", path: "preposition" },
	{ id: 8, title: "Conjunction", path: "conjunction" },
	{ id: 9, title: "Branch English", path: "branchEnglish" },
];

const useStyles = createStyles((theme) => ({
	sidebar: {
		padding: theme.spacing.md,
		borderLeft: "1px solid #000",
	},
	container: {
		[`@media (max-width: ${theme.breakpoints.md}px)`]: {
			flexDirection: "row",
			overflowX: "auto",
		},
	},
	item: {
		padding: theme.spacing.xs,
		scrollSnapAlign: "start",
	},
	active: {
		fontWeight: "bold",
		textDecoration: "underline",
	},
}));

const Sidebar = () => {
	let params = useParams();
	const { dispatch } = useContext(WordContext);
	const { classes } = useStyles();
	const activeElement = sidebarElements.findIndex((item) => item.path === params.wordType);

	const selectCategory = (path) => {
		dispatch({ type: "SELECT_WORDS", payload: path });
	};

	return (
		<Box className={classes.sidebar}>
			<List listStyleType="none" component={Stack} className={classes.container}>
				{sidebarElements.map((item, index) => (
					<ListItem key={index} className={classes.item}>
						<Anchor
							component={NavLink}
							color="indigo"
							to={`/${item.path}`}
							onClick={() => selectCategory(item.path)}
							className={activeElement === index ? [classes.active] : ""}
						>
							{item.title}
						</Anchor>
					</ListItem>
				))}
			</List>
		</Box>
	);
};
export default Sidebar;