import React from "react";
import Tools from "../components/Tools";
import { Box, createStyles } from "@mantine/core";
import Sidebar from "../components/Sidebar";
import CardList from "../components/CardList";

const useStyles = createStyles((theme) => ({
	generalWrapper: {
		display: "grid",
		gridTemplateColumns: "minmax(300px,350px) 1fr",

		[`@media (max-width: ${theme.breakpoints.md}px)`]: {
			gridTemplateColumns: "minmax(300px,1fr)",
		},
	},
}));

const Home = () => {
	const { classes } = useStyles();

	return (
		<Box className={classes.generalWrapper}>
			<Sidebar />
			<Box>
				<Tools />
				<CardList />
			</Box>
		</Box>
	);
};

export default Home;
