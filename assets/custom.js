window.initializeTabs = function() {
  const tabButtons = document.querySelectorAll(".tab-button");

  tabButtons.forEach(tabButton => {
    tabButton.addEventListener("click", handleTabClick);
  });
}

function updateActiveState(tabContainer, activeTab, contentContainer, targetContent) {
    const currentActiveTab = tabContainer.querySelector(".tab-button.active");
    if (currentActiveTab) currentActiveTab.classList.remove("active");
  

    activeTab.classList.add("active");
    
    const currentActiveContent = contentContainer.querySelector(":scope > .tab-content.active");
    if (currentActiveContent) currentActiveContent.classList.remove("active");
    
    if (targetContent) {
        targetContent.classList.add("active");
    } else {
        console.warn("Target content not found for id:", targetContentId);
    }
}

function handleTabClick(event) {
    const clickedTab = event.currentTarget;
    const tabContainer = clickedTab.parentElement;
    const targetContentId = clickedTab.getAttribute("data-tab");
    const parent = clickedTab.closest('.tool-tip__content');
    if (!targetContentId) return; // Safeguard against missing data-tab attributes
    
    const targetContent = parent.querySelector(`#${targetContentId}`);
    if (!targetContent) {
        console.warn("Target content not found for tab:", clickedTab);
        return;
    }
    
  const contentContainer = targetContent.parentElement;
  
  if (!contentContainer) {
      console.warn("Content container not found for tab:", clickedTab);
      return;
    }
    // Update active state for tabs and content
    updateActiveState(tabContainer, clickedTab, contentContainer, targetContent);
}

document.addEventListener("DOMContentLoaded", window.initializeTabs());

document.addEventListener('DOMContentLoaded', function() {
  const filterForm = document.querySelector('.filter-form');
  const availabilityInput = document.getElementById('availability-filter');

  if (!filterForm || !availabilityInput) return;

  // Detect any size filter change
  filterForm.addEventListener('change', function(e) {
    const target = e.target;
    if (target.classList.contains('size-filter')) {
      availabilityInput.disabled = false; // ensure it's included
    }
  });

  // Ensure availability is always included on form submit
  filterForm.addEventListener('submit', function() {
    availabilityInput.disabled = false;
  });
});

function updateProductsAjax() {
  const form = document.querySelector('.filter-form');
  const formData = new FormData(form);
  const params = new URLSearchParams(formData).toString();
  const collectionUrl = window.location.pathname + '?' + params;

  fetch(collectionUrl, { headers: { 'X-Requested-With': 'XMLHttpRequest' } })
    .then(res => res.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const productsGrid = doc.querySelector('.collection-products');
      document.querySelector('.collection-products').innerHTML = productsGrid.innerHTML;
    });
}
