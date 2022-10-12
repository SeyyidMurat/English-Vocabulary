import React, { useState, useContext } from "react";
import { List, ListItem, Anchor, Box, createStyles } from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import { WordContext } from "../context/WordContext";

const useStyles = createStyles((theme) => ({
	sidebar: {
		position: "sticky",
		top: "80px",
		height: "calc(100vh - 80px)",
		overflowY: "auto",
		background: theme.colors.gray[0],
		zIndex: "11",
		[`@media (max-width: ${theme.breakpoints.md}px)`]: {
			height: "auto",
		},
	},
	container: {
		display: "flex",
		flexDirection: "column",
		gap: "1rem",

		[`@media (max-width: ${theme.breakpoints.md}px)`]: {
			flexDirection: "row",
			overflowX: "auto",
		},
	},
	sidebarItem: {
		padding: theme.spacing.xs,
		minWidth: "12ch",
		display: "flex",
		alignItems: "center",
		[`@media (max-width: ${theme.breakpoints.md}px)`]: {
			justifyContent: "center",
		},
	},
	active: {
		background: theme.colors.indigo[3],
		a: {
			color: theme.colors.gray[0],
		},
	},
}));

const Sidebar = () => {
	const [sidebarElements, setSidebarElements] = useState(() =>
		localStorage.getItem("vocabulary") ? JSON.parse(localStorage.getItem("vocabulary")) : []
	);
	const params = useParams();
	const { dispatch } = useContext(WordContext);
	const { classes, cx } = useStyles();
	const activeElement = sidebarElements.findIndex((item) => item.vocabulary === params.wordType);

	const selectCategory = (path) => {
		dispatch({ type: "SELECT_WORDS", payload: path });
	};

	return (
		<Box className={classes.sidebar}>
			<List listStyleType="none" className={classes.container}>
				{sidebarElements.map((item, index) => (
					<ListItem
						key={item.key}
						className={cx(classes.sidebarItem, { [classes.active]: activeElement === index })}
					>
						<Anchor
							component={Link}
							transform="capitalize"
							color="indigo"
							to={`/${item.vocabulary}`}
							onClick={() => selectCategory(item.vocabulary)}
						>
							{item.vocabulary}
						</Anchor>
					</ListItem>
				))}
			</List>
		</Box>
	);
};
export default Sidebar;
