"use client";

import { useEffect, useMemo, useState } from "react";

import {
  ArrowLeft,
  Bell,
  Briefcase,
  Building2,
  Calendar,
  FolderPlus,
  Globe,
  Target,
  User,
  Users,
  TrendingUp,
  MessageSquare,
} from "lucide-react";

import styles from "./VentureDetalle.module.css";

// Components
import { VentureHeader } from "../../components/ventures/ventureHeader/ventureHeader";
import { StageProgress } from "../../components/ventures/stageProgress/stageProgress";
import { ProgressTimeline } from "../../components/ventures/progressTimeline/progressTimeLine";
import { ConsultingRequestList } from "../../components/ventures/consultingRequestList/consultingRequestList";
import { VentureInfoCard } from "../../components/ventures/ventureInfoCard/ventureInfoCard";
import { ActivityFeed } from "../../components/ventures/activityFeed/activityFeed";
import { QuickMetrics } from "../../components/ventures/quickMetrics/quickMetrics";
import { ConsultingRequestDialog } from "../../components/ventures/consultingRequestDialog/consultingRequestDialog";
import { VentureInfoEditDialog } from "../../components/ventures/ventureInfoEditDialog/ventureInfoEditDialog";
import Navbar from "../../components/navbar/navbar";

// Types
import type { VentureDiagnosticResponse, VentureDetailResponse, VentureTask, VentureTaskStatus } from "@/types/ventures";

// Service
import { getVentureById, getVentureDiagnostic } from "@/services/ventureService";

// Helpers
import { mapVentureFromApi } from "@/mappers/venture.mapper";
import { RoadmapResponse } from "@/types/roadmap";
import { TaskDetalleModal } from "@/app/components/ventures/tasks/tasksDetalleModal";
import { ProjectList } from "@/app/components/ventures/projectsList/projectsList";
import { ProjectModal } from "@/app/components/projects/modal/projectModal";
import { CreateProjectPayload, Project } from "@/types/projects";
import { initialProjectForm } from "@/constants/projectForm";
import { createProject } from "@/services/projectService";
import { getProjectPermissions, UserRole } from "@/utils/projectPermissions";
import { useAuth } from "@/context/auth.context";

// Page
interface VentureDetalleProps {
  id: string;
}

export function VentureDetalle({ id }: VentureDetalleProps) {
  
  const [venture, setVenture] = useState<VentureDetailResponse | null>(null);
  const [diagnostic, setDiagnostic] = useState<VentureDiagnosticResponse | null>(null);
  const [roadmap, setRoadmap] = useState<RoadmapResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tasks, setTasks] = useState<VentureTask[]>([]);
  const [selectedTask, setSelectedTask] = useState<VentureTask | null>(null);

  const [showConsultingModal, setShowConsultingModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProject, setNewProject] =useState<CreateProjectPayload>(initialProjectForm);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user, loading } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return;

        setIsLoading(true);
        setError(null);

        const [ ventureData, diagnosticData ] = await Promise.all([
          getVentureById(id),
          getVentureDiagnostic(id)
        ]);

        setVenture(ventureData.venture);
        setDiagnostic(diagnosticData);
        setRoadmap(ventureData.roadmap);
        
      } catch (err: any) {
        setError(err.message || "Error al obtner informacion del emprendimiento");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const fetchVenture = async () => {
     const [ ventureData, diagnosticData ] = await Promise.all([
        getVentureById(id),
        getVentureDiagnostic(id)
      ]);

      setVenture(ventureData.venture);
      setDiagnostic(diagnosticData);
      setRoadmap(ventureData.roadmap);
  }

  const mappedData = useMemo(() => {
    if (!venture) return null;
    return mapVentureFromApi(venture, diagnostic, roadmap);
  }, [venture, diagnostic, roadmap]);



  const [currentVentureInfo, setCurrentVentureInfo] = useState({
    problem: "",
    solution: "",
    businessModel: "",
    targetMarket: "",
  });

  useEffect(() => {
    if (mappedData) {
      setCurrentVentureInfo(mappedData.ventureInfo);
    }
  }, [mappedData]);

  const [selectedProjectId, setSelectedProjectId] = useState<
    string | number | null
  >(null);

  useEffect(() => {
    if (mappedData?.projects?.length) {
      setSelectedProjectId(mappedData.projects[0].id);
    }
  }, [mappedData]);

  const selectedProject = useMemo(() => {
    return (
      mappedData?.projects.find((p) => p.id === selectedProjectId) ?? null
    );
  }, [mappedData, selectedProjectId]);

  const handleOpenTask = (task: VentureTask) => {
    setSelectedTask(task);
    setShowTaskModal(true);
  };

  const handleCloseTask = () => {
    setSelectedTask(null);
    setShowTaskModal(false);
  };

  const handleTaskStatusChange = (taskId: string, status: VentureTaskStatus) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId
        ? {...task, status}
        : task
      )
    );
  };

  const handleCreateProject = async (
      e: React.FormEvent<HTMLFormElement>
    ) => {
      e.preventDefault();
  
      if (newProject.fecha_fin && new Date(newProject.fecha_fin) < new Date(newProject.fecha_inicio)) {
          alert("La fecha de fin no puede ser menor a la fecha de inicio.");
          return;
      }
  
      try {
          setIsSubmitting(true);
          setError(null);
    
          const createdProject = await createProject({
            ...newProject,
            venture_id: Number(id), 
          });
    
          setProjects((prev) => [createdProject, ...prev]);
          closeCreateModal();
          fetchVenture();
      } catch (err: any) {
          alert(err.message || "No se pudo crear el proyecto");
      } finally {
          setIsSubmitting(false);
      }
  };

  const closeCreateModal = () => {
      setShowCreateModal(false);
      setNewProject(initialProjectForm);
  };

  
    
  const userRole = user?.rol as UserRole | undefined;

   if (loading) {
    return <div>Cargando usuario...</div>;
  }

  if (!userRole) {
    return <div>No se pudo obtener el rol</div>;
  }

  const permissions = getProjectPermissions(userRole);

  if (isLoading) return <p>Cargando...</p>;
  if (error || !mappedData) return <p>Error al cargar</p>;

  return (
    <div className={styles.page}>

      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Navbar variant="internal" />
          <div className={styles.logo}>N</div>
        </div>
      </header>

       <div className={styles.main}> 
          <VentureHeader
            {...mappedData.header}
            onRequestConsulting={() => setShowConsultingModal(true)}
            onCreateProject={() => setShowCreateModal(true)}
          />

          <QuickMetrics
            metrics={[
              {
                label: "Progreso",
                value: `${mappedData.currentStage.progress}%`,
                icon: TrendingUp,
              },
              {
                label: "Tareas",
                value: `${mappedData.currentStage.tasks.filter((t: { status: string }) => t.status === "completa").length}/${mappedData.currentStage.tasks.length}`,
                icon: Target,
              },
              {
                label: "Asesorías",
                value: mappedData.consultingRequests.length,
                icon: MessageSquare,
              },
              {
                label: "Equipo",
                value: mappedData.summary.teamSize,
                icon: Users,
              },
            ]}
          />

          <div className={styles.layout}>

            <div className={styles.leftColumn}>
               <VentureInfoCard
                  info={currentVentureInfo}
                  onEdit={() => setShowEditModal(true)}
              />
              <ConsultingRequestList
                  requests={mappedData.consultingRequests}
                  onNewRequest={() => setShowConsultingModal(true)}
              />
              <ProjectList projects={mappedData.projects} />
              
             
              
            </div>

            <div className={styles.rightColumn}>
              <ProgressTimeline stages={mappedData.stages} />
              <StageProgress
                  stageName={mappedData.currentStage.stageName}
                  progress={mappedData.currentStage.progress}
                  objective={mappedData.currentStage.objective}
                  tasks={mappedData.currentStage.tasks}
                  onTaskClick={handleOpenTask}
              />
              {/* <ActivityFeed activities={mappedData.activities} /> */}
            </div>

          </div>

          <ConsultingRequestDialog
            open={showConsultingModal}
            onOpenChange={setShowConsultingModal}
            onSubmit={(data) => console.log(data)}
          />

          <VentureInfoEditDialog
            open={showEditModal}
            onOpenChange={setShowEditModal}
            initialData={currentVentureInfo}
            onSave={setCurrentVentureInfo}
          />

          <TaskDetalleModal 
            open={showTaskModal}
            task={selectedTask}
            ventureId={id}
            onClose={handleCloseTask}
            onTaskStatusChange={handleTaskStatusChange}
            onTaskUpdate={fetchVenture}
          />

          <ProjectModal
            open={showCreateModal && permissions?.canCreateProject}
            onClose={closeCreateModal}
            onSubmit={handleCreateProject}
            isSubmitting={isSubmitting}
            newProject={newProject}
            setNewProject={setNewProject}
          />

       </div>
      
    </div>
  );
}