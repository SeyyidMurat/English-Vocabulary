import React, { useState, useContext } from "react";
import { Box, Group, NativeSelect, TextInput, createStyles } from "@mantine/core";
import { WordContext } from "../context/WordContext";
import SearchIcon from "../assets/icons/SearchIcon";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const useStyles = createStyles((theme) => ({
	wrapper: {
		background: theme.colors.gray[0],
		padding: theme.spacing.md,
	},
	search: {
		position: "relative",
	},
	icon: {
		position: "absolute",
		top: "50%",
		cursor: "pointer",
		right: "5px",
		transform: "translateY(-40%)",
		background: "transparent",
		border: "none",
	},
}));
const Tools = () => {
	const { classes } = useStyles();
	const { dispatch } = useContext(WordContext);
	const [selectValue, setSelectValue] = useState("");
	const [searchValue, setSearchValue] = useState("");
	const params = useParams();
	const handleSearch = (e) => {
		e.preventDefault();
		if (searchValue === "") {
			return alert("You must fill the field. Please...");
		}
		dispatch({ type: "SEARCH_WORDS", payload: { params: params.word, search: searchValue } });
	};

	const handleSort = (e) => {
		dispatch({ type: "SORTING_WORDS", payload: e.currentTarget.value });
		setSelectValue("");
	};

	useEffect(() => {
		const getWords = () => {
			if (searchValue === "") {
				dispatch({ type: "SEARCH_WORDS", payload: { params: params.word, search: searchValue } });
			}
		};
		getWords();
	}, [searchValue]);

	return (
		<Box className={classes.wrapper}>
			<Group position="apart">
				<form onSubmit={handleSearch}>
					<Box className={classes.search}>
						<TextInput
							placeholder="Search Word"
							value={searchValue}
							onChange={(e) => setSearchValue(e.currentTarget.value)}
						/>
						<button className={classes.icon} type="submit">
							<SearchIcon />
						</button>
					</Box>
				</form>

				<NativeSelect
					placeholder="Words Sorting"
					data={["most recently", "oldest"]}
					onChange={handleSort}
					value={selectValue}
				/>
			</Group>
		</Box>
	);
};

export default Tools;
