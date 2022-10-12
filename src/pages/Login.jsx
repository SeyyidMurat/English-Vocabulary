import React from "react";
import { TextInput, Stack, Card, Button, Box, Title, PasswordInput, Anchor, createStyles } from "@mantine/core";
import { useForm } from "@mantine/form";
import { wordApi } from "../api/api";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
const useStyles = createStyles((theme) => ({
	wrapper: {
		height: "100vh",
		display: "grid",
		placeItems: "center",
		background: theme.colors.indigo[0],
	},
	form: {
		width: "360px",
	},
}));
const Login = () => {
	const navigate = useNavigate();
	const { setAuth } = useAuthContext();
	const { classes } = useStyles();
	const form = useForm({
		initialValues: { email: "", password: "" },

		validate: {
			email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
			password: (value) => (value < 6 ? "Must passwords 6 length" : null),
		},
	});

	const handleSubmit = async (values) => {
		try {
			const { data } = await wordApi.post("api/auth/login", values);
			localStorage.setItem("vocabularyToken", data.token);
			setAuth(true);
			navigate("/");
		} catch (error) {
			toast.error(error.message);
			form.reset();
		}
	};

	return (
		<Box className={classes.wrapper}>
			<Box className={classes.form}>
				<Title order={1} align="center" mb={36}>
					Login
				</Title>
				<form onSubmit={form.onSubmit(handleSubmit)}>
					<Card shadow="lg" p="lg">
						<Stack spacing="xl">
							<TextInput label="Email" placeholder="Email" {...form.getInputProps("email")} />
							<PasswordInput
								label="Password"
								placeholder="Password"
								{...form.getInputProps("password")}
							/>
							<Anchor component={Link} to="/register">
								Don't have an account register
							</Anchor>
							<Button type="submit" color="indigo">
								Login
							</Button>
						</Stack>
					</Card>
				</form>
			</Box>
			<Toaster position="bottom-right" />
		</Box>
	);
};

export default Login;
