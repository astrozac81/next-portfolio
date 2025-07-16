# Next.js 14 Developer Portfolio Template

A modern, responsive, and SEO-optimized **Next.js 14 portfolio template** designed for developers, designers, and professionals. This open-source project helps you showcase your skills, experience, and projects with an elegant interface that stands out. Built with server-side rendering, TypeScript, and the latest web standards for optimal performance.

## ✨ Key Features

- **Interactive Career Timeline**: Showcase your professional journey with a visually appealing timeline
- **Dark/Light Mode**: Professional appearance with theme support
- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)
- **100% Performance Score**: Fully optimized for speed and Core Web Vitals
- **SEO-Ready**: Structured data, meta tags, and optimized content
- **Modern Tech Stack**: Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui
- **Easy Customization**: Well-organized code structure with minimal effort required
- **Animations**: Subtle animations for engaging user experience
- **Analytics Integration**: Ready for Google Analytics tracking
- **Contact Form**: Functional contact form with validation
- **Open Source**: Free to use and modify for your personal portfolio

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Form Handling**: Server actions with validation
- **Analytics**: Google Analytics + Vercel Analytics
- **Deployment**: [Vercel](https://vercel.com)

## 🔧 Getting Started

Follow these steps to launch the app locally:

### 1. Clone the Repository

```bash
git clone https://github.com/LRenzo0801/next.js-portfolio my-portfolio
cd my-portfolio
```
Replace the URL with your own if you're forking or modifying

2. Set up Environment variables.
``bash
cp .env.copy .env,local
```

3. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

4. Start run Test (optional)
  ```bash
  npm test
  # or
  yarn test
  # or
  pnpm test
  ```

5. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your web browser to see the website.

## 🎨 Customization

The portfolio is designed to be easily customizable:

1. **Personal Information**: Update your personal info in `config/site.ts`
2. **Skills**: Add your skills in `config/skills.ts`
3. **Experiences**: Add your work experiences in `config/experience.ts`
4. **Career Timeline**: Customize your career journey in `config/career.ts`
5. **Contributions**: Showcase your contributions in `config/contributions.ts`
6. **Colors & Theme**: Modify the theme in `tailwind.config.js`

## 🌟 Features In Detail

### Career Timeline

An interactive, animated timeline that showcases your professional journey with expandable sections for details about each position.

### Skills Showcase

Visually represent your technical and soft skills with customizable ratings and categories.

### Project Gallery

Display your projects with detailed information, technologies used, and live demo links.

### Contact Form Integration

A ready-to-use contact form that can connect to various backend services.

### SEO Optimization

Built-in SEO features with proper meta tags, structured data, and semantic HTML.

## 📱 Performance and Responsiveness

This template is optimized for:

- 100% Lighthouse score
- Excellent Core Web Vitals metrics
- Responsive design across all device sizes
- Fast loading times with proper image optimization

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgements

- Design inspired by modern portfolio best practices
- Built by [Isaac Laurent](https://github.com/LRenzo0801)
- Icons from [Lucide](https://lucide.dev/)

## 💻 Deploy on Vercel

The easiest way to deploy your portfolio is using [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme), the platform from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
