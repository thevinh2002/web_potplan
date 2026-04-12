import React from 'react';

interface MapProps {
  className?: string;
}

export default function Map({ className = '' }: MapProps) {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.657040354058!2d106.7007855756456!3d10.91364775664639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d700652a1563%3A0x4f5d3e23efb9dcf3!2sViet%20Anh%20Dung%20Composite%20Pot%20(Showroom%20%26%20Manufacture)!5e0!3m2!1svi!2s!4v1767775155290!5m2!1svi!2s"
      width="100%"
      height="100%"
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Viet Anh Dung Composite Pot Location"
      className={`border-0 ${className}`}
    />
  );
}
