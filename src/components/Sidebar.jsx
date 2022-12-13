import React, { useState, useContext } from 'react';
import { List, Anchor, Box, MediaQuery, createStyles } from '@mantine/core';
import { Link, useParams } from 'react-router-dom';
import { WordContext } from '../context/WordContext';
import { wordType } from '../utils/utils';
const useStyles = createStyles((theme) => ({
	sidebar: {
		background: theme.colors.gray[0],
		flex: '0 0 auto',
		overflow: 'auto',
		padding: '50px 0 20px',
		width: '250px',
	},
	container: {
		display: 'flex',
		flexDirection: 'column',
		gap: '1rem',
	},
	sidebarItem: {
		padding: theme.spacing.xs,
		minWidth: '12ch',
		display: 'flex',
		alignItems: 'center',
	},
	active: {
		background: theme.colors.indigo[3],
		a: {
			color: theme.colors.gray[0],
		},
	},
}));

const Sidebar = () => {
	const [sidebarElements, setSidebarElements] = useState(() =>
		localStorage.getItem('vocabulary') ? JSON.parse(localStorage.getItem('vocabulary')) : wordType
	);
	const params = useParams();
	const { dispatch } = useContext(WordContext);
	const { classes, cx } = useStyles();
	const activeElement = sidebarElements.findIndex((item) => item.vocabulary === params.wordType);

	const selectCategory = (path) => {
		dispatch({ type: 'SELECT_WORDS', payload: path });
	};

	return (
		<MediaQuery query="(max-width: 900px) " styles={{ display: 'none' }}>
			<Box className={classes.sidebar}>
				<List listStyleType="none" className={classes.container}>
					{sidebarElements.map((item, index) => (
						<List.Item
							key={item.key}
							className={cx(classes.sidebarItem, { [classes.active]: activeElement === index })}
						>
							<Anchor
								component={Link}
								transform="capitalize"
								color="indigo"
								to={`/${item.vocabulary}`}
								onClick={() => selectCategory(item.vocabulary)}
							>
								{item.vocabulary}
							</Anchor>
						</List.Item>
					))}
				</List>
			</Box>
		</MediaQuery>
	);
};
export default Sidebar;
