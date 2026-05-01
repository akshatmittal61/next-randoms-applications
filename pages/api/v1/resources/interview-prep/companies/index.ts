import { ResourcesController } from "@/controllers";
import { ApiRoute } from "@/server";

const apiRoute = new ApiRoute({
	POST: ResourcesController.readInterviewPrepResources,
});

export default apiRoute.getHandler();
