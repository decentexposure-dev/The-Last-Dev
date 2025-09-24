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

  filterForm.addEventListener('submit', function (event) {
    // Prevent default form submission to modify URL
    event.preventDefault();

    const formData = new FormData(filterForm);
    const params = new URLSearchParams();

    // Append all selected filters
    formData.forEach((value, key) => {
      params.append(key, value);
    });

    // Always enforce availability
    params.set('filter.v.availability', '1');

    // Build new URL
    const collectionUrl = window.location.pathname + '?' + params.toString();

    // Redirect
    window.location.href = collectionUrl;
  });

  // Optional: Trigger submit when a checkbox changes (for auto-filter)
  const checkboxes = filterForm.querySelectorAll('.tag__input');
  checkboxes.forEach(input => {
    input.addEventListener('change', () => filterForm.dispatchEvent(new Event('submit')));
  });
});
