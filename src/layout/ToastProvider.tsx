import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { toneColor, type Tone } from '../lib/status';
import { Icon } from '../components/Icon';

type ToastInput = string | { title: string; desc?: string; tone?: Tone };
interface ToastItem {
  id: string;
  title: string;
  desc?: string;
  tone: Tone;
}

const ToastCtx = createContext<(t: ToastInput) => void>(() => {});
export function useToast() {
  return useContext(ToastCtx);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const push = useCallback((t: ToastInput) => {
    const id = Math.random().toString(36).slice(2);
    const base = typeof t === 'string' ? { title: t } : t;
    setItems((x) => [...x, { id, tone: 'ok', ...base } as ToastItem]);
    setTimeout(() => setItems((x) => x.filter((i) => i.id !== id)), 3600);
  }, []);

  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="toasts">
        {items.map((t) => {
          const c = toneColor(t.tone);
          return (
            <div key={t.id} className="toast">
              <Icon
                n={t.tone === 'crit' ? 'issues' : t.tone === 'warn' ? 'clock' : 'check'}
                style={{ color: c }}
              />
              <div>
                <div className="tt">{t.title}</div>
                {t.desc ? <div className="td">{t.desc}</div> : null}
              </div>
            </div>
          );
        })}
      </div>
    </ToastCtx.Provider>
  );
}
