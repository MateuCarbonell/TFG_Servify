export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-16 space-y-6">
      <h1 className="text-4xl font-bold">Bienvenido a ServiFácil</h1>
      <p className="text-muted-foreground max-w-xl">
        Plataforma para conectar clientes con proveedores de servicios profesionales.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <a href="/login" className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition">
          Iniciar sesión
        </a>
        <a href="/register" className="px-6 py-3 border border-primary text-primary rounded-xl hover:bg-primary/10 transition">
          Registrarse
        </a>
      </div>
    </div>
  );
}
