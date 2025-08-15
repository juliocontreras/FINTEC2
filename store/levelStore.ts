import { create } from 'zustand';

interface EducationalContent {
  video?: string;
  text?: string;
  links?: string[];
}

interface Level {
  minWealth: number;
  strategies: string[];
  content: EducationalContent;
}

interface LevelState {
  wealth: number;
  currentLevel: number;
  levels: Level[];
  setWealth: (wealth: number) => void;
}

const levelDefinitions: Level[] = [
  {
    minWealth: 0,
    strategies: ['Crea un presupuesto básico', 'Construye un fondo de emergencia'],
    content: {
      video: 'https://example.com/intro',
      text: 'Conceptos básicos de educación financiera.',
      links: ['https://example.com/presupuesto']
    }
  },
  {
    minWealth: 10000,
    strategies: ['Comienza a invertir en instrumentos simples'],
    content: {
      video: 'https://example.com/inversiones',
      text: 'Introducción a la inversión.',
      links: ['https://example.com/inversiones']
    }
  },
  {
    minWealth: 50000,
    strategies: ['Diversifica tu portafolio', 'Optimiza tu carga fiscal'],
    content: {
      video: 'https://example.com/estrategias-avanzadas',
      text: 'Estrategias avanzadas para hacer crecer tu patrimonio.',
      links: ['https://example.com/portafolio']
    }
  }
];

export const useLevelStore = create<LevelState>((set) => ({
  wealth: 0,
  currentLevel: 0,
  levels: levelDefinitions,
  setWealth: (wealth) =>
    set((state) => {
      let level = state.currentLevel;
      for (let i = state.levels.length - 1; i >= 0; i--) {
        if (wealth >= state.levels[i].minWealth) {
          level = i;
          break;
        }
      }
      return { wealth, currentLevel: level };
    })
}));
