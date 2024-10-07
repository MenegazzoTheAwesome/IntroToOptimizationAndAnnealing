"use client"

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, ArrowLeft } from 'lucide-react'

type City = {
  x: number
  y: number
}

type Tour = number[]

const cities: City[] = [
  { x: 60, y: 200 },
  { x: 180, y: 200 },
  { x: 80, y: 180 },
  { x: 140, y: 180 },
  { x: 20, y: 160 },
  { x: 100, y: 160 },
  { x: 200, y: 160 },
  { x: 140, y: 140 },
  { x: 40, y: 120 },
  { x: 100, y: 120 },
]

function AnnealingVisualization() {
  const [currentTour, setCurrentTour] = useState<Tour>([])
  const [temperature, setTemperature] = useState(100)
  const [iteration, setIteration] = useState(0)

  useEffect(() => {
    const initialTour = Array.from({ length: cities.length }, (_, i) => i)
    setCurrentTour(initialTour)
  }, [])

  const drawTour = (ctx: CanvasRenderingContext2D, tour: Tour) => {
    ctx.clearRect(0, 0, 250, 250)

    // Draw cities
    cities.forEach((city, index) => {
      ctx.beginPath()
      ctx.arc(city.x, city.y, 5, 0, 2 * Math.PI)
      ctx.fillStyle = '#64B5F6'  // Changed to secondary color
      ctx.fill()
      ctx.fillStyle = '#333'  // Changed to text color
      ctx.fillText(`${index}`, city.x + 10, city.y + 10)
    })

    // Draw tour only if it's not empty
    if (tour.length > 0) {
      ctx.beginPath()
      ctx.moveTo(cities[tour[0]].x, cities[tour[0]].y)
      for (let i = 1; i < tour.length; i++) {
        ctx.lineTo(cities[tour[i]].x, cities[tour[i]].y)
      }
      ctx.lineTo(cities[tour[0]].x, cities[tour[0]].y)
      ctx.strokeStyle = '#1E88E5'  // Changed to primary color
      ctx.stroke()
    }
  }

  useEffect(() => {
    const canvas = document.getElementById('annealingCanvas') as HTMLCanvasElement | null
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        drawTour(ctx, currentTour)
      }
    }
  }, [currentTour])

  const simulateAnnealing = () => {
    if (temperature > 0.1 && iteration < 1000) {
      const newTour = [...currentTour];
      const i = Math.floor(Math.random() * cities.length);
      let j = Math.floor(Math.random() * cities.length);
      while (i === j) {
        j = Math.floor(Math.random() * cities.length);
      }
      [newTour[i], newTour[j]] = [newTour[j], newTour[i]];
  
      const currentEnergy = calculateTourLength(currentTour);
      const newEnergy = calculateTourLength(newTour);
      const energyDiff = newEnergy - currentEnergy;
  
      if (energyDiff < 0 || Math.random() < Math.exp(-energyDiff / temperature)) {
        setCurrentTour(newTour);
      }
  
      setTemperature((prevTemperature) => prevTemperature * 0.99);
      setIteration((prevIteration) => prevIteration + 1);
    }
  };

  const calculateTourLength = (tour: Tour): number => {
    if (tour.length === 0) return 0
    let length = 0
    for (let i = 0; i < tour.length; i++) {
      const from = cities[tour[i]]
      const to = cities[tour[(i + 1) % tour.length]]
      length += Math.sqrt((from.x - to.x) ** 2 + (from.y - to.y) ** 2)
    }
    return length
  }

  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseDown = () => {
    if (temperature > 0.1 && iteration < 1000) {
      setIsRunning(true);
      simulateAnnealing();
      intervalRef.current = setInterval(simulateAnnealing, 200);
    }
  };

  const handleMouseUp = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    handleMouseUp();
  };

  return (
    <div className="flex flex-col items-center">
      <canvas id="annealingCanvas" width="250" height="250" className="mb-4" style={{backgroundColor: '#BBDEFB'}}></canvas>
      <div className="flex justify-between w-full">
        <Button
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onClick={simulateAnnealing}
          disabled={temperature <= 0.1 || iteration >= 1000}
          className="bg-primary text-white hover:bg-secondary"
        >
          Próxima Iteração
        </Button>
      </div>
      <div className="mt-4 text-center text-text">
        <p>Temperatura: {temperature.toFixed(2)}</p>
        <p>Iteração: {iteration}</p>
        <p>Comprimento do Tour: {calculateTourLength(currentTour).toFixed(2)}</p>
      </div>
    </div>
  )
}

type Step = {
  title: string
  description: string
  example: string
}

export default function OptimizationDetails() {
  const [step, setStep] = useState(0)

  const steps: Step[] = [
    {
      title: "Definição do Problema",
      description: "Identificamos claramente o que queremos otimizar.",
      example: "Queremos encontrar o caminho mais curto que visita todas as cidades uma vez (Problema do Caixeiro Viajante).  Ele consiste em encontrar o caminho mais curto que um vendedor (ou caixeiro viajante) deve percorrer para visitar um conjunto de cidades e retornar à cidade de origem, visitando cada cidade exatamente uma vez.",
    },
    {
      title: "Modelagem do Sistema",
      description: "Definimos como representar uma solução e como calcular sua qualidade.",
      example: "Representamos uma solução como uma permutação das cidades e calculamos o comprimento total do percurso.",
    },
    {
      title: "Escolha do Algoritmo",
      description: "Selecionamos o método mais adequado para resolver o problema.",
      example: "Para este problema, usaremos o algoritmo de Simulated Annealing.",
    },
    {
      title: "Implementação",
      description: "Escrevemos o código do algoritmo escolhido.",
      example: "Criamos uma função em TypeScript para aplicar o algoritmo de Simulated Annealing.",
    },
    {
      title: "Teste e Validação",
      description: "Verificamos se a solução funciona corretamente.",
      example: "Testamos com um conjunto de cidades para confirmar que um bom caminho é encontrado.",
    },
    {
      title: "Refinamento",
      description: "Ajustamos os parâmetros do algoritmo para melhorar o desempenho.",
      example: "Otimizamos a taxa de resfriamento e o número de iterações para encontrar melhores soluções.",
    },
  ]

  return (
    <Card className="w-full max-w-4xl bg-white">
      <CardHeader>
        <CardTitle className="text-primary">Entendendo o Simulated Annealing</CardTitle>
        <CardDescription className="text-text">
          Vamos explorar cada etapa do processo de otimização usando o exemplo do Problema do Caixeiro Viajante.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="step" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4 bg-background">
            <TabsTrigger value="step" className="data-[state=active]:bg-primary data-[state=active]:text-white">Passo a Passo</TabsTrigger>
            <TabsTrigger value="visual" className="data-[state=active]:bg-primary data-[state=active]:text-white">Visualização</TabsTrigger>
            <TabsTrigger value="code" className="data-[state=active]:bg-primary data-[state=active]:text-white">Código Exemplo</TabsTrigger>
          </TabsList>
          <TabsContent value="step">
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">{steps[step].title}</CardTitle>
                <CardDescription className="text-text">{steps[step].description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-text"><strong>Exemplo:</strong> {steps[step].example}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  onClick={() => setStep(Math.max(0, step - 1))}
                  disabled={step === 0}
                  className="bg-primary text-white hover:bg-secondary"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
                </Button>
                <Button 
                  onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
                  disabled={step === steps.length - 1}
                  className="bg-primary text-white hover:bg-secondary"
                >
                  Próximo <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="visual">
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Visualização do Simulated Annealing</CardTitle>
              </CardHeader>
              <CardContent>
                <AnnealingVisualization />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="code">
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Exemplo de Código Simplificado</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-background p-4 rounded-lg overflow-x-auto text-text">
                  <code>{`
// Definição dos tipos
type City = { x: number; y: number }
type Tour = number[]

// Função para calcular a distância entre duas cidades
function distance(cityA: City, cityB: City): number {
  const dx = cityA.x - cityB.x
  const dy = cityA.y - cityB.y
  return Math.sqrt(dx * dx + dy * dy)
}

// Função para calcular o comprimento total de um tour
function tourLength(tour: Tour, cities: City[]): number {
  return tour.reduce((length, cityIndex, i) => {
    const nextIndex = (i + 1) % tour.length
    return length + distance(cities[cityIndex], cities[tour[nextIndex]])
  }, 0)
}

// Implementação do Simulated Annealing
function simulatedAnnealing(cities: City[], initialTemperature: number, coolingRate: number, iterations: number): Tour {
  let currentTour: Tour = cities.map((_, i) => i)
  let bestTour: Tour = [...currentTour]
  let temperature = initialTemperature

  for (let i = 0; i < iterations; i++) {
    // Gera uma nova solução trocando duas cidades aleatórias
    const newTour = [...currentTour]
    const [a, b] = [Math.floor(Math.random() * cities.length), Math.floor(Math.random() * cities.length)]
    [newTour[a], newTour[b]] = [newTour[b], newTour[a]]

    const currentEnergy = tourLength(currentTour, cities)
    const newEnergy = tourLength(newTour, cities)
    const energyDiff = newEnergy - currentEnergy

    // Aceita a nova solução se for melhor ou com uma probabilidade baseada na temperatura
    if (energyDiff < 0 || Math.random() < Math.exp(-energyDiff / temperature)) {
      currentTour = newTour
      if (newEnergy < tourLength(bestTour, cities)) {
        bestTour = newTour
      }
    }

    // Reduz a temperatura
    temperature *= coolingRate
  }

  return bestTour
}

// Exemplo de uso
const cities: City[] = [
  { x: 60, y: 200 },
  { x: 180, y: 200 },
  { x: 80, y: 180 },
  { x: 140, y: 180 },
  { x: 20, y: 160 },
  { x: 100, y: 160 },
  { x: 200, y: 160 },
  { x: 140, y: 140 },
  { x: 40, y: 120 },
  { x: 100, y: 120 },
]

const bestTour = simulatedAnnealing(cities, 100, 0.995, 10000)
console.log('Melhor tour encontrado:', bestTour)
console.log('Comprimento do tour:', tourLength(bestTour, cities))
                  `}</code>
                </pre>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}