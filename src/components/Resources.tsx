import React, { useState, useRef } from 'react';
import { Leaf, Droplet, ChefHat, Sparkles, Droplets, Apple, ChevronLeft, ChevronRight, Search, Filter, Star, Clock, Tag, Heart, X, ChevronDown, ChevronUp } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  tips: string[];
  icon: React.ReactNode;
  instructions?: string[];
  ingredients?: string[];
  prepTime?: string;
  cookTime?: string;
}

const categories: { [key: string]: Resource[] } = {
  'Herbal Remedies': [
    {
      id: '1',
      title: 'Chamomile Tea',
      description: 'Calming and sleep-promoting',
      tips: [
        'Drink before bedtime',
        'Safe during pregnancy',
        'Helps with anxiety'
      ],
      icon: <Leaf className="w-6 h-6" />
    },
    {
      id: '2',
      title: 'Peppermint Leaf',
      description: 'Natural digestive support',
      tips: [
        'Aids digestion',
        'Relieves nausea',
        'Refreshing taste'
      ],
      icon: <Leaf className="w-6 h-6" />
    },
    {
      id: '3',
      title: 'Red Raspberry Leaf',
      description: 'Uterine support',
      tips: [
        'Start in second trimester',
        'Drink as tea',
        'Strengthens uterus'
      ],
      icon: <Leaf className="w-6 h-6" />
    },
    {
      id: '4',
      title: 'Nettle Leaf',
      description: 'Nutrient-rich support',
      tips: [
        'High in iron',
        'Supports kidney function',
        'Blend with other teas'
      ],
      icon: <Leaf className="w-6 h-6" />
    }
  ],

  'Essential Oils': [
    {
      id: '1',
      title: 'Lavender',
      description: 'Relaxation and sleep',
      tips: [
        'Use in diffuser',
        'Add to bath',
        'Safe during pregnancy'
      ],
      icon: <Droplet className="w-6 h-6" />
    },
    {
      id: '2',
      title: 'Peppermint',
      description: 'Nausea and headache relief',
      tips: [
        'Inhale for nausea',
        'Dilute properly',
        'Avoid in late pregnancy'
      ],
      icon: <Droplet className="w-6 h-6" />
    },
    {
      id: '3',
      title: 'Sweet Orange',
      description: 'Mood lifting',
      tips: [
        'Safe throughout pregnancy',
        'Use in massage oil',
        'Energizing aroma'
      ],
      icon: <Droplet className="w-6 h-6" />
    },
    {
      id: '4',
      title: 'Ylang Ylang',
      description: 'Stress relief',
      tips: [
        'Calming properties',
        'Use in massage blend',
        'Promotes relaxation'
      ],
      icon: <Droplet className="w-6 h-6" />
    }
  ],

  'Nutritious Recipes': [
    {
      id: '1',
      title: 'Lactation Cookies',
      description: 'Milk supply support',
      tips: [
        'Contains oats and flax',
        'Make in bulk',
        'Freeze extras'
      ],
      icon: <ChefHat className="w-6 h-6" />,
      ingredients: [
        '3 cups old-fashioned oats',
        '1½ cups whole wheat flour',
        '5 tablespoons brewers yeast',
        '3 tablespoons ground flaxseed',
        '½ teaspoon baking powder',
        '½ teaspoon baking soda',
        '½ teaspoon ground cinnamon',
        '¼ teaspoon salt',
        '12 tablespoons butter',
        '4 tablespoons coconut oil',
        '1½ cups sugar',
        '1 large egg + 1 egg yolk',
        '2 teaspoons vanilla extract',
        '1½ cups dark chocolate chips'
      ],
      instructions: [
        'Preheat oven to 350°F (175°C)',
        'In a large bowl, whisk together oats, flour, yeast, flaxseed, baking powder, baking soda, cinnamon and salt',
        'Beat butter, coconut oil, and sugar until creamy',
        'Add eggs and vanilla, beat until combined',
        'Gradually mix in dry ingredients',
        'Stir in chocolate chips',
        'Drop rounded tablespoons onto baking sheets',
        'Bake for 12-14 minutes until edges are lightly browned',
        'Cool on baking sheet for 5 minutes before transferring'
      ],
      prepTime: '15 minutes',
      cookTime: '12-14 minutes'
    },
    {
      id: '2',
      title: 'Iron-Rich Smoothie',
      description: 'Energy boosting',
      tips: [
        'Use spinach base',
        'Add vitamin C',
        'Best in morning'
      ],
      icon: <ChefHat className="w-6 h-6" />
    },
    {
      id: '3',
      title: 'Healing Bone Broth',
      description: 'Postpartum recovery',
      tips: [
        'Rich in minerals',
        'Make ahead',
        'Freeze portions'
      ],
      icon: <ChefHat className="w-6 h-6" />
    },
    {
      id: '4',
      title: 'Golden Milk',
      description: 'Anti-inflammatory drink',
      tips: [
        'Use turmeric and ginger',
        'Add black pepper',
        'Drink before bed'
      ],
      icon: <ChefHat className="w-6 h-6" />
    }
  ],

  'Spiritual Practices': [
    {
      id: '1',
      title: 'Meditation',
      description: 'Mind-body connection',
      tips: [
        'Start with 5 minutes',
        'Focus on breath',
        'Morning practice'
      ],
      icon: <Sparkles className="w-6 h-6" />
    },
    {
      id: '2',
      title: 'Birth Affirmations',
      description: 'Mental preparation',
      tips: [
        'Write your own',
        'Practice daily',
        'Visualize success'
      ],
      icon: <Sparkles className="w-6 h-6" />
    },
    {
      id: '3',
      title: 'Gratitude Journal',
      description: 'Emotional wellbeing',
      tips: [
        'Daily entries',
        'Include small wins',
        'Express feelings'
      ],
      icon: <Sparkles className="w-6 h-6" />
    },
    {
      id: '4',
      title: 'Sacred Space Creation',
      description: 'Personal sanctuary',
      tips: [
        'Choose calming items',
        'Include nature elements',
        'Regular cleansing'
      ],
      icon: <Sparkles className="w-6 h-6" />
    }
  ],

  'Hygiene & Self-Care': [
    {
      id: '1',
      title: 'Peri Bottle Care',
      description: 'Essential postpartum care',
      tips: [
        'Use after every bathroom visit',
        'Fill with warm water',
        'Add witch hazel for healing'
      ],
      icon: <Droplets className="w-6 h-6" />
    },
    {
      id: '2',
      title: 'Sitz Bath',
      description: 'Promotes healing',
      tips: [
        'Use 2-3 times daily',
        'Add epsom salts',
        'Keep water warm, not hot'
      ],
      icon: <Droplets className="w-6 h-6" />
    },
    {
      id: '3',
      title: 'Breast Care',
      description: 'Comfort and prevention',
      tips: [
        'Air dry after feeding',
        'Use nipple cream',
        'Change pads frequently'
      ],
      icon: <Droplets className="w-6 h-6" />
    },
    {
      id: '4',
      title: 'Perineal Healing',
      description: 'Recovery support',
      tips: [
        'Ice pack rotation',
        'Gentle cleaning',
        'Air exposure'
      ],
      icon: <Droplets className="w-6 h-6" />
    }
  ],

  'Food Recommendations': [
    {
      id: '1',
      title: 'Iron-Rich Foods',
      description: 'Energy support',
      tips: [
        'Dark leafy greens',
        'Lean red meat',
        'Pair with vitamin C'
      ],
      icon: <Apple className="w-6 h-6" />
    },
    {
      id: '2',
      title: 'Protein Sources',
      description: 'Recovery support',
      tips: [
        'Eggs and fish',
        'Legumes',
        'Greek yogurt'
      ],
      icon: <Apple className="w-6 h-6" />
    },
    {
      id: '3',
      title: 'Hydration Guide',
      description: 'Essential fluid intake',
      tips: [
        'Water with meals',
        'Herbal teas',
        'Coconut water'
      ],
      icon: <Apple className="w-6 h-6" />
    },
    {
      id: '4',
      title: 'Lactation Foods',
      description: 'Milk supply support',
      tips: [
        'Oatmeal and quinoa',
        'Fennel and fenugreek',
        'Dark leafy greens'
      ],
      icon: <Apple className="w-6 h-6" />
    }
  ]
};

export const Resources = () => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>(Object.keys(categories)[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedBenefit, setSelectedBenefit] = useState<string>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const resourceTypes = {
    'Herbal Remedies': ['Tea', 'Tincture', 'Capsule', 'Fresh Herb'],
    'Essential Oils': ['Diffuser', 'Topical', 'Bath', 'Massage'],
    'Nutritious Recipes': ['Breakfast', 'Snack', 'Drink', 'Main Course'],
    'Spiritual Practices': ['Meditation', 'Ritual', 'Prayer', 'Journaling'],
    'Hygiene & Self-Care': ['Daily Care', 'Treatment', 'Prevention', 'Recovery'],
    'Food Recommendations': ['Meal', 'Supplement', 'Beverage', 'Snack']
  };

  const benefitCategories = {
    'Herbal Remedies': ['Sleep Support', 'Digestive Health', 'Immune Support', 'Stress Relief'],
    'Essential Oils': ['Relaxation', 'Energy', 'Mood Support', 'Physical Comfort'],
    'Nutritious Recipes': ['Energy Boost', 'Milk Supply', 'Recovery', 'Nutrient Rich'],
    'Spiritual Practices': ['Mental Clarity', 'Emotional Balance', 'Inner Peace', 'Connection'],
    'Hygiene & Self-Care': ['Healing', 'Comfort', 'Prevention', 'Maintenance'],
    'Food Recommendations': ['Nutrition', 'Energy', 'Recovery', 'Hydration']
  };

  const tags = {
    'Herbal Remedies': ['Sleep', 'Nausea', 'Energy', 'Digestion', 'Immunity'],
    'Essential Oils': ['Relaxation', 'Pain Relief', 'Mood', 'Sleep', 'Nausea'],
    'Nutritious Recipes': ['Breakfast', 'Snacks', 'Drinks', 'Postpartum', 'Energy'],
    'Spiritual Practices': ['Meditation', 'Mindfulness', 'Ritual', 'Journaling', 'Prayer'],
    'Hygiene & Self-Care': ['Postpartum', 'Recovery', 'Daily Care', 'Prevention', 'Comfort'],
    'Food Recommendations': ['Protein', 'Iron', 'Calcium', 'Vitamins', 'Hydration']
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + 
        (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const filteredResources = categories[activeCategory].filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tips.some(tip => tip.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesSearch;
  });

  const FiltersPanel = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-purple-900">Filters</h2>
        <Filter className="w-5 h-5 text-purple-600" />
      </div>

      {/* Favorites Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-purple-900 mb-3 flex items-center gap-2">
          <Heart className="w-4 h-4" />
          Favorites
        </h3>
        <button
          onClick={() => setSearchQuery(favorites.length > 0 ? 'favorite' : '')}
          className={`w-full text-left px-4 py-2 rounded-xl transition-colors ${
            searchQuery === 'favorite'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
              : 'hover:bg-white/30 text-purple-900'
          }`}
        >
          Show Favorites ({favorites.length})
        </button>
      </div>

      {/* Resource Type Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-purple-900 mb-3 flex items-center gap-2">
          <Tag className="w-4 h-4" />
          Resource Type
        </h3>
        <div className="space-y-2">
          <button
            onClick={() => setSelectedType('all')}
            className={`w-full text-left px-4 py-2 rounded-xl transition-colors ${
              selectedType === 'all'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'hover:bg-white/30 text-purple-900'
            }`}
          >
            All Types
          </button>
          {resourceTypes[activeCategory as keyof typeof resourceTypes]?.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`w-full text-left px-4 py-2 rounded-xl transition-colors ${
                selectedType === type
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'hover:bg-white/30 text-purple-900'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Benefits Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-purple-900 mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          Benefits
        </h3>
        <div className="space-y-2">
          <button
            onClick={() => setSelectedBenefit('all')}
            className={`w-full text-left px-4 py-2 rounded-xl transition-colors ${
              selectedBenefit === 'all'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'hover:bg-white/30 text-purple-900'
            }`}
          >
            All Benefits
          </button>
          {benefitCategories[activeCategory as keyof typeof benefitCategories]?.map((benefit) => (
            <button
              key={benefit}
              onClick={() => setSelectedBenefit(benefit)}
              className={`w-full text-left px-4 py-2 rounded-xl transition-colors ${
                selectedBenefit === benefit
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'hover:bg-white/30 text-purple-900'
              }`}
            >
              {benefit}
            </button>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div>
        <h3 className="text-sm font-medium text-purple-900 mb-3 flex items-center gap-2">
          <Tag className="w-4 h-4" />
          Popular Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags[activeCategory as keyof typeof tags].map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setSelectedTags(prev => 
                  prev.includes(tag)
                    ? prev.filter(t => t !== tag)
                    : [...prev, tag]
                );
              }}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedTags.includes(tag)
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Panel */}
          <div className="lg:w-80">
            {/* Search Bar */}
            <div className="glass-card p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-purple-900">Search</h2>
                <Search className="w-5 h-5 text-purple-600" />
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  className="w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Mobile Filters Toggle */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="w-full lg:hidden glass-card p-4 mb-6 flex items-center justify-between"
            >
              <span className="text-lg font-semibold text-purple-900">Filters</span>
              {showMobileFilters ? (
                <ChevronUp className="w-5 h-5 text-purple-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-purple-600" />
              )}
            </button>

            {/* Filters Content */}
            <div className={`glass-card p-6 lg:block ${showMobileFilters ? 'block' : 'hidden'}`}>
              <FiltersPanel />
            </div>
          </div>

          <div className="flex-1">
            {/* Category Navigation */}
            <div className="relative mb-8 max-w-3xl mx-auto">
              <button 
                onClick={() => handleScroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 glass-card hover:bg-white/50"
              >
                <ChevronLeft className="w-5 h-5 text-purple-600" />
              </button>
              
              <div 
                ref={scrollContainerRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide px-8"
              >
                {Object.keys(categories).map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setActiveCategory(category);
                      setSelectedTags([]);
                    }}
                    className={`
                      whitespace-nowrap px-6 py-3 rounded-xl transition-all duration-300
                      ${activeCategory === category
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'glass-card hover:bg-white/50 text-purple-900'
                      }
                    `}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => handleScroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 glass-card hover:bg-white/50"
              >
                <ChevronRight className="w-5 h-5 text-purple-600" />
              </button>
            </div>

            {/* Resource Cards */}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto">
              {filteredResources.map((resource) => (
                <div key={resource.id} className="glass-card p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-purple-50">
                      {resource.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-purple-900">{resource.title}</h3>
                        <button
                          onClick={() => {
                            setFavorites(prev =>
                              prev.includes(resource.id)
                                ? prev.filter(id => id !== resource.id)
                                : [...prev, resource.id]
                            );
                          }}
                          className="p-2 hover:bg-purple-50 rounded-full transition-colors"
                        >
                          <Heart
                            className={`w-5 h-5 ${
                              favorites.includes(resource.id)
                                ? 'fill-pink-500 text-pink-500'
                                : 'text-purple-400'
                            }`}
                          />
                        </button>
                      </div>
                      <p className="text-sm text-purple-600">{resource.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {resource.tips.map((tip, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-purple-900">
                        <div className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                  {resource.instructions && (
                    <button
                      onClick={() => setSelectedResource(resource)}
                      className="mt-4 w-full glass-button px-4 py-2 rounded-lg text-white text-sm font-medium"
                    >
                      View Recipe
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Recipe Modal */}
      {selectedResource && selectedResource.instructions && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-purple-900">{selectedResource.title}</h2>
                <button
                  onClick={() => setSelectedResource(null)}
                  className="p-2 hover:bg-purple-50 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-purple-600" />
                </button>
              </div>

              {selectedResource.prepTime && selectedResource.cookTime && (
                <div className="flex gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-purple-600" />
                    <span className="text-sm text-purple-900">
                      Prep: {selectedResource.prepTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChefHat className="w-4 h-4 text-purple-600" />
                    <span className="text-sm text-purple-900">
                      Cook: {selectedResource.cookTime}
                    </span>
                  </div>
                </div>
              )}

              {selectedResource.ingredients && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-purple-900 mb-3">Ingredients</h3>
                  <ul className="space-y-2">
                    {selectedResource.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-purple-900">
                        <div className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h3 className="text-lg font-medium text-purple-900 mb-3">Instructions</h3>
                <ol className="space-y-4">
                  {selectedResource.instructions.map((instruction, index) => (
                    <li key={index} className="flex gap-3 text-sm text-purple-900">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center text-xs">
                        {index + 1}
                      </span>
                      {instruction}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};