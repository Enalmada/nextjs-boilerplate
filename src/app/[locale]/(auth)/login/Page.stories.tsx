import AuthLayout from "@/app/[locale]/(auth)/AuthLayout";
import Page from "@/app/[locale]/(auth)/login/page";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Page> = {
	title: "Pages/Auth/Login",
	component: Page,
	argTypes: {},
	render: () => {
		// Simulate the async nature of searchParams by wrapping in Promise.resolve
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
