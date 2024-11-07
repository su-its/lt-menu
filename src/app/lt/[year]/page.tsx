"use client";

import { motion } from "framer-motion";
import { Clock, Calendar } from "lucide-react";
import { getLTs } from "@/app/actions/lt";
import { lt_data_table } from "@/app/data/lt";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";
import Link from "next/link";

export default function Home({ params }): {
  params: Promise<{ year: string }>;
} {
  const router = useRouter();
  const { year } = use(params);
  const [talks, setTalks] = useState([]);

  useEffect(() => {
    const fetchTalks = async () => {
      const talks = await getLTs();
      if (talks) {
        setTalks(talks);
      } else {
        router.push("/404");
      }
    };
    fetchTalks();
  }, [router]);

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
            静大LT powered by ITS
          </h1>
          <div className="flex justify-center items-center space-x-6 text-blue-700">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              <span className="font-semibold">Date: 11/9</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              <span className="font-semibold">Time: 13:00 - 14:45</span>
            </div>
          </div>
        </motion.header>
        <main>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {talks.map((talk, index) => (
              <Link href={`/lt/${year}/${talk.id}`} key={talk.id}>
                <motion.div
                  key={talk.id}
                  className="h-full bg-white rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 border-2 border-gray-300 cursor-pointer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="text-sm text-blue-700 mb-2 font-semibold">
                    {talk.time}
                  </div>
                  <h2 className="text-2xl font-bold mb-2 text-purple-700">
                    {talk.title}
                  </h2>
                  <div className="text-md font-medium text-gray-800 mb-2">
                    {talk.speaker}
                  </div>
                  <p className="text-gray-600">{talk.description}</p>
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
            ぜひ、LT大会に来てください！
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
