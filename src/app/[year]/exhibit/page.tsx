"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { getExhibits, type ExhibitWithAll } from "../../actions/exhibit";
import type { Event } from "@shizuoka-its/core";
import { exhibit_data_table } from "@/constants";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { formatDateToYYYYMMDD } from "@/libs/dateUtil";
import { Spinner } from "@/Components/Spinner";
import { getEvent } from "@/app/actions/lt";

export default function ExhibitList({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const router = useRouter();
  const { year } = use(params);
  const [exhibits, setExhibits] = useState<ExhibitWithAll[]>([]);
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    const fetchExhibits = async () => {
      const eventID = exhibit_data_table.find(
        (exhibit) => exhibit.year === year,
      )?.id as string;
      const event = await getEvent(eventID);
      const exhibits = await getExhibits(event);
      if (exhibits && event) {
        setExhibits(exhibits);
        setEvent(event);
      } else {
        router.push("/404");
      }
    };
    fetchExhibits();
  }, [year, router]);

  if (!event) {
    return <Spinner />;
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
          <h1 className="text-3xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            {event?.name} 展示品一覧
          </h1>
          <div className="flex justify-center items-center space-x-6 text-blue-700">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              <span className="font-semibold">
                Date: {formatDateToYYYYMMDD(event?.date)}
              </span>
            </div>
          </div>
        </motion.header>
        <main>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {exhibits.map((exhibit, index) => (
              <Link href={`/${year}/exhibit/${exhibit.id}`} key={exhibit.id}>
                <motion.div
                  className="h-full bg-white rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 border-2 border-gray-300 cursor-pointer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <h2 className="text-2xl font-bold mb-2 text-purple-700">
                    {exhibit.name}
                  </h2>
                  <div className="text-md font-medium text-gray-800 mb-2">
                    {exhibit.members
                      .map((member) => member.member.name)
                      .join(", ")}
                  </div>
                  {exhibit.description && (
                    <p className="text-gray-600">{exhibit.description}</p>
                  )}
                  {exhibit.url && (
                    <div className="mt-2">
                      <a
                        href={exhibit.url}
                        className="text-blue-600 hover:text-blue-800 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        関連リンク
                      </a>
                    </div>
                  )}
                </motion.div>
              </Link>
            ))}
          </div>
        </main>
        <motion.footer
          className="text-center mt-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-xl text-gray-800 mb-4 font-bold">
            素晴らしい展示をお楽しみください！
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
