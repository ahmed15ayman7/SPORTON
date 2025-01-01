// // components/Waveform.tsx
// import { useEffect, useRef } from 'react';
// import WaveSurfer from 'wavesurfer.js';

// interface WaveformProps {
//   audioUrl: string;
//   isRecording: boolean;
// }

// const Waveform: React.FC<WaveformProps> = ({ audioUrl, isRecording }) => {
//   const waveformRef = useRef<HTMLDivElement>(null);
//   const wavesurferRef = useRef<WaveSurfer | null>(null);

//   useEffect(() => {
//     if (waveformRef.current) {
//       wavesurferRef.current = WaveSurfer.create({
//         container: waveformRef.current,
//         waveColor: '#ddd',
//         progressColor: '#FF971D',
//         height: 50,
//       });
//     }

//     return () => {
//       wavesurferRef.current?.destroy();
//     };
//   }, []);

//   useEffect(() => {
//     if (wavesurferRef.current && audioUrl) {
//       wavesurferRef.current.load(audioUrl);
//     }
//   }, [audioUrl]);

//   return <div ref={waveformRef} />;
// };

// export default Waveform;
