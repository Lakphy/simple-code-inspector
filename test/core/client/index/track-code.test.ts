// @vitest-environment jsdom

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { CodeInspectorComponent } from '@/core/src/client';

describe('trackCode', () => {
  let component: CodeInspectorComponent;

  beforeEach(() => {
    component = new CodeInspectorComponent();
    document.body.appendChild(component);

    // Set up element info for tests
    component.element = {
      name: 'div',
      path: '/path/to/file.ts',
      line: 10,
      column: 5,
    };
  });

  afterEach(() => {
    document.body.removeChild(component);
    vi.clearAllMocks();
  });

  describe('Request Feature', () => {
    it('should call sendXHR when sendType is xhr', () => {
      component.sendType = 'xhr';
      const sendXHRSpy = vi
        .spyOn(component, 'sendXHR')
        .mockImplementation(() => {});

      component.trackCode();

      expect(sendXHRSpy).toHaveBeenCalled();
    });

    it('should call sendImg when sendType is img', () => {
      component.sendType = 'img';
      const sendImgSpy = vi
        .spyOn(component, 'sendImg')
        .mockImplementation(() => {});

      component.trackCode();

      expect(sendImgSpy).toHaveBeenCalled();
    });

    it('should only use one transport per click', () => {
      component.sendType = 'xhr';
      const sendXHRSpy = vi
        .spyOn(component, 'sendXHR')
        .mockImplementation(() => {});
      const sendImgSpy = vi
        .spyOn(component, 'sendImg')
        .mockImplementation(() => {});

      component.trackCode();

      expect(sendXHRSpy).toHaveBeenCalledTimes(1);
      expect(sendImgSpy).not.toHaveBeenCalled();
    });

    it('should not send a request when the clipboard server is disabled', () => {
      component.serverEnabled = false;
      const sendXHRSpy = vi
        .spyOn(component, 'sendXHR')
        .mockImplementation(() => {});
      const sendImgSpy = vi
        .spyOn(component, 'sendImg')
        .mockImplementation(() => {});

      component.trackCode();

      expect(sendXHRSpy).not.toHaveBeenCalled();
      expect(sendImgSpy).not.toHaveBeenCalled();
    });
  });

  describe('Custom Event', () => {
    it('should dispatch code-inspector:trackCode custom event', () => {
      vi.spyOn(component, 'sendXHR').mockImplementation(() => {});
      const eventHandler = vi.fn();
      window.addEventListener('code-inspector:trackCode', eventHandler);

      component.trackCode();

      expect(eventHandler).toHaveBeenCalled();
      const event = eventHandler.mock.calls[0][0] as CustomEvent;
      expect(event.type).toBe('code-inspector:trackCode');
      expect(event.detail).toEqual(component.element);

      window.removeEventListener('code-inspector:trackCode', eventHandler);
    });

    it('should include element info in custom event detail', () => {
      vi.spyOn(component, 'sendXHR').mockImplementation(() => {});
      component.element = {
        name: 'span',
        path: '/custom/path.tsx',
        line: 42,
        column: 15,
      };

      const eventHandler = vi.fn();
      window.addEventListener('code-inspector:trackCode', eventHandler);

      component.trackCode();

      const event = eventHandler.mock.calls[0][0] as CustomEvent;
      expect(event.detail.name).toBe('span');
      expect(event.detail.path).toBe('/custom/path.tsx');
      expect(event.detail.line).toBe(42);
      expect(event.detail.column).toBe(15);

      window.removeEventListener('code-inspector:trackCode', eventHandler);
    });

    it('should always dispatch the event after sending the request', () => {
      const sendXHRSpy = vi
        .spyOn(component, 'sendXHR')
        .mockImplementation(() => {});
      const eventHandler = vi.fn();
      window.addEventListener('code-inspector:trackCode', eventHandler);

      component.trackCode();

      expect(sendXHRSpy).toHaveBeenCalled();
      expect(eventHandler).toHaveBeenCalled();

      window.removeEventListener('code-inspector:trackCode', eventHandler);
    });
  });
});
