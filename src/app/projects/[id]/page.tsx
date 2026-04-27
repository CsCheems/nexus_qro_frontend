import ProjectDetailPage from "./projectDetail";
import { RouteProtection } from "../../components/routeProtection/routeProtection";

export default function Page() {
  return (
    <RouteProtection>
      <ProjectDetailPage />
    </RouteProtection>
  );
}