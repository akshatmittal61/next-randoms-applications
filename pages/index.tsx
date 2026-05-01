import { Page } from "@/layouts";
import { Typography } from "@/library";
import React from "react";

const HomePage: React.FC = () => {
	return (
		<>
			<Page
				title="Home"
				description="Home"
				keywords={["home", "page"]}
				className="w-screen h-screen flex justify-center items-center flex-col gap-4"
			>
				<Typography
					className="text-blue-600"
					as="h1"
					size="head-1"
					weight="bold"
				>
					Randoms Application
				</Typography>
				<Typography as="span" size="lg" weight="regular">
					I don&apos;t know what is the motive of this. Maybe that is
					the motive of this, haaving no motive. I&apos;ll fill it
					with whatever shit I want to.
				</Typography>
			</Page>
		</>
	);
};

export default HomePage;
