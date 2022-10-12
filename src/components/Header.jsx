import React from "react";
import { Link } from "react-router-dom";
import { Title, Group, Anchor, Container, Box, createStyles } from "@mantine/core";
import { useAuthContext } from "../context/AuthContext";
const useStyles = createStyles((theme) => ({
	header: {
		position: "fixed",
		height: "80px",
		zIndex: "11",
		top: 0,
		right: 0,
		left: 0,
		background: theme.colors.gray[3],
		display: "flex",
		alignItems: "center",
	},
	headerInner: {
		flex: 1,
	},
}));

const Header = () => {
	const { classes } = useStyles();
	const { setAuth } = useAuthContext();
	return (
		<Box className={classes.header}>
			<Box className={classes.headerInner}>
				<Container size="xl">
					<Group align="center" position="apart">
						<Title order={3}>Learn Word</Title>
						<Group>
							<Anchor color="dark" component={Link} size="lg" weight="500" to="/">
								Home
							</Anchor>
							<Anchor color="dark" component={Link} size="lg" weight="500" to="/add">
								Add Word
							</Anchor>
							<Anchor color="dark" component={Link} size="lg" weight="500" to="/learned">
								Learned Word
							</Anchor>
							<Anchor color="dark" component={Link} size="lg" weight="500" to="/add-vocabulary">
								Add Vocabulary
							</Anchor>

							<Anchor
								color="dark"
								component={Link}
								size="lg"
								weight="500"
								to="/login"
								onClick={() => {
									localStorage.removeItem("vocabularyToken");
									setAuth(false);
								}}
							>
								Logout
							</Anchor>
						</Group>
					</Group>
				</Container>
			</Box>
		</Box>
	);
};

export default Header;
