import React, { useState, useEffect } from "react";
import axios from "axios";

const LoadMore = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // Add state to track whether there are more articles to load

  const fetchNewsFromApi = async () => {
    try {
      const response = await axios.get(
        `https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=us&min=9&max=12&apikey=88e276489332885b34496fe6c90acd2d&page=${currentPage}`
      );
      const newArticles = response.data.articles;
      if (newArticles.length === 0) {
        setHasMore(false); // No more articles to load
      } else {
        setNewsData((prevData) => [...prevData, ...newArticles]);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (hasMore) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    fetchNewsFromApi();
  }, [currentPage]);

  return (
    <div>
      <div>
        <h1 className="font-primary text-2xl font-bold mx-12 pt-7">Recent Blog</h1>
      </div>
      <div className="grid justify-center md:grid-cols-2 lg:grid-cols-3 gap-5 px-5 lg:gap-7 m-7">
        {newsData.map((article, index) => (
          <div key={index}>
            {article.image && (
              <img
                className="h-50 lg:h-60 w-full rounded-lg object-cover"
                src={article.image}
                alt={article.title}
                style={{ width: "100%", height: "15rem" }}
              />
            )}
            <h2 className="font-semibold font-primary text-xl leading-6 text-black my-2">
              {article.title}
            </h2>
            <p className="paragraph-normal text-gray-600 font-secondary">
              {article.description}
            </p>
            <a
              className="flex items-center my-2 gap-3 text-base font-bold"
              href="#"
            >
              <img
                className="h-10 w-10 rounded-full"
                src="https://miro.medium.com/v2/resize:fill:176:176/1*_U86iWtKiixaor8YR1q05Q.jpeg"
                alt=""
              />
              Eve Wilkins . 04/09/2023
            </a>
          </div>
        ))}
      </div>
      <div className="w-full flex justify-center">
      <button
        onClick={handleLoadMore}
        className="bg-black hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md mt-5"
        disabled={!hasMore} // Disable the button when there are no more articles to load
      >
        {hasMore ? "Load More" : "No More Articles"}
      </button>
      </div>
    </div>
  );
};

export default LoadMore;
