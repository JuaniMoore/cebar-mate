"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Info } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type GameState = "INICIO" | "FASE_YERBA" | "FASE_AGUA" | "FASE_CEBADO" | "RESULTADOS" | "ESTADO_HERETICO";

// ==========================================
// COMPONENTE: INSTRUCCIONES (TUTORIAL)
// ==========================================
const TutorialOverlay = ({ title, description, onStart }: { title: string, description: string, onStart: () => void }) => {
   const [canClick, setCanClick] = useState(false);
   
   useEffect(() => {
     const t = setTimeout(() => setCanClick(true), 1200);
     return () => clearTimeout(t);
   }, []);

   return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md bg-slate-900/80 rounded-[2rem]">
          <motion.div initial={{ scale: 0.8, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-slate-800 border-4 border-cyan-400 rounded-3xl p-6 w-full max-w-sm text-center shadow-2xl relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl"></div>
              <Info className="w-12 h-12 text-cyan-400 mx-auto mb-2" />
              <h2 className="text-4xl font-bangers text-white mb-4 drop-shadow-md">{title}</h2>
              <p className="text-lg font-sans font-medium text-slate-300 mb-8 leading-snug">{description}</p>
              <button 
                 onClick={() => { if(canClick) onStart(); }}
                 className={cn(
                    "w-full py-4 text-slate-900 font-bangers text-3xl rounded-xl transition-all",
                    canClick 
                      ? "bg-gradient-to-r from-cyan-400 to-cyan-600 shadow-[0_6px_0_0_#0891b2] active:translate-y-[6px] active:shadow-none" 
                      : "bg-slate-500 opacity-60 shadow-none translate-y-[6px] cursor-not-allowed text-stone-300"
                 )}
              >
                 {canClick ? "¡ENTENDIDO!" : "..."}
              </button>
          </motion.div>
      </motion.div>
   );
}


// ==========================================
// FASE 1: INICIO
// ==========================================
const Inicio = ({ onStart }: { onStart: () => void }) => {
   return (
      <motion.div 
         initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
         className="flex flex-col items-center justify-center flex-1 h-full px-6 text-center z-10 w-full relative"
      >
         {/* Fondo Imagen De Paul Caricatura */}
         <div className="absolute inset-0 -z-10 rounded-[2rem] overflow-hidden">
             <img src="/images/depaul_bg.png" alt="De Paul Background" className="w-full h-full object-cover opacity-40 mix-blend-screen scale-110 object-top" />
             <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-[#0B1E36] via-[#0B1E36]/80 to-transparent" />
         </div>

         <motion.div 
            animate={{ y: [0, -10, 0] }} 
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
         >
            <div className="relative w-32 h-32 mb-6 drop-shadow-[0_0_20px_rgba(74,222,128,0.6)] flex items-center justify-center bg-slate-900/40 rounded-full border-[4px] border-green-500 p-4 backdrop-blur-md">
               <Coffee className="w-full h-full text-green-400" />
            </div>
         </motion.div>
         
         <h1 className="text-6xl font-bangers text-white uppercase tracking-wider mb-2 drop-shadow-[0_5px_15px_rgba(0,0,0,1)] leading-tight w-full bg-black/30 py-4 px-2 rounded-3xl border border-white/10 backdrop-blur-sm">
            El Mate de
            <span className="block text-cyan-300 text-[80px] -rotate-2 hover:rotate-0 transition-transform mt-2">De Paul</span>
         </h1>
         
         <p className="text-xl font-sans font-medium text-slate-300 mb-10 mx-auto leading-relaxed bg-black/60 px-6 py-2 rounded-xl mt-6 shadow-xl border border-slate-700">
            ¿Tenés lo necesario para cebar un mate nivel Scaloneta?
         </p>
         
         <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="w-full max-w-sm py-6 bg-gradient-to-b from-green-400 to-green-600 rounded-2xl font-bangers text-4xl text-slate-900 shadow-[0_8px_0_0_#14532d] active:shadow-[0_0px_0_0_#14532d] active:translate-y-[8px] select-none touch-manipulation transition-all outline-none z-20"
         >
            ¡CEBARLE AL 10!
         </motion.button>
      </motion.div>
   )
}

// ==========================================
// FASE 2: YERBA
// ==========================================
const FaseYerba = ({ onComplete }: { onComplete: (clicks: number) => void }) => {
   const [showTutorial, setShowTutorial] = useState(true);
   const [clicks, setClicks] = useState(0);
   const [timeLeft, setTimeLeft] = useState(4);
   const clicksRef = useRef(0);

   useEffect(() => {
     if (showTutorial) return;
     const t = setInterval(() => {
        setTimeLeft(prev => Math.max(0, prev - 1));
     }, 1000);
     return () => clearInterval(t);
   }, [showTutorial]);

   useEffect(() => {
     if (showTutorial) return;
     const timer = setTimeout(() => {
         onComplete(clicksRef.current);
     }, 4000);
     return () => clearTimeout(timer);
   }, [showTutorial, onComplete]);

   const handleClick = () => {
     if (showTutorial) return;
     if (clicksRef.current >= 25) return;
     clicksRef.current += 1;
     setClicks(clicksRef.current);
   };

   return (
      <div className="flex-1 w-full h-full relative flex flex-col">
         <AnimatePresence>
            {showTutorial && (
               <TutorialOverlay 
                  title="Fase 1: La Yerba" 
                  description="¡Hacé spam-click sobre la calabaza lo más rápido que puedas para armar una buena montañita! Tenés 4 segundos." 
                  onStart={() => setShowTutorial(false)} 
               />
            )}
         </AnimatePresence>

         <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center flex-1 h-full pt-8 select-none z-10 w-full relative">
           <h2 className="text-5xl font-bangers mb-2 text-center text-white drop-shadow-md">¡Sacudí la Yerba!</h2>
           <p className="text-3xl font-bangers text-yellow-300 bg-black/40 px-6 py-2 rounded-full mb-8 shadow-inner tracking-widest border border-yellow-800">
              {timeLeft}s
           </p>

           <div className="flex-1 flex flex-col items-center justify-center w-full relative pt-10">
               <motion.button
                  className="relative w-48 h-56 bg-amber-700/90 rounded-b-[4rem] rounded-t-lg border-[8px] border-amber-950 flex flex-col justify-end overflow-visible shadow-[inset_0_-15px_30px_rgba(0,0,0,0.6),0_15px_30px_rgba(0,0,0,0.5)] mx-auto touch-manipulation z-20 outline-none"
                  whileTap={{ scale: 0.9, rotate: (Math.random() * 20 - 10) }}
                  onPointerDown={handleClick}
               >
                  <div className="absolute -top-20 right-[15px] w-6 h-[140px] bg-gradient-to-r from-slate-300 to-slate-400 rotate-[20deg] rounded-full border-4 border-slate-600 shadow-xl -z-10 origin-bottom" />
                  <div className="absolute top-[-8px] -left-2 -right-2 h-6 bg-slate-700 rounded-lg border-b-4 border-slate-900 shadow-xl z-20" />
                  <div className="w-full relative h-[90%] rounded-b-[3.5rem] overflow-hidden flex flex-col justify-end pt-4 bg-amber-950">
                      <div 
                        className="w-full bg-gradient-to-t from-green-500 to-green-400 transition-all duration-75 ease-out"
                        style={{ height: `${Math.min(100, (clicks / 25) * 100)}%` }} 
                      />
                  </div>
                  <span className="absolute inset-x-0 bottom-16 flex items-center justify-center z-30 text-5xl font-bangers text-white drop-shadow-[0_4px_0_rgba(0,0,0,0.8)] pointer-events-none -rotate-12 uppercase select-none">
                     TAP!
                  </span>
               </motion.button>
           </div>
           
           <div className="w-full bg-slate-900/90 p-6 rounded-t-[2rem] mt-auto border-t-2 border-slate-700 shadow-[0_-5px_15px_rgba(0,0,0,0.5)] z-20">
               <p className="text-3xl font-bangers text-center text-white">Montañita: <span className={clicks >= 25 ? "text-green-400" : "text-cyan-400"}>{clicks >= 25 ? "25 (MAX)" : clicks}</span></p>
               <div className="w-full bg-slate-800 h-5 rounded-full mt-4 overflow-hidden shadow-inner border-2 border-slate-950">
                  <div className="bg-gradient-to-r from-cyan-500 to-cyan-300 h-full transition-all duration-200" style={{ width: `${Math.min(100, (clicks / 25) * 100)}%` }} />
               </div>
           </div>
         </motion.div>
      </div>
   );
}

// ==========================================
// FASE 3: AGUA
// ==========================================
const FaseAgua = ({ onComplete, onFail }: { onComplete: (temp: number) => void, onFail: () => void }) => {
  const [showTutorial, setShowTutorial] = useState(true);
  const [temp, setTemp] = useState(50);
  const [locked, setLocked] = useState(false);
  const tempRef = useRef(50);
  const lockedRef = useRef(false);

  useEffect(() => {
     lockedRef.current = locked;
  }, [locked]);

  useEffect(() => {
     if (showTutorial) return;
     let start = performance.now();
     let raf: number;
     const tick = (time: number) => {
        if (lockedRef.current) {
            cancelAnimationFrame(raf);
            return;
        }
        const elapsed = time - start;
        const speedMultiplier = 0.0022; 
        const progress = (Math.sin(elapsed * speedMultiplier) + 1) / 2; // 0 to 1 
        const current = 50 + progress * 50;
        tempRef.current = current;
        setTemp(Math.round(current));
        
        if (!lockedRef.current) {
           raf = requestAnimationFrame(tick);
        }
     };
     raf = requestAnimationFrame(tick);
     return () => cancelAnimationFrame(raf);
  }, [showTutorial]);

  const handleStop = () => {
    if (showTutorial || locked) return;
    setLocked(true);
    const finalTemp = Math.round(tempRef.current);
    
    setTimeout(() => {
       if (finalTemp === 100) {
          onFail();
       } else {
          onComplete(finalTemp);
       }
    }, 1500);
  };

  const isPerfect = temp >= 74 && temp <= 82;

  return (
    <div className="flex-1 w-full h-full relative flex flex-col">
       <AnimatePresence>
          {showTutorial && (
             <TutorialOverlay 
                title="Fase 2: El Agua" 
                description="¡Toca '¡PARÁ!' cuando el agua esté en la zona verde (74°-82°)! Si la dejás hervir, el mate pierde." 
                onStart={() => setShowTutorial(false)} 
             />
          )}
       </AnimatePresence>
       
       <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex flex-col items-center flex-1 h-full justify-center w-full px-6 z-10 pt-4 relative">
          
          <AnimatePresence>
             {locked && (
                <motion.div 
                   initial={{scale: 0.5, opacity: 0, y: 50}} 
                   animate={{scale: 1, opacity: 1, y: 0}} 
                   className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
                >
                   <div className={cn("text-[80px] font-bangers drop-shadow-[0_0_20px_rgba(0,0,0,0.8)] px-8 py-2 rounded-3xl border-[6px] rotate-[-8deg] shadow-2xl", 
                        temp === 100 ? "bg-red-600 text-white border-red-900" :
                        isPerfect ? "bg-green-500 text-white border-green-800" :
                        "bg-yellow-400 text-slate-900 border-yellow-700"
                      )}
                   >
                     {temp === 100 ? "¡HERVIDO!" : isPerfect ? "¡PERFECTA!" : (temp < 70 ? "¡HELADA!" : "¡ZAFFA!")}
                   </div>
                </motion.div>
             )}
          </AnimatePresence>

          <h2 className="text-5xl font-bangers mb-4 text-center text-white drop-shadow-md">¡Calentá el Agua!</h2>
          
          <div className="flex-1 flex items-center justify-center w-full mt-4 mb-2 relative">
             
             {/* Termómetro Vertical Clásico Flotante */}
             <div className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-[250px] bg-slate-50 rounded-t-full border-[4px] border-slate-700 shadow-[0_15px_30px_rgba(0,0,0,0.6)] flex flex-col justify-end p-0.5 z-20">
                <div className="absolute inset-x-0 bg-green-500/30 border-y-2 border-green-600 rounded-sm shadow-[0_0_15px_rgba(74,222,128,0.4)] z-0" style={{ bottom: '48%', height: '16%' }} />
                <div className="w-full bg-red-600 rounded-t-full transition-all duration-[20ms] z-10 flex flex-col justify-start" style={{ height: `${((temp - 50) / 50) * 100}%` }}>
                   <div className="w-full h-3 bg-red-400 rounded-t-full opacity-60"></div>
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-red-600 rounded-full border-[6px] border-slate-700 shadow-[inset_-5px_-5px_15px_rgba(0,0,0,0.5),0_10px_20px_rgba(0,0,0,0.5)] z-20">
                   <div className="absolute top-2 left-2 w-4 h-4 bg-red-400 rounded-full opacity-60" />
                </div>
                <div className="absolute inset-y-6 right-[120%] w-10 flex flex-col justify-between font-bangers text-[22px] text-white drop-shadow-[0_2px_2px_rgba(0,0,0,1)] items-end pr-2 opacity-90 z-10">
                   <span>100</span>
                   <span className="text-green-300 drop-shadow-[0_0_5px_#4ade80]">80</span>
                   <span className="text-cyan-300">50</span>
                </div>
                <div className="absolute inset-y-6 left-0 right-0 pointer-events-none z-10 flex flex-col justify-between opacity-50">
                    <div className="w-full border-b border-black h-1"></div>
                    <div className="w-3/4 border-b border-black h-1 mx-auto"></div>
                    <div className="w-full border-b border-black h-1"></div>
                    <div className="w-3/4 border-b border-black h-1 mx-auto"></div>
                    <div className="w-full border-b border-black h-1"></div>
                </div>
             </div>

             {/* Pava Eléctrica Clásica ATMA Gris/Crema en el centro */}
             <div className="relative w-56 h-[17rem] bg-slate-200 rounded-b-[2rem] rounded-tl-[4rem] rounded-tr-[3rem] border-[8px] border-slate-800 shadow-[inset_-20px_0_30px_rgba(0,0,0,0.2),0_20px_30px_rgba(0,0,0,0.5)] flex flex-col items-center pb-4 pt-10 ml-12">
                <div className="absolute -top-[6px] w-[90%] left-[5%] h-10 bg-slate-900 rounded-t-[3rem] border-x-8 border-t-8 border-slate-950 z-10 flex justify-center shadow-lg">
                    <div className="w-16 h-4 bg-slate-800 rounded-full mt-1 border-b-2 border-slate-950 shadow-inner"></div>
                </div>
                <div className="absolute top-10 -right-[4.5rem] w-24 h-[12rem] bg-slate-900 border-[12px] border-slate-950 rounded-r-[3rem] -z-10 shadow-xl" />
                <div className="absolute top-12 -left-[3rem] w-16 h-12 bg-slate-300 border-[8px] border-slate-800 rounded-l-[1rem] rotate-[-15deg] -z-10 shadow-lg clipping" />

                <div className="absolute right-6 top-8 bottom-6 w-10 bg-slate-800 rounded-full border-[4px] border-slate-900 relative overflow-hidden flex flex-col justify-end shadow-[inset_0_10px_20px_rgba(0,0,0,0.8)] z-20">
                   <div className="absolute inset-0 flex flex-col-reverse">
                      <div className="w-full bg-cyan-500" style={{height: '50%'}}></div>
                      <div className="w-full bg-green-500 shadow-[inset_0_0_15px_rgba(255,255,255,0.7)]" style={{height: '16%'}}></div>
                      <div className="w-full bg-orange-500" style={{height: '32%'}}></div>
                      <div className="w-full bg-red-600 shadow-[inset_0_-10px_20px_rgba(0,0,0,0.9)]" style={{height: '2%'}}></div>
                   </div>
                   <div 
                      className="absolute left-0 right-0 h-1.5 bg-yellow-300 shadow-[0_0_15px_#fef08a] z-10 transition-all duration-[20ms]"
                      style={{ bottom: `${((temp - 50) / 50) * 100}%` }}
                   ></div>
                </div>
                <div className="absolute -bottom-6 w-[120%] h-12 bg-slate-900 rounded-[2rem] border-b-[8px] border-slate-950 shadow-[0_20px_30px_rgba(0,0,0,0.8)] z-30 flex items-center justify-center">
                   <div className="w-16 h-2 bg-red-600/80 rounded-full shadow-[0_0_15px_#ef4444] animate-pulse" />
                   <div className="absolute top-1/2 -right-10 w-16 h-4 bg-slate-950 rounded-full" />
                </div>
             </div>
          </div>

          <div className="w-full flex items-center justify-center mb-6 mt-6 z-40">
             <div className="text-[75px] leading-none font-bangers text-center w-full max-w-[250px] bg-slate-900/90 pb-2 pt-4 rounded-[2rem] border-4 border-slate-700 shadow-[0_5px_20px_rgba(0,0,0,0.8)] text-white relative">
               {temp}°
             </div>
          </div>

          <button
             onPointerDown={handleStop}
             disabled={locked}
             className={cn("w-full max-w-sm py-6 text-white font-bangers text-4xl rounded-2xl active:translate-y-[8px] select-none touch-manipulation transition-all outline-none", locked ? "bg-slate-600 border-b-[8px] border-slate-800 translate-y-[8px] shadow-none" : "bg-red-500 border-b-[8px] border-red-700 shadow-[0_8px_20px_rgba(0,0,0,0.4)] active:border-b-0 active:shadow-none")}
          >
             {locked ? "¡FRENADO!" : "¡PARÁ PAPÁ!"}
          </button>
       </motion.div>
    </div>
  );
}

// ==========================================
// FASE 4: CEBADO (Vista Cenital de Mate REDONDO)
// ==========================================
const FaseCebado = ({ onComplete }: { onComplete: (cebado: number, lavado: number) => void }) => {
  const [showTutorial, setShowTutorial] = useState(true);
  const [timeLeft, setTimeLeft] = useState(8);
  const [pouring, setPouring] = useState(false);
  const [isPerfect, setIsPerfect] = useState(false);
  
  const [spoutPos, setSpoutPos] = useState(50); 
  const targetMin = 50; 
  const targetMax = 80;

  const cebadoRef = useRef(0);
  const lavadoRef = useRef(0);
  const pouringRef = useRef(false);

  useEffect(() => {
    pouringRef.current = pouring;
  }, [pouring]);

  useEffect(() => {
     if (showTutorial) return;
     const duration = 8;
     let start = performance.now();
     let raf: number;
     const tick = (time: number) => {
        const elapsedSecs = (time - start) / 1000;
        if (elapsedSecs >= duration) {
           onComplete(cebadoRef.current, lavadoRef.current);
           return;
        }
        setTimeLeft(duration - Math.floor(elapsedSecs));

        const progress = (Math.sin(elapsedSecs * 2.5) + 1) / 2;
        const currentPosPercentage = progress * 100;
        setSpoutPos(currentPosPercentage);

        const hittingTarget = currentPosPercentage >= targetMin && currentPosPercentage <= targetMax;
        
        setIsPerfect(pouringRef.current && hittingTarget);

        if (pouringRef.current) {
            if (hittingTarget) {
                cebadoRef.current += 1;
            } else {
                lavadoRef.current += 1;
            }
        }
        
        raf = requestAnimationFrame(tick);
     };

     raf = requestAnimationFrame(tick);
     return () => cancelAnimationFrame(raf);
  }, [showTutorial, onComplete]);

  return (
    <div className="flex-1 w-full h-full relative flex flex-col">
       <AnimatePresence>
          {showTutorial && (
             <TutorialOverlay 
                title="Fase 3: Serví el Mate" 
                description="Vista desde arriba. Mantené apretado para verter SÓLO cuando apuntes al hueco oscuro 'Pocito'. ¡No mojes la yerba!" 
                onStart={() => setShowTutorial(false)} 
             />
          )}
       </AnimatePresence>

       <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center flex-1 h-full pt-8 select-none w-full px-4 sm:px-6 relative z-10">
         <h2 className="text-5xl font-bangers mb-2 text-center text-white drop-shadow">¡Serví el Mate!</h2>
         <div className="text-3xl font-bangers tracking-widest text-yellow-300 drop-shadow mb-4">{timeLeft}s</div>
         
         <div className="h-10 mb-2 flex items-center justify-center">
            {isPerfect && <motion.span initial={{scale:0.5, opacity:0}} animate={{scale:1, opacity:1}} className="text-4xl font-bangers text-green-400 drop-shadow-[0_0_10px_#4ade80]">¡PERFECTO!</motion.span>}
            {!isPerfect && pouring && <motion.span initial={{scale:0.5, opacity:0}} animate={{scale:1, opacity:1}} className="text-4xl font-bangers text-red-500 drop-shadow-[0_0_10px_#ef4444]">¡LAVANDO!</motion.span>}
         </div>

         <div className="w-full flex-1 min-h-[300px] mb-8 relative rounded-3xl border-8 border-slate-800 bg-sky-200 overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
            
            <div className="absolute inset-0 bg-[#bb8f67] pattern-dots opacity-80" />

            {/* Mate CIRCULAR Genuino Argentino */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[260px] h-[260px] bg-[#673d23] rounded-full border-[16px] border-[#422615] shadow-2xl flex overflow-hidden">
                
                {/* Sector Yerba Seca (Izquierda exacta, tomando 50% del círculo interior) */}
                <div className="h-full bg-[#43a047] border-r-[12px] border-[#2e7d32] relative flex flex-col items-center justify-center overflow-hidden" style={{ width: '50%' }}>
                   <div className="absolute inset-0 bg-black/10 mix-blend-multiply opacity-50" />
                   <span className="font-bangers text-[#2e7d32] text-4xl -rotate-90 z-10 opacity-70">YERBA</span>
                </div>
                
                {/* Sector Pocito Hueco (Derecha) */}
                <div className="flex-1 h-full bg-[#1b5e20] shadow-[inset_0_20px_40px_rgba(0,0,0,1)] relative flex flex-col items-center justify-center overflow-hidden">
                   <div className="absolute inset-4 border-4 border-dashed border-[#4caf50] rounded-r-full opacity-30 animate-pulse border-l-0" />
                   <span className="font-bangers text-[#4caf50] text-3xl z-10 -rotate-90 origin-center translate-y-6">POCITO</span>
                   <div className="absolute bottom-0 w-full bg-[#26c6da] mix-blend-overlay transition-all duration-150" style={{ height: isPerfect ? '90%' : '10%' }}></div>
                </div>
            </div>

            <div className="absolute top-0 w-0 h-full z-30" style={{ left: `${spoutPos}%` }}>
                <div className="absolute -left-6 w-12 h-20 bg-slate-200 border-x-4 border-b-8 border-slate-600 rounded-b-[2rem] shadow-2xl flex justify-center pb-2 z-20">
                    <div className="w-4 h-4 bg-slate-900 rounded-full mt-auto" />
                </div>
                
                {pouring && (
                   <div className="absolute -left-2 top-[3rem] w-4 h-[300px] bg-cyan-300 shadow-[0_0_20px_rgba(103,232,249,1)] z-10 opacity-90 rounded-b-full transition-opacity"></div>
                )}
            </div>

            {!isPerfect && pouring && <div className="absolute inset-0 bg-red-600/30 mix-blend-multiply z-40 pointer-events-none" />}
         </div>

         <button 
            className="w-full max-w-sm py-8 text-3xl font-bangers text-white bg-blue-600 rounded-[1.5rem] active:scale-95 transition-transform active:bg-blue-700 touch-none shadow-[0_8px_0_0_#1e3a8a] active:shadow-[0_0px_0_0_#1e3a8a] active:translate-y-[8px] mb-6 select-none outline-none"
            onPointerDown={() => setPouring(true)}
            onPointerUp={() => setPouring(false)}
            onPointerLeave={() => setPouring(false)}
            onContextMenu={(e) => e.preventDefault()}
         >
           MANTENER PARA SERVIR
         </button>
       </motion.div>
    </div>
  )
}

// ==========================================
// RESULTADOS & HERETICO
// ==========================================
const EstadoHeretico = ({ onReset }: { onReset: () => void }) => {
   return (
      <div className="flex flex-col items-center flex-1 h-full justify-center w-full mx-auto px-6 bg-red-950 text-red-50 relative z-10 overflow-hidden">
         <div className="absolute inset-0 bg-red-600 mix-blend-multiply opacity-60 animate-pulse" />
         <motion.div initial={{ scale: 0, rotate: 180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", bounce: 0.6 }} className="w-[200px] h-[200px] mb-8 drop-shadow-[0_0_50px_rgba(239,68,68,1)] z-10">
            <img src="/images/messi_c.png" alt="Messi Enojado" className="w-full h-full object-cover rounded-[3rem] border-[6px] border-red-500 shadow-2xl" />
         </motion.div>
         <h2 className="text-6xl font-bangers mb-4 text-center text-red-500 bg-black/60 px-8 py-3 rounded-[2rem] z-10 uppercase drop-shadow-[0_4px_0_#000] border-4 border-red-900">¡HERVIDO!</h2>
         <p className="text-2xl font-sans font-bold text-center mb-12 bg-red-900 border-4 border-red-700/50 p-6 rounded-3xl z-10 shadow-2xl">Messi se enojó porque le quemaste el termo. <span className="block mt-2 text-yellow-300">¡Retírese!</span></p>
         <button onClick={onReset} className="w-full max-w-xs py-5 bg-slate-900 border-4 border-red-900 text-red-400 font-bangers text-3xl rounded-xl z-10 shadow-xl active:scale-95 transition-transform">Volver a intentar</button>
      </div>
   );
}


const Resultados = ({ score, onSumarPuntos, onReset }: { score: number, onSumarPuntos: () => void, onReset: () => void }) => {
   let rank = "S";
   let rankImage = "";
   let msg = "¡Cebador de Oro! Messi aprueba 100%.";

   if (score < 400) { rank = "C"; rankImage = "/images/messi_c.png"; msg = "Mate hiper lavado o frío. Nos desilusionaste."; }
   else if (score < 800) { rank = "B"; rankImage = "/images/messi_b.png"; msg = "Zafa la ronda. Pero se puede mejorar."; }
   else if (score < 1400) { rank = "A"; rankImage = "/images/messi_a.png"; msg = "¡Buen mate! Dignos de un viaje en bondi."; }
   else { rank = "S"; rankImage = "/images/messi_s.png"; msg = "¡Cebador de Oro! Messi aprueba 100%."; }

   return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center flex-1 h-full pt-8 pb-6 px-6 w-full max-w-sm mx-auto z-10 justify-center">
         <h2 className="text-6xl font-bangers mb-4 text-center text-yellow-400 drop-shadow-[0_4px_0_#a16207]">Resultados</h2>
         
         <motion.div 
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="relative w-[210px] h-[210px] bg-slate-800 rounded-[3.5rem] flex items-center justify-center mt-4 mb-10 shadow-2xl border-[10px] border-yellow-500 group mx-auto"
         >
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.2)_0%,transparent_100%)] opacity-50 rounded-[2.5rem]"></div>
            
            <img src={rankImage} alt={`Messi Rank ${rank}`} className="w-full h-full object-cover rounded-[2.5rem]" />
            
            <div className="absolute -bottom-6 -right-6 bg-red-600 text-white font-bangers text-5xl px-8 py-3 rounded-2xl shadow-2xl rotate-[15deg] border-[6px] border-slate-900">
               {rank}
            </div>
         </motion.div>

         <div className="bg-slate-900/90 w-full rounded-[2rem] p-6 mb-10 text-center border-2 border-slate-700 shadow-2xl backdrop-blur-md">
            <p className="text-5xl font-bangers text-cyan-400 mb-2 drop-shadow-[0_2px_0_#000]">{score} Pts</p>
            <p className="text-xl font-sans text-slate-300">{msg}</p>
         </div>

         <div className="w-full flex gap-3 text-center justify-center">
             <button 
               onClick={onSumarPuntos}
               className="w-[60%] py-5 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 font-bangers text-3xl rounded-xl shadow-[0_8px_0_0_#b45309] active:translate-y-[8px] active:shadow-none transition-all uppercase tracking-wider outline-none"
             >
                 Enviar
             </button>

             <button onClick={onReset} className="w-[35%] py-4 text-slate-400 font-bold font-sans text-lg hover:text-white transition-colors bg-slate-800 rounded-xl shadow-[0_8px_0_0_#1e293b] active:translate-y-[8px] active:shadow-none border border-slate-700 outline-none">
                Rejugar
             </button>
         </div>
      </motion.div>
   );
}


// ==========================================
// MAIN COMPONENT
// ==========================================
export default function MateGame() {
  const [gameState, setGameState] = useState<GameState>("INICIO");
  
  const [yerbaCount, setYerbaCount] = useState(0); 
  const [aguaTemperatura, setAguaTemperatura] = useState(0);
  const [cebadoScore, setCebadoScore] = useState(0); 
  const [lavadoScore, setLavadoScore] = useState(0);

  const [hasSent, setHasSent] = useState(false);

  const resetGame = () => {
    setYerbaCount(0);
    setAguaTemperatura(0);
    setCebadoScore(0);
    setLavadoScore(0);
    setHasSent(false);
    setGameState("INICIO");
  };

  const calculateFinalScore = () => {
    let score = 0;
    
    // YERBA
    score += yerbaCount * 15; 
    
    // AGUA
    if (aguaTemperatura >= 74 && aguaTemperatura <= 82) score += 1000;
    else if (aguaTemperatura >= 70 && aguaTemperatura <= 86) score += 500;
    else score += 100;

    // CEBADO
    score += Math.floor(cebadoScore * 2.5);
    score -= Math.floor(lavadoScore * 3);

    return Math.max(0, score);
  };

  const handleSumarPuntos = () => {
    if(hasSent) return;
    const finalPoints = calculateFinalScore();
    window.parent.postMessage({ type: 'SUMAR_PUNTOS', payload: finalPoints }, '*');
    alert("¡Puntos enviados al Portal!");
    setHasSent(true);
  };

  return (
     <div className="min-h-screen w-full flex items-center justify-center p-2 sm:p-4 bg-[#0a1122]">
        <main className="flex flex-col w-full max-w-[480px] h-full max-h-[850px] aspect-[9/16] bg-[#0B1E36] overflow-hidden rounded-[2rem] border-[6px] border-slate-700 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative isolate">
           <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.8)_0%,rgba(15,23,42,1)_100%)] z-0" />
        
           {gameState === "INICIO" && <Inicio onStart={() => setGameState("FASE_YERBA")} />}
           {gameState === "FASE_YERBA" && <FaseYerba onComplete={(y) => { setYerbaCount(y); setGameState("FASE_AGUA"); }} />}
           {gameState === "FASE_AGUA" && <FaseAgua onComplete={(t) => { setAguaTemperatura(t); setGameState("FASE_CEBADO"); }} onFail={() => setGameState("ESTADO_HERETICO")} />}
           {gameState === "FASE_CEBADO" && <FaseCebado onComplete={(c, l) => { setCebadoScore(c); setLavadoScore(l); setGameState("RESULTADOS"); }} />}
           {gameState === "RESULTADOS" && <Resultados score={calculateFinalScore()} onSumarPuntos={handleSumarPuntos} onReset={resetGame} />}
           {gameState === "ESTADO_HERETICO" && <EstadoHeretico onReset={resetGame} />}
           
           <div className="absolute inset-0 pointer-events-none z-50 mix-blend-overlay opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiNmZmYiLz48Y2lyY2xlIGN4PSI0IiBjeT0iNCIgcj0iMyIgZmlsbD0iIzAwMCIvPjwvc3ZnPg==')] [background-size:4px_4px]" />
        </main>
     </div>
  );
}
