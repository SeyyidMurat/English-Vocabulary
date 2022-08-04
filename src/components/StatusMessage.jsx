import React from "react";
import { Box, Notification } from "@mantine/core";
const StatusMessage = ({ message, color }) => {
	return (
		<>
			<Box sx={{ position: "fixed", bottom: "50px", right: "50px", zIndex: 999 }}>
				<Notification title={message} color={color} />
			</Box>
		</>
	);
};

export default StatusMessage;
