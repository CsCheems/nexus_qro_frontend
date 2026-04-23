import styles from "./additionalInfo.module.css";
import { ServiceField } from "../serviceField/serviceField";
import { UserRole, FormDataType, EstudianteProfile, EmprendedorProfile, EmpresaProfile, ConsultorProfile, InstitucionProfile, AdministradorProfile } from "@/types/profiles";

interface Props {
  role: UserRole;
  data: FormDataType;
}

export function AdditionalInfo({ role, data }: Props) {
  
  const renderFields = () => {
    switch (role) {
      case "estudiante":
        return (
          <>
            <Field label="Universidad" value={(data as EstudianteProfile).universidad} />
            <Field label="División" value={(data as EstudianteProfile).division} />
            <Field label="Programa" value={(data as EstudianteProfile).programa} />
          </>
        );

      case "consultor":
        return (
          <>
            <Field label="Empresa" value={(data as ConsultorProfile).empresa} />
            <Field label="Puesto" value={(data as ConsultorProfile).puesto} />
            <Field label="Disponibilidad" value={(data as ConsultorProfile).disponibilidad} />
            <ServiceField services={(data as ConsultorProfile).servicios} />
          </>
        );

      case "emprendedor":
        return (
          <>
            <Field label="Sector" value={(data as EmprendedorProfile).sector} />
            <Field label="Descripción" value={(data as EmprendedorProfile).descripcion} />
          </>
        );

      case "empresa":
        return (
          <>
            <Field label="Empresa" value={(data as EmpresaProfile).nombre_empresa} />
            <Field label="País" value={(data as EmpresaProfile).pais} />
            <Field label="Ciudad" value={(data as EmpresaProfile).ciudad} />
            <Field label="Sector" value={(data as EmpresaProfile).sector} />
          </>
        );

      case "institucion":
        return (
          <>
            <Field label="Institución" value={(data as InstitucionProfile).nombre_institucion} />
            <Field label="País" value={(data as InstitucionProfile).pais} />
            <Field label="Ciudad" value={(data as InstitucionProfile).ciudad} />
          </>
        );

      case "administrador":
        return (
          <>
            <Field label="Cargo" value={(data as AdministradorProfile).cargo} />
            <Field label="Área" value={(data as AdministradorProfile).area} />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.grid}>{renderFields()}</div>
    </div>
  );
}

interface FieldProps {
  label: string;
  value?: string | number | null;
}

function Field({ label, value }: FieldProps) {
  return (
    <div className={styles.field}>
      <label>{label}</label>
      <div>{value || "No disponible"}</div>
    </div>
  );
}