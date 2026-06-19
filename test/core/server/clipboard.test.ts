import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { EventEmitter } from 'events';

const spawnMock = vi.hoisted(() => vi.fn());
vi.mock('child_process', () => ({
  spawn: spawnMock,
  default: { spawn: spawnMock },
}));

import { copyToClipboard } from '@/core/src/server/clipboard';

// 构造一个可控的伪子进程。事件在 stdin.end 被调用后才触发，
// 以保证 copyToClipboard 已经注册好 'error' / 'close' 监听器。
function makeChild(options: { closeCode?: number; emitError?: boolean }) {
  const child: any = new EventEmitter();
  child.stdin = new EventEmitter();
  child.stdin.end = vi.fn(() => {
    queueMicrotask(() => {
      if (options.emitError) {
        child.emit('error', new Error('command not found'));
      } else {
        child.emit('close', options.closeCode ?? 0);
      }
    });
  });
  return child;
}

const originalPlatform = process.platform;
function setPlatform(platform: NodeJS.Platform) {
  Object.defineProperty(process, 'platform', {
    value: platform,
    configurable: true,
  });
}

describe('copyToClipboard', () => {
  let warnSpy: any;

  beforeEach(() => {
    vi.clearAllMocks();
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    setPlatform(originalPlatform);
    warnSpy.mockRestore();
  });

  it('should use pbcopy and write text to stdin on macOS', async () => {
    setPlatform('darwin');
    const child = makeChild({ closeCode: 0 });
    spawnMock.mockReturnValueOnce(child);

    const result = await copyToClipboard('hello world');

    expect(result).toBe(true);
    expect(spawnMock).toHaveBeenCalledWith('pbcopy', []);
    expect(child.stdin.end).toHaveBeenCalledWith('hello world');
  });

  it('should use clip on Windows', async () => {
    setPlatform('win32');
    spawnMock.mockReturnValueOnce(makeChild({ closeCode: 0 }));

    const result = await copyToClipboard('text');

    expect(result).toBe(true);
    expect(spawnMock).toHaveBeenCalledWith('clip', []);
  });

  it('should fall back through linux clipboard tools until one succeeds', async () => {
    setPlatform('linux');
    // wl-copy errors, xclip succeeds
    spawnMock
      .mockReturnValueOnce(makeChild({ emitError: true }))
      .mockReturnValueOnce(makeChild({ closeCode: 0 }));

    const result = await copyToClipboard('text');

    expect(result).toBe(true);
    expect(spawnMock).toHaveBeenNthCalledWith(1, 'wl-copy', []);
    expect(spawnMock).toHaveBeenNthCalledWith(2, 'xclip', [
      '-selection',
      'clipboard',
    ]);
  });

  it('should return false and warn when all commands fail', async () => {
    setPlatform('linux');
    spawnMock
      .mockReturnValueOnce(makeChild({ emitError: true }))
      .mockReturnValueOnce(makeChild({ emitError: true }))
      .mockReturnValueOnce(makeChild({ emitError: true }));

    const result = await copyToClipboard('text');

    expect(result).toBe(false);
    expect(warnSpy).toHaveBeenCalled();
  });

  it('should return false when the command exits with a non-zero code', async () => {
    setPlatform('darwin');
    spawnMock.mockReturnValueOnce(makeChild({ closeCode: 1 }));

    const result = await copyToClipboard('text');

    expect(result).toBe(false);
  });

  it('should never throw, even when spawn itself throws', async () => {
    setPlatform('darwin');
    spawnMock.mockImplementationOnce(() => {
      throw new Error('spawn failed');
    });

    await expect(copyToClipboard('text')).resolves.toBe(false);
  });
});
