"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, Calendar } from "lucide-react";

export default function Component() {
	const [mounted, setMounted] = useState(false);
	const [isDarkMode, setIsDarkMode] = useState(true);

	useEffect(() => {
		setMounted(true);
	}, []);

	const talks = [
		{
			id: "0",
			time: "13:00-13:15",
			speaker: "諸岡成",
			title: "OSINT(オープンソースインテリジェンス)ってなんですか？",
			description:
				"OSINTの概要、背景知識、技術・ツールについて具体例を交えて紹介。",
		},
		{
			id: "1",
			time: "13:15-13:30",
			speaker: "中優樹",
			title: "メーカーでみる設備からくり時計の世界",
			description: "各メーカーの特徴や代表作を、実際の映像とともに紹介。",
		},
		{
			id: "2",
			time: "13:30-13:45",
			speaker: "荒川 奏良",
			title: "ポスト・パソコン時代のジャンク遊び Android端末編",
			description: "オンボロなAndroid端末の活用テクニックを紹介。",
		},
		{
			id: "3",
			time: "13:45-14:00",
			speaker: "齊藤遼太",
			title: "生のコンピュータの世界",
			description: "C言語から始まる様々な抽象化レイヤについて学ぶ。",
		},
		{
			id: "4",
			time: "14:00-14:15",
			speaker: "馬場海好",
			title: "プログラミング初心者だった私が技術に魅了されるまで",
			description: "情報学部での4年間で技術を好きになるまでの過程を紹介。",
		},
		{
			id: "5",
			time: "14:15-14:30",
			speaker: "前川悠稀",
			title: "再利用ロケットの現状と今後",
			description: "SpaceX社を中心に再利用ロケットの現状と今後の予想を紹介。",
		},
		{
			id: "6",
			time: "14:30-14:45",
			speaker: "片岩拓也",
			title: "言葉を操る機械",
			description: "言葉を計算可能にする仕組みと簡単な言語埋め込みを紹介。",
		},
	];

	if (!mounted) return null;

	return (
		<div
			className={`${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} min-h-screen p-8 font-sans overflow-hidden transition-colors duration-300`}
		>
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
					<div
						className={`flex justify-center items-center space-x-6 ${isDarkMode ? "text-blue-300" : "text-blue-700"}`}
					>
						<div className="flex items-center">
							<Calendar className="w-5 h-5 mr-2" />
							<span className="font-semibold">Date: 11/9(土曜)</span>
						</div>
						<div className="flex items-center">
							<Clock
								className={`w-5 h-5 mr-2 cursor-pointer ${isDarkMode ? "text-blue-300" : "text-blue-700"}`}
								onClick={() => setIsDarkMode(!isDarkMode)}
							/>
							<span className="font-semibold">Time: 13:00 - 14:45</span>
						</div>
					</div>
				</motion.header>
				<main>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{talks.map((talk, index) => (
							<motion.div
								key={talk.id}
								className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"} rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 border-2`}
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.3, delay: index * 0.1 }}
							>
								<div
									className={`text-sm ${isDarkMode ? "text-blue-400" : "text-blue-700"} mb-2 font-semibold`}
								>
									{talk.time}
								</div>
								<h2
									className={`text-2xl font-bold mb-2 ${isDarkMode ? "text-purple-400" : "text-purple-700"}`}
								>
									{talk.title}
								</h2>
								<div
									className={`text-md font-medium ${isDarkMode ? "text-gray-300" : "text-gray-800"} mb-2`}
								>
									{talk.speaker}
								</div>
								<p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
									{talk.description}
								</p>
							</motion.div>
						))}
					</div>
				</main>
				<motion.footer
					className="text-center mt-12"
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.5 }}
				>
					<p
						className={`text-xl ${isDarkMode ? "text-gray-300" : "text-gray-800"} mb-4 font-bold`}
					>
						ぜひ、LT大会に来てください！
					</p>
				</motion.footer>
			</div>
		</div>
	);
}
