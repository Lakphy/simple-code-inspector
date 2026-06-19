import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { getEnvVariable } from '@/core/src/shared/utils';

describe('getEnvVariable', () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'sci-env-'));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  const writeEnvLocal = (content: string) => {
    fs.writeFileSync(path.join(tmpDir, '.env.local'), content);
  };

  it('should return undefined when .env.local does not exist', () => {
    expect(getEnvVariable('CODE_INSPECTOR', tmpDir)).toBeUndefined();
  });

  it('should read the value of a key from .env.local', () => {
    writeEnvLocal('CODE_INSPECTOR=true\n');
    expect(getEnvVariable('CODE_INSPECTOR', tmpDir)).toBe('true');
  });

  it('should return undefined when the key is absent', () => {
    writeEnvLocal('OTHER=1\n');
    expect(getEnvVariable('CODE_INSPECTOR', tmpDir)).toBeUndefined();
  });

  it('should ignore comments and blank lines', () => {
    writeEnvLocal('# a comment\n\nCODE_INSPECTOR=false\n');
    expect(getEnvVariable('CODE_INSPECTOR', tmpDir)).toBe('false');
  });

  it('should strip surrounding double quotes', () => {
    writeEnvLocal('CODE_INSPECTOR="true"\n');
    expect(getEnvVariable('CODE_INSPECTOR', tmpDir)).toBe('true');
  });

  it('should strip surrounding single quotes', () => {
    writeEnvLocal("CODE_INSPECTOR='true'\n");
    expect(getEnvVariable('CODE_INSPECTOR', tmpDir)).toBe('true');
  });

  it('should skip lines without an "=" separator', () => {
    writeEnvLocal('JUST_A_FLAG\nCODE_INSPECTOR=true\n');
    expect(getEnvVariable('CODE_INSPECTOR', tmpDir)).toBe('true');
  });

  it('should trim whitespace around key and value', () => {
    writeEnvLocal('  CODE_INSPECTOR =  true  \n');
    expect(getEnvVariable('CODE_INSPECTOR', tmpDir)).toBe('true');
  });
});
