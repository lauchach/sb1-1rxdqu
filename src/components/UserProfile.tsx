import React, { useState } from 'react';
import { User, Mail, Lock } from 'lucide-react';
import type { User as UserType } from '../types';

interface UserProfileProps {
  user: UserType | null;
  onUpdateProfile: (data: Partial<UserType>) => void;
}

export function UserProfile({ user, onUpdateProfile }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user || {});

  if (!user) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Profile Settings</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-purple-600 hover:text-purple-700 transition-colors"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="bg-purple-100 p-3 rounded-full">
            <User className="h-6 w-6 text-purple-600" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            ) : (
              <p className="mt-1 text-gray-900">{user.name}</p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="bg-purple-100 p-3 rounded-full">
            <Mail className="h-6 w-6 text-purple-600" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            {isEditing ? (
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            ) : (
              <p className="mt-1 text-gray-900">{user.email}</p>
            )}
          </div>
        </div>

        {isEditing && (
          <button
            onClick={() => {
              onUpdateProfile(formData);
              setIsEditing(false);
            }}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-lg hover:opacity-90 transition-opacity"
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
}