"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Clock, Calendar, ArrowLeft } from "lucide-react";
import { use } from "react";
import { getLTData, type LightningTalkWithAll } from "@/app/actions/lt";
import { formatDateToYYYYMMDD, formatDateToDuration } from "@/libs/dateUtil";
import { Spinner } from "@/Components/Spinner";

export default function TalkDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { id } = use(params);
  const [talk, setTalk] = useState<LightningTalkWithAll | null>(null);
  const parentPath = pathname.split("/").slice(0, -1).join("/");

  useEffect(() => {
    async function fetchData() {
      const talkData = await getLTData(id);
      if (talkData) {
        setTalk(talkData);
      } else {
        router.push("/404");
      }
      console.log(talkData);
    }
    fetchData();
  }, [id, router]);

  if (!talk) {
    return <Spinner />;
  }

  return (
    <div className="bg-white text-black min-h-screen p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-8">
          <button
            type="button"
            onClick={() => router.push(parentPath)}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>Back to all talks</span>
          </button>
        </nav>
        <article>
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-purple-700 mb-4">
              {talk.exhibit.name}
            </h1>
            <div className="flex items-center space-x-4 text-blue-700">
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" aria-hidden="true" />
                <span>
                  {formatDateToDuration(talk.startTime, talk.duration)}
                </span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" aria-hidden="true" />
                <span>{formatDateToYYYYMMDD(talk.startTime)}</span>
              </div>
            </div>
          </header>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">
              Speaker:{" "}
              {talk.exhibit.members
                ?.map((member) => member.member.name)
                .join(", ")}
            </h2>
            <p className="text-gray-600">{talk.exhibit.description}</p>
          </div>
          <div className="aspect-w-16 aspect-h-9 mb-8">
            {talk.slideUrl == null ? (
              <p>スライド公開予定</p>
            ) : (
              <iframe
                src={`${talk.slideUrl}`}
                allowFullScreen
                title={`${talk.exhibit.name} presentation`}
                className="w-full h-full rounded-lg min-h-[500px]"
              />
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
