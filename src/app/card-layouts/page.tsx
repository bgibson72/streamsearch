'use client';

import { Show } from '../../types';

// Sample show data for testing
const sampleShow: Show = {
  id: 1,
  title: "Karate Kid: Legends",
  description: "After a family tragedy, kung fu prodigy Li Fong is uprooted from his home in Beijing and forced to move to New York City with his mother. When a new friend needs his help, Li enters a karate competition – but his skills alone aren't enough. Li's kung fu teacher Mr. Han enlists original Karate Kid Daniel LaRusso for help, and Li learns the lessons of perseverance, honor, and friendship through the Way of the Dragon and the Way of the Fist.",
  genre: ["Action", "Adventure", "Drama"],
  year: 2025,
  rating: 7.3,
  providers: ["tubi", "pluto-tv", "netflix", "hulu"],
  streamingServices: ["tubi", "pluto-tv", "netflix", "hulu"],
  imageUrl: "https://image.tmdb.org/t/p/w500/placeholder.jpg",
  type: 'movie' as const,
  popularity: 85
};

// Provider color mapping
const getProviderColor = (provider: string) => {
  const providerColors: { [key: string]: string } = {
    'netflix': 'bg-red-600',
    'hulu': 'bg-green-600',
    'tubi': 'bg-purple-600',
    'pluto-tv': 'bg-yellow-500',
  };
  return providerColors[provider] || 'bg-gray-600';
};

// Layout Option 1: Current Layout
const Layout1 = ({ show }: { show: Show }) => (
  <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden border border-slate-700 max-w-2xl">
    <div className="flex p-4">
      <div className="w-24 h-36 flex-shrink-0 mr-4">
        <div className="w-full h-full bg-gray-600 rounded border border-slate-600 flex items-center justify-center text-white text-xs">
          POSTER
        </div>
      </div>
      <div className="flex-1 text-white min-w-0 flex flex-col">
        <div className="flex items-start justify-between mb-0">
          <h3 className="text-lg font-bold flex-1 pr-4">{show.title}</h3>
          <button className="w-10 h-8 rounded flex items-center justify-center bg-blue-600 text-white">
            🛒
          </button>
        </div>
        <div className="flex items-center gap-4 mb-1">
          <span className="text-gray-300">{show.year}</span>
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            <span className="text-yellow-400">{show.rating}</span>
          </div>
          <span className="px-2 py-1 text-xs font-medium rounded flex items-center gap-1 bg-blue-600 text-white">
            🎬 Movie
          </span>
        </div>
        <div className="flex items-center gap-2 mb-3">
          {show.genre.slice(0, 3).map((genre, index) => (
            <span key={index} className="px-2 py-1 text-xs bg-gray-600 text-white rounded">
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
    <div className="border-t border-slate-700 p-4">
      <div className="text-sm font-medium text-gray-300 mb-2">Synopsis:</div>
      <p className="text-sm text-gray-300 leading-relaxed">{show.description.substring(0, 200)}...</p>
    </div>
    <div className="px-4 pb-4">
      <div className="flex justify-end">
        <div className="flex flex-wrap gap-1 justify-end max-w-xs">
          {show.providers?.slice(0, 6).map((provider, index) => (
            <span key={index} className={`px-2 py-1 text-xs text-white rounded ${getProviderColor(provider)}`}>
              {provider}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Layout Option 2: Horizontal badges after title
const Layout2 = ({ show }: { show: Show }) => (
  <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden border border-slate-700 max-w-2xl">
    <div className="flex p-4">
      <div className="w-24 h-36 flex-shrink-0 mr-4">
        <div className="w-full h-full bg-gray-600 rounded border border-slate-600 flex items-center justify-center text-white text-xs">
          POSTER
        </div>
      </div>
      <div className="flex-1 text-white min-w-0">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold">{show.title}</h3>
          <button className="w-10 h-8 rounded flex items-center justify-center bg-blue-600 text-white">
            🛒
          </button>
        </div>
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="text-gray-300">{show.year}</span>
          <span className="text-yellow-400">★ {show.rating}</span>
          <span className="px-2 py-1 text-xs font-medium rounded bg-blue-600 text-white">🎬 Movie</span>
          {show.genre.slice(0, 2).map((genre, index) => (
            <span key={index} className="px-2 py-1 text-xs bg-gray-600 text-white rounded">
              {genre}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {show.providers?.map((provider, index) => (
            <span key={index} className={`px-2 py-1 text-xs text-white rounded ${getProviderColor(provider)}`}>
              {provider}
            </span>
          ))}
        </div>
        <p className="text-sm text-gray-300 leading-relaxed">{show.description.substring(0, 150)}...</p>
      </div>
    </div>
  </div>
);

// Layout Option 3: Vertical stacked layout
const Layout3 = ({ show }: { show: Show }) => (
  <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden border border-slate-700 max-w-2xl">
    <div className="flex p-4">
      <div className="w-24 h-36 flex-shrink-0 mr-4">
        <div className="w-full h-full bg-gray-600 rounded border border-slate-600 flex items-center justify-center text-white text-xs">
          POSTER
        </div>
      </div>
      <div className="flex-1 text-white min-w-0">
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-lg font-bold">{show.title}</h3>
          <button className="w-10 h-8 rounded flex items-center justify-center bg-blue-600 text-white">
            🛒
          </button>
        </div>
        <div className="mb-1 text-gray-300">
          {show.year} • ★ {show.rating} • 🎬 Movie
        </div>
        <div className="mb-2">
          <span className="text-sm text-gray-400">Genres: </span>
          <span className="text-sm">{show.genre.join(', ')}</span>
        </div>
        <div className="mb-3">
          <span className="text-sm text-gray-400">Available on: </span>
          <div className="flex flex-wrap gap-1 mt-1">
            {show.providers?.map((provider, index) => (
              <span key={index} className={`px-2 py-1 text-xs text-white rounded ${getProviderColor(provider)}`}>
                {provider}
              </span>
            ))}
          </div>
        </div>
        <p className="text-sm text-gray-300 leading-relaxed">{show.description.substring(0, 150)}...</p>
      </div>
    </div>
  </div>
);

// Layout Option 4: Grid-style with organized sections
const Layout4 = ({ show }: { show: Show }) => (
  <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden border border-slate-700 max-w-2xl">
    <div className="flex p-4">
      <div className="w-32 h-48 flex-shrink-0 mr-4">
        <div className="w-full h-full bg-gray-600 rounded border border-slate-600 flex items-center justify-center text-white text-xs">
          POSTER
        </div>
      </div>
      <div className="flex-1 text-white min-w-0">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-bold">{show.title}</h3>
          <button className="w-10 h-8 rounded flex items-center justify-center bg-blue-600 text-white">
            🛒
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <div className="text-xs text-gray-400 uppercase">Year</div>
            <div className="text-sm">{show.year}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400 uppercase">Rating</div>
            <div className="text-sm text-yellow-400">★ {show.rating}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400 uppercase">Type</div>
            <div className="text-sm">🎬 Movie</div>
          </div>
          <div>
            <div className="text-xs text-gray-400 uppercase">Genre</div>
            <div className="text-sm">{show.genre.slice(0, 2).join(', ')}</div>
          </div>
        </div>
        
        <div className="mb-3">
          <div className="text-xs text-gray-400 uppercase mb-1">Streaming</div>
          <div className="flex flex-wrap gap-1">
            {show.providers?.map((provider, index) => (
              <span key={index} className={`px-2 py-1 text-xs text-white rounded ${getProviderColor(provider)}`}>
                {provider}
              </span>
            ))}
          </div>
        </div>
        
        <p className="text-sm text-gray-300 leading-relaxed">{show.description.substring(0, 120)}...</p>
      </div>
    </div>
  </div>
);

// Layout Option 5: Compact horizontal
const Layout5 = ({ show }: { show: Show }) => (
  <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden border border-slate-700 max-w-2xl">
    <div className="p-4">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-bold text-white">{show.title}</h3>
        <button className="w-10 h-8 rounded flex items-center justify-center bg-blue-600 text-white">
          🛒
        </button>
      </div>
      
      <div className="flex gap-4">
        <div className="w-20 h-28 flex-shrink-0">
          <div className="w-full h-full bg-gray-600 rounded border border-slate-600 flex items-center justify-center text-white text-xs">
            POSTER
          </div>
        </div>
        
        <div className="flex-1 text-white space-y-2">
          <div className="flex items-center gap-3 text-sm">
            <span>{show.year}</span>
            <span className="text-yellow-400">★ {show.rating}</span>
            <span className="px-2 py-1 text-xs bg-blue-600 rounded">🎬 Movie</span>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {show.genre.map((genre, index) => (
              <span key={index} className="px-2 py-1 text-xs bg-gray-600 text-white rounded">
                {genre}
              </span>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-1">
            {show.providers?.map((provider, index) => (
              <span key={index} className={`px-2 py-1 text-xs text-white rounded ${getProviderColor(provider)}`}>
                {provider}
              </span>
            ))}
          </div>
          
          <p className="text-sm text-gray-300 leading-relaxed">{show.description.substring(0, 100)}...</p>
        </div>
      </div>
    </div>
  </div>
);

// Layout Option 6: Card with header bar
const Layout6 = ({ show }: { show: Show }) => (
  <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden border border-slate-700 max-w-2xl">
    <div className="bg-slate-700 px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-3 text-sm text-white">
        <span>{show.year}</span>
        <span className="text-yellow-400">★ {show.rating}</span>
        <span className="px-2 py-1 text-xs bg-blue-600 rounded">🎬 Movie</span>
      </div>
      <button className="w-8 h-8 rounded flex items-center justify-center bg-blue-600 text-white">
        🛒
      </button>
    </div>
    
    <div className="flex p-4">
      <div className="w-24 h-36 flex-shrink-0 mr-4">
        <div className="w-full h-full bg-gray-600 rounded border border-slate-600 flex items-center justify-center text-white text-xs">
          POSTER
        </div>
      </div>
      
      <div className="flex-1 text-white space-y-3">
        <h3 className="text-lg font-bold">{show.title}</h3>
        
        <div className="flex flex-wrap gap-1">
          {show.genre.map((genre, index) => (
            <span key={index} className="px-2 py-1 text-xs bg-gray-600 text-white rounded">
              {genre}
            </span>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-1">
          {show.providers?.map((provider, index) => (
            <span key={index} className={`px-2 py-1 text-xs text-white rounded ${getProviderColor(provider)}`}>
              {provider}
            </span>
          ))}
        </div>
        
        <p className="text-sm text-gray-300 leading-relaxed">{show.description.substring(0, 150)}...</p>
      </div>
    </div>
  </div>
);

// Layout Option 7: Modified Option 6 - Providers in top bar, metadata below title
const Layout7 = ({ show }: { show: Show }) => (
  <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden border border-slate-700 max-w-2xl">
    <div className="bg-slate-700 px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-1 flex-wrap">
        {show.providers?.map((provider, index) => (
          <span key={index} className={`px-2 py-1 text-xs text-white rounded ${getProviderColor(provider)}`}>
            {provider}
          </span>
        ))}
      </div>
      <button className="w-8 h-8 rounded flex items-center justify-center bg-blue-600 text-white ml-3">
        🛒
      </button>
    </div>
    
    <div className="flex p-4">
      <div className="w-24 h-36 flex-shrink-0 mr-4">
        <div className="w-full h-full bg-gray-600 rounded border border-slate-600 flex items-center justify-center text-white text-xs">
          POSTER
        </div>
      </div>
      
      <div className="flex-1 text-white space-y-3">
        <h3 className="text-lg font-bold">{show.title}</h3>
        
        <div className="flex items-center gap-3 text-sm">
          <span>{show.year}</span>
          <span className="text-yellow-400">★ {show.rating}</span>
          <span className="px-2 py-1 text-xs bg-blue-600 rounded">🎬 Movie</span>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {show.genre.map((genre, index) => (
            <span key={index} className="px-2 py-1 text-xs bg-gray-600 text-white rounded">
              {genre}
            </span>
          ))}
        </div>
        
        <p className="text-sm text-gray-300 leading-relaxed">{show.description.substring(0, 150)}...</p>
      </div>
    </div>
  </div>
);

export default function CardLayoutsPage() {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">ShowCard Layout Options</h1>
        
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Option 1: Current Layout (Synopsis Section + Bottom Right Providers)</h2>
            <Layout1 show={sampleShow} />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Option 2: Horizontal Badges After Title</h2>
            <Layout2 show={sampleShow} />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Option 3: Vertical Stacked with Labels</h2>
            <Layout3 show={sampleShow} />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Option 4: Grid-Style Information Layout</h2>
            <Layout4 show={sampleShow} />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Option 5: Compact Horizontal Layout</h2>
            <Layout5 show={sampleShow} />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Option 6: Card with Top Info Bar</h2>
            <Layout6 show={sampleShow} />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Option 7: Modified Option 6 - Providers in Top Bar</h2>
            <Layout7 show={sampleShow} />
          </div>
        </div>
        
        <div className="mt-12 p-6 bg-slate-800 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Layout Comparison Summary:</h3>
          <ul className="text-gray-300 space-y-2 text-sm">
            <li><strong>Option 1:</strong> Current layout with separate synopsis section and bottom-right providers</li>
            <li><strong>Option 2:</strong> All badges inline horizontally after title for compact view</li>
            <li><strong>Option 3:</strong> Vertical stacking with clear text labels for each section</li>
            <li><strong>Option 4:</strong> Grid-based information with larger poster and organized data fields</li>
            <li><strong>Option 5:</strong> Most compact horizontal layout with smaller poster</li>
            <li><strong>Option 6:</strong> Card-style with dedicated top info bar and clean content area</li>
            <li><strong>Option 7:</strong> Modified card-style with providers in the top bar and metadata below the title</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
