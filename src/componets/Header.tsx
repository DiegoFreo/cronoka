export function Header() {
  return (
    <header className="py-4 px-6 md:px-8 bg-card shadow-md flex items-center justify-between">
      <div className="flex items-center gap-3">
       <img
            alt="logo"
            src="./logoka.svg"
            className="mx-auto h-15 w-auto"
          />
        <h1 className="text-2xl md:text-3xl font-headline font-semibold text-primary-foreground">
          KA Informatica
        </h1>       
      </div>
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold text-primary-foreground">CATEGORIA - BATERIA</h1>
      </div>
      <div></div>
      {/* Placeholder for future controls like dark mode toggle or settings */}
    </header>
  );
}