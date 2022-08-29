import React from "react";
import { Link } from "react-router-dom";
import { Title, Group, Anchor, Container, Box } from "@mantine/core";

const Header = () => {
	console.log("Header render");
	return (
		<Box sx={(theme) => ({ padding: "25px 0", background: theme.colors.gray[3] })}>
			<Container size="xl">
				<Group align="center" position="apart">
					<Title order={3}>Learn Word</Title>
					<Group>
						<Anchor color="dark" component={Link} size="lg" weight="500" to="/sentence">
							Sentences
						</Anchor>
						<Anchor color="dark" component={Link} size="lg" weight="500" to="/add">
							Add Word
						</Anchor>
					</Group>
				</Group>
			</Container>
		</Box>
	);
};

export default Header;
