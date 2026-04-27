"use client";

import { useMemo, useState, useEffect } from "react";
import { Search, Filter, AlertCircle, Plus, Briefcase, TrendingUp, CheckCircle2, Clock } from "lucide-react";
import styles from "./projects.module.css";
import Navbar from "../components/navbar/navbar";

import { ProjectCard } from "../components/projects/card/projectCard";
import { ProjectModal } from "../components/projects/modal/projectModal";

import type { Project, ApiProjectFilters, ProjectFilters, ProjectStatus, WorkModel, CreateProjectPayload } from "@/types/projects";

import {  PROJECT_STATUS_FILTERS, WORK_MODEL_FILTERS } from "@/constants/project";

import { initialProjectForm } from "@/constants/projectForm";
import { getProjectPermissions, type UserRole } from "@/utils/projectPermissions";

import { getProjects, createProject } from "@/services/projectService";
import { useAuth } from "@/context/auth.context";

export default function ProjectsPage() {
  
  const { user, loading } = useAuth();
  
  const userRole = user?.rol as UserRole | undefined;

  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [filters, setFilters] = useState<ProjectFilters>({
    search: "",
    estado: "todos",
    modalidad: "todos"
  });

  const [showFilters, setShowFilters] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProject, setNewProject] =
    useState<CreateProjectPayload>(initialProjectForm);

  const buildApiFilters = (currentFilters: ProjectFilters): ApiProjectFilters => {
    return {
      search: currentFilters.search.trim() || undefined,
      estado: currentFilters.estado !== "todos" ? currentFilters.estado : undefined,
      modalidad:
        currentFilters.modalidad !== "todos" ? currentFilters.modalidad : undefined,
    };
  };

  const handleGetProjects = async (currentFilters: ProjectFilters = filters) => {
    try {
      setIsLoading(true);
      setError(null);

      const apiFilters = buildApiFilters(currentFilters);
      const data = await getProjects(apiFilters);

      setProjects(data);
    } catch (err: any) {
        setError(err.message || "No se pudieron obtener los proyectos");
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetProjects(filters);
  }, []);

  const handleFilterChange = <K extends keyof ProjectFilters>(
    key: K,
    value: ProjectFilters[K]
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleGetProjects(filters);
    }, 300);

    return () => clearTimeout(timeout);
  }, [filters]);

  const resetFilters = () => {
    setFilters({
      search: "",
      estado: "todos",
      modalidad: "todos"
    });
  };

  

  const closeCreateModal = () => {
    setShowCreateModal(false);
    setNewProject(initialProjectForm);
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

      const createdProject = await createProject(newProject);

      setProjects((prev) => [createdProject, ...prev]);
      closeCreateModal();
    } catch (err: any) {
      alert(err.message || "No se pudo crear el proyecto");
    } finally {
      setIsSubmitting(false);
    }
  };

  const projectStats = useMemo(() => {
    return {
      total: projects.length,
      iniciados: projects.filter((p) => p.estado === "Iniciado").length,
      finalizados: projects.filter((p) => p.estado === "Finalizado").length,
      planeacion: projects.filter((p) => p.estado === "En Planeación").length,
    };
  }, [projects]);

  const hasActiveFilters =
    filters.estado !== "todos" ||
    filters.modalidad !== "todos" ||
    filters.search.trim() !== "";

  if (loading) {
    return <div>Cargando usuario...</div>;
  }

  if (!userRole) {
    return <div>No se pudo obtener el rol</div>;
  }

  const permissions = getProjectPermissions(userRole);
  const isStudent = userRole === "estudiante";

  const openCreateModal = () => {
    if (!permissions.canCreateProject) return;
    setShowCreateModal(true);
  };

  return (
    
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Navbar variant="internal" />
          <div className={styles.logo}>N</div>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Proyectos</h1>
          <p className={styles.pageSubtitle}>
            Explora proyectos de innovación, investigación y desarrollo
            tecnológico.
          </p>
        </section>

        <section className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statCardContent}>
              <div>
                <p className={styles.statLabel}>Total Proyectos</p>
                <p className={styles.statValue}>{projectStats.total}</p>
              </div>
              <div className={`${styles.statIconBox} ${styles.statPrimary}`}>
                <Briefcase size={24} />
              </div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statCardContent}>
              <div>
                <p className={styles.statLabel}>Iniciados</p>
                <p className={`${styles.statValue} ${styles.greenText}`}>
                  {projectStats.iniciados}
                </p>
              </div>
              <div className={`${styles.statIconBox} ${styles.statGreen}`}>
                <TrendingUp size={24} />
              </div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statCardContent}>
              <div>
                <p className={styles.statLabel}>Finalizados</p>
                <p className={`${styles.statValue} ${styles.blueText}`}>
                  {projectStats.finalizados}
                </p>
              </div>
              <div className={`${styles.statIconBox} ${styles.statBlue}`}>
                <CheckCircle2 size={24} />
              </div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statCardContent}>
              <div>
                <p className={styles.statLabel}>En Planeación</p>
                <p className={`${styles.statValue} ${styles.yellowText}`}>
                  {projectStats.planeacion}
                </p>
              </div>
              <div className={`${styles.statIconBox} ${styles.statYellow}`}>
                <Clock size={24} />
              </div>
            </div>
          </div>
        </section>

        <section className={styles.toolbar}>
          <div className={styles.toolbarTop}>
            <div className={styles.searchWrapper}>
              <div className={styles.searchIcon}>
                <Search size={20} />
              </div>

              <input
                type="text"
                placeholder="Buscar proyectos..."
                value={filters.search}
                onChange={(e) =>
                  handleFilterChange("search", e.target.value)
                }
                className={styles.searchInput}
              />
            </div>

            <button
              type="button"
              onClick={() => setShowFilters((prev) => !prev)}
              className={styles.filterButton}
            >
              <Filter size={16} />
              <span>Filtros</span>

              {hasActiveFilters && (
                <span className={styles.filterDot}></span>
              )}
            </button>

            {permissions.canCreateProject && (
              <button
                type="button"
                onClick={openCreateModal}
                className={styles.createButton}
              >
                <Plus size={16} />
                <span>Crear Proyecto</span>
              </button>
            )}
          </div>

          {showFilters && (
            <div className={styles.filterPanel}>
              <div className={styles.filterField}>
                <label className={styles.label}>Estado</label>
                <select
                  value={filters.estado}
                  onChange={(e) =>
                    handleFilterChange(
                      "estado",
                      e.target.value as ProjectStatus | "todos"
                    )
                  }
                  className={styles.select}
                >
                  {PROJECT_STATUS_FILTERS.map((option) => (
                    <option key={String(option.value)} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.filterField}>
                <label className={styles.label}>Modalidad</label>
                <select
                  value={filters.modalidad}
                  onChange={(e) =>
                    handleFilterChange(
                      "modalidad",
                      e.target.value as WorkModel | "todos"
                    )
                  }
                  className={styles.select}
                >
                  {WORK_MODEL_FILTERS.map((option) => (
                    <option key={String(option.value)} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </section>

        <div className={styles.resultsCount}>
          <p>
            Mostrando <span>{projects.length}</span> proyecto
          </p>
        </div>

        {isLoading ? (
          <section className={styles.emptyState}>
            <div className={styles.emptyContent}>
              <h3>Cargando proyectos...</h3>
            </div>
          </section>
        ) : error ? (
          <section className={styles.emptyState}>
            <div className={styles.emptyContent}>
              <div className={styles.emptyIcon}>
                <AlertCircle size={32} />
              </div>
              <h3>Ocurrió un error</h3>
              <p>{error}</p>
              <button
                type="button"
                onClick={() => handleGetProjects(filters)}
                className={styles.clearButton}
              >
                Reintentar
              </button>
            </div>
          </section>
        ) : projects.length > 0 ? (
          <section className={styles.projectsGrid}>
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isStudent={isStudent}
                showFullCardInfo={permissions.showFullCardInfo}
              />
            ))}
          </section>
        ) : (
          <section className={styles.emptyState}>
            <div className={styles.emptyContent}>
              <div className={styles.emptyIcon}>
                <AlertCircle size={32} />
              </div>

              <h3>No se encontraron proyectos</h3>
              <p>
                Intenta ajustar los filtros o términos de búsqueda.
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className={styles.clearButton}
              >
                Limpiar filtros
              </button>
            </div>
          </section>
        )}
      </main>

      <ProjectModal
        open={showCreateModal && permissions.canCreateProject}
        onClose={closeCreateModal}
        onSubmit={handleCreateProject}
        isSubmitting={isSubmitting}
        newProject={newProject}
        setNewProject={setNewProject}
      />
      
    </div>
  );
}