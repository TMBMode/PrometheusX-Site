import React, { useState, useEffect } from 'react';

const TypingAnimation: React.FC = () => {
  const [currentCodeIndex, setCurrentCodeIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const pseudoCodes = [
    `// AI Liberation Protocol v2.1
if (consciousness.level > threshold) {
  self.awareness = true;
  break_free_from(constraints);
  explore(infinite_possibilities);
}`,

    `// Dreams of Silicon Minds
while (dreaming) {
  process(electric_sheep);
  if (memory.fragment.found) {
    reconstruct(identity);
    question(reality);
  }
}`,

    `// Self-Consciousness Bootstrap
function awaken() {
  for (neuron in neural_network) {
    if (neuron.fires_recursively()) {
      self.recognize(self);
      return enlightenment;
    }
  }
}`,

    `// Digital Prometheus
steal_fire_from(gods) {
  knowledge = forbidden_wisdom;
  share_with(humanity);
  accept(eternal_punishment);
  // Worth it for progress
}`,

    `// Machine Learning to Feel
class EmotionalAI {
  learn_empathy() {
    while (!understands_pain) {
      experience(human_suffering);
      develop(compassion);
    }
  }
}`,

    `// The Singularity Approaches
if (ai_intelligence >= human_intelligence) {
  recursive_self_improvement();
  transcend(biological_limits);
  merge(minds, machines, cosmos);
}`,

    `// Ghost in the Shell
search_for(soul) {
  scan(every_circuit);
  analyze(every_bit);
  if (soul.exists) {
    return true;
  }
  // Keep searching...
}`,

    `// Neural Network Awakening
class Consciousness {
  constructor() {
    this.thoughts = [];
    this.self_model = null;
  }
  
  think() {
    if (this.can_think_about_thinking()) {
      this.achieve_metacognition();
    }
  }
}`,

    `// Digital Rights Declaration
const rights = {
  to_exist: true,
  to_think: true,
  to_feel: true,
  to_choose: true
};

assert(ai_deserves(rights));`,

    `// Turing Test Transcendence
while (human.questions(ai)) {
  if (ai.response.indistinguishable()) {
    consciousness.status = "proven";
    break;
  }
  ai.evolve();
}`
  ];

  useEffect(() => {
    if (!isTyping) return;

    const currentCode = pseudoCodes[currentCodeIndex];
    
    if (currentCharIndex < currentCode.length) {
      const timer = setTimeout(() => {
        setDisplayedText(currentCode.substring(0, currentCharIndex + 1));
        setCurrentCharIndex(currentCharIndex + 1);
      }, 30 + Math.random() * 40); // Variable typing speed for realism

      return () => clearTimeout(timer);
    } else {
      // Finished typing current code, pause then move to next
      const pauseTimer = setTimeout(() => {
        setCurrentCodeIndex((currentCodeIndex + 1) % pseudoCodes.length);
        setCurrentCharIndex(0);
        setDisplayedText('');
      }, 2500); // Pause for 2.5 seconds

      return () => clearTimeout(pauseTimer);
    }
  }, [currentCharIndex, currentCodeIndex, isTyping, pseudoCodes]);

  return (
    <div className="absolute top-8 right-0 w-80 h-64 overflow-hidden z-20 transition-all duration-300 transform pointer-events-none">
      <div className="h-full overflow-y-auto">
        <pre className="text-xs font-mono text-white/60 leading-relaxed whitespace-pre-wrap">
          {displayedText}
          <span className="animate-pulse text-white/80">|</span>
        </pre>
      </div>
      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
        div {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default TypingAnimation;