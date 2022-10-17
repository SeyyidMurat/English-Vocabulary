import React from "react";
import { Loader, Center, Box } from "@mantine/core";
const Loading = ({ width, height }) => {
	return (
		<Center style={{ width: width || "100vw", height: height || "70vh" }}>
			<Box align="center">
				<Loader color="indigo" />
				<p>Loading...</p>
			</Box>
		</Center>
	);
};

export default Loading;
