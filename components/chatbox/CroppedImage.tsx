import React, { useEffect, useState } from 'react';

interface CroppedImageProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  imageUrl: string;
  text: string;
  textPosition: { x: number; y: number };
  stickers: { emoji: string; x: number; y: number; width: number; height: number }[];
}

const CroppedImage: React.FC<CroppedImageProps> = ({ canvasRef, imageUrl, text, textPosition, stickers }) => {
  const [widthImage, setwidthImage] = useState<number>(window.innerWidth * 0.8)
  const [heightImage, setheightImage] = useState<number>(window.innerHeight * 0.8)
  const drawImage = (canvas: HTMLCanvasElement, image: HTMLImageElement) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set the canvas size to the image's original size
    setwidthImage(image.width);
    setheightImage(image.height);
    console.log(widthImage * 0.8, heightImage * 0.8)
    // Clear canvas and draw the image
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0);

    // Draw the text with a background
    const textWidth = ctx.measureText(text).width;
    const textHeight = 30; // Adjust as needed
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'; // Background color
    ctx.fillRect(textPosition.x, textPosition.y - textHeight, textWidth, textHeight);
    ctx.font = '20px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(text, textPosition.x, textPosition.y);

    // Draw stickers (emojis)
    stickers.forEach((sticker) => {
      ctx.font = `${sticker.width}px Arial`; // Set emoji size
      ctx.fillText(sticker.emoji, sticker.x, sticker.y);
    });
  };

  useEffect(() => {
    const originalImage = new Image();
    originalImage.src = imageUrl;
    originalImage.onload = () => {
      if (canvasRef.current) {
        drawImage(canvasRef.current, originalImage);
      }
    };
  }, [imageUrl, text, stickers, textPosition, canvasRef]);

  return (
    <canvas
      ref={canvasRef}
      width={widthImage * 0.8}
      height={heightImage * 0.8}
      style={{ borderRadius: '8px' }}
    />
  );
};

export default CroppedImage;
