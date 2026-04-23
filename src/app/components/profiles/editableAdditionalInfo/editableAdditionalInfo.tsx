import styles from "../additionalInfo/additionalInfo.module.css";
import { Input, Select } from "../inputs/inputs";
import {FormDataType, UserRole, ConsultorProfile, EstudianteProfile, EmprendedorProfile, EmpresaProfile, InstitucionProfile, AdministradorProfile } from "@/types/profiles";

interface Props {
  role: UserRole;
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  servicesCatalog?: { id: number; nombre: string }[];
}

export function EditableAdditionalInfo({
  role,
  formData,
  setFormData,
  servicesCatalog = [],
}: Props) {
  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleServiceToggle = (serviceId: number) => {
    if (role !== "consultor") return;

    setFormData((prev) => {
        if (!("serviciosIds" in prev)) return prev;

        const current = prev.serviciosIds || [];

        const exists = current.includes(serviceId);

        const updated = exists
          ? current.filter((id) => id !== serviceId)
          : [...current, serviceId];

        return {
          ...prev,
          serviciosIds: updated,
        };
    });
  };

  const renderFields = () => {
    switch (role) {
      case "consultor":
        return (
          <>
            <Input label="Empresa" value={(formData as ConsultorProfile).empresa} onChange={(v: string) => handleChange("empresa", v)} />
            <Input label="Puesto" value={(formData as ConsultorProfile).puesto} onChange={(v: string) => handleChange("puesto", v)} />

            <Select
              label="Disponibilidad"
              value={(formData as ConsultorProfile).disponibilidad}
              onChange={(v: string) => handleChange("disponibilidad", v)}
              options={["Disponible", "No Disponible", "En Proyecto"]}
            />

            <div className={styles.field}>
              <label>Servicios</label>
              {servicesCatalog.length > 0 && (
                <div className={styles.servicesSelector}>
                  {servicesCatalog.map((s) => (
                    <button
                      type="button"
                      key={s.id}
                      className={`${styles.serviceOption} ${
                      (formData as ConsultorProfile).serviciosIds?.includes(s.id)
                          ? styles.activeService
                          : ""
                      }`}
                      onClick={() => handleServiceToggle(s.id)}
                    >
                      {s.nombre}
                    </button>
                  ))}
                </div>
              )}
              
            </div>
          </>
        );

      case "estudiante":
        return (
          <>
            <Input label="Universidad" value={(formData as EstudianteProfile).universidad} onChange={(v: string) => handleChange("universidad", v)} />
            <Input label="División" value={(formData as EstudianteProfile).division} onChange={(v: string) => handleChange("division", v)} />
            <Input label="Programa" value={(formData as EstudianteProfile).programa} onChange={(v: string) => handleChange("programa", v)} />
          </>
        );

      case "emprendedor":
        return (
          <>
            <Input label="Sector" value={(formData as EmprendedorProfile).sector} onChange={(v: string) => handleChange("sector", v)} />
            <Input label="Descripción" value={(formData as EmprendedorProfile).descripcion} onChange={(v: string) => handleChange("descripcion", v)} />
          </>
        );

      case "empresa":
        return (
          <>
            <Input label="Empresa" value={(formData as EmpresaProfile).nombre_empresa} onChange={(v: string) => handleChange("nombre_empresa", v)} />
            <Input label="País" value={(formData as EmpresaProfile).pais} onChange={(v: string) => handleChange("pais", v)} />
            <Input label="Ciudad" value={(formData as EmpresaProfile).ciudad} onChange={(v: string) => handleChange("ciudad", v)} />
            <Input label="Sector" value={(formData as EmpresaProfile).sector} onChange={(v: string) => handleChange("sector", v)} />
          </>
        );

      case "institucion":
        return (
          <>
            <Input label="Institución" value={(formData as InstitucionProfile).nombre_institucion} onChange={(v: string) => handleChange("nombre_institucion", v)} />
            <Input label="País" value={(formData as InstitucionProfile).pais} onChange={(v: string) => handleChange("pais", v)} />
            <Input label="Ciudad" value={(formData as InstitucionProfile).ciudad} onChange={(v: string) => handleChange("ciudad", v)} />
          </>
        );

      case "administrador":
        return (
          <>
            <Input label="Cargo" value={(formData as AdministradorProfile).cargo} onChange={(v: string) => handleChange("cargo", v)} />
            <Input label="Área" value={(formData as AdministradorProfile).area} onChange={(v: string) => handleChange("area", v)} />
          </>
        );

      default:
        return null;
    }
  };

  return <div className={styles.grid}>{renderFields()}</div>;
}