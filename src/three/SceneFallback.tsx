export function SceneFallback() {
  return (
    <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto flex items-center justify-center">
      {/* Outer Glow Ring */}
      <div className="absolute inset-0 rounded-full border border-cyber-cyan/30 animate-spin" style={{ animationDuration: '24s' }}>
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyber-cyan shadow-neon-cyan" />
      </div>

      {/* Middle Violet Ring */}
      <div className="absolute inset-8 rounded-full border border-cyber-violet/40 animate-spin" style={{ animationDuration: '18s', animationDirection: 'reverse' }}>
        <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-3 rounded-full bg-cyber-violet shadow-neon-violet" />
      </div>

      {/* Inner Concentric Circle */}
      <div className="absolute inset-16 rounded-full border border-dashed border-cyber-cyan/20 animate-pulse" />

      {/* Center Holographic Emblem */}
      <div className="relative w-28 h-28 flex items-center justify-center bg-cyber-surface/90 border border-cyber-cyan/50 rounded-2xl shadow-neon-cyan transform rotate-45">
        <div className="w-16 h-16 border border-cyber-violet rounded-lg transform -rotate-45 flex items-center justify-center">
          <div className="w-6 h-6 bg-gradient-to-tr from-cyber-cyan to-cyber-violet rounded-sm animate-ping" />
        </div>
      </div>
    </div>
  );
}
