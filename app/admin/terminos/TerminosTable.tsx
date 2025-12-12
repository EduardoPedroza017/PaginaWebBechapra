import { Button } from "../components/shared/Button";
import { Table } from "../components/shared/Table";
import { TermSection } from "./types";

interface Props {
  sections: TermSection[];
  loading: boolean;
  onEdit: (section: TermSection) => void;
  onDelete: (id: string, title: string) => void;
}

export function TerminosTable({ sections, loading, onEdit, onDelete }: Props) {
  return (
    <div className="w-full text-slate-900 dark:text-slate-100">
      <h2 className="text-lg font-semibold mb-4 text-slate-700 dark:text-slate-200">Secciones actuales</h2>
      {loading ? (
        <div className="text-slate-600 dark:text-slate-300">Cargando...</div>
      ) : sections.length === 0 ? (
        <div className="text-slate-400 dark:text-slate-500">No hay secciones registradas.</div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow">
          <Table>
            <thead className="bg-slate-200 dark:bg-slate-800">
              <tr>
                <th className="text-left font-bold text-slate-800 dark:text-white">Título</th>
                <th className="text-left font-bold text-slate-800 dark:text-white">Contenido</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sections.map((s) => (
                <tr key={s.id} className="hover:bg-slate-100 dark:hover:bg-slate-800">
                  <td className="align-top font-semibold w-1/4 text-slate-900 dark:text-white bg-white dark:bg-slate-900">{s.title}</td>
                  <td className="align-top text-sm w-2/3 whitespace-pre-line text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-900">{s.content}</td>
                  <td className="align-top w-24 flex gap-2 bg-white dark:bg-slate-900">
                    <Button type="button" size="sm" onClick={() => onEdit(s)}>
                      Editar
                    </Button>
                    <Button type="button" size="sm" variant="danger" onClick={() => onDelete(s.id, s.title)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}
