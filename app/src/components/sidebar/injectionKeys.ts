import type {ComputedRef, InjectionKey} from 'vue';

export const labelsHiddenKey = Symbol() as InjectionKey<ComputedRef<boolean>>;
