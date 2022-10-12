import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Box, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
	content: {
		paddingTop: "80px",
		height: "100vh",
	},
}));

const Layout = () => {
	const { classes } = useStyles();

	return (
		<Box>
			<Header />
			<Box className={classes.content}>
				<Outlet />
			</Box>
		</Box>
	);
};

export default Layout;
