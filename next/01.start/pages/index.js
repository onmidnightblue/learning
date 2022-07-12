// .com/
import Link from "next/link";
import { useRouter } from "next/router";

function HomePage() {
  const router = useRouter();

  return (
    <>
      <h1>HomePage</h1>
      <ul>
        <li>
          <Link href="/news">news</Link>
        </li>
        <li>
          <a href="/news">news</a>
        </li>
        <li>
          <p onClick={() => router.push("/news")}>news</p>
        </li>
      </ul>
    </>
  );
}

export default HomePage;
