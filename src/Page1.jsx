import React from "react";
import Styles from "./Pages_CSS/Page.module.css";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const Page1 = (props) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  // const playerRef = useRef(null);
  const { folder } = props;
  const videoLink = `https://final-ffmpeg.vercel.app/hls/${folder}/index.m3u8`;
  const options = {
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: videoLink,
        type: "application/x-mpegURL",
      },
    ],
  };
  const onReady = (player) => {
      playerRef.current = player;
  
      player.on("waiting", () => {
        videojs.log("player is waiting");
      });
  
      player.on("dispose", () => {
        videojs.log("player will dispose");
      });
    };

  React.useEffect(() => {
    if (!playerRef.current && videoRef.current) {
      // ✅ Check if videoRef is available
      const videoElement = document.createElement("video-js");
      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log("player is ready");
        if (onReady) {
          onReady(player);
        }
      }));

      // ✅ Ensure autoplay is a boolean before applying
      if (typeof options.autoplay === "boolean") {
        player.autoplay(options.autoplay);
      }

      player.src(options.sources);
    }
  }, [options, videoRef, onReady]); // ✅ Added onReady to dependencies

  React.useEffect(() => {
    const player = playerRef.current;
    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <>
    <div className={Styles.Video}>
      <div data-vjs-player className={Styles.Player}>
        <div ref={videoRef}  className={Styles.Child_Player} />
      </div>
      </div>
    </>
  );
};

export default Page1;

//////////////////////////////
