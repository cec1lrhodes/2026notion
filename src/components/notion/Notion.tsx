import React from "react";
import "./Notion.css";
import NotionBlock from "./NotionBlock";
import { useState } from "react";

interface Article {
  id: string;
  text: string;
  svg?: string;
}

const Notion = () => {
  const [data, setData] = useState<string>("");
  const [articles, setArticles] = useState<Article[]>([]);

  const addArticle = () => {
    if (data.trim() === "") return;

    const newArticle: Article = {
      id: Date.now().toString(),
      text: data,
      svg: undefined,
    };
    setArticles([newArticle, ...articles]);
    setData("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData(e.target.value);
    console.log(data);
  };

  return (
    <div className="notion-container">
      {/* --- ВЕРХНЯ ПАНЕЛЬ ВВОДУ (Input Bar) --- */}
      <div className="input-bar-wrapper">
        {/* Кнопка 1: Додати SVG */}
        <button className="icon-button side-button">
          <span className="text-2xl leading-none relative top-[-1px]">+</span>
        </button>

        {/* Центральна частина: Textarea */}
        <div className="textarea-container">
          <textarea
            className="styled-textarea"
            placeholder="Введіть ваш текст..."
            spellCheck="false"
            rows={1}
            onChange={handleChange}
            value={data}
          />
        </div>

        {/* Кнопка 3: Відправити */}
        <button
          className="icon-button side-button"
          onClick={addArticle}
          disabled={data.trim().length === 0}
        >
          <span>↑</span>
        </button>
      </div>

      {/* --- НИЖНЯ СІТКА (Grid blocks) --- */}
      <div className="results-grid">
        {articles.map((item) => (
          // Клікабельний елемент (картка)
          <div key={item.id} className="result-card">
            {/* Верхня частина: SVG заглушка */}
            <div className="card-image-placeholder">
              <span>SVG image</span>
            </div>
            {/* Нижня частина: Опис */}
            <div className="card-description">
              <p className="truncate">{item.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Підказка, як на макеті */}
      <p className="text-zinc-500 text-sm mt-4 text-center">
        After adding, blocks will be displayed here.
      </p>
    </div>
  );
};

export default Notion;
