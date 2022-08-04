import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Box, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
	header: {
		position: "sticky",
		top: "0",
		maxHeight: "80px",
		zIndex: "11",
	},
	main: {
		overflowY: "auto",
		"&::-webkit-scrollbar": {
			width: "8px",
		},
		"&::-webkit-scrollbar-track": {
			background: theme.colors.gray[4],
			borderRadius: "10px",
		},
		"&::-webkit-scrollbar-thumb": {
			background: "rgba(255,255,255,0.5)",
			borderRadius: "10px",
			boxShadow: "0 0 6px rgba(0, 0, 0, 0.5)",
		},
	},
	content: {
		height: "calc(100vh - 80px)",
		[`@media (min-width: ${theme.breakpoints.md}px)`]: {
			display: "grid",
			gridTemplateColumns: "minmax(300px, 400px) minmax(700px, 1fr)",
		},
	},
}));

const Layout = () => {
	const { classes } = useStyles();

	return (
		<Box>
			<Box className={classes.header}>
				<Header />
			</Box>
			<Box className={classes.content}>
				<Sidebar />
				<Box className={classes.main}>
					<Outlet />
				</Box>
			</Box>
		</Box>
	);
};

export default Layout;
