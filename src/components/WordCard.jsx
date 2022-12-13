import React, { useState } from 'react';
import { Box, Card, Text, Stack, createStyles, Center, Title, List } from '@mantine/core';

const useStyles = createStyles((theme) => ({
	isFlipped: {
		transform: 'rotateY(180deg)',
	},

	cardInner: {
		height: '100%',
		transition: 'transform .5s ease',
		transformStyle: 'preserve-3d',
		cursor: 'pointer',
		position: 'relative',
	},
	cardFace: {
		backfaceVisibility: 'hidden',
		overflow: 'hidden',
	},
	cardFront: {
		position: 'absolute',
		inset: 0,
	},
	cardBack: {
		width: '100%',
		height: '100%',
		display: 'flex',
		zIndex: 1,
		transform: 'rotateY(180deg)',
	},
	cardBackChild: {
		flex: 1,
	},
	cardBackList: {
		flex: 1,
	},
}));

const WordCard = (props) => {
	const [flippedCard, setFlippedCard] = useState('');

	const { classes, cx } = useStyles();

	const handleFlippedCard = (index) => {
		if (flippedCard === props.index) {
			setFlippedCard('');
		} else {
			setFlippedCard(index);
		}
	};

	return (
		<>
			<Card
				shadow="sm"
				p="lg"
				radius="md"
				withBorder
				onClick={() => handleFlippedCard(props.index)}
				style={{ height: '100%' }}
			>
				<Box className={cx(classes.cardInner, { [classes.isFlipped]: flippedCard === props.index })}>
					<Center className={cx(classes.cardFront, classes.cardFace)}>
						<Title order={3}>{props.word.meaning}</Title>
					</Center>
					<Box className={cx(classes.cardBack, classes.cardFace)}>
						<Stack className={classes.cardBackChild}>
							<Text weight={700} transform="capitalize" size="xl" color="red">
								{props.word.word}
							</Text>
							<Text size="xl" weight={700}>
								( {props.word.pronunciation} )
							</Text>
							<List className={classes.cardBackList}>
								{props.word.example.split(/[\\.?]+/g).map((el, i) => (
									<li key={i}>{el}</li>
								))}
							</List>
							<div>{props.children}</div>
						</Stack>
					</Box>
				</Box>
			</Card>
		</>
	);
};

export default WordCard;
