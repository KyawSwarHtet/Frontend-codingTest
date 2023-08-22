import React, { useEffect, useState } from "react";
import "./App.css";

function Card({
  title,
  text,
  linkTitle,
  href,
  onClick,
  linkClassName,
  target,
  rel,
}) {
  return (
    <div className={`card ${linkClassName}`}>
      <div className="card__title">{title}</div>
      <div className="card__text">{text}</div>
      <a
        className="default-link card__link"
        href={href}
        onClick={() => onClick(href)}
        target={target}
        rel={rel}
      >
        {linkTitle}
      </a>
    </div>
  );
}

async function fetchData() {
  const response = await fetch(
    "https://my-json-server.typicode.com/savayer/demo/posts"
  );
  const data = await response.json();
  return data.map((item) => ({
    id: item.id,
    title: item.title,
    link_title: item.link_title,
    link: item.link,
    text: item.body?.en,
  }));
}

export default function Page() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchData().then((newData) => setCards(newData));
  }, []);

  function analyticsTrackClick(url) {
    // Sending clicked link URL to analytics
    console.log(url);
  }

  return (
    <div>
      {cards.map((item) => (
        <Card
          key={item.id}
          title={item.title.en}
          linkTitle={item.link_title}
          href={item.link}
          text={item.text}
          linkClassName={item.id === 1 ? "card__link--red" : ""}
          target={item.id === 1 ? "_blank" : ""}
          onClick={analyticsTrackClick}
        />
      ))}
    </div>
  );
}
