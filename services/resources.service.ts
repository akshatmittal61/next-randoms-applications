import { frontendBaseUrl } from "@/constants";
import { Logger } from "@/log";
import { csvToJson } from "@/utils";
import axios from "axios";

export class ResourcesService {
	public static async readInterviewPrepResources(resource: string = "") {
		Logger.debug("Frontend url: ", frontendBaseUrl);
		const goldmanSachsByTime = await Promise.all(
			["6months", "1year", "2year", "alltime"]
				.map(
					(suffix) =>
						`${frontendBaseUrl}/__/resources/interview-prep/companies/goldman-sachs_${suffix}.csv`
				)
				.map(
					async (url) =>
						await axios
							.get(url, { responseType: "text" })
							.then((res) => csvToJson(res.data))
				)
		);
		/* [{
        "ID": "289",
        "Title": "Game of Life",
        "Acceptance": "54.5%",
        "Difficulty": "Medium",
        "Frequency": "1.9095955742703714",
        "Leetcode Question Link": "https://leetcode.com/problems/game-of-life"
    }]
        ]
        */
		const relevant = await axios.get(
			`${frontendBaseUrl}/__/resources/interview-prep/companies/goldman-sachs_relevant_leetcode.json`
		);
		/* [ {
        "title": "Two Sum",
        "difficulty": "EASY",
        "topics": [
            "Array",
            "Hash Table"
        ],
        "link": "https://leetcode.com/problems/two-sum"
    }, ] */

		/* 
   
    Merge both as:
    [
        {
            id: `from-csv-${index}`,
            title: "Game of Life",
            acceptance: "54.5%",
            difficulty: "Medium",
            frequency: "1.9095955742703714",
            link: "https://leetcode.com/problems/game-of-life",
            topics: ["Array", "Hash Table"]
        }
    ]

    */
		const csvData = goldmanSachsByTime
			.flatMap((array: any[]) => array)
			.sort((a: any, b: any) => parseInt(a.ID) - parseInt(b.ID))
			.reduce((acc: any[], curr: any) => {
				const existing = acc.find((item) => item.ID === curr.ID);
				if (existing) {
					// existing.Frequency = curr.Frequency;
				} else {
					acc.push(curr);
				}
				return acc;
			}, [])
			.map((item, index) => {
				return {
					id: `from-csv-${index}`,
					title: item.Title,
					acceptance: item.Acceptance,
					difficulty: item.Difficulty,
					frequency: item.Frequency,
					link: item["Leetcode Question Link"],
					topics: [],
				};
			});

		const jsonData = relevant.data.map((item: any, index: number) => {
			return {
				id: `from-json-${index}`,
				title: item.title,
				difficulty: item.difficulty,
				topics: item?.topics || [],
				link: item.link,
				acceptance: "",
				frequency: "",
			};
		});

		return [...csvData, ...jsonData];
	}
}
