import { useLoaderData, useTransition } from "remix";
import { getRabbitPosts, RabbitPost } from "~/services/rabbit";
import type { LinksFunction } from "remix";

import stylesUrl from "~/styles/index.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export const loader = () => {
  return getRabbitPosts();
};

export default function Index() {
  const rabbits: RabbitPost[] = useLoaderData();
  const transition = useTransition();
  console.log(transition)
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Available Rabbits</h1>
      <ul>
        {rabbits.map(rabbit => (
          <li key={rabbit.id}>
            <a
              target="_blank"
              href={rabbit.url}
              rel="noreferrer"
            >
              <h2>{rabbit.title}</h2>
              <img src={rabbit.img || ''} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
