/**
 * The View Transitions API is not in the DOM lib shipped with this TypeScript
 * version. Only the surface `ViewTransitions.tsx` uses is declared here.
 */
interface ViewTransition {
  readonly finished: Promise<void>;
  readonly ready: Promise<void>;
  readonly updateCallbackDone: Promise<void>;
  skipTransition(): void;
}

interface Document {
  startViewTransition?: (callback: () => void | Promise<void>) => ViewTransition;
}
