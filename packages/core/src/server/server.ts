// 启动本地接口，访问时将源码位置复制到剪贴板
import http from 'http';
import path from 'path';
import chalk from 'chalk';
import net from 'net';
import { execSync } from 'child_process';
import portFinder from 'portfinder';
import { DefaultPort, DefaultCopyFormat } from '../shared/constant';
import {
  getIP,
  getProjectRecord,
  setProjectRecord,
  findPort,
  formatCopyText,
} from '../shared';
import type { PathType, CodeOptions, RecordInfo } from '../shared';
import { copyToClipboard } from './clipboard';

// 获取项目 git 根目录
function getProjectRoot(): string {
  try {
    const command = 'git rev-parse --show-toplevel';
    const gitRoot = execSync(command, {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim();
    return gitRoot;
  } catch (error) {
    return '';
  }
}

// 项目根目录
export const ProjectRootPath = getProjectRoot();
export function getRelativePath(filePath: string): string {
  if (ProjectRootPath) {
    return filePath.replace(`${ProjectRootPath}/`, '');
  }
  return filePath;
}

// 根据用户配置返回绝对路径或者相对路径
export function getRelativeOrAbsolutePath(
  filePath: string,
  pathType?: PathType
) {
  return pathType === 'relative' ? getRelativePath(filePath) : filePath;
}

export function createServer(
  callback: (port: number) => any,
  options?: CodeOptions,
  _record?: RecordInfo
) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Private-Network': 'true',
  };
  const server = http.createServer(async (req: any, res: any) => {
    // 收到请求后将源码位置复制到剪贴板
    const params = new URLSearchParams(req.url.slice(1));
    let file = decodeURIComponent(params.get('file') as string);
    if (ProjectRootPath && !path.isAbsolute(file)) {
      file = `${ProjectRootPath}/${file}`;
    }
    if (
      options?.pathType === 'relative' &&
      ProjectRootPath &&
      !file.startsWith(ProjectRootPath)
    ) {
      res.writeHead(403, headers);
      res.end('not allowed to copy this file');
      return;
    }
    const line = Number(params.get('line'));
    const column = Number(params.get('column'));
    const tag = decodeURIComponent((params.get('name') as string) || '');
    // 调用 hooks
    options?.hooks?.afterInspectRequest?.(options, { file, line, column });
    // 将源码位置复制到剪贴板
    const text = formatCopyText(options?.copyFormat ?? DefaultCopyFormat, {
      file,
      line,
      column,
      tag,
    });
    const copied = await copyToClipboard(text);
    if (copied) {
      res.writeHead(200, headers);
      res.end('ok');
    } else {
      res.writeHead(500, headers);
      res.end('failed to copy to clipboard');
    }
  });

  // 寻找可用接口
  portFinder.getPort(
    { port: options?.port ?? DefaultPort },
    (err: Error, port: number) => {
      if (err) {
        throw err;
      }
      server.listen(port, () => {
        callback(port);
      });
    }
  );
  return server;
}

/**
 * Check if a port is occupied (in use)
 * @param port - The port number to check
 * @returns Promise<boolean> - true if port is occupied, false if available
 */
async function isPortOccupied(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    // Create TCP server to test port availability
    const server = net.createServer();
    // Disable default connection listening (only for detecting port)
    server.unref();

    // Port is available - we can bind to it
    server.on('listening', () => {
      server.close(); // Immediately close server, release port
      resolve(false); // Port is NOT occupied
    });

    // Port is occupied - binding failed
    server.on('error', () => {
      resolve(true); // Port IS occupied
    });

    server.listen(port);
  });
}

export async function startServer(options: CodeOptions, record: RecordInfo) {
  const previousPort = getProjectRecord(record)?.port;
  if (previousPort) {
    const isOccupied = await isPortOccupied(previousPort);
    if (isOccupied) {
      // Port is occupied, server is already running
      return;
    }
    // Port is available, need to restart server
    setProjectRecord(record, 'findPort', undefined);
    setProjectRecord(record, 'port', undefined);
  }
  let restartServer = !getProjectRecord(record)?.findPort;

  if (restartServer) {
    const findPort = new Promise<number>((resolve) => {
      // create server
      createServer(
        (port: number) => {
          resolve(port);
          if (options.printServer) {
            const info = [
              chalk.blue('[simple-code-inspector-plugin]'),
              'Server is running on:',
              chalk.green(
                `http://${getIP(options.ip || 'localhost')}:${
                  options.port ?? DefaultPort
                }`
              ),
            ];
            console.log(info.join(' '));
          }
        },
        options,
        record
      );
    });
    // record the server of current project
    setProjectRecord(record, 'findPort', 1);
    const port = await findPort;
    setProjectRecord(record, 'port', port);
  }

  if (!getProjectRecord(record)?.port) {
    const port = await findPort(record);
    setProjectRecord(record, 'port', port);
  }
}
