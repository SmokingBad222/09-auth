'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import css from './AvatarPicker.module.css';

type Props = {
  onChangePhoto: (file: File | null) => void;
  profilePhotoUrl?: string;
};

const AvatarPicker = ({ profilePhotoUrl, onChangePhoto }: Props) => {
  const [previewUrl, setPreviewUrl] = useState(profilePhotoUrl);
  const [error, setError] = useState('');

  useEffect(() => {
    setPreviewUrl(profilePhotoUrl);
  }, [profilePhotoUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError('');

    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Тільки зображення');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError('Максимальний розмір файлу — 5MB');
        return;
      }

      onChangePhoto(file) 

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    onChangePhoto(null);
    setPreviewUrl('');
  };

  return (
    <div>
      <div className={css.picker}>
        {previewUrl && (
          <Image
            src={previewUrl}
            alt="Попередній перегляд"
            width={300}
            height={300}
            className={css.avatar}
          />
        )}
        <label className={previewUrl ? `${css.wrapper} ${css.reload}` : css.wrapper}>
          📷 Обрати фото
          <input type="file" accept="image/*" onChange={handleFileChange} className={css.input} />
        </label>
        {previewUrl && (
          <button className={css.remove} onClick={handleRemove}>
            ❌
          </button>
        )}
      </div>
      {error && <p className={css.error}>{error}</p>}
    </div>
  );
};

export default AvatarPicker;