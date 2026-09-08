import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/cn';
import { SEARCH_INDEX } from '../data';
import type { SearchEntry } from '../types';
import { Icon } from './Icon';

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const nav = useNavigate();
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQ('');
      setSel(0);
      const t = setTimeout(() => inputRef.current?.focus(), 20);
      return () => clearTimeout(t);
    }
  }, [open]);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [] as SearchEntry[];
    return SEARCH_INDEX.map((it) => {
      const hay = `${it.label} ${it.sub} ${it.type} ${it.code}`.toLowerCase();
      let score = -1;
      if (hay.includes(s)) score = it.label.toLowerCase().includes(s) ? 3 : 1;
      return { it, score };
    })
      .filter((r) => r.score >= 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 24)
      .map((r) => r.it);
  }, [q]);

  const groups = useMemo(() => {
    const g: Record<string, SearchEntry[]> = {};
    results.forEach((r) => {
      (g[r.type] = g[r.type] || []).push(r);
    });
    return g;
  }, [results]);

  useEffect(() => {
    if (!open) return;
    const on = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSel((s) => Math.min(s + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSel((s) => Math.max(s - 1, 0));
      } else if (e.key === 'Enter' && results[sel]) {
        nav(results[sel].href);
        onClose();
      }
    };
    window.addEventListener('keydown', on);
    return () => window.removeEventListener('keydown', on);
  }, [open, results, sel, onClose, nav]);

  if (!open) return null;
  let running = -1;

  return (
    <div className="cmdk-ov" onMouseDown={onClose}>
      <div className="cmdk" onMouseDown={(e) => e.stopPropagation()}>
        <div className="cmdk-in">
          <Icon n="search" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setSel(0);
            }}
            placeholder="Search parts, projects, RFQs, materials…  e.g. P-001245"
          />
          <span className="ci-code" style={{ padding: '2px 6px' }}>ESC</span>
        </div>
        <div className="cmdk-res">
          {!q.trim() ? (
            <div className="cmdk-hint">
              One part number connects the whole workflow.
              <br />
              Try <code>P-001245</code>, <code>PRJ-26001</code>, <code>OUT-0261</code> or <code>S235JR</code>.
            </div>
          ) : results.length === 0 ? (
            <div className="cmdk-hint">No matches for &ldquo;{q}&rdquo;.</div>
          ) : (
            Object.keys(groups).map((gk) => (
              <div key={gk}>
                <div className="cmdk-grp">{gk}</div>
                {groups[gk].map((it) => {
                  running += 1;
                  const idx = running;
                  return (
                    <div
                      key={it.label + it.href}
                      className={cn('cmdk-item', idx === sel && 'sel')}
                      onMouseEnter={() => setSel(idx)}
                      onClick={() => {
                        nav(it.href);
                        onClose();
                      }}
                    >
                      <Icon n={it.icon} />
                      <div className="ci-main">
                        <div className="ci-label mono">{it.label}</div>
                        <div className="ci-sub">{it.sub}</div>
                      </div>
                      <Icon n="cornerR" size={13} />
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>
        <div className="cmdk-foot">
          <span>↑ ↓ navigate</span>
          <span>↵ open</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  );
}
