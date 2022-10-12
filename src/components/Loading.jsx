import React from "react";
import { Loader, Center, Box } from "@mantine/core";
const Loading = () => {
	return (
		<Center style={{ width: "100vw", height: "70vh" }}>
			<Box align="center">
				<Loader color="indigo" />
				<p>Loading...</p>
			</Box>
		</Center>
	);
};

export default Loading;
