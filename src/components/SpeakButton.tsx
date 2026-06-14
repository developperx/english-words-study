import { isSpeechSupported, speak } from '../lib/speech';
import { useStudyStore } from '../store/useStudyStore';

interface Props {
  text: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/** 英語テキストを読み上げるボタン（Web Speech API） */
export function SpeakButton({ text, size = 'md', className = '' }: Props) {
  const rate = useStudyStore((s) => s.settings.speechRate);
  const supported = isSpeechSupported();
  const dim = size === 'lg' ? 'h-12 w-12 text-2xl' : size === 'sm' ? 'h-8 w-8 text-base' : 'h-10 w-10 text-xl';

  return (
    <button
      type="button"
      aria-label="発音を聞く"
      title={supported ? '発音を聞く' : 'お使いのブラウザは音声読み上げに対応していません'}
      disabled={!supported}
      onClick={(e) => {
        e.stopPropagation();
        speak(text, rate);
      }}
      className={`inline-flex items-center justify-center rounded-full bg-brand-50 text-brand-600 transition hover:bg-brand-100 active:scale-95 disabled:opacity-40 ${dim} ${className}`}
    >
      🔊
    </button>
  );
}
