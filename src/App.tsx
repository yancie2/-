/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "motion/react";
import { Mail, ArrowRight, Layout, Palette, Zap, Send, Github, Linkedin, MessageCircle, ArrowLeft, Phone, Maximize2, X, Menu } from "lucide-react";
import { HashRouter, Routes, Route, Link, useParams, useNavigate, useLocation } from "react-router-dom";

// --- Data ---

const PROJECTS = [
  {
    id: "liushen",
    category: "创意策划/ 内容营销",
    title: "六神夏日不完蛋营销策划",
    subtitle: "小红书绿草计划特等奖项目，实现曝光增长582%",
    year: "2025",
    image: "https://github.com/yancie2/tupian/blob/eb1645650fd783375af23e565337d714f784ff31/%E5%B0%8F%E7%BA%A2%E4%B9%A61.png?raw=true",
    images: [
      "https://github.com/yancie2/tupian/blob/eb1645650fd783375af23e565337d714f784ff31/%E5%B0%8F%E7%BA%A2%E4%B9%A61.png?raw=true",
      "https://github.com/yancie2/tupian/blob/eb1645650fd783375af23e565337d714f784ff31/%E5%B0%8F5.png?raw=true",
      "https://github.com/yancie2/tupian/blob/eb1645650fd783375af23e565337d714f784ff31/%E5%B0%8F2.png?raw=true",
      "https://github.com/yancie2/tupian/blob/eb1645650fd783375af23e565337d714f784ff31/%E5%B0%8F3.png?raw=true",
      "https://github.com/yancie2/tupian/blob/eb1645650fd783375af23e565337d714f784ff31/%E5%B0%8F4.png?raw=true"
    ],
    detailedDescription: "该项目在小红书绿草计划中荣获特等奖。通过深度洞察年轻消费群体对‘清凉’与‘国货’的双重需求，我们策划了一系列跨界联名与内容种草活动。利用数据分析实时优化投放策略，最终实现了曝光量 582% 的惊人增长，成功将传统品牌推向潮流前线。"
  },
  {
    id: "liushen-koc",
    category: "社媒运营 / 评论区营销",
    title: "Y25六神KOC&评论区营销",
    subtitle: "通过KOC矩阵与评论区深度互动，提升品牌声量与用户转化",
    year: "2025",
    image: "https://github.com/yancie2/tupian/blob/efc35e2ab1048a5c8455637f90ba26f10ba55dbf/k1.png?raw=true",
    images: [
      "https://github.com/yancie2/tupian/blob/efc35e2ab1048a5c8455637f90ba26f10ba55dbf/k1.png?raw=true",
      "https://github.com/yancie2/tupian/blob/efc35e2ab1048a5c8455637f90ba26f10ba55dbf/k5.png?raw=true",
      "https://github.com/yancie2/tupian/blob/efc35e2ab1048a5c8455637f90ba26f10ba55dbf/k2.png?raw=true",
      "https://github.com/yancie2/tupian/blob/efc35e2ab1048a5c8455637f90ba26f10ba55dbf/k3.png?raw=true"
    ],
    detailedDescription: "该项目聚焦于社交媒体的深度运营，通过构建KOC（关键意见消费者）矩阵，在小红书、抖音等平台进行广泛种草。同时，我们重点发力评论区营销，通过有温度、有创意的互动，引导用户舆论，提升品牌好感度，并实现从内容到消费的闭环转化。"
  },
  {
    id: "zigui",
    category: "品牌策略 / 视觉设计",
    title: "秭归脐橙品牌重塑",
    subtitle: "融合屈原文化，打造具备地标属性的现代农产品牌",
    year: "2024-2025",
    image: "https://github.com/yancie2/tupian/blob/efc35e2ab1048a5c8455637f90ba26f10ba55dbf/%E8%84%90%E6%A9%993.png?raw=true",
    images: [
      "https://github.com/yancie2/tupian/blob/efc35e2ab1048a5c8455637f90ba26f10ba55dbf/%E8%84%90%E6%A9%993.png?raw=true",
      "https://github.com/yancie2/tupian/blob/efc35e2ab1048a5c8455637f90ba26f10ba55dbf/%E8%84%90%E6%A9%991.png?raw=true",
      "https://github.com/yancie2/tupian/blob/efc35e2ab1048a5c8455637f90ba26f10ba55dbf/%E8%84%90%E6%A9%992.png?raw=true",
      "https://github.com/yancie2/tupian/blob/efc35e2ab1048a5c8455637f90ba26f10ba55dbf/%E8%84%90%E6%A9%995.png?raw=true",
      "https://github.com/yancie2/tupian/blob/efc35e2ab1048a5c8455637f90ba26f10ba55dbf/%E8%84%90%E6%A9%994.png?raw=true"
    ],
    detailedDescription: "秭归脐橙作为具备深厚文化底蕴的地标产品，面临品牌形象老化的问题。我们深入挖掘屈原文化内涵，将其与现代审美相结合，进行了全方位的品牌重塑。从包装设计到社交媒体传播，打造了一个既有文化深度又具现代感的农产品牌，显著提升了产品的溢价能力和市场认可度。"
  },
  {
    id: "aranya",
    category: "内容规划 / 跨界联名",
    title: "aranya 阿那亚社媒内容矩阵",
    subtitle: "打造品牌精神与空间社区化深度结合的高质内容",
    year: "2025",
    image: "https://github.com/yancie2/tupian/blob/329606d165bed6935588f5c4ead876b28978829a/a1.jpg?raw=true",
    images: [
      "https://github.com/yancie2/tupian/blob/329606d165bed6935588f5c4ead876b28978829a/a1.jpg?raw=true",
      "https://github.com/yancie2/tupian/blob/329606d165bed6935588f5c4ead876b28978829a/a3.jpg?raw=true"
    ],
    detailedDescription: "阿那亚不仅仅是一个地理坐标，更是一种精神社区。我们为其构建了多维度的社媒内容矩阵，通过高质量的视觉呈现和深度的人文叙事，传递‘人生可以更美’的品牌理念。通过跨界联名和社群运营，增强了用户粘性，实现了品牌精神与空间社区化运营的深度结合。"
  },
  {
    id: "ongoing",
    category: "更多项目实践",
    title: "正在进行中......",
    subtitle: "六神驱蚊蛋Y26种草",
    year: "2026",
    image: "https://github.com/yancie2/tupian/blob/44bf0869c795457f39d62b4e0af9d7edf53bf98d/%E7%94%B5%E8%84%91%E5%A3%81%E7%BA%B8%EF%BD%9C%E7%94%9F%E5%91%BD%E6%98%AF%E4%B8%80%E4%B8%87%E6%AC%A1%E7%9A%84%E6%98%A5%E5%92%8C%E6%99%AF%E6%98%8E_1_%E5%B0%8F%E5%86%B0%E5%84%BF_%E6%9D%A5%E8%87%AA%E5%B0%8F%E7%BA%A2%E4%B9%A6%E7%BD%91%E9%A1%B5%E7%89%88.jpg?raw=true",
    images: [
      "https://github.com/yancie2/tupian/blob/44bf0869c795457f39d62b4e0af9d7edf53bf98d/%E7%94%B5%E8%84%91%E5%A3%81%E7%BA%B8%EF%BD%9C%E7%94%9F%E5%91%BD%E6%98%AF%E4%B8%80%E4%B8%87%E6%AC%A1%E7%9A%84%E6%98%A5%E5%92%8C%E6%99%AF%E6%98%8E_1_%E5%B0%8F%E5%86%B0%E5%84%BF_%E6%9D%A5%E8%87%AA%E5%B0%8F%E7%BA%A2%E4%B9%A6%E7%BD%91%E9%A1%B5%E7%89%88.jpg?raw=true",
      "https://github.com/yancie2/tupian/blob/44bf0869c795457f39d62b4e0af9d7edf53bf98d/g1.png?raw=true",
      "https://github.com/yancie2/tupian/blob/44bf0869c795457f39d62b4e0af9d7edf53bf98d/g2.png?raw=true"
    ],
    detailedDescription: "六神驱蚊蛋新品上市及金玻瓶上新种草规划，达人对接，资讯发布等"
  }
];

// --- Components ---

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const navItems = [
    { en: "About", zh: "关于", id: "about" },
    { en: "Selected Work", zh: "案例", id: "work" },
    { en: "Capabilities", zh: "能力", id: "capabilities" }
  ];

  return (
    <>
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full z-[100] px-6 md:px-8 py-4 md:py-6 flex justify-between items-center bg-white/90 backdrop-blur-md border-b border-black/5"
      >
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => {
            if (location.pathname !== "/") navigate("/");
            else window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <div className="w-8 h-8 bg-[#10B981] rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-tr-full" />
          </div>
          <span className="font-black text-xl tracking-tighter text-[#1F2937]">YANCIE</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10 text-sm font-medium text-[#6A7282]">
          {navItems.map((item) => (
            <a 
              key={item.en} 
              href={`#${item.id}`} 
              onClick={(e) => handleNavClick(e, item.id)}
              className="hover:text-[#10B981] transition-colors flex flex-col items-center group"
            >
              <span className="text-[10px] font-bold tracking-widest text-[#34D399] mb-0.5">
                {item.zh}
              </span>
              <span className="tracking-tight">
                {item.en}
              </span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a 
            href="#contact" 
            onClick={(e) => handleNavClick(e, "contact")}
            className="hidden sm:block bg-[#10B981] text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-[#059669] transition-all shadow-lg shadow-emerald-500/20"
          >
            Contact Me
          </a>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-[#1F2937]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[90] bg-white pt-24 px-8 md:hidden"
          >
            <div className="flex flex-col gap-8">
              {navItems.map((item) => (
                <a 
                  key={item.en} 
                  href={`#${item.id}`} 
                  onClick={(e) => handleNavClick(e, item.id)}
                  className="text-3xl font-black text-[#1F2937] tracking-tighter flex items-center justify-between group"
                >
                  <span>{item.en}</span>
                  <span className="text-sm font-bold text-[#10B981] opacity-0 group-hover:opacity-100 transition-opacity">{item.zh}</span>
                </a>
              ))}
              <a 
                href="#contact" 
                onClick={(e) => handleNavClick(e, "contact")}
                className="text-3xl font-black text-[#10B981] tracking-tighter"
              >
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [frontFaceIndex, setFrontFaceIndex] = useState(0);
  const frontFaceImages = [
    "https://github.com/yancie2/tupian/blob/eb1645650fd783375af23e565337d714f784ff31/%E9%A6%96%E9%A1%B5%E5%9B%BE.jpg?raw=true",
    "https://github.com/yancie2/tupian/blob/eb1645650fd783375af23e565337d714f784ff31/%E5%AD%A6%E4%B9%A04.jpg?raw=true",
    "https://github.com/yancie2/tupian/blob/eb1645650fd783375af23e565337d714f784ff31/%E5%AD%A6%E4%B9%A06.jpg?raw=true",
    "https://github.com/yancie2/tupian/blob/eb1645650fd783375af23e565337d714f784ff31/%E5%AD%A6%E4%B9%A05.jpg?raw=true",
    "https://github.com/yancie2/tupian/blob/eb1645650fd783375af23e565337d714f784ff31/%E5%AD%A6%E4%B9%A02.jpg?raw=true"
  ];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Smooth the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Only start carousel when card is horizontal (smoothProgress > 0.5)
  useEffect(() => {
    let interval: any;
    const unsubscribe = smoothProgress.on("change", (latest) => {
      if (latest > 0.5 && !interval) {
        // Immediately switch to the first learning image when entering the section
        setFrontFaceIndex(1);
        interval = setInterval(() => {
          setFrontFaceIndex((prev) => {
            // Cycle through indices 1 to 4 (the learning images)
            const next = prev + 1;
            return next >= frontFaceImages.length ? 1 : next;
          });
        }, 4000);
      } else if (latest <= 0.5 && interval) {
        clearInterval(interval);
        interval = null;
        setFrontFaceIndex(0); // Reset to portrait (Hero image)
      }
    });
    return () => {
      unsubscribe();
      if (interval) clearInterval(interval);
    };
  }, [smoothProgress, frontFaceImages.length]);

  // Card Transformations - Adjusted for mobile to avoid overlap
  const scale = useTransform(smoothProgress, [0, 0.4, 0.85, 1], [0.85, 0.75, 0.75, 0.6]);
  const x = useTransform(smoothProgress, [0, 0.4], isMobile ? ["0%", "0%"] : ["0%", "42%"]);
  const y = useTransform(smoothProgress, [0, 0.4, 0.85, 1], isMobile ? ["10%", "20%", "20%", "35%"] : ["0%", "-5%", "-5%", "20%"]);
  const rotateY = useTransform(smoothProgress, [0, 0.3, 0.5, 0.8], [0, 180, 180, 360]);
  const borderRadius = useTransform(smoothProgress, [0, 0.4], ["40px", "60px"]);
  const opacity = useTransform(smoothProgress, [0.85, 1], [1, 0]);
  
  // Transition from 3:4 (0.75) to 4:3 (1.333) during the final flip
  const aspectValue = useTransform(smoothProgress, [0.5, 0.8], [0.75, 1.333]);

  // Text Transformations
  const initialTextOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const initialTextXLeft = useTransform(smoothProgress, [0, 0.15], [0, -50]);
  const initialTextXRight = useTransform(smoothProgress, [0, 0.15], [0, 50]);
  
  // First Content (Revealed during first flip)
  const content1Opacity = useTransform(smoothProgress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0]);
  const content1Y = useTransform(smoothProgress, [0.3, 0.4], [50, 0]);

  // Second Content (Revealed during second flip)
  const content2Opacity = useTransform(smoothProgress, [0.7, 0.8], [0, 1]);
  const content2Y = useTransform(smoothProgress, [0.7, 0.8], [50, 0]);

  // Mobile Horizontal Scroll
  const mobileX = useTransform(smoothProgress, [0, 1], ["0%", "-200%"]);

  return (
    <section id="about" ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden perspective-2000">
        
        {isMobile ? (
          <motion.div 
            style={{ x: mobileX }}
            className="flex items-center h-full w-[300vw] absolute left-0"
          >
            {/* Slide 1: Initial Hero */}
            <div className="w-screen h-full flex flex-col justify-center px-6 relative">
              <div className="mb-12">
                <h1 className="text-[60px] font-black leading-none tracking-tighter text-[#1F2937] mb-2">
                  Ideas.
                </h1>
                <h1 className="text-[60px] font-black leading-none tracking-tighter text-[#1F2937]">
                  In Motion.
                </h1>
              </div>
              <div className="w-full aspect-[3/4] rounded-[40px] overflow-hidden shadow-2xl">
                <img 
                  src={frontFaceImages[0]} 
                  alt="Yancie Hero" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Slide 2: Content 1 */}
            <div className="w-screen h-full flex flex-col justify-center px-6 relative">
              <div className="mb-8">
                <h2 className="text-[36px] font-black leading-tight text-[#1F2937] mb-4">
                  让好的想法 <br />
                  <span className="text-[#10B981]">真正发生.</span>
                </h2>
                <p className="text-[15px] text-[#6A7282] leading-relaxed mb-6">
                  从品牌策划到内容运营，我持续参与真实项目，在实践中学习如何把营销做好。
                </p>
                <a 
                  href="#work" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex bg-[#10B981] text-white px-6 py-3 rounded-full font-bold items-center gap-2 shadow-lg shadow-emerald-500/20 text-sm"
                >
                  精选案例 <ArrowRight size={18} />
                </a>
              </div>
              <div className="w-full aspect-[4/3] rounded-[30px] overflow-hidden shadow-xl">
                <img 
                  src="https://github.com/yancie2/tupian/blob/eb1645650fd783375af23e565337d714f784ff31/%E9%A6%96%E5%9B%BE2.jpg?raw=true" 
                  alt="Practice" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Slide 3: Content 2 */}
            <div className="w-screen h-full flex flex-col justify-center px-6 relative">
              <div className="mb-8">
                <h2 className="text-[36px] font-black leading-tight text-[#1F2937] mb-4">
                  学习 实践 <br />
                  <span className="text-[#10B981]">成长</span>.
                </h2>
                <p className="text-[15px] text-[#6A7282] leading-relaxed mb-6">
                  在每一个项目中沉淀，在每一次实践中突破。我始终保持对新知识的渴望，通过不断的实战积累，实现从量变到质变的跨越。
                </p>
                <button className="border border-[#1F2937]/10 px-6 py-3 rounded-full font-bold text-[#1F2937] text-sm">
                  关于我
                </button>
              </div>
              <div className="w-full aspect-[4/3] rounded-[30px] overflow-hidden shadow-xl">
                <img 
                  src={frontFaceImages[2]} 
                  alt="Growth" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Initial Hero Text - Left Side */}
            <motion.div 
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ opacity: initialTextOpacity, x: initialTextXLeft }}
              className="absolute left-6 md:left-[12%] lg:left-[18%] z-30 text-left"
            >
              <h1 className="text-[60px] md:text-[90px] lg:text-[120px] font-black leading-none tracking-tighter text-[#1F2937]">
                Ideas.
              </h1>
            </motion.div>

            {/* Initial Hero Text - Right Side */}
            <motion.div 
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ opacity: initialTextOpacity, x: initialTextXRight }}
              className="absolute right-6 md:right-[2%] lg:right-[4%] z-30 text-left -translate-y-8 md:-translate-y-12"
            >
              <h1 className="text-[60px] md:text-[90px] lg:text-[120px] font-black leading-none tracking-tighter text-[#1F2937]">
                In Motion.
              </h1>
            </motion.div>

            {/* The Flipping Card (Transitions from 3:4 to 4:3) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.4, y: 80 }}
              animate={{ opacity: 1, scale: 0.85, y: 0 }}
              transition={{ duration: 1.5, delay: 2.0, ease: [0.22, 1, 0.36, 1] }}
              style={{ 
                scale, 
                x, 
                y,
                rotateY,
                borderRadius,
                opacity,
                aspectRatio: aspectValue,
                transformStyle: "preserve-3d",
              }}
              className="relative h-[55vh] lg:h-[65vh] z-20 shadow-[0_60px_120px_-20px_rgba(0,0,0,0.2),0_30px_60px_-15px_rgba(0,0,0,0.1)]"
            >
              {/* Front Face */}
              <div className="absolute inset-0 w-full h-full backface-hidden overflow-hidden rounded-[inherit] bg-white">
                <AnimatePresence>
                  <motion.img 
                    key={frontFaceIndex}
                    src={frontFaceImages[frontFaceIndex]} 
                    alt={`Yancie Front ${frontFaceIndex}`} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
              </div>

              {/* Back Face (Visible after 180deg flip) */}
              <div 
                className="absolute inset-0 w-full h-full backface-hidden overflow-hidden rounded-[inherit]"
                style={{ transform: "rotateY(180deg)" }}
              >
                <img 
                  src="https://github.com/yancie2/tupian/blob/eb1645650fd783375af23e565337d714f784ff31/%E9%A6%96%E5%9B%BE2.jpg?raw=true" 
                  alt="Yancie Back" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-[#10B981]/10 mix-blend-overlay" />
              </div>
            </motion.div>

            {/* Revealed Content 1 (Left Side) */}
            <motion.div 
              style={{ opacity: content1Opacity, y: content1Y }}
              className="absolute left-6 md:left-[10vw] top-[10vh] md:top-[30vh] max-w-[90vw] md:max-w-xl z-30 pointer-events-none"
            >
              <h2 className="text-[32px] md:text-[60px] font-black mb-6 md:mb-8 leading-tight text-[#1F2937]">
                让好的想法 <br />
                <span className="text-[#10B981]">真正发生.</span>
              </h2>
              <p className="text-[14px] md:text-[18px] text-[#6A7282] leading-relaxed mb-8 md:mb-10">
                从品牌策划到内容运营，我持续参与真实项目，<br className="hidden md:block" />
                在实践中学习如何把营销做好。
              </p>
              <div className="flex gap-6 pointer-events-auto">
                <a 
                  href="#work" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-[#10B981] text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold flex items-center gap-2 hover:bg-[#059669] transition-all shadow-lg shadow-emerald-500/20 text-sm md:text-base"
                >
                  精选案例 <ArrowRight size={20} />
                </a>
              </div>
            </motion.div>

            {/* Revealed Content 2 (Left Side - Switches in later) */}
            <motion.div 
              style={{ opacity: content2Opacity, y: content2Y }}
              className="absolute left-6 md:left-[10vw] top-[10vh] md:top-[30vh] max-w-[90vw] md:max-w-xl z-30 pointer-events-none"
            >
              <h2 className="text-[32px] md:text-[60px] font-black mb-6 md:mb-8 leading-tight text-[#1F2937]">
                学习 实践 <br />
                <span className="text-[#10B981]">成长</span>.
              </h2>
              <p className="text-[14px] md:text-[18px] text-[#6A7282] leading-relaxed mb-8 md:mb-10">
                在每一个项目中沉淀，在每一次实践中突破。我始终保持对新知识的渴望，通过不断的实战积累，实现从量变到质变的跨越。
              </p>
              <div className="flex gap-6 pointer-events-auto">
                <button className="border border-[#1F2937]/10 px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-[#1F2937] hover:bg-[#1F2937]/5 transition-all text-sm md:text-base">
                  关于我
                </button>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

const ExpertiseCard = ({ index, title, description, icon: Icon, totalCards }: any) => {
  const cardRef = useRef(null);
  
  // Track scroll progress of this specific card
  // "start start" means when the card hits the top of the viewport
  // "end start" means when the card's bottom hits the top of the viewport
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"]
  });

  // Stacking effect: Scale down and fade out as the next card comes up
  // Since it's sticky, this progress happens while it's "stuck" at the top
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.98]);

  // Number animation: slide up as the card enters the viewport
  const { scrollYProgress: entryProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start center"]
  });
  const numberY = useTransform(entryProgress, [0, 1], [100, 0]);
  const numberOpacity = useTransform(entryProgress, [0, 1], [0, 0.08]);

  return (
    <div ref={cardRef} className="h-[500px] md:h-[600px] w-full sticky top-[100px] md:top-[120px] mb-[60px] md:mb-[100px]">
      <motion.div
        style={{ 
          scale, 
          opacity,
          transformOrigin: "top center"
        }}
        className="h-full w-full bg-white rounded-[30px] md:rounded-[40px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.05)] p-8 md:p-16 flex flex-col justify-between overflow-hidden relative"
      >
        {/* Huge Gray Number Background */}
        <motion.span 
          style={{ y: numberY, opacity: numberOpacity }}
          className="absolute top-0 right-6 md:right-12 text-[120px] md:text-[240px] font-black text-gray-400 select-none pointer-events-none leading-none"
        >
          0{index + 1}
        </motion.span>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          <div className="w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-[#ECFDF5] flex items-center justify-center mb-6 md:mb-10">
            <Icon className="text-[#10B981]" size={32} />
          </div>
          <h3 className="text-[32px] md:text-[48px] font-black text-gray-900 mb-4 md:mb-8 tracking-tighter uppercase leading-none">
            {title}
          </h3>
          <p className="text-[16px] md:text-[20px] text-gray-500 max-w-xl leading-relaxed font-medium">
            {description}
          </p>
        </motion.div>

        <div className="flex justify-between items-end relative z-10">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 md:px-10 py-4 md:py-5 bg-gray-900 text-white rounded-full font-bold text-xs md:text-sm hover:bg-[#10B981] transition-colors shadow-lg shadow-gray-200"
          >
            Get！
          </motion.button>
          
          <div className="flex gap-3">
            {Array.from({ length: totalCards }).map((_, i) => (
              <div 
                key={i} 
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === index ? 'bg-[#10B981] w-8' : 'bg-gray-200'}`} 
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Expertise = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start center"]
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.8], [60, 0]);

  const expertise = [
    {
      title: "内容策略与种草策划",
      description: "基于内容的数据洞察制定策略与种草方案，围绕曝光、互动与转化目标设计完整传播路径。",
      icon: Layout,
    },
    {
      title: "达人协同与项目执行管理",
      description: "统筹达人合作与跨部门资源，推进项目高效落地，确保传播节奏与品牌表达一致。",
      icon: Palette,
    },
    {
      title: "数据分析与增长优化",
      description: "通过数据监测与 A/B 测试持续优化内容表现与投放效果，实现增长",
      icon: Zap,
    },
    {
      title: "社媒运营与 AI 内容生产",
      description: "负责矩阵账号运营，并通过 AI 工具提升内容生产效率与创意规模化能力。",
      icon: Send,
    }
  ];

  return (
    <section id="capabilities" ref={sectionRef} className="py-20 md:py-40 px-6 md:px-8 lg:px-24 max-w-6xl mx-auto">
      <motion.div 
        style={{ opacity: headerOpacity, y: headerY }}
        className="mb-20 md:mb-32 text-center"
      >
        <h2 className="text-[12px] md:text-[14px] font-bold tracking-[0.5em] text-[#10B981] uppercase mb-4 md:mb-6">
          CAPABILITIES
        </h2>
        <div className="inline-block text-right">
          <h3 className="text-[48px] md:text-[72px] font-black tracking-tighter leading-[0.85] bg-gradient-to-r from-gray-300 to-gray-800 bg-clip-text text-transparent">
            What I Do.
          </h3>
          <p className="text-[10px] md:text-[12px] text-gray-400 tracking-widest font-medium opacity-60 mt-2">
            我能做什么
          </p>
        </div>
      </motion.div>

      <div className="relative">
        {expertise.map((item, i) => (
          <ExpertiseCard 
            key={i} 
            index={i} 
            {...item} 
            totalCards={expertise.length} 
          />
        ))}
      </div>
    </section>
  );
};

const ProjectCard = ({ project }: any) => {
  const navigate = useNavigate();
  const mouseX = useSpring(0, { stiffness: 500, damping: 50 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 50 });

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left - width / 2) / 25;
    const y = (clientY - top - height / 2) / 25;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  const shadowX = useTransform(mouseX, (v) => `${v}px`);
  const shadowY = useTransform(mouseY, (v) => `${v}px`);
  const shadow = useTransform([shadowX, shadowY], ([x, y]) => `${x} ${y} 40px rgba(16, 185, 129, 0.15)`);

  return (
    <motion.div
      onClick={() => navigate(`/project/${project.id}`)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      // 渐进式唤醒动效
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      // 悬停反馈
      whileHover={{ 
        y: -15, 
        scale: 1.03,
        transition: { duration: 0.3, ease: "easeOut" } 
      }}
      style={{ boxShadow: shadow }}
      className="group relative h-[400px] md:h-[450px] w-[300px] md:w-[350px] overflow-hidden rounded-2xl bg-white flex-shrink-0 cursor-pointer"
    >
      {/* 图片区 */}
      <div className="h-[240px] md:h-[280px] w-full overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* 文字区 */}
      <div className="p-5 md:p-6">
        <span className="text-[10px] md:text-[12px] font-medium tracking-wider text-[#10B981] uppercase">
          {project.category}
        </span>
        <h3 className="mt-1 md:mt-2 text-[18px] md:text-[20px] font-bold text-[#1F2937]">
          {project.title}
        </h3>
        <p className="mt-1 md:mt-2 text-[12px] md:text-[14px] leading-relaxed text-[#6A7282]">
          {project.subtitle}
        </p>
      </div>
    </motion.div>
  );
};

const ProjectSection = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // 将垂直滚动进度 [0, 1] 映射为横向位移
  // 在移动端由于屏幕窄，需要移动的百分比更大
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-82%"]);

  return (
    <section id="work" ref={targetRef} className="relative h-[200vh] md:h-[300vh] bg-transparent">
      {/* Sticky 容器：让内容在滚动时保持在屏幕中心 */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-8 md:gap-12 px-6 md:px-24">
          
          {/* Section 标题区 */}
          <div className="flex flex-col justify-center min-w-[300px] md:min-w-[500px]">
            <h2 className="text-[40px] md:text-[60px] font-bold text-[#1F2937] leading-tight">
              精选案例 <br />
              <span className="text-[#10B981]">SELECTED WORK</span>
            </h2>
            <p className="mt-4 text-[16px] md:text-[18px] text-[#6A7282]">
              在品牌营销与内容创意中，探索商业与美学的平衡点。
            </p>
          </div>

          {/* 项目卡片流 */}
          {PROJECTS.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = PROJECTS.find(p => p.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPdfViewOpen, setIsPdfViewOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when PDF view is open
  useEffect(() => {
    if (isPdfViewOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isPdfViewOpen]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollPosition = scrollRef.current.scrollLeft;
      const width = scrollRef.current.offsetWidth;
      const index = Math.round(scrollPosition / width);
      if (index !== currentImageIndex) {
        setCurrentImageIndex(index);
      }
    }
  };

  const scrollToImage = (index: number) => {
    if (scrollRef.current) {
      const width = scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({
        left: width * index,
        behavior: 'smooth'
      });
      setCurrentImageIndex(index);
    }
  };

  useEffect(() => {
    // Reset scroll position when project changes
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
      setCurrentImageIndex(0);
    }
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">项目未找到</h2>
        <button 
          onClick={() => navigate('/')}
          className="bg-[#10B981] text-white px-6 py-2 rounded-full"
        >
          返回首页
        </button>
      </div>
    );
  }

  const images = project.images || [project.image];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-transparent pt-24 md:pt-32 pb-12 md:pb-20 px-6 md:px-8 lg:px-24"
    >
      <div className="max-w-5xl mx-auto">
        <motion.button 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#6A7282] hover:text-[#10B981] transition-colors mb-8 md:mb-12 font-medium"
        >
          <ArrowLeft size={20} /> 返回
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="rounded-[30px] md:rounded-[40px] overflow-hidden shadow-2xl relative aspect-[4/3] bg-gray-100 group/carousel"
          >
            <div 
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex overflow-x-auto snap-x snap-mandatory h-full no-scrollbar scroll-smooth"
            >
              {images.map((img, idx) => (
                <div key={idx} className="flex-shrink-0 w-full h-full snap-center">
                  <img 
                    src={img} 
                    alt={`${project.title} - ${idx + 1}`} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
            
            {/* Controls - Bottom Right */}
            <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 flex items-center gap-3 md:gap-4 z-10">
              {images.length > 1 && (
                <div className="flex gap-1.5 md:gap-2">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        scrollToImage(idx);
                      }}
                      className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all ${
                        idx === currentImageIndex ? "bg-white w-4 md:w-6" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              )}
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPdfViewOpen(true);
                }}
                className="flex items-center gap-1.5 md:gap-2 bg-white/20 backdrop-blur-md hover:bg-white/40 transition-all px-3 md:px-4 py-1.5 md:py-2 rounded-full text-yellow-200 text-[10px] md:text-xs font-bold border border-white/30"
              >
                <Maximize2 size={12} className="text-yellow-200" />
                展开图片
              </button>
            </div>
          </motion.div>

          {/* PDF View Overlay */}
          <AnimatePresence>
            {isPdfViewOpen && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[200] bg-black/95 overflow-y-auto no-scrollbar"
              >
                <div className="max-w-4xl mx-auto py-12 md:py-20 px-4 relative">
                  <button 
                    onClick={() => setIsPdfViewOpen(false)}
                    className="fixed top-6 right-6 md:top-8 md:right-8 z-[210] w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all border border-white/20"
                  >
                    <X size={20} md:size={24} />
                  </button>
                  
                  <div className="flex flex-col gap-4">
                    {images.map((img, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="w-full rounded-lg overflow-hidden shadow-2xl"
                      >
                        <img 
                          src={img} 
                          alt={`${project.title} - ${idx + 1}`} 
                          className="w-full h-auto"
                          referrerPolicy="no-referrer"
                        />
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="mt-8 md:mt-12 text-center">
                    <button 
                      onClick={() => setIsPdfViewOpen(false)}
                      className="bg-white/10 hover:bg-white/20 text-white px-6 md:px-8 py-2 md:py-3 rounded-full border border-white/20 transition-all font-bold text-sm md:text-base"
                    >
                      关闭预览
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className="text-[12px] md:text-[14px] font-bold tracking-[0.3em] text-[#34D399] uppercase mb-3 md:mb-4 block">
              {project.category}
            </span>
            <h1 className="text-[36px] md:text-[48px] lg:text-[64px] font-black text-[#1F2937] leading-none mb-6 md:mb-8 tracking-tighter">
              {project.title}
            </h1>
            <p className="text-[18px] md:text-[20px] text-[#1F2937] font-bold mb-4 md:mb-6 leading-tight">
              {project.subtitle}
            </p>
            <div className="w-16 md:w-20 h-1 bg-[#10B981] mb-8 md:mb-10" />
            <p className="text-[16px] md:text-[18px] text-[#6A7282] leading-relaxed mb-8 md:mb-12">
              {project.detailedDescription}
            </p>
            
            <div className="grid grid-cols-2 gap-6 md:gap-8 pt-6 md:pt-8 border-t border-gray-100">
              <div>
                <h4 className="text-[10px] md:text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-1 md:mb-2">项目年份</h4>
                <p className="font-bold text-[#1F2937] text-sm md:text-base">{project.year || "2025"}</p>
              </div>
              <div>
                <h4 className="text-[10px] md:text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-1 md:mb-2">服务内容</h4>
                <p className="font-bold text-[#1F2937] text-sm md:text-base">全案策划 / 执行</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const Contact = () => (
  <section id="contact" className="py-20 md:py-32 px-6 md:px-8 max-w-7xl mx-auto">
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white/70 backdrop-blur-3xl border border-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] rounded-[40px] md:rounded-[60px] p-10 md:p-16 lg:p-24 relative overflow-hidden"
    >
      <div className="absolute top-[-10%] right-[-10%] w-64 md:w-96 h-64 md:h-96 bg-[#10B981]/10 blur-[80px] md:blur-[100px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-48 md:w-64 h-48 md:h-64 bg-[#34D399]/5 blur-[60px] md:blur-[80px] rounded-full" />
      
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <h2 className="text-[32px] md:text-[48px] lg:text-[60px] font-black tracking-tighter mb-6 md:mb-8 text-[#1F2937]">
          让我们一起 <br /> 做有<span className="text-[#10B981]">意思</span>的事情
        </h2>
        <p className="text-[16px] md:text-[18px] text-[#6A7282] leading-relaxed mb-8 md:mb-12">
          时刻准备着提升自我、创造价值，和接受来自您的邀约。
        </p>
        <div className="flex flex-col items-center space-y-6">
          <a href="tel:18815910165" className="flex items-center gap-3 md:gap-4 text-xl md:text-2xl font-bold text-[#1F2937] hover:text-[#10B981] transition-colors group">
            <div className="w-12 h-12 md:w-14 md:h-14 border border-[#1F2937]/10 rounded-full flex items-center justify-center group-hover:bg-[#10B981] group-hover:text-white transition-all">
              <Phone size={20} md:size={24} />
            </div>
            18815910165
          </a>

          <a href="mailto:1607848677@qq.com" className="flex items-center gap-3 md:gap-4 text-xl md:text-2xl font-bold text-[#1F2937] hover:text-[#10B981] transition-colors group">
            <div className="w-12 h-12 md:w-14 md:h-14 border border-[#1F2937]/10 rounded-full flex items-center justify-center group-hover:bg-[#10B981] group-hover:text-white transition-all">
              <Mail size={20} md:size={24} />
            </div>
            1607848677@qq.com
          </a>

          <div className="flex gap-4 pt-2 md:pt-4">
            {[MessageCircle, Linkedin, Github].map((Icon, i) => (
              <a key={i} href="#" className="w-12 h-12 md:w-14 md:h-14 border border-[#1F2937]/10 rounded-full flex items-center justify-center hover:bg-[#10B981] hover:text-white transition-all text-[#1F2937] hover:scale-110">
                <Icon size={20} md:size={24} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  </section>
);

const Footer = () => (
  <footer className="py-12 px-6 md:px-8 border-t border-[#1F2937]/5">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 text-center md:text-left">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-[#10B981] rounded-full flex items-center justify-center">
          <div className="w-3 h-3 bg-white rounded-tr-full" />
        </div>
        <span className="font-black tracking-tighter text-[#1F2937]">YANCIE</span>
      </div>
      <p className="text-[#6A7282] text-xs md:text-sm">© 2026 Yancie. 保留所有权利。</p>
      <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-[10px] md:text-sm font-bold text-[#6A7282]">
        <a href="#" className="hover:text-[#10B981] transition-colors">隐私政策</a>
        <a href="#" className="hover:text-[#10B981] transition-colors">服务条款</a>
        <a href="#" className="hover:text-[#10B981] transition-colors">Cookie 设置</a>
      </div>
    </div>
  </footer>
);

const HomePage = () => (
  <>
    <Hero />
    <ProjectSection />
    <Expertise />
    <Contact />
  </>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="relative">
        {/* Background */}
        <div className="gradient-bg">
          <motion.div 
            initial={{ x: 0, y: 0, scale: 1 }}
            animate={{ 
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="blob blob-1" 
          />
          <motion.div 
            initial={{ x: 0, y: 0, scale: 1 }}
            animate={{ 
              x: [0, -120, 0],
              y: [0, -80, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="blob blob-2" 
          />
          <motion.div 
            initial={{ x: 0, y: 0, scale: 1 }}
            animate={{ 
              x: [0, 80, 0],
              y: [0, -100, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            className="blob blob-3" 
          />
        </div>

        <Navbar />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>

        <Footer />
      </div>
    </HashRouter>
  );
}


