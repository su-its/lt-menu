"use client";

import { motion } from "framer-motion";
import { Clock, Calendar } from "lucide-react";
import { getLTs, getEvent } from "@/app/actions/lt";
import type { LightningTalk, Event } from "@shizuoka-its/core";
import { lt_data_table } from "@/constants";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  formatDateToYYYYMMDD,
  formatTimeToHHMM,
  formatDateToDuration,
} from "@/libs/dateUtil";

export default function Home({ params }): {
  params: Promise<{ year: string }>;
} {
  const router = useRouter();
  const { year } = use(params);
  const [talks, setTalks] = useState<LightningTalk & { exhibit: Exhibit }[]>(
    [],
  );
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    const fetchTalks = async () => {
      const eventID = lt_data_table.find((lt) => lt.year === year)?.id;
      const event = await getEvent(eventID);
      const talks = await getLTs(event);
      const sortedTalks = talks.sort((a, b) => {
        const timeA = new Date(a.startTime).getTime();
        const timeB = new Date(b.startTime).getTime();
        return timeA - timeB;
      });
      if (talks && event) {
        setTalks(sortedTalks);
        setEvent(event);
      } else {
        router.push("/404");
      }
    };
    fetchTalks();
  }, [year, router]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white text-black min-h-screen p-8 font-sans overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.header
          className="text-center mb-12 mt-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            {event?.name}
          </h1>
          <div className="flex justify-center items-center space-x-6 text-blue-700">
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
        </motion.header>
        <main>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {talks.map((talk, index) => {
              return (
                <Link
                  href={`/lt/${year}/${talk.exhibitId}`}
                  key={talk.exhibitId}
                >
                  <motion.div
                    key={talk.exhibitId}
                    className="h-full bg-white rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 border-2 border-gray-300 cursor-pointer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
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
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </main>
        <motion.footer
          className="text-center mt-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-xl text-gray-800 mb-4 font-bold">
            ぜひ、LT大会に来てください！
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
