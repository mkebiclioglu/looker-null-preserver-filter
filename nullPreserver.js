/**
 * Null Preserver Filter - Looker Studio Community Visualization
 * Always includes null values in filtering while hiding them from the UI
 */

// Global variables
let gVizData = null;
let gConfig = null;
let gContainer = null;
let gFilterState = new Set();
let gAllValues = new Set();
let gFilteredValues = new Set();

/**
 * Main visualization class
 */
class NullPreserverFilter {
  constructor(container, data, config) {
    this.container = container;
    this.data = data;
    this.config = config;
    this.init();
  }

  init() {
    this.render();
    this.emitInitialFilter();
  }

  render() {
    // Clear container
    this.container.innerHTML = '';
    
    // Get unique values excluding null sentinel
    const values = this.getUniqueValues();
    if (values.length === 0) {
      this.renderEmptyState();
      return;
    }

    // Create main wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'npf-wrapper';

    // Add search box if enabled
    if (this.config.showSearch) {
      wrapper.appendChild(this.createSearchBox());
    }

    // Add select all option if enabled
    if (this.config.selectAll) {
      wrapper.appendChild(this.createSelectAllOption(values));
    }

    // Add checkbox list
    wrapper.appendChild(this.createCheckboxList(values));

    this.container.appendChild(wrapper);
  }

  getUniqueValues() {
    if (!this.data || !this.data.tables || !this.data.tables.DEFAULT) {
      return [];
    }

    const table = this.data.tables.DEFAULT;
    const values = new Set();
    
    for (const row of table) {
      const value = row.dimID;
      if (value && value !== '__NULL__') {
        values.add(value);
      }
    }

    return Array.from(values).sort();
  }

  createSearchBox() {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'npf-search-container';

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search values...';
    searchInput.className = 'npf-search-input';
    searchInput.setAttribute('aria-label', 'Search filter values');

    searchInput.addEventListener('input', (e) => {
      this.filterValues(e.target.value);
    });

    searchContainer.appendChild(searchInput);
    return searchContainer;
  }

  createSelectAllOption(values) {
    const selectAllContainer = document.createElement('div');
    selectAllContainer.className = 'npf-select-all-container';

    const selectAllCheckbox = document.createElement('input');
    selectAllCheckbox.type = 'checkbox';
    selectAllCheckbox.id = 'npf-select-all';
    selectAllCheckbox.className = 'npf-checkbox';

    const selectAllLabel = document.createElement('label');
    selectAllLabel.htmlFor = 'npf-select-all';
    selectAllLabel.textContent = 'Select All';
    selectAllLabel.className = 'npf-label';

    selectAllCheckbox.addEventListener('change', (e) => {
      this.handleSelectAll(e.target.checked, values);
    });

    selectAllContainer.appendChild(selectAllCheckbox);
    selectAllContainer.appendChild(selectAllLabel);
    return selectAllContainer;
  }

  createCheckboxList(values) {
    const checkboxContainer = document.createElement('div');
    checkboxContainer.className = 'npf-checkbox-container';

    values.forEach((value, index) => {
      const checkboxItem = document.createElement('div');
      checkboxItem.className = 'npf-checkbox-item';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = `npf-checkbox-${index}`;
      checkbox.className = 'npf-checkbox';
      checkbox.value = value;
      checkbox.checked = this.filterState.has(value);

      const label = document.createElement('label');
      label.htmlFor = `npf-checkbox-${index}`;
      label.textContent = value;
      label.className = 'npf-label';

      checkbox.addEventListener('change', (e) => {
        this.handleCheckboxChange(e.target.value, e.target.checked);
      });

      checkboxItem.appendChild(checkbox);
      checkboxItem.appendChild(label);
      checkboxContainer.appendChild(checkboxItem);
    });

    return checkboxContainer;
  }

  renderEmptyState() {
    const emptyMessage = document.createElement('div');
    emptyMessage.className = 'npf-empty-state';
    emptyMessage.textContent = 'No data available';
    this.container.appendChild(emptyMessage);
  }

  filterValues(searchTerm) {
    const values = this.getUniqueValues();
    const filtered = values.filter(value => 
      value.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Update checkbox visibility
    const checkboxes = this.container.querySelectorAll('.npf-checkbox-item');
    checkboxes.forEach((item, index) => {
      const value = values[index];
      if (value) {
        const isVisible = filtered.includes(value);
        item.style.display = isVisible ? 'block' : 'none';
      }
    });

    // Update select all state
    this.updateSelectAllState(filtered);
  }

  updateSelectAllState(visibleValues) {
    const selectAllCheckbox = this.container.querySelector('#npf-select-all');
    if (selectAllCheckbox) {
      const checkedVisible = visibleValues.filter(value => this.filterState.has(value));
      selectAllCheckbox.checked = checkedVisible.length === visibleValues.length && visibleValues.length > 0;
      selectAllCheckbox.indeterminate = checkedVisible.length > 0 && checkedVisible.length < visibleValues.length;
    }
  }

  handleSelectAll(checked, values) {
    if (checked) {
      values.forEach(value => {
        this.filterState.add(value);
      });
    } else {
      values.forEach(value => {
        this.filterState.delete(value);
      });
    }

    this.updateCheckboxes();
    this.emitFilter();
  }

  handleCheckboxChange(value, checked) {
    if (checked) {
      this.filterState.add(value);
    } else {
      this.filterState.delete(value);
    }

    this.updateSelectAllState(this.getUniqueValues());
    this.emitFilter();
  }

  updateCheckboxes() {
    const checkboxes = this.container.querySelectorAll('.npf-checkbox');
    checkboxes.forEach(checkbox => {
      if (checkbox.id !== 'npf-select-all') {
        checkbox.checked = this.filterState.has(checkbox.value);
      }
    });
  }

  emitFilter() {
    // Always include null sentinel in the filter
    const filterValues = Array.from(this.filterState);
    filterValues.push('__NULL__');

    // Emit filter interaction
    if (window.gds && window.gds.interactive) {
      window.gds.interactive.emit('filter', {
        table: 'table',
        column: 'dimID',
        values: filterValues
      });
    }
  }

  emitInitialFilter() {
    const values = this.getUniqueValues();
    // Initially select all visible values
    values.forEach(value => {
      this.filterState.add(value);
    });
    this.emitFilter();
  }
}

// Global state
let vizInstance = null;

/**
 * Main entry point for the visualization
 */
function drawViz(data, config) {
  try {
    gVizData = data;
    gConfig = config;
    gContainer = document.getElementById('viz-container');

    if (!gContainer) {
      console.error('Container element not found');
      return;
    }

    // Initialize visualization
    vizInstance = new NullPreserverFilter(gContainer, data, config);

  } catch (error) {
    console.error('Error initializing visualization:', error);
    if (gContainer) {
      gContainer.innerHTML = '<div class="npf-error">Error loading visualization</div>';
    }
  }
}

// Export for Looker Studio
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { drawViz };
}
