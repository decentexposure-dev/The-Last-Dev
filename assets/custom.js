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

  if (!filterForm) return;

  // Create a hidden input for in-stock filter if not already present
  let availabilityInput = document.getElementById('availability-filter');
  if (!availabilityInput) {
    availabilityInput = document.createElement('input');
    availabilityInput.type = 'hidden';
    availabilityInput.name = 'filter.v.availability';
    availabilityInput.id = 'availability-filter';
    availabilityInput.value = '1';
    filterForm.prepend(availabilityInput);
  }

  // Function to trigger Ajax update or page reload
  function applyFilters() {
    // Check if theme uses Ajax
    if (typeof window.updateCollection === 'function') {
      // Impulse Ajax filter
      window.updateCollection(); // Impulse default Ajax function
    } else {
      // Fallback: reload page with form
      filterForm.submit();
    }
  }

  // Detect checkbox changes for size filters
  filterForm.addEventListener('change', function(e) {
    const target = e.target;
    if (target.type === 'checkbox' && target.name.toLowerCase().includes('size')) {
      availabilityInput.disabled = false; // ensure availability is included
      applyFilters();
    }
  });

  // Ensure availability included on form submit
  filterForm.addEventListener('submit', function() {
    availabilityInput.disabled = false;
  });
});
