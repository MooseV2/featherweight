window.units = 1; // grams
window.addEventListener('load', function() {
  console.log('Body onLoad')

  window.item_store = JSON.parse(localStorage.getItem('item_store'));
  if (window.item_store != null) {
    console.log('Item store found in cache');
    createSearchIndex();
  } else {
    console.log('Item store not found in cache; fetching');
    
    fetch('assets/ul_items.txt')
      .then(response => response.text())
      .then(text => {
        console.log('Items file loaded')
        window.item_store = [];

        text.split('\n').map((line) => {
          let index = line.indexOf(',');
          [weight, name] = [line.slice(0,index), line.slice(index+1)];
          const mass_g = weight / 1000; // mg -> g
          const mass_oz = weight / 28349.5; // mg -> oz
          const mass_lb = Math.floor(mass_oz / 16.0); // oz -> lb
          const mass_lb_oz = mass_oz % 16; // remaining oz from lbs

          const str_g = `${mass_g.toFixed(1)} g`;
          const str_oz = `${mass_oz.toFixed(2)} oz`;
          const str_lb = `${mass_lb} lb ${mass_lb_oz.toFixed(2)} oz`;

          window.item_store.push([name, str_g, str_oz, str_lb, mass_g]);
        });
        // All items should be in the store now.
        // Let's store it in local storage so it will be available next time.
        window.localStorage.setItem('item_store', JSON.stringify(window.item_store));
        createSearchIndex();
      });
    }
});

function createSearchIndex() {
  window.search = new FlexSearch();
  window.item_store.map((row, index) => { search.add(index, row[0]) });
  const searchbox = document.getElementById('searchbox')
  searchbox.disabled = false;
  searchbox.placeholder = 'Enter gear'
  searchbox.focus();
}

function research() {
  const searchText = document.getElementById("searchbox").value;
  let newTable = document.createElement('tbody');
  window.search.search(searchText, function(results) {
    results.map((resultIndex) => {
    result = window.item_store[resultIndex];
    let newRow = document.createElement('tr');
    let tdName = document.createElement('td');
      tdName.appendChild(document.createTextNode(result[0]));
    let tdWeight = document.createElement('td');
      tdWeight.appendChild(document.createTextNode(result[window.units]));
      tdWeight.setAttribute('data-value', result[4]); // Add custom key of weight in grams. Needed?
    newRow.appendChild(tdName);
    newRow.appendChild(tdWeight);
    newTable.appendChild(newRow);
  });
  let oldTable = document.getElementById('tableresults');

  // Uninitialize sortable table first
  oldTable.parentNode.setAttribute("data-sortable-initialized", "false");
  document.getElementById('header-weight').setAttribute("data-sorted", "false");
  oldTable.parentNode.replaceChild(newTable, oldTable);
  newTable.id = 'tableresults';
  Sortable.init();
  });
}

function rotateUnits() {
  if (window.units == 3) {
    window.units = 1;
  } else {
    window.units++;
  }

  let button = document.getElementById("unitsButton");
  const unitsText = ["Grams", "Oz", "Lb/Oz"];
  button.innerHTML = `Units: ${unitsText[window.units-1]}`;
  research(); // Refresh search with updated units
}
