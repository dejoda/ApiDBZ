declare module 'scrollreveal' {
  interface ScrollRevealOptions {
    distance?: string;
    duration?: number;
    delay?: number;
    reset?: boolean;
    [key: string]: any;
  }

  type ScrollRevealInstance = (options?: ScrollRevealOptions) => any;

  const ScrollReveal: ScrollRevealInstance;
  export default ScrollReveal;
}
