"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Calendar, BadgeDollarSign, Briefcase, Mail, Phone, ClipboardList, Gift, Activity, Loader2, AlertCircle, User } from "lucide-react";
import Link from "next/link";
import styles from "./projectDetail.module.css";

import { ProjectStatus, WorkModel, Project } from "@/types/projects";
import { getProjectById } from "@/services/projectService";

import { mapProjectFromApi } from "@/mappers/project.mapper";

import Navbar from "../../components/navbar/navbar";
import { ProjectHeader } from "@/app/components/projects/projectHeader/projectHeader";
import { ProjectRequirements } from "@/app/components/projects/projectRequirements/projectRequirements";
import { ProjectBenefits } from "@/app/components/projects/projectBenefits/projectBenefits";
import { ProjectContact } from "@/app/components/projects/projectContact/projectContact";



function formatDate(date?: string | null) {
  if (!date) return "No definida";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getWorkModelLabel(modalidad: WorkModel) {
  switch (modalidad) {
    case "Remoto":
      return "Remoto";
    case "Presencial":
      return "Presencial";
    case "Hibrido":
      return "Híbrido";
    default:
      return modalidad;
  }
}

export default function ProjectDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProjectById(id);

        setProject(data);
      } catch (err: any) {
        setError(err.message || "Error al obtner informacion del proyecto");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  const mappedData = useMemo(() => {
    if(!project) return null;
    return mapProjectFromApi(project);
  }, [project]);

  if (loading) {
    return (
      <main className={styles.page}>
        <div className={styles.centerBox}>
          <Loader2 className={styles.spinner} />
          <p>Cargando detalle del proyecto...</p>
        </div>
      </main>
    );
  }

  if (error || !project) {
    return (
      <main className={styles.page}>

        <header className={styles.header}>
          <div className={styles.headerContent}>
            <Navbar variant="internal" />
            <div className={styles.logo}>N</div>
          </div>
        </header>

        <div className={styles.centerBox}>
          <AlertCircle className={styles.errorIcon} />
          <h2>No se pudo cargar el proyecto</h2>
          <p>{error || "El proyecto no existe o no está disponible."}</p>

          <Link href="/projects" className={styles.backButton}>
            <ArrowLeft size={18} />
            Volver a proyectos
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>

      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Navbar variant="internal" />
          <div className={styles.logo}>N</div>
        </div>
      </header>
      
      <div className={styles.container}>

        {mappedData?.header && (
          <ProjectHeader {...mappedData.header} />
        )}  
      
        <div className={styles.contentGrid}>
          <div className={styles.mainColumn}>
            
            {mappedData?.requirementsList && (
               <ProjectRequirements {...mappedData.requirementsList}/>
            )}

            {mappedData?.benefitsList && (
               <ProjectBenefits {...mappedData.benefitsList}/>
            )}
          </div>

          <aside className={styles.sidebar}>

            {mappedData?.contactInfo && (
               <ProjectContact {...mappedData?.contactInfo}/>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}