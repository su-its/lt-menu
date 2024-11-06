"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Clock, Calendar, ArrowLeft } from "lucide-react";
import { use } from "react";

async function fetchTalkData(id: string) {
  // 注: 実際のアプリケーションでは、ここで外部APIやデータベースからデータを取得します
  const talks = [
    {
      id: "1",
      time: "13:00-13:15",
      speaker: "諸岡成",
      title: "OSINT(オープンソースインテリジェンス)ってなんですか？",
      description:
        "OSINTの概要、背景知識、技術・ツールについて具体例を交えて紹介。",
      speakerDeckId: "804dc4c6441b40a2ba200de6662a01ed",
    },
    {
      id: "2",
      time: "13:15-13:30",
      speaker: "中優樹",
      title: "メーカーでみる設備からくり時計の世界",
      description: "各メーカーの特徴や代表作を、実際の映像とともに紹介。",
      speakerDeckId: "bcdef12345",
    },
    {
      id: "3",
      time: "13:30-13:45",
      speaker: "荒川 奏良",
      title: "ポスト・パソコン時代のジャンク遊び Android端末編",
      description: "オンボロなAndroid端末の活用テクニックを紹介。",
      speakerDeckId: "cdef123456",
    },
    {
      id: "4",
      time: "13:45-14:00",
      speaker: "齊藤遼太",
      title: "生のコンピュータの世界",
      description: "C言語から始まる様々な抽象化レイヤについて学ぶ。",
      speakerDeckId: "def1234567",
    },
    {
      id: "5",
      time: "14:00-14:15",
      speaker: "馬場海好",
      title: "プログラミング初心者だった私が技術に魅了されるまで",
      description: "情報学部での4年間で技術を好きになるまでの過程を紹介。",
      speakerDeckId: "ef12345678",
    },
    {
      id: "6",
      time: "14:15-14:30",
      speaker: "前川悠稀",
      title: "再利用ロケットの現状と今後",
      description: "SpaceX社を中心に再利用ロケットの現状と今後の予想を紹介。",
      speakerDeckId: "f123456789",
    },
    {
      id: "7",
      time: "14:30-14:45",
      speaker: "片岩拓也",
      title: "言葉を操る機械",
      description: "言葉を計算可能にする仕組みと簡単な言語埋め込みを紹介。",
      speakerDeckId: "123456789a",
    },
  ];
  return talks.find((talk) => talk.id === id);
}

export default function TalkDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  const [talk, setTalk] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const talkData = await fetchTalkData(id);
      if (talkData) {
        setTalk(talkData);
      } else {
        router.push("/404");
      }
    }
    fetchData();
  }, [id, router]);

  if (!talk) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white text-black min-h-screen p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-8">
          <button
            type="button"
            onClick={() => router.push("/talk")}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>Back to all talks</span>
          </button>
        </nav>
        <article>
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-purple-700 mb-4">
              {talk.title}
            </h1>
            <div className="flex items-center space-x-4 text-blue-700">
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" aria-hidden="true" />
                <span>{talk.time}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" aria-hidden="true" />
                <span>11/9</span>
              </div>
            </div>
          </header>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">
              Speaker: {talk.speaker}
            </h2>
            <p className="text-gray-600">{talk.description}</p>
          </div>
          <div className="aspect-w-16 aspect-h-9 mb-8">
            <iframe
              src={`https://speakerdeck.com/player/${talk.speakerDeckId}`}
              allowFullScreen
              title={`${talk.title} presentation`}
              className="w-full h-full rounded-lg min-h-[500px]"
            />
          </div>
        </article>
      </div>
    </div>
  );
}
