"use client";
import { useRouter } from "next/navigation";
import { Presentation, Monitor } from "lucide-react";

export default function Component() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-purple-800 mb-4">
            テクノフェスタ 2024
          </h1>
          <p className="text-xl text-gray-600">
            学生たちの技術と創造性が織りなす展示会
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <button
            type="button"
            onClick={() => router.push("/2024/lt")}
            className="group transition-all hover:translate-y-[-4px] relative"
          >
            <div className="bg-white rounded-xl shadow-lg p-8 transition-shadow group-hover:shadow-xl border-2 border-transparent hover:border-purple-200">
              <div className="flex flex-col items-center text-center">
                <div className="bg-purple-100 p-4 rounded-full mb-6">
                  <Presentation className="w-12 h-12 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-purple-900 mb-3">
                  ライトニングトーク
                </h2>
                <p className="text-gray-600">
                  学生たちによる10〜15分間の短い発表で、
                  様々なプロジェクトや技術的な知見を共有します
                </p>
              </div>
            </div>
          </button>
          <button
            type="button"
            onClick={() => router.push("/2024/exhibit")}
            className="group transition-all hover:translate-y-[-4px] relative"
          >
            <div className="bg-white rounded-xl shadow-lg p-8 transition-shadow group-hover:shadow-xl border-2 border-transparent hover:border-purple-200">
              <div className="flex flex-col items-center text-center">
                <div className="bg-purple-100 p-4 rounded-full mb-6">
                  <Monitor className="w-12 h-12 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-purple-900 mb-3">
                  作品展示
                </h2>
                <p className="text-gray-600">
                  学生たちが開発したアプリケーション、
                  システム、研究成果などの展示をご覧いただけます
                </p>
              </div>
            </div>
          </button>
        </div>

        <footer className="mt-16 text-center">
          <p className="text-gray-500">
            主催: 静岡大学情報学部ITソルーション室
          </p>
        </footer>
      </div>
    </div>
  );
}
