import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  // 외부 이미지 도메인 설정
  // images: {
  //   remotePatterns: [{ protocol: 'https', hostname: '**' }],
  // },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
}

export default nextConfig
