import { useEffect, useRef, useState } from "react";
import NavWrapper from "./components/NavWrapper";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Grainient from "./components/Grainient";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [openingComplete, setOpeningComplete] = useState(true);
  const appRef = useRef(null);

  useEffect(() => {
    gsap.set("body", { overflow: "" });
    ScrollTrigger.defaults({
      scroller: window,
      markers: false,
      toggleActions: "play none none reverse",
    });
    return () => {
      gsap.set("body", { overflow: "" });
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <div ref={appRef}>
      <div className="grainient-bg-wrapper">
        {/* 精选作品及以下区块透出的动态渐变背景。
            注意：Hero 是不透明的（.hero 有底色 + z-index:10），首屏不会显示这层背景。
            想调节动效强弱就改下面这组参数：timeSpeed/warpSpeed 控速度，
            warpStrength/warpAmplitude 控形变幅度，color2 控底色亮度，contrast 控明暗对比。 */}
        <Grainient
          className="grainient-bg"
          color1="#78cb6e"
          color2="#0d1a0c"
          color3="#664b7e"
          timeSpeed={0.5}
          warpStrength={1.6}
          warpFrequency={3.6}
          warpSpeed={3.0}
          warpAmplitude={38.0}
          rotationAmount={500.0}
          noiseScale={2.2}
          grainAmount={0.08}
          contrast={1.15}
          saturation={1.05}
          zoom={1.0}
        />
      </div>
      <NavWrapper />
      <main>
        <Hero openingComplete={openingComplete} />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}
