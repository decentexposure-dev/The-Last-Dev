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

  const buildFilterUrl = () => {
    const formData = new FormData(filterForm);
    const params = new URLSearchParams();

    // Append all selected filters
    let anySelected = false;
    formData.forEach((value, key) => {
      if (value) {
        params.append(key, value);
        anySelected = true;
      }
    });

    // Add availability only if any filter is selected
    if (anySelected) {
      params.set('filter.v.availability', '1');
    } else {
      params.delete('filter.v.availability');
    }

    return window.location.pathname + '?' + params.toString();
  };

  // Auto-submit when any filter changes
  const inputs = filterForm.querySelectorAll('.tag__input');
  inputs.forEach(input => {
    input.addEventListener('change', () => {
      window.location.href = buildFilterUrl();
    });
  });

  // Handle removing active tags
  const removeTags = document.querySelectorAll('.tag--remove a');
  removeTags.forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault();

      // Wait a tick for the input to uncheck
      setTimeout(() => {
        window.location.href = buildFilterUrl();
      }, 50);
    });
  });
});
