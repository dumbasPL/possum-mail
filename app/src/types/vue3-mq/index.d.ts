declare module 'vue3-mq' {
  import type {App, readonly as vueReadonly} from 'vue';
  import type breakpoints from '@/config/breakpoints.json';
  type Breakpoint = keyof typeof breakpoints;
  type Orientation = 'landscape' | 'portrait';
  type Theme = 'dark' | 'light';
  type MotionPreference = 'no-preference' | 'reduce';

  interface State extends Record<`${Breakpoint}${'Minus' | 'Plus' | ''}`, boolean> {
    current: Breakpoint;

    orientation: Orientation;
    isLandscape: boolean;
    isPortrait: boolean;

    theme: Theme;
    isDark: boolean;
    isLight: boolean;

    motionPreference: MotionPreference;
    isMotion: boolean;
    isInert: boolean;
  }

  interface Config {
    preset?: 'bootstrap5' | 'bootstrap4' | 'bootstrap3' | 'vuetify' | 'tailwind' | 'devices' | 'wordpress',
    breakpoints?: Record<Breakpoint, number>,
    defaultBreakpoint?: Breakpoint,
    defaultOrientation?: Orientation,
    defaultMotion?: MotionPreference,
    defaultTheme?: Theme,
  }

  interface Plugin {
    install: (app: App, options?: Config) => void;
  }

  export function useMq(): ReturnType<typeof vueReadonly<State>>;

  export const Vue3Mq: Plugin;
}
