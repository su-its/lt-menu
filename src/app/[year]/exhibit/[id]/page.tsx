import {
  ArrowLeft,
  Users,
  Github,
  Youtube,
  Link as IconLink,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  getExhibitData,
  getExhibits,
  type ExhibitWithAll,
} from "@/app/actions/exhibit";
import { getEvent } from "@/app/actions/lt";
import { Spinner } from "@/Components/Spinner";
import { notFound } from "next/navigation";
import Link from "next/link";
import { exhibit_data_table } from "@/constants";

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
          <Link
            href={urlInfo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline flex items-center"
          >
            リポジトリを見る
          </Link>
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
            <IconLink className="w-6 h-6 mr-2" />
            関連リンク
          </h2>
          <Link
            href={urlInfo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            リンクを開く
          </Link>
        </div>
      );
  }
}

export const revalidate = 3600;

export async function generateStaticParams() {
  return exhibit_data_table.map(async (exhibit) => {
    const event = await getEvent(exhibit.id);
    const exhibits = await getExhibits(event);
    return exhibits.map((exhibit) => ({
      params: { id: exhibit.id },
    }));
  });
}

type tParams = Promise<{ id: string }>;

export default async function ExhibitDetail({ params }: { params: tParams }) {
  const { id } = await params;
  const exhibit = await getExhibitData(id);
  if (!exhibit) {
    notFound();
  }

  const urlInfo = exhibit.url ? parseURL(exhibit.url) : null;
  const preUrl = `/${new Date(exhibit.event.date).getFullYear()}/exhibit`;

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
              <span>Back to all exhibits</span>
            </button>
          </Link>
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
