export const typeColors: Record<string, string> = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-blue-300',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-600',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-500',
  bug: 'bg-green-400',
  rock: 'bg-yellow-800',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-700',
  dark: 'bg-gray-800',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-300',
};

export const typeGradients: Record<string, string> = {
  normal: 'from-gray-400 to-gray-600',
  fire: 'from-red-400 to-red-600',
  water: 'from-blue-400 to-blue-600',
  electric: 'from-yellow-300 to-yellow-500',
  grass: 'from-green-400 to-green-600',
  ice: 'from-blue-200 to-blue-400',
  fighting: 'from-red-600 to-red-800',
  poison: 'from-purple-400 to-purple-600',
  ground: 'from-yellow-500 to-yellow-700',
  flying: 'from-indigo-300 to-indigo-500',
  psychic: 'from-pink-400 to-pink-600',
  bug: 'from-green-300 to-green-500',
  rock: 'from-yellow-700 to-yellow-900',
  ghost: 'from-purple-600 to-purple-800',
  dragon: 'from-indigo-600 to-indigo-800',
  dark: 'from-gray-700 to-gray-900',
  steel: 'from-gray-400 to-gray-600',
  fairy: 'from-pink-200 to-pink-400',
};

export const typeIcons: Record<string, string> = {
  normal: '⚪',
  fire: '🔥',
  water: '💧',
  electric: '⚡',
  grass: '🌿',
  ice: '❄️',
  fighting: '👊',
  poison: '☠️',
  ground: '🌍',
  flying: '🦅',
  psychic: '🔮',
  bug: '🐛',
  rock: '🗿',
  ghost: '👻',
  dragon: '🐉',
  dark: '🌙',
  steel: '⚙️',
  fairy: '🧚',
};

export const getTypeColor = (type: string): string => {
  return typeColors[type] || 'bg-gray-400';
};

export const getTypeGradient = (type: string): string => {
  return typeGradients[type] || 'from-gray-400 to-gray-600';
};

export const getTypeIcon = (type: string): string => {
  return typeIcons[type] || '⚪';
};