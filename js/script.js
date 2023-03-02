const fetchData = () => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => loadData(data));
};

const loadData = (data) => {
  let allAiData = data.data.tools;
  const cardContainer = document.getElementById("card-container");
  allAiData = allAiData.slice(0, 6);

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
                <li>Text</li>
                <li>Text</li>
                <li>Text</li>
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
                  <p>01/02/2023</p>
                </div>
                <div>xxx</div>
              </div>
            </div>
          </div>
    `;

    cardContainer.appendChild(div);
    console.log(singleData);
  });
};

fetchData();
