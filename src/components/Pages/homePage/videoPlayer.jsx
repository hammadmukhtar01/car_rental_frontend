import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ videoUrl }) => {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const handlePlayPause = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  return (
    <div style={{ position: 'relative' }}>
      <ReactPlayer
        ref={playerRef}
        url={videoUrl}
        playing={isPlaying}
        loop
        muted
        width="100%"
        height="90%"
        background="green"
      />

      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '50%',
          background: 'green',
          display: isPlaying ? 'none' : 'block',
        }}
      >
        <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
      </div>
    </div>
  );
};

export default VideoPlayer;
