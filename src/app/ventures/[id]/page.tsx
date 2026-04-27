import Navbar from "@/app/components/navbar/navbar";
import { VentureDetalle } from "./VentureDetalle";
import { use } from "react";
import { RouteProtection } from "../../components/routeProtection/routeProtection";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    return (
        <>
            <RouteProtection>
                <Navbar variant="internal" />
                <VentureDetalle id={id} />
            </RouteProtection>
            
        </>
        
    );
}