/**
 * Frames a real, unmodified screenshot captured from the running OSTA app
 * (see /public/screenshots and scripts used to produce them). Presentation
 * only — corner brackets + caption. Never redraws or fabricates UI.
 */
export function ScreenshotFrame({
  src,
  alt,
  question,
  answer,
}: {
  src: string;
  alt: string;
  question?: string;
  answer?: string;
}) {
  return (
    <figure style={{ margin: 0 }}>
      <div className="mkt-shot">
        <span className="c1" />
        <span className="c2" />
        <img src={src} alt={alt} loading="lazy" />
      </div>
      {(question || answer) && (
        <figcaption className="mkt-shot-cap">
          {question ? <p className="mkt-shot-q">{question}</p> : null}
          {answer ? <p className="mkt-shot-a">{answer}</p> : null}
        </figcaption>
      )}
    </figure>
  );
}
