/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "motion/react";
import { Mail, ArrowRight, Layout, Palette, Zap, Send, Github, Linkedin, MessageCircle, ArrowLeft, Phone } from "lucide-react";
import { HashRouter, Routes, Route, Link, useParams, useNavigate, useLocation } from "react-router-dom";

// --- Data ---

const PROJECTS = [
  {
    id: "liushen",
    category: "创意策划/ 内容营销",
    title: "六神品牌营销方案",
    subtitle: "小红书绿草计划特等奖项目，实现曝光增长582%",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071",
    images: [
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071",
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=2070",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2099",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070"
    ],
    detailedDescription: "该项目在小红书绿草计划中荣获特等奖。通过深度洞察年轻消费群体对‘清凉’与‘国货’的双重需求，我们策划了一系列跨界联名与内容种草活动。利用数据分析实时优化投放策略，最终实现了曝光量 582% 的惊人增长，成功将传统品牌推向潮流前线。"
  },
  {
    id: "zigui",
    category: "品牌策略 / 视觉设计",
    title: "秭归脐橙品牌重塑",
    subtitle: "融合屈原文化，打造具备地标属性的现代农产品牌",
    image: "https://images.unsplash.com/photo-1611080626919-7cf5a9caab53?q=80&w=2000",
    images: ["https://images.unsplash.com/photo-1611080626919-7cf5a9caab53?q=80&w=2000"],
    detailedDescription: "秭归脐橙作为具备深厚文化底蕴的地标产品，面临品牌形象老化的问题。我们深入挖掘屈原文化内涵，将其与现代审美相结合，进行了全方位的品牌重塑。从包装设计到社交媒体传播，打造了一个既有文化深度又具现代感的农产品牌，显著提升了产品的溢价能力和市场认可度。"
  },
  {
    id: "aranya",
    category: "内容规划 / 跨界联名",
    title: "aranya 阿那亚社媒内容矩阵",
    subtitle: "打造品牌精神与空间社区化深度结合的高质内容",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1787",
    images: ["https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1787"],
    detailedDescription: "阿那亚不仅仅是一个地理坐标，更是一种精神社区。我们为其构建了多维度的社媒内容矩阵，通过高质量的视觉呈现和深度的人文叙事，传递‘人生可以更美’的品牌理念。通过跨界联名和社群运营，增强了用户粘性，实现了品牌精神与空间社区化运营的深度结合。"
  },
  {
    id: "ongoing",
    category: "更多项目实践",
    title: "正在进行中......",
    subtitle: "把经历变成能力。",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2070",
    images: ["https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2070"],
    detailedDescription: "更多精彩项目正在筹备中。我们始终坚持‘把经历变成能力’的原则，在每一个新项目中探索创意的边界，致力于为客户创造持久的商业价值和品牌影响力。敬请期待。"
  }
];

// --- Components ---

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
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

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-[100] px-8 py-6 flex justify-between items-center bg-white/90 backdrop-blur-md border-b border-black/5"
    >
      <div 
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => {
          if (location.pathname !== "/") navigate("/");
          else window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <div className="w-8 h-8 bg-[#4F39F6] rounded-full flex items-center justify-center">
          <div className="w-4 h-4 bg-white rounded-tr-full" />
        </div>
        <span className="font-black text-xl tracking-tighter text-[#1F2937]">YANCIE</span>
      </div>
      <div className="hidden md:flex items-center gap-10 text-sm font-medium text-[#6A7282]">
        {[
          { en: "About", zh: "关于", id: "about" },
          { en: "Capabilities", zh: "能力", id: "capabilities" },
          { en: "Selected Work", zh: "案例", id: "work" }
        ].map((item) => (
          <a 
            key={item.en} 
            href={`#${item.id}`} 
            onClick={(e) => handleNavClick(e, item.id)}
            className="hover:text-[#4F39F6] transition-colors flex flex-col items-center group"
          >
            <span className="text-[10px] font-bold tracking-widest text-[#A855F7] mb-0.5">
              {item.zh}
            </span>
            <span className="tracking-tight">
              {item.en}
            </span>
          </a>
        ))}
      </div>
      <a 
        href="#contact" 
        onClick={(e) => handleNavClick(e, "contact")}
        className="bg-[#4F39F6] text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-[#3D2BCF] transition-all shadow-lg shadow-indigo-500/20"
      >
        Contact Me
      </a>
    </motion.nav>
  );
};

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
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

  // Card Transformations
  const scale = useTransform(smoothProgress, [0, 0.4, 0.85, 1], [0.85, 0.75, 0.75, 0.6]);
  const x = useTransform(smoothProgress, [0, 0.4], ["0%", "42%"]);
  const y = useTransform(smoothProgress, [0, 0.4, 0.85, 1], ["0%", "-5%", "-5%", "20%"]);
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

  return (
    <section id="about" ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden perspective-[2000px]">
        
        {/* Initial Hero Text - Left Side */}
        <motion.div 
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ opacity: initialTextOpacity, x: initialTextXLeft }}
          className="absolute left-[12%] lg:left-[18%] z-30 text-left hidden md:block"
        >
          <h1 className="text-[90px] lg:text-[120px] font-black leading-none tracking-tighter text-[#1F2937]">
            Ideas.
          </h1>
        </motion.div>

        {/* Initial Hero Text - Right Side */}
        <motion.div 
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ opacity: initialTextOpacity, x: initialTextXRight }}
          className="absolute right-[2%] lg:right-[4%] z-30 text-left hidden md:block -translate-y-12"
        >
          <h1 className="text-[90px] lg:text-[120px] font-black leading-none tracking-tighter text-[#1F2937]">
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
            <img 
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1200&auto=format&fit=crop" 
              alt="Yancie Front" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Back Face (Visible after 180deg flip) */}
          <div 
            className="absolute inset-0 w-full h-full backface-hidden overflow-hidden rounded-[inherit]"
            style={{ transform: "rotateY(180deg)" }}
          >
            <img 
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop" 
              alt="Yancie Back" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-[#4F39F6]/10 mix-blend-overlay" />
          </div>
        </motion.div>

        {/* Revealed Content 1 (Left Side) */}
        <motion.div 
          style={{ opacity: content1Opacity, y: content1Y }}
          className="absolute left-[10vw] top-[30vh] max-w-xl z-30 pointer-events-none"
        >
          <h2 className="text-[60px] font-black mb-8 leading-tight text-[#1F2937]">
            让好的想法 <br />
            <span className="text-[#4F39F6]">真正发生.</span>
          </h2>
          <p className="text-[18px] text-[#6A7282] leading-relaxed mb-10">
            从品牌策划到内容运营，我持续参与真实项目，<br />
            在实践中学习如何把营销做好。
          </p>
          <div className="flex gap-6 pointer-events-auto">
            <a 
              href="#work" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-[#4F39F6] text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-[#3D2BCF] transition-all shadow-lg shadow-indigo-500/20"
            >
              精选案例 <ArrowRight size={20} />
            </a>
          </div>
        </motion.div>

        {/* Revealed Content 2 (Left Side - Switches in later) */}
        <motion.div 
          style={{ opacity: content2Opacity, y: content2Y }}
          className="absolute left-[10vw] top-[30vh] max-w-xl z-30 pointer-events-none"
        >
          <h2 className="text-[60px] font-black mb-8 leading-tight text-[#1F2937]">
            学习 实践 <br />
            <span className="text-[#4F39F6]">成长</span>.
          </h2>
          <p className="text-[18px] text-[#6A7282] leading-relaxed mb-10">
            在每一个项目中沉淀，在每一次实践中突破。我始终保持对新知识的渴望，通过不断的实战积累，实现从量变到质变的跨越。
          </p>
          <div className="flex gap-6 pointer-events-auto">
            <button className="border border-[#1F2937]/10 px-8 py-4 rounded-full font-bold text-[#1F2937] hover:bg-[#1F2937]/5 transition-all">
              关于我
            </button>
          </div>
        </motion.div>
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
    <div ref={cardRef} className="h-[600px] w-full sticky top-[120px] mb-[100px]">
      <motion.div
        style={{ 
          scale, 
          opacity,
          transformOrigin: "top center"
        }}
        className="h-full w-full bg-white rounded-[40px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.05)] p-16 flex flex-col justify-between overflow-hidden relative"
      >
        {/* Huge Gray Number Background */}
        <motion.span 
          style={{ y: numberY, opacity: numberOpacity }}
          className="absolute top-0 right-12 text-[240px] font-black text-gray-400 select-none pointer-events-none leading-none"
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
          <div className="w-20 h-20 rounded-3xl bg-[#F5F3FF] flex items-center justify-center mb-10">
            <Icon className="text-[#A855F7]" size={40} />
          </div>
          <h3 className="text-[48px] font-black text-gray-900 mb-8 tracking-tighter uppercase leading-none">
            {title}
          </h3>
          <p className="text-[20px] text-gray-500 max-w-xl leading-relaxed font-medium">
            {description}
          </p>
        </motion.div>

        <div className="flex justify-between items-end relative z-10">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 bg-gray-900 text-white rounded-full font-bold text-sm hover:bg-[#A855F7] transition-colors shadow-lg shadow-gray-200"
          >
            Get！
          </motion.button>
          
          <div className="flex gap-3">
            {Array.from({ length: totalCards }).map((_, i) => (
              <div 
                key={i} 
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === index ? 'bg-[#A855F7] w-8' : 'bg-gray-200'}`} 
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
    <section id="capabilities" ref={sectionRef} className="py-40 px-8 lg:px-24 max-w-6xl mx-auto">
      <motion.div 
        style={{ opacity: headerOpacity, y: headerY }}
        className="mb-32 text-center"
      >
        <h2 className="text-[14px] font-bold tracking-[0.5em] text-[#A855F7] uppercase mb-6">
          CAPABILITIES
        </h2>
        <div className="inline-block text-right">
          <h3 className="text-[72px] font-black tracking-tighter leading-[0.85] bg-gradient-to-r from-gray-300 to-gray-800 bg-clip-text text-transparent">
            What I Do.
          </h3>
          <p className="text-[12px] text-gray-400 tracking-widest font-medium opacity-60 mt-2">
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
  const shadow = useTransform([shadowX, shadowY], ([x, y]) => `${x} ${y} 40px rgba(79, 57, 246, 0.15)`);

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
      className="group relative h-[450px] w-[350px] overflow-hidden rounded-2xl bg-white flex-shrink-0 cursor-pointer"
    >
      {/* 图片区 */}
      <div className="h-[280px] w-full overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* 文字区 */}
      <div className="p-6">
        <span className="text-[12px] font-medium tracking-wider text-[#4F39F6] uppercase">
          {project.category}
        </span>
        <h3 className="mt-2 text-[20px] font-bold text-[#1F2937]">
          {project.title}
        </h3>
        <p className="mt-2 text-[14px] leading-relaxed text-[#6A7282]">
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

  // 将垂直滚动进度 [0, 1] 映射为横向位移 [-10%, -75%]
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

  return (
    <section id="work" ref={targetRef} className="relative h-[300vh] bg-white">
      {/* Sticky 容器：让内容在滚动时保持在屏幕中心 */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-12 px-24">
          
          {/* Section 标题区 */}
          <div className="flex flex-col justify-center min-w-[500px]">
            <h2 className="text-[60px] font-bold text-[#1F2937] leading-tight">
              精选案例 <br />
              <span className="text-[#4F39F6]">SELECTED WORK</span>
            </h2>
            <p className="mt-4 text-[18px] text-[#6A7282]">
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

  useEffect(() => {
    if (project && project.images && project.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">项目未找到</h2>
        <button 
          onClick={() => navigate('/')}
          className="bg-[#4F39F6] text-white px-6 py-2 rounded-full"
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
      className="min-h-screen bg-white pt-32 pb-20 px-8 lg:px-24"
    >
      <div className="max-w-5xl mx-auto">
        <motion.button 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#6A7282] hover:text-[#4F39F6] transition-colors mb-12 font-medium"
        >
          <ArrowLeft size={20} /> 返回
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
            className="rounded-[40px] overflow-hidden shadow-2xl relative aspect-[4/3] bg-gray-100 cursor-pointer group/carousel"
          >
            <AnimatePresence mode="wait">
              <motion.img 
                key={currentImageIndex}
                src={images[currentImageIndex]} 
                alt={`${project.title} - ${currentImageIndex + 1}`} 
                initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                transition={{ 
                  duration: 1.2,
                  ease: [0.4, 0, 0.2, 1] 
                }}
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
            
            {/* Click hint overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover/carousel:bg-black/5 transition-colors flex items-center justify-center">
              <div className="opacity-0 group-hover/carousel:opacity-100 transition-opacity bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-bold border border-white/30">
                点击切换图片
              </div>
            </div>
            
            {/* Dots indicator */}
            {images.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentImageIndex ? "bg-white w-6" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>

          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className="text-[14px] font-bold tracking-[0.3em] text-[#A855F7] uppercase mb-4 block">
              {project.category}
            </span>
            <h1 className="text-[48px] lg:text-[64px] font-black text-[#1F2937] leading-none mb-8 tracking-tighter">
              {project.title}
            </h1>
            <p className="text-[20px] text-[#1F2937] font-bold mb-6 leading-tight">
              {project.subtitle}
            </p>
            <div className="w-20 h-1 bg-[#4F39F6] mb-10" />
            <p className="text-[18px] text-[#6A7282] leading-relaxed mb-12">
              {project.detailedDescription}
            </p>
            
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-100">
              <div>
                <h4 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-2">项目年份</h4>
                <p className="font-bold text-[#1F2937]">2025 - 2026</p>
              </div>
              <div>
                <h4 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-2">服务内容</h4>
                <p className="font-bold text-[#1F2937]">全案策划 / 执行</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const Contact = () => (
  <section id="contact" className="py-32 px-8 max-w-7xl mx-auto">
    <div className="bg-[#F9FAFB] border border-[#1F2937]/5 rounded-[60px] p-16 lg:p-24 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-[#4F39F6]/5 blur-[100px] rounded-full" />
      
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-[48px] lg:text-[60px] font-black tracking-tighter mb-8 text-[#1F2937]">
          让我们打造 <br /> 一些 <span className="text-[#4F39F6]">非凡</span> 的作品。
        </h2>
        <p className="text-[18px] text-[#6A7282] leading-relaxed mb-12">
          准备好提升您的数字影响力了吗？我目前正在接受 2026 年第三季度的新项目预约。
        </p>
        <div className="flex flex-col items-center space-y-6">
          <a href="tel:18815910165" className="flex items-center gap-4 text-2xl font-bold text-[#1F2937] hover:text-[#4F39F6] transition-colors group">
            <div className="w-14 h-14 border border-[#1F2937]/10 rounded-full flex items-center justify-center group-hover:bg-[#4F39F6] group-hover:text-white transition-all">
              <Phone size={24} />
            </div>
            18815910165
          </a>

          <a href="mailto:1607848677@qq.com" className="flex items-center gap-4 text-2xl font-bold text-[#1F2937] hover:text-[#4F39F6] transition-colors group">
            <div className="w-14 h-14 border border-[#1F2937]/10 rounded-full flex items-center justify-center group-hover:bg-[#4F39F6] group-hover:text-white transition-all">
              <Mail size={24} />
            </div>
            1607848677@qq.com
          </a>

          <div className="flex gap-4 pt-4">
            {[MessageCircle, Linkedin, Github].map((Icon, i) => (
              <a key={i} href="#" className="w-14 h-14 border border-[#1F2937]/10 rounded-full flex items-center justify-center hover:bg-[#4F39F6] hover:text-white transition-all text-[#1F2937] hover:scale-110">
                <Icon size={24} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 px-8 border-t border-[#1F2937]/5">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-[#4F39F6] rounded-full flex items-center justify-center">
          <div className="w-3 h-3 bg-white rounded-tr-full" />
        </div>
        <span className="font-black tracking-tighter text-[#1F2937]">YANCIE</span>
      </div>
      <p className="text-[#6A7282] text-sm">© 2026 Yancie. 保留所有权利。</p>
      <div className="flex gap-8 text-sm font-bold text-[#6A7282]">
        <a href="#" className="hover:text-[#4F39F6] transition-colors">隐私政策</a>
        <a href="#" className="hover:text-[#4F39F6] transition-colors">服务条款</a>
        <a href="#" className="hover:text-[#4F39F6] transition-colors">Cookie 设置</a>
      </div>
    </div>
  </footer>
);

const HomePage = () => (
  <>
    <Hero />
    <Expertise />
    <ProjectSection />
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
            animate={{ 
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="blob blob-1" 
          />
          <motion.div 
            animate={{ 
              x: [0, -100, 0],
              y: [0, -50, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="blob blob-2" 
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


