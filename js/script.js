const url1 = "https://openapi.programming-hero.com/api/ai/tools";

// fetching data
const fetchData = (url, load) => {
  toggleSpinner(true);
  fetch(url)
    .then((res) => res.json())
    .then((data) => loadData(data, load));
};

// load data dynamically
const loadData = (data, moreLoad) => {
  const cardContainer = document.getElementById("card-container");
  let allAiData = data.data.tools;
  if (moreLoad) {
    allAiData = allAiData;
  } else {
    allAiData = allAiData.slice(0, 6);
    document.getElementById("see-more").classList.remove("d-none");
  }

  cardContainer.innerHTML = "";
  console.log(allAiData);
  allAiData.forEach((singleData) => {
    const div = document.createElement("div");
    div.classList.add("col-lg-4", "col-md-6", "mb-4");
    div.innerHTML = `
          <div class="card h-100">
            <div class="card-body">
              <img
                src="${singleData.image}"
                class="img-fluid rounded mb-2"
                style="object-fit: cover;width: 100%; height: 200px;"
                alt="..."
              />
              <h5 class="card-title">Features</h5>
              <ol>
                ${singleData.features
                  .map((item) => `<li>${item}</li>`)
                  .join("")}
              </ol>
              <hr
                style="
                  border: none;
                  border-bottom: 2px solid black;
                  width: 100%;
                "
              />
              <div class="d-flex justify-content-between">
                <div>
                  <h5 class="card-title">${singleData.name}</h5>
                  <p class="d-flex align-items-center "> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar" viewBox="0 0 16 16">
  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
</svg>&nbsp  ${singleData.published_in}</p>
                </div>
                <div>
                <button type="button" class="rounded-circle text-danger border border-danger bg-danger-subtle" data-bs-toggle="modal"
        data-bs-target="#exampleModal">→</buttpn>
                </div>
              </div>
            </div>
          </div>
          
    `;

    cardContainer.appendChild(div);
    console.log(singleData);
  });
  toggleSpinner(false);
};

// See more button to load more data
const seeMoreBtn = document
  .getElementById("see-more")
  .addEventListener("click", function () {
    fetchData(url1, true);
    document.getElementById("see-more").classList.add("d-none");
  });

// loader
const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader-id");

  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

fetchData(url1, false);
