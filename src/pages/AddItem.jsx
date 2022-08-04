import React from "react";
import { Box, Tabs } from "@mantine/core";
import AddWord from "../components/AddWord";
import AddSentence from "../components/AddSentence";
import Header from "../components/Header";

const AddItem = () => {
	const formWrapper = {
		height: "calc(100vh - 150px)",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	};

	return (
		<>
			<Header />
			<Tabs color="violet">
				<Tabs.Tab label="Add Word">
					<Box sx={formWrapper}>
						<AddWord />
					</Box>
				</Tabs.Tab>
				<Tabs.Tab label="Add Sentence">
					<Box sx={formWrapper}>
						<AddSentence />
					</Box>
				</Tabs.Tab>
			</Tabs>
		</>
	);
};

export default AddItem;
