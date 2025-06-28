"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import Image from "next/image";

const contentData = [
  {
    title: "Digital Innovation",
    subtitle:
      "Transforming ideas into powerful digital experiences through cutting-edge technology",
    color: "from-blue-600 to-blue-800",
    textColor: "text-blue-400",
    image:
      "https://images.unsplash.com/photo-1733507267128-e65b38dad170?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxzZWFyY2h8MTV8fGRpZ2l0YWx8ZW58MHwwfDB8fHww",
  },
  {
    title: "Creative Design",
    subtitle:
      "Crafting beautiful interfaces that users love with attention to detail and user experience",
    color: "from-red-500 to-red-700",
    textColor: "text-red-400",
    image:
      "https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGVzaWdufGVufDB8MHwwfHx8MA%3D%3D",
  },
  {
    title: "Smart Development",
    subtitle:
      "Building robust solutions with cutting-edge technology that scales with your business",
    color: "from-orange-500 to-orange-700",
    textColor: "text-orange-400",
    image:
      "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c21hcnR8ZW58MHwwfDB8fHww",
  },
  {
    title: "Data Analytics",
    subtitle:
      "Turning complex data into actionable insights that drive informed business decisions",
    color: "from-purple-600 to-purple-800",
    textColor: "text-purple-400",
    image:
      "https://images.unsplash.com/photo-1707157281599-d155d1da5b4c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YW5hbHl0aWNzfGVufDB8MHwwfHx8MA%3D%3D",
  },
] as const;

export default function Component() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Better progress mapping that ensures each step gets equal scroll time
  const stepProgress = useTransform(
    scrollYProgress,
    [0, 1],
    [0, contentData.length]
  );

  useEffect(() => {
    const unsubscribe = stepProgress.on("change", (latest) => {
      // Ensure we don't exceed the array bounds and give each step equal time
      const clampedProgress = Math.max(
        0,
        Math.min(latest, contentData.length - 0.001)
      );
      const newIndex = Math.floor(clampedProgress);

      if (
        newIndex !== activeIndex &&
        newIndex >= 0 &&
        newIndex < contentData.length
      ) {
        setActiveIndex(newIndex);
      }
    });

    return unsubscribe;
  }, [stepProgress, activeIndex]);

  const textVariants: Variants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
  };

  return (
    <div className="w-full h-fit min-h-screen">
      <section className="h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex justify-center items-center">
        <div className="text-center text-white">
          <h1 className="text-[clamp(2rem,5vw,4rem)] font-bold mb-6">
            Our Journey
          </h1>
          <p className="text-[clamp(1rem,2vw,2rem)] text-gray-300">
            Scroll down to explore our story
          </p>
        </div>
      </section>

      {/* Pinned content on scroll - Extended height for proper scroll completion */}
      <div
        ref={containerRef}
        className="relative"
        style={{ height: `${contentData.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen flex overflow-hidden">
          {/* Left column - Text with fade-in and slide-up animation */}
          <div className="w-1/2 bg-black relative px-8 flex flex-col justify-center items-center z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                variants={textVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-center max-w-md"
              >
                {/* Large title on top */}
                <motion.h1
                  className={`text-[clamp(2.5rem,5vw,4.5rem)] font-bold mb-6 ${contentData[activeIndex].textColor}`}
                  transition={{ delay: 0.1 }}
                >
                  {contentData[activeIndex].title.split(" ")[0]}
                </motion.h1>

                {/* Main title */}
                <motion.h2
                  className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-white mb-4"
                  transition={{ delay: 0.2 }}
                >
                  {contentData[activeIndex].title}
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                  className="text-[clamp(1rem,2vw,2rem)] text-gray-300 leading-relaxed"
                  transition={{ delay: 0.3 }}
                >
                  {contentData[activeIndex].subtitle}
                </motion.p>
              </motion.div>
            </AnimatePresence>

            {/* Progress indicator */}
            <div className="flex justify-center items-center mt-12 space-x-3">
              {contentData.map((_, i) => (
                <motion.span
                  key={i}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === activeIndex ? "bg-white w-12" : "bg-gray-600 w-6"
                  }`}
                  animate={{ scale: i === activeIndex ? 1.1 : 1 }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>

            {/* Current step indicator */}
            <div className="text-center mt-6">
              <span className="text-gray-400 text-sm">
                {activeIndex + 1} of {contentData.length}
              </span>
            </div>
          </div>

          {/* Right column - Image with bottom-to-top reveal */}
          <div className="w-1/2 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={`image-${activeIndex}`}
                initial={{
                  y: "100%",
                  opacity: 0,
                }}
                animate={{
                  y: "0%",
                  opacity: 1,
                }}
                exit={{
                  y: "-50%",
                  opacity: 0,
                }}
                transition={{
                  duration: 1.2,
                  ease: [0.25, 0.36, 0.45, 0.54],
                  y: { duration: 1.0 },
                  opacity: { duration: 0.8 },
                }}
                className="absolute inset-0"
              >
                <Image
                  src={contentData[activeIndex].image || "/placeholder.svg"}
                  alt={contentData[activeIndex].title}
                  fill
                  quality={100}
                  priority
                  className="object-cover"
                />
                {/* Gradient overlay for better text readability */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${contentData[activeIndex].color} opacity-20`}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <section className="h-screen bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Begin?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Let&apos;s create something amazing together
          </p>
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors duration-300">
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}