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

  // Check if input belongs to the Size filter
  const isSizeFilter = (input) => input.name && input.name.toLowerCase().includes('size');

  const buildFilterUrl = () => {
    const formData = new FormData(filterForm);
    const params = new URLSearchParams();

    // Add all selected filters
    formData.forEach((value, key) => {
      if (value) params.append(key, value);
    });

    // Add availability only if at least one size is selected
    const sizeSelected = Array.from(filterForm.querySelectorAll('.tag__input'))
      .some(input => isSizeFilter(input) && input.checked);

    if (sizeSelected) {
      params.set('filter.v.availability', '1');
    } else {
      params.delete('filter.v.availability');
    }

    return window.location.pathname + '?' + params.toString();
  };

  // Auto-submit when size filters change
  const sizeInputs = Array.from(filterForm.querySelectorAll('.tag__input')).filter(isSizeFilter);
  sizeInputs.forEach(input => {
    input.addEventListener('change', () => {
      window.location.href = buildFilterUrl();
    });
  });

  // Handle removing active tags
  const removeTags = document.querySelectorAll('.tag--remove a');
  removeTags.forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault();

      // Remove the filter from URL manually
      const url = new URL(link.href);
      const removedParam = link.href.split('?')[1];

      // Wait a tick to let the input uncheck (for formData to reflect)
      setTimeout(() => {
        window.location.href = buildFilterUrl();
      }, 50);
    });
  });
});

