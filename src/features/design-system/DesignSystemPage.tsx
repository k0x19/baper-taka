import React from 'react';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Container } from '@/components/ui/container';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, Radio } from '@/components/ui/radio';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

export function DesignSystemPage() {
  const { t } = useTranslation();

  return (
    <Container size="2xl" className="py-12">
      <div className="mb-12 text-center">
        <h1 className="text-display font-display text-brand-900 mb-4">
          {t('brand.designSystem.title', 'Design System Preview')}
        </h1>
        <p className="text-body text-muted-foreground">
          {t('brand.designSystem.description', 'Baper Taka (বাপের টাকা) Phase 02 Branding & Design System implementation.')}
        </p>
        <div className="mt-6 flex gap-4 justify-center">
          <Link to="/">
            <Button variant="outline">{t('layout.skipLink', 'Go to Foundation')}</Button>
          </Link>
        </div>
      </div>

      <Separator className="mb-12" />

      {/* Brand & Colors */}
      <section className="mb-16">
        <h2 className="text-h2 font-display mb-6 text-brand-800">
          {t('brand.designSystem.brand', 'Brand Identity & Colors')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Logo Lockup</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center h-48 bg-brand-50">
              <img src="/assets/logo/lockup.svg" alt="বাপের টাকা Baper Taka" className="max-w-full h-auto" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Primary Navy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-md bg-brand-700" />
                <div>
                  <p className="text-body font-medium">Navy 700</p>
                  <p className="text-small text-muted-foreground">#172554</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Accent Amber</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-md bg-brand-200" />
                <div>
                  <p className="text-body font-medium">Amber 200</p>
                  <p className="text-small text-muted-foreground">#FACC15</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Typography */}
      <section className="mb-16">
        <h2 className="text-h2 font-display mb-6 text-brand-800">
          {t('brand.designSystem.typography', 'Typography System')}
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-h3 mb-2">Display & Headings</h3>
            <div className="space-y-4">
              <h1 className="text-display">Display: বাপের টাকা Baper Taka</h1>
              <h2 className="text-h2">H1: প্রযুক্তিগত ভিত্তি</h2>
              <h3 className="text-h3">H2: বাপের টাকা</h3>
              <h4 className="text-h4">H3: বাপের টাকা</h4>
              <h5 className="text-h5">H4: বাপের টাকা</h5>
              <h6 className="text-h6">H5: বাপের টাকা</h6>
            </div>
          </div>
          <div>
            <h3 className="text-h3 mb-2">Body & Small</h3>
            <div className="space-y-2">
              <p className="text-body">
                বাপের টাকা (Baper Taka) — একটি বিশ্বস্ত, আধুনিক এবং সহজ ই- ]);
              </p>
              <p className="text-small text-muted-foreground">
                চলাক এবং সহজ: বাংলা ও ইংরেজি।
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-h3 mb-2">Price & Label</h3>
            <div className="flex gap-6">
              <span className="text-price">৳ 1,250.00</span>
              <span className="text-label bg-muted px-2 py-1 rounded">Label Text</span>
            </div>
          </div>
        </div>
      </section>

      {/* Components */}
      <section className="mb-16">
        <h2 className="text-h2 font-display mb-6 text-brand-800">
          {t('brand.designSystem.components', 'Reusable Components')}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-h4 mb-4">Buttons & Inputs</h3>
            <div className="flex flex-wrap gap-4 mb-6">
              <Button>Default Button</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="brand">Brand Navy</Button>
              <Button variant="accent">Accent Amber</Button>
            </div>
            <div className="space-y-4">
              <label className="text-label block">Input Field</label>
              <Input placeholder="আপনার নাম বা ইমেইল" />
              <label className="text-label block mt-4">Textarea</label>
              <Textarea placeholder="আপনারglichন এখানে লিখুন..." rows={3} />
            </div>
          </div>
          <div>
            <h3 className="text-h4 mb-4">Controls & Feedback</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Checkbox id="agree" />
                <label htmlFor="agree" className="text-body">আমি শর্তাবলী গ্রহণ করি</label>
              </div>
              <div className="flex gap-4">
                <RadioGroup>
                  <div className="flex items-center gap-2">
                    <Radio id="bn" name="lang" defaultChecked />
                    <label htmlFor="bn" className="text-body">বাংলা</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Radio id="en" name="lang" />
                    <label htmlFor="en" className="text-body">English</label>
                  </div>
                </RadioGroup>
              </div>
              <Alert variant="warning">
                <AlertTitle>সতর্কতা</AlertTitle>
                <AlertDescription>এটি একটি প্রাক-প্রস্তুতিকরণ প্রাক্কলন।</AlertDescription>
              </Alert>
              <Alert variant="default">
                <AlertTitle>সফল</AlertTitle>
                <AlertDescription>বাপের টাকা ডিজাইন সিস্টেম তৈরি করা হয়েছে।</AlertDescription>
              </Alert>
            </div>
          </div>
        </div>
      </section>

      {/* Loading State */}
      <section className="mb-16">
        <h2 className="text-h2 font-display mb-6 text-brand-800">
          {t('brand.designSystem.loading', 'Loading States')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-[60%]" />
              <Skeleton className="h-4 w-[80%]" />
              <Skeleton className="h-4 w-[50%]" />
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-4">
              <Skeleton className="h-20 w-full rounded-lg" />
              <Skeleton className="h-4 w-[70%]" />
              <Skeleton className="h-4 w-[90%]" />
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="mb-12" />

      <div className="text-center text-small text-muted-foreground">
        <p>Baper Taka (বাপের টাকা) — Phase 02 Design System Implementation</p>
        <p>© {new Date().getFullYear()} বাপের টাকা · Phase 02</p>
      </div>
    </Container>
  );
}
