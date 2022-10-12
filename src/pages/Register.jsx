import React from "react";
import { TextInput, Stack, Card, Button, Box, Title, PasswordInput, createStyles } from "@mantine/core";
import { useForm } from "@mantine/form";
import { wordApi } from "../api/api";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
const Register = () => {
	const form = useForm({
		initialValues: { email: "", password: "", confirmPassword: "" },

		validate: {
			email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
			password: (value) => (value < 6 ? "You must be at least 18 to register" : null),
			confirmPassword: (value, values) => (value !== values.password ? "Passwords did not match" : null),
		},
	});
	const navigate = useNavigate();
	const { classes } = useStyles();

	const handleSubmit = async (values) => {
		try {
			const { data } = await wordApi.post("api/auth/register", values);
			form.reset();
			toast.success(data.message);
			setTimeout(() => {
				navigate("/login");
			}, 1000);
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<Box className={classes.wrapper}>
			<Box className={classes.form}>
				<Title order={1} align="center" mb={36}>
					Register
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
							<PasswordInput
								label="Confirm Password"
								placeholder="Password"
								{...form.getInputProps("confirmPassword")}
							/>
							<Button type="submit" color="indigo">
								Register
							</Button>
						</Stack>
					</Card>
				</form>
			</Box>
			<Toaster position="bottom-right" />
		</Box>
	);
};

export default Register;
