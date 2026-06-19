import { describe, it, expect } from 'vitest';
import { formatCopyText } from '@/core/src/shared/utils';
import { DefaultCopyFormat } from '@/core/src/shared/constant';

describe('formatCopyText', () => {
  const source = {
    file: '/src/App.tsx',
    line: 12,
    column: 3,
    tag: 'div',
  };

  it('should substitute all placeholders with the default format', () => {
    expect(formatCopyText(DefaultCopyFormat, source)).toBe(
      '/src/App.tsx:12:3 <div>'
    );
  });

  it('should support a custom format', () => {
    expect(formatCopyText('{file}#L{line}', source)).toBe('/src/App.tsx#L12');
  });

  it('should replace repeated placeholders', () => {
    expect(formatCopyText('{tag}-{tag}', source)).toBe('div-div');
  });

  it('should leave unknown placeholders untouched', () => {
    expect(formatCopyText('{file}:{unknown}', source)).toBe(
      '/src/App.tsx:{unknown}'
    );
  });

  it('should stringify numeric line and column', () => {
    expect(formatCopyText('{line},{column}', source)).toBe('12,3');
  });

  it('should handle an empty tag', () => {
    expect(formatCopyText(DefaultCopyFormat, { ...source, tag: '' })).toBe(
      '/src/App.tsx:12:3 <>'
    );
  });
});
