import { http } from "@/client";
import { ApiRes } from "@/types";

export class ResourcesApi {
	public static async readCompanyInterviewPrepResources({
		company,
	}: {
		company: string;
	}) {
		const url = `/resources/interview-prep/companies?company=${company}`;

		const res = await http.post<ApiRes<Array<any>>>(url);
		return res.data;
	}
}
