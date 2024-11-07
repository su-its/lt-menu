"use server";

import type { LightningTalk } from "@shizuoka-its/core";

//import { createClient, type Exhibit } from "@shizuoka-its/core";
//
//const client = createClient();
//
//export async function getLts(): Promise<Exhibit[]> {
//  try {
//    const event = await client.services.event.findById("lt-event-id"); // イベントIDを指定
//    if (!event) throw new Error("Event not found");
//
//    const exhibits = await client.services.exhibit.findByEventId(event.id);
//    return exhibits;
//  } catch (error) {
//    console.error("Failed to fetch talks:", error);
//    throw error;
//  }
//}

const mockEvent = {
  events: [
    {
      id: "evt_01HQ5G2J3N4K5M6P7R8T9V0W1",
      name: "静大LT 2024",
      date: "2024-11-09T00:00:00+09:00",
      createdAt: "2024-01-07T12:00:00+09:00",
      updatedAt: "2024-01-07T12:00:00+09:00",
    },
  ],
};

const mock = {
  exhibits: [
    {
      id: "exh_01HQ5G2J3N4K5M6P7R8T9V0W2",
      name: "OSINT(オープンソースインテリジェンス)ってなんですか？",
      description:
        "OSINTの概要、背景知識、技術・ツールについて具体例を交えて紹介。",
      eventId: "evt_01HQ5G2J3N4K5M6P7R8T9V0W1",
      createdAt: "2024-01-07T12:00:00+09:00",
      updatedAt: "2024-01-07T12:00:00+09:00",
    },
    {
      id: "exh_01HQ5G2J3N4K5M6P7R8T9V0W3",
      name: "メーカーでみる設備からくり時計の世界",
      description: "各メーカーの特徴や代表作を、実際の映像とともに紹介。",
      eventId: "evt_01HQ5G2J3N4K5M6P7R8T9V0W1",
      createdAt: "2024-01-07T12:00:00+09:00",
      updatedAt: "2024-01-07T12:00:00+09:00",
    },
    {
      id: "exh_01HQ5G2J3N4K5M6P7R8T9V0W4",
      name: "ポスト・パソコン時代のジャンク遊び Android端末編",
      description: "オンボロなAndroid端末の活用テクニックを紹介。",
      eventId: "evt_01HQ5G2J3N4K5M6P7R8T9V0W1",
      createdAt: "2024-01-07T12:00:00+09:00",
      updatedAt: "2024-01-07T12:00:00+09:00",
    },
    {
      id: "exh_01HQ5G2J3N4K5M6P7R8T9V0W5",
      name: "生のコンピュータの世界",
      description: "C言語から始まる様々な抽象化レイヤについて学ぶ。",
      eventId: "evt_01HQ5G2J3N4K5M6P7R8T9V0W1",
      createdAt: "2024-01-07T12:00:00+09:00",
      updatedAt: "2024-01-07T12:00:00+09:00",
    },
    {
      id: "exh_01HQ5G2J3N4K5M6P7R8T9V0W6",
      name: "プログラミング初心者だった私が技術に魅了されるまで",
      description: "情報学部での4年間で技術を好きになるまでの過程を紹介。",
      eventId: "evt_01HQ5G2J3N4K5M6P7R8T9V0W1",
      createdAt: "2024-01-07T12:00:00+09:00",
      updatedAt: "2024-01-07T12:00:00+09:00",
    },
    {
      id: "exh_01HQ5G2J3N4K5M6P7R8T9V0W7",
      name: "再利用ロケットの現状と今後",
      description: "SpaceX社を中心に再利用ロケットの現状と今後の予想を紹介。",
      eventId: "evt_01HQ5G2J3N4K5M6P7R8T9V0W1",
      createdAt: "2024-01-07T12:00:00+09:00",
      updatedAt: "2024-01-07T12:00:00+09:00",
    },
    {
      id: "exh_01HQ5G2J3N4K5M6P7R8T9V0W8",
      name: "言葉を操る機械",
      description: "言葉を計算可能にする仕組みと簡単な言語埋め込みを紹介。",
      eventId: "evt_01HQ5G2J3N4K5M6P7R8T9V0W1",
      createdAt: "2024-01-07T12:00:00+09:00",
      updatedAt: "2024-01-07T12:00:00+09:00",
    },
  ],
  lightning_talks: [
    {
      exhibitId: "exh_01HQ5G2J3N4K5M6P7R8T9V0W2",
      startTime: "2024-11-09T13:00:00+09:00",
      duration: 15,
      slideUrl: "https://speakerdeck.com/deck/804dc4c6441b40a2ba200de6662a01ed",
      createdAt: "2024-01-07T12:00:00+09:00",
      updatedAt: "2024-01-07T12:00:00+09:00",
    },
    {
      exhibitId: "exh_01HQ5G2J3N4K5M6P7R8T9V0W3",
      startTime: "2024-11-09T13:15:00+09:00",
      duration: 15,
      slideUrl: "https://speakerdeck.com/deck/bcdef12345",
      createdAt: "2024-01-07T12:00:00+09:00",
      updatedAt: "2024-01-07T12:00:00+09:00",
    },
    {
      exhibitId: "exh_01HQ5G2J3N4K5M6P7R8T9V0W4",
      startTime: "2024-11-09T13:30:00+09:00",
      duration: 15,
      slideUrl: "https://speakerdeck.com/deck/cdef123456",
      createdAt: "2024-01-07T12:00:00+09:00",
      updatedAt: "2024-01-07T12:00:00+09:00",
    },
    {
      exhibitId: "exh_01HQ5G2J3N4K5M6P7R8T9V0W5",
      startTime: "2024-11-09T13:45:00+09:00",
      duration: 15,
      slideUrl: "https://speakerdeck.com/deck/def1234567",
      createdAt: "2024-01-07T12:00:00+09:00",
      updatedAt: "2024-01-07T12:00:00+09:00",
    },
    {
      exhibitId: "exh_01HQ5G2J3N4K5M6P7R8T9V0W6",
      startTime: "2024-11-09T14:00:00+09:00",
      duration: 15,
      slideUrl: "https://speakerdeck.com/deck/ef12345678",
      createdAt: "2024-01-07T12:00:00+09:00",
      updatedAt: "2024-01-07T12:00:00+09:00",
    },
    {
      exhibitId: "exh_01HQ5G2J3N4K5M6P7R8T9V0W7",
      startTime: "2024-11-09T14:15:00+09:00",
      duration: 15,
      slideUrl: "https://speakerdeck.com/deck/f123456789",
      createdAt: "2024-01-07T12:00:00+09:00",
      updatedAt: "2024-01-07T12:00:00+09:00",
    },
    {
      exhibitId: "exh_01HQ5G2J3N4K5M6P7R8T9V0W8",
      startTime: "2024-11-09T14:30:00+09:00",
      duration: 15,
      slideUrl: "https://speakerdeck.com/deck/123456789a",
      createdAt: "2024-01-07T12:00:00+09:00",
      updatedAt: "2024-01-07T12:00:00+09:00",
    },
  ],
};
const talks: LightningTalk[] = [
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

export async function getLTs(year: string): Promise<LightningTalk[]> {
  return talks;
}

export async function getLTData(id: string) {
  // 注: 実際のアプリケーションでは、ここで外部APIやデータベースからデータを取得します
  return talks.find((talk) => talk.id === id);
}
