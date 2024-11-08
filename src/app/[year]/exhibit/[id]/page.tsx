"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft, Users, Github, Youtube, Link } from "lucide-react";
import { use } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getExhibitData, type ExhibitWithAll } from "@/app/actions/exhibit";
import { Spinner } from "@/Components/Spinner";

interface URLDisplay {
  type: "github" | "youtube" | "google-slides" | "other";
  url: string;
}

function parseURL(url: string): URLDisplay {
  try {
    const urlObj = new URL(url);

    if (urlObj.hostname === "github.com") {
      return { type: "github", url };
    }

    if (
      urlObj.hostname === "youtu.be" ||
      urlObj.hostname === "www.youtube.com"
    ) {
      return { type: "youtube", url };
    }

    if (urlObj.hostname === "docs.google.com" && url.includes("presentation")) {
      return { type: "google-slides", url };
    }

    return { type: "other", url };
  } catch {
    return { type: "other", url };
  }
}

function URLContent({ urlInfo }: { urlInfo: URLDisplay }) {
  switch (urlInfo.type) {
    case "github":
      return (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Github className="w-6 h-6 mr-2" />
            GitHubリポジトリ
          </h2>
          <a
            href={urlInfo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline flex items-center"
          >
            リポジトリを見る
          </a>
        </div>
      );

    case "youtube":
      return (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Youtube className="w-6 h-6 mr-2" />
            デモ動画
          </h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              title="YouTube video player"
              src={urlInfo.url.replace("watch?v=", "embed/")}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full min-h-[400px] rounded-lg"
            />
          </div>
        </div>
      );

    case "google-slides":
      return (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">プレゼンテーション</h2>
          <iframe
            title="Google Slides presentation"
            src={urlInfo.url.replace("/pub?", "/embed?")}
            allowFullScreen
            className="w-full min-h-[400px] rounded-lg"
          />
        </div>
      );

    case "other":
      return (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Link className="w-6 h-6 mr-2" />
            関連リンク
          </h2>
          <a
            href={urlInfo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            リンクを開く
          </a>
        </div>
      );
  }
}

export default function ExhibitDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { id } = use(params);
  const [exhibit, setExhibit] = useState<ExhibitWithAll | null>(null);
  const parentPath = pathname.split("/").slice(0, -1).join("/");

  useEffect(() => {
    async function fetchData() {
      const exhibitData = await getExhibitData(id);
      if (exhibitData) {
        setExhibit(exhibitData);
      } else {
        router.push("/404");
      }
    }
    fetchData();
  }, [id, router]);

  if (!exhibit) {
    return <Spinner />;
  }

  const urlInfo = exhibit.url ? parseURL(exhibit.url) : null;

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
            <span>Back to all exhibits</span>
          </button>
        </nav>
        <article>
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-purple-700 mb-4">
              {exhibit.name}
            </h1>
            <div className="flex items-center space-x-4 text-blue-700">
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" aria-hidden="true" />
                <span>
                  {exhibit.members
                    .map((member) => member.member.name)
                    .join(", ")}
                </span>
              </div>
            </div>
          </header>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">作品詳細</h2>
            <div className="prose prose-blue max-w-none">
              {exhibit.description}
            </div>
            <div className="prose prose-blue max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {exhibit.markdownContent}
              </ReactMarkdown>
            </div>
          </div>

          {urlInfo && <URLContent urlInfo={urlInfo} />}
        </article>
      </div>
    </div>
  );
}
