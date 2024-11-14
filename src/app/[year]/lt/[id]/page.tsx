import { Clock, Calendar, ArrowLeft } from "lucide-react";
import { getLTData, getLTs, type LightningTalkWithAll } from "@/app/actions/lt";
import { getEvent } from "@/app/actions/lt";
import Link from "next/link";
import { formatDateToYYYYMMDD, formatDateToDuration } from "@/libs/dateUtil";
import { Spinner } from "@/Components/Spinner";
import { notFound } from "next/navigation";
import { lt_data_table } from "@/constants";

export const revalidate = 3600;

export async function generateStaticParams() {
  return lt_data_table.map(async (lt) => {
    const event = await getEvent(lt.id);
    const talks = await getLTs(event);
    return talks.map((talk) => ({
      id: talk.exhibitId,
    }));
  });
}

type tParams = Promise<{ id: string }>;

export default async function TalkDetail({ params }: { params: tParams }) {
  const { id } = await params;
  const talk = await getLTData(id);
  if (!talk) {
    notFound();
  }

  const preUrl = `/${new Date(talk.exhibit.event.date).getFullYear()}/lt`;

  return (
    <div className="bg-white text-black min-h-screen p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-8">
          <Link href={preUrl}>
            <button
              type="button"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span>Back to all talks</span>
            </button>
          </Link>
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
                src={talk.slideUrl}
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
