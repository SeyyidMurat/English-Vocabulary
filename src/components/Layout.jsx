import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { createStyles, Flex } from '@mantine/core';
import MobileMenu from './MobileMenu';

const useStyles = createStyles((theme) => ({
	routeContainer: {
		height: '100%',
		position: 'relative',
		zIndex: '1',
	},
	pageWrapper: {
		height: '100%',
		paddingTop: '80px',
	},
}));

const Layout = () => {
	const { classes } = useStyles();
	const [isMobileMenu, setIsMobileMenu] = useState(false);
	return (
		<div className={classes.routeContainer}>
			<Flex direction="column" className={classes.pageWrapper}>
				<Header setToggle={setIsMobileMenu} />
				<Outlet />
			</Flex>
			{isMobileMenu && <MobileMenu setToggle={setIsMobileMenu} />}
		</div>
	);
};

export default Layout;
