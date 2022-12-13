import React from 'react';
import { Link } from 'react-router-dom';
import { Title, Group, Anchor, Box, Button, MediaQuery, createStyles } from '@mantine/core';
import MenuIcon from '../assets/icons/MenuIcon';
import { useAuthContext } from '../context/AuthContext';
const useStyles = createStyles((theme) => ({
	header: {
		position: 'fixed',
		height: '80px',
		zIndex: '100',
		top: 0,
		right: 0,
		left: 0,
		background: theme.colors.gray[3],
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: '0 1.5rem',
	},
	logo: {
		flex: '1 1 0',
	},
	menuBtn: {
		display: 'none',
	},
}));

const Header = (props) => {
	const { classes } = useStyles();
	const { setAuth } = useAuthContext();
	return (
		<Box className={classes.header}>
			<Title order={3} className={classes.logo}>
				Learn Word
			</Title>
			<MediaQuery query="(max-width: 900px) " styles={{ display: 'none' }}>
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
							localStorage.removeItem('vocabularyToken');
							setAuth(false);
						}}
					>
						Logout
					</Anchor>
				</Group>
			</MediaQuery>
			<MediaQuery query="(max-width: 900px) " styles={{ display: 'flex' }}>
				<Button variant="subtle" color="gray" className={classes.menuBtn} onClick={() => props.setToggle(true)}>
					<MenuIcon />
				</Button>
			</MediaQuery>
		</Box>
	);
};

export default Header;
