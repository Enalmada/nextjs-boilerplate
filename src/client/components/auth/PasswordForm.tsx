import { useRedirectAfterLogin } from "@/app/shared/useRedirectAfterLogin";
import { Button, InputControlled, Link } from "@/client/ui";
import { HiddenIcon } from "@/client/ui/icons/HiddenIcon";
import { VisibleIcon } from "@/client/ui/icons/VisibleIcon";
import { submitPasswordForm } from "@enalmada/next-firebase-auth-edge-wrapper";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { Checkbox } from "@nextui-org/react";
import React from "react";
import { useForm } from "react-hook-form";
import { email, maxLength, minLength, object, pipe, string } from "valibot";
type SetLoggedFunction = React.Dispatch<React.SetStateAction<boolean>>;

interface Props {
	isSignIn: boolean;
	setHasLogged: SetLoggedFunction;
	redirect?: string;
}

export default function PasswordForm({
	redirect,
	isSignIn,
	setHasLogged,
}: Props) {
	const [isVisible, setIsVisible] = React.useState(false);
	const toggleVisibility = () => setIsVisible(!isVisible);

	type FormData = {
		email: string;
		password: string;
	};

	const schema = object({
		email: pipe(
			string(),
			minLength(1, "Please enter your email."),
			email("Valid email is required"),
		),
		password: pipe(
			string(),
			minLength(1, "Please enter your password."),
			minLength(8, "Password must be at least 8 characters."),
			maxLength(64, "Password must be 64 characters or less"),
		),
	});

	const {
		formState: { errors, isSubmitting, isSubmitSuccessful },
		handleSubmit,
		control,
		setError,
	} = useForm<FormData>({
		resolver: valibotResolver(schema),
		defaultValues: {
			email: "", // necessary for SSR to maintain controlled component
			password: "", // necessary for SSR to maintain controlled component
		},
	});

	const redirectAfterLogin = useRedirectAfterLogin(); // Call the hook here

	const onSubmit = async (formData: FormData) => {
		await submitPasswordForm(
			formData,
			isSignIn,
			setHasLogged,
			setError,
			redirectAfterLogin, // Pass the redirect function
		);
	};

	return (
		<>
			{errors.root && (
				<div
					className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-600"
					role="alert"
				>
					<span className="font-bold">Error</span> {errors.root.message}
				</div>
			)}

			<form
				onSubmit={(event) => void handleSubmit(onSubmit)(event)}
				className="mt-5"
			>
				<div className="grid gap-y-4">
					<InputControlled
						name="email"
						control={control}
						placeholder={" "}
						errors={errors}
						isRequired
						type="email"
						labelPlacement={"outside"}
						label={"Email address"}
						isDisabled={isSubmitting || isSubmitSuccessful}
						classNames={{
							label: "after:content-['']",
						}}
					/>

					<InputControlled
						name="password"
						control={control}
						errors={errors}
						isRequired
						placeholder={" "}
						label={"Password"}
						labelPlacement={"outside"}
						isDisabled={isSubmitting || isSubmitSuccessful}
						classNames={{
							label: "after:content-['']",
						}}
						endContent={
							<button
								className="focus:outline-none"
								type="button"
								onClick={toggleVisibility}
							>
								{isVisible ? <VisibleIcon /> : <HiddenIcon />}
							</button>
						}
						type={isVisible ? "text" : "password"}
					/>
					{isSignIn && (
						<div className={"mb-5 flex justify-end"}>
							<Link
								size="sm"
								href={{
									pathname: "/reset-password",
									query: { redirect: redirect },
								}}
							>
								Forgot password?
							</Link>
						</div>
					)}

					{!isSignIn && (
						<Checkbox isRequired={true} size="sm">
							You agree and have read the{" "}
							<Link size="sm" href="/terms" isExternal={true}>
								Terms of Service
							</Link>{" "}
							and{" "}
							<Link size="sm" href="/privacy" isExternal={true}>
								Privacy Policy
							</Link>
						</Checkbox>
					)}

					<Button
						data-testid="sign-in"
						type="submit"
						isLoading={isSubmitting}
						isDisabled={isSubmitSuccessful}
					>
						Sign in
					</Button>
				</div>
			</form>
		</>
	);
}
