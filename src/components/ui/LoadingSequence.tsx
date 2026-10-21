import { motion } from 'framer-motion';

interface LoadingSequenceProps {
  statusText?: string;
}

export function LoadingSequence({ statusText = 'INITIALIZING DIGITAL UNIVERSE...' }: LoadingSequenceProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 bg-[#050713] flex flex-col items-center justify-center p-6"
    >
      {/* Animated Cyber Emblem */}
      <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
        {/* Outer Rotating Square */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 border-2 border-cyber-cyan/40 rounded-xl"
        />

        {/* Inner Counter-Rotating Hexagon/Diamond */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-3 border-2 border-cyber-violet/50 rounded-lg transform rotate-45"
        />

        {/* Pulsing Core Node */}
        <motion.div
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-5 rounded-sm bg-gradient-to-tr from-cyber-cyan to-cyber-violet shadow-[0_0_20px_#00E5FF]"
        />
      </div>

      {/* Terminal Loading Text */}
      <div className="flex flex-col items-center space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-ping" />
          <p className="font-mono text-sm tracking-widest text-cyber-cyan font-semibold">
            {statusText}
          </p>
        </div>
        <p className="font-mono text-xs text-slate-400">
          CONNECTING NEURAL GRID // VERIFYING REPOSITORIES
        </p>
      </div>

      {/* Meaningful Activity Pulse Bar (no fake %) */}
      <div className="w-64 h-1 bg-cyber-surface rounded-full overflow-hidden mt-6 border border-cyber-cyan/20">
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-1/2 h-full bg-gradient-to-r from-transparent via-cyber-cyan to-transparent"
        />
      </div>
    </motion.div>
  );
}
