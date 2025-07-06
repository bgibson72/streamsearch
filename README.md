# 🎬 StreamSearch

**Find the perfect streaming service combination for your favorite shows and save money by avoiding redundant subscriptions.**

[![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-green?style=flat-square)](https://web.dev/progressive-web-apps/)
[![MIT License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🔍 **Smart Show Search** - Browse curated content or search real-time data via TMDB API
- �️ **Rich Thumbnails** - High-quality poster images from TMDB with elegant fallbacks
- �💰 **Budget Optimization** - Get recommendations that respect your budget constraints
- 📱 **Mobile PWA** - Install on your phone for native-like experience
- 🎯 **Value Optimization** - Algorithm prioritizes maximum coverage with minimum services
- 💾 **Persistent Cart** - Your selections are saved locally for 7 days
- 🌙 **Dark Mode** - Modern, accessible design with dark theme
- ⚡ **Offline Ready** - Core functionality works without internet

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bgibson72/streamsearch.git
   cd streamsearch
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Optional: API Configuration

For real-time content data, configure TMDB API:

1. **Run setup wizard**
   ```bash
   npm run setup
   ```

2. **Get free TMDB API key** at [themoviedb.org](https://www.themoviedb.org/settings/api)

3. **Follow the setup instructions**

4. **Restart development server**
## 📱 PWA Installation

### Mobile (iOS/Android)
1. Open StreamSearch in Safari/Chrome
2. Tap the share button
3. Select "Add to Home Screen"
4. Enjoy native-like experience!

### Desktop
1. Look for install icon in address bar
2. Click to install as desktop app
3. Launch from start menu/applications

## 🎯 How It Works

### 1. Select Your Shows
- Browse curated collection of popular shows and movies
- Search real-time data with TMDB API (optional)
- Add favorites to your cart

### 2. Set Your Preferences
- Set monthly budget (optional)
- Choose subscription type (monthly/yearly)
- Enable value optimization for best coverage

### 3. Get Recommendations
- Smart algorithm analyzes service combinations
- Optimizes for cost, coverage, and efficiency
- Shows potential savings and missed content

### 4. Make Informed Decisions
- Compare different service combinations
- See exactly which shows are covered
- Understand cost implications

## �️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **PWA**: next-pwa
- **APIs**: TMDB (optional), JustWatch (planned)
- **Storage**: localStorage with 7-day cache
- **Testing**: Jest + React Testing Library

## 🧪 Testing

### Run Tests
```bash
# Unit tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

### Test Coverage
- ✅ Recommendation algorithm
- ✅ localStorage helpers
- ✅ Component rendering
- ✅ User interactions
- ✅ Error handling

See [TESTING_STRATEGY.md](./TESTING_STRATEGY.md) for detailed testing approach.

## 📊 Algorithm Details

### Scoring System
The recommendation engine scores each service combination based on:

- **Coverage** (40%): Percentage of selected shows available
- **Cost Efficiency** (30%): Coverage per dollar spent
- **Budget Compliance** (20%): Staying within budget constraints
- **Service Count** (10%): Preference for fewer services when optimizing for value

### Optimization Modes
- **Value Mode**: Prioritizes maximum coverage with minimum services
- **Cost Mode**: Prioritizes lowest total cost while meeting coverage goals

## 🔒 Privacy & Compliance

- **No Personal Data**: Zero user tracking or data collection
- **Local Storage**: All data stays on your device
- **API Compliance**: Follows TMDB and JustWatch Terms of Service
- **Educational Use**: Non-commercial, educational purpose only

## 📝 API Integration

### TMDB API
- **Purpose**: Real-time movie/TV show data
- **Rate Limit**: 1000 requests/day
- **Required**: API key from themoviedb.org
- **Fallback**: Curated sample data when not configured

### JustWatch (Planned)
- **Purpose**: Streaming availability data
- **Status**: Under development
- **Alternative**: Manual service mappings

## � Deployment

### Build for Production
```bash
npm run build
npm run start
```

### Environment Variables
```bash
# Optional - for API features
NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
```

### Deploy to Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/bgibson72/streamsearch)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](./CONTRIBUTING.md).

### Development Setup
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Run tests: `npm test`
4. Commit changes: `git commit -m 'Add amazing feature'`
5. Push to branch: `git push origin feature/amazing-feature`
6. Submit pull request

### Code Standards
- TypeScript strict mode
- ESLint + Prettier
- Jest for testing
- Semantic commit messages

## 📈 Roadmap

### V1.1 (Next Release)
- [ ] JustWatch API integration
- [ ] Enhanced mobile experience
- [ ] Streaming service price updates
- [ ] User feedback system

### V1.2 (Future)
- [ ] Multi-language support
- [ ] Advanced filtering options
- [ ] Price trend analysis
- [ ] Social sharing features

## 🐛 Known Issues

- PWA icons need custom design (currently using placeholders)
- Streaming service data requires manual updates
- Limited to English content currently

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## � Acknowledgments

- **TMDB** for providing comprehensive movie/TV data
- **JustWatch** for streaming availability information
- **Next.js Team** for the amazing framework
- **Vercel** for seamless deployment platform

## 📞 Support

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/bgibson72/streamsearch/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/bgibson72/streamsearch/discussions)
- 📧 **Contact**: your.email@example.com

---

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

This project is for educational and informational purposes. See API provider terms for usage restrictions.

---

**Built with ❤️ for cord-cutters and streaming enthusiasts**
