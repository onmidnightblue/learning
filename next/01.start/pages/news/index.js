// .com/news
import Link from "next/link";

function NewsPage() {
  return (
    <>
      <h1>NewsPage</h1>
      <ul>
        <li>
          <Link href="/news/01">01</Link>
        </li>
        <li>
          <Link href="/news/02">02</Link>
        </li>
      </ul>
    </>
  );
}

export default NewsPage;
