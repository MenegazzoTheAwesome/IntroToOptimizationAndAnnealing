"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button";

export default function Component() {
  const [steps, setSteps] = useState(0);
  const [found, setFound] = useState(false);

  const simulateOptimization = () => {
    if (steps < 5) {
      setSteps(steps + 1);
    } else {
      setFound(true);
    }
  };

  const reset = () => {
    setSteps(0);
    setFound(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 to-pink-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-6" style={{ color: '#1E88E5' }}>
          Algoritmos de Otimização: A Busca pela Melhor Solução!
        </h1>
        
        <p className="mb-4 text-lg">
          Imagine que você está procurando o melhor sorvete da cidade. Devido a não poder testar todos os sorvetes, você invés faz um robô analisar todos os sorvetes.
        </p>

        <h2 className="text-2xl font-semibold mb-2" style={{ color: '#64B5F6' }}>O que são Algoritmos de Otimização?</h2>
        <p className="mb-4">
          São como super-calculadoras que nos ajudam a calcular a melhor solução para um problema, 
          da forma mais rápida possível, muitas vezes entrando em diversos conceitos matemáticos e lógica de programção.
        </p>

        <h2 className="text-2xl font-semibold mb-2" style={{ color: '#64B5F6' }}>Como eles funcionam?</h2>
        <ol className="list-decimal list-inside mb-4 space-y-2">
          <li>Definem o problema (Qual é o melhor sorvete?)</li>
          <li>Criam uma lista de opções (Todos os sorvetes da cidade)</li>
          <li>Estabelecem critérios (Sabor, preço, textura)</li>
          <li>Testam algumas opções</li>
          <li>Comparam os resultados</li>
          <li>Escolhem a melhor opção!</li>
        </ol>

        <div className="custom-bg p-4 rounded-lg mb-4">
          <h3 className="text-xl font-semibold mb-2">Vamos simular!</h3>
          <p className="mb-2">Clique no botão para procurar o melhor sorvete:</p>
          <div className="flex items-center space-x-4">
            <Button 
              onClick={simulateOptimization}
              disabled={found}
              className="bg-[#1E88E5] hover:bg-[#64B5F6] text-white font-bold py-2 px-4 rounded"
            >
              Procurar Melhor Sorvete
            </Button>
            <span className="text-lg font-semibold">
              {found ? "Encontramos o melhor sorvete!" : `Passos: ${steps}/5`}
            </span>
          </div>
          {found && (
            <Button 
              onClick={reset}
              className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Recomeçar
            </Button>
          )}
        </div>

        <p className="text-lg font-semibold text-center" style={{ color: '#1E88E5' }}>
          Com algoritmos de otimização, podemos resolver problemas complexos de forma mais rápida e eficiente!
        </p>
      </div>
    </div>
  );
}
