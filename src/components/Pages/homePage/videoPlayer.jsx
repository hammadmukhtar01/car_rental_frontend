import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ videoUrl, bgColor }) => {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const handlePlayPause = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  return (
    <div style={{ position: 'relative', background: bgColor || '' }}>
      <ReactPlayer
        ref={playerRef}
        url={videoUrl}
        playing={isPlaying}
        loop
        muted
        width="100%"
        height="50%"
        style={{ position: 'relative', top: 83, left: 0 }}
      />

      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          display: isPlaying ? 'none' : 'block',
        }}
      >
        <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
      </div>
    </div>
  );
};

export default VideoPlayer;
