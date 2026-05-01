import { ResourcesApi } from "@/api";
import { useHttpClient } from "@/hooks";
import { Page } from "@/layouts";
import { Typography } from "@/library";
import { CollectionUtils, Notify, stylesConfig } from "@/utils";
import React, { useEffect } from "react";
import { FiExternalLink } from "react-icons/fi";
import styles from "@/styles/pages/CompaniesInterview.module.scss";

const classes = stylesConfig(styles, "company-interview");

const GoldmanSachsCompanyInterviewResources: React.FC = () => {
	const { data, trigger, loading } = useHttpClient({
		trigger: ResourcesApi.readCompanyInterviewPrepResources,
		onError: Notify.error,
	});

	useEffect(() => {
		trigger({
			company: "goldman-sachs",
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Page
			title="Goldman Sachs Interview Preparation"
			description="Explore comprehensive interview preparation resources for Goldman Sachs, including detailed insights into their interview process, essential topics, and practical guidance to help you ace your interview."
			canonicalLink="https://www.randoms.in/resources/interview-prep/companies/goldman-sachs"
			className={classes("")}
			seo={{
				title: "Goldman Sachs Interview Preparation",
				description:
					"Explore comprehensive interview preparation resources for Goldman Sachs, including detailed insights into their interview process, essential topics, and practical guidance to help you ace your interview.",
			}}
		>
			<Typography
				className="text-center w-full mb-12"
				as="h1"
				size="head-2"
				weight="bold"
			>
				Goldman Sachs Interview Preparation
			</Typography>

			{loading ? (
				<>
					<Typography size="head-1">Loading...</Typography>
				</>
			) : (
				<>
					{/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
					<div className={classes("-md")}>
						<table>
							<thead>
								<tr>
									<th>Title</th>
									<th>Acceptance</th>
									<th>Difficulty</th>
									<th>Link</th>
									<th>Topics</th>
								</tr>
							</thead>
							<tbody>
								{CollectionUtils.isNotEmpty(data)
									? data.map((item) => (
											<tr
												key={`company-goldman-scahs-dsa-question-${item.id}`}
											>
												<td>{item.title}</td>
												<td>{item.acceptance}</td>
												<td>{item.difficulty}</td>
												<td className="flex flex-start items-start pt-1">
													<a
														href={item.link}
														target="_blank"
														rel="noopener noreferrer"
														className="flex flex-row items-start gap-2"
													>
														<FiExternalLink
															style={{
																flex: "1 0 auto",
															}}
														/>
														<span>
															{item.title}
														</span>
													</a>
												</td>
												<td>
													{item.topics.join(", ")}
												</td>
											</tr>
										))
									: null}
							</tbody>
						</table>
					</div>
				</>
			)}
		</Page>
	);
};

export default GoldmanSachsCompanyInterviewResources;
