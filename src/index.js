import React, { useCallback, useRef, useState, useMemo } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { WaveSurfer, WaveForm, Region } from "wavesurfer-react";
import "./styles.css";
import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions.min";
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min";

const Buttons = styled.div`
  display: inline-block;
`;

const Button = styled.button``;

function App() {
  const plugins = useMemo(() => {
    return [
      // {
      //   plugin: RegionsPlugin,
      //   options: {
      //     dragSelection: true
      //   }
      // }
      // {
      //   plugin: TimelinePlugin,
      //   options: {
      //     container: "#timeline"
      //   }
      // }
    ].filter(Boolean);
  }, []);

  const wavesurferRef = useRef();
  const handleWSMount = useCallback((waveSurfer) => {
    wavesurferRef.current = waveSurfer;
    if (wavesurferRef.current) {
      wavesurferRef.current.load("/aevice_lung_sound.wav");

      wavesurferRef.current.on("ready", () => {
        console.log("WaveSurfer is ready");
      });

      wavesurferRef.current.on("loading", (data) => {
        console.log("loading --> ", data);
      });

      if (window) {
        window.surferidze = wavesurferRef.current;
      }
    }
  }, []);

  const play = useCallback(() => {
    wavesurferRef.current.playPause();
  }, []);

  return (
    <div className="App">
      <h1>AEVice Waveform Visualization </h1>
      <WaveSurfer plugins={plugins} onMount={handleWSMount}>
        <WaveForm id="waveform" waveColor="#005999" progressColor="#005999" />
        <div id="timeline" />
      </WaveSurfer>
      <br />
      <Buttons>
        <Button onClick={play}>Play / Pause</Button>
      </Buttons>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
