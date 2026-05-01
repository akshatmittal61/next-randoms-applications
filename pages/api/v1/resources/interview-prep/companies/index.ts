import { ResourcesController } from "@/controllers";
import { ApiRoute } from "@/server";

const apiRoute = new ApiRoute({
	POST: ResourcesController.readCompanyInterviewPrepResources,
});

export default apiRoute.getHandler();
