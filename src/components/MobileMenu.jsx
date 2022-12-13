import React from 'react';
import { createStyles, Button, Flex, Anchor, Accordion } from '@mantine/core';
import CloseIcon from '../assets/icons/CloseIcon';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
	menuWrapper: {
		overflow: 'auto',
		background: '#fff',
		position: 'fixed',
		inset: 0,
		zIndex: 9999,
	},
}));

const headerElements = [
	{ id: 1, title: 'Home', path: '/' },
	{ id: 2, title: 'Add Word', path: '/add' },
	{ id: 3, title: 'Learned Word', path: '/learned' },
	{ id: 4, title: 'Add Vocabulary', path: '/add-vocabulary' },
];
const MobileMenu = (props) => {
	const { classes } = useStyles();

	return (
		<div className={classes.menuWrapper}>
			<Flex direction="column">
				<Flex justify="space-between" align="center" px="1rem">
					<h2>Word</h2>
					<Button
						variant="subtle"
						color="gray"
						className={classes.menuBtn}
						onClick={() => props.setToggle(false)}
					>
						<CloseIcon />
					</Button>
				</Flex>
				<Flex direction="column" gap="md" p="2rem">
					<Accordion>
						<Accordion.Item value="header">
							<Accordion.Control>Header</Accordion.Control>
							<Accordion.Panel>
								<Flex direction="column" gap="md">
									{headerElements.map((item) => (
										<Anchor
											key={item.id}
											component={Link}
											size="lg"
											transform="capitalize"
											color="indigo"
											to={item.path}
											onClick={() => props.setToggle(false)}
										>
											{item.title}
										</Anchor>
									))}
								</Flex>
							</Accordion.Panel>
						</Accordion.Item>

						<Accordion.Item value="sidebar">
							<Accordion.Control>Sidebar</Accordion.Control>
							<Accordion.Panel>
								<Flex direction="column" gap="lg">
									{JSON.parse(localStorage.getItem('vocabulary')).map((item) => (
										<Anchor
											key={item.key}
											component={Link}
											transform="capitalize"
											color="indigo"
											to={`/${item.vocabulary}`}
											onClick={() => props.setToggle(false)}
										>
											{item.vocabulary}
										</Anchor>
									))}
								</Flex>
							</Accordion.Panel>
						</Accordion.Item>
					</Accordion>
				</Flex>
			</Flex>
		</div>
	);
};

export default MobileMenu;
