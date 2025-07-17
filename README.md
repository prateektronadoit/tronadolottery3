This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# Tronado Lottery

A decentralized lottery platform built with Next.js and blockchain technology.

## Language Synchronization

The platform includes a sophisticated language synchronization system that works with Google Translate:

### How it works:

1. **Website Language Switcher**: Users can change languages using the website's built-in language switcher
2. **Google Translate Integration**: When a language is changed, Google Translate automatically detects the change and shows its translation bar
3. **Bidirectional Sync**: The system now automatically synchronizes between:
   - Website language switcher changes → Google Translate updates
   - Google Translate bar changes → Website language switcher updates

### Features:

- **Real-time synchronization**: Language changes are detected and synchronized in real-time
- **Visual feedback**: The language switcher shows a sync indicator (🔄) when updating
- **Multiple detection methods**: Uses custom events, DOM observation, and periodic checks for robust synchronization
- **Error handling**: Graceful error handling to prevent crashes
- **Performance optimized**: Efficient polling and event handling

### Supported Languages:

- English (en)
- Hindi (hi)
- Thai (th)
- Filipino (tl)
- Chinese Simplified (zh-CN)
- Russian (ru)
- Spanish (es)
- Japanese (ja)
- Arabic (ar)
- Urdu (ur)

### Technical Implementation:

The synchronization is implemented using:
- Custom events for real-time communication
- MutationObserver for DOM change detection
- Periodic cookie checking as fallback
- Error handling and recovery mechanisms

This ensures that regardless of how the user changes the language (via website switcher or Google Translate bar), both systems stay synchronized.
