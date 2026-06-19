// 在 node 层将文本写入系统剪贴板（本地 dev server 在浏览器中通常无剪贴板权限）
import { spawn } from 'child_process';
import chalk from 'chalk';

// 不同平台下写入剪贴板的候选命令，按顺序尝试
function getClipboardCommands(): Array<{ cmd: string; args: string[] }> {
  if (process.platform === 'darwin') {
    return [{ cmd: 'pbcopy', args: [] }];
  }
  if (process.platform === 'win32') {
    return [{ cmd: 'clip', args: [] }];
  }
  // linux 及其它类 unix 系统
  return [
    { cmd: 'wl-copy', args: [] },
    { cmd: 'xclip', args: ['-selection', 'clipboard'] },
    { cmd: 'xsel', args: ['--clipboard', '--input'] },
  ];
}

function writeWithCommand(
  command: { cmd: string; args: string[] },
  text: string,
): Promise<boolean> {
  return new Promise((resolve) => {
    let settled = false;
    const done = (success: boolean) => {
      if (!settled) {
        settled = true;
        resolve(success);
      }
    };
    try {
      const child = spawn(command.cmd, command.args);
      // 命令不存在（如 linux 未安装 xclip）会触发 error 事件
      child.on('error', () => done(false));
      child.on('close', (code) => done(code === 0));
      child.stdin.on('error', () => done(false));
      child.stdin.end(text);
    } catch (error) {
      done(false);
    }
  });
}

/**
 * 将文本复制到系统剪贴板。
 * 失败时仅打印警告（如 linux 未安装 xclip/xsel/wl-copy），不会向调用方抛错。
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  const commands = getClipboardCommands();
  for (const command of commands) {
    const success = await writeWithCommand(command, text);
    if (success) {
      return true;
    }
  }
  console.warn(
    chalk.yellow('[simple-code-inspector-plugin]'),
    'Failed to copy to clipboard.' +
      (process.platform === 'linux'
        ? ' Please install one of: wl-copy / xclip / xsel.'
        : ''),
  );
  return false;
}
