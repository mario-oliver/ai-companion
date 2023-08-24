'use client';

import React, { useEffect, useState } from 'react';

import { CldUploadButton } from 'next-cloudinary';
import Image from 'next/image';

interface ImageUploadProps {
  value: string;
  onChange: (src: string) => void;
  disabled?: boolean;
}

const ImageUpload = ({ value, onChange, disabled }: ImageUploadProps) => {
  //because of the use of cloudinary we can have hydration issues, so we use the following trick to prevent that
  const [isMounted, setIsMounted] = useState(false);
  //use effect only runs once we finish server side rendering and get to client side rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);
  //once we get below this, we are then on client side rendering and won't run into issues with cloudinary on client
  if (!isMounted) return null;
  // end of code

  return (
    <div className="space-y-4 w-full flex flex-col justify-center items-center">
      {/* the upload preset comes from Cloudinary > Settings > Upload > Upload presets & for us it's an unsigned preset we created */}
      <CldUploadButton
        options={{ maxFiles: 1 }}
        uploadPreset="npcbceh2"
        onUpload={(result: any) => onChange(result.info.secure_url)}
      >
        <div className="p-4 border-4 border-dashed border-primary/10 rounded-lg hover:opacity-75 transition flex flex-col space-y-2 items-center justify-center">
          <div className="relative h-40 w-40">
            <Image
              fill
              alt="upload"
              src={value || '/placeholder.svg'}
              className="rounded-lg object-cover"
            ></Image>
          </div>
        </div>
      </CldUploadButton>
    </div>
  );
};

export default ImageUpload;
