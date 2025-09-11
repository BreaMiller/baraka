import React, { useState } from 'react';
import { MessageCircle, Users, Heart, Star } from 'lucide-react';

interface CommunityPost {
  id: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: string;
  tags: string[];
}

const mockPosts: CommunityPost[] = [
  {
    id: '1',
    author: {
      name: 'Ashlynn Smith',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
      role: 'Expecting Mom'
    },
    content: 'Just had my 20-week anatomy scan! Everything looks perfect with our little girl. So grateful for this community and all the support. 💕 Any other moms-to-be have their anatomy scan coming up?',
    image: 'https://images.unsplash.com/photo-1584859977999-531c305575b7?auto=format&fit=crop&q=80&w=800',
    likes: 24,
    comments: 8,
    timestamp: '2 hours ago',
    tags: ['PregnancyJourney', 'AnatomyScan', '20Weeks']
  },
  {
    id: '2',
    author: {
      name: 'Emily Michaels',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
      role: 'Certified Doula'
    },
    content: 'Quick tip for managing morning sickness: Try eating small, frequent meals throughout the day instead of three large ones. Ginger tea can also be really helpful! What remedies have worked for you?',
    likes: 45,
    comments: 15,
    timestamp: '5 hours ago',
    tags: ['MorningSickness', 'PregnancyTips', 'Wellness']
  },
  {
    id: '3',
    author: {
      name: 'Brenda Rogers',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200',
      role: 'New Mom'
    },
    content: 'One month postpartum! It\'s been a journey of ups and downs, but this little one makes it all worth it. Remember to be gentle with yourself, mamas. Recovery takes time. 🤱',
    image: 'https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?auto=format&fit=crop&q=80&w=800',
    likes: 67,
    comments: 23,
    timestamp: '1 day ago',
    tags: ['Postpartum', 'NewMom', 'Recovery']
  }
];

const CommunityGroups = () => {
  const groups = [
    {
      name: 'First Time Moms',
      members: 1250,
      posts: 45,
      image: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&q=80&w=200'
    },
    {
      name: 'Natural Birth Support',
      members: 890,
      posts: 32,
      image: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&q=80&w=200'
    },
    {
      name: 'Working Moms',
      members: 1100,
      posts: 28,
      image: 'https://images.unsplash.com/photo-1623104884-16c8f3fb53e8?auto=format&fit=crop&q=80&w=200'
    },
    {
      name: 'Pregnancy Fitness',
      members: 750,
      posts: 15,
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=200'
    },
    {
      name: 'Mindful Motherhood',
      members: 980,
      posts: 42,
      image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&q=80&w=200'
    },
    {
      name: 'Birth Stories',
      members: 1500,
      posts: 65,
      image: 'https://images.unsplash.com/photo-1556207944-1e0033a54801?auto=format&fit=crop&q=80&w=200'
    }
  ];

  return (
    <div className="glass-card p-6">
      <h2 className="text-lg font-semibold text-purple-900 mb-4">Popular Groups</h2>
      
      {/* Desktop View */}
      <div className="hidden md:grid grid-cols-1 gap-4">
        {groups.slice(0, 4).map((group, index) => (
          <div
            key={index}
            className="p-4 rounded-xl bg-white/50 hover:bg-white/70 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-purple-900">{group.name}</h3>
                <p className="text-sm text-purple-600">
                  {group.members.toLocaleString()} members • {group.posts} posts today
                </p>
              </div>
              <button className="px-4 py-2 rounded-lg text-purple-600 hover:bg-purple-50 text-sm">
                Join
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile View - Side Scrolling Cards */}
      <div className="md:hidden -mx-6">
        <div className="flex overflow-x-auto scrollbar-hide px-6 pb-4 gap-4">
          {groups.map((group, index) => (
            <div
              key={index}
              className="flex-none w-64 glass-card p-4 rounded-xl"
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={group.image}
                  alt={group.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <h3 className="font-medium text-purple-900 truncate">{group.name}</h3>
                  <p className="text-sm text-purple-600">
                    {group.members.toLocaleString()} members
                  </p>
                </div>
              </div>
              <p className="text-sm text-purple-600 mb-3">
                {group.posts} posts today
              </p>
              <button className="w-full glass-button px-4 py-2 rounded-lg text-white text-sm">
                Join Group
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TrendingTopics = () => (
  <div className="glass-card p-6">
    <h2 className="text-lg font-semibold text-purple-900 mb-4">Trending Topics</h2>
    <div className="flex flex-wrap gap-2">
      {[
        '#PregnancyJourney',
        '#BirthStory',
        '#MomLife',
        '#PregnancyTips',
        '#NewMom',
        '#BabyBump',
        '#Postpartum',
        '#MomSupport'
      ].map((topic, index) => (
        <span
          key={index}
          className="px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-sm hover:bg-purple-100 cursor-pointer"
        >
          {topic}
        </span>
      ))}
    </div>
  </div>
);

export const Community = () => {
  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <CommunityGroups />
            <TrendingTopics />
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post */}
            <div className="glass-card p-6">
              <div className="flex gap-4">
                <img
                  src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200"
                  alt="Your avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <button
                  className="flex-1 text-left px-4 py-2 rounded-xl bg-white/50 text-purple-400 hover:bg-white/70"
                >
                  Share your thoughts or questions...
                </button>
              </div>
            </div>

            {/* Posts */}
            {mockPosts.map((post) => (
              <div key={post.id} className="glass-card p-6">
                <div className="flex items-start gap-4">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-purple-900">{post.author.name}</h3>
                      <span className="text-sm text-purple-600">•</span>
                      <span className="text-sm text-purple-600">{post.author.role}</span>
                    </div>
                    <p className="text-sm text-purple-400">{post.timestamp}</p>
                    <p className="mt-2 text-purple-900">{post.content}</p>
                    {post.image && (
                      <img
                        src={post.image}
                        alt="Post content"
                        className="mt-4 rounded-xl w-full object-cover max-h-96"
                      />
                    )}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 rounded-full bg-purple-50 text-purple-600 text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-6">
                      <button className="flex items-center gap-2 text-purple-600 hover:text-pink-600">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-purple-600 hover:text-pink-600">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm">{post.comments}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};