const memoryBlock = document.querySelector("#form__memoryblock");
const jobSize = document.querySelector("#form__jobsize");
const simulateBtn = document.querySelector(".simulate");
const table = document.querySelectorAll(".styled-table");
// const bestFitTable = document.querySelectorAll(".best-fit__table");
const firstFitBody = document.querySelector(".tbody__firstfit");
const bestFitBody = document.querySelector(".tbody__bestfit");

const card = document.querySelector(".card");

let blockSize = [],
  processSize = [];
let html;
console.log(html);
//when clicking the btn
let click = 0;
simulateBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (click > 0) {
    firstFitBody.textContent = "";
    bestFitBody.textContent = "";
  }
  click++;
  //unhide the table
  table.forEach((e) => {
    e.classList.remove("hidden");
  });

  // bestFitBody.classList.remove("hidden");
  card.classList.add("card-transition");

  console.log(memoryBlock.value);
  console.log(jobSize.value);
  //getting input & convert
  const b = memoryBlock.value.split(",");
  const j = jobSize.value.split(",");
  //convert to num;
  console.log(b, j);
  blockSize = b.map(function (i) {
    return parseInt(i, 10);
  });

  processSize = j.map(function (i) {
    return parseInt(i, 10);
  });
  // console.log(processSize);
  // console.log(blockSize);

  //firstfit function
  firstfitAlgo();
  //best fit function
  bestfitAlgo();
});

//first fit algorithm
function firstfitAlgo() {
  let flag = [],
    allocation = [];

  blockSize.forEach((e) => {
    flag.push(0);
    allocation.push(-1);
  });
  console.log(flag);
  console.log(allocation);
  //*memory allocation for first fit algorithm;
  for (let i = 0; i < processSize.length; i++) {
    for (let j = 0; j < blockSize.length; j++) {
      if (flag[j] === 0 && blockSize[j] >= processSize[i]) {
        allocation[j] = i;
        flag[j] = 1;
        break;
      }
    }
  }
  //display
  blockSize.forEach((_, i) => {
    console.log(`${i + 1} ${blockSize[i]}`);
    html = `
                <td>Block ${i + 1}</td>
                <td>${blockSize[i]}</td>
                `;

    if (flag[i] === 1) {
      console.log(`Allocation ${i + 1} ${processSize[allocation[i]]}`);
      html += `<td>${processSize[allocation[i]]}</td>
                <td>busy</td>`;
    } else {
      html += `<td>Not allocated</td>
                <td>free</td>`;
    }
    console.log(html);
    firstFitBody.insertAdjacentHTML(
      "beforeend",
      `
    <tr>
      ${html}
      </tr>
    `
    );
  });
}

//*Best fit algorithm

function bestfitAlgo() {
  let allocation = [];
  let blockSizeCopy = [...blockSize];
  console.log(blockSizeCopy);
  let m = blockSize.length;
  let n = processSize.length;
  console.log(blockSize);

  // Initially no block is assigned to any process
  for (let i = 0; i < n; i++) allocation[i] = -1;

  // pick each process and find suitable blocks
  // according to its size ad assign to it
  for (let i = 0; i < n; i++) {
    // Find the best fit block for current process
    let bestIdx = -1;
    for (let j = 0; j < m; j++) {
      if (blockSize[j] >= processSize[i]) {
        if (bestIdx == -1) bestIdx = j;
        else if (blockSize[bestIdx] > blockSize[j]) bestIdx = j;
      }
    }

    // If we could find a block for current process
    if (bestIdx != -1) {
      // allocate block j to p[i] process
      allocation[i] = bestIdx;

      // Reduce available memory in this block.
      blockSize[bestIdx] -= processSize[i];
    }
  }

  console.log("\nProcess No.\tProcess Size\tBlock no.");
  for (let i = 0; i < n; i++) {
    console.log("   " + (i + 1) + "\t\t" + processSize[i] + "\t\t");
    if (allocation[i] != -1) {
      console.log(allocation[i] + 1);
      console.log(blockSizeCopy[allocation[i]]);
    } else console.log("Not Allocated");
    console.log();
  }

  // console.log(allocation);
  // console.log(blockSize);
  processSize.forEach((_, i) => {
    console.log(`${i + 1} ${blockSize[i]}`);

    html = `
                <td>Block ${i + 1}</td>
                <td>${blockSizeCopy[allocation[i]]}</td>
                `;

    if (allocation[i] != -1) {
      console.log("Alllooooo: ", allocation[i] + 1);
      console.log(`Allocation ${i + 1} ${processSize[i]}`);
      html += `<td>${processSize[i]}</td>
                <td>busy</td>`;
    } else {
      html += `<td>Not allocated</td>
                <td>free</td>`;
    }
    console.log(html);
    bestFitBody.insertAdjacentHTML(
      "beforeend",
      `
    <tr>
      ${html}
      </tr>
    `
    );
  });
}
