"use client"
import React, { useState, useEffect } from 'react';

export default function SpaceIframe({ url, emptyRepo }: { url: string; emptyRepo?: boolean }) {
  const [isValidUrl, setIsValidUrl] = useState<boolean | null>(true);

  useEffect(() => {
    const checkUrlValidity = async () => {
      try {
        const response = await fetch(url, { method: 'HEAD' });

        // Check if the response is HTML
        const contentType = response.headers.get('content-type');
        if (response.ok && contentType && contentType.includes('text/html')) {
          setIsValidUrl(true);
        } else {
          setIsValidUrl(false);
        }
      } catch (error) {
        setIsValidUrl(false);
      }
    };

    // checkUrlValidity();
  }, [url]);

  if (emptyRepo) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        Push some code to the repo to build the agent.
      </div>
    );
  }

  if (isValidUrl === null) {
    return (
      null
    );
  }

  if (!isValidUrl) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        Your space is being built.
      </div>
    );
  }

  return (
    <div style={{ width: '100%' }}>
      <iframe
        src={url}
        style={{
          width: '100%',
          minHeight: '80vh',
          border: 'none',
        }}
        title="Example Iframe"
      ></iframe>
    </div>
  );
}