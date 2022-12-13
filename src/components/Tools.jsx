import React, { useState, useContext, useRef } from 'react';
import { Box, Group, Select, TextInput, createStyles } from '@mantine/core';
import { WordContext } from '../context/WordContext';
import SearchIcon from '../assets/icons/SearchIcon';
import { useParams } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
	wrapper: {
		background: theme.colors.gray[0],
		padding: theme.spacing.md,
	},
	search: {
		position: 'relative',
	},
	icon: {
		position: 'absolute',
		top: '50%',
		cursor: 'pointer',
		right: '5px',
		transform: 'translateY(-40%)',
		background: 'transparent',
		border: 'none',
	},
}));
const Tools = () => {
	const { classes } = useStyles();
	const { dispatch } = useContext(WordContext);

	const { wordType } = useParams();
	const inputRef = useRef(null);

	const [selectValue, setSelectValue] = useState('');

	const handleChange = () => {
		dispatch({ type: 'SEARCH_WORDS', payload: { params: wordType, search: inputRef.current.value } });
	};

	const handleSort = (value) => {
		dispatch({ type: 'SORTING_WORDS', payload: value });
		setSelectValue(value);
	};

	return (
		<Box className={classes.wrapper}>
			<Group position="apart">
				<Box className={classes.search}>
					<TextInput placeholder="Search Words" ref={inputRef} onChange={handleChange} />
					<div className={classes.icon}>
						<SearchIcon />
					</div>
				</Box>

				<Select
					placeholder="Sorting Words"
					data={['most recently', 'oldest']}
					onChange={handleSort}
					value={selectValue}
				/>
			</Group>
		</Box>
	);
};

export default Tools;
