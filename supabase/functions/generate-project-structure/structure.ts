import { ProjectStructure } from './types.ts';
import { generateLayoutComponents, generateUIComponents } from './components.ts';

export const generateProjectStructure = (prompt: string): ProjectStructure => {
  return {
    name: "Beauty Salon Landing Page",
    description: prompt,
    components: [
      {
        name: "src",
        type: "directory",
        path: "/src",
        description: "Source code directory",
        children: [
          {
            name: "pages",
            type: "directory",
            path: "/src/pages",
            description: "Page components",
            children: [
              {
                name: "Home.tsx",
                type: "component",
                path: "/src/pages/Home.tsx",
                description: "Home page component",
                code: `
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';

const Home = () => {
  return (
    <Layout>
      <Hero />
      <Services />
      <About />
      <Contact />
    </Layout>
  );
};

export default Home;`,
                language: "typescript"
              }
            ]
          },
          {
            name: "components",
            type: "directory",
            path: "/src/components",
            description: "Reusable components",
            children: [
              {
                name: "sections",
                type: "directory",
                path: "/src/components/sections",
                description: "Landing page sections",
                children: [
                  {
                    name: "Hero.tsx",
                    type: "component",
                    path: "/src/components/sections/Hero.tsx",
                    description: "Hero section component",
                    code: `
import React from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-purple-600 to-pink-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
            美しさの新しい発見
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base sm:text-lg md:mt-5 md:text-xl">
            プロフェッショナルなスタイリストによる、あなただけの特別なヘアケア
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <Button variant="secondary" size="lg">
              予約する
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;`,
                    language: "typescript"
                  },
                  {
                    name: "Services.tsx",
                    type: "component",
                    path: "/src/components/sections/Services.tsx",
                    description: "Services section component",
                    code: `
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const services = [
  {
    title: "カット",
    description: "経験豊富なスタイリストによる、あなたに合わせたヘアスタイルの提案",
    price: "¥6,000~"
  },
  {
    title: "カラー",
    description: "トレンドや肌の色に合わせた、パーソナライズされたカラーリング",
    price: "¥8,000~"
  },
  {
    title: "パーマ",
    description: "髪質や生活スタイルに合わせた、持続性の高いパーマ施術",
    price: "¥10,000~"
  }
];

const Services = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            サービス内容
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            お客様一人一人に合わせた最適なサービスをご提供します
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
                <p className="mt-2 text-2xl font-bold text-purple-600">{service.price}</p>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;`,
                    language: "typescript"
                  },
                  {
                    name: "About.tsx",
                    type: "component",
                    path: "/src/components/sections/About.tsx",
                    description: "About section component",
                    code: `
import React from 'react';

const About = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            私たちについて
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 lg:mx-auto">
            10年以上の経験を持つスタイリストたちが、最高品質のサービスを提供します
          </p>
        </div>
        <div className="mt-10">
          <div className="prose prose-lg mx-auto text-gray-600">
            <p>
              当サロンは、お客様一人一人の個性や生活スタイルに合わせた、
              オーダーメイドのヘアスタイリングを提供することを心がけています。
            </p>
            <p className="mt-4">
              最新のトレンドと技術を取り入れながら、
              お客様の髪の健康を第一に考えた施術を行っています。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;`,
                    language: "typescript"
                  },
                  {
                    name: "Contact.tsx",
                    type: "component",
                    path: "/src/components/sections/Contact.tsx",
                    description: "Contact section component",
                    code: `
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Contact = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            お問い合わせ
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            ご質問やご予約はこちらからお気軽にどうぞ
          </p>
        </div>
        <div className="mt-12 max-w-lg mx-auto">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                お名前
              </label>
              <Input
                type="text"
                id="name"
                name="name"
                className="mt-1"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                メールアドレス
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                className="mt-1"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                メッセージ
              </label>
              <Textarea
                id="message"
                name="message"
                rows={4}
                className="mt-1"
                required
              />
            </div>
            <div>
              <Button type="submit" className="w-full">
                送信する
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;`,
                    language: "typescript"
                  }
                ]
              },
              {
                name: "layout",
                type: "directory",
                path: "/src/components/layout",
                description: "Layout components",
                children: generateLayoutComponents()
              },
              {
                name: "ui",
                type: "directory",
                path: "/src/components/ui",
                description: "UI components",
                children: generateUIComponents()
              }
            ]
          }
        ]
      }
    ],
    dependencies: [
      "react",
      "react-dom",
      "react-router-dom",
      "typescript",
      "tailwindcss",
      "@tanstack/react-query",
      "lucide-react",
      "clsx",
      "class-variance-authority"
    ]
  };
};