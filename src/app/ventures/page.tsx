"use client";

import { useMemo, useState, useEffect } from "react";
import { Search, Filter, AlertCircle, Plus, Briefcase, TrendingUp, CheckCircle2, Clock } from "lucide-react";
import styles from "./ventures.module.css";
import Navbar from "../components/navbar/navbar";

import { VentureCard } from "../components/ventures/card/ventureCard";
import { VentureModal } from "../components/ventures/modal/venturetModal";

import type { Venture, VentureFilters, VenturePayload, VentureStage, ApiVentureFilters } from "@/types/ventures";

import { WORK_MODEL_FILTERS } from "@/constants/project";

import { VENTURE_STAGE_FILTERS } from "@/constants/venture";

import { initialVentureForm } from "@/constants/ventureForm"; 
import { getVenturePermissions, type UserRole } from "@/utils/venturePermissions";
import { getVentures, registerVenture } from "@/services/ventureService";

import { useAuth } from "@/context/auth.context";

export default function VenturesPage() {
  
  const { user, loading } = useAuth();
  
  const userRole = user?.usuario?.rol as UserRole | undefined;

  const [ventures, setVentures] = useState<Venture[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [filters, setFilters] = useState<VentureFilters>({
    search: "",
    venture_stage: "todos",
    requiere_financiamiento: false
  });

  const [showFilters, setShowFilters] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newVenture, setNewVenture] = useState<VenturePayload>(initialVentureForm);

  const [newProject, setNewProject] =
    useState<VenturePayload>(initialVentureForm);

  const buildApiFilters = (currentFilters: VentureFilters): ApiVentureFilters => {
    return {
      search: currentFilters.search.trim() || undefined,
      venture_stage: currentFilters.venture_stage !== "todos" ? currentFilters.venture_stage : undefined,
      requiere_financiamiento: currentFilters.requiere_financiamiento
    };
  };

  const handleGetProjects = async (currentFilters: VentureFilters = filters) => {
    try {
      setIsLoading(true);
      setError(null);

      const apiFilters = buildApiFilters(currentFilters);
      const data = await getVentures(apiFilters);

      setVentures(data);
    } catch (err: any) {
        setError(err.message || "No se pudieron obtener los proyectos");
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetProjects(filters);
  }, []);

  const handleFilterChange = <K extends keyof VentureFilters>(
    key: K,
    value: VentureFilters[K]
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
      venture_stage: "todos",
      requiere_financiamiento: false
    });
  };

  

  const closeCreateModal = () => {
    setShowCreateModal(false);
    setNewProject(initialVentureForm);
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

      const createdVenture = await registerVenture(newVenture);

      setVentures((prev) => [createdVenture, ...prev]);
      closeCreateModal();
    } catch (err: any) {
      alert(err.message || "No se pudo registrar el emprendimiento");
    } finally {
      setIsSubmitting(false);
    }
  };

  const ventureStats = useMemo(() => {
    return {
      total: ventures.length,
      idea: ventures.filter((v) => v.venture_stage === "Idea").length,
      fromalizacion: ventures.filter((v) => v.venture_stage === "Formalización").length,
      operacion: ventures.filter((v) => v.venture_stage === "Operación").length,
    };
  }, [ventures]);

  const hasActiveFilters =
    filters.venture_stage !== "todos" ||
    filters.requiere_financiamiento !== false ||
    filters.search.trim() !== "";

  if (loading) {
    return <div>Cargando usuario...</div>;
  }

  if (!userRole) {
    return <div>No se pudo obtener el rol</div>;
  }

  const permissions = getVenturePermissions(userRole);
  const isVenturer = userRole === "emprendedor";

  const openCreateModal = () => {
    if (!permissions.canCreateVenture) return;
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
            Explora los emprendimientos de innovación, investigación y desarrollo
            tecnológico.
          </p>
        </section>

        <section className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statCardContent}>
              <div>
                <p className={styles.statLabel}>Total Emprendimientos</p>
                <p className={styles.statValue}>{ventureStats.total}</p>
              </div>
              <div className={`${styles.statIconBox} ${styles.statPrimary}`}>
                <Briefcase size={24} />
              </div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statCardContent}>
              <div>
                <p className={styles.statLabel}>Idea</p>
                <p className={`${styles.statValue} ${styles.greenText}`}>
                  {ventureStats.idea}
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
                <p className={styles.statLabel}>Formalización</p>
                <p className={`${styles.statValue} ${styles.yellowText}`}>
                  {ventureStats.fromalizacion}
                </p>
              </div>
              <div className={`${styles.statIconBox} ${styles.statYellow}`}>
                <Clock size={24} />
              </div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statCardContent}>
              <div>
                <p className={styles.statLabel}>Operación</p>
                <p className={`${styles.statValue} ${styles.blueText}`}>
                  {ventureStats.operacion}
                </p>
              </div>
              
              <div className={`${styles.statIconBox} ${styles.statBlue}`}>
                <CheckCircle2 size={24} />
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
                placeholder="Buscar emprendimientos..."
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

            {permissions.canCreateVenture && (
              <button
                type="button"
                onClick={openCreateModal}
                className={styles.createButton}
              >
                <Plus size={16} />
                <span>Crear Emprendimiento</span>
              </button>
            )}
          </div>

          {showFilters && (
            <div className={styles.filterPanel}>
              <div className={styles.filterField}>
                <label className={styles.label}>Estado</label>
                <select
                  value={filters.venture_stage}
                  onChange={(e) =>
                    handleFilterChange(
                      "venture_stage",
                      e.target.value as VentureStage | "todos"
                    )
                  }
                  className={styles.select}
                >
                  {VENTURE_STAGE_FILTERS.map((option) => (
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
            Mostrando <span>{ventures.length}</span> emprendimientos
          </p>
        </div>

        {isLoading ? (
          <section className={styles.emptyState}>
            <div className={styles.emptyContent}>
              <h3>Cargando emprendimientos...</h3>
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
        ) : ventures.length > 0 ? (
          <section className={styles.projectsGrid}>
            {ventures.map((venture) => (
              <VentureCard
                key={venture.id}
                venture={venture}
                isVenturer={isVenturer}
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

      <VentureModal
        open={showCreateModal && permissions.canCreateVenture}
        onClose={closeCreateModal}
        onSubmit={handleCreateProject}
        isSubmitting={isSubmitting}
        newVenture={newVenture}
        setNewVenture={setNewVenture}
      />
      
    </div>
  );
}