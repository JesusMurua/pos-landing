export interface CatalogOption {
  value: string;
  label: string;
}

export const REGIMEN_FISCAL: CatalogOption[] = [
  { value: "601", label: "601 - General de Ley Personas Morales" },
  { value: "603", label: "603 - Personas Morales con Fines no Lucrativos" },
  { value: "605", label: "605 - Sueldos y Salarios" },
  { value: "606", label: "606 - Arrendamiento" },
  { value: "608", label: "608 - Demás ingresos" },
  { value: "610", label: "610 - Residentes en el Extranjero" },
  { value: "612", label: "612 - Personas Físicas con Actividades Empresariales y Profesionales" },
  { value: "614", label: "614 - Ingresos por Intereses" },
  { value: "616", label: "616 - Sin obligaciones fiscales" },
  { value: "620", label: "620 - Sociedades Cooperativas de Producción" },
  { value: "621", label: "621 - Incorporación Fiscal" },
  { value: "622", label: "622 - Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras" },
  { value: "625", label: "625 - Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas" },
  { value: "626", label: "626 - Régimen Simplificado de Confianza" },
];

export const USO_CFDI: CatalogOption[] = [
  { value: "G01", label: "G01 - Adquisición de mercancías" },
  { value: "G02", label: "G02 - Devoluciones, descuentos o bonificaciones" },
  { value: "G03", label: "G03 - Gastos en general" },
  { value: "I01", label: "I01 - Construcciones" },
  { value: "I02", label: "I02 - Mobiliario y equipo de oficina" },
  { value: "I08", label: "I08 - Otra maquinaria y equipo" },
  { value: "D01", label: "D01 - Honorarios médicos, dentales y gastos hospitalarios" },
  { value: "D02", label: "D02 - Gastos médicos por incapacidad o discapacidad" },
  { value: "D03", label: "D03 - Gastos funerales" },
  { value: "D04", label: "D04 - Donativos" },
  { value: "D10", label: "D10 - Pagos por servicios educativos" },
  { value: "P01", label: "P01 - Por definir" },
  { value: "S01", label: "S01 - Sin efectos fiscales" },
  { value: "CP01", label: "CP01 - Pagos" },
];
