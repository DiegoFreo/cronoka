import React, { useState, useMemo } from "react";
// Assumindo que você tem seu componente SelectItem definido,
// mas para o SelectSearchable, não usaremos o elemento <select>
// Usaremos divs e lista <ul> para criar a interface da pesquisa.

// --- Componente de Pesquisa (SelectSearchable) ---
const SelectSearchable = ({ options, placeholder, onSelect, value }) => {
  // Estado para o termo de pesquisa digitado pelo usuário
  const [searchTerm, setSearchTerm] = useState("");
  
  // Estado para controlar se a lista de opções está visível
  const [isOpen, setIsOpen] = useState(false);
  
  // Exibição do valor selecionado
  const selectedLabel = options.find(option => option.value === value)?.label || placeholder;

  // Filtragem eficiente: só recalcula quando searchTerm ou options mudam
  const filteredOptions = useMemo(() => {
    if (!searchTerm) {
      return options; // Se não há pesquisa, mostra todos
    }
    const searchLower = searchTerm.toLowerCase();
    
    return options.filter(option => 
      option.value.toLowerCase().includes(searchLower)
    );
  }, [searchTerm, options]);

  // Função para lidar com a seleção de uma opção
  const handleSelect = (optionValue) => {
    onSelect(optionValue);
    setSearchTerm(""); // Limpa o termo de pesquisa após a seleção
    setIsOpen(false); // Fecha a lista
  };

  // Função para lidar com a mudança no campo de input
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setIsOpen(true); // Abre a lista ao digitar
  };

  return (
    <div className="relative w-100">
      {/* 1. Input/Botão que exibe o valor atual e permite a pesquisa */}
      <input
        type="text"
        placeholder={selectedLabel}
        value={searchTerm }
        onChange={handleChange}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)} // Pequeno atraso para permitir o click
        className=" ka-seclect block me-10 w-50 rounded-md border border-gray-300 bg-white px-5 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      
      {/* 2. Lista suspensa de resultados (Renderização Condicional) */}
      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 max-h-60 py-10 overflow-y-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`cursor-pointer colorfont-black px-3 pd-10 pe-10 text-sm hover:bg-gray-100 ${option.value === value ? 'bg-blue-50' : ''}`}
              >
                {option.label}
              </li>
            ))
          ) : (
            <li className="px-3 py-2 text-sm text-gray-500">Nenhum resultado encontrado.</li>
          )}
        </ul>
      )}
    </div>
  );
};
export default SelectSearchable;