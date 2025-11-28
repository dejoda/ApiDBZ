
import './styles/scroll.css'

const Scroll = () => {
  // Easing suave (easeOutCubic)
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  const smoothScrollToBottom = (duration = 800) => {
    const start = window.scrollY || window.pageYOffset;
    const end = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const distance = end - start;
    if (distance === 0) return;

    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      window.scrollTo(0, Math.round(start + distance * eased));
      if (elapsed < duration) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const handleClick = (e: any) => {
    e.preventDefault();
    smoothScrollToBottom(900); // duración en ms, ajustable
  };

  return (
    <div className="scroll-down">
      <a href="#" onClick={handleClick} aria-label="Ir abajo">
        <i className="ri-arrow-down-s-fill" aria-hidden="true"></i>
      </a>
    </div>
  );
};

export default Scroll;
