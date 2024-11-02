import AuthLayout from "@/app/[locale]/(auth)/AuthLayout";
import { Successful } from "@/app/[locale]/(auth)/reset-password/ResetPasswordPage";
import Page from "@/app/[locale]/(auth)/reset-password/page";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Page> = {
	title: "Pages/Auth/ResetPassword",
	component: Page,
	argTypes: {},
	render: () => {
		const mockAsyncSearchParams: Promise<{ redirect?: string }> =
			Promise.resolve({
				redirect: "/app",
			});

		return (
			<AuthLayout>
				<Page searchParams={mockAsyncSearchParams} />
			</AuthLayout>
		);
	},
	parameters: {
		layout: "fullscreen",
	},
};

export default meta;

type Story = StoryObj<typeof Page>;
export const Default: Story = {};

export const SuccessfulNotice: Story = {
	render: () => (
		<AuthLayout>
			<Successful redirect={"/app"} />
		</AuthLayout>
	),
};
