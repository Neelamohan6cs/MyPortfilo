import { useState } from "react";

const portfolioData = [
  {
    id: 1,
    title: "Full Stack Web Development",
    type: "internship",
    year: "2024",
    img: "img/cer1.png",
  },
  {
    id: 2,
    title: "Android App Development",
    type: "internship",
    year: "2023",
    img: "img/cer2.png",
  },
  {
    id: 3,
    title: "MERN Stack Workshop",
    type: "workshop",
    year: "",
    img: "img/cer2.png",
  },
  {
    id: 4,
    title: "Web Development Bootcamp",
    type: "workshop",
    year: "",
    img: "img/cer3.png",
  },
  {
    id: 5,
    title: "Full Stack Certification",
    type: "certification",
    year: "",
    img: "img/cer1.png",
  },
  {
    id: 6,
    title: "Android Certification",
    type: "certification",
    year: "",
    img: "img/cer2.png",
  },
];

export default function Portfolio() {
  const [filter, setFilter] = useState("all");
  const [preview, setPreview] = useState(null);

  const filteredItems =
    filter === "all"
      ? portfolioData
      : portfolioData.filter((item) => item.type === filter);

  return (
    <>
      <div className="portfolio" id="portfolio">
        <div className="content-inner">
          <div className="content-header">
            <h2>Portfolio</h2>
          </div>

          {/* FILTER BUTTONS */}
          <ul id="portfolio-flters">
            <li
              className={filter === "all" ? "filter-active" : ""}
              onClick={() => setFilter("all")}
            >
              All
            </li>
            <li
              className={filter === "internship" ? "filter-active" : ""}
              onClick={() => setFilter("internship")}
            >
              Internships
            </li>
            <li
              className={filter === "workshop" ? "filter-active" : ""}
              onClick={() => setFilter("workshop")}
            >
              Workshops
            </li>
            <li
              className={filter === "certification" ? "filter-active" : ""}
              onClick={() => setFilter("certification")}
            >
              Certifications
            </li>
          </ul>

          {/* ITEMS */}
          <div className="row portfolio-container">
            {filteredItems.map((item) => (
              <div key={item.id} className="col-lg-4 col-md-6 portfolio-item">
                <div className="portfolio-wrap">
                  <figure>
                    <img
                      src={item.img || "img/placeholder.png"}
                      alt={item.title}
                      className="img-fluid"
                      onClick={() =>
                        setPreview(item.img || "img/placeholder.png")
                      }
                      onError={(e) => {
                        e.target.src = "img/placeholder.png";
                      }}
                    />
                    <a className="portfolio-title">
                      {item.title}
                      <span>
                        {item.type.charAt(0).toUpperCase() +
                          item.type.slice(1)}{" "}
                        {item.year && `| ${item.year}`}
                      </span>
                    </a>
                  </figure>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* IMAGE PREVIEW */}
      {preview && (
        <div className="img-modal" onClick={() => setPreview(null)}>
          <img src={preview} alt="Preview" />
        </div>
      )}
    </>
  );
}
