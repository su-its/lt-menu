import { Clock, Calendar } from "lucide-react";
import { getLTs, getEvent, type LightningTalkWithAll } from "@/app/actions/lt";
import type { Event } from "@shizuoka-its/core";
import { lt_data_table } from "@/constants";
import Link from "next/link";
import { formatDateToYYYYMMDD, formatDateToDuration } from "@/libs/dateUtil";
import { Spinner } from "@/Components/Spinner";
import { notFound } from "next/navigation";

export const revalidate = 3600;

export async function generateStaticParams() {
  return lt_data_table.map((lt) => ({
    year: lt.year,
  }));
}

type tParams = Promise<{ year: string }>;

export default async function ({ params }: { params: tParams }) {
  const { year } = await params;

  const eventID = lt_data_table.find((lt) => lt.year === year)?.id as string;
  const event = await getEvent(eventID);
  if (!event) {
    notFound();
  }

  const talks = await getLTs(event).then((talks) =>
    talks.sort((a, b) => {
      return a.startTime > b.startTime ? 1 : -1;
    }),
  );

  return (
    <div className="bg-white text-black min-h-screen p-8 font-sans overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12 mt-16">
          <h1 className="text-3xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            {event?.name}
          </h1>
          <div className="flex justify-center items-center space-x-6 text-blue-700 lg:flex-row flex-col">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              <span className="font-semibold">
                Date: {formatDateToYYYYMMDD(event?.date)}
              </span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              <span className="font-semibold">Time: 13:00 - 14:45</span>
            </div>
          </div>
        </header>
        <main>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {talks.map((talk, index) => {
              return (
                <Link
                  href={`/${year}/lt/${talk.exhibitId}`}
                  key={talk.exhibitId}
                >
                  <div
                    key={talk.exhibitId}
                    className="h-full bg-white rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 border-2 border-gray-300 cursor-pointer"
                  >
                    <div className="text-sm text-blue-700 mb-2 font-semibold">
                      {formatDateToDuration(talk.startTime, talk.duration)}
                    </div>
                    <h2 className="text-2xl font-bold mb-2 text-purple-700">
                      {talk.exhibit.name}
                    </h2>
                    <div className="text-md font-medium text-gray-800 mb-2">
                      {talk.exhibit.members
                        .map((member) => member.member.name)
                        .join(", ")}
                    </div>
                    <p className="text-gray-600">{talk.exhibit.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </main>
        <footer className="text-center mt-12">
          <p className="text-xl text-gray-800 mb-4 font-bold">
            ぜひ、LT大会に来てください！
          </p>
        </footer>
      </div>
    </div>
  );
}
