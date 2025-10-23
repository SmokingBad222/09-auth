'use client';

import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import AvatarPicker from '@/components/AvatarPicker/AvatarPicker';
import { getMe, updateMe, uploadImage } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';

export default function EditProfile() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();

  const [username, setUserName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [email, setEmail] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    getMe().then((user) => {
      setUserName(user.username ?? '');
      setPhotoUrl(user.photoUrl ?? '');
      setEmail(user.email ?? '');
    });
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleSaveUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const newPhotoUrl = imageFile ? await uploadImage(imageFile) : photoUrl;
      const updatedUser = await updateMe({ username, photoUrl: newPhotoUrl });

      setUser(updatedUser);

      router.push('/profile');
    } catch (error) {
      console.error('Oops, some error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Edit profile</h1>
      <AvatarPicker profilePhotoUrl={photoUrl} onChangePhoto={setImageFile} />

      <form onSubmit={handleSaveUser} style={{ marginTop: '1.5rem' }}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={handleChange}
            required
            style={{ display: 'block', marginBottom: '1rem' }}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            value={email}
            readOnly
            style={{
              display: 'block',
              marginBottom: '1.5rem',
              backgroundColor: '#f1f1f1',
            }}
          />
        </label>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </button>

          <button
            type="button"
            onClick={() => router.back()}
            style={{ background: '#ccc' }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
