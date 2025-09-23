window.initializeTabs = function() {
  const tabButtons = document.querySelectorAll(".tab-button");

  tabButtons.forEach(tabButton => {
    tabButton.addEventListener("click", handleTabClick);
  });
}

document.addEventListener("DOMContentLoaded", window.initializeTabs());
function updateActiveState(tabContainer, activeTab, contentContainer, targetContent) {
  // Deactivate currently active tab
  const currentActiveTab = tabContainer.querySelector(".tab-button.active");
  if (currentActiveTab) currentActiveTab.classList.remove("active");
  
//   alert(currentActiveTab.id);

  // Activate clicked tab
  activeTab.classList.add("active");
  
//   alert(activeTab.id);
  
//   alert(contentContainer.id);

  // Deactivate currently active content
  const currentActiveContent = contentContainer.querySelector(":scope > .tab-content.active");
  if (currentActiveContent) currentActiveContent.classList.remove("active");
  
//   alert(currentActiveContent.id);

  // Activate target content
  if (targetContent) {
    targetContent.classList.add("active");
    
    // alert(targetContent.id);
    
  } else {
    console.warn("Target content not found for id:", targetContentId);
  }
}

function handleTabClick(event) {
  const clickedTab = event.currentTarget;
  const tabContainer = clickedTab.parentElement;
  const targetContentId = clickedTab.getAttribute("data-tab");
  
  if (!targetContentId) return; // Safeguard against missing data-tab attributes

  const targetContent = document.getElementById(targetContentId);
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
