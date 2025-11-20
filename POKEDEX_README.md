# Pokédex Explorer

A fully-featured Pokédex application built with React, showcasing all Pokémon with detailed information, stats, and evolution chains.

## Features

### Core Functionality
- ✅ **Search Pokémon** - Search by name or Pokédex number
- ✅ **Filter by Type** - Filter Pokémon by any of the 18 types
- ✅ **Pagination** - Load more Pokémon with smooth "Load More" functionality
- ✅ **Detailed View** - Click any Pokémon to see comprehensive details including:
  - Base stats with animated progress bars
  - Abilities (including hidden abilities)
  - Physical attributes (height, weight, base experience)
  - Complete evolution chain with images
- ✅ **Dark Mode** - Toggle between light and dark themes
- ✅ **Offline Support** - Service Worker caches API responses for offline browsing

### Technical Stack
- **React 19** - Core framework
- **TanStack Query (React Query)** - Efficient data fetching and caching
- **Framer Motion** - Smooth animations and transitions
- **PokeAPI** - Official Pokémon API for all data
- **Service Worker** - Offline caching and PWA capabilities

### Animations
- Card entrance animations with stagger effect
- Hover effects on Pokémon cards
- Modal animations with spring physics
- Stat bar filling animations
- Smooth theme transitions

### Design
- **Color Theme**: Red-based design inspired by the original Pokédex
- **Responsive**: Works on mobile, tablet, and desktop
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Dark Mode**: Beautiful dark theme with adjusted colors

## API Integration

### Endpoints Used
1. `https://pokeapi.co/api/v2/pokemon?limit={limit}` - Pokemon list
2. `https://pokeapi.co/api/v2/pokemon/{id}` - Individual Pokemon details
3. `https://pokeapi.co/api/v2/pokemon-species/{id}` - Species data for evolution
4. Evolution chain endpoint - Complete evolution chains

### Caching Strategy
- React Query caches all API responses with 5-minute stale time
- Service Worker caches API responses for offline access
- Images are lazy-loaded for optimal performance

## Usage

Navigate to the Pokédex by clicking the "Pokédex" demo card on the Projects page, or visit directly at `#/pokedex`.

### Navigation
- **Home**: Returns to main portfolio
- **Projects**: View all projects including Pokédex link
- **Pokédex**: Direct access to the Pokédex application

### Controls
- **Search Bar**: Type Pokémon name or number
- **Type Filters**: Click any type to filter (click again to remove)
- **Theme Toggle**: Fixed button in top-right corner
- **Load More**: Button at bottom to load additional Pokémon
- **Pokémon Card**: Click to open detailed modal view

## Performance Optimizations

1. **Lazy Loading**: Images load only when needed
2. **React Query**: Prevents duplicate API calls
3. **Memoization**: Filtered results are memoized
4. **Service Worker**: Caches API responses
5. **Staggered Animations**: Cards animate in batches for smooth rendering

## Future Enhancements

Potential features for future versions:
- Infinite scroll as alternative to "Load More"
- Compare multiple Pokémon side-by-side
- Save favorite Pokémon to localStorage
- Advanced filtering (height, weight, stats)
- Move details and type effectiveness
- Shiny sprite toggle
- Generation filters
- Sound effects
