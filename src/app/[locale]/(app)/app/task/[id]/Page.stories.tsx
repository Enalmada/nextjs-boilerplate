import AppLayout from "@/app/[locale]/(app)/AppLayout";
import Page from "@/app/[locale]/(app)/app/task/[id]/page";
import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Page> = {
	title: "Pages/App/Task",
	component: Page,
	argTypes: {},
	render: () => {
		// Simulate the async nature of params by wrapping in Promise.resolve
		const mockAsyncParams: Promise<{ id: string }> = Promise.resolve({
			id: "tsk_1",
		});

		return (
			<AppLayout>
				<Page params={mockAsyncParams} />
			</AppLayout>
		);
	},
	parameters: {
		layout: "fullscreen",
	},
};

export default meta;

type Story = StoryObj<typeof Page>;
export const Default: Story = {};
