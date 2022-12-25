<script setup lang="ts">
import Multiselect from '@vueform/multiselect';
</script>

<template>
  <Multiselect :noOptionsText="$t('multiselect.noOptions')"
    :noResultsText="$t('multiselect.noResults')" v-bind="$attrs"/>
</template>

<style lang="scss">
.multiselect {
  @apply relative mx-auto w-full flex items-center justify-end box-border cursor-pointer border-transparent rounded-md bg-slate-700 highlight-white/5 text-base leading-snug;

  &.is-disabled {
    @apply cursor-not-allowed opacity-75 outline-none;
  }

  &.is-open {
    @apply rounded-b-none;
  }

  &.is-open-top {
    @apply rounded-t-none;
  }

  &.is-active {
    @apply outline-primary-500 outline-2 outline;
  }
}

.multiselect-wrapper {
  @apply relative mx-auto w-full flex items-center justify-end box-border outline-none;

  .has-icon & {
    @apply pl-7;
  }
}

.multiselect-single-label {
  @apply flex items-center h-full max-w-full absolute left-0 top-0 pointer-events-none bg-transparent leading-snug pl-3.5 pr-16 box-border rtl:left-auto rtl:right-0 rtl:pl-0 rtl:pr-3.5;

  .has-icon & {
    @apply pl-9;
  }
}

.multiselect-single-label-text {
  @apply overflow-ellipsis overflow-hidden block whitespace-nowrap max-w-full;
}

.multiselect-multiple-label {
  @apply flex items-center h-full absolute left-0 top-0 pointer-events-none bg-transparent leading-snug pl-3.5 rtl:left-auto rtl:right-0 rtl:pl-0 rtl:pr-3.5;
}

.multiselect-search {
  @apply w-full absolute inset-0 outline-none focus:ring-0 appearance-none box-border border-0 text-base font-sans bg-white rounded pl-3.5 rtl:pl-0 rtl:pr-3.5;
}

.multiselect-tags {
  @apply flex-grow flex-shrink flex flex-wrap items-center mt-1 pl-2 rtl:pl-0 rtl:pr-2;
}

.multiselect-tag {
  @apply bg-primary-500 text-white text-sm font-semibold py-0.5 pl-2 rounded mr-1 mb-1 flex items-center whitespace-nowrap rtl:pl-0 rtl:pr-2 rtl:mr-0 rtl:ml-1;

  &.is-disabled {
    @apply pr-2 opacity-50 rtl:pl-2;
  }
}

.multiselect-tag-remove {
  @apply flex items-center justify-center p-1 mx-0.5 rounded-sm hover:bg-primary-400;
}

.multiselect-tag-remove-icon {
  @apply bg-multiselect-remove-white bg-center bg-no-repeat opacity-30 inline-block w-3 h-3;
}

.multiselect-tag-remove:hover .multiselect-tag-remove-icon {
  @apply opacity-60;
}

.multiselect-tags-search-wrapper {
  @apply inline-block relative mx-1 mb-1 flex-grow flex-shrink h-full;
}

.multiselect-tags-search {
  @apply absolute inset-0 border-0 outline-none focus:ring-0 appearance-none p-0 text-base font-sans box-border w-full;
}

.multiselect-tags-search-copy {
  @apply invisible whitespace-pre-wrap inline-block h-px;
}

.multiselect-placeholder {
  @apply flex items-center h-full absolute left-0 top-0 pointer-events-none bg-transparent leading-snug pl-3.5 text-slate-500 rtl:left-auto rtl:right-0 rtl:pl-0 rtl:pr-3.5;

  .has-icon & {
    @apply pl-9;
  }
}

.multiselect-caret {
  @apply bg-multiselect-caret-white bg-center bg-no-repeat w-2.5 h-4 py-px box-content mr-3.5 relative z-10 opacity-40 flex-shrink-0 flex-grow-0 transition-transform transform pointer-events-none rtl:mr-0 rtl:ml-3.5;

  &.is-open {
    @apply rotate-180 pointer-events-auto;
  }
}

.multiselect-clear {
  @apply pr-3.5 relative z-10 opacity-40 transition duration-300 flex-shrink-0 flex-grow-0 flex hover:opacity-80 rtl:pr-0 rtl:pl-3.5;
}

.multiselect-clear-icon {
  @apply bg-multiselect-remove-white bg-center bg-no-repeat w-2.5 h-4 py-px box-content inline-block;
}

.multiselect-spinner {
  @apply bg-multiselect-spinner-green-500 bg-center bg-no-repeat w-4 h-4 z-10 mr-3.5 animate-spin flex-shrink-0 flex-grow-0 rtl:mr-0 rtl:ml-3.5;
}

.multiselect-inifite {
  @apply flex items-center justify-center w-full;
}

.multiselect-inifite-spinner {
  @apply bg-multiselect-spinner-green-500 bg-center bg-no-repeat w-4 h-4 z-10 animate-spin flex-shrink-0 flex-grow-0 m-3.5;
}

.multiselect-dropdown {
  @apply max-h-60 absolute -left-px -right-px bottom-0 transform translate-y-full border-primary-500 outline-primary-500 border-t-0 outline outline-1 border -mt-px overflow-y-scroll z-50 bg-slate-700 flex flex-col rounded-b;

  &.is-top {
    @apply -translate-y-full top-px bottom-auto rounded-b-none rounded-t;
  }

  &.is-hidden {
    @apply hidden;
  }
}

.multiselect-options {
  @apply flex flex-col p-0 m-0 list-none;
}

.multiselect-group {
  @apply p-0 m-0;
}

.multiselect-group-label {
  @apply flex text-sm box-border items-center justify-start text-left py-1 px-3 font-semibold bg-gray-200 cursor-default leading-normal;

  &.is-pointable {
    @apply cursor-pointer;
  }

  &.is-pointed {
    @apply text-slate-300 bg-slate-600;
  }

  &.is-selected {
    @apply bg-slate-600 text-white;
  }

  &.is-disabled {
    @apply bg-gray-100 text-gray-300 cursor-not-allowed;
  }

  &.is-selected.is-pointed {
    @apply bg-slate-600 text-white opacity-90;
  }

  &.is-selected.is-disabled {
    @apply text-slate-100 bg-slate-600 bg-opacity-50 cursor-not-allowed;
  }
}

.multiselect-group-options {
  @apply p-0 m-0;
}

.multiselect-option {
  @apply flex items-center justify-start box-border text-left cursor-pointer text-base leading-snug py-2 px-3;

  &.is-pointed {
    @apply text-slate-300 bg-slate-600;
  }

  &.is-selected {
    @apply text-white bg-slate-500;
  }

  &.is-disabled {
    @apply text-gray-300 cursor-not-allowed;
  }

  &.is-selected.is-pointed {
    @apply text-white bg-slate-500 opacity-90;
  }

  &.is-selected.is-disabled {
    .multiselect-tags {
      @apply text-slate-100 bg-slate-500 bg-opacity-50 cursor-not-allowed;
    }
  }
}

.multiselect-no-options {
  @apply py-2 px-3 text-gray-600 bg-white text-left rtl:text-right;
}

.multiselect-no-results {
  @apply py-2 px-3 text-slate-400 bg-slate-700 text-left rtl:text-right;
}

.multiselect-fake-input {
  @apply bg-transparent absolute left-0 right-0 -bottom-px w-full h-px border-0 p-0 appearance-none outline-none text-transparent;
}

.multiselect-assistive-text {
  @apply absolute -m-px w-px h-px overflow-hidden;
  clip: rect(0 0 0 0);
}

.multiselect-spacer {
  @apply h-9 py-px box-content;
}
</style>
