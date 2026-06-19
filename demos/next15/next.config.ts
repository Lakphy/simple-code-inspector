import type { NextConfig } from 'next';
import { codeInspectorPlugin } from 'simple-code-inspector-plugin';

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      rules: codeInspectorPlugin({
        bundler: 'turbopack',
      }),
    },
  },
};

export default nextConfig;
