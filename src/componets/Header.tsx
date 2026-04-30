
interface TipeHeader{
  bateria: string,
  categoria: string,
}
export function Header({bateria, categoria}:TipeHeader) {

  return (
    <header className="py-4 px-6 md:px-8 bg-card shadow-md flex items-center justify-between">
      <div className="flex items-center gap-3">
       <img
            alt="logo"
            src="../FPMX-logo.png"
            className="mx-auto h-15 w-40"
          />       
      </div>
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold text-primary-foreground">{categoria} - {bateria}</h1>
      </div>
      <div></div>
      {/* Placeholder for future controls like dark mode toggle or settings */}
    </header>
  );
}