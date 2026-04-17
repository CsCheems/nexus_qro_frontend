import Navbar from "@/app/components/navbar/navbar";
import VentureDetalle from "./VentureDetalle";
import { use } from "react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    return (
        <>
            <Navbar variant="internal" />
            <VentureDetalle id={id} />
        </>
        
    );
}