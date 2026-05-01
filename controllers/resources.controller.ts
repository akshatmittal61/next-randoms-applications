import { ApiSuccess } from "@/server";
import { ResourcesService } from "@/services";
import { ApiRequest, ApiResponse } from "@/types";
import { getSearchParam, StringUtils } from "@/utils";

export class ResourcesController {
	public static async readCompanyInterviewPrepResources(
		req: ApiRequest,
		res: ApiResponse
	) {
		const company = StringUtils.getNonEmptyStringOrElse(
			getSearchParam(req.url, "company"),
			"goldman-sachs"
		);

		const result =
			await ResourcesService.readInterviewPrepResources(company);

		return new ApiSuccess(res).send(result);
	}
}
