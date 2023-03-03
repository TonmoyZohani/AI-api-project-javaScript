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
                <button onclick="singleCardFetch(${
                  singleData.id
                })" type="button" class="rounded-circle text-danger border border-danger bg-danger-subtle" data-bs-toggle="modal"
        data-bs-target="#exampleModal" id="${singleData.id}">→</buttpn>
                </div>
              </div>
            </div>
          </div>
          
    `;

    cardContainer.appendChild(div);
    // console.log(singleData);
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

// Single card fetching
const singleCardFetch = (id) => {
  if (id < 10) {
    fetch(`https://openapi.programming-hero.com/api/ai/tool/0${id}`)
      .then((res) => res.json())
      .then((data) => singleCardDisplay(data));
  } else {
    fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
      .then((res) => res.json())
      .then((data) => singleCardDisplay(data));
  }
};

// Single card display

const singleCardDisplay = (data) => {
  console.log(data.data);
  const modalBody = document.getElementById("modal-body-id");
  const modalDiv = document.createElement("div");
  modalBody.innerHTML = "";
  modalDiv.innerHTML = `
     <div class="row">
                <div
                  class="col-md-6 col-12"
                  style="max-width: 400px; height:400px"
                >
                  <div
                    class="card border-2 border-danger"
                    style="background-color: rgba(235, 87, 87, 0.05) ; height: 100%"
                  >
                    <div class="card-body">
                      <h5 class="card-title">
                        ${data.data.description}
                      </h5>
                      <div class="d-flex justify-content-between"">
                        <div
                          style="
                            width: 100px;
                            height: 100px;
                            background-color: #fff;
                            border-radius: 5px;
                          "
                        >
                          <p class="text-center text-success mt-4">
                            <b>$10/month Basic</b>
                          </p>
                        </div>
                        <div
                          style="
                            width: 100px;
                            height: 100px;
                            background-color: #fff;
                            border-radius: 5px;
                          "
                        >
                          <p class="text-center text-warning-emphasis mt-4">
                            <b>$50/month Pro</b>
                          </p>
                        </div>
                        <div
                          style="
                            width: 100px;
                            height: 100px;
                            background-color: #fff;
                            border-radius: 5px;
                          "
                        >
                          <p class="text-center mt-4 text-danger">
                            <b>Contact us Enterprise</b>
                          </p>
                        </div>
                      </div>

                      <div class="d-flex" style="
                           
                            height: 150px;
                            
                          ">
                        <div
                          style="
                            width: 180px;
                            height: 150px;
                            border-radius: 5px;
                          "
                          class="mr-4"
                        >
                          <h5>Features</h5>
                          <ul">
                            <ul>
                               ${Object.values(data.data.features)
                                 .map(
                                   (feature) =>
                                     `<li><small>${feature.feature_name}</small></li>`
                                 )
                                 .join("")}
                                      </ul>
                          </ul>
                        </div>

                        <div
                          style="
                            width: 160px;
                            height: 100px;
                            border-radius: 5px;
                            margin-left:4px;
                          "
                        >
                          <h5  class="ml-2">Integrations</h5>
                          <ul>
                            ${
                              data.data.integrations
                                ? data.data.integrations
                                    .map(
                                      (item) =>
                                        `<li style="margin-bottom: 0.5px;"> <small> ${item}</small></li>`
                                    )
                                    .join("")
                                : `<p class="text-danger"><small>No Data Found</small></p>`
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-6 col-12" >
                  <div class="card p-3" style="height: 100%">
                    <img
                      src="${data.data.image_link[0]}"
                      style="object-fit: cover; width: 100%; height: 220px"
                      class="card-img-top rounded img-fluid position-relative"
                      alt="..."
                    />

                    ${data.data.accuracy.score !== null ? `
                            <div
                      class="p-1 bg-danger text-white rounded position-absolute"
                      style="width: 120px; right: 15px"
                    >
                      <b>${
                        data.data.accuracy.score !== null
                          ? `${data.data.accuracy.score * 100} % accuracy`
                          : ""
                      }</b>
                    </div>
                    `:"" }

                  


                    <h5 class="text-center mt-2">
                      ${
                        data.data.input_output_examples
                          ? data.data.input_output_examples[0].input
                          : "Can you give any example?"
                      }
                    </h5>
                    <p class="text-center text-muted">
                      ${
                        data.data.input_output_examples
                          ? data.data.input_output_examples[0].output
                          : "No! Not Yet! Take a break!!!"
                      }
                    </p>
                  </div>
                </div>
              </div>
  `;

  modalBody.appendChild(modalDiv);
};

fetchData(url1, false);
