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

document.addEventListener('DOMContentLoaded', function () {
  const filterForm = document.querySelector('.filter-form');
  if (!filterForm) return;

  // Function to build URL from selected filters
  const buildFilterUrl = () => {
    const formData = new FormData(filterForm);
    const params = new URLSearchParams();

    // Append all selected filters
    formData.forEach((value, key) => {
      if (value) {
        params.append(key, value);
      }
    });

    // Always enforce availability
    params.set('filter.v.availability', '1');

    // Build full collection URL
    return window.location.pathname + '?' + params.toString();
  };

  // Submit handler
  filterForm.addEventListener('submit', function (event) {
    event.preventDefault();
    window.location.href = buildFilterUrl();
  });

  // Auto-submit on checkbox/swatches change
  const inputs = filterForm.querySelectorAll('.tag__input');
  inputs.forEach(input => {
    input.addEventListener('change', () => {
      window.location.href = buildFilterUrl();
    });
  });

  // Optional: Also handle active tag remove buttons
  const removeTags = document.querySelectorAll('.tag--remove a');
  removeTags.forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      const url = new URL(link.href);
      url.searchParams.set('filter.v.availability', '1');
      window.location.href = url.toString();
    });
  });
});
