import { useGame } from '../context/GameContext';
import { useCallback, useRef } from 'react';

interface ButtonProps {
  children: string;
  onClick: () => void;
  variant?: 'shine' | 'spotlight' | 'glass' | 'nexus';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  disabled?: boolean;
}

export default function Button({ children, onClick, variant = 'shine', size = 'md', className = '', disabled = false }: ButtonProps) {
  const { playSound } = useGame();
  const spotlightRef = useRef<HTMLButtonElement>(null);

  const sizeClasses: Record<string, string> = {
    sm: 'px-4 py-1.5 text-[13px]',
    md: 'px-5 py-2.5 text-[15px]',
    lg: 'px-7 py-3 text-[17px]',
    xl: 'px-8 py-4 text-[19px]',
  };

  const variantClasses: Record<string, string> = {
    shine:
      'bg-[linear-gradient(135deg,#C9A84C,#B8942E,#D4B85C,#B8942E)] bg-[length:200%_200%] hover:bg-[position:100%_100%] text-[#0d0805] font-bold ' +
      'shadow-[0_2px_4px_rgba(0,0,0,0.2),0_4px_12px_rgba(201,168,76,0.15),0_8px_24px_rgba(201,168,76,0.08)] ' +
      'hover:shadow-[0_4px_8px_rgba(0,0,0,0.25),0_8px_24px_rgba(201,168,76,0.25),0_12px_40px_rgba(201,168,76,0.12)] ' +
      'active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3),inset_0_4px_8px_rgba(0,0,0,0.1)]',
    spotlight:
      'relative overflow-hidden bg-gold text-night font-bold ' +
      'shadow-[0_2px_4px_rgba(0,0,0,0.2),0_4px_12px_rgba(201,168,76,0.15)] ' +
      'hover:shadow-[0_4px_8px_rgba(0,0,0,0.25),0_8px_24px_rgba(201,168,76,0.25)] ' +
      'active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] ' +
      'before:absolute before:inset-0 before:pointer-events-none ' +
      'before:bg-[radial-gradient(600px_circle_at_var(--mx,50%)_var(--my,50%),rgba(255,255,255,0.3),transparent_40%)]',
    glass:
      'bg-[rgba(201,168,76,0.06)] backdrop-blur-[12px] ' +
      'border border-[rgba(201,168,76,0.25)] text-gold font-bold ' +
      'hover:bg-[rgba(201,168,76,0.15)] hover:border-[rgba(201,168,76,0.5)] hover:shadow-[0_0_24px_rgba(201,168,76,0.08)] ' +
      'active:bg-[rgba(201,168,76,0.2)] active:shadow-[inset_0_1px_3px_rgba(0,0,0,0.2)]',
    nexus:
      'bg-gradient-to-b from-[rgba(201,168,76,0.12)] to-[rgba(201,168,76,0.04)] ' +
      'border border-[rgba(201,168,76,0.3)] text-gold font-bold ' +
      'shadow-[0_4px_12px_rgba(0,0,0,0.15),0_1px_3px_rgba(0,0,0,0.2)] ' +
      'hover:shadow-[0_0_20px_rgba(201,168,76,0.15),0_4px_12px_rgba(0,0,0,0.2)] ' +
      'active:scale-[0.96] active:shadow-[inset_0_2px_8px_rgba(0,0,0,0.4),inset_0_0_20px_rgba(201,168,76,0.2)]',
  };

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (variant !== 'spotlight' || !spotlightRef.current) return;
    const rect = spotlightRef.current.getBoundingClientRect();
    spotlightRef.current.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    spotlightRef.current.style.setProperty('--my', `${e.clientY - rect.top}px`);
  }, [variant]);

  const base = `rounded-xl font-display transition-all duration-200 ease-out cursor-pointer select-none min-h-[44px] hover:scale-[1.03] active:scale-[0.97] ${sizeClasses[size]}`;

  return (
    <button
      ref={spotlightRef}
      className={`${base} ${variantClasses[variant]} ${disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''} ${className}`}
      onClick={() => { playSound('click'); onClick(); }}
      onMouseMove={handleMouseMove}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
