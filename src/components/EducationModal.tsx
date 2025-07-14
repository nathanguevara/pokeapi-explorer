import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Globe, Database, Code, Zap, BookOpen, ExternalLink } from 'lucide-react';

interface EducationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LessonPage {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

const EducationModal: React.FC<EducationModalProps> = ({ isOpen, onClose }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const lessons: LessonPage[] = [
    {
      id: 'what-is-api',
      title: 'What is an API?',
      icon: <Globe className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">API = Application Programming Interface</h3>
            <p className="text-blue-700 mb-4">
              Think of an API like a waiter in a restaurant. You (the client) tell the waiter (API) what you want from the menu, 
              and the waiter goes to the kitchen (server) to get your order and brings it back to you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">🍽️ Restaurant Analogy</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• <strong>You:</strong> The app/website</li>
                <li>• <strong>Waiter:</strong> The API</li>
                <li>• <strong>Kitchen:</strong> The server/database</li>
                <li>• <strong>Menu:</strong> API documentation</li>
                <li>• <strong>Order:</strong> API request</li>
                <li>• <strong>Food:</strong> API response (data)</li>
              </ul>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold text-purple-800 mb-2">🔗 PokéAPI Example</h4>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• <strong>You:</strong> This Pokédex app</li>
                <li>• <strong>API:</strong> PokéAPI service</li>
                <li>• <strong>Server:</strong> PokéAPI's database</li>
                <li>• <strong>Request:</strong> "Get Pikachu's data"</li>
                <li>• <strong>Response:</strong> JSON with Pikachu info</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-2">Why Use APIs?</h4>
            <div className="grid md:grid-cols-3 gap-3 text-sm">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <Database className="w-6 h-6 text-blue-600" />
                </div>
                <p className="font-medium">Data Sharing</p>
                <p className="text-gray-600">Access data from other services</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <p className="font-medium">Real-time Updates</p>
                <p className="text-gray-600">Get fresh data instantly</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <Code className="w-6 h-6 text-purple-600" />
                </div>
                <p className="font-medium">Modularity</p>
                <p className="text-gray-600">Build on existing services</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'http-requests',
      title: 'HTTP Requests',
      icon: <Zap className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-orange-800 mb-3">HTTP = HyperText Transfer Protocol</h3>
            <p className="text-orange-700 mb-4">
              HTTP is the language that web browsers and servers use to communicate. When you click on a Pokémon card, 
              your browser sends an HTTP request to get that Pokémon's data.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-3">Common HTTP Methods</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <span className="bg-green-500 text-white px-2 py-1 rounded text-sm font-mono">GET</span>
                <div>
                  <p className="font-medium text-green-800">Retrieve Data</p>
                  <p className="text-sm text-green-700">Used to fetch Pokémon information</p>
                  <code className="text-xs bg-green-100 px-2 py-1 rounded mt-1 block">GET /pokemon/pikachu</code>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-mono">POST</span>
                <div>
                  <p className="font-medium text-blue-800">Create Data</p>
                  <p className="text-sm text-blue-700">Send new data to the server</p>
                  <code className="text-xs bg-blue-100 px-2 py-1 rounded mt-1 block">POST /pokemon (create new)</code>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                <span className="bg-yellow-500 text-white px-2 py-1 rounded text-sm font-mono">PUT</span>
                <div>
                  <p className="font-medium text-yellow-800">Update Data</p>
                  <p className="text-sm text-yellow-700">Modify existing information</p>
                  <code className="text-xs bg-yellow-100 px-2 py-1 rounded mt-1 block">PUT /pokemon/1 (update)</code>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-mono">DELETE</span>
                <div>
                  <p className="font-medium text-red-800">Remove Data</p>
                  <p className="text-sm text-red-700">Delete information from server</p>
                  <code className="text-xs bg-red-100 px-2 py-1 rounded mt-1 block">DELETE /pokemon/1</code>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-3">What Happens When You Click a Pokémon?</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">1</span>
                <span>Browser sends: <code className="bg-gray-100 px-2 py-1 rounded">GET https://pokeapi.co/api/v2/pokemon/25</code></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">2</span>
                <span>PokéAPI server processes the request</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">3</span>
                <span>Server queries database for Pokémon #25 (Pikachu)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">4</span>
                <span>Server sends back JSON response with Pikachu's data</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">5</span>
                <span>Your app displays the data in a beautiful card!</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'json-format',
      title: 'Understanding JSON',
      icon: <Code className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-green-800 mb-3">JSON = JavaScript Object Notation</h3>
            <p className="text-green-700 mb-4">
              JSON is a lightweight format for storing and transporting data. It's easy for humans to read and write, 
              and easy for machines to parse and generate.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3">JSON Data Types</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded font-mono text-xs">String</span>
                  <code>"Pikachu"</code>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded font-mono text-xs">Number</span>
                  <code>25</code>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded font-mono text-xs">Boolean</span>
                  <code>true</code>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded font-mono text-xs">Null</span>
                  <code>null</code>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded font-mono text-xs">Array</span>
                  <code>[1, 2, 3]</code>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded font-mono text-xs">Object</span>
                  <code>{"{"}"key": "value"{"}"}</code>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3">Simple Pokémon JSON</h4>
              <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">
{`{
  "id": 25,
  "name": "pikachu",
  "height": 4,
  "weight": 60,
  "types": [
    {
      "type": {
        "name": "electric"
      }
    }
  ],
  "abilities": [
    {
      "ability": {
        "name": "static"
      }
    }
  ]
}`}
              </pre>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-3">🔍 Reading JSON Like a Pro</h4>
            <div className="space-y-2 text-sm text-yellow-700">
              <p><strong>Objects:</strong> Wrapped in curly braces <code className="bg-yellow-100 px-1 rounded">{"{ }"}</code> - contain key-value pairs</p>
              <p><strong>Arrays:</strong> Wrapped in square brackets <code className="bg-yellow-100 px-1 rounded">[ ]</code> - contain lists of items</p>
              <p><strong>Strings:</strong> Always in quotes <code className="bg-yellow-100 px-1 rounded">"like this"</code></p>
              <p><strong>Numbers:</strong> No quotes needed <code className="bg-yellow-100 px-1 rounded">42</code></p>
              <p><strong>Nested Data:</strong> Objects can contain other objects and arrays</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">💡 Try This!</h4>
            <p className="text-sm text-blue-700">
              Click on any Pokémon card, then click on different elements in the interactive card. 
              Watch how each piece of the visual display corresponds to specific parts of the JSON data!
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'backend-concepts',
      title: 'Backend & Databases',
      icon: <Database className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-purple-800 mb-3">What Happens Behind the Scenes?</h3>
            <p className="text-purple-700 mb-4">
              When you request Pokémon data, there's a whole system working behind the scenes to get you that information. 
              Let's explore what happens on the backend!
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-4">The Journey of a Request</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-3 bg-blue-50 rounded-lg">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <h5 className="font-semibold text-blue-800">Your Browser</h5>
                  <p className="text-sm text-blue-700">Sends HTTP request to PokéAPI</p>
                  <code className="text-xs bg-blue-100 px-2 py-1 rounded mt-1 block">GET /pokemon/pikachu</code>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3 bg-green-50 rounded-lg">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <h5 className="font-semibold text-green-800">Web Server</h5>
                  <p className="text-sm text-green-700">Receives request and routes it to the right handler</p>
                  <p className="text-xs text-green-600 mt-1">Like a receptionist directing you to the right department</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3 bg-yellow-50 rounded-lg">
                <div className="bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <h5 className="font-semibold text-yellow-800">Application Logic</h5>
                  <p className="text-sm text-yellow-700">Processes the request and determines what data to fetch</p>
                  <p className="text-xs text-yellow-600 mt-1">Validates the request and prepares database query</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3 bg-purple-50 rounded-lg">
                <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</div>
                <div>
                  <h5 className="font-semibold text-purple-800">Database Query</h5>
                  <p className="text-sm text-purple-700">Searches for Pikachu's data in the database</p>
                  <code className="text-xs bg-purple-100 px-2 py-1 rounded mt-1 block">SELECT * FROM pokemon WHERE name = 'pikachu'</code>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3 bg-red-50 rounded-lg">
                <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">5</div>
                <div>
                  <h5 className="font-semibold text-red-800">Response Formation</h5>
                  <p className="text-sm text-red-700">Formats data into JSON and sends it back</p>
                  <p className="text-xs text-red-600 mt-1">Includes HTTP status code (200 = success)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3">Database Concepts</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-blue-600">Tables:</span>
                  <span className="text-gray-700"> Like spreadsheets storing data</span>
                </div>
                <div>
                  <span className="font-medium text-green-600">Rows:</span>
                  <span className="text-gray-700"> Individual records (each Pokémon)</span>
                </div>
                <div>
                  <span className="font-medium text-purple-600">Columns:</span>
                  <span className="text-gray-700"> Data fields (name, type, stats)</span>
                </div>
                <div>
                  <span className="font-medium text-orange-600">Relationships:</span>
                  <span className="text-gray-700"> How tables connect to each other</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3">Server Technologies</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-blue-600">Languages:</span>
                  <span className="text-gray-700"> Python, Node.js, Java, etc.</span>
                </div>
                <div>
                  <span className="font-medium text-green-600">Frameworks:</span>
                  <span className="text-gray-700"> Express, Django, Spring Boot</span>
                </div>
                <div>
                  <span className="font-medium text-purple-600">Databases:</span>
                  <span className="text-gray-700"> PostgreSQL, MongoDB, MySQL</span>
                </div>
                <div>
                  <span className="font-medium text-orange-600">Hosting:</span>
                  <span className="text-gray-700"> AWS, Google Cloud, Heroku</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <h4 className="font-semibold text-indigo-800 mb-2">🚀 Fun Fact</h4>
            <p className="text-sm text-indigo-700">
              The PokéAPI serves millions of requests per day! It uses caching, load balancing, and other techniques 
              to handle all those trainers looking up their favorite Pokémon data.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'practice-tips',
      title: 'Practice & Next Steps',
      icon: <BookOpen className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">Ready to Build Your Own?</h3>
            <p className="text-blue-700 mb-4">
              Now that you understand APIs, HTTP, and JSON, here are some ways to practice and learn more!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3">🛠️ Hands-On Practice</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span>Try different API endpoints in your browser</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span>Use browser dev tools to inspect network requests</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span>Build a simple app with a different API</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span>Practice reading JSON responses</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3">📚 Learning Resources</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  <span>MDN Web Docs for HTTP basics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  <span>JSON.org for JSON specification</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  <span>Postman for API testing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  <span>FreeCodeCamp API courses</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-3">🎯 Try These APIs Next</h4>
            <div className="grid md:grid-cols-3 gap-3">
              <div className="text-center p-3 bg-white rounded-lg">
                <h5 className="font-medium text-gray-800">Weather API</h5>
                <p className="text-xs text-gray-600 mt-1">OpenWeatherMap</p>
                <p className="text-xs text-gray-500">Get weather data</p>
              </div>
              <div className="text-center p-3 bg-white rounded-lg">
                <h5 className="font-medium text-gray-800">News API</h5>
                <p className="text-xs text-gray-600 mt-1">NewsAPI.org</p>
                <p className="text-xs text-gray-500">Fetch news articles</p>
              </div>
              <div className="text-center p-3 bg-white rounded-lg">
                <h5 className="font-medium text-gray-800">Cat Facts API</h5>
                <p className="text-xs text-gray-600 mt-1">catfact.ninja</p>
                <p className="text-xs text-gray-500">Random cat facts</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-3">🏗️ Build Your Own API</h4>
            <p className="text-sm text-green-700 mb-3">
              Ready for the next level? Try building your own API!
            </p>
            <div className="space-y-2 text-sm text-green-700">
              <div className="flex items-center gap-2">
                <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">1</span>
                <span>Choose a programming language (Python, Node.js, etc.)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">2</span>
                <span>Pick a web framework (Express, Flask, etc.)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">3</span>
                <span>Set up a database to store your data</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">4</span>
                <span>Create endpoints that return JSON data</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">5</span>
                <span>Test your API and deploy it!</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <h4 className="font-semibold text-blue-800 mb-2">🎉 Congratulations!</h4>
            <p className="text-sm text-blue-700">
              You now understand the fundamentals of how web APIs work. Keep exploring, building, and learning!
            </p>
            <div className="mt-3">
              <a 
                href="https://pokeapi.co/docs/v2" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Explore PokéAPI Documentation <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )
    }
  ];

  const currentLesson = lessons[currentPageIndex];

  const nextPage = () => {
    if (currentPageIndex < lessons.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const prevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-green-500 to-blue-600 text-white">
          <div className="flex items-center gap-3">
            {currentLesson.icon}
            <div>
              <h2 className="text-2xl font-bold">{currentLesson.title}</h2>
              <p className="text-green-100">
                Lesson {currentPageIndex + 1} of {lessons.length}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-200 h-1">
          <div 
            className="bg-gradient-to-r from-green-500 to-blue-600 h-1 transition-all duration-300"
            style={{ width: `${((currentPageIndex + 1) / lessons.length) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {currentLesson.content}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={prevPage}
            disabled={currentPageIndex === 0}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="flex gap-2">
            {lessons.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPageIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentPageIndex
                    ? 'bg-blue-500'
                    : index < currentPageIndex
                    ? 'bg-green-500'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextPage}
            disabled={currentPageIndex === lessons.length - 1}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EducationModal;