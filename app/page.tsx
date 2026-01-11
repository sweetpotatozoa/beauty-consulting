import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
    return (
        <div className="min-h-screen bg-white max-w-md mx-auto">
            {/* Header */}
            <header className="py-4 border-b border-gray-200">
                <div className="mx-auto max-w-md px-4">
                    <div className="flex items-center gap-2">
                        <Image src="/landing/logo.svg" alt="戀愛顏值測試" width={24} height={24} className="w-6 h-6" />
                        <h1 className="text-xl font-bold text-gray-800">戀愛顏值測試</h1>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-md px-4 pt-4 pb-0">
                {/* Stats Badge */}
                <div className="mb-8 text-center">
                    <div className="inline-block bg-black text-white text-base px-4 py-2 rounded-full">
                        ⭐ 9,688人精確個性化戀愛顏值分析
                    </div>
                </div>

                {/* Hero Section */}
                <section className="mb-12">
                    <h2 className="text-5xl font-bold mb-4 text-gray-900">戀愛顏值測試</h2>
                    <p className="text-2xl font-bold text-gray-800 mb-1">你在戀愛裡，</p>
                    <p className="text-2xl font-bold text-gray-800 mb-6">看起來真的「加分」嗎？</p>

                    <p className="text-base text-gray-800 mb-1">你不是不漂亮，</p>
                    <p className="text-base text-gray-800 mb-6">只是還沒用對戀愛會喜歡的顏值版本。</p>

                    {/* Before Image */}
                    <div className="mb-6 flex justify-center">
                        <div className="w-48 rounded-lg overflow-hidden">
                            <Image
                                src="/landing/before.png"
                                alt="Before"
                                width={300}
                                height={400}
                                className="w-full h-auto"
                            />
                        </div>
                    </div>

                    <p className="text-xl text-gray-600 mb-1">上傳一張照片，</p>
                    <p className="text-xl text-gray-600 mb-1">立刻知道你現在的顏值，</p>
                    <p className="text-xl text-gray-600 mb-8">在戀愛中想是加分還是扣分？</p>
                </section>

                {/* What is this test? */}
                <section className="mb-12">
                    <h3 className="text-3xl font-bold mb-4 text-gray-900">戀愛顏值測試是什麼？</h3>

                    <div className="mb-4">
                        <p className="text-base text-gray-800 mb-3">我們從你的</p>
                        <p className="text-base text-gray-800 mb-3">•膚色與整體色感</p>
                        <p className="text-base text-gray-800 mb-3">•臉型與五官比例</p>
                        <p className="text-base text-gray-800 mb-3">•視覺對比與氣質</p>
                    </div>

                    <p className="text-base text-gray-800 mb-4">分析出——</p>
                    <p className="text-base text-gray-800 mb-6">最容易讓人產生好感的戀愛顏值版本。</p>
                    {/* After Image */}
                    <div className="mb-6 flex justify-center">
                        <div className="w-64 rounded-lg overflow-hidden">
                            <Image
                                src="/landing/after.png"
                                alt="After"
                                width={600}
                                height={800}
                                className="w-full h-auto"
                            />
                        </div>
                    </div>

                    <p className="text-xl text-gray-600 mb-1">上傳一張照片，</p>
                    <p className="text-xl text-gray-600 mb-1">立刻知道你現在的顏值，</p>
                    <p className="text-xl text-gray-600 mb-6">在戀愛中想是加分還是扣分？</p>
                </section>

                {/* If you're curious */}
                <section className="mb-12 -mx-4 px-4 py-6 bg-[#F9FAFB]">
                    <h3 className="text-3xl font-bold mb-3 text-gray-900">如果你也好奇這些 👀</h3>
                    <p className="text-xl text-gray-700 mb-2">這些，</p>
                    <p className="text-xl text-gray-700 mb-4">戀愛顏值測試都會找告訴你。</p>

                    <div className="bg-white border border-gray-200 rounded-lg p-8 mb-6">
                        <div className="space-y-3">
                            <p className="flex items-start gap-2 text-sm text-gray-900">
                                <span>🌸 你適合「讓人想靠近」還是「讓人想追」的顏值</span>
                            </p>
                            <p className="flex items-start gap-2 text-sm text-gray-900">
                                <span>💄 最加分的髮色、穿搭方向</span>
                            </p>
                            <p className="flex items-start gap-2 text-sm text-gray-900">
                                <span>❌ 戀愛中最容易默默扣分的外型地雷</span>
                            </p>
                            <p className="flex items-start gap-2 text-sm text-gray-900">
                                <span>💥 為什麼你明明不醜，卻常被異性當朋友</span>
                            </p>
                        </div>
                    </div>
                </section>

                {/* Free Features */}
                <section className="mb-12 text-center">
                    <h3 className="text-3xl font-bold mb-4 text-gray-900">免費能看到什麼？</h3>
                    <div className="space-y-2 inline-block text-left">
                        <p className="flex items-center gap-2 text-lg text-gray-700">
                            <span className="text-gray-900">✔️</span>
                            <span>你的戀愛顏值值型</span>
                        </p>
                        <p className="flex items-center gap-2 text-lg text-gray-700">
                            <span className="text-gray-900">✔️</span>
                            <span>第一印象關鍵字</span>
                        </p>
                        <p className="flex items-center gap-2 text-lg text-gray-700">
                            <span className="text-gray-900">✔️</span>
                            <span>一個簡單明瞭的建議</span>
                        </p>
                    </div>
                </section>

                {/* Paid Features */}
                <section className="mb-0 -mx-4 px-4 py-6 bg-[#F9FAFB]">
                    <h3 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                        <span className="text-yellow-600">🔒</span>
                        完整解析會告訴你
                    </h3>

                    <div className="space-y-6">
                        <div className="flex items-start gap-3">
                            <Image
                                src="/landing/check.svg"
                                alt="check"
                                width={24}
                                height={24}
                                className="w-6 h-6 shrink-0 mt-0.5"
                            />
                            <div className="flex-1">
                                <p className="text-lg font-semibold text-gray-900 mb-1">
                                    2025–2028年最容易脫單的顏值方向
                                </p>
                                <p className="text-xs text-gray-600">分析未來幾年最容易吸引戀愛機會的外在方向。</p>
                                <p className="text-xs text-gray-600">幫你在對的時間，呈現最有吸引力的樣子。</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Image
                                src="/landing/check.svg"
                                alt="check"
                                width={24}
                                height={24}
                                className="w-6 h-6 shrink-0 mt-0.5"
                            />
                            <div className="flex-1">
                                <p className="text-lg font-semibold text-gray-900 mb-1">
                                    最適合你的「戀愛感」髮型與穿搭
                                </p>
                                <p className="text-xs text-gray-600">找出最容易讓人產生好感的髮型與穿搭風格。</p>
                                <p className="text-xs text-gray-600">不是流行，而是真正適合你的戀愛顏值。</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Image
                                src="/landing/check.svg"
                                alt="check"
                                width={24}
                                height={24}
                                className="w-6 h-6 shrink-0 mt-0.5"
                            />
                            <div className="flex-1">
                                <p className="text-lg font-semibold text-gray-900 mb-1">哪些風格會讓對方瞬間冷掉</p>
                                <p className="text-xs text-gray-600">明確指出容易讓好感下降的造型地雷。</p>
                                <p className="text-xs text-gray-600">避免不必要的扣分與誤會。</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Image
                                src="/landing/check.svg"
                                alt="check"
                                width={24}
                                height={24}
                                className="w-6 h-6 shrink-0 mt-0.5"
                            />
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-900 mb-1">
                                    一眼就讓人想更認識你的關鍵調整點
                                </p>
                                <p className="text-xs text-gray-600">找出只要微調，就能改變第一印象的重點。</p>
                                <p className="text-xs text-gray-600">讓人第一眼就想更靠近你。</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Floating CTA Button */}
            <div className="fixed bottom-6 left-0 right-0 px-4 z-50">
                <div className="mx-auto max-w-md">
                    <Link
                        href="/consultation/new"
                        className="block w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-center py-4 rounded-full shadow-lg transition-all"
                    >
                        開始測試
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-[#1a2332] text-white px-4 py-8 pb-24">
                <div className="mx-auto max-w-md">
                    <div className="flex items-center gap-2 mb-4">
                        <Image src="/landing/logo.svg" alt="戀愛顏值測試" width={24} height={24} className="w-6 h-6" />
                        <h3 className="text-base font-bold">戀愛顏值測試</h3>
                    </div>
                    <p className="text-sm text-gray-400 mb-6">你的專屬 AI 戀愛造型師，一次給你最適合的造型答案。</p>
                    <div className="border-t border-gray-700 pt-6">
                        <p className="text-xs text-gray-500 text-center">© 2026 戀愛顏值測試 . All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
