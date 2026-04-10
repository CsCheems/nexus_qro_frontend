"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { Search ,Filter ,Calendar ,TrendingUp ,Clock ,CheckCircle2 ,AlertCircle , User, Plus, X, Mail, Phone, Briefcase, HandCoins } from "lucide-react";
import styles from "./projects.module.css";
import Navbar from "../components/navbar/navbar";

import type { Project, ProjectFilters, ProjectStatus, WorkModel, CreateProjectPayload } from "@/types/projects";

import { PROJECT_STATUS_OPTIONS, PROJECT_STATUS_FILTERS, WORK_MODEL_OPTIONS, WORK_MODEL_FILTERS, APOYO_FILTERS } from "@/constants/project";

import { initialProjectForm } from "@/constants/projectForm";
import { getProjectPermissions, type UserRole } from "@/utils/projectPermissions";
import { formatDate, truncateText } from "@/utils/projectFormat";

import { getProjects, createProject, updateProject } from "@/services/projectService";
import { useAuth } from "@/context/auth.context";


export default function ProjectsPage() {
  
  const { user, loading } = useAuth();
  
  const userRole = user?.usuario?.rol as UserRole | undefined;

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

  const buildApiFilters = (currentFilters: ProjectFilters) => {
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

  const openCreateModal = () => {
    if (!permissions.canCreateProject) return;
    setShowCreateModal(true);
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

  const getStatusClass = (status: ProjectStatus) => {
    switch (status) {
      case "Iniciado":
        return styles.statusActive;
      case "Finalizado":
        return styles.statusCompleted;
      case "En Planeación":
        return styles.statusPlanning;
      default:
        return styles.statusDefault;
    }
  };

  const getStatusIcon = (status: ProjectStatus) => {
    switch (status) {
      case "Iniciado":
        return <TrendingUp size={16} />;
      case "Finalizado":
        return <CheckCircle2 size={16} />;
      case "En Planeación":
        return <Clock size={16} />;
      default:
        return <Briefcase size={16} />;
    }
  };

  const getWorkModelLabel = (modalidad: WorkModel) => {
    const labels: Record<WorkModel, string> = {
      remoto: "Remoto",
      presencial: "Presencial",
      hibrido: "Híbrido",
    };

    return labels[modalidad];
  };

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
              <article key={project.id} className={styles.projectCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardHeaderTop}>
                    <div className={styles.cardHeaderLeft}>
                      <span
                        className={`${styles.statusBadge} ${getStatusClass(
                          project.estado
                        )}`}
                      >
                        {getStatusIcon(project.estado)}
                        <span>{project.estado}</span>
                      </span>

                      <span className={styles.modalityBadge}>
                        {getWorkModelLabel(project.modalidad)}
                      </span>
                    </div>
                  </div>

                  <h3 className={styles.cardTitle}>
                    <Link href={`/projects/${project.id}`}>
                      {project.nombre_proyecto}
                    </Link>
                  </h3>

                  <p className={styles.cardDescription}>
                    {truncateText(project.descripcion, isStudent ? 120 : 180)}
                  </p>
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.metaInfo}>
                    <div className={styles.metaItem}>
                      <Calendar size={16} />
                      <span>
                        {formatDate(project.fecha_inicio)}
                        {project.fecha_fin
                          ? ` - ${formatDate(project.fecha_fin)}`
                          : " - Sin fecha de cierre"}
                      </span>
                    </div>

                    <div className={styles.metaItem}>
                      <HandCoins size={16} />
                      <span>
                        {project.apoyo_economico
                          ? "Con apoyo económico"
                          : "Sin apoyo económico"}
                      </span>
                    </div>

                    {!isStudent && (
                      <>
                        <div className={styles.metaItem}>
                          <Mail size={16} />
                          <span>{project.contacto_email}</span>
                        </div>

                        <div className={styles.metaItem}>
                          <Phone size={16} />
                          <span>{project.contacto_telefono}</span>
                        </div>
                      </>
                    )}
                  </div>

                  {permissions.showFullCardInfo && (
                    <>
                      {project.requisitos && (
                        <div className={styles.infoBlock}>
                          <h4 className={styles.infoTitle}>Requisitos</h4>
                          <p className={styles.infoText}>
                            {truncateText(project.requisitos, 100)}
                          </p>
                        </div>
                      )}

                      {project.beneficios && (
                        <div className={styles.infoBlock}>
                          <h4 className={styles.infoTitle}>Beneficios</h4>
                          <p className={styles.infoText}>
                            {truncateText(project.beneficios, 100)}
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>

                <div className={styles.cardFooter}>
                  <Link
                    href={`/projects/${project.id}`}
                    className={styles.detailsButton}
                  >
                    Ver detalles →
                  </Link>
                </div>
              </article>
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
                Intenta ajustar los filtros o términos de búsqueda para
                encontrar proyectos relevantes.
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

      {showCreateModal && permissions.canCreateProject && (
        <div
          className={styles.modalOverlay}
          onClick={closeCreateModal}
        >
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h2>Crear Nuevo Proyecto</h2>

              <button
                type="button"
                onClick={closeCreateModal}
                className={styles.closeButton}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className={styles.modalForm}>
              <div className={styles.formGrid}>
                <div className={styles.field}>
                  <label className={styles.label}>Nombre del proyecto</label>
                  <input
                    type="text"
                    value={newProject.nombre_proyecto}
                    onChange={(e) =>
                      setNewProject((prev) => ({
                        ...prev,
                        nombre_proyecto: e.target.value,
                      }))
                    }
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Estado</label>
                  <select
                    value={newProject.estado}
                    onChange={(e) =>
                      setNewProject((prev) => ({
                        ...prev,
                        estado: e.target.value as ProjectStatus,
                      }))
                    }
                    className={styles.select}
                    required
                  >
                    {PROJECT_STATUS_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.fieldFull}>
                  <label className={styles.label}>Descripción</label>
                  <textarea
                    value={newProject.descripcion}
                    onChange={(e) =>
                      setNewProject((prev) => ({
                        ...prev,
                        descripcion: e.target.value,
                      }))
                    }
                    className={styles.textarea}
                    rows={4}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Modalidad</label>
                  <select
                    value={newProject.modalidad}
                    onChange={(e) =>
                      setNewProject((prev) => ({
                        ...prev,
                        modalidad: e.target.value as WorkModel,
                      }))
                    }
                    className={styles.select}
                    required
                  >
                    {WORK_MODEL_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Apoyo económico</label>
                  <select
                    value={String(newProject.apoyo_economico)}
                    onChange={(e) =>
                      setNewProject((prev) => ({
                        ...prev,
                        apoyo_economico: e.target.value === "true",
                      }))
                    }
                    className={styles.select}
                  >
                    <option value="false">No</option>
                    <option value="true">Sí</option>
                  </select>
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Fecha de inicio</label>
                  <input
                    type="date"
                    value={newProject.fecha_inicio}
                    onChange={(e) =>
                      setNewProject((prev) => ({
                        ...prev,
                        fecha_inicio: e.target.value,
                      }))
                    }
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Fecha de fin</label>
                  <input
                    type="date"
                    value={newProject.fecha_fin ?? ""}
                    onChange={(e) =>
                      setNewProject((prev) => ({
                        ...prev,
                        fecha_fin: e.target.value,
                      }))
                    }
                    className={styles.input}
                  />
                </div>

                <div className={styles.fieldFull}>
                  <label className={styles.label}>Requisitos</label>
                  <textarea
                    value={newProject.requisitos ?? ""}
                    onChange={(e) =>
                      setNewProject((prev) => ({
                        ...prev,
                        requisitos: e.target.value,
                      }))
                    }
                    className={styles.textarea}
                    rows={3}
                  />
                </div>

                <div className={styles.fieldFull}>
                  <label className={styles.label}>Beneficios</label>
                  <textarea
                    value={newProject.beneficios ?? ""}
                    onChange={(e) =>
                      setNewProject((prev) => ({
                        ...prev,
                        beneficios: e.target.value,
                      }))
                    }
                    className={styles.textarea}
                    rows={3}
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Correo de contacto</label>
                  <input
                    type="email"
                    value={newProject.contacto_email}
                    onChange={(e) =>
                      setNewProject((prev) => ({
                        ...prev,
                        contacto_email: e.target.value,
                      }))
                    }
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Teléfono de contacto</label>
                  <input
                    type="tel"
                    value={newProject.contacto_telefono}
                    onChange={(e) =>
                      setNewProject((prev) => ({
                        ...prev,
                        contacto_telefono: e.target.value,
                      }))
                    }
                    className={styles.input}
                    required
                  />
                </div>
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  onClick={closeCreateModal}
                  className={styles.cancelButton}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creando..." : "Crear Proyecto"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}