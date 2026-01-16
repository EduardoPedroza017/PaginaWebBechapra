import React from 'react';

interface EventosFormProps {
  onSubmit: (data: FormData) => void;
  initialData?: { titulo: string; fecha_hora: string; ubicacion: string; descripcion: string; categoria: string; estado: boolean };
}

const EventosForm: React.FC<EventosFormProps> = ({ onSubmit, initialData }) => {
  const [titulo, setTitulo] = React.useState(initialData?.titulo || '');
  const [fecha_hora, setFechaHora] = React.useState(initialData?.fecha_hora || '');
  const [ubicacion, setUbicacion] = React.useState(initialData?.ubicacion || '');
  const [descripcion, setDescripcion] = React.useState(initialData?.descripcion || '');
  const [categoria, setCategoria] = React.useState(initialData?.categoria || '');
  const [estado, setEstado] = React.useState(initialData?.estado || false);
  const [imagen, setImagen] = React.useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('fecha_hora', fecha_hora);
    formData.append('ubicacion', ubicacion);
    formData.append('descripcion', descripcion);
    formData.append('categoria', categoria);
    formData.append('estado', estado.toString());
    if (imagen) {
      formData.append('imagen', imagen);
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Título</label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Fecha y Hora</label>
        <input
          type="datetime-local"
          value={fecha_hora}
          onChange={(e) => setFechaHora(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Ubicación</label>
        <input
          type="text"
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Descripción</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Categoría</label>
        <input
          type="text"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Estado</label>
        <select
          value={estado ? 'true' : 'false'}
          onChange={(e) => setEstado(e.target.value === 'true')}
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
        >
          <option value="true">Publicado</option>
          <option value="false">No Publicado</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Imagen</label>
        <input
          type="file"
          accept="image/png,image/jpeg,image/gif"
          onChange={(e) => setImagen(e.target.files?.[0] || null)}
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        Guardar Evento
      </button>
    </form>
  );
};

export default EventosForm;