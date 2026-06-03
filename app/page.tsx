import Homepage from "../components/homepage";
import { getHomeData } from "../sanity/fetch";

export const revalidate = 60;

export default async function Page() {
  const { content, categories, questions, stats } = await getHomeData();
  return (
    <Homepage
      content={content}
      categories={categories}
      questions={questions}
      stats={stats}
    />
  );
}
