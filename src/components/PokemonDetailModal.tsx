import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronDown, ChevronRight, Copy, Check } from 'lucide-react';
import { Pokemon, PokemonSpecies, EvolutionChain } from '../types/pokemon';
import { pokemonApi } from '../services/pokemonApi';
import InteractivePokemonCard from './InteractivePokemonCard';

interface PokemonDetailModalProps {
  pokemon: Pokemon;
  isOpen: boolean;
  onClose: () => void;
}

interface JsonViewerProps {
  data: any;
  title: string;
  isExpanded?: boolean;
  highlightPath?: string;
}

const JsonViewer: React.FC<JsonViewerProps> = ({ data, title, isExpanded = false, highlightPath }) => {
  const [expanded, setExpanded] = useState(isExpanded);
  const [copied, setCopied] = useState(false);
  const [searchPath, setSearchPath] = useState<string | null>(null);
  const jsonContainerRef = useRef<HTMLDivElement>(null);
  const highlightedElementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (highlightPath) {
      setExpanded(true);
      setSearchPath(highlightPath);
      
      // Scroll to highlighted element after a short delay to ensure DOM is updated
      setTimeout(() => {
        if (highlightedElementRef.current && jsonContainerRef.current) {
          const container = jsonContainerRef.current;
          const element = highlightedElementRef.current;
          
          // Calculate the position to scroll to (center the element in view)
          const containerRect = container.getBoundingClientRect();
          const elementRect = element.getBoundingClientRect();
          const scrollTop = container.scrollTop;
          
          const elementTop = elementRect.top - containerRect.top + scrollTop;
          const containerHeight = containerRect.height;
          const elementHeight = elementRect.height;
          
          // Center the element in the container
          const targetScrollTop = elementTop - (containerHeight / 2) + (elementHeight / 2);
          
          container.scrollTo({
            top: Math.max(0, targetScrollTop),
            behavior: 'smooth'
          });
        }
      }, 100);
      
      // Clear highlight after 3 seconds
      const timer = setTimeout(() => setSearchPath(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [highlightPath]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const formatJson = (obj: any, indent = 0, currentPath = ''): JSX.Element[] => {
    const elements: JSX.Element[] = [];
    const indentStr = '  '.repeat(indent);
    const isHighlighted = searchPath && currentPath === searchPath;

    // Helper function to create highlighted span with ref
    const createHighlightedSpan = (content: React.ReactNode, className: string) => {
      if (isHighlighted) {
        return (
          <span 
            ref={highlightedElementRef}
            className={`${className} bg-yellow-200 animate-pulse font-bold ring-2 ring-yellow-400 rounded px-1`}
          >
            {content}
          </span>
        );
      }
      return <span className={className}>{content}</span>;
    };
    if (Array.isArray(obj)) {
      elements.push(
        createHighlightedSpan('[', 'text-gray-600')
      );
      obj.forEach((item, index) => {
        const itemPath = currentPath ? `${currentPath}[${index}]` : `[${index}]`;
        elements.push(
          <div key={`array-${index}`} className="ml-4">
            {formatJson(item, indent + 1, itemPath)}
            {index < obj.length - 1 && <span className="text-gray-600">,</span>}
          </div>
        );
      });
      elements.push(
        createHighlightedSpan(']', 'text-gray-600')
      );
    } else if (obj !== null && typeof obj === 'object') {
      elements.push(
        createHighlightedSpan('{', 'text-gray-600')
      );
      const entries = Object.entries(obj);
      entries.forEach(([key, value], index) => {
        const keyPath = currentPath ? `${currentPath}.${key}` : key;
        const isKeyHighlighted = searchPath && keyPath === searchPath;
        elements.push(
          <div key={`object-${key}`} className="ml-4">
            {isKeyHighlighted ? (
              <span 
                ref={highlightedElementRef}
                className="text-blue-600 font-bold bg-yellow-200 animate-pulse ring-2 ring-yellow-400 rounded px-1"
              >
                "{key}"
              </span>
            ) : (
              <span className="text-blue-600">"{key}"</span>
            )}
            <span className="text-gray-600">: </span>
            {typeof value === 'string' ? (
              isKeyHighlighted ? (
                <span className="text-green-600 font-bold bg-yellow-200 animate-pulse ring-2 ring-yellow-400 rounded px-1">"{value}"</span>
              ) : (
                <span className="text-green-600">"{value}"</span>
              )
            ) : typeof value === 'number' ? (
              isKeyHighlighted ? (
                <span className="text-orange-600 font-bold bg-yellow-200 animate-pulse ring-2 ring-yellow-400 rounded px-1">{value}</span>
              ) : (
                <span className="text-orange-600">{value}</span>
              )
            ) : typeof value === 'boolean' ? (
              isKeyHighlighted ? (
                <span className="text-purple-600 font-bold bg-yellow-200 animate-pulse ring-2 ring-yellow-400 rounded px-1">{value.toString()}</span>
              ) : (
                <span className="text-purple-600">{value.toString()}</span>
              )
            ) : value === null ? (
              isKeyHighlighted ? (
                <span className="text-gray-500 font-bold bg-yellow-200 animate-pulse ring-2 ring-yellow-400 rounded px-1">null</span>
              ) : (
                <span className="text-gray-500">null</span>
              )
            ) : (
              formatJson(value, indent + 1, keyPath)
            )}
            {index < entries.length - 1 && <span className="text-gray-600">,</span>}
          </div>
        );
      });
      elements.push(
        createHighlightedSpan('}', 'text-gray-600')
      );
    } else if (typeof obj === 'string') {
      elements.push(
        createHighlightedSpan(`"${obj}"`, 'text-green-600')
      );
    } else if (typeof obj === 'number') {
      elements.push(
        createHighlightedSpan(obj, 'text-orange-600')
      );
    } else if (typeof obj === 'boolean') {
      elements.push(
        createHighlightedSpan(obj.toString(), 'text-purple-600')
      );
    } else if (obj === null) {
      elements.push(
        createHighlightedSpan('null', 'text-gray-500')
      );
    }

    return elements;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 mb-4">
      <div 
        className="flex items-center justify-between p-4 bg-gray-50 rounded-t-lg cursor-pointer hover:bg-gray-100 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-2">
          {expanded ? (
            <ChevronDown className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-600" />
          )}
          <h3 className="font-semibold text-gray-800">{title}</h3>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleCopy();
          }}
          className="flex items-center gap-1 px-2 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              Copy
            </>
          )}
        </button>
      </div>
      {expanded && (
        <div 
          ref={jsonContainerRef}
          className="p-4 bg-gray-900 text-sm font-mono overflow-auto max-h-96 rounded-b-lg scroll-smooth"
        >
          {searchPath && (
            <div className="mb-2 p-2 bg-yellow-900/50 border border-yellow-600 rounded text-yellow-200 text-xs sticky top-0 z-10">
              🎯 Highlighting: <code className="bg-yellow-800 px-1 rounded">{searchPath}</code>
            </div>
          )}
          <pre className="text-gray-100 whitespace-pre-wrap">
            {formatJson(data)}
          </pre>
        </div>
      )}
    </div>
  );
};

const PokemonDetailModal: React.FC<PokemonDetailModalProps> = ({ pokemon, isOpen, onClose }) => {
  const [species, setSpecies] = useState<PokemonSpecies | null>(null);
  const [evolutionChain, setEvolutionChain] = useState<EvolutionChain | null>(null);
  const [isLoadingSpecies, setIsLoadingSpecies] = useState(false);
  const [isLoadingEvolution, setIsLoadingEvolution] = useState(false);
  const [highlightedPath, setHighlightedPath] = useState<{ section: string; path: string } | null>(null);

  useEffect(() => {
    if (isOpen && pokemon) {
      loadAdditionalData();
    }
  }, [isOpen, pokemon]);

  const loadAdditionalData = async () => {
    try {
      setIsLoadingSpecies(true);
      const speciesData = await pokemonApi.getPokemonSpecies(pokemon.id);
      setSpecies(speciesData);

      setIsLoadingEvolution(true);
      const evolutionData = await pokemonApi.getEvolutionChain(speciesData.evolution_chain.url);
      setEvolutionChain(evolutionData);
    } catch (error) {
      console.error('Failed to load additional data:', error);
    } finally {
      setIsLoadingSpecies(false);
      setIsLoadingEvolution(false);
    }
  };

  const handleDataClick = (path: string, description: string) => {
    // Determine which section contains this path
    let section = 'pokemon';
    if (path.includes('evolution_chain')) {
      section = 'evolution';
    } else if (path.includes('species') || path.includes('evolution_chain.url')) {
      section = 'species';
    }

    // Clean up the path for JSON navigation
    const cleanPath = path.replace('evolution_chain.chain.evolves_to', 'chain.evolves_to');
    
    setHighlightedPath({ section, path: cleanPath });
    
    // Show a toast or notification
    console.log(`Navigating to ${section} data:`, cleanPath, description);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <div>
            <h2 className="text-2xl font-bold capitalize">
              {pokemon.name} - API Data Explorer
            </h2>
            <p className="text-blue-100 mt-1">
              Learn how the PokéAPI works by exploring the raw JSON data
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Left side - Pokemon Card */}
          <div className="w-1/3 p-6 bg-gradient-to-br from-blue-50 to-purple-50 overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Visual Display</h3>
            <div className="mb-4 p-3 bg-blue-100 border border-blue-300 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Interactive Mode:</strong> Click on any element in the card below to see its corresponding JSON data highlighted on the right.
              </p>
            </div>
            <div className="sticky top-0">
              <InteractivePokemonCard pokemon={pokemon} onDataClick={handleDataClick} />
            </div>
          </div>

          {/* Right side - JSON Data */}
          <div className="w-2/3 p-6 overflow-y-auto bg-gray-50">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">API Response Data</h3>
              <p className="text-gray-600 text-sm mb-4">
                This is the actual JSON data returned from the PokéAPI. Each section corresponds to different API endpoints.
              </p>
            </div>

            <JsonViewer 
              data={pokemon} 
              title={`Pokemon Data (GET /pokemon/${pokemon.id})`}
              isExpanded={true}
              highlightPath={highlightedPath?.section === 'pokemon' ? highlightedPath.path : undefined}
            />

            {species && (
              <JsonViewer 
                data={species} 
                title={`Species Data (GET /pokemon-species/${pokemon.id})`}
                highlightPath={highlightedPath?.section === 'species' ? highlightedPath.path : undefined}
              />
            )}

            {evolutionChain && (
              <JsonViewer 
                data={evolutionChain} 
                title={`Evolution Chain (GET ${species?.evolution_chain.url})`}
                highlightPath={highlightedPath?.section === 'evolution' ? highlightedPath.path : undefined}
              />
            )}

            {isLoadingSpecies && (
              <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
                  <span className="text-gray-600">Loading species data...</span>
                </div>
              </div>
            )}

            {isLoadingEvolution && (
              <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
                  <span className="text-gray-600">Loading evolution data...</span>
                </div>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <h4 className="font-semibold text-blue-800 mb-2">🎓 Teaching Notes</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• The main Pokemon data comes from <code className="bg-blue-100 px-1 rounded">GET /pokemon/{'{id}'}</code></li>
                <li>• Species data provides evolution chain links from <code className="bg-blue-100 px-1 rounded">GET /pokemon-species/{'{id}'}</code></li>
                <li>• Evolution chains are separate API calls to <code className="bg-blue-100 px-1 rounded">GET /evolution-chain/{'{id}'}</code></li>
                <li>• Notice how nested objects contain URLs to related resources</li>
                <li>• Arrays contain multiple items (types, abilities, stats, etc.)</li>
                <li>• <strong>Click elements in the card to see their JSON data highlighted!</strong></li>
                <li>• Each API call returns different but related information</li>
                <li>• URLs in responses link to other API endpoints (like evolution_chain.url)</li>
              </ul>
              <div className="mt-3 pt-3 border-t border-blue-200">
                <p className="text-xs text-blue-600">
                  💡 <strong>Pro Tip:</strong> Open your browser's Developer Tools (F12) and check the Network tab 
                  to see these HTTP requests happening in real-time!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailModal;