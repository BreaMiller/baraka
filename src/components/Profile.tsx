import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, MapPin, Calendar, Heart, Settings, LogOut, Upload, Check, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../stores/auth';

export const Profile = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.user_metadata?.full_name || '',
    email: user?.email || '',
    location: '',
    dueDate: '',
    birthPlan: [] as string[],
    doulaPreferences: {
      experience: [] as string[],
      specialties: [] as string[],
      culturalBackground: [] as string[]
    }
  });

  useEffect(() => {
    if (user) {
      loadUserProfile();
    }
  }, [user]);

  const loadUserProfile = async () => {
    try {
      setLoading(true);

      // Load user data
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user?.id)
        .maybeSingle();

      if (userError && userError.code !== 'PGRST116') {
        throw userError;
      }

      // Load mother preferences if role is mother
      if (user?.user_metadata?.role === 'mother') {
        const { data: preferences, error: prefError } = await supabase
          .from('mother_preferences')
          .select('*')
          .eq('user_id', user?.id)
          .maybeSingle();

        if (prefError && prefError.code !== 'PGRST116') {
          throw prefError;
        }

        setFormData({
          fullName: userData?.full_name || user?.user_metadata?.full_name || '',
          email: userData?.email || user?.email || '',
          location: preferences?.location || '',
          dueDate: preferences?.due_date || '',
          birthPlan: preferences?.birth_plan || [],
          doulaPreferences: preferences?.doula_preferences || {
            experience: [],
            specialties: [],
            culturalBackground: []
          }
        });
      } else {
        setFormData({
          fullName: userData?.full_name || user?.user_metadata?.full_name || '',
          email: userData?.email || user?.email || '',
          location: '',
          dueDate: '',
          birthPlan: [],
          doulaPreferences: {
            experience: [],
            specialties: [],
            culturalBackground: []
          }
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      setMessage({ type: 'error', text: 'Failed to load profile data' });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      setMessage(null);

      // Upsert user data
      const { error: userError } = await supabase
        .from('users')
        .upsert({
          id: user?.id,
          full_name: formData.fullName,
          email: formData.email,
          role: user?.user_metadata?.role || 'mother'
        });

      if (userError) throw userError;

      // Update mother preferences if role is mother
      if (user?.user_metadata?.role === 'mother') {
        const { error: prefError } = await supabase
          .from('mother_preferences')
          .upsert({
            user_id: user.id,
            location: formData.location,
            due_date: formData.dueDate,
            birth_plan: formData.birthPlan,
            doula_preferences: formData.doulaPreferences
          });

        if (prefError) throw prefError;
      }

      // Update auth metadata
      const { error: metadataError } = await supabase.auth.updateUser({
        data: { full_name: formData.fullName }
      });

      if (metadataError) throw metadataError;

      setMessage({ type: 'success', text: 'Profile updated successfully' });
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({ type: 'error', text: 'Failed to update profile' });
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      setMessage(null);

      if (!event.target.files || event.target.files.length === 0) {
        return;
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${user?.id}/avatar.${fileExt}`;

      // Upload the file
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Update user metadata with avatar URL
      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: publicUrl }
      });

      if (updateError) throw updateError;

      setMessage({ type: 'success', text: 'Avatar updated successfully' });
    } catch (error) {
      console.error('Error uploading avatar:', error);
      setMessage({ type: 'error', text: 'Failed to upload avatar' });
    } finally {
      setUploading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      setMessage({ type: 'error', text: 'Failed to sign out' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="glass-card p-8">
          {/* Profile Header */}
          <div className="flex items-center gap-6 mb-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-purple-100">
                {user?.user_metadata?.avatar_url ? (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-full h-full p-4 text-purple-300" />
                )}
              </div>
              <label className="absolute bottom-0 right-0 p-2 rounded-full bg-white shadow-lg cursor-pointer hover:bg-purple-50 transition-colors">
                {uploading ? (
                  <Loader2 className="w-5 h-5 text-purple-600 animate-spin" />
                ) : (
                  <Upload className="w-5 h-5 text-purple-600" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                  disabled={uploading}
                />
              </label>
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-purple-900">{formData.fullName || 'Your Profile'}</h1>
              <p className="text-purple-600">{user?.email}</p>
            </div>
          </div>

          {/* Status Message */}
          {message && (
            <div className={`mb-6 p-4 rounded-xl ${
              message.type === 'success' 
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {message.text}
            </div>
          )}

          {/* Form Sections */}
          <div className="space-y-6">
            <section>
              <h2 className="text-lg font-medium text-purple-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                Basic Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-purple-900 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="glass-input w-full px-4 py-2 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-purple-900 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="glass-input w-full px-4 py-2 rounded-lg"
                  />
                </div>
              </div>
            </section>

            {user?.user_metadata?.role === 'mother' && (
              <>
                <section>
                  <h2 className="text-lg font-medium text-purple-900 mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Location & Due Date
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-purple-900 mb-2">Location</label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="glass-input w-full px-4 py-2 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-purple-900 mb-2">Due Date</label>
                      <input
                        type="date"
                        value={formData.dueDate}
                        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                        className="glass-input w-full px-4 py-2 rounded-lg"
                      />
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-lg font-medium text-purple-900 mb-4 flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    Birth Preferences
                  </h2>
                  <div className="space-y-4">
                    {/* Add birth plan preferences UI here */}
                  </div>
                </section>
              </>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-purple-100">
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
              <button
                onClick={handleUpdateProfile}
                disabled={loading}
                className="glass-button px-6 py-2 rounded-lg text-white flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};